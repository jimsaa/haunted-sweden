import { notFound, permanentRedirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { SITE_NAME } from "@/lib/seo/constants";
import {
  getSpokjaktEntries,
  getSpokjaktEntryBySlug,
} from "@/lib/spokjakt-archive";

export function generateStaticParams() {
  return getSpokjaktEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getSpokjaktEntryBySlug(slug);
  if (!entry) {
    return { title: `Spökjakt | ${SITE_NAME}` };
  }

  return buildPageMetadata({
    title: `${entry.locationName} | Spökjakt | ${SITE_NAME}`,
    description: entry.shortDescription,
    path: `/investigations/${entry.slug}`,
  });
}

/** SEO URL for each Spökjakt investigation — canonical content on /spokjakt archive. */
export default async function InvestigationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getSpokjaktEntryBySlug(slug);
  if (!entry) notFound();

  permanentRedirect(`/spokjakt#${entry.slug}`);
}
