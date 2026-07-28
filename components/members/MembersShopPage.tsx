"use client";

const PRODUCTS = [
  { title: "Books", note: "Physical and digital editions." },
  { title: "Merchandise", note: "Field kit and brand items." },
  { title: "3D printed objects", note: "Collectible investigation artifacts." },
  { title: "Digital downloads", note: "Maps, dossiers, and bonus material." },
] as const;

export function MembersShopPage() {
  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Shop</p>
        <h1 className="members-h1">Haunted Sweden shop</h1>
        <p className="members-lead">
          Commerce placeholder. Stripe membership checkout architecture is
          prepared separately — no hardcoded pricing.
        </p>
      </header>

      <div className="members-grid members-grid--2">
        {PRODUCTS.map((p) => (
          <article
            key={p.title}
            className="members-panel members-panel--placeholder"
          >
            <h2 className="members-h2">{p.title}</h2>
            <p className="members-muted">{p.note}</p>
            <span className="members-status">Placeholder</span>
          </article>
        ))}
      </div>
    </div>
  );
}
