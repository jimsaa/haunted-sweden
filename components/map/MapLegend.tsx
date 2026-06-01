"use client";

import { useState } from "react";
import { ChevronDown, Map } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { MAP_MARKER_BADGE_ORDER, type MapMarkerBadge } from "@/lib/map-icon-types";
import { getBadgeSvg } from "@/lib/map-marker-svgs";
import { getHauntedClusterPinSvg, getHauntedMapPinSvg } from "@/lib/map-pin-svgs";

const PIN_LEGEND_KEYS = ["standard", "featured", "verified", "cluster"] as const;
type PinLegendKey = (typeof PIN_LEGEND_KEYS)[number];

const PIN_MODIFIERS: Record<PinLegendKey, string> = {
  standard: "haunted-map-pin",
  featured: "haunted-map-pin haunted-map-pin--featured",
  verified: "haunted-map-pin haunted-map-pin--verified",
  cluster: "haunted-cluster-pin haunted-cluster-pin--48",
};

function LegendPinPreview({ pinKey }: { pinKey: PinLegendKey }) {
  const isCluster = pinKey === "cluster";
  const pinSvg = isCluster ? getHauntedClusterPinSvg() : getHauntedMapPinSvg();

  return (
    <span
      className="relative flex h-11 w-9 shrink-0 items-end justify-center overflow-visible"
      aria-hidden
    >
      <div
        className={`${PIN_MODIFIERS[pinKey]} map-legend-pin-preview pointer-events-none`}
      >
        <div
          className={
            isCluster ? "haunted-cluster-pin-shadow" : "haunted-map-pin-shadow"
          }
          aria-hidden="true"
        />
        <div
          className={isCluster ? "haunted-cluster-pin-glow" : "haunted-map-pin-glow"}
          aria-hidden="true"
        />
        <div className={isCluster ? "haunted-cluster-pin-body" : "haunted-map-pin-body"}>
          <span dangerouslySetInnerHTML={{ __html: pinSvg }} />
          {isCluster ? (
            <span className="haunted-cluster-count">3</span>
          ) : null}
        </div>
      </div>
    </span>
  );
}

export function MapLegend() {
  const { t } = useLanguage();
  const lg = t.mapLegend;
  const [open, setOpen] = useState(true);

  return (
    <div className="leaflet-top leaflet-right pointer-events-none p-3 sm:p-4 w-full max-w-[220px] ml-auto">
      <div className="pointer-events-auto rounded-xl border border-white/12 bg-[#0c0c14]/92 shadow-xl shadow-black/50 backdrop-blur-md overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-semibold text-white/90 hover:bg-white/[0.04] transition-colors"
          aria-expanded={open}
        >
          <span className="flex items-center gap-1.5">
            <Map className="h-3.5 w-3.5 text-violet-400" aria-hidden />
            {lg.title}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>

        {open && (
          <div className="px-3 pb-3 pt-0 border-t border-white/8">
            <p className="mt-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/40">
              {lg.pinsTitle}
            </p>
            <ul className="space-y-1.5">
              {PIN_LEGEND_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex items-center gap-2.5 text-[11px] text-white/75"
                >
                  <LegendPinPreview pinKey={key} />
                  <span>{lg.pins[key]}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/40">
              {lg.badgesTitle}
            </p>
            <ul className="space-y-1.5">
              {MAP_MARKER_BADGE_ORDER.map((badge: MapMarkerBadge) => (
                <li
                  key={badge}
                  className="flex items-center gap-2 text-[11px] text-white/65"
                >
                  <span
                    className={`haunted-marker-badge haunted-marker-badge--${badge} static-badge`}
                    title={lg.badges[badge]}
                    aria-label={lg.badges[badge]}
                    dangerouslySetInnerHTML={{ __html: getBadgeSvg(badge) }}
                  />
                  {lg.badges[badge]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
