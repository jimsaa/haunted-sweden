"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import { AmbienceSoundToggle } from "@/components/map/AmbienceSoundToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/language-context";
import { getTranslations } from "@/lib/i18n";
import { useClientMounted } from "@/lib/use-client-mounted";

/** Matches server render (LanguageProvider initial state is always `en` on SSR). */
const SSR_LABELS = getTranslations("en");

export function SiteHeader() {
  const { t } = useLanguage();
  const mounted = useClientMounted();
  const labels = mounted ? t : SSR_LABELS;
  const pathname = usePathname();
  const onMapPage = pathname === "/map";
  const onSubmitPage = pathname === "/submit";
  const onArchivePage = pathname?.startsWith("/archive/");

  if (onArchivePage) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
        <Link
          href="/"
          className="font-semibold tracking-wide text-white shrink-0 min-w-0 truncate max-w-[42vw] sm:max-w-none"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {labels.brand}
        </Link>
        <nav
          className="flex items-center gap-2 sm:gap-5 shrink-0"
          aria-label="Main navigation"
        >
          <Link
            href="/map"
            className="text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors"
          >
            {labels.navMap}
          </Link>
          <Link
            href="/spokjakt"
            className="text-sm text-white/70 hover:text-white transition-colors hidden sm:inline"
          >
            {labels.navSpokjakt}
          </Link>
          <div className="site-header-submit-wrap">
            <Link
              href="/submit"
              className={`site-header-submit-btn${onSubmitPage ? " site-header-submit-btn--active" : ""}`}
              aria-label={labels.navSubmitAria}
              aria-current={onSubmitPage ? "page" : undefined}
            >
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>{labels.navSubmit}</span>
            </Link>
            <span className="site-header-submit-badge" aria-hidden>
              {labels.navSubmitBadge}
            </span>
          </div>
          {onMapPage ? <AmbienceSoundToggle compact /> : null}
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
