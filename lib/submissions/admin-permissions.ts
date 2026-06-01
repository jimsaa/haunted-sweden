import type { AdminPermission } from "@/lib/admin/permissions";
import { userHasPermission } from "@/lib/admin/permissions";
import type { AdminUserRecord } from "@/lib/admin/users-types";
import type { SubmissionKind } from "@/lib/submissions/types";

export function approvePermissionForKind(
  kind: SubmissionKind
): AdminPermission {
  if (kind === "place") return "approve_place_tips";
  if (kind === "media") return "approve_image_suggestions";
  return "approve_video_suggestions";
}

export function rejectPermissionForKind(
  kind: SubmissionKind
): AdminPermission {
  if (kind === "place") return "reject_place_tips";
  if (kind === "media") return "reject_image_suggestions";
  return "reject_video_suggestions";
}

export function userCanApproveKind(
  user: AdminUserRecord,
  kind: SubmissionKind
): boolean {
  return userHasPermission(
    user.role,
    user.permissions,
    approvePermissionForKind(kind)
  );
}

export function userCanRejectKind(
  user: AdminUserRecord,
  kind: SubmissionKind
): boolean {
  return userHasPermission(
    user.role,
    user.permissions,
    rejectPermissionForKind(kind)
  );
}

export function userCanAttachMedia(
  user: AdminUserRecord,
  kind: "media" | "video"
): boolean {
  if (!userHasPermission(user.role, user.permissions, "edit_locations")) {
    return false;
  }
  return userHasPermission(
    user.role,
    user.permissions,
    kind === "media" ? "upload_images" : "upload_videos"
  );
}
