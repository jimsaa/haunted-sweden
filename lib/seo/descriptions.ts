import type { HauntedPlace } from "@/lib/types/place";
import { getCoverImageSrc } from "@/lib/place-cover";

const HOME_DESCRIPTION_SV =
  "Utforska Sveriges hemsökta platser: Hemsökt Museum, Läckö Slott, Målilla Sanatorium och 50+ spökplatser på spökkartan. Historia, folklore och utredningar — Haunted Sweden.";

const HOME_DESCRIPTION_EN =
  "Explore Sweden's haunted places: Haunted Museum Borås, Läckö Castle, Målilla Sanatorium and 50+ ghost locations on the haunted map. History, folklore and investigations — Haunted Sweden.";

const MAP_DESCRIPTION_SV =
  "Spökkartan Sverige: hitta hemsökta platser, spökhus, slott och paranormala platser på kartan. Utforska spökplatser i hela Sverige med Haunted Sweden.";

const MAP_DESCRIPTION_EN =
  "Sweden's haunted map: discover ghost locations, haunted houses, castles and paranormal sites. Explore haunted places Sweden with Haunted Sweden.";

const SUBMIT_DESCRIPTION_SV =
  "Tipsa om hemsökta platser, paranormala upplevelser, bilder och videor. Hjälp till att bygga Sveriges största register över spökplatser.";

const SUBMIT_DESCRIPTION_EN =
  "Submit haunted locations, paranormal stories, photos and videos. Help build Sweden's largest haunted places guide.";

const SPOKJAKT_DESCRIPTION_SV =
  "Spökjakt Sverige: paranormala utredningar med Joakim Lundell, Jonna Lundell och LaxTon Ghost Sweden. Se avsnitt och hitta hemsökta platser från serien på Haunted Sweden.";

const SPOKJAKT_DESCRIPTION_EN =
  "Ghost hunting Sweden — Spökjakt investigations with Joakim Lundell, Jonna Lundell and LaxTon Ghost Sweden. Watch episodes and explore haunted places Sweden.";

const COMMUNITY_DESCRIPTION_SV =
  "Gå med i Haunted Sweden Community. Fortsätt utredningarna kring svensk historia, folklore och hemsökta platser — respektfullt, nyfiket och utan sensationalism.";

const COMMUNITY_DESCRIPTION_EN =
  "Join the Haunted Sweden Community. Continue investigations into Swedish history, folklore and haunted places — curious, respectful and free of sensationalism.";

function truncate(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

export function getHomeDescription(locale: "sv" | "en" = "sv"): string {
  return locale === "en" ? HOME_DESCRIPTION_EN : HOME_DESCRIPTION_SV;
}

export function getMapDescription(locale: "sv" | "en" = "sv"): string {
  return locale === "en" ? MAP_DESCRIPTION_EN : MAP_DESCRIPTION_SV;
}

export function getSubmitDescription(locale: "sv" | "en" = "sv"): string {
  return locale === "en" ? SUBMIT_DESCRIPTION_EN : SUBMIT_DESCRIPTION_SV;
}

export function getSpokjaktDescription(locale: "sv" | "en" = "sv"): string {
  return locale === "en" ? SPOKJAKT_DESCRIPTION_EN : SPOKJAKT_DESCRIPTION_SV;
}

export function getCommunityDescription(locale: "sv" | "en" = "sv"): string {
  return locale === "en" ? COMMUNITY_DESCRIPTION_EN : COMMUNITY_DESCRIPTION_SV;
}

/** Auto-generated place meta description (SV-first, CTR-oriented). */
export function getPlaceMetaDescription(place: HauntedPlace): string {
  const name = place.name;
  const city = place.city;
  const region = place.region;
  const summary =
    place.shortDescriptionSv?.trim() ||
    place.shortDescription?.trim() ||
    `Hemsökt plats i ${city}, ${region}.`;

  const base = truncate(summary, 110);
  return `${name} i ${city} — ${base} Läs spökhistorier, besöksinfo och närliggande hemsökta platser på Haunted Sweden.`;
}

export function getPlaceOgImage(place: HauntedPlace): string | undefined {
  return getCoverImageSrc(place) ?? undefined;
}
