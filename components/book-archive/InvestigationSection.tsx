"use client";

import { useState } from "react";
import type { BookArchiveInvestigation } from "@/lib/types/book-archive";
import { pickBookParagraphs, pickBookText } from "@/lib/book-archive/locale";
import { useLanguage } from "@/lib/language-context";
import { ArchiveGallery } from "@/components/book-archive/ArchiveGallery";
import { ArchiveCommunity } from "@/components/book-archive/ArchiveCommunity";
import { InvestigationHero } from "@/components/book-archive/InvestigationHero";

const SECTION_LABELS = {
  historicalBackground: { en: "Historical Background", sv: "Historisk bakgrund" },
  verifiedHistory: { en: "Verified History", sv: "Verifierad historia" },
  folklore: { en: "Local Folklore", sv: "Lokal folklore" },
  timeline: { en: "Timeline", sv: "Tidslinje" },
  gallery: { en: "Gallery", sv: "Galleri" },
  map: { en: "Map", sv: "Karta" },
  sources: { en: "Historical Sources", sv: "Historiska källor" },
  visiting: { en: "Visitor Information", sv: "Besöksinformation" },
  researchNotes: { en: "Research Notes", sv: "Forskningsanteckningar" },
} as const;

function Prose({ paragraphs }: { paragraphs: string[] }) {
  if (!paragraphs.length) return null;
  return (
    <div className="book-archive-prose">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
    </div>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="book-archive-subsection">
      <h3 className="book-archive-subsection-title">{title}</h3>
      {children}
    </div>
  );
}

export function InvestigationSection({
  investigation,
  archiveId,
}: {
  investigation: BookArchiveInvestigation;
  archiveId: string;
}) {
  const { locale } = useLanguage();
  const title = pickBookText(locale, investigation.title, investigation.titleSv);
  const L = (key: keyof typeof SECTION_LABELS) =>
    SECTION_LABELS[key][locale];

  const historical = pickBookParagraphs(
    locale,
    investigation.historicalBackground?.paragraphs,
    investigation.historicalBackground?.paragraphsSv
  );
  const verified = pickBookParagraphs(
    locale,
    investigation.verifiedHistory?.paragraphs,
    investigation.verifiedHistory?.paragraphsSv
  );
  const folklore = pickBookParagraphs(
    locale,
    investigation.folklore?.paragraphs,
    investigation.folklore?.paragraphsSv
  );
  const notes = pickBookParagraphs(
    locale,
    investigation.researchNotes?.paragraphs,
    investigation.researchNotes?.paragraphsSv
  );

  const galleryImages = [
    ...(investigation.gallery ?? []),
  ];

  return (
    <section
      id={`investigation-${investigation.id}`}
      className="book-archive-investigation"
      aria-labelledby={`inv-title-${investigation.id}`}
    >
      <div className="book-archive-investigation-header">
        <span className="book-archive-investigation-num">
          {locale === "sv" ? "Utredning" : "Investigation"} {investigation.number}
        </span>
        <h2 id={`inv-title-${investigation.id}`} className="book-archive-investigation-title">
          {title}
        </h2>
      </div>

      {investigation.heroImage ? (
        <InvestigationHero image={investigation.heroImage} />
      ) : null}

      {historical.length > 0 ? (
        <SectionBlock title={L("historicalBackground")}>
          <Prose paragraphs={historical} />
        </SectionBlock>
      ) : null}

      {verified.length > 0 ? (
        <SectionBlock title={L("verifiedHistory")}>
          <Prose paragraphs={verified} />
        </SectionBlock>
      ) : null}

      {folklore.length > 0 ? (
        <SectionBlock title={L("folklore")}>
          <Prose paragraphs={folklore} />
        </SectionBlock>
      ) : null}

      {investigation.timeline && investigation.timeline.length > 0 ? (
        <SectionBlock title={L("timeline")}>
          <ol className="book-archive-timeline">
            {investigation.timeline.map((ev) => (
              <li key={`${ev.date}-${ev.title}`} className="book-archive-timeline-item">
                <time className="book-archive-timeline-date">{ev.date}</time>
                <h4 className="book-archive-timeline-title">
                  {pickBookText(locale, ev.title, ev.titleSv)}
                </h4>
                {ev.description || ev.descriptionSv ? (
                  <p>{pickBookText(locale, ev.description, ev.descriptionSv)}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </SectionBlock>
      ) : null}

      {galleryImages.length > 0 ? (
        <SectionBlock title={L("gallery")}>
          <ArchiveGallery images={galleryImages} />
        </SectionBlock>
      ) : null}

      {investigation.map ? (
        <SectionBlock title={L("map")}>
          <div className="book-archive-map">
            {pickBookText(locale, investigation.map.label, investigation.map.labelSv) ? (
              <p className="book-archive-map-label">
                {pickBookText(locale, investigation.map.label, investigation.map.labelSv)}
              </p>
            ) : null}
            <div className="book-archive-map-links">
              {investigation.map.googleMapsUrl ? (
                <a
                  href={investigation.map.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-archive-map-link"
                >
                  {locale === "sv" ? "Öppna i Google Maps" : "Open in Google Maps"}
                </a>
              ) : null}
              {investigation.map.directionsUrl ? (
                <a
                  href={investigation.map.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-archive-map-link"
                >
                  {locale === "sv" ? "Vägbeskrivning" : "Get directions"}
                </a>
              ) : null}
            </div>
            {investigation.map.latitude != null &&
            investigation.map.longitude != null ? (
              <p className="book-archive-coords">
                GPS: {investigation.map.latitude}, {investigation.map.longitude}
              </p>
            ) : null}
            {investigation.map.embedUrl ? (
              <iframe
                title={title}
                src={investigation.map.embedUrl}
                className="book-archive-map-embed"
                loading="lazy"
              />
            ) : null}
          </div>
        </SectionBlock>
      ) : null}

      {investigation.sources && investigation.sources.length > 0 ? (
        <SectionBlock title={L("sources")}>
          <ul className="book-archive-sources">
            {investigation.sources.map((s) => {
              const st = pickBookText(locale, s.title, s.titleSv);
              const note = pickBookText(locale, s.note, s.noteSv);
              return (
                <li key={st}>
                  {s.type ? (
                    <span className="book-archive-source-type">[{s.type}] </span>
                  ) : null}
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {st}
                    </a>
                  ) : (
                    <span>{st}</span>
                  )}
                  {note ? (
                    <span className="book-archive-source-note"> — {note}</span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </SectionBlock>
      ) : null}

      {investigation.visiting ? (
        <SectionBlock title={L("visiting")}>
          <div className="book-archive-visiting">
            {pickBookText(
              locale,
              investigation.visiting.accessNotes,
              investigation.visiting.accessNotesSv
            ) ? (
              <p>
                {pickBookText(
                  locale,
                  investigation.visiting.accessNotes,
                  investigation.visiting.accessNotesSv
                )}
              </p>
            ) : null}
            {pickBookText(
              locale,
              investigation.visiting.safetyNote,
              investigation.visiting.safetyNoteSv
            ) ? (
              <p className="book-archive-safety">
                <strong>{locale === "sv" ? "Säkerhet:" : "Safety:"}</strong>{" "}
                {pickBookText(
                  locale,
                  investigation.visiting.safetyNote,
                  investigation.visiting.safetyNoteSv
                )}
              </p>
            ) : null}
          </div>
        </SectionBlock>
      ) : null}

      {notes.length > 0 ? (
        <SectionBlock title={L("researchNotes")}>
          <Prose paragraphs={notes} />
        </SectionBlock>
      ) : null}

      <ArchiveCommunity
        archiveId={archiveId}
        investigationId={investigation.id}
        investigationTitle={title}
      />
    </section>
  );
}
