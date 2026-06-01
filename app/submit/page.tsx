"use client";

import { SubmitPlaceForm } from "@/components/places/SubmitPlaceForm";
import { useLanguage } from "@/lib/language-context";

export default function SubmitPage() {
  const { t } = useLanguage();
  const sf = t.submitForm;

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
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
          <SubmitPlaceForm />
        </div>
      </div>
    </div>
  );
}
