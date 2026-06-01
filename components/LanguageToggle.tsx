"use client";

import { useLanguage } from "@/lib/language-context";
import type { Locale } from "@/lib/translations";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className="flex items-center rounded-lg border border-white/15 bg-white/5 p-0.5 text-xs font-semibold tracking-wide"
      role="group"
      aria-label={t.common.language}
    >
      {(["en", "sv"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`min-w-[2.25rem] rounded-md px-2.5 py-1.5 uppercase transition-colors ${
            locale === code
              ? "bg-violet-600 text-white"
              : "text-white/60 hover:text-white"
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
