"use client";

import type { PlaceOption } from "@/lib/submit-place-options";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30";

export function PlaceOptionSelect({
  places,
  value,
  onChange,
  label,
  unknownLabel,
  hint,
}: {
  places: PlaceOption[];
  value: string;
  onChange: (placeId: string) => void;
  label: string;
  unknownLabel: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor="placeId" className="block text-sm font-medium text-white/80 mb-1.5">
        {label}
      </label>
      {hint ? <p className="text-xs text-white/45 mb-2">{hint}</p> : null}
      <select
        id="placeId"
        name="placeId"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        <option value="" className="bg-black">
          {unknownLabel}
        </option>
        {places.map((p) => (
          <option key={p.id} value={p.id} className="bg-black">
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
