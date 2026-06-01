"use client";

import { ExternalLink, Play } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { SPOKJAKT_OFFICIAL_PLAYLIST_URL } from "@/lib/spokjakt-constants";

export function OfficialSpokjaktPlaylist({
  variant = "card",
}: {
  variant?: "card" | "inline";
}) {
  const { t } = useLanguage();
  const pl = t.spokjakt.playlist;

  if (variant === "inline") {
    return (
      <a
        href={SPOKJAKT_OFFICIAL_PLAYLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-red-600/20 border border-red-500/40 px-4 py-3 text-sm font-semibold text-red-100 hover:bg-red-600/30 transition-colors"
      >
        <Play className="h-4 w-4 shrink-0" aria-hidden />
        {pl.watchButton}
        <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </a>
    );
  }

  return (
    <section className="rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-950/30 to-violet-950/20 overflow-hidden">
      <div className="px-5 py-4 border-b border-red-500/20">
        <h2 className="text-base font-semibold text-red-100 flex items-center gap-2">
          <span aria-hidden>🎥</span>
          {pl.title}
        </h2>
        <p className="mt-2 text-sm text-white/65 leading-relaxed">{pl.description}</p>
        <p className="mt-2 text-xs text-white/45">{pl.source}</p>
      </div>
      <div className="p-5">
        <a
          href={SPOKJAKT_OFFICIAL_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-red-600/25 border border-red-500/45 px-5 py-3 text-sm font-semibold text-red-50 hover:bg-red-600/40 transition-colors"
        >
          <Play className="h-4 w-4" aria-hidden />
          {pl.watchButton}
          <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </a>
        <p className="mt-3 text-[11px] text-white/40">{pl.creditNote}</p>
      </div>
    </section>
  );
}
