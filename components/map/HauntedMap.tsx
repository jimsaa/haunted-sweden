"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import type { HauntedPlace } from "@/lib/types/place";
import {
  MAP_TILE_ATTRIBUTION,
  MAP_TILE_URL,
  SWEDEN_CENTER,
  SWEDEN_MAX_BOUNDS,
  SWEDEN_MAX_ZOOM,
  SWEDEN_MIN_ZOOM,
} from "@/lib/map-constants";
import { MapLegend } from "@/components/map/MapLegend";
import { MarkerClusterLayer } from "@/components/map/MarkerClusterLayer";
import {
  FlyToFocusedPlace,
  ResetSwedenMapButton,
  SwedenInitialView,
} from "@/components/map/MapViewport";
import { useSwedenMapZoom } from "@/components/map/useSwedenMapZoom";
import type { MapBadgeLabels } from "@/lib/map-marker-badges";
import type { MapPopupLabels } from "@/lib/map-markers";

export function HauntedMap({
  places,
  popupLabels,
  badgeLabels,
  focusedPlace,
  selectedPlaceId,
  onSelectPlace,
  resetMapLabel,
}: {
  places: HauntedPlace[];
  popupLabels: MapPopupLabels;
  badgeLabels: MapBadgeLabels;
  /** When set (e.g. list “show on map”), flies to this place. */
  focusedPlace?: HauntedPlace | null;
  selectedPlaceId?: string | null;
  onSelectPlace?: (placeId: string) => void;
  resetMapLabel: string;
}) {
  const swedenZoom = useSwedenMapZoom();

  return (
    <div className="haunted-map-frame relative h-[min(70vh,520px)] min-h-[320px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-violet-950/40">
      <MapContainer
        center={SWEDEN_CENTER}
        zoom={swedenZoom}
        minZoom={SWEDEN_MIN_ZOOM}
        maxZoom={SWEDEN_MAX_ZOOM}
        maxBounds={SWEDEN_MAX_BOUNDS}
        maxBoundsViscosity={1}
        className="haunted-map h-full w-full min-h-[320px] rounded-2xl"
        scrollWheelZoom
        worldCopyJump={false}
      >
        <TileLayer
          attribution={MAP_TILE_ATTRIBUTION}
          url={MAP_TILE_URL}
          zIndex={1}
        />
        <SwedenInitialView zoom={swedenZoom} />
        <FlyToFocusedPlace place={focusedPlace} />
        <ResetSwedenMapButton label={resetMapLabel} zoom={swedenZoom} />
        <MarkerClusterLayer
          places={places}
          popupLabels={popupLabels}
          badgeLabels={badgeLabels}
          selectedPlaceId={selectedPlaceId ?? focusedPlace?.id}
          onSelectPlace={onSelectPlace}
        />
        <MapLegend />
      </MapContainer>
    </div>
  );
}
