import { clientHasPermission } from "@/lib/admin/auth";
import type { AdminPublicUser } from "@/lib/admin/users-types";

export type PlaceEditorAccess = {
  editLocations: boolean;
  editSwedish: boolean;
  editEnglish: boolean;
  uploadImages: boolean;
  uploadVideos: boolean;
  manageFeatured: boolean;
  manageVerification: boolean;
  deleteLocations: boolean;
};

const FULL_ACCESS: PlaceEditorAccess = {
  editLocations: true,
  editSwedish: true,
  editEnglish: true,
  uploadImages: true,
  uploadVideos: true,
  manageFeatured: true,
  manageVerification: true,
  deleteLocations: true,
};

export function getPlaceEditorAccess(
  user: AdminPublicUser | null
): PlaceEditorAccess {
  if (!user) return FULL_ACCESS;
  return {
    editLocations: clientHasPermission(user, "edit_locations"),
    editSwedish: clientHasPermission(user, "edit_swedish_text"),
    editEnglish: clientHasPermission(user, "edit_english_text"),
    uploadImages: clientHasPermission(user, "upload_images"),
    uploadVideos: clientHasPermission(user, "upload_videos"),
    manageFeatured: clientHasPermission(user, "manage_featured_locations"),
    manageVerification: clientHasPermission(user, "manage_verification_status"),
    deleteLocations: clientHasPermission(user, "delete_locations"),
  };
}

export function canAccessPlacesTab(user: AdminPublicUser | null): boolean {
  if (!user) return true;
  const a = getPlaceEditorAccess(user);
  return (
    a.editLocations ||
    a.editSwedish ||
    a.editEnglish ||
    a.uploadImages ||
    a.uploadVideos ||
    a.manageFeatured ||
    a.manageVerification
  );
}
