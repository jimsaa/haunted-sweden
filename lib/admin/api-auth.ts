import { NextResponse } from "next/server";
import { isAdminApiEnabled } from "@/lib/admin/auth";
import type { AdminPermission } from "@/lib/admin/permissions";
import { userHasPermission } from "@/lib/admin/permissions";
import type { AdminUserRecord } from "@/lib/admin/users-types";
import { findAdminUserByCredentials } from "@/lib/admin/users-store";

export function adminNotAvailable() {
  return NextResponse.json(
    { error: "Admin API is disabled in production" },
    { status: 403 }
  );
}

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

export async function authenticateAdminRequest(
  request: Request
): Promise<AdminUserRecord | null> {
  if (!isAdminApiEnabled()) return null;
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
  if (!isAdminApiEnabled()) {
    return { ok: false, response: adminNotAvailable() };
  }

  const user = await authenticateAdminRequest(request);
  if (!user) {
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
