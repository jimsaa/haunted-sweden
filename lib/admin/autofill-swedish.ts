import type { AdminPlaceDraft, AdminImageDraft, AdminVideoDraft } from "@/lib/admin/types";
import { getSwedishContentForSlug } from "@/lib/place-swedish-content";
import { getSafetyNoteSvForSlug } from "@/lib/place-safety-sv";
import { SWEDISH_TEXT_PLACEHOLDER } from "@/lib/place-locale-text";

export const SWEDISH_TODO_PREFIX = "[TODO översätt] ";

function withTodoFallback(english: string): string {
  const en = english.trim();
  if (!en) return SWEDISH_TEXT_PLACEHOLDER;
  return `${SWEDISH_TODO_PREFIX}${en}`;
}

function autofillImageCaption(img: AdminImageDraft): AdminImageDraft {
  const sv = img.caption_sv?.trim();
  const en = img.caption_en?.trim();
  if (sv && sv !== en) return img;
  if (!en) return { ...img, caption_sv: img.caption_sv || "" };
  return { ...img, caption_sv: withTodoFallback(en) };
}

function autofillVideo(vid: AdminVideoDraft): AdminVideoDraft {
  const titleEn = vid.title_en?.trim();
  const titleSv = vid.title_sv?.trim();
  const capEn = vid.caption_en?.trim();
  const capSv = vid.caption_sv?.trim();
  return {
    ...vid,
    title_sv:
      titleSv && titleSv !== titleEn
        ? titleSv
        : titleEn
          ? withTodoFallback(titleEn)
          : vid.title_sv,
    caption_sv:
      capSv && capSv !== capEn
        ? capSv
        : capEn
          ? withTodoFallback(capEn)
          : vid.caption_sv,
  };
}

/** Fill Swedish fields from built-in static copy, or mark English for manual translation. */
export function autofillSwedishFromEnglish(draft: AdminPlaceDraft): AdminPlaceDraft {
  const staticSv = getSwedishContentForSlug(draft.slug);

  const safetySv =
    staticSv?.safetyNote?.trim() || getSafetyNoteSvForSlug(draft.slug);

  if (staticSv) {
    return {
      ...draft,
      shortDescription_sv: staticSv.shortDescription,
      history_sv: staticSv.history,
      legend_sv: staticSv.legend,
      safetyNote_sv: safetySv ?? withTodoFallback(draft.safetyNote_en),
      images: draft.images.map(autofillImageCaption),
      videos: draft.videos.map(autofillVideo),
    };
  }

  return {
    ...draft,
    shortDescription_sv: withTodoFallback(draft.shortDescription_en),
    history_sv: withTodoFallback(draft.history_en),
    legend_sv: withTodoFallback(draft.legend_en),
    safetyNote_sv: safetySv ?? withTodoFallback(draft.safetyNote_en),
    images: draft.images.map(autofillImageCaption),
    videos: draft.videos.map(autofillVideo),
  };
}
