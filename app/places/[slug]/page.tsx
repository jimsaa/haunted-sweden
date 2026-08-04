import { notFound } from "next/navigation";
import { PlaceDetail } from "@/components/places/PlaceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getApprovedPlaceBySlug,
  getApprovedPlaces,
  getGoogleMapsUrl,
  getNearbyPlaces,
  getRelatedPlaces,
} from "@/lib/places";
import { getReportsForPlace } from "@/lib/reports";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  getPlaceMetaDescription,
  getPlaceOgImage,
} from "@/lib/seo/descriptions";
import {
  buildFaqPageJsonLd,
  buildPlaceBreadcrumbJsonLd,
  buildTouristAttractionJsonLd,
} from "@/lib/seo/json-ld";
import { getPlaceSeoTitle } from "@/lib/seo/titles";

export function generateStaticParams() {
  return getApprovedPlaces().map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = getApprovedPlaceBySlug(slug);
  if (!place) {
    return { title: "Plats | Haunted Sweden" };
  }

  return buildPageMetadata({
    title: getPlaceSeoTitle(place),
    description: getPlaceMetaDescription(place),
    path: `/places/${place.slug}`,
    image: getPlaceOgImage(place),
  });
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
  const nearby = getNearbyPlaces(place, 6);
  const related = getRelatedPlaces(
    place,
    new Set(nearby.map((p) => p.id)),
    4
  );
  const faqLd = buildFaqPageJsonLd(place);

  return (
    <>
      <JsonLd data={buildTouristAttractionJsonLd(place)} />
      <JsonLd data={buildPlaceBreadcrumbJsonLd(place)} />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <PlaceDetail
        place={place}
        reports={reports}
        mapsUrl={mapsUrl}
        nearby={nearby}
        related={related}
      />
    </>
  );
}
