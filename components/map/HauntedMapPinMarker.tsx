"use client";

import type { HauntedPlace } from "@/lib/types/place";
import {
  getBadgeLabel,
  getMapMarkerBadges,
  type MapBadgeLabels,
} from "@/lib/map-marker-badges";
import type { MapMarkerBadge } from "@/lib/map-icon-types";
import { getBadgeSvg } from "@/lib/map-marker-svgs";
import { getHauntedClusterPinSvg, getHauntedMapPinSvg } from "@/lib/map-pin-svgs";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import type { Locale } from "@/lib/translations";
import { isHauntedSwedenVerified } from "@/lib/verification";

const PIN_SVG = getHauntedMapPinSvg();
const CLUSTER_SVG = getHauntedClusterPinSvg();

type PinSize = "map" | "sweden";

function pinDimensions(
  featured: boolean,
  selected: boolean,
  size: PinSize,
  cleanMapPin: boolean
) {
  if (size === "sweden" || cleanMapPin) {
    return { w: 30, h: 38, scale: "sweden-view-pin--standard" };
  }
  return featured || selected
    ? { w: 52, h: 64, scale: "" }
    : { w: 44, h: 56, scale: "" };
}

export function HauntedMapPinMarker({
  place,
  locale = "en",
  selected = false,
  badgeLabels,
  size = "map",
  showBadges = true,
  cleanMapPin = false,
  onClick,
  className = "",
}: {
  place: HauntedPlace;
  locale?: Locale;
  selected?: boolean;
  badgeLabels: MapBadgeLabels;
  size?: PinSize;
  /** Hide secondary badge icons (Sweden View). */
  showBadges?: boolean;
  /** Uniform pin without featured/verified map styling. */
  cleanMapPin?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const featured = place.featured;
  const verified = isHauntedSwedenVerified(place);
  const { w, h, scale } = pinDimensions(featured, selected, size, cleanMapPin);

  const modifiers = [
    "haunted-map-pin",
    scale,
    cleanMapPin
      ? ""
      : featured
        ? "haunted-map-pin--featured"
        : "",
    cleanMapPin ? "" : verified ? "haunted-map-pin--verified" : "",
    selected ? "haunted-map-pin--selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const categoryLabel = getPlaceCategoryLabel(place.category, locale);
  const pinName =
    locale === "en" && place.englishName ? place.englishName : place.name;
  const badges = showBadges ? getMapMarkerBadges(place) : [];

  return (
    <button
      type="button"
      className={`haunted-marker-pin-wrapper sweden-view-pin-anchor border-0 bg-transparent p-0 cursor-pointer ${className}`}
      style={{ width: w, height: h }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      aria-label={`${pinName} — ${categoryLabel}`}
    >
      <div className={modifiers}>
        <div className="haunted-map-pin-shadow" aria-hidden />
        <div className="haunted-map-pin-glow" aria-hidden />
        {selected ? (
          <div className="haunted-map-pin-select-ring" aria-hidden />
        ) : null}
        <div className="haunted-map-pin-body">
          <span dangerouslySetInnerHTML={{ __html: PIN_SVG }} />
        </div>
        {badges.length > 0 ? (
          <div className="haunted-marker-badges">
            {badges.map((b: MapMarkerBadge) => {
              const text = getBadgeLabel(b, badgeLabels);
              return (
                <span
                  key={b}
                  className={`haunted-marker-badge haunted-marker-badge--${b}`}
                  data-tooltip={text}
                  tabIndex={0}
                  role="img"
                  aria-label={text}
                  dangerouslySetInnerHTML={{ __html: getBadgeSvg(b) }}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </button>
  );
}

export function HauntedClusterPinMarker({
  count,
  ariaLabel,
  onClick,
  className = "",
}: {
  count: number;
  ariaLabel: (count: string) => string;
  onClick?: () => void;
  className?: string;
}) {
  const safeCount = count > 99 ? "99+" : String(count);
  const tier = 48;

  return (
    <button
      type="button"
      className={`haunted-cluster-icon-wrapper sweden-view-pin-anchor border-0 bg-transparent p-0 cursor-pointer ${className}`}
      style={{ width: tier, height: Math.round(tier * 1.15) }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      aria-label={ariaLabel(safeCount)}
    >
      <div className={`haunted-cluster-pin haunted-cluster-pin--${tier} sweden-view-cluster-pin`}>
        <div className="haunted-cluster-pin-shadow" aria-hidden />
        <div className="haunted-cluster-pin-glow" aria-hidden />
        <div className="haunted-cluster-pin-body">
          <span dangerouslySetInnerHTML={{ __html: CLUSTER_SVG }} />
          <span className="haunted-cluster-count">{safeCount}</span>
        </div>
      </div>
    </button>
  );
}
