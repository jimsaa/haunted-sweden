"use client";

import { useLanguage } from "@/lib/language-context";
import { getTranslations } from "@/lib/i18n";
import { useClientMounted } from "@/lib/use-client-mounted";
import type { Locale } from "@/lib/translations";

const SSR_LABELS = getTranslations("en");

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  const mounted = useClientMounted();
  const displayLocale: Locale = mounted ? locale : "en";
  const labels = mounted ? t : SSR_LABELS;

  return (
    <div
      className="flex items-center rounded-lg border border-white/15 bg-white/5 p-0.5 text-xs font-semibold tracking-wide"
      role="group"
      aria-label={labels.common.language}
    >
      {(["en", "sv"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`min-w-[2.25rem] rounded-md px-2.5 py-1.5 uppercase transition-colors ${
            displayLocale === code
              ? "bg-violet-600 text-white"
              : "text-white/60 hover:text-white"
          }`}
          aria-pressed={displayLocale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
