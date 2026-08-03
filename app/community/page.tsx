import { notFound } from "next/navigation";
import { CommunityLandingPage } from "@/components/community/CommunityLandingPage";
import { getCommunityLandingContent } from "@/lib/community/landing";
import { isCommunityEnabled } from "@/lib/features";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getCommunityDescription } from "@/lib/seo/descriptions";
import { SEO_TITLES } from "@/lib/seo/titles";

export function generateMetadata() {
  if (!isCommunityEnabled()) {
    return { title: "Not Found", robots: { index: false, follow: false } };
  }
  return buildPageMetadata({
    title: SEO_TITLES.community,
    description: getCommunityDescription("sv"),
    path: "/community",
  });
}

export default function CommunityPage() {
  if (!isCommunityEnabled()) {
    notFound();
  }
  const content = getCommunityLandingContent();
  return <CommunityLandingPage content={content} />;
}
