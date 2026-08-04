import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME } from "@/lib/seo/constants";
import { absoluteImageUrl, buildLanguageAlternates } from "@/lib/seo/urls";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const alternates = buildLanguageAlternates(path);
  const ogImage = absoluteImageUrl(image) ?? absoluteImageUrl(DEFAULT_OG_IMAGE_PATH);
  const isPlace = path.startsWith("/places/");

  return {
    title,
    description,
    alternates,
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    openGraph: {
      type: isPlace ? "article" : "website",
      locale: "sv_SE",
      alternateLocale: ["en"],
      url: alternates.canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
