import safetyBySlug from "@/data/place-safety-sv.json";

export function getSafetyNoteSvForSlug(slug: string): string | undefined {
  const text = (safetyBySlug as Record<string, string>)[slug];
  return text?.trim() || undefined;
}
