import { permanentRedirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getSpokjaktDescription } from "@/lib/seo/descriptions";
import { SEO_TITLES } from "@/lib/seo/titles";

export const metadata = buildPageMetadata({
  title: SEO_TITLES.investigations,
  description: getSpokjaktDescription("sv"),
  path: "/investigations",
});

/** SEO-friendly alias for Spökjakt archive (canonical target: /spokjakt). */
export default function InvestigationsPage() {
  permanentRedirect("/spokjakt");
}
