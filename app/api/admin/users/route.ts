import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/api-auth";
import {
  ADMIN_PERMISSION_KEYS,
  OWNER_USER_ID,
  canDeleteUser,
  canManageTargetUser,
} from "@/lib/admin/permissions";
import type { AdminPermissionsMap } from "@/lib/admin/permissions";
import { toPublicUser } from "@/lib/admin/users-types";
import type { AdminUserRecord } from "@/lib/admin/users-types";
import {
  readAdminUsersFile,
  writeAdminUsersFile,
} from "@/lib/admin/users-store";

export async function GET(request: Request) {
  const auth = await requireAdminUser(request, "manage_users");
  if (!auth.ok) return auth.response;

  try {
    const file = await readAdminUsersFile();
    return NextResponse.json({
      users: file.users.map((u) => toPublicUser(u)),
    });
  } catch (err) {
    console.error("[admin/users GET]", err);
    return NextResponse.json({ error: "Failed to read users" }, { status: 500 });
  }
}

type UpdateBody = {
  userId: string;
  enabled?: boolean;
  password?: string;
  permissions?: Partial<AdminPermissionsMap>;
  displayName?: string;
  delete?: boolean;
};

export async function POST(request: Request) {
  const auth = await requireAdminUser(request, "manage_users");
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as UpdateBody;
    if (!body.userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    if (!canManageTargetUser(auth.user.role, body.userId)) {
      return NextResponse.json(
        { error: "You cannot modify the Owner account" },
        { status: 403 }
      );
    }

    const file = await readAdminUsersFile();
    const idx = file.users.findIndex((u) => u.id === body.userId);
    if (idx < 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (body.delete) {
      if (!canDeleteUser(body.userId)) {
        return NextResponse.json(
          { error: "Owner cannot be deleted" },
          { status: 403 }
        );
      }
      file.users.splice(idx, 1);
      await writeAdminUsersFile(file);
      return NextResponse.json({ ok: true, deleted: true });
    }

    const target = file.users[idx]!;

    if (body.enabled !== undefined) {
      if (target.id === OWNER_USER_ID && !body.enabled) {
        return NextResponse.json(
          { error: "Owner account cannot be disabled" },
          { status: 403 }
        );
      }
      target.enabled = body.enabled;
    }

    if (body.password?.trim()) {
      target.password = body.password.trim();
    }

    if (body.displayName?.trim()) {
      target.displayName = body.displayName.trim();
    }

    if (body.permissions && target.role !== "owner" && target.id !== OWNER_USER_ID) {
      for (const key of ADMIN_PERMISSION_KEYS) {
        if (typeof body.permissions[key] === "boolean") {
          target.permissions[key] = body.permissions[key]!;
        }
      }
    }

    file.users[idx] = target;
    await writeAdminUsersFile(file);

    return NextResponse.json({ ok: true, user: toPublicUser(target) });
  } catch (err) {
    console.error("[admin/users POST]", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
