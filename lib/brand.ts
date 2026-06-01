/**
 * Haunted Sweden — canonical product brand.
 * @see docs/BRAND.md
 */

export const BRAND_NAME = "Haunted Sweden" as const;

/** Circular brand mark (header, OG, etc.). */
export const BRAND_LOGO_SRC = "/haunted-sweden-logo.png" as const;

/** Never use these in user-facing copy, SEO, or database labels. */
export const FORBIDDEN_BRAND_NAMES = [
  "Swedish Hauntings",
  "Sweden Hauntings",
  "Haunted Sweden App Project",
  "Swedish Haunted Locations",
] as const;

/** Editorial / research field keys (JSON camelCase). */
export const HAUNTED_SWEDEN_FIELDS = {
  score: "hauntedSwedenScore",
  tags: "suggestedHauntedSwedenTags",
  appSummary: "hauntedSwedenAppSummary",
  whyItFits: "whyItFitsHauntedSweden",
} as const;

/** Human-readable labels for docs and admin UIs. */
export const HAUNTED_SWEDEN_FIELD_LABELS = {
  hauntedSwedenScore: "Haunted Sweden Score",
  suggestedHauntedSwedenTags: "Suggested Haunted Sweden Tags",
  hauntedSwedenAppSummary: "Haunted Sweden App Summary",
  whyItFitsHauntedSweden: "Why It Fits Haunted Sweden",
} as const;
