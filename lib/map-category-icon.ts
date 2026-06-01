import { normalizePlaceCategory, type PlaceCategory } from "@/lib/categories";
import type { MapIconType } from "@/lib/map-icon-types";

const CATEGORY_TO_ICON: Record<PlaceCategory, MapIconType> = {
  "Castle / Castle Ruin": "castle-fortress",
  "Church / Cemetery": "church-cemetery",
  "Haunted Accommodation": "haunted-accommodation",
  "Haunted Museum": "museum",
  "Forest / Nature Site": "nature-site",
  "Manor / Estate": "manor-estate",
  "Urban Legend": "urban-haunting",
  "Legend Site": "legend-site",
  "Historical Tragedy Site": "burial-ground",
  "Abandoned Place": "manor-estate",
  Other: "legend-site",
};

export function getMapIconType(category: PlaceCategory | string): MapIconType {
  const normalized = normalizePlaceCategory(category);
  return CATEGORY_TO_ICON[normalized];
}
