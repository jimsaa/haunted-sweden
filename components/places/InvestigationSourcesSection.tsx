"use client";

import { useLanguage } from "@/lib/language-context";
import {
  buildInvestigationSources,
  getHauntedSwedenInvestigationRecord,
} from "@/lib/investigation-sources";
import type { HauntedPlace } from "@/lib/types/place";

export function InvestigationSourcesSection({ place }: { place: HauntedPlace }) {
  const { t } = useLanguage();
  const src = t.spokjakt.investigationSources;
  const hs = place.hauntedSwedenInvestigation ?? getHauntedSwedenInvestigationRecord(place);

  const cards = buildInvestigationSources(place, {
    spokjakt: src.spokjakt,
    laxton: src.laxton,
    hauntedSweden: src.hauntedSweden,
    available: src.statusAvailable,
    notYet: src.statusNotYet,
    tvInvestigation: src.typeTv,
    youtubeInvestigation: src.typeYoutube,
    teamVerification: src.typeTeam,
    seasonEpisode: t.spokjakt.seasonEpisode,
  });

  return (
    <section
      id="investigation-sources"
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-white/10">
        <h2
          className="text-lg font-semibold"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {src.title}
        </h2>
        <p className="mt-1 text-xs text-white/50">{src.subtitle}</p>
      </div>
      <ul className="divide-y divide-white/10">
        {cards.map((card) => (
          <li key={card.key} className="px-5 py-4 flex flex-wrap gap-3 justify-between">
            <div>
              <p className="font-medium text-white/90">[{card.title}]</p>
              <p className="text-xs text-white/45 mt-0.5">{card.typeLabel}</p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-medium ${
                  card.available ? "text-emerald-400/90" : "text-white/40"
                }`}
              >
                {card.statusLabel}
              </p>
              {card.meta && card.meta.length > 0 && (
                <p className="text-xs text-white/45 mt-0.5">{card.meta.join(" · ")}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {hs.status === "verified" && (
        <div className="px-5 py-4 border-t border-white/10 bg-emerald-950/15 text-xs text-white/60 space-y-1">
          <p className="font-medium text-emerald-300/90">✅ {src.verifiedBadge}</p>
          {hs.verificationDate && (
            <p>
              {src.date}: {hs.verificationDate}
            </p>
          )}
          {(hs.photosAdded ?? 0) > 0 && (
            <p>
              {src.photos}: {hs.photosAdded}
            </p>
          )}
          {(hs.videosAdded ?? 0) > 0 && (
            <p>
              {src.videos}: {hs.videosAdded}
            </p>
          )}
          {hs.evpSessionCompleted && <p>{src.evp}: {src.evpDone}</p>}
          {hs.overnightStayCompleted && <p>{src.overnight}: {src.overnightDone}</p>}
        </div>
      )}
    </section>
  );
}
