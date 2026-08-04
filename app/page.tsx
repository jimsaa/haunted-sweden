import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoDiscoverability } from "@/components/seo/SeoDiscoverability";
import { getHomepageStats } from "@/lib/homepage-stats";
import { collectHomepageMediaItems } from "@/lib/place-media";
import {
  getApprovedPlaces,
  getFeaturedPlaces,
  getLatestPlaces,
  getPopularPlaces,
  getVerifiedPlaces,
} from "@/lib/places";
import { buildWebSiteJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getHomeDescription } from "@/lib/seo/descriptions";
import { SEO_TITLES } from "@/lib/seo/titles";

export const metadata = buildPageMetadata({
  title: SEO_TITLES.home,
  description: getHomeDescription("sv"),
  path: "/",
});

/** Landing page — primary journey leads to /map (the main product). */
export default function Page() {
  const featured = getFeaturedPlaces(6);
  const verified = getVerifiedPlaces(6);
  const latest = getLatestPlaces(6);
  const popular = getPopularPlaces(6);
  const stats = getHomepageStats();
  const mediaItems = collectHomepageMediaItems(getApprovedPlaces(), 8);

  return (
    <>
      <JsonLd data={buildWebSiteJsonLd()} />
      <SeoDiscoverability />
      <HomePage
        featured={featured}
        verified={verified}
        latest={latest}
        popular={popular}
        stats={stats}
        mediaItems={mediaItems}
      />
    </>
  );
}
