import type { HauntedPlace } from "@/lib/types/place";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import type { Locale } from "@/lib/translations";

/** SEO-friendly image alt: "Borgvattnets Prästgård - hemsökt plats i Jämtland" */
export function getPlaceImageAlt(
  place: HauntedPlace,
  locale: Locale = "sv"
): string {
  const name =
    locale === "en" && place.englishName ? place.englishName : place.name;
  const region = place.region?.trim() || place.city;
  if (locale === "en") {
    const category = getPlaceCategoryLabel(place.category, "en");
    return `${name} — haunted place in ${region}, Sweden (${category})`;
  }
  return `${name} — hemsökt plats i ${region}`;
}

export function getPlaceGalleryImageAlt(
  place: HauntedPlace,
  index: number,
  caption?: string | null
): string {
  if (caption?.trim()) {
    return `${caption.trim()} — ${place.name}`;
  }
  return `${getPlaceImageAlt(place)} — foto ${index + 1}`;
}
