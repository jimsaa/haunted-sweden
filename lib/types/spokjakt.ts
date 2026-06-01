/**
 * Spökjakt Archive — TV investigation index for Haunted Sweden.
 * @see docs/SPOKJAKT-ARCHIVE.md
 */

export const SPOKJAKT_PRIORITIES = [
  "LEGENDARY",
  "HIGH_PRIORITY",
  "DISCOVERY",
] as const;

export type SpokjaktPriority = (typeof SPOKJAKT_PRIORITIES)[number];

export const SPOKJAKT_INVESTIGATION_TYPES = [
  "EVP",
  "Spirit Box",
  "Thermal Camera",
  "Overnight Stay",
  "Drone Exploration",
  "Historical Documentary",
  "Witness Interviews",
] as const;

export type SpokjaktInvestigationType =
  (typeof SPOKJAKT_INVESTIGATION_TYPES)[number];

/** Future Haunted Sweden cross-media flags. */
export const FEATURED_IN_SOURCES = [
  "spokjakt",
  "laxton-youtube",
  "haunted-sweden-verified",
  "haunted-sweden-premium",
] as const;

export type FeaturedInSource = (typeof FEATURED_IN_SOURCES)[number];

export interface SpokjaktArchiveEntry {
  id: string;
  slug: string;
  locationName: string;
  country: string;
  season: number;
  seasonEpisode: number;
  /** Overall series episode number (Wikipedia). */
  seriesEpisode?: number;
  year: number;
  locationType: string;
  shortDescription: string;
  /** Historically documented facts only. */
  documentedHistory: string;
  /** Witness / staff reports (not proven paranormal). */
  witnessReports: string;
  /** Folklore and claimed activity (unverified). */
  paranormalClaims: string;
  whyConsideredHaunted: string;
  hauntedSwedenPotential: string;
  visitedBy: string[];
  investigationHighlights: string;
  currentStatus: string;
  latitude: number | null;
  longitude: number | null;
  coordinatesNote?: string;
  visitorsCanAccess: boolean;
  accessNotes?: string;
  hauntedSwedenScore: number | null;
  priority: SpokjaktPriority;
  suggestedHauntedSwedenTags: string[];
  suggestedInvestigationTypes: SpokjaktInvestigationType[];
  featuredIn: FeaturedInSource[];
  /** Link to approved Haunted Sweden place slug when listed. */
  hauntedSwedenPlaceSlug: string | null;
  isRevisit?: boolean;
  revisitOfSeason?: number;
}

export interface SpokjaktTop10Entry {
  rank: number;
  archiveId: string;
  rationale: string;
}

export interface SpokjaktArchiveData {
  version: number;
  title: string;
  description: string;
  showInfo: {
    name: string;
    network: string;
    producers: string[];
    coreTeam: string[];
  };
  investigationTypes: SpokjaktInvestigationType[];
  priorities: Record<
    SpokjaktPriority,
    { label: string; description: string }
  >;
  entries: SpokjaktArchiveEntry[];
  top10SwedishLocations: SpokjaktTop10Entry[];
}
