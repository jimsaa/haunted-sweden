"use client";

import type { PlaceInfoFact } from "@/lib/types/place-info-box";
import { useLanguage } from "@/lib/language-context";

function localizedFact(fact: PlaceInfoFact, locale: "sv" | "en") {
  if (locale === "sv") {
    return {
      label: fact.labelSv?.trim() || fact.label,
      value: fact.valueSv?.trim() || fact.value,
    };
  }
  return {
    label: fact.label,
    value: fact.value,
  };
}

export function PlaceInfoBox({ facts }: { facts: PlaceInfoFact[] }) {
  const { locale, t } = useLanguage();
  if (!facts.length) return null;

  return (
    <section
      id="info"
      className="scroll-mt-20 mt-8 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/35 via-black to-black overflow-hidden"
      aria-labelledby="place-info-box-heading"
    >
      <div className="px-5 py-3.5 border-b border-white/10">
        <h2
          id="place-info-box-heading"
          className="text-sm font-semibold uppercase tracking-wider text-violet-200/90"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {t.placePage.infoBoxTitle}
        </h2>
      </div>
      <dl className="divide-y divide-white/8">
        {facts.map((fact, i) => {
          const { label, value } = localizedFact(fact, locale);
          return (
            <div
              key={`${label}-${i}`}
              className="grid grid-cols-[minmax(7rem,38%)_1fr] gap-3 px-5 py-3.5 sm:grid-cols-[11rem_1fr]"
            >
              <dt className="text-xs uppercase tracking-wider text-white/45 font-medium pt-0.5">
                {label}
              </dt>
              <dd className="text-sm sm:text-[15px] text-white/90 font-medium whitespace-pre-line leading-snug">
                {value}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
