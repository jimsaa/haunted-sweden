"use client";

import Image from "next/image";
import type { BookArchiveImage } from "@/lib/types/book-archive";
import { pickBookText } from "@/lib/book-archive/locale";
import { useLanguage } from "@/lib/language-context";

export function InvestigationHero({ image }: { image: BookArchiveImage }) {
  const { locale } = useLanguage();
  const caption = pickBookText(locale, image.caption, image.captionSv);
  const isRemote = image.url.startsWith("http");

  return (
    <figure className="book-archive-hero">
      <div className="book-archive-hero-frame">
        {isRemote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.url} alt={image.alt} className="book-archive-hero-img" />
        ) : (
          <Image
            src={image.url}
            alt={image.alt}
            width={1400}
            height={900}
            className="book-archive-hero-img"
            priority
            sizes="(max-width: 768px) 100vw, 720px"
          />
        )}
      </div>
      {caption ? <figcaption className="book-archive-hero-caption">{caption}</figcaption> : null}
    </figure>
  );
}
