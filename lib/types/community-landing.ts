/**
 * Community landing page — data-driven content for /community
 * Supports future premium memberships without redesign.
 */

export type CommunityMembershipTier = "free" | "premium" | "founder";

/** Reserved for future payments — not enforced yet. */
export interface CommunityMembershipConfig {
  enabled: boolean;
  tiers: CommunityMembershipTier[];
  featuresPlanned: string[];
}

export interface CommunityTextItem {
  en: string;
  sv: string;
}

export interface CommunityCard {
  id: string;
  title: CommunityTextItem;
  description?: CommunityTextItem;
}

export interface CommunityTestimonial {
  id: string;
  quote: CommunityTextItem;
  name: string;
  location?: CommunityTextItem;
  role?: CommunityTextItem;
}

export type CommunityBookStatus = "published" | "coming_soon" | "planned";

export interface CommunityBook {
  id: string;
  number: number;
  title: CommunityTextItem;
  status: CommunityBookStatus;
  subtitle?: CommunityTextItem;
  coverImage?: string;
  buyUrl?: string;
  archiveId?: string;
}

export type CommunitySocialPlatform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "podcast"
  | "discord";

export interface CommunitySocialLink {
  platform: CommunitySocialPlatform;
  label: CommunityTextItem;
  url: string;
  enabled: boolean;
}

export interface CommunityLandingContent {
  hero: {
    headline: CommunityTextItem;
    subheadline: CommunityTextItem;
    primaryCta: CommunityTextItem;
    secondaryCta: CommunityTextItem;
  };
  whyJoin: {
    title: CommunityTextItem;
    cards: CommunityCard[];
  };
  philosophy: {
    title: CommunityTextItem;
    intro: CommunityTextItem;
    points: CommunityTextItem[];
    closing: CommunityTextItem;
  };
  whatMembersCanDo: {
    title: CommunityTextItem;
    cards: CommunityCard[];
  };
  testimonials: {
    title: CommunityTextItem;
    items: CommunityTestimonial[];
  };
  books: {
    title: CommunityTextItem;
    items: CommunityBook[];
  };
  signup: {
    title: CommunityTextItem;
    body: CommunityTextItem;
    emailPlaceholder: CommunityTextItem;
    button: CommunityTextItem;
    consent: CommunityTextItem;
    success: CommunityTextItem;
  };
  social: {
    title: CommunityTextItem;
    links: CommunitySocialLink[];
  };
  membership: CommunityMembershipConfig;
}
