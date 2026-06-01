/** Haunted Sweden map pin — teardrop + ghost (inline SVG for Leaflet divIcon). */

const GHOST = `<g class="haunted-pin-ghost" fill="#e9e5ff">
  <circle cx="16" cy="13" r="5.5" fill="#2a2640"/>
  <path d="M16 8.2c-1.5 0-2.6 1-2.6 2.3 0 1.8 2.6 4.2 2.6 4.2s2.6-2.4 2.6-4.2c0-1.3-1.1-2.3-2.6-2.3z"/>
  <ellipse cx="14.2" cy="12.2" rx="0.9" ry="1.1" fill="#f5f3ff"/>
  <ellipse cx="17.8" cy="12.2" rx="0.9" ry="1.1" fill="#f5f3ff"/>
</g>`;

/** Teardrop body — charcoal with purple edge highlight. */
export function getHauntedMapPinSvg(): string {
  return `<svg class="haunted-map-pin-shape" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="hs-pin-grad" x1="16" y1="4" x2="16" y2="42" gradientUnits="userSpaceOnUse">
        <stop stop-color="#3d3d48"/>
        <stop offset="0.45" stop-color="#1e1e26"/>
        <stop offset="1" stop-color="#14141a"/>
      </linearGradient>
      <filter id="hs-pin-inner" x="-20%" y="-10%" width="140%" height="120%">
        <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#8b5cf6" flood-opacity="0.35"/>
      </filter>
    </defs>
    <path class="haunted-map-pin-fill" d="M16 2C10.5 2 6 6.8 6 13.2c0 5.2 3.2 9.8 8.2 15.5 1.2 1.4 2.8 1.4 4 0C23.2 23 26 18.4 26 13.2 26 6.8 21.5 2 16 2z" fill="url(#hs-pin-grad)" stroke="#6d28d9" stroke-width="1.25" stroke-linejoin="round" filter="url(#hs-pin-inner)"/>
    <ellipse class="haunted-map-pin-head" cx="16" cy="13.5" rx="8.5" ry="8.5" fill="#252530" stroke="rgba(196,181,253,0.35)" stroke-width="0.75"/>
    ${GHOST}
  </svg>`;
}

/** Cluster uses a wider pin silhouette. */
export function getHauntedClusterPinSvg(): string {
  return `<svg class="haunted-cluster-pin-shape" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="hs-cluster-grad" x1="20" y1="4" x2="20" y2="46" gradientUnits="userSpaceOnUse">
        <stop stop-color="#4c1d95"/>
        <stop offset="0.5" stop-color="#2e1065"/>
        <stop offset="1" stop-color="#1a1028"/>
      </linearGradient>
    </defs>
    <path d="M20 3C12.8 3 7 8.5 7 15.5c0 6 4 11.5 10 18.2 1.5 1.7 3.5 1.7 5 0C28 27 33 21.5 33 15.5 33 8.5 27.2 3 20 3z" fill="url(#hs-cluster-grad)" stroke="#a78bfa" stroke-width="1.5" stroke-linejoin="round"/>
    <ellipse cx="20" cy="15" rx="10" ry="9.5" fill="#1e1035" stroke="rgba(196,181,253,0.4)" stroke-width="0.8"/>
  </svg>`;
}
