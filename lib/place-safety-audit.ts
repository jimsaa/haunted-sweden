import type { HauntedPlace } from "@/lib/types/place";
import {
  warnMissingSafetyNoteEn,
  warnMissingSafetyNoteSv,
} from "@/lib/place-locale-dev-warnings";

type PlaceWithSafetySv = HauntedPlace & { safetyNoteSv?: string };

function safetyLooksLikeEnglishCopy(sv: string, en: string): boolean {
  return sv.trim().toLowerCase() === en.trim().toLowerCase();
}

/** Dev-only: warn once per place when safety i18n is incomplete or identical EN/SV. */
export function auditPlaceSafetyNotes(places: HauntedPlace[]): void {
  if (process.env.NODE_ENV !== "development") return;

  for (const place of places) {
    const en = place.safetyNote?.trim() ?? "";
    const sv = (place as PlaceWithSafetySv).safetyNoteSv?.trim() ?? "";

    if (!en && !sv) continue;

    if (!en) warnMissingSafetyNoteEn(place.slug);
    if (!sv) {
      if (en) warnMissingSafetyNoteSv(place.slug);
      continue;
    }
    if (en && safetyLooksLikeEnglishCopy(sv, en)) {
      warnMissingSafetyNoteSv(place.slug);
    }
  }
}
