import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { saveTikTokConnectionFromCode } from "@/lib/tiktok";

export const runtime = "nodejs";

const STATE_COOKIE = "nhr_tiktok_oauth_state";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.APP_BASE_URL || request.nextUrl.origin;

  if (!(await hasAdminSession())) {
    return NextResponse.redirect(new URL("/admin/login", baseUrl));
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get(STATE_COOKIE)?.value;
  cookieStore.delete(STATE_COOKIE);

  if (error) {
    return NextResponse.redirect(new URL("/admin?tiktok=denied", baseUrl));
  }

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(new URL("/admin?tiktok=error", baseUrl));
  }

  try {
    await saveTikTokConnectionFromCode(code);
    return NextResponse.redirect(new URL("/admin?tiktok=connected", baseUrl));
  } catch (callbackError) {
    console.error("TikTok callback failed.", callbackError);
    return NextResponse.redirect(new URL("/admin?tiktok=error", baseUrl));
  }
}
