"use client";

import { useLanguage } from "@/lib/language-context";

export function MapLoadingFallback() {
  const { t } = useLanguage();
  return (
    <div className="flex h-[min(70vh,520px)] min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
      <p className="text-white/50 animate-pulse">{t.common.loadingMap}</p>
    </div>
  );
}
