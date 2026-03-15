import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { disconnectTikTok } from "@/lib/tiktok";

export const runtime = "nodejs";

export async function POST() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await disconnectTikTok();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to disconnect TikTok." },
      { status: 500 },
    );
  }
}
