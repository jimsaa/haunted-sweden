import { SubmitPageClient } from "@/components/places/SubmitPageClient";
import { getApprovedPlaces } from "@/lib/places";
import type { PlaceOption } from "@/lib/submit-place-options";

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
