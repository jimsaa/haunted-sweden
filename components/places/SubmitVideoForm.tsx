"use client";

import { useState } from "react";
import Link from "next/link";
import { PlaceOptionSelect } from "@/components/places/PlaceOptionSelect";
import { useLanguage } from "@/lib/language-context";
import type { PlaceOption } from "@/lib/submit-place-options";
import { getSubmitApiError } from "@/lib/submit-api-error";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30";

export function SubmitVideoForm({ places }: { places: PlaceOption[] }) {
  const { locale, t } = useLanguage();
  const vf = t.submitVideoForm;
  const sf = t.submitForm;
  const [placeId, setPlaceId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <p className="text-emerald-200 font-medium">{vf.success}</p>
        <Link
          href="/map"
          className="mt-6 inline-flex text-sm text-violet-300 hover:text-violet-200"
        >
          ← {t.exploreMap}
        </Link>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSending(true);
        const fd = new FormData(e.currentTarget);
        const selectedPlaceId = fd.get("placeId") as string;
        try {
          const res = await fetch("/api/submit-video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: fd.get("url"),
              caption: fd.get("caption"),
              placeId: selectedPlaceId || null,
              placeName: selectedPlaceId ? undefined : fd.get("placeName"),
              submitterName: fd.get("submitterName"),
              submitterEmail: fd.get("submitterEmail"),
            }),
          });
          if (!res.ok) {
            const data = (await res.json().catch(() => ({}))) as {
              error?: string;
              errorSv?: string;
            };
            throw new Error(getSubmitApiError(data, locale, sf.error));
          }
          setSubmitted(true);
        } catch (err) {
          setError(err instanceof Error ? err.message : sf.error);
        } finally {
          setSending(false);
        }
      }}
    >
      <p className="text-sm text-white/55 leading-relaxed">{vf.intro}</p>

      {error ? (
        <p className="text-sm text-red-300/90 rounded-lg border border-red-500/30 bg-red-950/20 px-3 py-2">
          {error}
        </p>
      ) : null}

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-white/80 mb-1.5">
          {vf.videoUrl} <span className="text-violet-400">*</span>
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          placeholder="https://"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-white/80 mb-1.5">
          {vf.caption}
        </label>
        <input id="caption" name="caption" className={inputClass} />
      </div>

      <PlaceOptionSelect
        places={places}
        value={placeId}
        onChange={setPlaceId}
        label={vf.location}
        unknownLabel={vf.locationUnknown}
      />

      {!placeId ? (
        <div>
          <label htmlFor="placeName" className="block text-sm font-medium text-white/80 mb-1.5">
            {vf.locationName}
          </label>
          <input id="placeName" name="placeName" className={inputClass} />
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="submitterName" className="block text-sm font-medium text-white/80 mb-1.5">
            {sf.submitterName}
          </label>
          <input id="submitterName" name="submitterName" className={inputClass} />
        </div>
        <div>
          <label htmlFor="submitterEmail" className="block text-sm font-medium text-white/80 mb-1.5">
            {sf.submitterEmail}
          </label>
          <input
            id="submitterEmail"
            name="submitterEmail"
            type="email"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto min-h-[48px] rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors disabled:opacity-60"
      >
        {sending ? sf.sending : vf.submit}
      </button>
    </form>
  );
}
