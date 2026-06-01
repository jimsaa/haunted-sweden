"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { Crosshair } from "lucide-react";
import type { HauntedPlace } from "@/lib/types/place";
import {
  PLACE_FOCUS_ZOOM,
  SWEDEN_CENTER,
} from "@/lib/map-constants";

const FLY_OPTIONS: L.ZoomPanOptions = { duration: 0.85 };

/** Sets Sweden view on first paint; adjusts zoom on breakpoint if still at country scale. */
export function SwedenInitialView({ zoom }: { zoom: number }) {
  const map = useMap();
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current) {
      map.setView(SWEDEN_CENTER, zoom, { animate: false });
      didInit.current = true;
      return;
    }
    if (map.getZoom() <= 6) {
      map.setZoom(zoom, { animate: true });
    }
  }, [map, zoom]);

  return null;
}

export function FlyToFocusedPlace({
  place,
}: {
  place: HauntedPlace | null | undefined;
}) {
  const map = useMap();

  useEffect(() => {
    if (!place?.latitude || !place?.longitude) return;
    map.flyTo([place.latitude, place.longitude], PLACE_FOCUS_ZOOM, FLY_OPTIONS);
  }, [map, place?.id, place?.latitude, place?.longitude]);

  return null;
}

export function ResetSwedenMapButton({
  label,
  zoom,
}: {
  label: string;
  zoom: number;
}) {
  const map = useMap();

  const reset = useCallback(() => {
    map.flyTo(SWEDEN_CENTER, zoom, FLY_OPTIONS);
  }, [map, zoom]);

  return (
    <div className="leaflet-bottom leaflet-left pointer-events-none p-3 sm:p-4">
      <button
        type="button"
        onClick={reset}
        className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/15 bg-[#12121a]/90 px-3 py-2 text-xs font-medium text-white/90 shadow-lg shadow-black/40 backdrop-blur-sm transition-colors hover:border-violet-500/40 hover:bg-violet-950/50 hover:text-white"
        aria-label={label}
      >
        <Crosshair className="h-3.5 w-3.5 text-violet-400" aria-hidden />
        {label}
      </button>
    </div>
  );
}
