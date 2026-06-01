"use client";

import { useState } from "react";
import { SubmitMediaForm } from "@/components/places/SubmitMediaForm";
import { SubmitPlaceForm } from "@/components/places/SubmitPlaceForm";
import { SubmitVideoForm } from "@/components/places/SubmitVideoForm";
import { useLanguage } from "@/lib/language-context";
import type { PlaceOption } from "@/lib/submit-place-options";

type Tab = "place" | "image" | "video";

export function SubmitPageClient({ places }: { places: PlaceOption[] }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("place");
  const sp = t.submitPage;
  const sf = t.submitForm;

  const tabs: { id: Tab; label: string }[] = [
    { id: "place", label: sp.tabPlace },
    { id: "image", label: sp.tabImage },
    { id: "video", label: sp.tabVideo },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-xl">
        <header>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {sf.title}
          </h1>
          <p className="mt-3 text-white/60 text-sm sm:text-base leading-relaxed">
            {sf.intro}
          </p>
        </header>

        <div
          className="mt-6 flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1"
          role="tablist"
        >
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex-1 min-h-[44px] rounded-lg text-sm font-medium transition-colors ${
                tab === id
                  ? "bg-violet-600 text-white"
                  : "text-white/55 hover:text-white/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
          {tab === "place" ? <SubmitPlaceForm /> : null}
          {tab === "image" ? <SubmitMediaForm places={places} /> : null}
          {tab === "video" ? <SubmitVideoForm places={places} /> : null}
        </div>
      </div>
    </div>
  );
}
