import type { CategoryFilterId } from "@/lib/categories";
import { FILTER_TO_CATEGORY } from "@/lib/categories";
import type { HauntedPlace } from "@/lib/types/place";

export function filterPlacesByCategory(
  places: HauntedPlace[],
  filterId: CategoryFilterId | null
): HauntedPlace[] {
  if (!filterId) return places;
  const category = FILTER_TO_CATEGORY[filterId];
  return places.filter((p) => p.category === category);
}

export function searchPlaces(
  places: HauntedPlace[],
  query: string
): HauntedPlace[] {
  const q = query.trim().toLowerCase();
  if (!q) return places;

  return places.filter((p) => {
    const haystack = [
      p.name,
      p.englishName ?? "",
      p.city,
      p.region,
      p.country ?? "",
      p.shortDescription,
      p.shortDescriptionSv ?? "",
      p.historySv ?? "",
      p.legendSv ?? "",
      p.slug,
      p.clusterName ?? "",
      p.category,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterAndSearchPlaces(
  places: HauntedPlace[],
  options: { query?: string; categoryFilterId?: CategoryFilterId | null }
): HauntedPlace[] {
  let result = filterPlacesByCategory(
    places,
    options.categoryFilterId ?? null
  );
  if (options.query) {
    result = searchPlaces(result, options.query);
  }
  return result;
}
