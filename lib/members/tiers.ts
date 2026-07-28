import type { MemberTier } from "@/lib/members/types";

/**
 * Immersive membership labels for the Haunted Sweden universe.
 * Internal tier keys stay stable (guest/free/premium/founder/administrator).
 */
export const MEMBER_TIER_LABELS: Record<MemberTier, string> = {
  guest: "Archive Visitor",
  free: "Research Member",
  premium: "Field Investigator",
  founder: "Founder",
  administrator: "Archive Keeper",
};

export function memberTierLabel(tier: string): string {
  if (tier in MEMBER_TIER_LABELS) {
    return MEMBER_TIER_LABELS[tier as MemberTier];
  }
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

/** Soft rank for dashboard — not a competitive leaderboard. */
export function researchStanding(tier: MemberTier): string {
  switch (tier) {
    case "administrator":
      return "Archive Keeper";
    case "founder":
      return "Founding Circle";
    case "premium":
      return "Active Field Operative";
    case "free":
      return "Research Circle";
    default:
      return "Visiting";
  }
}
