/**
 * QR discovery system — architecture only (v1).
 * Implementation deferred to Members v2.
 */

export type QrMarkerKind = "location" | "badge" | "archive" | "event";

export interface QrMarkerBlueprint {
  id: string;
  code: string;
  kind: QrMarkerKind;
  badgeId?: string;
  placeSlug?: string;
  archiveId?: string;
  title: string;
  enabled: boolean;
}

export interface QrDiscoveryBlueprint {
  id: string;
  userId: string;
  markerId: string;
  discoveredAt: string;
}

/**
 * Planned flow:
 * 1. Logged-in member scans QR → /members/qr/[code]
 * 2. Server validates marker, checks unique (userId + markerId)
 * 3. Insert discovery row; unlock badge if configured
 * 4. Duplicate scans return alreadyUnlocked without re-awarding
 */
export const QR_SYSTEM_NOTES = {
  uniqueConstraint: ["userId", "markerId"],
  preventDuplicates: true,
  requiresAuth: true,
  status: "architecture_only",
} as const;
