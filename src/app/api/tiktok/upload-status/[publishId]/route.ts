import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { fetchTikTokPublishStatus, recordAuditLog, updateUploadJobStatus } from "@/lib/tiktok";

export const runtime = "nodejs";

function getStatusMessage(status: string, failReason?: string) {
  if (status === "SEND_TO_USER_INBOX") {
    return "Draft upload complete. Open TikTok notifications or inbox prompts to review and finish the post.";
  }

  if (status === "PUBLISH_COMPLETE") {
    return "TikTok reports that the draft flow has completed successfully.";
  }

  if (status === "FAILED") {
    return failReason || "TikTok reported that the draft upload failed.";
  }

  return "TikTok is still processing the draft. Check again shortly.";
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ publishId: string }> },
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { publishId } = await context.params;

  try {
    const status = await fetchTikTokPublishStatus(publishId);
    await updateUploadJobStatus(publishId, status.status, status.fail_reason || null);
    await recordAuditLog("tiktok.status_checked", "tiktok_upload_job", publishId, {
      status: status.status,
      fail_reason: status.fail_reason || null,
    });

    return NextResponse.json({
      ok: true,
      publishId,
      status: status.status,
      message: getStatusMessage(status.status, status.fail_reason),
      failReason: status.fail_reason || null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to fetch TikTok upload status." },
      { status: 500 },
    );
  }
}
