"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useHauntedAmbience } from "@/components/map/HauntedAmbienceContext";
import { useLanguage } from "@/lib/language-context";
import { getTranslations } from "@/lib/i18n";
import { useClientMounted } from "@/lib/use-client-mounted";

const SSR_LABELS = getTranslations("en");

export function AmbienceSoundToggle({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const ctx = useHauntedAmbience();
  const { t } = useLanguage();
  const mounted = useClientMounted();
  const labels = mounted ? t : SSR_LABELS;

  if (!ctx) return null;

  const { isPlaying, toggle } = ctx;
  const label = isPlaying ? labels.ambience.on : labels.ambience.off;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/70 text-white/90 backdrop-blur-md transition-colors hover:border-violet-500/40 hover:bg-violet-950/50 ${
        compact
          ? "px-2 py-1.5 text-[10px] font-semibold sm:px-2.5"
          : "px-2.5 py-1.5 text-xs font-semibold sm:px-3"
      } ${className}`}
      aria-pressed={isPlaying}
      aria-label={labels.ambience.toggleAria}
      title={label}
    >
      {isPlaying ? (
        <Volume2 className="h-3.5 w-3.5 shrink-0 text-violet-300" aria-hidden />
      ) : (
        <VolumeX className="h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden />
      )}
      <span className="max-[380px]:sr-only">{label}</span>
      <span className="min-[381px]:hidden" aria-hidden>
        {isPlaying ? "🔊" : "🔇"}
      </span>
    </button>
  );
}
