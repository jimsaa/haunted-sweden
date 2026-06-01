import { HomePage } from "@/components/HomePage";
import { getHomepageStats } from "@/lib/homepage-stats";
import { collectHomepageMediaItems } from "@/lib/place-media";
import { getApprovedPlaces, getFeaturedPlaces } from "@/lib/places";

/** Landing page — primary journey leads to /map (the main product). */
export default function Page() {
  const featured = getFeaturedPlaces(6);
  const stats = getHomepageStats();
  const mediaItems = collectHomepageMediaItems(getApprovedPlaces(), 8);

  return (
    <HomePage featured={featured} stats={stats} mediaItems={mediaItems} />
  );
}
