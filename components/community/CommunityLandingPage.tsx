"use client";

import Link from "next/link";
import type { CommunityLandingContent } from "@/lib/types/community-landing";
import { CommunitySignupForm } from "@/components/community/CommunitySignupForm";
import { useLanguage } from "@/lib/language-context";

function tx(
  locale: "en" | "sv",
  item: { en: string; sv: string }
): string {
  return locale === "sv" ? item.sv : item.en;
}

function statusLabel(
  locale: "en" | "sv",
  status: "published" | "coming_soon" | "planned"
): string {
  if (status === "published") return locale === "sv" ? "Ute nu" : "Available";
  if (status === "coming_soon")
    return locale === "sv" ? "Snart ute" : "Coming soon";
  return locale === "sv" ? "Planerad" : "Planned";
}

export function CommunityLandingPage({
  content,
}: {
  content: CommunityLandingContent;
}) {
  const { locale } = useLanguage();
  const subLines = tx(locale, content.hero.subheadline).split("\n\n");
  const socialLinks = content.social.links.filter(
    (l) => l.enabled && l.url.trim()
  );

  return (
    <div className="community-page">
      <section className="community-hero">
        <div className="community-hero-inner">
          <p className="community-eyebrow">
            {locale === "sv"
              ? "Haunted Sweden · Väntelista"
              : "Haunted Sweden · Waitlist"}
          </p>
          <h1 className="community-hero-title">
            {tx(locale, content.hero.headline)}
          </h1>
          <div className="community-hero-sub">
            {subLines.map((line) => (
              <p key={line.slice(0, 40)}>{line}</p>
            ))}
          </div>
          <div className="community-hero-actions">
            <a href="#join" className="community-btn community-btn--primary">
              {tx(locale, content.hero.primaryCta)}
            </a>
            <a href="#why" className="community-btn community-btn--ghost">
              {tx(locale, content.hero.secondaryCta)}
            </a>
          </div>
        </div>
      </section>

      <section id="why" className="community-section">
        <h2 className="community-section-title">
          {tx(locale, content.whyJoin.title)}
        </h2>
        <ul className="community-check-grid">
          {content.whyJoin.cards.map((card) => (
            <li key={card.id} className="community-check-card">
              <span className="community-check" aria-hidden>
                ✓
              </span>
              <span>{tx(locale, card.title)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="community-section community-section--muted">
        <h2 className="community-section-title">
          {tx(locale, content.philosophy.title)}
        </h2>
        <p className="community-lead">
          {tx(locale, content.philosophy.intro)}
        </p>
        <p className="community-philosophy-label">
          {locale === "sv" ? "Det handlar om:" : "It is about:"}
        </p>
        <ul className="community-philosophy-list">
          {content.philosophy.points.map((p) => (
            <li key={p.en}>{tx(locale, p)}</li>
          ))}
        </ul>
        <p className="community-lead community-lead--closing">
          {tx(locale, content.philosophy.closing)}
        </p>
      </section>

      <section className="community-section">
        <h2 className="community-section-title">
          {tx(locale, content.whatMembersCanDo.title)}
        </h2>
        <div className="community-feature-grid">
          {content.whatMembersCanDo.cards.map((card) => (
            <article key={card.id} className="community-feature-card">
              <h3>{tx(locale, card.title)}</h3>
              {card.description ? (
                <p>{tx(locale, card.description)}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="community-section community-section--muted">
        <h2 className="community-section-title">
          {tx(locale, content.testimonials.title)}
        </h2>
        <div className="community-testimonial-grid">
          {content.testimonials.items.map((item) => (
            <blockquote key={item.id} className="community-testimonial">
              <p>“{tx(locale, item.quote)}”</p>
              <footer>
                <strong>{item.name}</strong>
                {item.location || item.role ? (
                  <span>
                    {[
                      item.role ? tx(locale, item.role) : null,
                      item.location ? tx(locale, item.location) : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                ) : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="community-section">
        <h2 className="community-section-title">
          {tx(locale, content.books.title)}
        </h2>
        <div className="community-books-grid">
          {content.books.items.map((book) => (
            <article key={book.id} className="community-book-card">
              <span className="community-book-num">
                {locale === "sv" ? "Bok" : "Book"} {book.number}
              </span>
              <h3>{tx(locale, book.title)}</h3>
              {book.subtitle ? (
                <p className="community-book-sub">{tx(locale, book.subtitle)}</p>
              ) : null}
              <span
                className={`community-book-status community-book-status--${book.status}`}
              >
                {statusLabel(locale, book.status)}
              </span>
              {book.buyUrl ? (
                <a
                  href={book.buyUrl}
                  className="community-book-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === "sv" ? "Köp boken" : "Buy the book"}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="community-section community-join-section">
        <h2 className="community-section-title">
          {tx(locale, content.signup.title)}
        </h2>
        <p className="community-lead">{tx(locale, content.signup.body)}</p>
        <CommunitySignupForm content={content.signup} />
      </section>

      {socialLinks.length > 0 ? (
        <section className="community-section">
          <h2 className="community-section-title">
            {tx(locale, content.social.title)}
          </h2>
          <ul className="community-social-list">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="community-social-link"
                >
                  {tx(locale, link.label)}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="community-footer">
        <Link href="/map">{locale === "sv" ? "Utforska kartan" : "Explore the map"}</Link>
        <span aria-hidden>·</span>
        <Link href="/submit">{locale === "sv" ? "Tipsa om en plats" : "Submit a place"}</Link>
      </footer>
    </div>
  );
}
