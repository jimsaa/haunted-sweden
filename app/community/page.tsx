import { CommunityLandingPage } from "@/components/community/CommunityLandingPage";
import { getCommunityLandingContent } from "@/lib/community/landing";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getCommunityDescription } from "@/lib/seo/descriptions";
import { SEO_TITLES } from "@/lib/seo/titles";

export const metadata = buildPageMetadata({
  title: SEO_TITLES.community,
  description: getCommunityDescription("sv"),
  path: "/community",
});

export default function CommunityPage() {
  const content = getCommunityLandingContent();
  return <CommunityLandingPage content={content} />;
}
