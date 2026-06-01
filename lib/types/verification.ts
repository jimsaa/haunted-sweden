import type { PlaceMedia } from "@/lib/types/place";

/**
 * Trust tiers for haunted locations.
 * Stored in English in JSON; labels translated in UI.
 */
export const VERIFICATION_LEVELS = [
  "community-submitted",
  "community-verified",
  "haunted-sweden-verified",
] as const;

export type VerificationLevel = (typeof VERIFICATION_LEVELS)[number];

/** Team investigation & trust metadata (MVP fields). */
export interface PlaceVerification {
  verificationLevel: VerificationLevel;
  /** True when the Haunted Sweden team has verified the site after investigation. */
  verifiedByTeam: boolean;
  /** True when the Haunted Sweden team has physically visited the site. */
  visitedByTeam: boolean;
  visitCount: number;
  lastInvestigationDate: string | null;
  investigationPhotos: PlaceMedia[];
  investigationVideos: PlaceMedia[];
  overnightInvestigation: boolean;
}

export const DEFAULT_VERIFICATION: PlaceVerification = {
  verificationLevel: "community-submitted",
  verifiedByTeam: false,
  visitedByTeam: false,
  visitCount: 0,
  lastInvestigationDate: null,
  investigationPhotos: [],
  investigationVideos: [],
  overnightInvestigation: false,
};
