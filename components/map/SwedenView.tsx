"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { HauntedPlace } from "@/lib/types/place";
import {
  SWEDEN_OUTLINE_PATH,
  SWEDEN_OUTLINE_VIEWBOX,
} from "@/lib/sweden-outline";
import { buildSwedenViewMarkers } from "@/lib/sweden-view-clusters";
import { latLonToSwedenView } from "@/lib/sweden-view-projection";
import type { MapBadgeLabels } from "@/lib/map-marker-badges";
import type { SwedenPopupLabels } from "@/lib/sweden-popup-labels";
import type { Locale } from "@/lib/translations";
import {
  HauntedClusterPinMarker,
  HauntedMapPinMarker,
} from "@/components/map/HauntedMapPinMarker";
import { SwedenViewControls } from "@/components/map/SwedenViewControls";
import { SwedenViewPlaceModal } from "@/components/map/SwedenViewPlaceModal";
import { useSwedenViewViewport } from "@/components/map/useSwedenViewViewport";

export function SwedenView({
  places,
  popupLabels,
  badgeLabels,
  selectedPlaceId,
  focusedPlace,
  onSelectPlace,
  resetLabel,
  regionLabels,
  controlLabels,
  a11yLabels,
  locale,
  clusterAriaLabel,
}: {
  places: HauntedPlace[];
  popupLabels: SwedenPopupLabels;
  badgeLabels: MapBadgeLabels;
  selectedPlaceId?: string | null;
  focusedPlace?: HauntedPlace | null;
  onSelectPlace?: (placeId: string | null) => void;
  resetLabel: string;
  regionLabels: { north: string; central: string; south: string };
  controlLabels: { zoomIn: string; zoomOut: string };
  a11yLabels: { mapZoom: string; swedenMap: string };
  locale: Locale;
  clusterAriaLabel: (count: string) => string;
}) {
  const [popupPlaceId, setPopupPlaceId] = useState<string | null>(null);
  const [expandedClusterKey, setExpandedClusterKey] = useState<string | null>(
    null
  );

  const viewport = useSwedenViewViewport();
  const { resetView } = viewport;

  const markers = useMemo(() => {
    if (expandedClusterKey) {
      const clusterPlaces = places.filter((p) =>
        expandedClusterKey.split(",").includes(p.id)
      );
      return buildSwedenViewMarkers(clusterPlaces, 0);
    }
    return buildSwedenViewMarkers(places);
  }, [places, expandedClusterKey]);

  const activePlaceId =
    popupPlaceId ?? selectedPlaceId ?? focusedPlace?.id ?? null;

  const popupPlace = useMemo(
    () => places.find((p) => p.id === activePlaceId) ?? null,
    [places, activePlaceId]
  );

  const closePopup = useCallback(() => {
    setPopupPlaceId(null);
    onSelectPlace?.(null);
  }, [onSelectPlace]);

  const openPlacePopup = useCallback(
    (place: HauntedPlace) => {
      setPopupPlaceId(place.id);
      onSelectPlace?.(place.id);
    },
    [onSelectPlace]
  );

  const resetAll = useCallback(() => {
    resetView();
    closePopup();
    setExpandedClusterKey(null);
  }, [resetView, closePopup]);

  useEffect(() => {
    if (!focusedPlace?.id || focusedPlace.latitude == null) return;
    setExpandedClusterKey(null);
    openPlacePopup(focusedPlace);
  }, [
    focusedPlace?.id,
    focusedPlace?.latitude,
    focusedPlace?.longitude,
    openPlacePopup,
  ]);

  useEffect(() => {
    if (!popupPlace) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popupPlace, closePopup]);

  const handlePlaceClick = (place: HauntedPlace) => {
    openPlacePopup(place);
  };

  const handleClusterClick = (clusterPlaces: HauntedPlace[]) => {
    const key = clusterPlaces
      .map((p) => p.id)
      .sort()
      .join(",");

    if (clusterPlaces.length === 1) {
      openPlacePopup(clusterPlaces[0]!);
      setExpandedClusterKey(null);
      return;
    }

    if (expandedClusterKey === key) {
      setExpandedClusterKey(null);
      closePopup();
      return;
    }

    closePopup();
    setExpandedClusterKey(key);
  };

  const handleViewportPointerUp = (e: React.PointerEvent) => {
    viewport.onPointerUp(e);
  };

  return (
    <div className="sweden-view-frame relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-violet-950/40">
      <div className="sweden-view-bg" aria-hidden />

      <div
        ref={viewport.viewportRef}
        className={`sweden-view-viewport ${viewport.isDragging ? "sweden-view-viewport--dragging" : ""} ${viewport.isPointerInside ? "sweden-view-viewport--active" : ""}`}
        role="application"
        aria-label={a11yLabels.swedenMap}
        onPointerEnter={viewport.onPointerEnter}
        onPointerLeave={viewport.onPointerLeave}
        onPointerDown={viewport.onPointerDown}
        onPointerMove={viewport.onPointerMove}
        onPointerUp={handleViewportPointerUp}
        onPointerCancel={handleViewportPointerUp}
        onTouchStart={viewport.onTouchStart}
        onTouchEnd={viewport.onTouchEnd}
      >
        <SwedenViewControls
          onZoomIn={viewport.zoomIn}
          onZoomOut={viewport.zoomOut}
          onReset={resetAll}
          resetLabel={resetLabel}
          zoomInLabel={controlLabels.zoomIn}
          zoomOutLabel={controlLabels.zoomOut}
          toolbarAriaLabel={a11yLabels.mapZoom}
        />

        {viewport.mapStyle ? (
          <div
            className="sweden-view-map-layer"
            style={viewport.mapStyle}
          >
            <svg
              viewBox={SWEDEN_OUTLINE_VIEWBOX}
              className="sweden-view-svg w-full h-full select-none"
              aria-hidden
              preserveAspectRatio="xMidYMid meet"
              shapeRendering="geometricPrecision"
            >
              <defs>
                <linearGradient
                  id="sweden-land-fill"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#b8bcc8" />
                  <stop offset="55%" stopColor="#9ca3af" />
                  <stop offset="100%" stopColor="#7b8394" />
                </linearGradient>
                <filter id="sweden-land-glow">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="6"
                    floodColor="#8b5cf6"
                    floodOpacity="0.2"
                  />
                </filter>
              </defs>
              <path
                d={SWEDEN_OUTLINE_PATH}
                className="sweden-view-land"
                fill="url(#sweden-land-fill)"
                filter="url(#sweden-land-glow)"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="sweden-view-region-labels pointer-events-none" aria-hidden>
              <span className="sweden-view-region sweden-view-region--north">
                {regionLabels.north}
              </span>
              <span className="sweden-view-region sweden-view-region--central">
                {regionLabels.central}
              </span>
              <span className="sweden-view-region sweden-view-region--south">
                {regionLabels.south}
              </span>
            </div>

            <div className="sweden-view-pins absolute inset-0">
              {markers.map((marker) => {
                if (marker.kind === "cluster") {
                  const key = marker.places
                    .map((p) => p.id)
                    .sort()
                    .join(",");
                  return (
                    <div
                      key={`cluster-${key}`}
                      className="sweden-view-pin-position"
                      style={{
                        left: `${marker.xPercent}%`,
                        top: `${marker.yPercent}%`,
                      }}
                    >
                      <HauntedClusterPinMarker
                        count={marker.count}
                        ariaLabel={clusterAriaLabel}
                        onClick={() => handleClusterClick(marker.places)}
                      />
                    </div>
                  );
                }

                const place = marker.place;
                return (
                  <div
                    key={place.id}
                    className="sweden-view-pin-position"
                    style={{
                      left: `${marker.xPercent}%`,
                      top: `${marker.yPercent}%`,
                    }}
                  >
                    <HauntedMapPinMarker
                      place={place}
                      locale={locale}
                      selected={activePlaceId === place.id}
                      badgeLabels={badgeLabels}
                      size="sweden"
                      showBadges={false}
                      cleanMapPin
                      onClick={() => handlePlaceClick(place)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {popupPlace ? (
          <SwedenViewPlaceModal
            place={popupPlace}
            labels={popupLabels}
            onClose={closePopup}
          />
        ) : null}
      </div>
    </div>
  );
}
