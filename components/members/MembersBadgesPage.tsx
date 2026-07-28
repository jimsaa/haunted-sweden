"use client";

import { useEffect, useState } from "react";
import { getStoredMemberUser } from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";
import badgesCatalog from "@/content/members/badges.json";

export function MembersBadgesPage() {
  const [user, setUser] = useState<MemberPublicProfile | null>(null);

  useEffect(() => {
    setUser(getStoredMemberUser());
  }, []);

  const unlocked = new Set(user?.badges.map((b) => b.badgeId) ?? []);

  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Badge system</p>
        <h1 className="members-h1">Badges</h1>
        <p className="members-lead">
          Reusable achievement catalog. Unlock via books, QR markers, roles, and
          community participation.
        </p>
      </header>

      <div className="members-grid members-grid--3">
        {badgesCatalog.badges.map((badge) => {
          const isUnlocked = unlocked.has(badge.id);
          return (
            <article
              key={badge.id}
              className={`members-panel members-badge-card${isUnlocked ? " members-badge-card--unlocked" : ""}`}
            >
              <p className="members-badge-rarity">{badge.rarity}</p>
              <h2 className="members-h2">{badge.name}</h2>
              <p className="members-muted">{badge.description}</p>
              <span className="members-status">
                {isUnlocked ? "Unlocked" : "Locked"}
              </span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
