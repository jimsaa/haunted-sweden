import { clientHasPermission } from "@/lib/admin/auth";
import type { AdminPublicUser } from "@/lib/admin/users-types";

export type SubmissionCapabilities = {
  canView: boolean;
  canApprovePlace: boolean;
  canRejectPlace: boolean;
  canApproveImage: boolean;
  canRejectImage: boolean;
  canApproveVideo: boolean;
  canRejectVideo: boolean;
  canConvertDraft: boolean;
  canAttachImage: boolean;
  canAttachVideo: boolean;
};

export function getSubmissionCapabilities(
  user: AdminPublicUser | null
): SubmissionCapabilities {
  const no: SubmissionCapabilities = {
    canView: false,
    canApprovePlace: false,
    canRejectPlace: false,
    canApproveImage: false,
    canRejectImage: false,
    canApproveVideo: false,
    canRejectVideo: false,
    canConvertDraft: false,
    canAttachImage: false,
    canAttachVideo: false,
  };
  if (!user) return no;
  return {
    canView: clientHasPermission(user, "view_submissions"),
    canApprovePlace: clientHasPermission(user, "approve_place_tips"),
    canRejectPlace: clientHasPermission(user, "reject_place_tips"),
    canApproveImage: clientHasPermission(user, "approve_image_suggestions"),
    canRejectImage: clientHasPermission(user, "reject_image_suggestions"),
    canApproveVideo: clientHasPermission(user, "approve_video_suggestions"),
    canRejectVideo: clientHasPermission(user, "reject_video_suggestions"),
    canConvertDraft:
      clientHasPermission(user, "create_new_locations") &&
      clientHasPermission(user, "approve_place_tips"),
    canAttachImage:
      clientHasPermission(user, "edit_locations") &&
      clientHasPermission(user, "upload_images"),
    canAttachVideo:
      clientHasPermission(user, "edit_locations") &&
      clientHasPermission(user, "upload_videos"),
  };
}
