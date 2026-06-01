"use client";

import { useEffect, useState } from "react";
import {
  SWEDEN_DEFAULT_ZOOM_DESKTOP,
  SWEDEN_DEFAULT_ZOOM_MOBILE,
} from "@/lib/map-constants";

const MOBILE_MQ = "(max-width: 767px)";

function readSwedenZoom(): number {
  if (typeof window === "undefined") return SWEDEN_DEFAULT_ZOOM_DESKTOP;
  return window.matchMedia(MOBILE_MQ).matches
    ? SWEDEN_DEFAULT_ZOOM_MOBILE
    : SWEDEN_DEFAULT_ZOOM_DESKTOP;
}

export function useSwedenMapZoom(): number {
  const [zoom, setZoom] = useState(readSwedenZoom);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const update = () =>
      setZoom(
        mq.matches ? SWEDEN_DEFAULT_ZOOM_MOBILE : SWEDEN_DEFAULT_ZOOM_DESKTOP
      );
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return zoom;
}
