import type { HauntedPlace } from "@/lib/types/place";
import { SITE_NAME } from "@/lib/seo/constants";

export const SEO_TITLES = {
  home: `Haunted Sweden | Hemsökta platser, spökjakt och paranormala platser i Sverige`,
  map: `Spökkartan Sverige | Hemsökta platser på kartan | Haunted Sweden`,
  submit: `Tipsa om hemsökt plats | Haunted Sweden`,
  spokjakt: `Spökjakt | Paranormala utredningar | Haunted Sweden`,
  investigations: `Spökjakt | Paranormala utredningar | Haunted Sweden`,
} as const;

export function getPlaceSeoTitle(place: HauntedPlace): string {
  const name = place.englishName
    ? `${place.name} (${place.englishName})`
    : place.name;
  return `${name} | Hemsökt plats i Sverige | ${SITE_NAME}`;
}
