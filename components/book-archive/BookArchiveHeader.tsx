"use client";

import type { BookArchive } from "@/lib/types/book-archive";
import { pickBookParagraphs, pickBookText } from "@/lib/book-archive/locale";
import { useLanguage } from "@/lib/language-context";

export function BookArchiveHeader({ book }: { book: BookArchive }) {
  const { locale } = useLanguage();
  const title = pickBookText(locale, book.title, book.titleSv);
  const subtitle = pickBookText(locale, book.subtitle, book.subtitleSv);
  const thankYou = pickBookText(
    locale,
    book.intro?.thankYou ?? "Thank you for reading.",
    book.intro?.thankYouSv
  );
  const description = pickBookParagraphs(
    locale,
    book.intro?.description?.split("\n\n") ??
      [
        "You have unlocked the investigation archive.",
        "This page contains additional historical research, photographs, sources, maps, and background material that did not fit inside the book.",
      ],
    book.intro?.descriptionSv?.split("\n\n")
  );

  return (
    <header className="book-archive-header">
      <p className="book-archive-eyebrow">
        {locale === "sv" ? "Utredningsarkiv" : "Investigation Archive"}
        {book.publishedYear ? ` · ${book.publishedYear}` : ""}
      </p>
      <h1 className="book-archive-title">{title}</h1>
      {subtitle ? <p className="book-archive-subtitle">{subtitle}</p> : null}
      <div className="book-archive-intro">
        <p className="book-archive-thankyou">{thankYou}</p>
        {description.map((para) => (
          <p key={para.slice(0, 40)} className="book-archive-lead">
            {para}
          </p>
        ))}
      </div>
      <div className="book-archive-header-rule" aria-hidden />
    </header>
  );
}
