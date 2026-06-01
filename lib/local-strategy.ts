/**
 * Phase 1 geographic focus — quality over quantity.
 * Gothenburg (Göteborg) center for "within ~1 hour" expansion planning.
 */
export const PHASE1_CENTER = {
  name: "Gothenburg",
  latitude: 57.7089,
  longitude: 11.9746,
} as const;

/** Approximate radius for phase-1 local-first curation (km). */
export const PHASE1_RADIUS_KM = 80;

export const PHASE1_GOALS = [
  "High quality locations",
  "Real investigations",
  "Original photos and videos",
  "Authentic documentation",
] as const;
