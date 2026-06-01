import type { HauntedPlace } from "@/lib/types/place";
import { getHomeDescription } from "@/lib/seo/descriptions";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import { absoluteImageUrl, absoluteUrl } from "@/lib/seo/urls";
import { getPlaceMetaDescription, getPlaceOgImage } from "@/lib/seo/descriptions";

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: [
      "Haunted Sweden",
      "Hemsökta platser Sverige",
      "Spökplatser Sverige",
    ],
    url: SITE_URL,
    description: getHomeDescription("sv"),
    inLanguage: ["sv-SE", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/map`,
      },
    },
  };
}

export function buildTouristAttractionJsonLd(place: HauntedPlace) {
  const image = absoluteImageUrl(getPlaceOgImage(place));
  const description = getPlaceMetaDescription(place);

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: place.name,
    description,
    url: absoluteUrl(`/places/${place.slug}`),
    touristType: "Paranormal tourism",
    isAccessibleForFree: true,
  };

  if (place.englishName) {
    json.alternateName = place.englishName;
  }

  if (image) {
    json.image = image;
  }

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: place.city,
    addressRegion: place.region,
    addressCountry: place.country ?? "SE",
  };
  if (place.address?.trim()) {
    address.streetAddress = place.address.trim();
  }
  json.address = address;

  if (place.latitude != null && place.longitude != null) {
    json.geo = {
      "@type": "GeoCoordinates",
      latitude: place.latitude,
      longitude: place.longitude,
    };
  }

  return json;
}
