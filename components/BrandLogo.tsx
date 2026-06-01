import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_SRC, BRAND_NAME } from "@/lib/brand";

type BrandLogoProps = {
  /** Accessible label; defaults to product name. */
  label?: string;
  /** Intrinsic size passed to next/image (layout scales via imageClassName). */
  size?: number;
  className?: string;
  imageClassName?: string;
  /** Wrap in home link; off for hero display. */
  linked?: boolean;
};

export function BrandLogo({
  label = BRAND_NAME,
  size = 44,
  className = "",
  imageClassName = "",
  linked = true,
}: BrandLogoProps) {
  const image = (
    <Image
      src={BRAND_LOGO_SRC}
      alt=""
      width={size}
      height={size}
      priority={size >= 120}
      className={`rounded-full object-cover shadow-lg shadow-black/60 ring-1 ring-white/10 transition-transform duration-200 group-hover:scale-[1.02] group-hover:ring-violet-400/40 ${imageClassName}`}
      sizes={
        size >= 120
          ? "(max-width: 640px) 200px, 280px"
          : `${size}px`
      }
    />
  );

  const classes = `group inline-flex shrink-0 items-center justify-center ${className}`;

  if (linked) {
    return (
      <Link
        href="/"
        className={`${classes} rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400`}
        aria-label={label}
      >
        {image}
      </Link>
    );
  }

  return (
    <span className={classes} role="img" aria-label={label}>
      {image}
    </span>
  );
}
