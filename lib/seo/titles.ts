import type { HauntedPlace } from "@/lib/types/place";
import { SITE_NAME } from "@/lib/seo/constants";

export const SEO_TITLES = {
  home: `Haunted Sweden | Hemsökta platser & spökkarta Sverige — upptäck spökplatser`,
  map: `Spökkartan Sverige | Hemsökta platser på kartan | Haunted Sweden`,
  submit: `Tipsa om hemsökt plats | Haunted Sweden`,
  spokjakt: `Spökjakt | Paranormala utredningar | Haunted Sweden`,
  investigations: `Spökjakt | Paranormala utredningar | Haunted Sweden`,
  community: `Haunted Sweden Community | Gå med i utredningen`,
} as const;

/** CTR-focused place title: name + city + intent keyword. */
export function getPlaceSeoTitle(place: HauntedPlace): string {
  const name = place.name;
  const city = place.city;
  return `${name} — Hemsökt i ${city} | Spökhistorier & guide | ${SITE_NAME}`;
}
