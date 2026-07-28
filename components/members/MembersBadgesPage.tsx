"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  KeyRound,
  MapPin,
  QrCode,
  ScrollText,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { getStoredMemberUser } from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";
import badgesCatalog from "@/content/members/badges.json";

const CATEGORY_LABEL: Record<string, string> = {
  book: "Book Badges",
  location: "Location Badges",
  founder: "Founder Marks",
  research: "Research Badges",
  qr: "QR Discovery",
  community: "Network Badges",
};

const ICON_MAP = {
  book: BookOpen,
  star: Star,
  scroll: ScrollText,
  "map-pin": MapPin,
  qr: QrCode,
  users: Users,
  shield: Shield,
  key: KeyRound,
} as const;

export function MembersBadgesPage() {
  const [user, setUser] = useState<MemberPublicProfile | null>(null);

  useEffect(() => {
    setUser(getStoredMemberUser());
  }, []);

  const unlocked = new Set(user?.badges.map((b) => b.badgeId) ?? []);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof badgesCatalog.badges>();
    for (const badge of badgesCatalog.badges) {
      const cat = badge.category ?? "research";
      const list = map.get(cat) ?? [];
      list.push(badge);
      map.set(cat, list);
    }
    return map;
  }, []);

  return (
    <div className="members-page members-page--wide">
      <header className="members-page-header">
        <p className="members-eyebrow">Collectible marks</p>
        <h1 className="members-h1">Badge Case</h1>
        <p className="members-lead">
          Field marks earned through books, locations, research, QR
          discoveries, and the Research Network. Unlock them — they stay with
          your case file.
        </p>
      </header>

      <p className="members-badge-summary">
        <Award className="h-4 w-4" aria-hidden />
        {unlocked.size} of {badgesCatalog.badges.length} unlocked
      </p>

      {[...grouped.entries()].map(([category, badges]) => (
        <section key={category} className="members-badge-group">
          <h2 className="members-h2 members-badge-group-title">
            {CATEGORY_LABEL[category] ?? category}
          </h2>
          <div className="members-badge-grid">
            {badges.map((badge) => {
              const isUnlocked = unlocked.has(badge.id);
              const Icon =
                ICON_MAP[badge.icon as keyof typeof ICON_MAP] ?? Award;
              return (
                <article
                  key={badge.id}
                  className={`members-badge-tile${isUnlocked ? " members-badge-tile--unlocked" : " members-badge-tile--locked"}`}
                >
                  <div
                    className={`members-badge-medallion members-badge-medallion--${badge.rarity}`}
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="members-badge-rarity">{badge.rarity}</p>
                  <h3 className="members-badge-name">{badge.name}</h3>
                  <p className="members-muted">{badge.description}</p>
                  <span className="members-status">
                    {isUnlocked ? "Unlocked" : "Locked"}
                  </span>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
