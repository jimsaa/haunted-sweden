/** Canonical production URL — override with NEXT_PUBLIC_SITE_URL in Vercel. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://hauntedsweden.se";

export const SITE_NAME = "Haunted Sweden";

/** Default OG/Twitter image (absolute URL). */
export const DEFAULT_OG_IMAGE_PATH = "/haunted-sweden-logo.png";

export const LOCALE_SV = "sv-SE";
export const LOCALE_EN = "en";
