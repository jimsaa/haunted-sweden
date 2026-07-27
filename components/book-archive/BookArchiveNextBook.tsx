"use client";

import { useState } from "react";
import type { BookArchive, BookArchiveNextBook } from "@/lib/types/book-archive";
import { pickBookText } from "@/lib/book-archive/locale";
import { useLanguage } from "@/lib/language-context";

export function BookArchiveNextBook({
  nextBook,
  archiveId,
  bookTitle,
}: {
  nextBook: BookArchiveNextBook;
  archiveId: string;
  bookTitle: string;
}) {
  const { locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  if (nextBook.mode === "published" && nextBook.buyUrl) {
    const headline = pickBookText(
      locale,
      nextBook.headline ?? "Continue the investigation",
      nextBook.headlineSv
    );
    const bookTitleNext = pickBookText(
      locale,
      nextBook.bookTitle,
      nextBook.bookTitleSv
    );
    const buyLabel = pickBookText(
      locale,
      nextBook.buyLabel ?? "Buy Book II",
      nextBook.buyLabelSv
    );

    return (
      <section className="book-archive-next" aria-labelledby="archive-next-heading">
        <h2 id="archive-next-heading" className="book-archive-section-title">
          {headline}
        </h2>
        {bookTitleNext ? (
          <p className="book-archive-next-book">{bookTitleNext}</p>
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
    nextBook.headline ?? "The investigation continues…",
    nextBook.headlineSv
  );
  const body = pickBookText(
    locale,
    nextBook.body ?? "Book II is currently in production.",
    nextBook.bodySv
  );
  const placeholder = pickBookText(
    locale,
    nextBook.emailSignupPlaceholder ?? "Your email address",
    nextBook.emailSignupPlaceholderSv
  );
  const subscribeLabel = pickBookText(
    locale,
    nextBook.subscribeLabel ?? "Subscribe",
    nextBook.subscribeLabelSv
  );

  const subscribe = async () => {
    if (!email.trim()) {
      setMessage(locale === "sv" ? "Ange e-postadress." : "Enter your email.");
      setError(true);
      return;
    }
    setSending(true);
    setMessage(null);
    setError(false);
    try {
      const res = await fetch("/api/archive/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          archiveId,
          bookTitle,
          consent,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errorSv?: string;
      };
      if (!res.ok) {
        throw new Error(
          locale === "sv"
            ? data.errorSv ?? data.error ?? "Failed"
            : data.error ?? "Failed"
        );
      }
      setMessage(
        locale === "sv"
          ? "Tack! Du är nu prenumerant."
          : "Thank you! You are subscribed."
      );
      setEmail("");
    } catch (e) {
      setError(true);
      setMessage(e instanceof Error ? e.message : "Subscribe failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="book-archive-next" aria-labelledby="archive-next-heading">
      <h2 id="archive-next-heading" className="book-archive-section-title">
        {headline}
      </h2>
      {body.split("\n").map((line) => (
        <p key={line.slice(0, 30)} className="book-archive-next-body">
          {line}
        </p>
      ))}

      <form
        className="book-archive-email-form"
        onSubmit={(e) => {
          e.preventDefault();
          subscribe();
        }}
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="book-archive-email-input"
          required
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={sending}
          className="book-archive-email-btn book-archive-email-btn--active"
        >
          {sending
            ? locale === "sv"
              ? "Skickar…"
              : "Sending…"
            : subscribeLabel}
        </button>
      </form>

      <label className="book-archive-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          {locale === "sv"
            ? "Jag godkänner att få e-post om Haunted Sweden."
            : "I agree to receive email updates about Haunted Sweden."}
        </span>
      </label>

      {message ? (
        <p
          role="status"
          className={`book-archive-next-msg ${error ? "book-archive-next-msg--error" : ""}`}
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
