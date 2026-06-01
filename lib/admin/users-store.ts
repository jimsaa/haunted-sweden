/**
 * Admin users loaded from data/admin-users.json (server-side only).
 * TODO: Supabase Auth + hashed passwords; avoid plaintext passwords in repo for production scale.
 */
import { readFile, writeFile } from "fs/promises";
import path from "path";
import {
  ADMIN_PERMISSION_KEYS,
  OWNER_USER_ID,
  allPermissionsEnabled,
  coAdminDefaultPermissions,
} from "@/lib/admin/permissions";
import type { AdminPermissionsMap } from "@/lib/admin/permissions";
import type { AdminUserRecord, AdminUsersFile } from "@/lib/admin/users-types";

const USERS_PATH = path.join(process.cwd(), "data", "admin-users.json");

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

export async function readAdminUsersFile(): Promise<AdminUsersFile> {
  try {
    const raw = await readFile(USERS_PATH, "utf8");
    const parsed = JSON.parse(raw) as AdminUsersFile;
    if (!Array.isArray(parsed.users)) {
      return { users: getDefaultUsers() };
    }
    return {
      users: parsed.users.map((u) => ({
        ...u,
        permissions: normalizePermissions(u.permissions, u.role),
      })),
    };
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      const defaults = { users: getDefaultUsers() };
      await writeAdminUsersFile(defaults);
      return defaults;
    }
    throw err;
  }
}

export async function writeAdminUsersFile(file: AdminUsersFile): Promise<void> {
  const sanitized: AdminUsersFile = {
    users: file.users.map((u) => {
      const permissions =
        u.role === "owner" || u.id === OWNER_USER_ID
          ? allPermissionsEnabled()
          : normalizePermissions(u.permissions, u.role);
      return { ...u, permissions };
    }),
  };
  const json = `${JSON.stringify(sanitized, null, 2)}\n`;
  await writeFile(USERS_PATH, json, "utf8");
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
