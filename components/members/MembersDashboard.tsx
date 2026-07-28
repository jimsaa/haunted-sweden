"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getStoredMemberUser,
  isMemberSessionActive,
} from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";

const QUICK_LINKS = [
  { href: "/members/archives", label: "Book Archives" },
  { href: "/members/investigation", label: "Investigation Profile" },
  { href: "/members/badges", label: "Badges" },
  { href: "/members/community", label: "Community" },
  { href: "/members/shop", label: "Shop" },
  { href: "/members/settings", label: "Account Settings" },
] as const;

const ARCHIVE_UPDATES = [
  {
    title: "Book I — De första vittnesmålen",
    detail: "Investigation archive available for Swedish edition.",
    status: "Live",
  },
  {
    title: "Book1E — English edition",
    detail: "Archive slot reserved. Content coming soon.",
    status: "Coming soon",
  },
  {
    title: "Book II / Book III",
    detail: "Future archive slots prepared in the platform schema.",
    status: "Planned",
  },
] as const;

const FUTURE_RELEASES = [
  { title: "Haunted Sweden — Book II", note: "Research in progress" },
  { title: "Haunted Sweden — Book III", note: "Planned" },
] as const;

export function MembersDashboard() {
  const [user, setUser] = useState<MemberPublicProfile | null>(null);

  useEffect(() => {
    if (isMemberSessionActive()) setUser(getStoredMemberUser());
  }, []);

  const tier = user?.tier ?? "guest";

  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Dashboard</p>
        <h1 className="members-h1">
          Welcome{user ? `, ${user.displayName}` : ""}
        </h1>
        <p className="members-lead">
          You have entered the Haunted Sweden investigation platform. This is a
          private archive — not a social feed.
        </p>
      </header>

      <section className="members-grid members-grid--2">
        <article className="members-panel">
          <h2 className="members-h2">Membership level</h2>
          <p className="members-stat-value">{tier}</p>
          <p className="members-muted">
            Levels: Guest · Free · Premium · Founder · Administrator
          </p>
        </article>
        <article className="members-panel">
          <h2 className="members-h2">Recent activity</h2>
          <ul className="members-list">
            <li>Account created — platform access granted</li>
            <li>Community Member badge unlocked</li>
            <li>No field discoveries yet</li>
          </ul>
        </article>
      </section>

      <section className="members-panel">
        <h2 className="members-h2">Latest archive updates</h2>
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
      </section>

      <section className="members-panel">
        <h2 className="members-h2">Quick navigation</h2>
        <div className="members-quick-nav">
          {QUICK_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="members-quick-link">
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="members-panel">
        <h2 className="members-h2">Future book releases</h2>
        <ul className="members-list">
          {FUTURE_RELEASES.map((r) => (
            <li key={r.title}>
              <strong>{r.title}</strong> — {r.note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
