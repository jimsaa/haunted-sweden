"use client";

import { useEffect, useState } from "react";
import { getStoredMemberUser } from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";

const SECTIONS = [
  {
    id: "books",
    title: "Books read",
    note: "Linked editions and reading progress will appear here.",
  },
  {
    id: "investigations",
    title: "Investigations completed",
    note: "Archive investigation completion tracking (v2).",
  },
  {
    id: "badges",
    title: "Badges",
    note: "Personal badge case mirrored from the Badges module.",
  },
  {
    id: "places",
    title: "Visited locations",
    note: "Places confirmed via map visits and QR markers.",
  },
  {
    id: "qr",
    title: "QR discoveries",
    note: "Hidden marker unlocks — architecture ready, UI in v2.",
  },
  {
    id: "community",
    title: "Community contributions",
    note: "Stories, photos, and moderated submissions.",
  },
  {
    id: "timeline",
    title: "Timeline",
    note: "Chronological investigation journal for this member.",
  },
] as const;

export function MembersInvestigationPage() {
  const [user, setUser] = useState<MemberPublicProfile | null>(null);

  useEffect(() => {
    setUser(getStoredMemberUser());
  }, []);

  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Personal archive</p>
        <h1 className="members-h1">My Investigation Profile</h1>
        <p className="members-lead">
          A private dossier for{" "}
          {user?.displayName ?? "this investigator"} — prepared for long-term
          field work across books, places, and discoveries.
        </p>
      </header>

      <div className="members-grid members-grid--2">
        {SECTIONS.map((s) => (
          <article
            key={s.id}
            className="members-panel members-panel--placeholder"
          >
            <h2 className="members-h2">{s.title}</h2>
            <p className="members-muted">{s.note}</p>
            <span className="members-status">Placeholder</span>
          </article>
        ))}
      </div>
    </div>
  );
}
