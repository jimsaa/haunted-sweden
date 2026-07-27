"use client";

import type { BookArchive } from "@/lib/types/book-archive";
import { BookArchiveHeader } from "@/components/book-archive/BookArchiveHeader";
import { BookArchiveNextBook } from "@/components/book-archive/BookArchiveNextBook";
import { InvestigationSection } from "@/components/book-archive/InvestigationSection";
import { LanguageToggle } from "@/components/LanguageToggle";

export function BookArchivePage({ book }: { book: BookArchive }) {
  return (
    <div className="book-archive">
      <div className="book-archive-topbar">
        <span
          className="book-archive-brand"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Haunted Sweden
        </span>
        <LanguageToggle />
      </div>

      <main className="book-archive-main">
        <BookArchiveHeader book={book} />

        <div className="book-archive-investigations">
          {book.investigations.map((inv) => (
            <InvestigationSection
              key={inv.id}
              investigation={inv}
              archiveId={book.archiveId}
            />
          ))}
        </div>

        <BookArchiveNextBook
          nextBook={book.nextBook}
          archiveId={book.archiveId}
          bookTitle={book.title}
        />
      </main>

      <footer className="book-archive-footer">
        <p>© Haunted Sweden · {book.publishedYear ?? new Date().getFullYear()}</p>
        <p className="book-archive-footer-note">
          Private investigation archive — for book readers only.
        </p>
      </footer>
    </div>
  );
}
