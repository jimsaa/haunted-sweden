"use client";

import { useState } from "react";
import type { CommunityLandingContent } from "@/lib/types/community-landing";
import { useLanguage } from "@/lib/language-context";

function t(
  locale: "en" | "sv",
  item: { en: string; sv: string }
): string {
  return locale === "sv" ? item.sv : item.en;
}

export function CommunitySignupForm({
  content,
}: {
  content: CommunityLandingContent["signup"];
}) {
  const { locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(true);
      setMessage(
        locale === "sv" ? "Ange e-postadress." : "Enter your email address."
      );
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
      setMessage(t(locale, content.success));
      setEmail("");
    } catch (err) {
      setError(true);
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="community-signup" onSubmit={submit} id="join">
      <div className="community-signup-row">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t(locale, content.emailPlaceholder)}
          className="community-input"
          required
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={sending || !consent}
          className="community-btn community-btn--primary"
        >
          {sending
            ? locale === "sv"
              ? "Skickar…"
              : "Sending…"
            : t(locale, content.button)}
        </button>
      </div>
      <label className="community-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>{t(locale, content.consent)}</span>
      </label>
      {message ? (
        <p
          role="status"
          className={`community-signup-msg ${error ? "community-signup-msg--error" : ""}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
