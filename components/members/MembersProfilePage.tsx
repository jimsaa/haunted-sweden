"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  getMemberAuthHeaders,
  getStoredMemberUser,
  setStoredMemberUser,
} from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";
import badgesCatalog from "@/content/members/badges.json";
import { memberTierLabel } from "@/lib/members/tiers";

export function MembersProfilePage() {
  const [user, setUser] = useState<MemberPublicProfile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [biography, setBiography] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = getStoredMemberUser();
    if (stored) {
      setUser(stored);
      setDisplayName(stored.displayName);
      setBiography(stored.biography);
      setCountry(stored.country);
    }
  }, []);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/members/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getMemberAuthHeaders(),
        },
        body: JSON.stringify({ displayName, biography, country }),
      });
      const data = (await res.json()) as {
        error?: string;
        user?: MemberPublicProfile;
      };
      if (!res.ok || !data.user) {
        setMessage(data.error || "Could not save.");
        return;
      }
      setStoredMemberUser(data.user);
      setUser(data.user);
      setMessage("Profile updated.");
    } catch {
      setMessage("Network error.");
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return <p className="members-muted">Loading profile…</p>;
  }

  const badgeMap = new Map(
    badgesCatalog.badges.map((b) => [b.id, b] as const)
  );
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Member identity</p>
        <h1 className="members-h1">{user.displayName}</h1>
        <p className="members-lead">
          @{user.username} · {memberTierLabel(user.tier)}
        </p>
      </header>

      <div className="members-grid members-grid--2">
        <article className="members-panel members-profile-card">
          <div className="members-avatar" aria-hidden>
            {(user.displayName || "?").charAt(0).toUpperCase()}
          </div>
          <dl className="members-dl">
            <div>
              <dt>Membership</dt>
              <dd>{memberTierLabel(user.tier)}</dd>
            </div>
            <div>
              <dt>Country</dt>
              <dd>{user.country || "—"}</dd>
            </div>
            <div>
              <dt>Join date</dt>
              <dd>{joinDate}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
          <p className="members-bio">
            {user.biography || "No biography yet."}
          </p>
        </article>

        <article className="members-panel">
          <h2 className="members-h2">Edit profile</h2>
          <form onSubmit={onSave} className="members-auth-form">
            <label className="members-label">
              Display name
              <input
                className="members-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
            <label className="members-label">
              Country
              <input
                className="members-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            <label className="members-label">
              Biography
              <textarea
                className="members-textarea"
                rows={4}
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
            </label>
            {message ? <p className="members-muted">{message}</p> : null}
            <button
              type="submit"
              className="members-btn members-btn--primary"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save profile"}
            </button>
          </form>
        </article>
      </div>

      <section className="members-grid members-grid--3">
        <article className="members-panel">
          <h2 className="members-h2">Books</h2>
          <p className="members-stat-value">{user.booksOwned.length}</p>
          <ul className="members-list">
            {user.booksOwned.length
              ? user.booksOwned.map((b) => <li key={b}>{b}</li>)
              : [<li key="none">No books linked yet</li>]}
          </ul>
        </article>
        <article className="members-panel">
          <h2 className="members-h2">Badges</h2>
          <p className="members-stat-value">{user.badges.length}</p>
          <ul className="members-list">
            {user.badges.map((b) => (
              <li key={b.badgeId}>
                {badgeMap.get(b.badgeId)?.name ?? b.badgeId}
              </li>
            ))}
          </ul>
        </article>
        <article className="members-panel">
          <h2 className="members-h2">Visited places</h2>
          <p className="members-stat-value">{user.placesVisited.length}</p>
          <p className="members-muted">Field visits unlock here in v2.</p>
        </article>
      </section>

      <section className="members-panel">
        <h2 className="members-h2">Statistics</h2>
        <div className="members-stats-row">
          <div>
            <span className="members-stat-value">{user.stats.booksRead}</span>
            <span className="members-muted">Books read</span>
          </div>
          <div>
            <span className="members-stat-value">
              {user.stats.investigationsCompleted}
            </span>
            <span className="members-muted">Investigations</span>
          </div>
          <div>
            <span className="members-stat-value">
              {user.stats.badgesUnlocked}
            </span>
            <span className="members-muted">Badges</span>
          </div>
          <div>
            <span className="members-stat-value">
              {user.stats.qrDiscoveries}
            </span>
            <span className="members-muted">QR discoveries</span>
          </div>
        </div>
      </section>
    </div>
  );
}
