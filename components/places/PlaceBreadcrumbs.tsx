"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function PlaceBreadcrumbs({
  placeName,
  city,
  region,
}: {
  placeName: string;
  city: string;
  region: string;
}) {
  const { t } = useLanguage();
  const bc = t.placePage.breadcrumbs;

  const crumbs = [
    { href: "/", label: bc.home },
    { href: "/map", label: bc.map },
    { href: `/map?region=${encodeURIComponent(region)}`, label: region },
    { href: undefined as string | undefined, label: placeName },
  ];

  return (
    <nav aria-label={bc.ariaLabel} className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-white/50">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1 min-w-0">
              {i > 0 ? (
                <ChevronRight className="h-3 w-3 shrink-0 text-white/30" aria-hidden />
              ) : null}
              {last || !crumb.href ? (
                <span
                  className={`truncate ${last ? "text-white/75" : ""}`}
                  aria-current={last ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="truncate hover:text-violet-300 transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
        <li className="sr-only">
          {city}, {region}
        </li>
      </ol>
    </nav>
  );
}
