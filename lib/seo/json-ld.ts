import type { HauntedPlace } from "@/lib/types/place";
import type { PlaceFaqItem } from "@/lib/types/place-faq";
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
  const gallery = (place.images ?? [])
    .map((img) => absoluteImageUrl(img.url))
    .filter(Boolean) as string[];

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "Place"],
    name: place.name,
    description,
    url: absoluteUrl(`/places/${place.slug}`),
    touristType: "Paranormal tourism",
    isAccessibleForFree: place.accessType !== "Paid Accommodation",
  };

  if (place.englishName) {
    json.alternateName = place.englishName;
  }

  if (image) {
    json.image = gallery.length > 0 ? [image, ...gallery.filter((u) => u !== image)] : image;
  } else if (gallery.length > 0) {
    json.image = gallery;
  }

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: place.city,
    addressRegion: place.region,
    addressCountry: place.country === "Sweden" ? "SE" : (place.country ?? "SE"),
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

export function buildPlaceBreadcrumbJsonLd(place: HauntedPlace) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Haunted Sweden",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Spökkartan",
        item: absoluteUrl("/map"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: place.region,
        item: absoluteUrl(`/map?region=${encodeURIComponent(place.region)}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: place.name,
        item: absoluteUrl(`/places/${place.slug}`),
      },
    ],
  };
}

function faqLocalized(
  item: PlaceFaqItem,
  preferSv = true
): { q: string; a: string } {
  if (preferSv) {
    return {
      q: item.questionSv?.trim() || item.question,
      a: item.answerSv?.trim() || item.answer,
    };
  }
  return { q: item.question, a: item.answer };
}

export function buildFaqPageJsonLd(place: HauntedPlace) {
  const faqs = place.faq ?? [];
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => {
      const { q, a } = faqLocalized(item, true);
      return {
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a,
        },
      };
    }),
  };
}
