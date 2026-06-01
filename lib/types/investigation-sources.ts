/** Prepared Haunted Sweden team verification payload (future / partial today). */
export interface HauntedSwedenInvestigationRecord {
  status: "verified" | "not_investigated_yet";
  verificationDate?: string | null;
  photosAdded?: number;
  videosAdded?: number;
  evidenceCollected?: number;
  overnightStayCompleted?: boolean;
  evpSessionCompleted?: boolean;
}

export interface InvestigationTimelineEntry {
  year: number;
  label: string;
  source: "spokjakt" | "laxton" | "haunted-sweden" | "other";
  detail?: string;
}

export type InvestigationSourceKey = "spokjakt" | "laxton" | "hauntedSweden";

export interface InvestigationSourceCard {
  key: InvestigationSourceKey;
  title: string;
  statusLabel: string;
  typeLabel: string;
  available: boolean;
  meta?: string[];
}
