"use client";

import Link from "next/link";
import archivesCatalog from "@/content/members/book-archives.json";

const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  coming_soon: "Coming soon",
  planned: "Planned",
};

export function MembersArchivesPage() {
  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Book Archives</p>
        <h1 className="members-h1">Investigation archives</h1>
        <p className="members-lead">
          Each book edition has a dedicated archive slot for photos, maps,
          historical research, downloads, and extra material.
        </p>
      </header>

      <div className="members-grid members-grid--2">
        {archivesCatalog.archives.map((a) => (
          <article key={a.id} className="members-panel">
            <div className="members-panel-head">
              <h2 className="members-h2">{a.title}</h2>
              <span className="members-status">
                {STATUS_LABEL[a.status] ?? a.status}
              </span>
            </div>
            <p className="members-muted">{a.summary}</p>
            <ul className="members-chip-row">
              {a.supports.map((s) => (
                <li key={s} className="members-chip">
                  {s}
                </li>
              ))}
            </ul>
            {a.archiveId && a.status === "available" ? (
              <Link
                href={`/archive/${a.archiveId}`}
                className="members-btn members-btn--ghost"
              >
                Open public archive
              </Link>
            ) : (
              <p className="members-muted members-mt">
                Member-gated archive UI reserved for v2.
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
