"use client";

import Image from "next/image";
import type {
  BookArchiveEvidenceItem,
  BookArchiveFact,
  BookArchiveImage,
  BookArchiveMapEmbed,
  BookArchiveSection,
  BookArchiveSource,
  BookArchiveTimelineEvent,
  BookArchiveVisitingInfo,
} from "@/lib/types/book-archive";
import { BOOK_ARCHIVE_SECTION_LABELS } from "@/lib/book-archive/section-labels";
import { pickBookParagraphs, pickBookText } from "@/lib/book-archive/locale";
import { useLanguage } from "@/lib/language-context";

function SectionShell({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="book-archive-section" aria-labelledby={id}>
      <h2 id={id} className="book-archive-section-title">
        {title}
      </h2>
      <div className="book-archive-section-body">{children}</div>
    </section>
  );
}

function RichTextBlock({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  if (!paragraphs.length) return null;
  return (
    <div className="book-archive-prose">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
    </div>
  );
}

function FactsBlock({ facts, locale }: { facts: BookArchiveFact[]; locale: "en" | "sv" }) {
  return (
    <dl className="book-archive-facts">
      {facts.map((f) => (
        <div key={f.label} className="book-archive-fact">
          <dt>{pickBookText(locale, f.label, f.labelSv)}</dt>
          <dd>{pickBookText(locale, f.value, f.valueSv)}</dd>
        </div>
      ))}
    </dl>
  );
}

function TimelineBlock({
  events,
  locale,
}: {
  events: BookArchiveTimelineEvent[];
  locale: "en" | "sv";
}) {
  return (
    <ol className="book-archive-timeline">
      {events.map((ev) => (
        <li key={`${ev.date}-${ev.title}`} className="book-archive-timeline-item">
          <time className="book-archive-timeline-date">{ev.date}</time>
          <h3 className="book-archive-timeline-title">
            {pickBookText(locale, ev.title, ev.titleSv)}
          </h3>
          {ev.description || ev.descriptionSv ? (
            <p>{pickBookText(locale, ev.description, ev.descriptionSv)}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function GalleryBlock({
  images,
  locale,
}: {
  images: BookArchiveImage[];
  locale: "en" | "sv";
}) {
  return (
    <div className="book-archive-gallery">
      {images.map((img) => {
        const caption = pickBookText(locale, img.caption, img.captionSv);
        const isRemote = img.url.startsWith("http");
        return (
          <figure key={img.url} className="book-archive-figure">
            <div className="book-archive-figure-frame">
              {isRemote ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.url} alt={img.alt} className="book-archive-img" loading="lazy" />
              ) : (
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={1200}
                  height={800}
                  className="book-archive-img"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              )}
            </div>
            {caption ? <figcaption>{caption}</figcaption> : null}
            {img.credit ? (
              <p className="book-archive-credit">{img.credit}</p>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}

function MapBlock({
  map,
  locale,
}: {
  map: BookArchiveMapEmbed;
  locale: "en" | "sv";
}) {
  const label = pickBookText(locale, map.label, map.labelSv);
  const mapsUrl =
    map.googleMapsUrl ??
    (map.latitude != null && map.longitude != null
      ? `https://maps.google.com/?q=${map.latitude},${map.longitude}`
      : null);

  return (
    <div className="book-archive-map">
      {label ? <p className="book-archive-map-label">{label}</p> : null}
      {map.embedUrl ? (
        <iframe
          title={label || "Map"}
          src={map.embedUrl}
          className="book-archive-map-embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : mapsUrl ? (
        <a
          href={mapsUrl}
          className="book-archive-map-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {locale === "sv" ? "Öppna i Google Maps" : "Open in Google Maps"}
          {map.latitude != null && map.longitude != null
            ? ` (${map.latitude}, ${map.longitude})`
            : ""}
        </a>
      ) : null}
    </div>
  );
}

function SourcesBlock({
  sources,
  locale,
}: {
  sources: BookArchiveSource[];
  locale: "en" | "sv";
}) {
  return (
    <ul className="book-archive-sources">
      {sources.map((s) => {
        const title = pickBookText(locale, s.title, s.titleSv);
        const note = pickBookText(locale, s.note, s.noteSv);
        return (
          <li key={title}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            ) : (
              <span>{title}</span>
            )}
            {note ? <span className="book-archive-source-note"> — {note}</span> : null}
          </li>
        );
      })}
    </ul>
  );
}

function VisitingBlock({
  visiting,
  locale,
}: {
  visiting: BookArchiveVisitingInfo;
  locale: "en" | "sv";
}) {
  const rows: { label: string; value: string }[] = [];
  const address = pickBookText(locale, visiting.address, visiting.addressSv);
  const hours = pickBookText(locale, visiting.hours, visiting.hoursSv);
  const access = pickBookText(locale, visiting.accessNotes, visiting.accessNotesSv);
  const safety = pickBookText(locale, visiting.safetyNote, visiting.safetyNoteSv);
  if (address) rows.push({ label: locale === "sv" ? "Adress" : "Address", value: address });
  if (hours) rows.push({ label: locale === "sv" ? "Öppettider" : "Hours", value: hours });
  if (access) rows.push({ label: locale === "sv" ? "Tillträde" : "Access", value: access });
  if (safety) rows.push({ label: locale === "sv" ? "Säkerhet" : "Safety", value: safety });

  return (
    <div className="book-archive-visiting">
      {rows.map((r) => (
        <p key={r.label}>
          <strong>{r.label}:</strong> {r.value}
        </p>
      ))}
    </div>
  );
}

function EvidenceBlock({
  items,
  locale,
}: {
  items: BookArchiveEvidenceItem[];
  locale: "en" | "sv";
}) {
  return (
    <div className="book-archive-evidence">
      {items.map((item) => (
        <details key={item.title} className="book-archive-evidence-item">
          <summary>{pickBookText(locale, item.title, item.titleSv)}</summary>
          {item.summary || item.summarySv ? (
            <p>{pickBookText(locale, item.summary, item.summarySv)}</p>
          ) : null}
          {item.images?.length ? (
            <GalleryBlock images={item.images} locale={locale} />
          ) : null}
        </details>
      ))}
    </div>
  );
}

export function BookArchiveSectionRenderer({
  section,
}: {
  section: BookArchiveSection;
}) {
  const { locale } = useLanguage();
  const defaultTitle = BOOK_ARCHIVE_SECTION_LABELS[section.kind][locale];
  const title =
    pickBookText(locale, section.title, section.titleSv) || defaultTitle;
  const sectionId = `section-${section.kind}`;

  const paragraphs = pickBookParagraphs(
    locale,
    section.paragraphs,
    section.paragraphsSv
  );

  return (
    <SectionShell id={sectionId} title={title}>
      {paragraphs.length > 0 ? <RichTextBlock paragraphs={paragraphs} /> : null}

      {section.blockType === "facts" && section.facts?.length ? (
        <FactsBlock facts={section.facts} locale={locale} />
      ) : null}

      {section.blockType === "timeline" && section.timeline?.length ? (
        <TimelineBlock events={section.timeline} locale={locale} />
      ) : null}

      {(section.blockType === "gallery" || section.images?.length) &&
      section.images?.length ? (
        <GalleryBlock images={section.images} locale={locale} />
      ) : null}

      {section.blockType === "map" && section.map ? (
        <MapBlock map={section.map} locale={locale} />
      ) : null}

      {section.blockType === "sources" && section.sources?.length ? (
        <SourcesBlock sources={section.sources} locale={locale} />
      ) : null}

      {section.blockType === "visiting" && section.visiting ? (
        <VisitingBlock visiting={section.visiting} locale={locale} />
      ) : null}

      {section.blockType === "evidence" && section.evidence?.length ? (
        <EvidenceBlock items={section.evidence} locale={locale} />
      ) : null}

      {section.videos?.map((v) => (
        <div key={v.url} className="book-archive-video">
          <iframe
            title={pickBookText(locale, v.title, v.titleSv) || "Video"}
            src={v.url}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}

      {section.audio?.map((a) => (
        <div key={a.url} className="book-archive-audio">
          <p className="book-archive-audio-title">
            {pickBookText(locale, a.title, a.titleSv)}
          </p>
          <audio controls preload="none" src={a.url} className="book-archive-audio-player">
            <track kind="captions" />
          </audio>
        </div>
      ))}

      {section.downloads?.map((d) => (
        <a
          key={d.url}
          href={d.url}
          className="book-archive-download"
          target="_blank"
          rel="noopener noreferrer"
        >
          {pickBookText(locale, d.label, d.labelSv)}
          {d.fileType ? ` (${d.fileType.toUpperCase()})` : ""}
        </a>
      ))}
    </SectionShell>
  );
}
