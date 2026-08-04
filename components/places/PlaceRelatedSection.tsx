"use client";

import Link from "next/link";
import type { HauntedPlace } from "@/lib/types/place";
import { useLanguage } from "@/lib/language-context";
import { PlaceCoverImage } from "@/components/PlaceCoverImage";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import type { Locale } from "@/lib/translations";

function placeDisplayName(place: HauntedPlace, locale: Locale): string {
  return locale === "en" && place.englishName ? place.englishName : place.name;
}

export function PlaceRelatedSection({
  places,
}: {
  places: HauntedPlace[];
}) {
  const { locale, t } = useLanguage();
  if (!places.length) return null;

  return (
    <section id="related" className="scroll-mt-20 mt-10 sm:mt-12">
      <h2
        className="text-xl sm:text-2xl font-semibold mb-4 pb-2 border-b border-white/10"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {t.placePage.relatedTitle}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {places.map((other) => (
          <li key={other.id}>
            <Link
              href={`/places/${other.slug}`}
              className="flex gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-violet-500/40 transition-colors h-full"
            >
              <PlaceCoverImage
                place={other}
                variant="thumb"
                placeholderLabel={t.coverPlaceholder}
                className="rounded-none rounded-l-2xl"
              />
              <div className="py-3 pr-4 min-w-0 flex-1">
                <p className="font-medium text-white truncate">
                  {placeDisplayName(other, locale)}
                </p>
                <p className="mt-0.5 text-xs text-white/50">
                  {other.city}, {other.region}
                </p>
                <p className="mt-1 text-xs text-violet-400/80">
                  {getPlaceCategoryLabel(other.category, locale)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
