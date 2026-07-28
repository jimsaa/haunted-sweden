/**
 * Haunted Sweden Members Platform — core types (v1)
 */

export type MemberTier =
  | "guest"
  | "free"
  | "premium"
  | "founder"
  | "administrator";

export type MemberRole =
  | "member"
  | "moderator"
  | "editor"
  | "administrator";

export interface MemberBadgeRef {
  badgeId: string;
  unlockedAt: string;
  source?: "manual" | "qr" | "book" | "system";
}

export interface MemberStats {
  booksRead: number;
  investigationsCompleted: number;
  badgesUnlocked: number;
  placesVisited: number;
  qrDiscoveries: number;
  communityContributions: number;
}

export interface MemberProfile {
  id: string;
  username: string;
  email: string;
  /** scrypt hash — never return to client */
  passwordHash: string;
  displayName: string;
  biography: string;
  country: string;
  avatarUrl: string | null;
  tier: MemberTier;
  role: MemberRole;
  badges: MemberBadgeRef[];
  booksOwned: string[];
  placesVisited: string[];
  stats: MemberStats;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
}

export interface MembersFile {
  users: MemberProfile[];
  updatedAt?: string;
}

/** Safe client payload */
export interface MemberPublicProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  biography: string;
  country: string;
  avatarUrl: string | null;
  tier: MemberTier;
  role: MemberRole;
  badges: MemberBadgeRef[];
  booksOwned: string[];
  placesVisited: string[];
  stats: MemberStats;
  createdAt: string;
}

export function toPublicMember(user: MemberProfile): MemberPublicProfile {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    biography: user.biography,
    country: user.country,
    avatarUrl: user.avatarUrl,
    tier: user.tier,
    role: user.role,
    badges: user.badges,
    booksOwned: user.booksOwned,
    placesVisited: user.placesVisited,
    stats: user.stats,
    createdAt: user.createdAt,
  };
}

export function emptyMemberStats(): MemberStats {
  return {
    booksRead: 0,
    investigationsCompleted: 0,
    badgesUnlocked: 0,
    placesVisited: 0,
    qrDiscoveries: 0,
    communityContributions: 0,
  };
}
