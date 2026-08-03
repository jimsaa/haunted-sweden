"use client";

import { useState } from "react";
import { PLACE_CATEGORIES } from "@/lib/categories";
import { VERIFICATION_LEVELS } from "@/lib/types/verification";
import type { PlaceStatus } from "@/lib/types/place";
import type { MediaStatus, VideoPlatform } from "@/lib/types/place-media";
import {
  createEmptyImage,
  createEmptyVideo,
} from "@/lib/admin/serialize";
import type {
  AdminImageDraft,
  AdminPlaceDraft,
  AdminTabId,
  AdminVideoDraft,
} from "@/lib/admin/types";
import { autofillSwedishFromEnglish } from "@/lib/admin/autofill-swedish";
import type { PlaceEditorAccess } from "@/lib/admin/editor-access";

const TABS: { id: AdminTabId; label: string }[] = [
  { id: "basic", label: "Basic Info" },
  { id: "swedish", label: "Swedish Text" },
  { id: "english", label: "English Text" },
  { id: "media", label: "Media" },
  { id: "verification", label: "Verification" },
  { id: "access", label: "Access" },
  { id: "google", label: "Google" },
];

const STATUSES: PlaceStatus[] = [
  "approved",
  "pending",
  "rejected",
  "hidden",
  "archived",
];

const ACCESS_TYPES = [
  "Paid Accommodation",
  "Guided Visits",
  "Public Landmark",
  "Public Trail",
  "Museum Visit",
  "Restaurant Visit",
];

const MEDIA_STATUSES: MediaStatus[] = ["approved", "pending", "rejected"];
const PLATFORMS: VideoPlatform[] = ["youtube", "vimeo", "other"];

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`admin-label block ${className}`}>
      {label}
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="admin-input mt-1"
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="admin-input admin-textarea mt-1"
    />
  );
}

function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-center gap-2 text-sm text-white/80 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-white/20 bg-black/40 text-violet-500 focus:ring-violet-500/50"
      />
      {label}
    </label>
  );
}

const FULL_EDITOR_ACCESS: PlaceEditorAccess = {
  editLocations: true,
  editSwedish: true,
  editEnglish: true,
  uploadImages: true,
  uploadVideos: true,
  manageFeatured: true,
  manageVerification: true,
  deleteLocations: true,
};

function tabAllowed(id: AdminTabId, access: PlaceEditorAccess): boolean {
  switch (id) {
    case "basic":
      return access.editLocations;
    case "swedish":
      return access.editSwedish;
    case "english":
      return access.editEnglish;
    case "media":
      return access.uploadImages || access.uploadVideos;
    case "verification":
      return access.manageVerification;
    case "access":
    case "google":
      return access.editLocations;
    default:
      return access.editLocations;
  }
}

export function AdminPlaceEditor({
  draft,
  onChange,
  access = FULL_EDITOR_ACCESS,
}: {
  draft: AdminPlaceDraft;
  onChange: (next: AdminPlaceDraft) => void;
  access?: PlaceEditorAccess;
}) {
  const visibleTabs = TABS.filter((t) => tabAllowed(t.id, access));
  const [tab, setTab] = useState<AdminTabId>(
    visibleTabs[0]?.id ?? "basic"
  );

  const patch = (partial: Partial<AdminPlaceDraft>) => {
    const keys = Object.keys(partial) as (keyof AdminPlaceDraft)[];
    const mediaKeys: (keyof AdminPlaceDraft)[] = [
      "coverImage",
      "images",
      "videos",
    ];
    const mediaOnly =
      keys.length > 0 && keys.every((k) => mediaKeys.includes(k));
    if (mediaOnly) {
      if (
        (partial.coverImage !== undefined || partial.images !== undefined) &&
        !access.uploadImages &&
        !access.editLocations
      ) {
        return;
      }
      if (partial.videos !== undefined && !access.uploadVideos && !access.editLocations) {
        return;
      }
      onChange({ ...draft, ...partial });
      return;
    }
    if (!access.editLocations && !access.editSwedish && !access.editEnglish) {
      return;
    }
    onChange({ ...draft, ...partial });
  };

  const confirmArchive = (item: string) =>
    window.confirm(
      `Hide this ${item}? Status will be set to "hidden" instead of deleting.`
    );

  const removeImage = (id: string) => {
    const img = draft.images.find((i) => i.id === id);
    if (!img) return;
    if (!confirmArchive("image")) return;
    patch({
      images: draft.images.map((i) =>
        i.id === id ? { ...i, status: "rejected" as MediaStatus } : i
      ),
    });
  };

  const deleteImage = (id: string) => {
    if (
      !window.confirm("Remove this image from the list? (You can undo before saving.)")
    ) {
      return;
    }
    patch({ images: draft.images.filter((i) => i.id !== id) });
  };

  const removeVideo = (id: string) => {
    if (!confirmArchive("video")) return;
    patch({
      videos: draft.videos.map((v) =>
        v.id === id ? { ...v, status: "rejected" as MediaStatus } : v
      ),
    });
  };

  const deleteVideo = (id: string) => {
    if (
      !window.confirm("Remove this video from the list? (You can undo before saving.)")
    ) {
      return;
    }
    patch({ videos: draft.videos.filter((v) => v.id !== id) });
  };

  const updateImage = (id: string, partial: Partial<AdminImageDraft>) => {
    patch({
      images: draft.images.map((i) =>
        i.id === id ? { ...i, ...partial } : i
      ),
    });
  };

  const updateVideo = (id: string, partial: Partial<AdminVideoDraft>) => {
    patch({
      videos: draft.videos.map((v) =>
        v.id === id ? { ...v, ...partial } : v
      ),
    });
  };

  const archivePlace = () => {
    if (
      !window.confirm(
        'Archive this location? Status will change to "archived" (not deleted).'
      )
    ) {
      return;
    }
    patch({ status: "archived" });
  };

  return (
    <div className="admin-editor flex flex-1 flex-col min-h-0">
      <div className="border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2
            className="text-lg font-bold text-violet-100"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {draft.name || "Untitled"}
          </h2>
          <p className="text-xs text-white/40 font-mono">{draft.slug}</p>
        </div>
        {access.deleteLocations ? (
          <button
            type="button"
            onClick={archivePlace}
            className="admin-btn admin-btn--ghost text-xs"
          >
            Archive location
          </button>
        ) : null}
      </div>

      <div
        className="flex gap-1 overflow-x-auto border-b border-white/10 px-2 py-2 admin-tabs"
        role="tablist"
      >
        {visibleTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`admin-tab shrink-0 ${tab === t.id ? "admin-tab--active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {tab === "basic" && (
          <div className="admin-form-grid">
            <Field label="Name (SV)">
              <TextInput value={draft.name} onChange={(v) => patch({ name: v })} />
            </Field>
            <Field label="English name">
              <TextInput
                value={draft.englishName}
                onChange={(v) => patch({ englishName: v })}
              />
            </Field>
            <Field label="Slug">
              <TextInput value={draft.slug} onChange={(v) => patch({ slug: v })} />
            </Field>
            <Field label="Category">
              <select
                value={draft.category}
                onChange={(e) =>
                  patch({
                    category: e.target.value as AdminPlaceDraft["category"],
                  })
                }
                className="admin-input mt-1"
              >
                {PLACE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <TextInput value={draft.city} onChange={(v) => patch({ city: v })} />
            </Field>
            <Field label="Region">
              <TextInput
                value={draft.region}
                onChange={(v) => patch({ region: v })}
              />
            </Field>
            <Field label="Latitude">
              <TextInput
                value={draft.latitude}
                onChange={(v) => patch({ latitude: v })}
                type="number"
              />
            </Field>
            <Field label="Longitude">
              <TextInput
                value={draft.longitude}
                onChange={(v) => patch({ longitude: v })}
                type="number"
              />
            </Field>
            <Field label="Haunting level (0–5)">
              <input
                type="number"
                min={0}
                max={5}
                value={draft.hauntingLevel}
                onChange={(e) =>
                  patch({ hauntingLevel: Number(e.target.value) })
                }
                className="admin-input mt-1"
              />
            </Field>
            <Field label="Status">
              <select
                value={draft.status}
                onChange={(e) =>
                  patch({ status: e.target.value as PlaceStatus })
                }
                className="admin-input mt-1"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <div className="col-span-full flex flex-wrap gap-4 pt-2">
              <Checkbox
                label="Featured"
                checked={draft.featured}
                disabled={!access.manageFeatured}
                onChange={(v) => patch({ featured: v })}
              />
              <Checkbox
                label="Verified (legacy flag)"
                checked={draft.verified}
                onChange={(v) => patch({ verified: v })}
              />
            </div>
          </div>
        )}

        {tab === "swedish" && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 pb-1">
              <button
                type="button"
                className="admin-btn admin-btn--primary text-sm"
                onClick={() => onChange(autofillSwedishFromEnglish(draft))}
              >
                Auto-fill Swedish from English
              </button>
              <p className="text-xs text-white/45">
                Uses built-in Swedish copy for known locations; otherwise marks
                English with [TODO översätt].
              </p>
            </div>
            <Field label="Short description (SV)">
              <TextArea
                value={draft.shortDescription_sv}
                onChange={(v) => patch({ shortDescription_sv: v })}
                rows={3}
              />
            </Field>
            <Field label="History (SV)">
              <TextArea
                value={draft.history_sv}
                onChange={(v) => patch({ history_sv: v })}
                rows={6}
              />
            </Field>
            <Field label="Legend (SV)">
              <TextArea
                value={draft.legend_sv}
                onChange={(v) => patch({ legend_sv: v })}
                rows={6}
              />
            </Field>
            <Field label="Safety (SV)">
              <TextArea
                value={draft.safetyNote_sv}
                onChange={(v) => patch({ safetyNote_sv: v })}
                rows={3}
              />
            </Field>
            <p className="text-xs text-white/40">
              Swedish copy is stored as{" "}
              <code className="text-violet-300">shortDescriptionSv</code>,{" "}
              <code className="text-violet-300">historySv</code>,{" "}
              <code className="text-violet-300">legendSv</code>,{" "}
              <code className="text-violet-300">safetyNoteSv</code> in JSON. The
              public site shows these when Swedish is active.
            </p>
          </div>
        )}

        {tab === "english" && (
          <div className="space-y-4 max-w-2xl">
            <Field label="Short description (EN)">
              <TextArea
                value={draft.shortDescription_en}
                onChange={(v) => patch({ shortDescription_en: v })}
                rows={3}
              />
            </Field>
            <Field label="History (EN)">
              <TextArea
                value={draft.history_en}
                onChange={(v) => patch({ history_en: v })}
                rows={6}
              />
            </Field>
            <Field label="Legend (EN)">
              <TextArea
                value={draft.legend_en}
                onChange={(v) => patch({ legend_en: v })}
                rows={6}
              />
            </Field>
            <Field label="Safety (EN)">
              <TextArea
                value={draft.safetyNote_en}
                onChange={(v) => patch({ safetyNote_en: v })}
                rows={3}
              />
            </Field>
          </div>
        )}

        {tab === "media" && (
          <div className="space-y-8 max-w-3xl">
            <section>
              <h3 className="text-sm font-semibold text-violet-200 mb-2">
                Cover photo
              </h3>
              <p className="text-xs text-white/45 mb-3">
                Primary image for map cards and place pages. Paste a direct
                image URL (<code className="text-violet-300">https://…</code>)
                or a site path like{" "}
                <code className="text-violet-300">/places/slug-cover.png</code>.
                Then use <strong>Save to JSON file</strong> in the top bar (or
                set covers faster from the Cover Audit tab).
              </p>
              {access.uploadImages || access.editLocations ? (
                <Field label="Cover photo URL">
                  <TextInput
                    value={draft.coverImage}
                    onChange={(v) => patch({ coverImage: v })}
                    placeholder="https://… or /places/name-cover.png"
                  />
                </Field>
              ) : (
                <p className="text-sm text-white/40">
                  {draft.coverImage || "No cover set"}
                </p>
              )}
              {draft.coverImage.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={draft.coverImage.trim()}
                  alt=""
                  className="mt-3 h-28 w-44 rounded object-cover border border-white/10 bg-black/40"
                />
              ) : null}
            </section>

            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-violet-200">Images</h3>
                {access.uploadImages ? (
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost text-xs"
                    onClick={() =>
                      patch({ images: [...draft.images, createEmptyImage()] })
                    }
                  >
                    + Add image
                  </button>
                ) : null}
              </div>
              <div className="space-y-4">
                {draft.images.map((img) => (
                  <div key={img.id} className="admin-media-card">
                    <Field label="URL">
                      <TextInput
                        value={img.url}
                        onChange={(v) => updateImage(img.id, { url: v })}
                      />
                    </Field>
                    <div className="admin-form-grid mt-2">
                      <Field label="Caption EN">
                        <TextInput
                          value={img.caption_en}
                          onChange={(v) =>
                            updateImage(img.id, { caption_en: v })
                          }
                        />
                      </Field>
                      <Field label="Caption SV">
                        <TextInput
                          value={img.caption_sv}
                          onChange={(v) =>
                            updateImage(img.id, { caption_sv: v })
                          }
                        />
                      </Field>
                      <Field label="Credit">
                        <TextInput
                          value={img.credit}
                          onChange={(v) => updateImage(img.id, { credit: v })}
                        />
                      </Field>
                      <Field label="Status">
                        <select
                          value={img.status}
                          onChange={(e) =>
                            updateImage(img.id, {
                              status: e.target.value as MediaStatus,
                            })
                          }
                          className="admin-input mt-1"
                        >
                          {MEDIA_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        className="admin-btn admin-btn--ghost text-xs"
                        onClick={() => removeImage(img.id)}
                      >
                        Mark hidden
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger text-xs"
                        onClick={() => deleteImage(img.id)}
                      >
                        Remove row
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-violet-200">Videos</h3>
                {access.uploadVideos ? (
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost text-xs"
                    onClick={() =>
                      patch({ videos: [...draft.videos, createEmptyVideo()] })
                    }
                  >
                    + Add video
                  </button>
                ) : null}
              </div>
              <div className="space-y-4">
                {draft.videos.map((vid) => (
                  <div key={vid.id} className="admin-media-card">
                    <Field label="URL">
                      <TextInput
                        value={vid.url}
                        onChange={(v) => updateVideo(vid.id, { url: v })}
                      />
                    </Field>
                    <div className="admin-form-grid mt-2">
                      <Field label="Title EN">
                        <TextInput
                          value={vid.title_en}
                          onChange={(v) => updateVideo(vid.id, { title_en: v })}
                        />
                      </Field>
                      <Field label="Title SV">
                        <TextInput
                          value={vid.title_sv}
                          onChange={(v) => updateVideo(vid.id, { title_sv: v })}
                        />
                      </Field>
                      <Field label="Caption EN">
                        <TextInput
                          value={vid.caption_en}
                          onChange={(v) =>
                            updateVideo(vid.id, { caption_en: v })
                          }
                        />
                      </Field>
                      <Field label="Caption SV">
                        <TextInput
                          value={vid.caption_sv}
                          onChange={(v) =>
                            updateVideo(vid.id, { caption_sv: v })
                          }
                        />
                      </Field>
                      <Field label="Platform">
                        <select
                          value={vid.platform}
                          onChange={(e) =>
                            updateVideo(vid.id, {
                              platform: e.target.value as VideoPlatform,
                            })
                          }
                          className="admin-input mt-1"
                        >
                          {PLATFORMS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Status">
                        <select
                          value={vid.status}
                          onChange={(e) =>
                            updateVideo(vid.id, {
                              status: e.target.value as MediaStatus,
                            })
                          }
                          className="admin-input mt-1"
                        >
                          {MEDIA_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        className="admin-btn admin-btn--ghost text-xs"
                        onClick={() => removeVideo(vid.id)}
                      >
                        Mark hidden
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger text-xs"
                        onClick={() => deleteVideo(vid.id)}
                      >
                        Remove row
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === "verification" && (
          <div className="admin-form-grid max-w-xl">
            <Field label="Verification level">
              <select
                value={draft.verificationLevel}
                onChange={(e) =>
                  patch({
                    verificationLevel: e.target
                      .value as AdminPlaceDraft["verificationLevel"],
                  })
                }
                className="admin-input mt-1"
              >
                {VERIFICATION_LEVELS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Last investigation date">
              <TextInput
                value={draft.lastInvestigationDate}
                onChange={(v) => patch({ lastInvestigationDate: v })}
                placeholder="YYYY-MM-DD"
              />
            </Field>
            <div className="col-span-full space-y-3 pt-2">
              <Checkbox
                label="Haunted Sweden visited"
                checked={draft.visitedByTeam}
                onChange={(v) => patch({ visitedByTeam: v })}
              />
              <Checkbox
                label="Verified by team"
                checked={draft.verifiedByTeam}
                onChange={(v) => patch({ verifiedByTeam: v })}
              />
              <Checkbox
                label="Overnight investigation"
                checked={draft.overnightInvestigation}
                onChange={(v) => patch({ overnightInvestigation: v })}
              />
            </div>
          </div>
        )}

        {tab === "access" && (
          <div className="admin-form-grid max-w-xl">
            <Field label="Access type">
              <select
                value={draft.accessType}
                onChange={(e) => patch({ accessType: e.target.value })}
                className="admin-input mt-1"
              >
                {ACCESS_TYPES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </Field>
            <div className="col-span-full space-y-3 pt-2">
              <Checkbox
                label="Family friendly"
                checked={draft.familyFriendly}
                onChange={(v) => patch({ familyFriendly: v })}
              />
              <Checkbox
                label="Night access"
                checked={draft.nightAccess}
                onChange={(v) => patch({ nightAccess: v })}
              />
              <Checkbox
                label="Public access"
                checked={draft.publicAccess}
                onChange={(v) => patch({ publicAccess: v })}
              />
              <Checkbox
                label="Parking available"
                checked={draft.parkingAvailable}
                onChange={(v) => patch({ parkingAvailable: v })}
              />
            </div>
          </div>
        )}

        {tab === "google" && (
          <div className="admin-form-grid max-w-xl">
            <Field label="Google Maps URL">
              <TextInput
                value={draft.googleMapsUrl}
                onChange={(v) => patch({ googleMapsUrl: v })}
              />
            </Field>
            <Field label="Google Place ID">
              <TextInput
                value={draft.googlePlaceId}
                onChange={(v) => patch({ googlePlaceId: v })}
              />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}
