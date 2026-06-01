import L from "leaflet";
import type { HauntedPlace } from "@/lib/types/place";
import type { Locale } from "@/lib/translations";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import {
  getBadgeLabel,
  getMapMarkerBadges,
  type MapBadgeLabels,
} from "@/lib/map-marker-badges";
import type { MapMarkerBadge } from "@/lib/map-icon-types";
import { getBadgeSvg } from "@/lib/map-marker-svgs";
import { getHauntedClusterPinSvg, getHauntedMapPinSvg } from "@/lib/map-pin-svgs";
import { isHauntedSwedenVerified } from "@/lib/verification";
import { getPlaceSummary } from "@/lib/place-locale-text";

export interface MapPopupLabels {
  locale: Locale;
  viewDetails: string;
  hauntingLevel: string;
  city: string;
  category: string;
  featured: string;
}

function escapeHtml(text: string): string {
  return text.replace(/[<>&"']/g, (c) => {
    const map: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[c] ?? c;
  });
}

function displayName(place: HauntedPlace, locale: Locale): string {
  return locale === "en" && place.englishName ? place.englishName : place.name;
}

function hauntingStars(level: number): string {
  const filled = "★".repeat(Math.min(5, Math.max(0, level)));
  const empty = "☆".repeat(5 - filled.length);
  return `<span class="haunted-popup-stars-filled">${filled}</span><span class="haunted-popup-stars-empty">${empty}</span>`;
}

function buildBadgeHtml(place: HauntedPlace, labels: MapBadgeLabels): string {
  const badges = getMapMarkerBadges(place);
  if (badges.length === 0) return "";

  const items = badges
    .map((b: MapMarkerBadge) => {
      const text = escapeHtml(getBadgeLabel(b, labels));
      return `<span class="haunted-marker-badge haunted-marker-badge--${b}" data-tooltip="${text}" tabindex="0" role="img" aria-label="${text}">
        ${getBadgeSvg(b)}
      </span>`;
    })
    .join("");

  return `<div class="haunted-marker-badges">${items}</div>`;
}

export interface HauntedMarkerOptions {
  selected?: boolean;
  badgeLabels: MapBadgeLabels;
}

const PIN_SVG = getHauntedMapPinSvg();

/** Branded teardrop map pin with ghost icon, purple glow, and optional badges. */
export function makeHauntedPlaceIcon(
  place: HauntedPlace,
  options: HauntedMarkerOptions
): L.DivIcon {
  const featured = place.featured;
  const verified = isHauntedSwedenVerified(place);
  const selected = options.selected;

  const modifiers = [
    "haunted-map-pin",
    featured ? "haunted-map-pin--featured" : "",
    verified ? "haunted-map-pin--verified" : "",
    selected ? "haunted-map-pin--selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const categoryLabel = escapeHtml(getPlaceCategoryLabel(place.category, "en"));
  const w = featured || selected ? 52 : 44;
  const h = featured || selected ? 64 : 56;

  return L.divIcon({
    className: "haunted-marker-pin-wrapper",
    html: `<div class="${modifiers}" role="img" aria-label="${escapeHtml(place.name)} — ${categoryLabel}">
      <div class="haunted-map-pin-shadow" aria-hidden="true"></div>
      <div class="haunted-map-pin-glow" aria-hidden="true"></div>
      ${selected ? '<div class="haunted-map-pin-select-ring" aria-hidden="true"></div>' : ""}
      <div class="haunted-map-pin-body">
        ${PIN_SVG}
      </div>
      ${buildBadgeHtml(place, options.badgeLabels)}
    </div>`,
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
    popupAnchor: [0, -h + 4],
  });
}

/** Haunted-themed cluster pin with location count. */
export function makeHauntedClusterIcon(count: number): L.DivIcon {
  const safeCount = count > 99 ? "99+" : String(count);
  const tier =
    count >= 45 ? 60 : count >= 27 ? 56 : count >= 12 ? 52 : 48;
  const half = tier / 2;
  const h = Math.round(tier * 1.15);

  return L.divIcon({
    className: "haunted-cluster-icon-wrapper",
    html: `<div class="haunted-cluster-pin haunted-cluster-pin--${tier}" aria-label="${safeCount} locations">
      <div class="haunted-cluster-pin-shadow" aria-hidden="true"></div>
      <div class="haunted-cluster-pin-glow" aria-hidden="true"></div>
      <div class="haunted-cluster-pin-body">
        ${getHauntedClusterPinSvg()}
        <span class="haunted-cluster-count">${safeCount}</span>
      </div>
    </div>`,
    iconSize: [tier, h],
    iconAnchor: [half, h],
  });
}

export function buildPlacePopupHtml(
  place: HauntedPlace,
  labels: MapPopupLabels
): string {
  const name = escapeHtml(displayName(place, labels.locale));
  const category = escapeHtml(
    getPlaceCategoryLabel(place.category, labels.locale)
  );
  const city = escapeHtml(place.city);
  const description = escapeHtml(getPlaceSummary(place, labels.locale));
  const featured = place.featured
    ? `<span class="haunted-popup-featured" title="${escapeHtml(labels.featured)}">★</span>`
    : "";

  return `<article class="haunted-popup">
    <header class="haunted-popup-header">
      <h3 class="haunted-popup-title">${name}${featured}</h3>
    </header>
    <dl class="haunted-popup-meta">
      <div class="haunted-popup-row">
        <dt class="haunted-popup-label">${escapeHtml(labels.city)}</dt>
        <dd class="haunted-popup-value">${city}</dd>
      </div>
      <div class="haunted-popup-row">
        <dt class="haunted-popup-label">${escapeHtml(labels.category)}</dt>
        <dd class="haunted-popup-value"><span class="haunted-popup-category">${category}</span></dd>
      </div>
      <div class="haunted-popup-row">
        <dt class="haunted-popup-label">${escapeHtml(labels.hauntingLevel)}</dt>
        <dd class="haunted-popup-value haunted-popup-level">${hauntingStars(place.hauntingLevel)}</dd>
      </div>
    </dl>
    <p class="haunted-popup-description">${description}</p>
    <a href="/places/${escapeHtml(place.slug)}" class="haunted-popup-btn" onclick="event.stopPropagation()">${escapeHtml(labels.viewDetails)}</a>
  </article>`;
}
