"use client";

import { useState } from "react";
import Link from "next/link";
import { PLACE_CATEGORIES } from "@/lib/categories";
import { useLanguage } from "@/lib/language-context";
import { getPlaceCategoryLabel } from "@/lib/place-labels";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30";

export function SubmitPlaceForm() {
  const { locale, t } = useLanguage();
  const sf = t.submitForm;
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <p className="text-emerald-200 font-medium">{sf.success}</p>
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
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">
          {sf.name} <span className="text-violet-400">*</span>
        </label>
        <input id="name" name="name" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="englishName" className="block text-sm font-medium text-white/80 mb-1.5">
          {sf.englishName}
        </label>
        <input id="englishName" name="englishName" className={inputClass} />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-1.5">
          {sf.category} <span className="text-violet-400">*</span>
        </label>
        <p className="text-xs text-white/45 mb-2">{sf.categoryHint}</p>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="" disabled className="bg-black">
            —
          </option>
          {PLACE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-black">
              {getPlaceCategoryLabel(cat, locale)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-1.5">
            {sf.city} <span className="text-violet-400">*</span>
          </label>
          <input id="city" name="city" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-white/80 mb-1.5">
            {sf.region} <span className="text-violet-400">*</span>
          </label>
          <input id="region" name="region" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-1.5">
          {sf.description} <span className="text-violet-400">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          className={`${inputClass} resize-y min-h-[88px]`}
        />
      </div>

      <div>
        <label htmlFor="history" className="block text-sm font-medium text-white/80 mb-1.5">
          {sf.history}
        </label>
        <textarea id="history" name="history" rows={4} className={`${inputClass} resize-y`} />
      </div>

      <div>
        <label htmlFor="legend" className="block text-sm font-medium text-white/80 mb-1.5">
          {sf.legend}
        </label>
        <textarea id="legend" name="legend" rows={4} className={`${inputClass} resize-y`} />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto min-h-[48px] rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
      >
        {sf.submit}
      </button>
    </form>
  );
}
