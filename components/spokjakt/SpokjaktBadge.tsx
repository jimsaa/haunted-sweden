"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Ghost, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { HauntedPlace } from "@/lib/types/place";
import { isFeaturedInSpokjakt } from "@/lib/spokjakt-place";

export function SpokjaktBadge({
  place,
  size = "default",
}: {
  place: HauntedPlace;
  size?: "default" | "compact";
}) {
  const { t } = useLanguage();
  const st = t.spokjakt;
  const [open, setOpen] = useState(false);

  if (!isFeaturedInSpokjakt(place) || !place.spokjaktData) return null;

  const data = place.spokjaktData;
  const archiveHref = data.archiveSlug
    ? `/spokjakt#${data.archiveSlug}`
    : "/spokjakt";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          size === "compact"
            ? "inline-flex items-center gap-1 rounded-full border border-violet-500/50 bg-violet-950/80 px-2 py-0.5 text-[10px] font-semibold text-violet-100 shadow-[0_0_12px_rgba(139,92,246,0.35)] hover:border-violet-400/70 hover:shadow-[0_0_16px_rgba(139,92,246,0.5)] transition-all"
            : "inline-flex items-center gap-1.5 rounded-full border border-violet-500/50 bg-violet-950/80 px-3 py-1 text-xs font-semibold text-violet-100 shadow-[0_0_14px_rgba(139,92,246,0.4)] hover:border-violet-400/70 hover:shadow-[0_0_20px_rgba(139,92,246,0.55)] transition-all backdrop-blur-sm"
        }
      >
        <Ghost className={size === "compact" ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
        {st.seenInSpokjaktBadge}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="spokjakt-dialog-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border border-violet-500/30 bg-[#12101a] shadow-2xl shadow-violet-950/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10">
              <div>
                <p className="text-xs text-violet-400/90 font-medium uppercase tracking-wide">
                  {st.seenInSpokjakt}
                </p>
                <h2
                  id="spokjakt-dialog-title"
                  className="text-lg font-bold mt-1"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {place.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-white/50 hover:text-white hover:bg-white/10"
                aria-label={t.swedenPopup.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm">
              <dl className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-white/45 text-xs">{st.featuredSection.season}</dt>
                  <dd className="font-medium">{data.season}</dd>
                </div>
                <div>
                  <dt className="text-white/45 text-xs">{st.featuredSection.episode}</dt>
                  <dd className="font-medium">{data.episode}</dd>
                </div>
                <div>
                  <dt className="text-white/45 text-xs">{st.featuredSection.year}</dt>
                  <dd className="font-medium">{data.year}</dd>
                </div>
                {place.spokjaktPriority && (
                  <div>
                    <dt className="text-white/45 text-xs">{st.ranking}</dt>
                    <dd className="font-medium capitalize text-violet-300">
                      {place.spokjaktPriority.replace("_", " ").toLowerCase()}
                    </dd>
                  </div>
                )}
              </dl>

              <div>
                <p className="text-xs text-white/45 mb-1">{st.featuredSection.investigators}</p>
                <ul className="text-white/80 space-y-0.5">
                  {data.investigators.map((name) => (
                    <li key={name}>· {name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs text-white/45 mb-1">
                  {st.featuredSection.investigationSummary}
                </p>
                <p className="text-white/75 leading-relaxed">
                  {data.investigationSummary}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/45 mb-2">{st.featuredSection.watch}</p>
                <a
                  href={data.playlistLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-red-600/20 border border-red-500/40 px-4 py-2.5 text-sm font-medium text-red-100 hover:bg-red-600/30 mb-3"
                >
                  {st.featuredSection.watchPlaylist}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>

              {(data.videoLinks.length > 0 || data.streamingLinks.length > 0) && (
                <div>
                  <ul className="space-y-2">
                    {data.videoLinks.map((url) => (
                      <li key={url}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-violet-300 hover:text-violet-200"
                        >
                          {st.youtube} <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                    {data.streamingLinks.map((url) => (
                      <li key={url}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-violet-300 hover:text-violet-200"
                        >
                          {st.stream} <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-[11px] text-white/40 border-t border-white/10 pt-3">
                {st.disclaimer}
              </p>

              <Link
                href={archiveHref}
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-xl bg-violet-600/30 border border-violet-500/40 py-2.5 text-sm font-medium text-violet-100 hover:bg-violet-600/45"
              >
                {st.fullArchiveLink}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
