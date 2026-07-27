"use client";

import type { BookArchiveNextBook } from "@/lib/types/book-archive";
import { pickBookText } from "@/lib/book-archive/locale";
import { useLanguage } from "@/lib/language-context";

export function BookArchiveNextBook({ nextBook }: { nextBook: BookArchiveNextBook }) {
  const { locale } = useLanguage();

  if (nextBook.mode === "published" && nextBook.buyUrl) {
    const headline = pickBookText(
      locale,
      nextBook.headline ?? "Continue the journey.",
      nextBook.headlineSv
    );
    const bookTitle = pickBookText(
      locale,
      nextBook.bookTitle,
      nextBook.bookTitleSv
    );
    const buyLabel = pickBookText(
      locale,
      nextBook.buyLabel ?? "Buy Book 2",
      nextBook.buyLabelSv
    );

    return (
      <section className="book-archive-next" aria-labelledby="archive-next-heading">
        <h2 id="archive-next-heading" className="book-archive-section-title">
          {headline}
        </h2>
        {bookTitle ? (
          <p className="book-archive-next-book">{bookTitle}</p>
        ) : null}
        <a
          href={nextBook.buyUrl}
          className="book-archive-buy-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {buyLabel}
        </a>
      </section>
    );
  }

  const headline = pickBookText(
    locale,
    nextBook.headline ?? "The next investigation is currently underway…",
    nextBook.headlineSv
  );
  const body = pickBookText(
    locale,
    nextBook.body ?? "Book 2 is in production.",
    nextBook.bodySv
  );
  const placeholder = pickBookText(
    locale,
    nextBook.emailSignupPlaceholder ?? "Your email address",
    nextBook.emailSignupPlaceholderSv
  );

  return (
    <section className="book-archive-next" aria-labelledby="archive-next-heading">
      <h2 id="archive-next-heading" className="book-archive-section-title">
        {headline}
      </h2>
      <p className="book-archive-next-body">{body}</p>
      <form
        className="book-archive-email-form"
        onSubmit={(e) => e.preventDefault()}
        aria-label={
          locale === "sv" ? "E-postanmälan (kommer snart)" : "Email signup (coming soon)"
        }
      >
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          className="book-archive-email-input"
          disabled
          aria-disabled="true"
          title={
            locale === "sv"
              ? "E-postanmälan aktiveras snart"
              : "Email signup will be enabled soon"
          }
        />
        <button type="button" className="book-archive-email-btn" disabled>
          {locale === "sv" ? "Kommer snart" : "Coming soon"}
        </button>
      </form>
    </section>
  );
}
