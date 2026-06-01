import type { PlaceMedia } from "@/lib/types/place";

/**
 * Future content for Haunted Sweden–verified locations.
 * Not rendered in MVP — reserved for investigation timeline, team notes, sources.
 */

export interface InvestigationTimelineEvent {
  id: string;
  date: string;
  title: string;
  summary: string;
  media?: PlaceMedia[];
}

export interface PlaceInvestigationContentPrepared {
  timeline: InvestigationTimelineEvent[];
  teamNotes: string | null;
  investigationMedia: PlaceMedia[];
  historicalSources: string[];
  communityEvidenceIds: string[];
}

export const DEFAULT_INVESTIGATION_CONTENT: PlaceInvestigationContentPrepared =
  {
    timeline: [],
    teamNotes: null,
    investigationMedia: [],
    historicalSources: [],
    communityEvidenceIds: [],
  };
