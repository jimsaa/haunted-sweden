import type { SpokjaktPriority } from "@/lib/types/spokjakt";

/** Per-place Spökjakt TV metadata (Seen in Spökjakt). */
export interface SpokjaktPlaceData {
  season: number;
  episode: number;
  year: number;
  /** Short summary (alias: investigationSummary). */
  summary?: string;
  investigators: string[];
  investigationSummary: string;
  /** Official Familjen Lundell Spökjakt YouTube playlist (defaults at load). */
  playlistLink?: string;
  videoLinks: string[];
  streamingLinks: string[];
  archiveSlug?: string;
  priority?: SpokjaktPriority;
  isRevisit?: boolean;
  revisitOfSeason?: number;
}
