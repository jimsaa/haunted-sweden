/**
 * Public feature flags for Haunted Sweden.
 *
 * Set in environment (Vercel / .env.local):
 *   ENABLE_COMMUNITY=true    ← public /community waitlist (default)
 *   ENABLE_COMMUNITY=false   ← hide public /community
 *
 * next.config exposes the same value as NEXT_PUBLIC_ENABLE_COMMUNITY
 * so client components (e.g. SiteHeader) stay in sync.
 */
function readFlag(name: string, defaultWhenUnset = false): boolean {
  const raw =
    process.env[name]?.trim() ||
    process.env[`NEXT_PUBLIC_${name}`]?.trim() ||
    "";
  if (!raw) return defaultWhenUnset;
  if (raw.toLowerCase() === "false" || raw === "0") return false;
  return raw.toLowerCase() === "true" || raw === "1";
}

/** Public Community waitlist landing at /community — on by default (email capture only). */
export function isCommunityEnabled(): boolean {
  return readFlag("ENABLE_COMMUNITY", true);
}
