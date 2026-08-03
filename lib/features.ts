/**
 * Public feature flags for Haunted Sweden.
 *
 * Set in environment (Vercel / .env.local):
 *   ENABLE_COMMUNITY=false   ← hide public /community (default)
 *   ENABLE_COMMUNITY=true    ← restore public Community landing
 *
 * next.config exposes the same value as NEXT_PUBLIC_ENABLE_COMMUNITY
 * so client components (e.g. SiteHeader) stay in sync.
 */
function readFlag(name: string): boolean {
  const raw =
    process.env[name]?.trim() ||
    process.env[`NEXT_PUBLIC_${name}`]?.trim() ||
    "";
  return raw.toLowerCase() === "true" || raw === "1";
}

/** Public Community landing at /community — off until ready. */
export function isCommunityEnabled(): boolean {
  return readFlag("ENABLE_COMMUNITY");
}
