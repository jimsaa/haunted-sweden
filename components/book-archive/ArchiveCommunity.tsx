"use client";

import { useState } from "react";

export function ArchiveCommunity({
  archiveId,
  investigationId,
  investigationTitle,
}: {
  archiveId: string;
  investigationId: string;
  investigationTitle: string;
}) {
  const [visited, setVisited] = useState<"yes" | "not_yet" | "">("");
  const [story, setStory] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const submit = async () => {
    if (!visited) {
      setMessage("Please select whether you have visited this location.");
      setError(true);
      return;
    }
    setSending(true);
    setMessage(null);
    setError(false);
    try {
      const res = await fetch("/api/archive/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          archiveId,
          investigationId,
          visited,
          story: story.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errorSv?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "Submit failed");
      }
      setMessage(
        "Thank you. Your response has been received and is not public."
      );
      setStory("");
      setEmail("");
    } catch (e) {
      setError(true);
      setMessage(e instanceof Error ? e.message : "Could not submit.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="book-archive-community">
      <h3 className="book-archive-community-title">
        Have you visited {investigationTitle}?
      </h3>

      <fieldset className="book-archive-community-visited">
        <legend className="sr-only">Visit status</legend>
        <label className="book-archive-radio">
          <input
            type="radio"
            name={`visited-${investigationId}`}
            checked={visited === "yes"}
            onChange={() => setVisited("yes")}
          />
          <span>Yes</span>
        </label>
        <label className="book-archive-radio">
          <input
            type="radio"
            name={`visited-${investigationId}`}
            checked={visited === "not_yet"}
            onChange={() => setVisited("not_yet")}
          />
          <span>Not yet</span>
        </label>
      </fieldset>

      {visited === "yes" ? (
        <div className="book-archive-community-story">
          <label className="book-archive-label" htmlFor={`story-${investigationId}`}>
            Have you experienced something here?
          </label>
          <textarea
            id={`story-${investigationId}`}
            rows={4}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Submit your story (not public — reviewed by our team)"
            className="book-archive-textarea"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional)"
            className="book-archive-email-input mt-2"
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={submit}
        disabled={sending || !visited}
        className="book-archive-community-btn"
      >
        {sending ? "Sending…" : "Submit"}
      </button>

      {message ? (
        <p
          role="status"
          className={`book-archive-community-msg ${error ? "book-archive-community-msg--error" : ""}`}
        >
          {message}
        </p>
      ) : null}

      <p className="book-archive-community-note">
        Stories are not public. They are stored for admin review only.
      </p>
    </div>
  );
}
