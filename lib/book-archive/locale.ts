import type { Locale } from "@/lib/translations";

export function pickBookText(
  locale: Locale,
  en: string | undefined,
  sv?: string
): string {
  if (locale === "sv" && sv?.trim()) return sv;
  return en?.trim() ?? "";
}

export function pickBookParagraphs(
  locale: Locale,
  en: string[] | undefined,
  sv?: string[]
): string[] {
  if (locale === "sv" && sv?.length) return sv;
  return en ?? [];
}
