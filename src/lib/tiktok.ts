import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import {
  deleteSupabase,
  getPublicStorageUrl,
  insertSupabase,
  querySupabase,
  updateSupabase,
} from "@/lib/supabase/server";

const TIKTOK_AUTHORIZE_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_USER_INFO_URL = "https://open.tiktokapis.com/v2/user/info/";
const TIKTOK_INIT_UPLOAD_URL = "https://open.tiktokapis.com/v2/post/publish/inbox/video/init/";
const TIKTOK_STATUS_URL = "https://open.tiktokapis.com/v2/post/publish/status/fetch/";
const TIKTOK_SCOPES = ["user.info.basic", "video.upload"];
const TIKTOK_REFRESH_BUFFER_MS = 1000 * 60 * 10;
export const LISTING_VIDEO_BUCKET = "listing-videos";

export type TikTokConnectionRecord = {
  id: string;
  user_id: string;
  platform_account_label: string | null;
  open_id: string;
  display_name: string | null;
  avatar_url: string | null;
  scope: string;
  access_token_encrypted: string;
  refresh_token_encrypted: string;
  access_token_expires_at: string;
  refresh_token_expires_at: string;
  created_at: string;
  updated_at: string;
};

export type TikTokConnectionSummary = {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  openId: string;
  platformAccountLabel: string | null;
  scopes: string[];
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
};

export type ListingVideoRecord = {
  id: string;
  listing_id: string;
  file_name: string;
  video_url: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  duration_seconds: number | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type TikTokUploadJobRecord = {
  id: string;
  listing_video_id: string;
  tiktok_connection_id: string | null;
  publish_id: string;
  mode: string;
  status: string;
  last_error: string | null;
  requested_by_user_id: string | null;
  created_at: string;
  updated_at: string;
};

type TikTokTokenResponse = {
  access_token: string;
  expires_in: number;
  open_id: string;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type TikTokUserInfoResponse = {
  data?: {
    user?: {
      open_id?: string;
      display_name?: string;
      avatar_url?: string;
    };
  };
  error?: {
    code: string;
    message: string;
  };
};

type TikTokStatusResponse = {
  data?: {
    fail_reason?: string;
    publish_id: string;
    status: string;
  };
  error?: {
    code: string;
    message: string;
  };
};

type TikTokInitResponse = {
  data?: {
    publish_id: string;
    upload_url: string;
  };
  error?: {
    code: string;
    message: string;
  };
};

type UploadPlan = {
  chunkSize: number;
  totalChunkCount: number;
};

type StoredConnection = {
  record: TikTokConnectionRecord;
  accessToken: string;
  refreshToken: string;
};

function getEnv(name: string) {
  return process.env[name];
}

function getRequiredEnv(name: string) {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getTikTokSecret() {
  return getEnv("TIKTOK_TOKEN_ENCRYPTION_SECRET") || getEnv("ENCRYPTION_KEY") || "";
}

function getEncryptionKey() {
  const secret = getTikTokSecret();

  if (!secret) {
    throw new Error("Missing TIKTOK_TOKEN_ENCRYPTION_SECRET or ENCRYPTION_KEY.");
  }

  return createHash("sha256").update(secret).digest();
}

function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}.${tag.toString("base64")}.${encrypted.toString("base64")}`;
}

function decrypt(value: string) {
  const [iv, tag, encrypted] = value.split(".");

  if (!iv || !tag || !encrypted) {
    throw new Error("Invalid encrypted TikTok token format.");
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

function buildAbsoluteUrl(path: string) {
  const baseUrl = getEnv("APP_BASE_URL");

  if (!baseUrl) {
    return path;
  }

  return new URL(path, baseUrl).toString();
}

function mapConnectionSummary(connection: TikTokConnectionRecord): TikTokConnectionSummary {
  return {
    id: connection.id,
    displayName: connection.display_name,
    avatarUrl: connection.avatar_url,
    openId: connection.open_id,
    platformAccountLabel: connection.platform_account_label,
    scopes: connection.scope.split(",").map((scope) => scope.trim()).filter(Boolean),
    accessTokenExpiresAt: connection.access_token_expires_at,
    refreshTokenExpiresAt: connection.refresh_token_expires_at,
  };
}

function buildUploadPlan(sizeBytes: number): UploadPlan {
  if (sizeBytes <= 0) {
    throw new Error("TikTok uploads require a non-empty video file.");
  }

  const minChunkSize = 5 * 1024 * 1024;
  const defaultChunkSize = 10 * 1024 * 1024;

  if (sizeBytes <= minChunkSize) {
    return {
      chunkSize: sizeBytes,
      totalChunkCount: 1,
    };
  }

  let totalChunkCount = Math.floor(sizeBytes / defaultChunkSize);
  const remainder = sizeBytes % defaultChunkSize;

  if (totalChunkCount === 0) {
    totalChunkCount = 1;
  } else if (remainder >= minChunkSize) {
    totalChunkCount += 1;
  }

  return {
    chunkSize: defaultChunkSize,
    totalChunkCount,
  };
}

async function postTikTokForm(body: URLSearchParams) {
  const response = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`TikTok token request failed with ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as TikTokTokenResponse;
}

async function fetchTikTokUserInfo(accessToken: string) {
  const response = await fetch(`${TIKTOK_USER_INFO_URL}?fields=open_id,display_name,avatar_url`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`TikTok user info request failed with ${response.status}: ${await response.text()}`);
  }

  const payload = (await response.json()) as TikTokUserInfoResponse;

  if (payload.error) {
    throw new Error(`TikTok user info error: ${payload.error.message}`);
  }

  return payload.data?.user || null;
}

function getTikTokConfig() {
  return {
    clientKey: getRequiredEnv("TIKTOK_CLIENT_KEY"),
    clientSecret: getRequiredEnv("TIKTOK_CLIENT_SECRET"),
    redirectUri: getRequiredEnv("TIKTOK_REDIRECT_URI"),
  };
}

export function isTikTokConfigured() {
  return Boolean(
    getEnv("TIKTOK_CLIENT_KEY") &&
      getEnv("TIKTOK_CLIENT_SECRET") &&
      getEnv("TIKTOK_REDIRECT_URI") &&
      (getEnv("TIKTOK_TOKEN_ENCRYPTION_SECRET") || getEnv("ENCRYPTION_KEY")),
  );
}

export function buildTikTokAuthUrl(state: string) {
  const { clientKey, redirectUri } = getTikTokConfig();
  const url = new URL(TIKTOK_AUTHORIZE_URL);
  url.searchParams.set("client_key", clientKey);
  url.searchParams.set("scope", TIKTOK_SCOPES.join(","));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  return url.toString();
}

async function exchangeCodeForTokens(code: string) {
  const { clientKey, clientSecret, redirectUri } = getTikTokConfig();
  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  return postTikTokForm(body);
}

async function refreshToken(refreshToken: string) {
  const { clientKey, clientSecret } = getTikTokConfig();
  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  return postTikTokForm(body);
}

export async function getTikTokConnectionRecord() {
  const rows = await querySupabase<TikTokConnectionRecord[]>(
    "tiktok_connections?select=*&order=updated_at.desc&limit=1",
  );

  return rows[0] || null;
}

export async function getTikTokConnectionSummary() {
  try {
    const connection = await getTikTokConnectionRecord();
    return connection ? mapConnectionSummary(connection) : null;
  } catch (error) {
    console.error("Failed to load TikTok connection summary.", error);
    return null;
  }
}

async function upsertTikTokConnection(tokens: TikTokTokenResponse) {
  const user = tokens.scope.includes("user.info.basic")
    ? await fetchTikTokUserInfo(tokens.access_token)
    : null;
  const existing = await getTikTokConnectionRecord();
  const payload = {
    user_id: "admin",
    platform_account_label: user?.display_name || "Authorized TikTok account",
    open_id: tokens.open_id || user?.open_id || existing?.open_id || "",
    display_name: user?.display_name || null,
    avatar_url: user?.avatar_url || null,
    scope: tokens.scope,
    access_token_encrypted: encrypt(tokens.access_token),
    refresh_token_encrypted: encrypt(tokens.refresh_token),
    access_token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    refresh_token_expires_at: new Date(Date.now() + tokens.refresh_expires_in * 1000).toISOString(),
  };

  if (!payload.open_id) {
    throw new Error("TikTok did not return an account identifier.");
  }

  let record: TikTokConnectionRecord;

  if (existing) {
    const [updated] = await updateSupabase<TikTokConnectionRecord[]>(
      "tiktok_connections",
      `id=eq.${encodeURIComponent(existing.id)}`,
      payload,
    );
    record = updated;
  } else {
    const [created] = await insertSupabase<TikTokConnectionRecord[]>("tiktok_connections", payload);
    record = created;
  }

  await recordAuditLog("tiktok.connected", "tiktok_connection", record.id, {
    open_id: payload.open_id,
    scopes: tokens.scope,
  });

  return record;
}

export async function saveTikTokConnectionFromCode(code: string) {
  const tokens = await exchangeCodeForTokens(code);
  return upsertTikTokConnection(tokens);
}

async function withDecryptedConnection(record: TikTokConnectionRecord): Promise<StoredConnection> {
  return {
    record,
    accessToken: decrypt(record.access_token_encrypted),
    refreshToken: decrypt(record.refresh_token_encrypted),
  };
}

async function refreshStoredConnection(connection: StoredConnection) {
  const refreshed = await refreshToken(connection.refreshToken);
  const [updated] = await updateSupabase<TikTokConnectionRecord[]>(
    "tiktok_connections",
    `id=eq.${encodeURIComponent(connection.record.id)}`,
    {
      scope: refreshed.scope,
      access_token_encrypted: encrypt(refreshed.access_token),
      refresh_token_encrypted: encrypt(refreshed.refresh_token),
      access_token_expires_at: new Date(Date.now() + refreshed.expires_in * 1000).toISOString(),
      refresh_token_expires_at: new Date(Date.now() + refreshed.refresh_expires_in * 1000).toISOString(),
      open_id: refreshed.open_id || connection.record.open_id,
    },
  );

  await recordAuditLog("tiktok.refreshed", "tiktok_connection", updated.id, {
    open_id: updated.open_id,
  });

  return withDecryptedConnection(updated);
}

export async function getFreshTikTokConnection() {
  const record = await getTikTokConnectionRecord();

  if (!record) {
    return null;
  }

  const connection = await withDecryptedConnection(record);
  const accessExpiry = new Date(record.access_token_expires_at).getTime();

  if (Number.isNaN(accessExpiry)) {
    return refreshStoredConnection(connection);
  }

  if (accessExpiry - Date.now() <= TIKTOK_REFRESH_BUFFER_MS) {
    return refreshStoredConnection(connection);
  }

  return connection;
}

export async function disconnectTikTok() {
  const existing = await getTikTokConnectionRecord();

  if (!existing) {
    return;
  }

  await deleteSupabase("tiktok_connections", `id=eq.${encodeURIComponent(existing.id)}`);
  await recordAuditLog("tiktok.disconnected", "tiktok_connection", existing.id, {
    open_id: existing.open_id,
  });
}

export async function getListingVideos(listingId: string) {
  try {
    return await querySupabase<ListingVideoRecord[]>(
      `listing_videos?select=*&listing_id=eq.${encodeURIComponent(listingId)}&order=created_at.desc`,
    );
  } catch (error) {
    console.error(`Failed to load listing videos for ${listingId}.`, error);
    return [] as ListingVideoRecord[];
  }
}

export async function getListingVideoById(listingVideoId: string) {
  const rows = await querySupabase<ListingVideoRecord[]>(
    `listing_videos?select=*&id=eq.${encodeURIComponent(listingVideoId)}&limit=1`,
  );

  return rows[0] || null;
}

export async function createListingVideoRecord(payload: {
  listingId: string;
  fileName: string;
  videoUrl: string;
  storagePath: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds?: number | null;
  status?: string;
}) {
  const [created] = await insertSupabase<ListingVideoRecord[]>("listing_videos", {
    listing_id: payload.listingId,
    file_name: payload.fileName,
    video_url: payload.videoUrl,
    storage_path: payload.storagePath,
    mime_type: payload.mimeType,
    size_bytes: payload.sizeBytes,
    duration_seconds: payload.durationSeconds ?? null,
    status: payload.status || "ready",
  });

  await recordAuditLog("listing_video.created", "listing_video", created.id, {
    listing_id: payload.listingId,
    storage_path: payload.storagePath,
  });

  return created;
}

export async function getRecentUploadJobs(listingVideoIds: string[]) {
  if (listingVideoIds.length === 0) {
    return [] as TikTokUploadJobRecord[];
  }

  const filter = listingVideoIds.map(encodeURIComponent).join(",");

  try {
    return await querySupabase<TikTokUploadJobRecord[]>(
      `tiktok_upload_jobs?select=*&listing_video_id=in.(${filter})&order=created_at.desc&limit=20`,
    );
  } catch (error) {
    console.error("Failed to load TikTok upload jobs.", error);
    return [] as TikTokUploadJobRecord[];
  }
}

export async function createUploadJob(payload: {
  listingVideoId: string;
  tiktokConnectionId: string | null;
  publishId: string;
  status: string;
  lastError?: string | null;
}) {
  const [created] = await insertSupabase<TikTokUploadJobRecord[]>("tiktok_upload_jobs", {
    listing_video_id: payload.listingVideoId,
    tiktok_connection_id: payload.tiktokConnectionId,
    publish_id: payload.publishId,
    mode: "draft_upload",
    status: payload.status,
    last_error: payload.lastError || null,
    requested_by_user_id: "admin",
  });

  return created;
}

export async function updateUploadJobStatus(
  publishId: string,
  status: string,
  lastError?: string | null,
) {
  const [updated] = await updateSupabase<TikTokUploadJobRecord[]>(
    "tiktok_upload_jobs",
    `publish_id=eq.${encodeURIComponent(publishId)}`,
    {
      status,
      last_error: lastError || null,
    },
  );

  return updated;
}

export async function recordAuditLog(
  action: string,
  entityType: string,
  entityId: string,
  details: Record<string, unknown>,
) {
  try {
    await insertSupabase("audit_log", {
      actor: "admin",
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
    });
  } catch (error) {
    console.error("Failed to record audit log.", error);
  }
}

export async function initializeTikTokUpload(accessToken: string, sizeBytes: number, mimeType: string) {
  const plan = buildUploadPlan(sizeBytes);
  const response = await fetch(TIKTOK_INIT_UPLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      source_info: {
        source: "FILE_UPLOAD",
        video_size: sizeBytes,
        chunk_size: plan.chunkSize,
        total_chunk_count: plan.totalChunkCount,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`TikTok upload init failed with ${response.status}: ${await response.text()}`);
  }

  const payload = (await response.json()) as TikTokInitResponse;

  if (payload.error || !payload.data?.publish_id || !payload.data?.upload_url) {
    throw new Error(payload.error?.message || "TikTok did not return an upload URL.");
  }

  return {
    publishId: payload.data.publish_id,
    uploadUrl: payload.data.upload_url,
    plan,
    mimeType,
  };
}

export async function uploadVideoBufferToTikTok(
  uploadUrl: string,
  buffer: Buffer,
  plan: UploadPlan,
  mimeType: string,
) {
  let start = 0;

  for (let index = 0; index < plan.totalChunkCount; index += 1) {
    const bytesRemaining = buffer.length - start;
    if (bytesRemaining <= 0) {
      break;
    }

    const remainingChunks = plan.totalChunkCount - index;
    let chunkLength = Math.min(plan.chunkSize, bytesRemaining);

    if (remainingChunks === 1) {
      chunkLength = bytesRemaining;
    } else if (bytesRemaining - chunkLength < 5 * 1024 * 1024) {
      chunkLength = bytesRemaining;
    }

    const end = start + chunkLength;
    const chunkBody = buffer.buffer.slice(
      buffer.byteOffset + start,
      buffer.byteOffset + end,
    ) as ArrayBuffer;
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": mimeType,
        "Content-Length": String(chunkLength),
        "Content-Range": `bytes ${start}-${end - 1}/${buffer.length}`,
      },
      body: chunkBody,
      cache: "no-store",
    });

    if (![200, 201, 202, 204, 206].includes(response.status)) {
      throw new Error(`TikTok media upload failed with ${response.status}: ${await response.text()}`);
    }

    start = end;
  }
}

export async function fetchTikTokPublishStatus(publishId: string) {
  const connection = await getFreshTikTokConnection();

  if (!connection) {
    throw new Error("Connect TikTok before checking upload status.");
  }

  const response = await fetch(TIKTOK_STATUS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${connection.accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      publish_id: publishId,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`TikTok status request failed with ${response.status}: ${await response.text()}`);
  }

  const payload = (await response.json()) as TikTokStatusResponse;

  if (payload.error || !payload.data) {
    throw new Error(payload.error?.message || "TikTok did not return a publish status.");
  }

  return payload.data;
}

export async function refreshTikTokConnectionManually() {
  const record = await getTikTokConnectionRecord();

  if (!record) {
    throw new Error("Connect TikTok before refreshing the token.");
  }

  return refreshStoredConnection(await withDecryptedConnection(record));
}

export function getListingVideoPublicUrl(objectPath: string) {
  return getPublicStorageUrl(LISTING_VIDEO_BUCKET, objectPath);
}

export function buildStoragePath(listingSlug: string, fileName: string) {
  const safeName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${listingSlug}/${Date.now()}-${safeName || "listing-video.mp4"}`;
}

export function getTikTokCallbackPath() {
  return buildAbsoluteUrl("/api/auth/tiktok/callback");
}
