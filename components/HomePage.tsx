"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { HomeStatsRow } from "@/components/home/HomeStatsRow";
import { FeaturedLocationCard } from "@/components/home/FeaturedLocationCard";
import { HomeMediaSection } from "@/components/home/HomeMediaSection";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import type { HomepageStats } from "@/lib/homepage-stats";
import type { HomepageMediaItem } from "@/lib/place-media";
import { useLanguage } from "@/lib/language-context";
import type { HauntedPlace } from "@/lib/types/place";

function PlaceGrid({
  places,
  locale,
  coverPlaceholder,
  viewDetails,
  regionLabel,
  hauntingLevelLabel,
  featuredLabel,
}: {
  places: HauntedPlace[];
  locale: "sv" | "en";
  coverPlaceholder: string;
  viewDetails: string;
  regionLabel: string;
  hauntingLevelLabel: string;
  featuredLabel: string;
}) {
  return (
    <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <li key={place.id}>
          <FeaturedLocationCard
            place={place}
            locale={locale}
            placeholderLabel={coverPlaceholder}
            viewDetailsLabel={viewDetails}
            regionLabel={regionLabel}
            hauntingLevelLabel={hauntingLevelLabel}
            featuredLabel={featuredLabel}
          />
        </li>
      ))}
    </ul>
  );
}

function SectionHeader({
  title,
  subtitle,
  linkLabel,
}: {
  title: string;
  subtitle: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2
          className="text-2xl font-bold sm:text-3xl"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-white/55 max-w-lg">{subtitle}</p>
      </div>
      <Link
        href="/map"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 hover:text-violet-100 transition-colors shrink-0"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

export function HomePage({
  featured,
  verified,
  latest,
  popular,
  stats,
  mediaItems,
}: {
  featured: HauntedPlace[];
  verified: HauntedPlace[];
  latest: HauntedPlace[];
  popular: HauntedPlace[];
  stats: HomepageStats;
  mediaItems: HomepageMediaItem[];
}) {
  const { locale, t } = useLanguage();
  const hs = t.homeSections;
  const cardProps = {
    locale,
    coverPlaceholder: t.coverPlaceholder,
    viewDetails: t.mapPopup.viewDetails,
    regionLabel: t.homeFeatured.region,
    hauntingLevelLabel: t.homeFeatured.hauntingLevel,
    featuredLabel: t.common.featured,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative px-4 pt-10 pb-10 sm:px-6 sm:pt-16 sm:pb-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.25),transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h1 className="flex justify-center">
            <BrandLogo
              linked={false}
              label={t.heroTitle}
              size={280}
              imageClassName="h-[200px] w-[200px] sm:h-[280px] sm:w-[280px]"
            />
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            {t.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/map"
              className="inline-flex w-full sm:w-auto min-h-[52px] items-center justify-center rounded-xl bg-violet-600 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-violet-950/50 transition-colors hover:bg-violet-500 active:scale-[0.98]"
            >
              {t.exploreMap}
            </Link>
            <Link
              href="/submit"
              className="text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              {t.submitPlace} →
            </Link>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-14">
          <HomeStatsRow stats={stats} />
        </div>
      </section>

      <section className="border-t border-white/8 px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title={t.featuredPlaces}
            subtitle={t.homeFeatured.subtitle}
            linkLabel={hs.viewAll}
          />
          <PlaceGrid places={featured} {...cardProps} />
        </div>
      </section>

      <section className="border-t border-white/8 px-4 py-14 sm:px-6 sm:py-16 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title={hs.verifiedTitle}
            subtitle={hs.verifiedSubtitle}
            linkLabel={hs.viewAll}
          />
          {verified.length > 0 ? (
            <PlaceGrid places={verified} {...cardProps} />
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-10 text-center text-sm text-white/55 max-w-2xl mx-auto">
              {hs.verifiedEmpty}
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-white/8 px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title={hs.popularTitle}
            subtitle={hs.popularSubtitle}
            linkLabel={hs.viewAll}
          />
          <PlaceGrid places={popular} {...cardProps} />
        </div>
      </section>

      <section className="border-t border-white/8 px-4 py-14 sm:px-6 sm:py-16 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title={hs.latestTitle}
            subtitle={hs.latestSubtitle}
            linkLabel={hs.viewAll}
          />
          <PlaceGrid places={latest} {...cardProps} />
        </div>
      </section>

      <HomeMediaSection items={mediaItems} />

      <HomeCtaSection />

      <footer className="border-t border-white/10 px-4 py-10 text-center sm:px-6">
        <p
          className="text-sm tracking-wide text-white/80"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {t.footer}
        </p>
      </footer>
    </div>
  );
}
