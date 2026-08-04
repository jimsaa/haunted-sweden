"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import type { HauntedPlace } from "@/lib/types/place";
import { useLanguage } from "@/lib/language-context";
import { isHauntedSwedenVerified } from "@/lib/verification";

/** Always-visible Haunted Sweden investigation status (planned or completed). */
export function PlaceInvestigationPlanSection({
  place,
}: {
  place: HauntedPlace;
}) {
  const { t } = useLanguage();
  const inv = t.placePage.investigation;
  const verified = isHauntedSwedenVerified(place);

  return (
    <section
      id="haunted-sweden-investigation"
      className="scroll-mt-20 mt-10 sm:mt-12"
    >
      <h2
        className="text-xl sm:text-2xl font-semibold mb-4 pb-2 border-b border-white/10"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {inv.title}
      </h2>
      <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 via-black to-black p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <ClipboardList className="h-5 w-5 text-violet-300 shrink-0 mt-0.5" aria-hidden />
          <div className="min-w-0 space-y-3">
            <p className="text-sm font-semibold text-violet-200">
              {verified ? inv.statusVerified : inv.statusPlanned}
            </p>
            <p className="text-sm leading-relaxed text-white/75">
              {verified ? inv.bodyVerified : inv.bodyPlanned}
            </p>
            <ul className="text-sm text-white/65 space-y-1.5 list-disc pl-4">
              <li>{inv.bulletHistory}</li>
              <li>{inv.bulletFolklore}</li>
              <li>{inv.bulletAccess}</li>
              <li>{inv.bulletEvidence}</li>
            </ul>
            {!verified ? (
              <p className="text-sm text-white/60">
                {inv.tipPrompt}{" "}
                <Link
                  href="/submit"
                  className="text-violet-300 hover:text-violet-200 underline-offset-2 hover:underline"
                >
                  {inv.tipLink}
                </Link>
              </p>
            ) : null}
            {place.lastInvestigationDate ? (
              <p className="text-xs text-white/45">
                {inv.lastVisit}: {place.lastInvestigationDate}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
