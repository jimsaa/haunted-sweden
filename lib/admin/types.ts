import type { PlaceCategory } from "@/lib/categories";
import type { PlaceStatus } from "@/lib/types/place";
import type { MediaStatus, VideoPlatform } from "@/lib/types/place-media";
import type { VerificationLevel } from "@/lib/types/verification";

export type AdminTabId =
  | "basic"
  | "swedish"
  | "english"
  | "media"
  | "verification"
  | "access"
  | "google";

export interface AdminImageDraft {
  id: string;
  url: string;
  caption_en: string;
  caption_sv: string;
  credit: string;
  status: MediaStatus;
}

export interface AdminVideoDraft {
  id: string;
  url: string;
  title_en: string;
  title_sv: string;
  caption_en: string;
  caption_sv: string;
  platform: VideoPlatform;
  status: MediaStatus;
}

/** Editable place shape for the admin UI. */
export interface AdminPlaceDraft {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  category: PlaceCategory;
  city: string;
  region: string;
  latitude: string;
  longitude: string;
  shortDescription_en: string;
  shortDescription_sv: string;
  history_en: string;
  history_sv: string;
  legend_en: string;
  legend_sv: string;
  safetyNote_en: string;
  safetyNote_sv: string;
  hauntingLevel: number;
  featured: boolean;
  verified: boolean;
  verificationLevel: VerificationLevel;
  verifiedByTeam: boolean;
  visitedByTeam: boolean;
  lastInvestigationDate: string;
  overnightInvestigation: boolean;
  accessType: string;
  familyFriendly: boolean;
  nightAccess: boolean;
  publicAccess: boolean;
  parkingAvailable: boolean;
  googleMapsUrl: string;
  googlePlaceId: string;
  status: PlaceStatus;
  /** Primary map/card cover — public path or remote image URL */
  coverImage: string;
  images: AdminImageDraft[];
  videos: AdminVideoDraft[];
}

export interface AdminPlacesState {
  version: number;
  places: AdminPlaceDraft[];
}
