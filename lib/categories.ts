/**
 * Canonical haunted place categories.
 * Stored in JSON in English; UI labels come from translations.
 */
export const PLACE_CATEGORIES = [
  "Haunted Accommodation",
  "Castle / Castle Ruin",
  "Manor / Estate",
  "Church / Cemetery",
  "Forest / Nature Site",
  "Legend Site",
  "Abandoned Place",
  "Urban Legend",
  "Historical Tragedy Site",
  "Haunted Museum",
  "Other",
] as const;

export type PlaceCategory = (typeof PLACE_CATEGORIES)[number];

/** URL-safe ids for map/homepage category filters (one per main category). */
export const CATEGORY_FILTER_IDS = [
  "haunted-accommodation",
  "castle-castle-ruin",
  "manor-estate",
  "church-cemetery",
  "forest-nature-site",
  "legend-site",
  "abandoned-place",
  "urban-legend",
  "historical-tragedy-site",
  "haunted-museum",
  "other",
] as const;

export type CategoryFilterId = (typeof CATEGORY_FILTER_IDS)[number];

export const FILTER_TO_CATEGORY: Record<CategoryFilterId, PlaceCategory> = {
  "haunted-accommodation": "Haunted Accommodation",
  "castle-castle-ruin": "Castle / Castle Ruin",
  "manor-estate": "Manor / Estate",
  "church-cemetery": "Church / Cemetery",
  "forest-nature-site": "Forest / Nature Site",
  "legend-site": "Legend Site",
  "abandoned-place": "Abandoned Place",
  "urban-legend": "Urban Legend",
  "historical-tragedy-site": "Historical Tragedy Site",
  "haunted-museum": "Haunted Museum",
  other: "Other",
};

/** Maps legacy JSON category slugs to current English categories. */
export const LEGACY_CATEGORY_MAP: Record<string, PlaceCategory> = {
  accommodation: "Haunted Accommodation",
  castle: "Castle / Castle Ruin",
  castle_ruin: "Castle / Castle Ruin",
  manor: "Manor / Estate",
  church: "Church / Cemetery",
  cemetery: "Church / Cemetery",
  forest: "Forest / Nature Site",
  legend: "Legend Site",
  legend_site: "Legend Site",
  abandoned: "Abandoned Place",
  haunted_museum: "Haunted Museum",
  museum: "Haunted Museum",
  other: "Other",
};

export function isPlaceCategory(value: string): value is PlaceCategory {
  return (PLACE_CATEGORIES as readonly string[]).includes(value);
}

export function isCategoryFilterId(value: string | null): value is CategoryFilterId {
  return (
    value != null &&
    (CATEGORY_FILTER_IDS as readonly string[]).includes(value)
  );
}

export function normalizePlaceCategory(value: string): PlaceCategory {
  if (isPlaceCategory(value)) return value;
  return LEGACY_CATEGORY_MAP[value] ?? "Other";
}

export function getCategoryFilterId(
  category: PlaceCategory
): CategoryFilterId | undefined {
  const entry = Object.entries(FILTER_TO_CATEGORY).find(
    ([, cat]) => cat === category
  );
  return entry ? (entry[0] as CategoryFilterId) : undefined;
}
