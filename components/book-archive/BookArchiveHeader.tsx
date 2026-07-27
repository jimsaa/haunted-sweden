"use client";

import type { BookArchive } from "@/lib/types/book-archive";
import { pickBookParagraphs, pickBookText } from "@/lib/book-archive/locale";
import { useLanguage } from "@/lib/language-context";

export function BookArchiveHeader({ book }: { book: BookArchive }) {
  const { locale } = useLanguage();
  const title = pickBookText(locale, book.title, book.titleSv);
  const investigators = pickBookText(
    locale,
    book.investigators ?? "Sofia & David",
    book.investigatorsSv
  );
  const archiveLabel = pickBookText(
    locale,
    book.intro?.archiveLabel ?? "Sofia & David's Investigation Archive",
    book.intro?.archiveLabelSv
  );
  const thankYou = pickBookText(
    locale,
    book.intro?.thankYou ?? "Thank you for reading.",
    book.intro?.thankYouSv
  );
  const description = pickBookParagraphs(
    locale,
    book.intro?.description?.split("\n\n"),
    book.intro?.descriptionSv?.split("\n\n")
  );
  const principles = pickBookParagraphs(
    locale,
    book.intro?.principles,
    book.intro?.principlesSv
  );

  return (
    <header className="book-archive-header">
      <p className="book-archive-brand-line">HAUNTED SWEDEN</p>
      <h1 className="book-archive-title">{title}</h1>
      <div className="book-archive-divider" aria-hidden />
      <p className="book-archive-archive-label">{archiveLabel.toUpperCase()}</p>
      <p className="book-archive-investigators">{investigators}</p>

      <div className="book-archive-intro">
        <p className="book-archive-thankyou">{thankYou}</p>
        {description.map((para) => (
          <p key={para.slice(0, 40)} className="book-archive-lead">
            {para}
          </p>
        ))}
        {principles.length > 0 ? (
          <div className="book-archive-principles">
            {principles.map((line) => (
              <p key={line.slice(0, 40)} className="book-archive-principle-line">
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      <div className="book-archive-header-rule" aria-hidden />
    </header>
  );
}
