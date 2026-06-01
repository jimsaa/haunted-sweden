import type { VideoLinkPlatform } from "@/lib/submissions/types";

export function detectVideoPlatform(url: string): VideoLinkPlatform {
  const lower = url.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) {
    return "youtube";
  }
  if (lower.includes("tiktok.com")) return "tiktok";
  if (lower.includes("facebook.com") || lower.includes("fb.watch")) {
    return "facebook";
  }
  if (lower.includes("vimeo.com")) return "vimeo";
  return "other";
}
