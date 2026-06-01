import { NextResponse } from "next/server";
import {
  forbidden,
  requireAdminUser,
  unauthorized,
} from "@/lib/admin/api-auth";
import type { AdminPermission } from "@/lib/admin/permissions";

export { unauthorized, forbidden };

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
