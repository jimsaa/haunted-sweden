import type {
  MapIconType,
  MapMarkerBadge,
  SwedenPopupBadge,
} from "@/lib/map-icon-types";

const STROKE = "#f5f3ff";
const FILL = "#8b5cf6";
const FILL_DARK = "#5b21b6";

/** Category glyphs — monochrome purple / white, gothic-premium. */
const CATEGORY_SVGS: Record<MapIconType, string> = {
  "castle-fortress": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 20V10l4-3v3l4-3v3l4-3v13H4z" fill="${FILL}" stroke="${STROKE}" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M9 14h2v6H9v-6zm4 0h2v6h-2v-6z" fill="${FILL_DARK}"/>
    <path d="M7 8h2v2H7V8zm8 0h2v2h-2V8z" fill="${STROKE}" opacity="0.9"/>
  </svg>`,
  "church-cemetery": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3v4M10 5h4" stroke="${STROKE}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M8 20V9l4-4 4 4v11H8z" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M11 14h2v6h-2v-6z" fill="${FILL_DARK}"/>
    <circle cx="6" cy="20" r="1.2" fill="${STROKE}" opacity="0.5"/>
    <circle cx="18" cy="20" r="1.2" fill="${STROKE}" opacity="0.5"/>
  </svg>`,
  "burial-ground": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 20V11c0-2.2 1.8-4 4-4s4 1.8 4 4v9" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1"/>
    <path d="M12 7v3M10.5 8.5h3" stroke="${STROKE}" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M5 20h14" stroke="${STROKE}" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
  </svg>`,
  "haunted-accommodation": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 14h16v6H4v-6z" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M6 14V9h5v5M13 14V9h5v5" stroke="${STROKE}" stroke-width="1" opacity="0.85"/>
    <path d="M3 20h18" stroke="${STROKE}" stroke-width="1.2" opacity="0.5"/>
    <ellipse cx="12" cy="11" rx="7" ry="2" fill="${FILL_DARK}" opacity="0.5"/>
  </svg>`,
  museum: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 20V10l7-5 7 5v10H5z" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M9 20v-5h2v5M13 20v-5h2v5" fill="${FILL_DARK}"/>
    <path d="M4 10h16" stroke="${STROKE}" stroke-width="1.2"/>
    <circle cx="12" cy="7" r="1.5" fill="${STROKE}"/>
  </svg>`,
  "nature-site": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3l6 14H6L12 3z" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M10 14h4v6h-4v-6z" fill="${FILL_DARK}"/>
    <path d="M4 20h16" stroke="${STROKE}" stroke-width="1" opacity="0.45"/>
  </svg>`,
  "manor-estate": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 20V11l7-6 7 6v9H5z" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M9 20v-4h6v4" fill="${FILL_DARK}"/>
    <path d="M8 11l1-2h6l1 2" stroke="${STROKE}" stroke-width="1" opacity="0.7"/>
    <path d="M3 20h18" stroke="${STROKE}" stroke-width="1" opacity="0.4"/>
  </svg>`,
  "urban-haunting": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="7" r="3.5" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1"/>
    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1"/>
    <path d="M16 9c1.5 0.8 2.5 2.2 2.5 4" stroke="${STROKE}" stroke-width="1" opacity="0.35" stroke-linecap="round"/>
  </svg>`,
  "legend-site": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 5h12v14H6V5z" fill="${FILL}" stroke="${STROKE}" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M9 8h6M9 11h6M9 14h4" stroke="${STROKE}" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
    <path d="M12 19v2" stroke="${STROKE}" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,
};

const BADGE_SVGS: Record<MapMarkerBadge, string> = {
  verified: `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#10b981" stroke="#ecfdf5" stroke-width="1"/><path d="M3.5 6l2 2 3.5-4" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  visited: `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#d97706" stroke="#fde68a" stroke-width="1"/><path d="M4 6.2h4M6 4.2v4" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/><circle cx="6" cy="8.2" r="0.55" fill="#fff"/></svg>`,
  spokjakt: `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#6d28d9" stroke="#ddd6fe" stroke-width="1"/><path d="M6 3.5c-1.2 0-2 .8-2 2 0 1.5 2 3.5 2 3.5s2-2 2-3.5c0-1.2-.8-2-2-2z" fill="#f5f3ff"/></svg>`,
  laxton: `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#4c1d95" stroke="#c4b5fd" stroke-width="1"/><rect x="3.5" y="4" width="5" height="4" rx="0.6" fill="#f5f3ff"/><path d="M8.5 5.2l1.8 1-1.8 1V5.2z" fill="#4c1d95"/></svg>`,
  featured: `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#b45309" stroke="#fde68a" stroke-width="1"/><path d="M6 3.8l.9 1.8 2 .3-1.45 1.4.35 2L6 8.5 4.2 9.5l.35-2L3.1 5.9l2-.3L6 3.8z" fill="#fef3c7"/></svg>`,
  "night-access": `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#312e81" stroke="#a5b4fc" stroke-width="1"/><path d="M7.2 3.5a3.5 3.5 0 1 0 2.3 6 4 4 0 1 1-2.3-6z" fill="#e0e7ff"/></svg>`,
  overnight: `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#5b21b6" stroke="#ddd6fe" stroke-width="1"/><path d="M3.5 7h5v2.5H3.5V7z" fill="#f5f3ff"/><path d="M4 6.5h4v-1.5H4v1.5z" fill="#c4b5fd"/></svg>`,
};

const POPUP_EXTRA_BADGE_SVGS = {
  "family-friendly": `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#0f766e" stroke="#99f6e4" stroke-width="1"/><circle cx="4.2" cy="7" r="1.1" fill="#f5f3ff"/><circle cx="7.8" cy="7" r="1.1" fill="#f5f3ff"/><circle cx="6" cy="5" r="1.1" fill="#f5f3ff"/></svg>`,
  "public-access": `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#1e3a5f" stroke="#93c5fd" stroke-width="1"/><path d="M4 8V5.5l2-1.5 2 1.5V8H4z" fill="#f5f3ff"/><path d="M5.2 7h1.6v1H5.2V7z" fill="#1e3a5f"/></svg>`,
} as const;

const POPUP_BADGE_SVGS: Record<SwedenPopupBadge, string> = {
  ...BADGE_SVGS,
  ...POPUP_EXTRA_BADGE_SVGS,
};

export function getCategoryMarkerSvg(type: MapIconType): string {
  return CATEGORY_SVGS[type];
}

export function getBadgeSvg(badge: MapMarkerBadge): string {
  return BADGE_SVGS[badge];
}

export function getSwedenPopupBadgeSvg(badge: SwedenPopupBadge): string {
  return POPUP_BADGE_SVGS[badge];
}

/** Small legend preview icon (same glyph, fixed size). */
export function getLegendIconSvg(type: MapIconType): string {
  return CATEGORY_SVGS[type].replace(
    'viewBox="0 0 24 24"',
    'class="haunted-legend-glyph" viewBox="0 0 24 24"'
  );
}
