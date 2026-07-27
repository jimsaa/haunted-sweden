"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { BookArchiveImage } from "@/lib/types/book-archive";
import { pickBookText } from "@/lib/book-archive/locale";
import { useLanguage } from "@/lib/language-context";

export function ArchiveGallery({
  images,
}: {
  images: BookArchiveImage[];
}) {
  const { locale } = useLanguage();
  const [lightbox, setLightbox] = useState<BookArchiveImage | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close]);

  if (!images.length) return null;

  return (
    <>
      <div className="book-archive-gallery">
        {images.map((img) => {
          const caption = pickBookText(locale, img.caption, img.captionSv);
          const isRemote = img.url.startsWith("http");
          return (
            <figure key={img.url} className="book-archive-figure">
              <button
                type="button"
                className="book-archive-figure-frame book-archive-figure-btn"
                onClick={() => setLightbox(img)}
                aria-label={img.alt}
              >
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
              </button>
              {caption ? <figcaption>{caption}</figcaption> : null}
            </figure>
          );
        })}
      </div>

      {lightbox ? (
        <div
          className="book-archive-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={close}
        >
          <button
            type="button"
            className="book-archive-lightbox-close"
            onClick={close}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="book-archive-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.url.startsWith("http") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={lightbox.url} alt={lightbox.alt} className="book-archive-lightbox-img" />
            ) : (
              <Image
                src={lightbox.url}
                alt={lightbox.alt}
                width={1600}
                height={1200}
                className="book-archive-lightbox-img"
                sizes="100vw"
              />
            )}
            {pickBookText(locale, lightbox.caption, lightbox.captionSv) ? (
              <p className="book-archive-lightbox-caption">
                {pickBookText(locale, lightbox.caption, lightbox.captionSv)}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
