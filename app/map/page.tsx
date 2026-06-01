import { Suspense } from "react";
import { MapPageClient } from "@/components/map/MapPageClient";
import { MapLoadingFallback } from "@/components/map/MapLoadingFallback";
import { getMapPlaces } from "@/lib/places";

export const metadata = {
  title: "Haunted Map",
};

export default function MapPage() {
  const places = getMapPlaces();
  return (
    <Suspense fallback={<MapLoadingFallback />}>
      <MapPageClient places={places} />
    </Suspense>
  );
}
