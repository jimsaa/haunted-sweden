"use client";

const PRODUCTS = [
  {
    title: "Books",
    note: "Physical and digital editions of the Haunted Sweden series.",
  },
  {
    title: "Merchandise",
    note: "Quiet, field-ready brand pieces for the investigation.",
  },
  {
    title: "3D Printed Collectibles",
    note: "Artifacts and markers inspired by archive locations.",
  },
  {
    title: "Field Journals",
    note: "Notebooks and dossiers for documenting visits and research.",
  },
  {
    title: "Digital Downloads",
    note: "Maps, bonus dossiers, and member-only material.",
  },
] as const;

export function MembersShopPage() {
  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Expedition goods</p>
        <h1 className="members-h1">Archive Store</h1>
        <p className="members-lead">
          Books, field journals, collectibles, and digital material that support
          the investigation. Membership billing stays separate — no hardcoded
          prices here.
        </p>
      </header>

      <div className="members-grid members-grid--2">
        {PRODUCTS.map((p) => (
          <article
            key={p.title}
            className="members-panel members-panel--placeholder"
          >
            <div className="members-panel-kicker">Catalog</div>
            <h2 className="members-h2">{p.title}</h2>
            <p className="members-muted">{p.note}</p>
            <span className="members-status">Coming later</span>
          </article>
        ))}
      </div>
    </div>
  );
}
