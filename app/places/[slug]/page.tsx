import { notFound } from "next/navigation";
import { PlaceDetail } from "@/components/places/PlaceDetail";
import {
  getApprovedPlaceBySlug,
  getApprovedPlaces,
  getClusterNearbyPlaces,
  getGoogleMapsUrl,
} from "@/lib/places";

export function generateStaticParams() {
  return getApprovedPlaces().map((place) => ({ slug: place.slug }));
}
import { getReportsForPlace } from "@/lib/reports";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = getApprovedPlaceBySlug(slug);
  return {
    title: place?.name ?? "Place",
    description: place?.shortDescription,
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = getApprovedPlaceBySlug(slug);
  if (!place) notFound();

  const reports = getReportsForPlace(place.id);
  const mapsUrl = getGoogleMapsUrl(place);
  const nearby = getClusterNearbyPlaces(place);
  return (
    <PlaceDetail
      place={place}
      reports={reports}
      mapsUrl={mapsUrl}
      nearby={nearby}
    />
  );
}
