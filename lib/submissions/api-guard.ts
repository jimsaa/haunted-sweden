import { NextResponse } from "next/server";
import {
  forbidden,
  requireAdminUser,
  unauthorized,
  adminNotAvailable,
} from "@/lib/admin/api-auth";
import { isAdminApiEnabled } from "@/lib/admin/auth";
import type { AdminPermission } from "@/lib/admin/permissions";

/** Local prototype: JSON file writes only in non-production. */
export function isSubmissionsWriteEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function submissionsWriteDisabled() {
  return NextResponse.json(
    {
      error:
        "Submissions API is disabled in production. Use local dev or enable a database backend.",
    },
    { status: 403 }
  );
}

export { unauthorized, adminNotAvailable, forbidden };

/** Any authenticated admin (e.g. load place list for attach dropdown). */
export async function requireAdmin(request: Request) {
  return requireAdminUser(request);
}

export async function requireAdminPermission(
  request: Request,
  permission: AdminPermission
) {
  return requireAdminUser(request, permission);
}
