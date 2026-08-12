"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function BookArchiveWaitlistSignup({ archiveId }: { archiveId: string }) {
  const { locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage(
        locale === "sv" ? "Ange e-postadress." : "Enter your email address."
      );
      setError(true);
      return;
    }
    setSending(true);
    setMessage(null);
    setError(false);
    try {
      const res = await fetch("/api/community/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          consent,
          source: `Book Archive (${archiveId})`,
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
          ? "Tack! Vi meddelar dig när medlemsområdet öppnar."
          : "Thank you! We will notify you when the Members area opens."
      );
      setEmail("");
    } catch (err) {
      setError(true);
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className="book-archive-waitlist"
      aria-labelledby="book-archive-waitlist-heading"
    >
      <h2 id="book-archive-waitlist-heading" className="book-archive-section-title">
        {locale === "sv" ? "Medlemsområdet kommer snart" : "Members area opening soon"}
      </h2>
      <p className="book-archive-waitlist-body">
        {locale === "sv"
          ? "Lämna din e-post så hör vi av oss när Haunted Sweden Community och medlemsområdet öppnar."
          : "Leave your email and we will reach out when the Haunted Sweden Community and Members area opens."}
      </p>
      <form className="book-archive-email-form" onSubmit={submit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={
            locale === "sv" ? "Din e-postadress" : "Your email address"
          }
          className="book-archive-email-input"
          required
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={sending || !consent}
          className="book-archive-email-btn book-archive-email-btn--active"
        >
          {sending
            ? locale === "sv"
              ? "Skickar…"
              : "Sending…"
            : locale === "sv"
              ? "Meddela mig"
              : "Notify me"}
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
