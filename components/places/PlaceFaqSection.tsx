"use client";

import type { PlaceFaqItem } from "@/lib/types/place-faq";
import { useLanguage } from "@/lib/language-context";

function localizedFaq(item: PlaceFaqItem, locale: "sv" | "en") {
  if (locale === "sv") {
    return {
      q: item.questionSv?.trim() || item.question,
      a: item.answerSv?.trim() || item.answer,
    };
  }
  return { q: item.question, a: item.answer };
}

export function PlaceFaqSection({ faqs }: { faqs: PlaceFaqItem[] }) {
  const { locale, t } = useLanguage();
  if (!faqs.length) return null;

  return (
    <section id="faq" className="scroll-mt-20 mt-10 sm:mt-12">
      <h2
        className="text-xl sm:text-2xl font-semibold mb-4 pb-2 border-b border-white/10"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {t.placePage.faqTitle}
      </h2>
      <div className="space-y-3">
        {faqs.map((item, i) => {
          const { q, a } = localizedFaq(item, locale);
          return (
            <details
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] open:border-violet-500/30 open:bg-violet-950/20"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-white/90 flex items-start justify-between gap-3">
                <span>{q}</span>
                <span
                  className="shrink-0 text-violet-300/80 transition-transform group-open:rotate-45 text-lg leading-none"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 text-sm leading-relaxed text-white/70 whitespace-pre-line">
                {a}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
