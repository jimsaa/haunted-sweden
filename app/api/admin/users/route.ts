import { NextResponse } from "next/server";
import {
  getAdminUsersStorageBackend,
  usesAdminUsersBlob,
} from "@/lib/admin/admin-users-storage";
import { requireAdminUser } from "@/lib/admin/api-auth";
import {
  ADMIN_PERMISSION_KEYS,
  OWNER_USER_ID,
  canDeleteUser,
  canManageTargetUser,
} from "@/lib/admin/permissions";
import type { AdminPermissionsMap } from "@/lib/admin/permissions";
import { toPublicUser } from "@/lib/admin/users-types";
import {
  readAdminUsersFile,
  writeAdminUsersFile,
} from "@/lib/admin/users-store";

function mapUsersWriteError(err: unknown): {
  status: number;
  error: string;
  errorSv: string;
} {
  const message = err instanceof Error ? err.message : String(err);
  if (message.includes("BLOB_READ_WRITE_TOKEN")) {
    return {
      status: 503,
      error: "User storage is not configured. Please try again later.",
      errorSv: "Lagring för användare är inte konfigurerad. Försök igen senare.",
    };
  }
  const code = (err as NodeJS.ErrnoException).code;
  if (code === "EROFS" || code === "EPERM") {
    return {
      status: 503,
      error: "Could not save user settings. Storage is read-only.",
      errorSv: "Kunde inte spara användarinställningar. Lagringen är skrivskyddad.",
    };
  }
  return {
    status: 500,
    error: "Could not save user settings.",
    errorSv: "Kunde inte spara användarinställningar.",
  };
}

export async function GET(request: Request) {
  const auth = await requireAdminUser(request, "manage_users");
  if (!auth.ok) return auth.response;

  try {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "[admin/users GET] backend:",
        getAdminUsersStorageBackend(),
        "| blob token:",
        usesAdminUsersBlob() ? "yes" : "no"
      );
    }

    const file = await readAdminUsersFile();
    return NextResponse.json({
      users: file.users.map((u) => toPublicUser(u)),
      updatedAt: file.updatedAt ?? null,
    });
  } catch (err) {
    console.error("[admin/users GET]", err);
    return NextResponse.json(
      {
        error: "Failed to read users",
        errorSv: "Kunde inte läsa användare",
      },
      { status: 500 }
    );
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

    if (process.env.NODE_ENV !== "production") {
      console.log(
        "[admin/users POST] Saved user",
        target.id,
        "— backend:",
        getAdminUsersStorageBackend()
      );
    }

    return NextResponse.json({ ok: true, user: toPublicUser(target) });
  } catch (err) {
    console.error("[admin/users POST]", err);
    const mapped = mapUsersWriteError(err);
    return NextResponse.json(
      { error: mapped.error, errorSv: mapped.errorSv },
      { status: mapped.status }
    );
  }
}
