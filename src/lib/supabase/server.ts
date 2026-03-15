function getRequiredEnv(
  name: "NEXT_PUBLIC_SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY",
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export async function querySupabase<T>(pathWithQuery: string) {
  const projectUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const response = await fetch(`${projectUrl}/rest/v1/${pathWithQuery}`, {
    headers: {
      ...getSupabaseHeaders(),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed with ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as T;
}

export function getSupabaseHeaders() {
  const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
  };
}

export function getSupabaseProjectUrl() {
  return getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
}

export async function insertSupabase<T>(table: string, payload: object | object[]) {
  const response = await fetch(`${getSupabaseProjectUrl()}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(),
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed with ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as T;
}

export async function updateSupabase<T>(
  table: string,
  filterQuery: string,
  payload: object,
) {
  const response = await fetch(
    `${getSupabaseProjectUrl()}/rest/v1/${table}?${filterQuery}`,
    {
      method: "PATCH",
      headers: {
        ...getSupabaseHeaders(),
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase update failed with ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as T;
}

export async function deleteSupabase(table: string, filterQuery: string) {
  const response = await fetch(
    `${getSupabaseProjectUrl()}/rest/v1/${table}?${filterQuery}`,
    {
      method: "DELETE",
      headers: {
        ...getSupabaseHeaders(),
        Prefer: "return=minimal",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase delete failed with ${response.status}: ${await response.text()}`);
  }
}

export function getPublicStorageUrl(bucket: string, objectPath: string) {
  return `${getSupabaseProjectUrl()}/storage/v1/object/public/${bucket}/${objectPath}`;
}

export async function uploadBufferToStorage(
  bucket: string,
  objectPath: string,
  body: ArrayBuffer,
  contentType: string,
) {
  const payload = new Blob([body], {
    type: contentType || "application/octet-stream",
  });

  const response = await fetch(
    `${getSupabaseProjectUrl()}/storage/v1/object/${bucket}/${objectPath}`,
    {
      method: "POST",
      headers: {
        ...getSupabaseHeaders(),
        "Content-Type": contentType || "application/octet-stream",
        "x-upsert": "true",
      },
      body: payload,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase upload failed with ${response.status}: ${await response.text()}`);
  }

  return getPublicStorageUrl(bucket, objectPath);
}

export async function uploadToStorage(
  bucket: string,
  objectPath: string,
  file: File,
) {
  return uploadBufferToStorage(
    bucket,
    objectPath,
    await file.arrayBuffer(),
    file.type || "application/octet-stream",
  );
}

export async function downloadFromStorage(bucket: string, objectPath: string) {
  const response = await fetch(
    `${getSupabaseProjectUrl()}/storage/v1/object/${bucket}/${objectPath}`,
    {
      headers: {
        ...getSupabaseHeaders(),
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase download failed with ${response.status}: ${await response.text()}`);
  }

  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get("content-type") || "application/octet-stream",
  };
}

export async function deleteFromStorage(bucket: string, objectPaths: string[]) {
  if (objectPaths.length === 0) {
    return;
  }

  const response = await fetch(
    `${getSupabaseProjectUrl()}/storage/v1/object/${bucket}`,
    {
      method: "DELETE",
      headers: {
        ...getSupabaseHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefixes: objectPaths }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase storage delete failed with ${response.status}: ${await response.text()}`);
  }
}
