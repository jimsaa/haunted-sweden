"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { detectInitialLocale, isSwedishBrowserLocale } from "@/lib/detect-language";
import { getTranslations } from "@/lib/i18n";
import {
  isLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Saved only when the user clicks EN or SV — not for auto-detection. */
function readManualLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  } catch {
    // ignore
  }
  return null;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = readManualLocale();
  if (saved) return saved;
  return isSwedishBrowserLocale() ? "sv" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const userHasChosenRef = useRef(false);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    // 1. Manual choice in localStorage always wins.
    const saved = readManualLocale();
    if (saved) {
      userHasChosenRef.current = true;
      setLocaleState(saved);
      return;
    }

    // 2. No saved language — detect in the background (UI already shows English).
    let cancelled = false;

    (async () => {
      const detected = await detectInitialLocale();
      if (cancelled || userHasChosenRef.current) return;
      setLocaleState(detected);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /** User toggled EN/SV — persist and override any auto-detection. */
  const setLocale = useCallback((next: Locale) => {
    userHasChosenRef.current = true;
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: getTranslations(locale),
    }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
