"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AmbienceSoundToggle } from "@/components/map/AmbienceSoundToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/language-context";

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const onMapPage = pathname === "/map";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="font-semibold tracking-wide text-white shrink-0"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {t.brand}
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/map"
            className="text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors"
          >
            {t.navMap}
          </Link>
          <Link
            href="/spokjakt"
            className="text-sm text-white/70 hover:text-white transition-colors hidden sm:inline"
          >
            {t.navSpokjakt}
          </Link>
          {onMapPage ? <AmbienceSoundToggle compact /> : null}
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
