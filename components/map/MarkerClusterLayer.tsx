"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import type { HauntedPlace } from "@/lib/types/place";
import {
  makeHauntedPlaceIcon,
  makeHauntedClusterIcon,
  buildPlacePopupHtml,
  type MapPopupLabels,
} from "@/lib/map-markers";
import type { MapBadgeLabels } from "@/lib/map-marker-badges";
import {
  attachMarkerBadgeTooltips,
  detachMarkerBadgeTooltips,
} from "@/lib/map-marker-tooltips";
import {
  focusMarkerWithPopup,
  getMapPopupOptions,
} from "@/lib/map-popup-config";

/** Zoom level at which clusters split into individual haunted markers. */
const DISABLE_CLUSTERING_AT_ZOOM = 17;

export function MarkerClusterLayer({
  places,
  popupLabels,
  badgeLabels,
  selectedPlaceId,
  onSelectPlace,
}: {
  places: HauntedPlace[];
  popupLabels: MapPopupLabels;
  badgeLabels: MapBadgeLabels;
  selectedPlaceId?: string | null;
  onSelectPlace?: (placeId: string) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    attachMarkerBadgeTooltips(container);
    return () => detachMarkerBadgeTooltips(container);
  }, [map]);

  useEffect(() => {
    const group = L.markerClusterGroup({
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      spiderfyOnMaxZoom: true,
      spiderfyDistanceMultiplier: 2,
      removeOutsideVisibleBounds: true,
      disableClusteringAtZoom: DISABLE_CLUSTERING_AT_ZOOM,
      maxClusterRadius: 55,
      animate: true,
      animateAddingMarkers: false,
      iconCreateFunction: (cluster) =>
        makeHauntedClusterIcon(cluster.getChildCount()),
    });

    const popupOptions = getMapPopupOptions();

    const markers = places.map((place) => {
      const marker = L.marker([place.latitude!, place.longitude!], {
        icon: makeHauntedPlaceIcon(place, {
          selected: selectedPlaceId === place.id,
          badgeLabels,
        }),
        riseOnHover: true,
        riseOffset: 300,
      });
      marker.bindPopup(buildPlacePopupHtml(place, popupLabels), popupOptions);
      marker.on("click", () => {
        onSelectPlace?.(place.id);
        focusMarkerWithPopup(
          map,
          marker,
          place.latitude!,
          place.longitude!
        );
      });
      return marker;
    });

    group.addLayers(markers);
    map.addLayer(group);

    return () => {
      map.removeLayer(group);
      group.clearLayers();
    };
  }, [map, places, popupLabels, badgeLabels, selectedPlaceId, onSelectPlace]);

  return null;
}
