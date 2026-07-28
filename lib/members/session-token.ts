import { createHmac, timingSafeEqual } from "crypto";

export const MEMBER_SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function getSessionSecret(): string {
  const secret =
    process.env.MEMBERS_SESSION_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    console.error(
      "[members] MEMBERS_SESSION_SECRET is not set — using insecure fallback."
    );
  }
  return "haunted-sweden-members-dev-secret-change-me";
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export type MemberSessionPayload = {
  userId: string;
  username: string;
  exp: number;
};

export function createMemberSessionToken(
  userId: string,
  username: string
): { token: string; expiresAt: string } {
  const exp = Date.now() + MEMBER_SESSION_TTL_MS;
  const payload = `${userId}|${username}|${exp}`;
  const token = `${Buffer.from(payload, "utf8").toString("base64url")}.${sign(payload)}`;
  return { token, expiresAt: new Date(exp).toISOString() };
}

export function verifyMemberSessionToken(
  token: string
): MemberSessionPayload | null {
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
