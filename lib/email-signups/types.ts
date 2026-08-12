export type StoredCommunityMember = {
  id: string;
  email: string;
  created_at: string;
  source: string;
  status: "active" | "unsubscribed";
  verified: boolean;
  consent: boolean;
  interests: string[];
  membership_tier: "free" | "premium" | "founder";
};

export type StoredNewsletterSubscriber = {
  id: string;
  email: string;
  created_at: string;
  book_title: string | null;
  archive_id: string | null;
  source: string;
  verified: boolean;
  status: "active" | "unsubscribed";
  consent: boolean;
};

export type StoredArchiveCommunityResponse = {
  id: string;
  created_at: string;
  archive_id: string;
  investigation_id: string;
  visited: "yes" | "not_yet" | null;
  story: string | null;
  email: string | null;
  status: "pending" | "approved" | "rejected" | "archived";
};

export type EmailSignupsStore = {
  version: 1;
  communityMembers: StoredCommunityMember[];
  newsletterSubscribers: StoredNewsletterSubscriber[];
  archiveCommunityResponses: StoredArchiveCommunityResponse[];
};

export function emptyEmailSignupsStore(): EmailSignupsStore {
  return {
    version: 1,
    communityMembers: [],
    newsletterSubscribers: [],
    archiveCommunityResponses: [],
  };
}
