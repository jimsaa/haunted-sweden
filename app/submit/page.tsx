import { SubmitPageClient } from "@/components/places/SubmitPageClient";
import { getApprovedPlaces } from "@/lib/places";
import type { PlaceOption } from "@/lib/submit-place-options";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getSubmitDescription } from "@/lib/seo/descriptions";
import { SEO_TITLES } from "@/lib/seo/titles";

export const metadata = buildPageMetadata({
  title: SEO_TITLES.submit,
  description: getSubmitDescription("sv"),
  path: "/submit",
});

export default function SubmitPage() {
  const places: PlaceOption[] = getApprovedPlaces()
    .map((p) => ({
      id: p.id,
      name: p.englishName ? `${p.name} / ${p.englishName}` : p.name,
      slug: p.slug,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "sv"));

  return <SubmitPageClient places={places} />;
}
