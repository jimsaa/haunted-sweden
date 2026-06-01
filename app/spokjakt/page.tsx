import { SpokjaktArchiveClient } from "@/components/spokjakt/SpokjaktArchiveClient";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getSpokjaktDescription } from "@/lib/seo/descriptions";
import { SEO_TITLES } from "@/lib/seo/titles";

export const metadata = buildPageMetadata({
  title: SEO_TITLES.spokjakt,
  description: getSpokjaktDescription("sv"),
  path: "/spokjakt",
});

export default function SpokjaktArchivePage() {
  return <SpokjaktArchiveClient />;
}
