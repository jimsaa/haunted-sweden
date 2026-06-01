"use client";

import { useHauntedAmbience } from "@/components/map/HauntedAmbienceContext";
import { useLanguage } from "@/lib/language-context";

export function MapAmbienceToast() {
  const ctx = useHauntedAmbience();
  const { t } = useLanguage();

  if (!ctx?.toastVisible) return null;

  return (
    <div
      className="map-ambience-toast pointer-events-none absolute bottom-3 left-1/2 z-[30] -translate-x-1/2 px-4 sm:bottom-4"
      role="status"
      aria-live="polite"
    >
      <p className="rounded-full border border-violet-500/35 bg-black/85 px-4 py-2 text-xs font-medium text-violet-100 shadow-lg shadow-violet-950/40 backdrop-blur-md">
        {t.ambience.activatedToast}
      </p>
    </div>
  );
}
