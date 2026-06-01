import type { Locale } from "@/lib/translations";
import type { MapBadgeLabels } from "@/lib/map-marker-badges";

/** Sweden View place popup copy. */
export interface SwedenPopupLabels {
  locale: Locale;
  viewDetails: string;
  hauntingLevel: string;
  cityRegion: string;
  category: string;
  verification: string;
  metadata: string;
  close: string;
  /** Hover tooltips for the status icon row under the title. */
  badgeTooltips: MapBadgeLabels & { premium?: string };
}
