"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function PlaceNotFoundContent() {
  const { t } = useLanguage();
  const nf = t.notFound;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center text-white bg-black">
      <p
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {nf.title}
      </p>
      <p className="mt-3 text-white/60 max-w-sm">{nf.description}</p>
      <Link
        href="/map"
        className="mt-8 inline-flex min-h-[44px] items-center rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold hover:bg-violet-500 transition-colors"
      >
        {nf.backToMap}
      </Link>
    </div>
  );
}
