"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { HauntedPlace } from "@/lib/types/place";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import type { Locale } from "@/lib/translations";

export type SwedenViewClusterListLabels = {
  title: string;
  count: (n: number) => string;
  view: string;
  close: string;
  hauntingLevel: string;
};

export function SwedenViewClusterList({
  places,
  locale,
  labels,
  onSelectPlace,
  onClose,
}: {
  places: HauntedPlace[];
  locale: Locale;
  labels: SwedenViewClusterListLabels;
  onSelectPlace: (place: HauntedPlace) => void;
  onClose: () => void;
}) {
  const sorted = [...places].sort((a, b) =>
    a.name.localeCompare(b.name, locale)
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="sweden-view-cluster-sheet"
      role="presentation"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="sweden-view-cluster-sheet-backdrop"
        aria-label={labels.close}
        onClick={onClose}
      />
      <div
        className="sweden-view-cluster-sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sweden-cluster-list-title"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <header className="sweden-view-cluster-sheet-header">
          <div className="min-w-0">
            <h2
              id="sweden-cluster-list-title"
              className="text-base font-semibold text-white truncate"
            >
              {labels.title}
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              {labels.count(sorted.length)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="sweden-view-cluster-sheet-close"
            aria-label={labels.close}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </header>
        <ul className="sweden-view-cluster-sheet-list">
          {sorted.map((place) => (
            <li key={place.id}>
              <div className="sweden-view-cluster-sheet-row">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-white truncate">
                    {locale === "en" && place.englishName
                      ? place.englishName
                      : place.name}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5 truncate">
                    {place.city} · {getPlaceCategoryLabel(place.category, locale)}
                  </p>
                  <p className="text-xs text-violet-300/80 mt-1">
                    {labels.hauntingLevel}:{" "}
                    <span className="text-violet-200">
                      {"★".repeat(place.hauntingLevel)}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="sweden-view-cluster-sheet-view-btn shrink-0"
                  onClick={() => onSelectPlace(place)}
                >
                  {labels.view}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
