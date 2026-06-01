import { Suspense } from "react";
import { MapPageClient } from "@/components/map/MapPageClient";
import { MapLoadingFallback } from "@/components/map/MapLoadingFallback";
import { getMapPlaces } from "@/lib/places";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getMapDescription } from "@/lib/seo/descriptions";
import { SEO_TITLES } from "@/lib/seo/titles";

export const metadata = buildPageMetadata({
  title: SEO_TITLES.map,
  description: getMapDescription("sv"),
  path: "/map",
});

export default function MapPage() {
  const places = getMapPlaces();
  return (
    <Suspense fallback={<MapLoadingFallback />}>
      <MapPageClient places={places} />
    </Suspense>
  );
}
