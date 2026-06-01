import { LOCALE_EN, LOCALE_SV, SITE_URL } from "@/lib/seo/constants";

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function absoluteImageUrl(src: string | null | undefined): string | undefined {
  if (!src?.trim()) return undefined;
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return absoluteUrl(s.startsWith("/") ? s : `/${s}`);
}

/** hreflang alternates — same routes; language toggled client-side via ?hl= */
export function buildLanguageAlternates(path: string) {
  const canonical = absoluteUrl(path);
  return {
    canonical,
    languages: {
      [LOCALE_SV]: `${canonical}?hl=sv`,
      [LOCALE_EN]: `${canonical}?hl=en`,
      "x-default": canonical,
    },
  };
}
