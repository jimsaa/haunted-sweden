"use client";

import { useLanguage } from "@/lib/language-context";
import { buildInvestigationTimeline } from "@/lib/investigation-sources";
import type { HauntedPlace } from "@/lib/types/place";

export function InvestigationTimelineSection({ place }: { place: HauntedPlace }) {
  const { t } = useLanguage();
  const tl = t.spokjakt.investigationTimeline;
  const entries = buildInvestigationTimeline(place);

  if (entries.length === 0) return null;

  return (
    <section
      id="investigation-history"
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5"
    >
      <h2
        className="text-lg font-semibold mb-4"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {tl.title}
      </h2>
      <ol className="relative border-l border-violet-500/30 ml-2 space-y-6">
        {entries.map((entry, i) => (
          <li key={`${entry.year}-${entry.source}-${i}`} className="pl-6 relative">
            <span
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              aria-hidden
            />
            <p className="text-sm font-bold text-violet-200/90">{entry.year}</p>
            <p className="text-sm text-white/85 mt-0.5">— {entry.label}</p>
            {entry.detail && (
              <p className="text-xs text-white/45 mt-0.5">{entry.detail}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
