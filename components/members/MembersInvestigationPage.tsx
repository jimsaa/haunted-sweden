"use client";

import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Fingerprint,
  MapPin,
  Network,
  QrCode,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { getStoredMemberUser } from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";
import { memberTierLabel } from "@/lib/members/tiers";
import badgesCatalog from "@/content/members/badges.json";

const CASE_SECTIONS = [
  {
    id: "timeline",
    title: "Timeline",
    note: "Chronological journal of archive entries, unlocks, and field events.",
    icon: Fingerprint,
    valueKey: null,
  },
  {
    id: "books",
    title: "Books read",
    note: "Linked editions and reading progress across the Haunted Sweden series.",
    icon: BookOpen,
    valueKey: "booksRead" as const,
  },
  {
    id: "investigations",
    title: "Investigations",
    note: "Completed investigation dossiers from the Book Archives.",
    icon: Sparkles,
    valueKey: "investigationsCompleted" as const,
  },
  {
    id: "places",
    title: "Visited locations",
    note: "Places confirmed through map visits and field markers.",
    icon: MapPin,
    valueKey: "placesVisited" as const,
  },
  {
    id: "badges",
    title: "Unlocked badges",
    note: "Collectible marks earned through research and discovery.",
    icon: Award,
    valueKey: "badgesUnlocked" as const,
  },
  {
    id: "qr",
    title: "QR discoveries",
    note: "Hidden markers found in the field — unlock architecture ready for v2.",
    icon: QrCode,
    valueKey: "qrDiscoveries" as const,
  },
  {
    id: "network",
    title: "Research Network",
    note: "Field reports, photos, and moderated contributions.",
    icon: Network,
    valueKey: "communityContributions" as const,
  },
  {
    id: "progress",
    title: "Future progress",
    note: "Long-term research tracks across books, seasons, and expeditions.",
    icon: TrendingUp,
    valueKey: null,
  },
] as const;

export function MembersInvestigationPage() {
  const [user, setUser] = useState<MemberPublicProfile | null>(null);

  useEffect(() => {
    setUser(getStoredMemberUser());
  }, []);

  const badgeNames = new Map(
    badgesCatalog.badges.map((b) => [b.id, b.name] as const)
  );
  const joinDate = user
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="members-page members-page--wide">
      <header className="members-page-header">
        <p className="members-eyebrow">Personal case file</p>
        <h1 className="members-h1">Investigation Profile</h1>
        <p className="members-lead">
          The heart of your membership — a private dossier for{" "}
          {user?.displayName ?? "this investigator"}, prepared for long-term
          field work across books, places, and discoveries.
        </p>
      </header>

      <section className="members-case-header">
        <div className="members-avatar members-avatar--lg" aria-hidden>
          {(user?.displayName || "?").charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="members-case-name">
            {user?.displayName ?? "Investigator"}
          </h2>
          <p className="members-muted">
            @{user?.username ?? "—"} · Opened {joinDate}
          </p>
          <p className="members-case-tier">
            {user ? memberTierLabel(user.tier) : "—"}
          </p>
        </div>
        <dl className="members-case-stats">
          <div>
            <dt>Research</dt>
            <dd>{user?.stats.investigationsCompleted ?? 0}</dd>
          </div>
          <div>
            <dt>Field</dt>
            <dd>{user?.stats.qrDiscoveries ?? 0}</dd>
          </div>
          <div>
            <dt>Marks</dt>
            <dd>{user?.badges.length ?? 0}</dd>
          </div>
        </dl>
      </section>

      <section className="members-panel members-panel--quiet members-section-gap">
        <div className="members-panel-kicker">Research statistics</div>
        <div className="members-stats-row">
          <div>
            <span className="members-stat-value">
              {user?.stats.booksRead ?? 0}
            </span>
            <span className="members-muted">Books</span>
          </div>
          <div>
            <span className="members-stat-value">
              {user?.stats.placesVisited ?? 0}
            </span>
            <span className="members-muted">Locations</span>
          </div>
          <div>
            <span className="members-stat-value">
              {user?.stats.badgesUnlocked ?? 0}
            </span>
            <span className="members-muted">Badges</span>
          </div>
          <div>
            <span className="members-stat-value">
              {user?.stats.communityContributions ?? 0}
            </span>
            <span className="members-muted">Network</span>
          </div>
        </div>
      </section>

      <div className="members-grid members-grid--2">
        {CASE_SECTIONS.map((s) => {
          const Icon = s.icon;
          const value =
            s.valueKey && user
              ? s.valueKey === "placesVisited"
                ? user.placesVisited.length || user.stats.placesVisited
                : user.stats[s.valueKey]
              : null;
          return (
            <article key={s.id} className="members-panel members-case-card">
              <div className="members-case-card-top">
                <span className="members-case-icon" aria-hidden>
                  <Icon className="h-4 w-4" />
                </span>
                {value !== null ? (
                  <span className="members-case-count">{value}</span>
                ) : (
                  <span className="members-status">Reserved</span>
                )}
              </div>
              <h2 className="members-h2">{s.title}</h2>
              <p className="members-muted">{s.note}</p>
              {s.id === "badges" && user && user.badges.length > 0 ? (
                <ul className="members-chip-row">
                  {user.badges.map((b) => (
                    <li key={b.badgeId} className="members-chip">
                      {badgeNames.get(b.badgeId) ?? b.badgeId}
                    </li>
                  ))}
                </ul>
              ) : null}
              {s.id === "timeline" ? (
                <ol className="members-timeline">
                  <li>
                    <span>Account opened</span>
                    <em>{joinDate}</em>
                  </li>
                  <li>
                    <span>Research Network mark granted</span>
                    <em>On join</em>
                  </li>
                  <li className="members-timeline--empty">
                    <span>Awaiting first field discovery</span>
                    <em>—</em>
                  </li>
                </ol>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
