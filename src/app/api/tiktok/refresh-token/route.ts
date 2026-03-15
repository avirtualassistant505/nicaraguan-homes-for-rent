import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { refreshTikTokConnectionManually } from "@/lib/tiktok";

export const runtime = "nodejs";

export async function POST() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await refreshTikTokConnectionManually();
    return NextResponse.json({ ok: true, message: "TikTok connection refreshed." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to refresh TikTok." },
      { status: 500 },
    );
  }
}
