import type { MetadataRoute } from "next";
import { buildSitemap } from "@/lib/seo/sitemap-entries";

/** https://hauntedsweden.se/sitemap.xml — auto-generated at build time. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap();
}
