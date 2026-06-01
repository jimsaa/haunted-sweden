import type { Locale } from "@/lib/translations";

export function getSubmitApiError(
  data: { error?: string; errorSv?: string },
  locale: Locale,
  fallback: string
): string {
  if (locale === "sv" && data.errorSv?.trim()) return data.errorSv;
  return data.error?.trim() || fallback;
}
