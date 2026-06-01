import { NextResponse } from "next/server";
import type { AdminPermission } from "@/lib/admin/permissions";
import { userHasPermission } from "@/lib/admin/permissions";
import { getClientIp, getCountryCode } from "@/lib/admin/request-context";
import { logSecurityEvent } from "@/lib/admin/security-log";
import { verifyAdminSessionToken } from "@/lib/admin/session-token";
import type { AdminUserRecord } from "@/lib/admin/users-types";
import {
  findAdminUserByCredentials,
  findAdminUserById,
} from "@/lib/admin/users-store";

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbidden(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function getAdminCredentialsFromRequest(request: Request): {
  username: string;
  password: string;
} | null {
  const username = request.headers.get("x-admin-username");
  const password = request.headers.get("x-admin-password");
  if (!username || !password) return null;
  return { username, password };
}

function getSessionTokenFromRequest(request: Request): string | null {
  const header = request.headers.get("x-admin-session");
  if (header?.trim()) return header.trim();
  return null;
}

async function userFromSessionToken(
  token: string,
  request: Request
): Promise<AdminUserRecord | null> {
  const payload = verifyAdminSessionToken(token);
  if (!payload) {
    logSecurityEvent({
      type: "session_expired",
      ip: getClientIp(request),
      country: getCountryCode(request),
      path: new URL(request.url).pathname,
      reason: "invalid_or_expired_token",
    });
    return null;
  }
  const user = await findAdminUserById(payload.userId);
  if (!user || !user.enabled) return null;
  if (user.username.trim().toLowerCase() !== payload.username.trim().toLowerCase()) {
    return null;
  }
  return user;
}

/** Validates session token or username/password (legacy). */
export async function authenticateAdminRequest(
  request: Request
): Promise<AdminUserRecord | null> {
  const sessionToken = getSessionTokenFromRequest(request);
  if (sessionToken) {
    return userFromSessionToken(sessionToken, request);
  }

  const creds = getAdminCredentialsFromRequest(request);
  if (!creds) return null;
  return findAdminUserByCredentials(creds.username, creds.password);
}

export type AdminAuthResult =
  | { ok: true; user: AdminUserRecord }
  | { ok: false; response: NextResponse };

export async function requireAdminUser(
  request: Request,
  permission?: AdminPermission
): Promise<AdminAuthResult> {
  const user = await authenticateAdminRequest(request);
  if (!user) {
    logSecurityEvent({
      type: "unauthorized_api",
      ip: getClientIp(request),
      country: getCountryCode(request),
      path: new URL(request.url).pathname,
      reason: "auth_failed",
    });
    return { ok: false, response: unauthorized() };
  }

  if (
    permission &&
    !userHasPermission(user.role, user.permissions, permission)
  ) {
    return { ok: false, response: forbidden("Missing permission") };
  }

  return { ok: true, user };
}
