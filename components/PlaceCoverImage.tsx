import Image from "next/image";
import {
  Ghost,
  Castle,
  Home,
  Building2,
  MapPin,
  Trees,
  ScrollText,
  Church,
  Warehouse,
  Sparkles,
  Landmark,
  GalleryVertical,
} from "lucide-react";
import type { HauntedPlace } from "@/lib/types/place";
import { normalizePlaceCategory, type PlaceCategory } from "@/lib/categories";
import {
  getCoverImageSrc,
  hasCoverImage,
  isRemoteCoverUrl,
} from "@/lib/place-cover";

export type CoverVariant = "thumb" | "card" | "hero";

const VARIANT_CLASS: Record<CoverVariant, string> = {
  thumb: "h-20 w-20 shrink-0 rounded-lg",
  card: "h-36 sm:h-40 w-full rounded-none",
  hero: "h-52 sm:h-64 md:h-72 w-full rounded-none",
};

function CategoryIcon({
  category,
  className,
}: {
  category: PlaceCategory;
  className?: string;
}) {
  const props = { className, "aria-hidden": true as const };
  switch (category) {
    case "Haunted Accommodation":
      return <Home {...props} />;
    case "Castle / Castle Ruin":
      return <Castle {...props} />;
    case "Manor / Estate":
      return <Building2 {...props} />;
    case "Church / Cemetery":
      return <Church {...props} />;
    case "Forest / Nature Site":
      return <Trees {...props} />;
    case "Legend Site":
      return <ScrollText {...props} />;
    case "Abandoned Place":
      return <Warehouse {...props} />;
    case "Urban Legend":
      return <Sparkles {...props} />;
    case "Historical Tragedy Site":
      return <Landmark {...props} />;
    case "Haunted Museum":
      return <GalleryVertical {...props} />;
    default:
      return <Ghost {...props} />;
  }
}

function CoverPlaceholder({
  place,
  variant,
  placeholderLabel,
  className = "",
}: {
  place: HauntedPlace;
  variant: CoverVariant;
  placeholderLabel: string;
  className?: string;
}) {
  const isThumb = variant === "thumb";
  const category = normalizePlaceCategory(place.category as string);
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-violet-950/80 via-black to-black border-white/10 ${VARIANT_CLASS[variant]} ${isThumb ? "border" : "border-b"} ${className}`}
      role="img"
      aria-label={placeholderLabel}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(139,92,246,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(109,40,217,0.25) 0%, transparent 45%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <CategoryIcon
          category={category}
          className={
            isThumb
              ? "h-8 w-8 text-violet-400/70"
              : "h-10 w-10 sm:h-12 sm:w-12 text-violet-400/60"
          }
        />
        {!isThumb && (
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/35 max-w-[200px]">
            {placeholderLabel}
          </span>
        )}
      </div>
      {variant === "hero" && (
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white/40">
          <MapPin className="h-3.5 w-3.5" />
          {place.city}
        </div>
      )}
    </div>
  );
}

export function PlaceCoverImage({
  place,
  variant = "card",
  placeholderLabel,
  alt,
  className = "",
  priority = false,
}: {
  place: HauntedPlace;
  variant?: CoverVariant;
  placeholderLabel: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const src = getCoverImageSrc(place);
  const imageAlt = alt ?? place.englishName ?? place.name;

  if (!hasCoverImage(src)) {
    return (
      <CoverPlaceholder
        place={place}
        variant={variant}
        placeholderLabel={placeholderLabel}
        className={className}
      />
    );
  }

  const remote = isRemoteCoverUrl(src!);
  const sizes =
    variant === "hero"
      ? "(max-width: 768px) 100vw, 768px"
      : variant === "thumb"
        ? "80px"
        : "(max-width: 640px) 100vw, 320px";

  return (
    <div
      className={`relative overflow-hidden bg-black ${VARIANT_CLASS[variant]} ${className}`}
    >
      <Image
        src={src!}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        unoptimized={remote}
      />
      <div
        className={`absolute inset-0 pointer-events-none ${
          variant === "hero"
            ? "bg-gradient-to-t from-black via-black/40 to-violet-950/20"
            : "bg-gradient-to-t from-black/70 via-black/10 to-transparent"
        }`}
        aria-hidden
      />
    </div>
  );
}
