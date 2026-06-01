"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import type { HauntedPlace } from "@/lib/types/place";
import type { Locale } from "@/lib/translations";
import { PlaceCoverImage } from "@/components/PlaceCoverImage";
import { HauntingLevel } from "@/components/HauntingLevel";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import {
  getVerificationLabel,
  isHauntedSwedenVerified,
} from "@/lib/verification";
import { getPlaceSummary } from "@/lib/place-locale-text";

function displayName(place: HauntedPlace, locale: Locale): string {
  return locale === "en" && place.englishName ? place.englishName : place.name;
}

export function FeaturedLocationCard({
  place,
  locale,
  placeholderLabel,
  viewDetailsLabel,
  regionLabel,
  hauntingLevelLabel,
  featuredLabel,
}: {
  place: HauntedPlace;
  locale: Locale;
  placeholderLabel: string;
  viewDetailsLabel: string;
  regionLabel: string;
  hauntingLevelLabel: string;
  featuredLabel: string;
}) {
  const verified = isHauntedSwedenVerified(place);
  const summary = getPlaceSummary(place, locale);

  return (
    <article className="featured-location-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12] transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_12px_40px_rgba(109,40,217,0.2)]">
      <Link
        href={`/places/${place.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <PlaceCoverImage
          place={place}
          variant="card"
          placeholderLabel={placeholderLabel}
          className="!h-full !rounded-none transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"
          aria-hidden
        />
        {place.featured ? (
          <span className="absolute left-3 top-3 rounded-full border border-amber-500/40 bg-amber-950/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
            {featuredLabel}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/places/${place.slug}`} className="block">
          <h3
            className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-violet-200"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {displayName(place, locale)}
          </h3>
        </Link>

        <p className="mt-1.5 flex items-center gap-1 text-xs text-white/50">
          <MapPin className="h-3 w-3 shrink-0 text-violet-400/80" aria-hidden />
          {place.city}
          <span className="text-white/25">·</span>
          {regionLabel}: {place.region}
        </p>

        <p className="mt-2 text-xs font-medium text-violet-300/90">
          {getPlaceCategoryLabel(place.category, locale)}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <HauntingLevel level={place.hauntingLevel} label={hauntingLevelLabel} />
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              verified
                ? "border-amber-500/45 bg-amber-950/40 text-amber-200"
                : "border-white/15 bg-white/[0.04] text-white/55"
            }`}
          >
            {getVerificationLabel(place.verificationLevel, locale)}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60 line-clamp-3">
          {summary}
        </p>

        <Link
          href={`/places/${place.slug}`}
          className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-violet-500/40 bg-violet-600/20 px-4 py-2.5 text-sm font-semibold text-violet-100 transition-colors hover:bg-violet-600/40 hover:text-white"
        >
          {viewDetailsLabel}
        </Link>
      </div>
    </article>
  );
}
