"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { HauntedPlace } from "@/lib/types/place";
import {
  SWEDEN_OUTLINE_PATH,
  SWEDEN_OUTLINE_VIEWBOX,
} from "@/lib/sweden-outline";
import { buildSwedenViewMarkers } from "@/lib/sweden-view-clusters";
import { getClusterFocusTransforms } from "@/lib/sweden-view-cluster-focus";
import { latLonToSwedenView } from "@/lib/sweden-view-projection";
import {
  clusterPlacesKey,
  computeSpiderfyLayout,
  isSpiderfySeparatedOnScreen,
  type SpiderfyLayout,
} from "@/lib/sweden-view-spiderfy";
import type { MapBadgeLabels } from "@/lib/map-marker-badges";
import type { SwedenPopupLabels } from "@/lib/sweden-popup-labels";
import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/i18n";
import {
  HauntedClusterPinMarker,
  HauntedMapPinMarker,
} from "@/components/map/HauntedMapPinMarker";
import { SwedenViewClusterList } from "@/components/map/SwedenViewClusterList";
import { SwedenViewControls } from "@/components/map/SwedenViewControls";
import { SwedenViewPlaceModal } from "@/components/map/SwedenViewPlaceModal";
import { useSwedenViewViewport } from "@/components/map/useSwedenViewViewport";

type ClusterUiState =
  | { mode: "spiderfy"; key: string; layout: SpiderfyLayout }
  | { mode: "list"; key: string; places: HauntedPlace[] };

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
  const t = getTranslations(locale);
  const [popupPlaceId, setPopupPlaceId] = useState<string | null>(null);
  const [clusterUi, setClusterUi] = useState<ClusterUiState | null>(null);

  const viewport = useSwedenViewViewport();
  const {
    resetView,
    flyToPlace,
    applyTransform,
    viewportSize,
    metrics,
  } = viewport;

  const markers = useMemo(() => {
    const base = buildSwedenViewMarkers(places);

    if (clusterUi?.mode !== "spiderfy") {
      return base;
    }

    const expandedKey = clusterUi.key;
    const withoutExpanded = base.filter((m) => {
      if (m.kind === "cluster") {
        return clusterPlacesKey(m.places) !== expandedKey;
      }
      return true;
    });

    const spiderPins = clusterUi.layout.places.map((sp) => ({
      kind: "place" as const,
      place: sp.place,
      xPercent: sp.xPercent,
      yPercent: sp.yPercent,
    }));

    return [...withoutExpanded, ...spiderPins];
  }, [places, clusterUi]);

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

  const clearClusterUi = useCallback(() => {
    setClusterUi(null);
  }, []);

  const resetAll = useCallback(() => {
    resetView();
    closePopup();
    clearClusterUi();
  }, [resetView, closePopup, clearClusterUi]);

  useEffect(() => {
    if (!focusedPlace?.id || focusedPlace.latitude == null) return;
    clearClusterUi();
    const { xPercent, yPercent } = latLonToSwedenView(
      focusedPlace.latitude,
      focusedPlace.longitude!
    );
    flyToPlace(xPercent, yPercent);
    openPlacePopup(focusedPlace);
  }, [
    focusedPlace?.id,
    focusedPlace?.latitude,
    focusedPlace?.longitude,
    flyToPlace,
    openPlacePopup,
    clearClusterUi,
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

  const handleSelectFromClusterList = useCallback(
    (place: HauntedPlace) => {
      if (place.latitude == null || place.longitude == null) return;
      clearClusterUi();
      const { xPercent, yPercent } = latLonToSwedenView(
        place.latitude,
        place.longitude
      );
      flyToPlace(xPercent, yPercent);
      openPlacePopup(place);
    },
    [clearClusterUi, flyToPlace, openPlacePopup]
  );

  const handleClusterClick = useCallback(
    (clusterPlaces: HauntedPlace[]) => {
      const key = clusterPlacesKey(clusterPlaces);

      if (clusterPlaces.length === 1) {
        const place = clusterPlaces[0]!;
        if (place.latitude == null || place.longitude == null) return;
        clearClusterUi();
        const { xPercent, yPercent } = latLonToSwedenView(
          place.latitude,
          place.longitude
        );
        flyToPlace(xPercent, yPercent);
        openPlacePopup(place);
        return;
      }

      if (clusterUi?.key === key) {
        clearClusterUi();
        closePopup();
        return;
      }

      closePopup();

      const projected = clusterPlaces
        .filter((p) => p.latitude != null && p.longitude != null)
        .map((p) => latLonToSwedenView(p.latitude!, p.longitude!));

      if (projected.length === 0) return;

      if (!metrics || viewportSize.width <= 0) {
        setClusterUi({ mode: "list", key, places: clusterPlaces });
        return;
      }

      const { initial, maxZoom } = getClusterFocusTransforms(
        projected,
        viewportSize,
        metrics
      );
      const layout = computeSpiderfyLayout(clusterPlaces);

      let target = initial;
      if (!isSpiderfySeparatedOnScreen(layout, initial, metrics)) {
        target = maxZoom;
      }

      applyTransform(target, true);

      if (!isSpiderfySeparatedOnScreen(layout, target, metrics)) {
        setClusterUi({ mode: "list", key, places: clusterPlaces });
        return;
      }

      setClusterUi({ mode: "spiderfy", key, layout });
    },
    [
      clusterUi?.key,
      clearClusterUi,
      closePopup,
      flyToPlace,
      metrics,
      viewportSize,
      openPlacePopup,
      applyTransform,
    ]
  );

  const handleViewportPointerUp = (e: React.PointerEvent) => {
    viewport.onPointerUp(e);
  };

  const spiderfyLayout =
    clusterUi?.mode === "spiderfy" ? clusterUi.layout : null;

  const clusterListPlaces =
    clusterUi?.mode === "list" ? clusterUi.places : null;

  const clusterListLabels = {
    title: t.swedenClusterList.title,
    count: t.swedenClusterList.count,
    view: t.swedenClusterList.view,
    close: t.swedenClusterList.close,
    hauntingLevel: t.mapPopup.hauntingLevel,
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

            {spiderfyLayout ? (
              <svg
                className="sweden-view-spiderfy-lines"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {spiderfyLayout.places.map((sp) => (
                  <line
                    key={sp.place.id}
                    x1={spiderfyLayout.center.xPercent}
                    y1={spiderfyLayout.center.yPercent}
                    x2={sp.xPercent}
                    y2={sp.yPercent}
                  />
                ))}
              </svg>
            ) : null}

            <div className="sweden-view-pins absolute inset-0">
              {markers.map((marker) => {
                if (marker.kind === "cluster") {
                  const key = clusterPlacesKey(marker.places);
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

        {clusterListPlaces ? (
          <SwedenViewClusterList
            places={clusterListPlaces}
            locale={locale}
            labels={clusterListLabels}
            onSelectPlace={handleSelectFromClusterList}
            onClose={clearClusterUi}
          />
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
