import type { CategoryFilterId } from "@/lib/categories";
import type { DiscoveryFilterState } from "@/lib/discovery-filters";
import type { SpokjaktFilterState } from "@/lib/spokjakt-filters";

export function countActiveMapFilters(options: {
  category: CategoryFilterId | null;
  discovery: DiscoveryFilterState;
  spokjakt: SpokjaktFilterState;
}): number {
  let n = 0;
  if (options.category) n += 1;
  if (options.discovery.hauntedSwedenVerified) n += 1;
  if (options.discovery.familyFriendly) n += 1;
  if (options.discovery.publicAccess) n += 1;
  if (options.discovery.nightAccess) n += 1;
  if (options.discovery.freeAccess) n += 1;
  if (options.discovery.overnightStay) n += 1;
  if (options.spokjakt.seenInSpokjakt) n += 1;
  if (options.spokjakt.laxtonInvestigated) n += 1;
  if (options.spokjakt.hauntedSwedenVerified) n += 1;
  if (options.spokjakt.premiumInvestigation) n += 1;
  if (options.spokjakt.overnightStay) n += 1;
  return n;
}

export function hasActiveMapFilters(count: number): boolean {
  return count > 0;
}
