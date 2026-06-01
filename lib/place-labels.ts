import {
  normalizePlaceCategory,
  type PlaceCategory,
} from "@/lib/categories";
import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/i18n";

export function getPlaceCategoryLabel(
  category: PlaceCategory | string,
  locale: Locale
): string {
  const normalized = normalizePlaceCategory(category);
  const t = getTranslations(locale);
  const labels = t.placeCategories as Record<string, string>;
  const label = labels[normalized];
  if (label) return label;
  const en = getTranslations("en").placeCategories as Record<string, string>;
  if (process.env.NODE_ENV === "development") {
    console.warn(
      `[i18n] Missing category label "${normalized}" for locale "${locale}"`
    );
  }
  return en[normalized] ?? normalized;
}
