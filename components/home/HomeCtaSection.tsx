"use client";

import Link from "next/link";
import { Ghost } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function HomeCtaSection() {
  const { t } = useLanguage();
  const cta = t.homeCta;

  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="home-cta mx-auto max-w-3xl rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 via-[#0c0c14] to-black px-6 py-10 text-center sm:px-10 sm:py-12">
        <Ghost className="mx-auto h-10 w-10 text-violet-400/80" aria-hidden />
        <h2
          className="mt-4 text-xl font-bold text-white sm:text-2xl text-balance"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {cta.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
          {cta.subtitle}
        </p>
        <Link
          href="/submit"
          className="mt-8 inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center rounded-xl bg-violet-600 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-violet-950/50 transition-colors hover:bg-violet-500 active:scale-[0.98]"
        >
          {cta.button}
        </Link>
      </div>
    </section>
  );
}
