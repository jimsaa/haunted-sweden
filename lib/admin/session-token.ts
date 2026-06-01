import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    console.error(
      "[admin-security] ADMIN_SESSION_SECRET is not set — using insecure fallback. Set a strong secret in production."
    );
  } else {
    console.warn(
      "[admin-security] TODO: Set ADMIN_SESSION_SECRET in production. Using dev fallback."
    );
  }
  return "haunted-sweden-dev-session-secret-change-me";
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

export type AdminSessionPayload = {
  userId: string;
  username: string;
  exp: number;
};

export function createAdminSessionToken(
  userId: string,
  username: string
): { token: string; expiresAt: string } {
  const exp = Date.now() + ADMIN_SESSION_TTL_MS;
  const payload = `${userId}|${username}|${exp}`;
  const token = `${Buffer.from(payload, "utf8").toString("base64url")}.${sign(payload)}`;
  return { token, expiresAt: new Date(exp).toISOString() };
}

export function verifyAdminSessionToken(token: string): AdminSessionPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const encoded = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  let payload: string;
  try {
    payload = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const parts = payload.split("|");
  if (parts.length !== 3) return null;
  const [userId, username, expStr] = parts;
  const exp = Number(expStr);
  if (!userId || !username || !Number.isFinite(exp)) return null;
  if (Date.now() > exp) return null;

  return { userId, username, exp };
}
