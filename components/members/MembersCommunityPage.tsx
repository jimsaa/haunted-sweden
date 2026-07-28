"use client";

const MODULES = [
  {
    title: "Field Reports",
    note: "Documented encounters and observations — moderated before they enter the network.",
  },
  {
    title: "Archive Photographs",
    note: "Member photographs tied to verified places and investigations.",
  },
  {
    title: "Research Threads",
    note: "Threaded discussion for sources, history, and open questions — not a social feed.",
  },
  {
    title: "Suggested Places",
    note: "Location leads submitted for review by the investigation team.",
  },
  {
    title: "Priority Voting",
    note: "Help rank which sites and stories deserve deeper research next.",
  },
] as const;

export function MembersCommunityPage() {
  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Shared investigation</p>
        <h1 className="members-h1">Research Network</h1>
        <p className="members-lead">
          A private channel for investigators — field reports, photographs, and
          research threads. Public interest signup remains at{" "}
          <a href="/community">/community</a>.
        </p>
      </header>

      <div className="members-grid members-grid--2">
        {MODULES.map((m) => (
          <article
            key={m.title}
            className="members-panel members-panel--placeholder"
          >
            <div className="members-panel-kicker">Module</div>
            <h2 className="members-h2">{m.title}</h2>
            <p className="members-muted">{m.note}</p>
            <span className="members-status">Opening later</span>
          </article>
        ))}
      </div>
    </div>
  );
}
