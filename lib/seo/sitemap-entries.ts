import { stat } from "fs/promises";
import path from "path";
import type { MetadataRoute } from "next";
import { getApprovedPlaces } from "@/lib/places";
import { getSpokjaktEntries } from "@/lib/spokjakt-archive";
import { SITE_URL } from "@/lib/seo/constants";
import { isCommunityEnabled } from "@/lib/features";

const DATA_FILES = [
  "data/haunted-places.json",
  "data/spokjakt-archive.json",
] as const;

/** Latest mtime from catalog JSON files — used for lastModified. */
async function getCatalogLastModified(): Promise<Date> {
  let latest = 0;
  for (const rel of DATA_FILES) {
    try {
      const filePath = path.join(process.cwd(), rel);
      const info = await stat(filePath);
      const t = info.mtime.getTime();
      if (t > latest) latest = t;
    } catch {
      /* ignore missing file */
    }
  }
  return latest > 0 ? new Date(latest) : new Date();
}

/**
 * Builds the full sitemap for hauntedsweden.se.
 * Excludes /admin, /api, and other non-public routes by omission.
 */
export async function buildSitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getCatalogLastModified();
  const places = getApprovedPlaces();
  const investigations = getSpokjaktEntries();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/map`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/submit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...(isCommunityEnabled()
      ? [
          {
            url: `${SITE_URL}/community`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    {
      url: `${SITE_URL}/investigations`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const investigationPages: MetadataRoute.Sitemap = investigations.map(
    (entry) => ({
      url: `${SITE_URL}/investigations/${entry.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })
  );

  const placePages: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${SITE_URL}/places/${place.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...investigationPages, ...placePages];
}
