import type { Locale } from "@/lib/translations";

/**
 * Language preference detection only — not user tracking.
 * We do not store IP addresses, require login, or build visitor profiles.
 * Results are used once to pick en/sv before the user chooses manually.
 */

/** True when the browser reports Swedish (sv or sv-SE). */
export function isSwedishBrowserLocale(): boolean {
  if (typeof navigator === "undefined") return false;

  const tags = [
    navigator.language,
    ...(navigator.languages ?? []),
  ].filter(Boolean) as string[];

  return tags.some((tag) => {
    const lower = tag.toLowerCase();
    return lower === "sv" || lower.startsWith("sv-");
  });
}

/**
 * Optional country hint from ipapi.co (country_code only).
 * Discarded after read — never persisted. Defaults to "en" on failure.
 */
export async function suggestLocaleFromCountry(): Promise<Locale> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!res.ok) return "en";

    const data = (await res.json()) as { country_code?: string };
    // Only the country code is used to guess language — no IP logging on our side.
    if (data.country_code === "SE") return "sv";
    return "en";
  } catch {
    return "en";
  }
}

/**
 * Suggested locale when nothing is saved in localStorage.
 * Browser Swedish is checked first; country is a fallback.
 */
export async function detectInitialLocale(): Promise<Locale> {
  if (isSwedishBrowserLocale()) return "sv";
  return suggestLocaleFromCountry();
}
