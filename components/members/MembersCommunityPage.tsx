"use client";

const MODULES = [
  {
    title: "Stories",
    note: "Member field stories — moderated before publish.",
  },
  {
    title: "Photos",
    note: "Community photo submissions tied to places.",
  },
  {
    title: "Discussions",
    note: "Threaded research discussions (not a social feed).",
  },
  {
    title: "Suggested places",
    note: "Crowd-sourced location leads for review.",
  },
  {
    title: "Voting",
    note: "Priority voting on research and investigation topics.",
  },
] as const;

export function MembersCommunityPage() {
  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Community</p>
        <h1 className="members-h1">Investigation community</h1>
        <p className="members-lead">
          Placeholder modules only in v1. Public conversion remains at{" "}
          <a href="/community">/community</a>.
        </p>
      </header>

      <div className="members-grid members-grid--2">
        {MODULES.map((m) => (
          <article
            key={m.title}
            className="members-panel members-panel--placeholder"
          >
            <h2 className="members-h2">{m.title}</h2>
            <p className="members-muted">{m.note}</p>
            <span className="members-status">Coming in v2+</span>
          </article>
        ))}
      </div>
    </div>
  );
}
