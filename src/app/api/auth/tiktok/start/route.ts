import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { buildTikTokAuthUrl, isTikTokConfigured } from "@/lib/tiktok";

export const runtime = "nodejs";

const STATE_COOKIE = "nhr_tiktok_oauth_state";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.APP_BASE_URL || request.nextUrl.origin;

  if (!(await hasAdminSession())) {
    return NextResponse.redirect(new URL("/admin/login", baseUrl));
  }

  if (!isTikTokConfigured()) {
    return NextResponse.redirect(new URL("/admin?tiktok=error", baseUrl));
  }

  const state = randomBytes(24).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return NextResponse.redirect(buildTikTokAuthUrl(state));
}
