/**
 * TODO: Migrate roles and permissions to Supabase Auth + RLS policies.
 */

export const OWNER_USER_ID = "jim";

export const ADMIN_PERMISSION_KEYS = [
  "view_submissions",
  "approve_place_tips",
  "reject_place_tips",
  "approve_image_suggestions",
  "reject_image_suggestions",
  "approve_video_suggestions",
  "reject_video_suggestions",
  "edit_locations",
  "create_new_locations",
  "delete_locations",
  "edit_swedish_text",
  "edit_english_text",
  "upload_images",
  "upload_videos",
  "manage_featured_locations",
  "manage_verification_status",
  "view_analytics",
  "manage_users",
  "access_admin_settings",
] as const;

export type AdminPermission = (typeof ADMIN_PERMISSION_KEYS)[number];

export type AdminRole = "owner" | "co_admin";

export type AdminPermissionsMap = Record<AdminPermission, boolean>;

export const PERMISSION_LABELS: Record<AdminPermission, string> = {
  view_submissions: "View submissions",
  approve_place_tips: "Approve place tips",
  reject_place_tips: "Reject place tips",
  approve_image_suggestions: "Approve image suggestions",
  reject_image_suggestions: "Reject image suggestions",
  approve_video_suggestions: "Approve video suggestions",
  reject_video_suggestions: "Reject video suggestions",
  edit_locations: "Edit locations",
  create_new_locations: "Create new locations",
  delete_locations: "Delete locations",
  edit_swedish_text: "Edit Swedish text",
  edit_english_text: "Edit English text",
  upload_images: "Upload images",
  upload_videos: "Upload videos",
  manage_featured_locations: "Manage featured locations",
  manage_verification_status: "Manage verification status",
  view_analytics: "View analytics",
  manage_users: "Manage users",
  access_admin_settings: "Access admin settings",
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  owner: "Owner",
  co_admin: "Co-Admin",
};

export function allPermissionsEnabled(): AdminPermissionsMap {
  return Object.fromEntries(
    ADMIN_PERMISSION_KEYS.map((k) => [k, true])
  ) as AdminPermissionsMap;
}

/** Default Co-Admin (Maria) — submission review only. */
export function coAdminDefaultPermissions(): AdminPermissionsMap {
  const base = Object.fromEntries(
    ADMIN_PERMISSION_KEYS.map((k) => [k, false])
  ) as AdminPermissionsMap;
  base.view_submissions = true;
  base.approve_place_tips = true;
  base.reject_place_tips = true;
  base.approve_image_suggestions = true;
  base.reject_image_suggestions = true;
  base.approve_video_suggestions = true;
  base.reject_video_suggestions = true;
  return base;
}

export function userHasPermission(
  role: AdminRole,
  permissions: AdminPermissionsMap,
  permission: AdminPermission
): boolean {
  if (role === "owner") return true;
  return permissions[permission] === true;
}

export function canManageTargetUser(
  actorRole: AdminRole,
  targetUserId: string
): boolean {
  if (targetUserId === OWNER_USER_ID && actorRole !== "owner") {
    return false;
  }
  return true;
}

export function canDeleteUser(targetUserId: string): boolean {
  return targetUserId !== OWNER_USER_ID;
}
