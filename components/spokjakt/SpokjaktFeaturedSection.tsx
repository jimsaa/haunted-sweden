"use client";

import Link from "next/link";
import { ExternalLink, Tv } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { HauntedPlace } from "@/lib/types/place";
import { isFeaturedInSpokjakt } from "@/lib/spokjakt-place";
import { OfficialSpokjaktPlaylist } from "@/components/spokjakt/OfficialSpokjaktPlaylist";
import { SpokjaktBadge } from "@/components/spokjakt/SpokjaktBadge";

export function SpokjaktFeaturedSection({ place }: { place: HauntedPlace }) {
  const { t } = useLanguage();
  const st = t.spokjakt;

  if (!isFeaturedInSpokjakt(place) || !place.spokjaktData) return null;

  const data = place.spokjaktData;

  return (
    <section
      id="featured-in-spokjakt"
      className="scroll-mt-24 rounded-2xl border border-violet-500/25 bg-violet-950/20 overflow-hidden shadow-[0_0_32px_rgba(88,28,135,0.15)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-violet-500/20 bg-violet-950/30">
        <h2
          className="text-lg font-semibold flex items-center gap-2 text-violet-100"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          <Tv className="h-5 w-5 text-violet-400" aria-hidden />
          {st.featuredSection.title}
        </h2>
        <SpokjaktBadge place={place} size="compact" />
      </div>

      <div className="p-5 sm:p-6 space-y-5 text-sm">
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <dt className="text-xs text-white/45 uppercase tracking-wide">
              {st.featuredSection.season}
            </dt>
            <dd className="mt-1 text-base font-medium">{data.season}</dd>
          </div>
          <div>
            <dt className="text-xs text-white/45 uppercase tracking-wide">
              {st.featuredSection.episode}
            </dt>
            <dd className="mt-1 text-base font-medium">{data.episode}</dd>
          </div>
          <div>
            <dt className="text-xs text-white/45 uppercase tracking-wide">
              {st.featuredSection.year}
            </dt>
            <dd className="mt-1 text-base font-medium">{data.year}</dd>
          </div>
        </dl>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-violet-400/90 mb-2">
            {st.featuredSection.investigators}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {data.investigators.map((name) => (
              <li
                key={name}
                className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/80"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-violet-400/90 mb-2">
            {st.featuredSection.investigationSummary}
          </h3>
          <p className="text-white/75 leading-relaxed">{data.investigationSummary}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-violet-400/90 mb-2">
            {st.featuredSection.watch}
          </h3>
          <OfficialSpokjaktPlaylist variant="inline" />
        </div>

        {(data.videoLinks.length > 0 || data.streamingLinks.length > 0) && (
          <div>
            <ul className="space-y-2 mt-4">
              {data.videoLinks.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-violet-300 hover:text-violet-200"
                  >
                    {st.youtube} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
              {data.streamingLinks.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-violet-300 hover:text-violet-200"
                  >
                    {st.tv4Play} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-white/40">{st.disclaimer}</p>

        <Link
          href={data.archiveSlug ? `/spokjakt#${data.archiveSlug}` : "/spokjakt"}
          className="inline-flex items-center gap-1 text-sm text-violet-300 hover:text-violet-200"
        >
          {st.fullArchiveLink} →
        </Link>
      </div>
    </section>
  );
}
