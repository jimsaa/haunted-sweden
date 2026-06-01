"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, Film, Sparkles, Video } from "lucide-react";
import type { HomepageMediaItem } from "@/lib/place-media";
import { isRemoteCoverUrl } from "@/lib/place-cover";
import { useLanguage } from "@/lib/language-context";

const PLACEHOLDER_ICONS = {
  photos: Camera,
  videos: Video,
  investigation: Film,
} as const;

function MediaPlaceholderCard({
  variant,
  label,
}: {
  variant: keyof typeof PLACEHOLDER_ICONS;
  label: string;
}) {
  const Icon = PLACEHOLDER_ICONS[variant];
  return (
    <div className="home-media-card home-media-card--placeholder group relative flex aspect-[4/5] min-w-[200px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/50 via-[#0c0c14] to-black p-5 snap-start sm:min-w-0">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(139,92,246,0.35) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <Icon className="mb-3 h-8 w-8 text-violet-400/70" aria-hidden />
      <p className="text-sm font-semibold text-white/90">{label}</p>
      <Sparkles className="absolute right-4 top-4 h-4 w-4 text-violet-500/40" aria-hidden />
    </div>
  );
}

export function HomeMediaSection({ items }: { items: HomepageMediaItem[] }) {
  const { t } = useLanguage();
  const labels = t.homeMedia;

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {labels.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/55">{labels.subtitle}</p>
          </div>
          <Link
            href="/map"
            className="text-sm font-medium text-violet-300 hover:text-violet-100 transition-colors shrink-0"
          >
            {labels.exploreMapLink} →
          </Link>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible lg:grid-cols-4">
          {items.map((item) => {
            if (item.kind === "placeholder") {
              const label =
                item.variant === "photos"
                  ? labels.placeholders.photos
                  : item.variant === "videos"
                    ? labels.placeholders.videos
                    : labels.placeholders.investigation;
              return (
                <MediaPlaceholderCard
                  key={item.id}
                  variant={item.variant}
                  label={label}
                />
              );
            }

            if (item.kind === "image") {
              return (
                <Link
                  key={item.id}
                  href={`/places/${item.placeSlug}`}
                  className="home-media-card group relative aspect-[4/5] min-w-[200px] overflow-hidden rounded-2xl border border-white/10 bg-black snap-start sm:min-w-0"
                >
                  <Image
                    src={item.url}
                    alt={
                      item.caption
                        ? `${item.caption} — ${item.placeName}`
                        : `${item.placeName} — hemsökt plats i Sverige`
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 200px, 280px"
                    loading="lazy"
                    unoptimized={isRemoteCoverUrl(item.url)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs text-violet-300/90">{labels.photoLabel}</p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      {item.placeName}
                    </p>
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={item.id}
                href={`/places/${item.placeSlug}`}
                className="home-media-card group relative aspect-[4/5] min-w-[200px] overflow-hidden rounded-2xl border border-violet-500/25 bg-violet-950/30 snap-start sm:min-w-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="h-12 w-12 text-violet-400/50" aria-hidden />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs text-violet-300/90">{labels.videoLabel}</p>
                  <p className="mt-0.5 text-sm font-medium text-white line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-white/45">{item.placeName}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
