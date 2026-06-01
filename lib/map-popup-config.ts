import L from "leaflet";
import { PLACE_FOCUS_ZOOM } from "@/lib/map-constants";

const MOBILE_MQ = "(max-width: 767px)";

export const POPUP_AUTOPAN_PADDING = {
  topLeft: L.point(40, 120),
  bottomRight: L.point(40, 80),
} as const;

export function isMapPopupMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MQ).matches;
}

export function getMapPopupOffsetY(): number {
  return isMapPopupMobile() ? -160 : -120;
}

export function getMapPopupOptions(): L.PopupOptions {
  const mobile = isMapPopupMobile();
  return {
    maxWidth: mobile ? 260 : 300,
    minWidth: mobile ? 220 : 240,
    autoPan: true,
    autoPanPaddingTopLeft: POPUP_AUTOPAN_PADDING.topLeft,
    autoPanPaddingBottomRight: POPUP_AUTOPAN_PADDING.bottomRight,
    className: "haunted-leaflet-popup",
    closeButton: true,
  };
}

const FLY_DURATION = 0.6;
const PAN_DURATION = 0.4;

/**
 * Fly to a place, open its marker popup, then nudge the map so the card sits above the pin.
 */
export function focusMarkerWithPopup(
  map: L.Map,
  marker: L.Marker,
  lat: number,
  lng: number,
  zoom: number = PLACE_FOCUS_ZOOM
): void {
  const panOffsetY = getMapPopupOffsetY();
  let popupPanned = false;

  const panForPopup = () => {
    if (popupPanned) return;
    popupPanned = true;
    map.panBy([0, panOffsetY], { animate: true, duration: PAN_DURATION });
  };

  const onPopupOpen = () => {
    marker.off("popupopen", onPopupOpen);
    requestAnimationFrame(() => {
      panForPopup();
    });
  };

  marker.once("popupopen", onPopupOpen);

  const openAfterMove = () => {
    map.off("moveend", openAfterMove);
    marker.openPopup();
  };

  const center = map.getCenter();
  const atTarget =
    Math.abs(map.getZoom() - zoom) < 0.5 &&
    center.distanceTo(L.latLng(lat, lng)) < 80;

  if (atTarget) {
    marker.openPopup();
    return;
  }

  map.once("moveend", openAfterMove);
  map.flyTo([lat, lng], zoom, {
    animate: true,
    duration: FLY_DURATION,
  });

  // Fallback if moveend does not fire (e.g. interrupted animation)
  window.setTimeout(() => {
    if (!marker.isPopupOpen()) {
      map.off("moveend", openAfterMove);
      marker.openPopup();
    }
  }, FLY_DURATION * 1000 + 150);
}
