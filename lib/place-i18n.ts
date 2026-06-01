import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/i18n";

export function translateParanormalType(type: string, locale: Locale): string {
  const t = getTranslations(locale);
  const map = t.paranormalTypes as Record<string, string>;
  return map[type] ?? type;
}

export function translateAccessType(access: string, locale: Locale): string {
  const t = getTranslations(locale);
  const map = t.accessTypes as Record<string, string>;
  return map[access] ?? access;
}
