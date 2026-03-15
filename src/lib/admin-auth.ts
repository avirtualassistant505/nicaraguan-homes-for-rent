import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "nhr_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function getRequiredEnv(name: "ADMIN_ACCESS_PASSWORD") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function signValue(value: string) {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error(
      "Missing ADMIN_SESSION_SECRET and SUPABASE_SERVICE_ROLE_KEY. Add one of them before using the admin.",
    );
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

function createSessionToken() {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  return `${expiresAt}.${signValue(expiresAt)}`;
}

function hasValidSignature(token: string) {
  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature) {
    return false;
  }

  const expected = signValue(expiresAt);

  if (expected.length !== signature.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

function isTokenExpired(token: string) {
  const [expiresAt] = token.split(".");
  return Number(expiresAt) < Date.now();
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_ACCESS_PASSWORD);
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  return hasValidSignature(token) && !isTokenExpired(token);
}

export async function requireAdminSession() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }
}

export async function createAdminSession(password: string) {
  const expectedPassword = getRequiredEnv("ADMIN_ACCESS_PASSWORD");

  if (!safeEqual(password, expectedPassword)) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });

  return true;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
