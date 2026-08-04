import type { PlaceCategory } from "@/lib/categories";
import type { PlaceCommunityPrepared } from "@/lib/types/community";
import type { PlaceInvestigationContentPrepared } from "@/lib/types/investigation-content";
import type { FeaturedInSource, SpokjaktPriority } from "@/lib/types/spokjakt";
import type { HauntedSwedenInvestigationRecord } from "@/lib/types/investigation-sources";
import type { SpokjaktPlaceData } from "@/lib/types/spokjakt-place";
import type { VerificationLevel } from "@/lib/types/verification";
import type { PlaceFaqItem } from "@/lib/types/place-faq";
import type { PlaceImage, PlaceMedia, PlaceVideo } from "@/lib/types/place-media";

export type { PlaceCategory } from "@/lib/categories";
export type { PlaceFaqItem } from "@/lib/types/place-faq";

export type PlaceStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "hidden"
  | "archived";

export type {
  PlaceImage,
  PlaceVideo,
  PlaceMedia,
  MediaStatus,
  VideoPlatform,
} from "@/lib/types/place-media";

export interface PlaceReport {
  id: string;
  placeId: string;
  title: string;
  body: string;
  author: string;
  date: string;
  status: "pending" | "approved";
}

/** Reserved for future Google Places API — reviews UI not implemented yet. */
export interface GooglePlaceFields {
  googlePlaceId: string | null;
  googleMapsUrl?: string;
  googleRating: number | null;
  googleReviewsEnabled: boolean;
}

export interface HauntedPlace extends GooglePlaceFields {
  id: string;
  slug: string;
  name: string;
  englishName?: string;
  coverImage?: string | null;
  /** Gallery images (homepage, place detail). */
  images: PlaceImage[];
  /** Linked investigation / tour videos. */
  videos: PlaceVideo[];
  category: PlaceCategory;
  city: string;
  region: string;
  country?: string;
  address?: string;
  latitude: number | null;
  longitude: number | null;
  clusterId?: string;
  clusterName?: string;
  featured: boolean;
  /** @deprecated Prefer verificationLevel — synced on load */
  verified: boolean;
  hauntingLevel: number;
  shortDescription: string;
  shortDescriptionSv?: string;
  /** Editorial: Haunted Sweden App Summary (public cards use shortDescription if omitted). */
  hauntedSwedenAppSummary?: string | null;
  hauntedSwedenAppSummarySv?: string;
  /** Editorial: Haunted Sweden Score (e.g. 8.8). */
  hauntedSwedenScore?: number | null;
  /** Editorial: Suggested Haunted Sweden Tags. */
  suggestedHauntedSwedenTags?: string[];
  /** Editorial: Why It Fits Haunted Sweden. */
  whyItFitsHauntedSweden?: string | null;
  history: string;
  historySv?: string;
  legend: string;
  legendSv?: string;
  /** FAQ for landing-page SEO (FAQPage schema). */
  faq?: PlaceFaqItem[];
  /** English safety copy (safetyNote_en in admin). */
  safetyNote?: string;
  /** Swedish safety copy (safetyNote_sv in admin). */
  safetyNoteSv?: string;
  sourceLinks?: string[];
  paranormalType: string[];
  accessType: string;
  familyFriendly: boolean;
  visitDifficulty?: number;
  nightAccess?: boolean;
  parkingAvailable?: boolean;
  guidedTours?: boolean;
  publicAccess?: boolean;

  /** Trust & investigation metadata */
  verificationLevel: VerificationLevel;
  verifiedByTeam: boolean;
  /** True when the Haunted Sweden team has physically visited the site. */
  visitedByTeam?: boolean;
  visitCount: number;
  lastInvestigationDate: string | null;
  investigationPhotos: PlaceMedia[];
  investigationVideos: PlaceMedia[];
  overnightInvestigation: boolean;
  /** Cross-media appearances (Spökjakt, LaxTon, Haunted Sweden tiers). */
  featuredIn?: FeaturedInSource[];
  /** True when location appeared in TV series Spökjakt. */
  featuredInSpokjakt?: boolean;
  spokjaktData?: SpokjaktPlaceData | null;
  spokjaktPriority?: SpokjaktPriority | null;
  /** Future / partial: Haunted Sweden team visit record. */
  hauntedSwedenInvestigation?: HauntedSwedenInvestigationRecord;

  /** Future community aggregates — not shown in MVP UI */
  community?: PlaceCommunityPrepared;

  /** Future verified-location content — not shown in MVP UI */
  investigationContent?: PlaceInvestigationContentPrepared;

  evidenceCount: number;
  reportCount: number;
  photoCount: number;
  videoCount: number;
  status: PlaceStatus;
}

export interface HauntedPlacesFile {
  version: number;
  places: HauntedPlace[];
}
