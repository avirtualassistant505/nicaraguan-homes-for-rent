import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import {
  buildStoragePath,
  createListingVideoRecord,
  createUploadJob,
  getFreshTikTokConnection,
  getListingVideoById,
  initializeTikTokUpload,
  isTikTokConfigured,
  LISTING_VIDEO_BUCKET,
  recordAuditLog,
  uploadVideoBufferToTikTok,
} from "@/lib/tiktok";
import { downloadFromStorage, querySupabase, uploadBufferToStorage } from "@/lib/supabase/server";

export const runtime = "nodejs";

type ListingRow = {
  id: string;
  slug: string;
  title: string;
};

function isSupportedVideoType(mimeType: string) {
  return ["video/mp4", "video/quicktime", "video/webm"].includes(mimeType);
}

async function getListing(listingId: string) {
  const rows = await querySupabase<ListingRow[]>(
    `listings?select=id,slug,title&id=eq.${encodeURIComponent(listingId)}&limit=1`,
  );

  return rows[0] || null;
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isTikTokConfigured()) {
    return NextResponse.json(
      { error: "TikTok is not configured yet. Add the TikTok environment variables first." },
      { status: 400 },
    );
  }

  const connection = await getFreshTikTokConnection();

  if (!connection) {
    return NextResponse.json(
      { error: "Connect an authorized TikTok account before uploading a draft." },
      { status: 400 },
    );
  }

  const formData = await request.formData();
  const listingId = formData.get("listingId");
  const listingVideoId = formData.get("listingVideoId");
  const file = formData.get("file");

  if (typeof listingId !== "string" || !listingId) {
    return NextResponse.json({ error: "A listing is required." }, { status: 400 });
  }

  const listing = await getListing(listingId);

  if (!listing) {
    return NextResponse.json({ error: "The selected listing could not be found." }, { status: 404 });
  }

  try {
    let buffer: Buffer;
    let mimeType: string;
    let listingVideoRecord =
      typeof listingVideoId === "string" && listingVideoId
        ? await getListingVideoById(listingVideoId)
        : null;

    if (listingVideoRecord && listingVideoRecord.listing_id !== listingId) {
      return NextResponse.json({ error: "That video is not associated with the selected listing." }, { status: 400 });
    }

    if (listingVideoRecord) {
      const stored = await downloadFromStorage(LISTING_VIDEO_BUCKET, listingVideoRecord.storage_path);
      buffer = stored.buffer;
      mimeType = listingVideoRecord.mime_type || stored.contentType;
    } else if (file instanceof File) {
      mimeType = file.type || "video/mp4";

      if (!isSupportedVideoType(mimeType)) {
        return NextResponse.json(
          { error: "Upload an MP4, MOV, or WEBM file for TikTok draft publishing." },
          { status: 400 },
        );
      }

      buffer = Buffer.from(await file.arrayBuffer());

      if (buffer.length === 0) {
        return NextResponse.json({ error: "The selected video file is empty." }, { status: 400 });
      }

      if (buffer.length > 1000 * 1024 * 1024) {
        return NextResponse.json(
          { error: "For the first version of this workflow, keep uploads under 1 GB." },
          { status: 400 },
        );
      }

      const storagePath = buildStoragePath(listing.slug, file.name);
      const publicUrl = await uploadBufferToStorage(
        LISTING_VIDEO_BUCKET,
        storagePath,
        buffer,
        mimeType,
      );

      listingVideoRecord = await createListingVideoRecord({
        listingId: listing.id,
        fileName: file.name,
        videoUrl: publicUrl,
        storagePath,
        mimeType,
        sizeBytes: buffer.length,
      });
    } else {
      return NextResponse.json(
        { error: "Choose a local video or select an existing stored video first." },
        { status: 400 },
      );
    }

    const init = await initializeTikTokUpload(connection.accessToken, buffer.length, mimeType);
    await uploadVideoBufferToTikTok(init.uploadUrl, buffer, init.plan, mimeType);
    await createUploadJob({
      listingVideoId: listingVideoRecord.id,
      tiktokConnectionId: connection.record.id,
      publishId: init.publishId,
      status: "UPLOADED",
    });
    await recordAuditLog("tiktok.upload_requested", "listing_video", listingVideoRecord.id, {
      publish_id: init.publishId,
      listing_id: listing.id,
      listing_title: listing.title,
    });

    return NextResponse.json({
      ok: true,
      publishId: init.publishId,
      status: "UPLOADED",
      message: "Draft upload started successfully. Check the status card for updates from TikTok.",
      listingVideoId: listingVideoRecord.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to upload the TikTok draft." },
      { status: 500 },
    );
  }
}
