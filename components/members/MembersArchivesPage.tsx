"use client";

import Image from "next/image";
import Link from "next/link";
import archivesCatalog from "@/content/members/book-archives.json";

function roman(n: number): string {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = n;
  let out = "";
  for (const [value, numeral] of map) {
    while (remaining >= value) {
      out += numeral;
      remaining -= value;
    }
  }
  return out || String(n);
}

export function MembersArchivesPage() {
  return (
    <div className="members-page members-page--wide">
      <header className="members-page-header">
        <p className="members-eyebrow">Digital library</p>
        <h1 className="members-h1">Book Archives</h1>
        <p className="members-lead">
          Each volume opens into Sofia &amp; David&apos;s investigation
          materials — photographs, maps, historical research, and documents
          that live beyond the printed page.
        </p>
      </header>

      <div className="members-library">
        {archivesCatalog.archives.map((book) => {
          const live = book.status === "available" && book.archiveId;
          const state = book.releaseState ?? "PLANNED";
          return (
            <article
              key={book.id}
              className={`members-book-card members-book-card--${book.coverTone ?? "night"}`}
            >
              <div className="members-book-cover">
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt=""
                    fill
                    className="members-book-cover-img"
                    sizes="(max-width: 900px) 40vw, 180px"
                  />
                ) : (
                  <div className="members-book-cover-fallback">
                    <span className="members-book-roman">
                      {roman(book.bookNumber)}
                    </span>
                    <span className="members-book-edition">
                      {book.edition.toUpperCase()}
                    </span>
                  </div>
                )}
                <span
                  className={`members-book-badge members-book-badge--${state.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {state}
                </span>
              </div>

              <div className="members-book-body">
                <p className="members-book-volume">
                  Volume {roman(book.bookNumber)} · {book.edition.toUpperCase()}
                </p>
                <h2 className="members-book-title">{book.title}</h2>
                <p className="members-muted">{book.summary}</p>
                <ul className="members-chip-row">
                  {book.supports.slice(0, 4).map((s) => (
                    <li key={s} className="members-chip">
                      {s.replace(/([A-Z])/g, " $1").trim()}
                    </li>
                  ))}
                </ul>
                <div className="members-book-actions">
                  {live ? (
                    <Link
                      href={`/archive/${book.archiveId}`}
                      className="members-btn members-btn--primary"
                    >
                      Enter archive
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="members-btn members-btn--ghost"
                      disabled
                    >
                      {state === "COMING SOON"
                        ? "Notify when open"
                        : state === "LOCKED"
                          ? "Sealed"
                          : "Not yet released"}
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
