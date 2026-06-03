/**
 * Admin users — local JSON in dev, Vercel Blob in production (when BLOB_READ_WRITE_TOKEN is set).
 */
import {
  getAdminUsersStorageBackend,
  readAdminUsersFromStore,
  readBundledAdminUsersJson,
  writeAdminUsersToStore,
} from "@/lib/admin/admin-users-storage";
import {
  ADMIN_PERMISSION_KEYS,
  OWNER_USER_ID,
  allPermissionsEnabled,
  coAdminDefaultPermissions,
} from "@/lib/admin/permissions";
import type { AdminPermissionsMap } from "@/lib/admin/permissions";
import type { AdminUserRecord, AdminUsersFile } from "@/lib/admin/users-types";

const EMPTY_FILE: AdminUsersFile = { users: [] };

function normalizePermissions(
  raw: Partial<AdminPermissionsMap> | undefined,
  role: AdminUserRecord["role"]
): AdminPermissionsMap {
  if (role === "owner") return allPermissionsEnabled();
  const defaults = coAdminDefaultPermissions();
  const out = { ...defaults };
  if (raw) {
    for (const key of ADMIN_PERMISSION_KEYS) {
      if (typeof raw[key] === "boolean") {
        out[key] = raw[key]!;
      }
    }
  }
  return out;
}

function normalizeFile(file: AdminUsersFile): AdminUsersFile {
  if (!Array.isArray(file.users)) {
    return { users: getDefaultUsers(), updatedAt: file.updatedAt };
  }
  return {
    updatedAt: file.updatedAt,
    users: file.users.map((u) => ({
      ...u,
      permissions: normalizePermissions(u.permissions, u.role),
    })),
  };
}

export async function readAdminUsersFile(): Promise<AdminUsersFile> {
  const fromStore = normalizeFile(
    await readAdminUsersFromStore<AdminUsersFile>(EMPTY_FILE)
  );

  if (fromStore.users.length > 0) {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[admin-users] Loaded ${fromStore.users.length} user(s) from ${getAdminUsersStorageBackend()}`
      );
    }
    return fromStore;
  }

  const bundled = normalizeFile(
    await readBundledAdminUsersJson<AdminUsersFile>(EMPTY_FILE)
  );
  if (bundled.users.length > 0) {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[admin-users] Bootstrapped ${bundled.users.length} user(s) from bundled data/admin-users.json`
      );
    }
    return bundled;
  }

  const defaults: AdminUsersFile = {
    users: getDefaultUsers(),
    updatedAt: new Date().toISOString(),
  };
  try {
    await writeAdminUsersFile(defaults);
  } catch (err) {
    console.warn("[admin-users] Could not persist default users:", err);
  }
  return defaults;
}

export async function writeAdminUsersFile(file: AdminUsersFile): Promise<void> {
  const sanitized: AdminUsersFile = {
    updatedAt: new Date().toISOString(),
    users: file.users.map((u) => {
      const permissions =
        u.role === "owner" || u.id === OWNER_USER_ID
          ? allPermissionsEnabled()
          : normalizePermissions(u.permissions, u.role);
      return { ...u, permissions };
    }),
  };
  await writeAdminUsersToStore(sanitized);
}

export function getDefaultUsers(): AdminUserRecord[] {
  return [
    {
      id: OWNER_USER_ID,
      username: "Jim",
      displayName: "Jim",
      role: "owner",
      password: "3513",
      enabled: true,
      permissions: allPermissionsEnabled(),
    },
    {
      id: "maria",
      username: "Maria",
      displayName: "Maria",
      role: "co_admin",
      password: "4455",
      enabled: true,
      permissions: coAdminDefaultPermissions(),
    },
  ];
}

export async function findAdminUserByCredentials(
  username: string,
  password: string
): Promise<AdminUserRecord | null> {
  const file = await readAdminUsersFile();
  const normalized = username.trim().toLowerCase();
  const user = file.users.find(
    (u) => u.username.trim().toLowerCase() === normalized
  );
  if (!user || !user.enabled) return null;
  if (user.password !== password) return null;
  return user;
}

export async function findAdminUserById(
  id: string
): Promise<AdminUserRecord | null> {
  const file = await readAdminUsersFile();
  return file.users.find((u) => u.id === id) ?? null;
}
