import type { AdminPermissionsMap, AdminRole } from "@/lib/admin/permissions";

export interface AdminUserRecord {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
  password: string;
  enabled: boolean;
  permissions: AdminPermissionsMap;
}

export interface AdminUsersFile {
  users: AdminUserRecord[];
}

/** Safe user payload for client (no password). */
export interface AdminPublicUser {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
  enabled: boolean;
  permissions: AdminPermissionsMap;
}

export function toPublicUser(user: AdminUserRecord): AdminPublicUser {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    enabled: user.enabled,
    permissions: user.permissions,
  };
}
