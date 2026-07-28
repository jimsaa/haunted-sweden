"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getStoredMemberUser,
  isMemberSessionActive,
} from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";
import { memberTierLabel, researchStanding } from "@/lib/members/tiers";

const NEXT_STEPS = [
  {
    href: "/members/archives",
    label: "Enter Book Archives",
    note: "Open the digital library",
  },
  {
    href: "/members/investigation",
    label: "Open your Case File",
    note: "Personal investigation dossier",
  },
  {
    href: "/members/badges",
    label: "View badge case",
    note: "Collectible field marks",
  },
  {
    href: "/members/community",
    label: "Research Network",
    note: "Field reports & discussions",
  },
] as const;

const ARCHIVE_UPDATES = [
  {
    title: "Book I — De första vittnesmålen",
    detail: "Investigation archive is live for the Swedish edition.",
    status: "LIVE",
  },
  {
    title: "Book I English edition",
    detail: "Archive slot reserved — content preparing.",
    status: "COMING SOON",
  },
  {
    title: "Books II & III",
    detail: "Future volumes already have archive shelves waiting.",
    status: "PLANNED",
  },
] as const;

export function MembersDashboard() {
  const [user, setUser] = useState<MemberPublicProfile | null>(null);

  useEffect(() => {
    if (isMemberSessionActive()) setUser(getStoredMemberUser());
  }, []);

  const tier = user?.tier ?? "guest";
  const joinDate = user
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
      })
    : "—";

  const metrics = [
    {
      label: "Books",
      value: user?.stats.booksRead ?? user?.booksOwned.length ?? 0,
    },
    {
      label: "Investigations",
      value: user?.stats.investigationsCompleted ?? 0,
    },
    {
      label: "Badges",
      value: user?.stats.badgesUnlocked ?? user?.badges.length ?? 0,
    },
    {
      label: "Field discoveries",
      value: user?.stats.qrDiscoveries ?? 0,
    },
  ] as const;

  return (
    <div className="members-page members-page--wide">
      <section className="members-hero">
        <div className="members-hero-copy">
          <p className="members-eyebrow">Command center</p>
          <h1 className="members-h1 members-h1--hero">
            Welcome back{user ? `, ${user.displayName}` : ""}
          </h1>
          <p className="members-lead">
            You are inside Sofia &amp; David&apos;s private investigation
            archive — a restricted space for research, field work, and the
            books that hold Sweden&apos;s haunted testimonies.
          </p>
          <div className="members-hero-meta">
            <div>
              <span className="members-meta-label">Member since</span>
              <span className="members-meta-value">{joinDate}</span>
            </div>
            <div className="members-hero-rule" aria-hidden />
            <div>
              <span className="members-meta-label">Membership</span>
              <span className="members-meta-value">{memberTierLabel(tier)}</span>
            </div>
            <div className="members-hero-rule" aria-hidden />
            <div>
              <span className="members-meta-label">Research standing</span>
              <span className="members-meta-value">
                {researchStanding(tier)}
              </span>
            </div>
          </div>
        </div>
        <div className="members-hero-seal" aria-hidden>
          <span>HS</span>
          <small>Archive</small>
        </div>
      </section>

      <section className="members-metric-strip" aria-label="Progress">
        {metrics.map((m) => (
          <div key={m.label} className="members-metric">
            <span className="members-metric-value">{m.value}</span>
            <span className="members-metric-label">{m.label}</span>
          </div>
        ))}
      </section>

      <div className="members-grid members-grid--2 members-section-gap">
        <article className="members-panel">
          <div className="members-panel-kicker">What is happening</div>
          <h2 className="members-h2">Latest from the archive</h2>
          <ul className="members-update-list">
            {ARCHIVE_UPDATES.map((u) => (
              <li key={u.title}>
                <div>
                  <strong>{u.title}</strong>
                  <p className="members-muted">{u.detail}</p>
                </div>
                <span className="members-status">{u.status}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="members-panel">
          <div className="members-panel-kicker">What you can do next</div>
          <h2 className="members-h2">Continue the investigation</h2>
          <div className="members-next-steps">
            {NEXT_STEPS.map((s) => (
              <Link key={s.href} href={s.href} className="members-next-step">
                <span className="members-next-step-label">{s.label}</span>
                <span className="members-muted">{s.note}</span>
              </Link>
            ))}
          </div>
        </article>
      </div>

      <section className="members-panel members-panel--quiet">
        <div className="members-panel-kicker">On the horizon</div>
        <h2 className="members-h2">Future book releases</h2>
        <p className="members-muted members-release-line">
          Book II — research in progress · Book III — planned · English
          editions — archive shelves reserved
        </p>
      </section>
    </div>
  );
}
