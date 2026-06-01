import { translations, type Locale } from "@/lib/translations";

type TranslationTree = (typeof translations)["en"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Returns locale strings with English fallback for missing keys.
 * Logs a dev warning when a fallback is used.
 */
export function getTranslationsWithFallback(locale: Locale): TranslationTree {
  const primary = translations[locale] as TranslationTree;
  const fallback = translations.en;

  function wrap<T extends Record<string, unknown>>(
    node: T,
    fb: T,
    path: string
  ): T {
    return new Proxy(node, {
      get(target, prop: string | symbol) {
        if (typeof prop === "symbol") {
          return Reflect.get(target, prop);
        }

        const value = target[prop];
        const fbValue = fb[prop];
        const keyPath = path ? `${path}.${prop}` : prop;

        if (value === undefined) {
          if (fbValue !== undefined && process.env.NODE_ENV === "development") {
            console.warn(
              `[i18n] Missing "${locale}" translation: ${keyPath} — using English fallback`
            );
          }
          if (typeof fbValue === "function") {
            return fbValue.bind(fb);
          }
          if (isRecord(fbValue)) {
            return wrap(
              fbValue as Record<string, unknown>,
              fbValue as Record<string, unknown>,
              keyPath
            );
          }
          return fbValue;
        }

        if (typeof value === "function") {
          return value.bind(value);
        }

        if (isRecord(value) && isRecord(fbValue)) {
          return wrap(value, fbValue, keyPath);
        }

        return value;
      },
    }) as T;
  }

  return wrap(
    primary as unknown as Record<string, unknown>,
    fallback as unknown as Record<string, unknown>,
    ""
  ) as TranslationTree;
}

export function getTranslations(locale: Locale): TranslationTree {
  return getTranslationsWithFallback(locale);
}
