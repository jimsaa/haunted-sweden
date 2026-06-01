import type { PlaceCategory } from "@/lib/categories";
import type { VideoPlatform } from "@/lib/types/place-media";

export type SubmissionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "archived";

export interface SubmissionReviewMeta {
  submittedAt: string;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  adminNotes?: string | null;
}

export interface PlaceSubmission extends SubmissionReviewMeta {
  id: string;
  status: SubmissionStatus;
  name: string;
  englishName?: string;
  category: PlaceCategory | string;
  city: string;
  region: string;
  description: string;
  history?: string;
  legend?: string;
  submitterName?: string;
  submitterEmail?: string;
  /** Set when converted to haunted-places.json draft */
  convertedPlaceId?: string | null;
}

export interface MediaSubmission extends SubmissionReviewMeta {
  id: string;
  status: SubmissionStatus;
  mediaType: "image";
  url: string;
  caption?: string;
  placeId?: string | null;
  placeName?: string;
  submitterName?: string;
  submitterEmail?: string;
  attachedToPlaceId?: string | null;
}

export type VideoLinkPlatform =
  | VideoPlatform
  | "youtube"
  | "tiktok"
  | "facebook"
  | "other";

export interface VideoSubmission extends SubmissionReviewMeta {
  id: string;
  status: SubmissionStatus;
  url: string;
  platform?: VideoLinkPlatform;
  caption?: string;
  placeId?: string | null;
  placeName?: string;
  submitterName?: string;
  submitterEmail?: string;
  attachedToPlaceId?: string | null;
}

export interface PlaceSubmissionsFile {
  submissions: PlaceSubmission[];
}

export interface MediaSubmissionsFile {
  submissions: MediaSubmission[];
}

export interface VideoSubmissionsFile {
  submissions: VideoSubmission[];
}

export type SubmissionKind = "place" | "media" | "video";
