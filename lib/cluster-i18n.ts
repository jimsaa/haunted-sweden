import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/i18n";

export function getClusterDisplayName(
  clusterId: string | undefined,
  fallback: string | undefined,
  locale: Locale
): string | undefined {
  if (!clusterId) return fallback;
  const names = getTranslations(locale).clusterNames as Record<string, string>;
  return names[clusterId] ?? fallback;
}
