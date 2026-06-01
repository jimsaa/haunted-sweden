"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getAdminAuthHeaders } from "@/lib/admin/auth";
import type { SubmissionCapabilities } from "@/lib/admin/capabilities";
import type { AdminPlaceDraft } from "@/lib/admin/types";
import type {
  MediaSubmission,
  PlaceSubmission,
  SubmissionKind,
  SubmissionStatus,
  VideoSubmission,
} from "@/lib/submissions/types";

type InboxData = {
  places: PlaceSubmission[];
  media: MediaSubmission[];
  videos: VideoSubmission[];
};

type QueueFilter = "pending" | "all";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("sv-SE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function statusBadgeClass(status: SubmissionStatus): string {
  switch (status) {
    case "pending":
      return "text-amber-200 bg-amber-500/15 border-amber-500/30";
    case "approved":
      return "text-emerald-200 bg-emerald-500/15 border-emerald-500/30";
    case "rejected":
      return "text-red-200 bg-red-500/15 border-red-500/30";
    case "archived":
      return "text-white/50 bg-white/5 border-white/15";
    default:
      return "text-white/60 bg-white/5 border-white/15";
  }
}

async function postAdmin(
  path: string,
  body: Record<string, unknown>
): Promise<Response> {
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAdminAuthHeaders(),
    },
    body: JSON.stringify(body),
  });
}

function canApproveKind(
  kind: SubmissionKind,
  caps: SubmissionCapabilities
): boolean {
  if (kind === "place") return caps.canApprovePlace;
  if (kind === "media") return caps.canApproveImage;
  return caps.canApproveVideo;
}

function canRejectKind(
  kind: SubmissionKind,
  caps: SubmissionCapabilities
): boolean {
  if (kind === "place") return caps.canRejectPlace;
  if (kind === "media") return caps.canRejectImage;
  return caps.canRejectVideo;
}

export function AdminSubmissionsInbox({
  placeOptions,
  onPlacesChanged,
  labels,
  capabilities,
}: {
  placeOptions: AdminPlaceDraft[];
  onPlacesChanged: () => void;
  capabilities: SubmissionCapabilities;
  labels: {
    title: string;
    pendingPlaces: string;
    pendingImages: string;
    pendingVideos: string;
    empty: string;
    status: string;
    submitted: string;
    reviewed: string;
    notes: string;
    notesPlaceholder: string;
    reviewer: string;
    approve: string;
    reject: string;
    archive: string;
    convertDraft: string;
    attachToPlace: string;
    selectPlace: string;
    reload: string;
    converted: string;
    attached: string;
    submitter: string;
    email: string;
    openUrl: string;
  };
}) {
  const [data, setData] = useState<InboxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<QueueFilter>("pending");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reviewer, setReviewer] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [attachPlaceId, setAttachPlaceId] = useState("");

  const load = useCallback(async () => {
    if (!capabilities.canView) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: getAdminAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to load submissions");
      setData((await res.json()) as InboxData);
      setMessage(null);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [capabilities.canView]);

  useEffect(() => {
    load();
  }, [load]);

  if (!capabilities.canView) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-white/40 text-sm">
        You do not have permission to view submissions.
      </div>
    );
  }

  const filterList = <T extends { status: SubmissionStatus }>(items: T[]) =>
    filter === "pending"
      ? items.filter((s) => s.status === "pending")
      : items;

  const places = useMemo(
    () => filterList(data?.places ?? []),
    [data?.places, filter]
  );
  const media = useMemo(
    () => filterList(data?.media ?? []),
    [data?.media, filter]
  );
  const videos = useMemo(
    () => filterList(data?.videos ?? []),
    [data?.videos, filter]
  );

  const placeNameById = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of placeOptions) {
      m.set(p.id, p.name);
    }
    return m;
  }, [placeOptions]);

  const runAction = async (
    path: string,
    body: Record<string, unknown>,
    successMsg: string
  ) => {
    setMessage(null);
    const res = await postAdmin(path, body);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage((err as { error?: string }).error ?? "Action failed");
      return;
    }
    setMessage(successMsg);
    await load();
    if (path.includes("convert") || path.includes("attach")) {
      onPlacesChanged();
    }
  };

  const renderMeta = (item: {
    submittedAt: string;
    reviewedAt?: string | null;
    reviewedBy?: string | null;
    adminNotes?: string | null;
    submitterName?: string;
    submitterEmail?: string;
  }) => (
    <dl className="mt-3 grid gap-1 text-xs text-white/50">
      <div>
        <span className="text-white/35">{labels.submitted}: </span>
        {formatDate(item.submittedAt)}
      </div>
      {item.reviewedAt ? (
        <div>
          <span className="text-white/35">{labels.reviewed}: </span>
          {formatDate(item.reviewedAt)}
          {item.reviewedBy ? ` · ${item.reviewedBy}` : ""}
        </div>
      ) : null}
      {item.submitterName ? (
        <div>
          <span className="text-white/35">{labels.submitter}: </span>
          {item.submitterName}
          {item.submitterEmail ? ` · ${item.submitterEmail}` : ""}
        </div>
      ) : null}
      {item.adminNotes ? (
        <div>
          <span className="text-white/35">{labels.notes}: </span>
          {item.adminNotes}
        </div>
      ) : null}
    </dl>
  );

  const renderActions = (
    kind: SubmissionKind,
    id: string,
    options: { canConvert?: boolean; canAttach?: boolean }
  ) => {
    const showApprove = canApproveKind(kind, capabilities);
    const showReject = canRejectKind(kind, capabilities);
    const showConvert = options.canConvert && capabilities.canConvertDraft;
    const showAttach =
      options.canAttach &&
      ((kind === "media" && capabilities.canAttachImage) ||
        (kind === "video" && capabilities.canAttachVideo));

    if (!showApprove && !showReject && !showConvert && !showAttach) {
      return null;
    }

    return (
    <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="admin-label block mb-1">{labels.reviewer}</label>
          <input
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            className="admin-input w-full"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="admin-label block mb-1">{labels.notes}</label>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder={labels.notesPlaceholder}
            rows={2}
            className="admin-input w-full resize-y"
          />
        </div>
      </div>
      {showAttach ? (
        <div>
          <label className="admin-label block mb-1">{labels.selectPlace}</label>
          <select
            value={attachPlaceId}
            onChange={(e) => setAttachPlaceId(e.target.value)}
            className="admin-input w-full"
          >
            <option value="">—</option>
            {placeOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {showAttach && attachPlaceId ? (
          <button
            type="button"
            className="admin-btn admin-btn--primary text-xs"
            onClick={() =>
              runAction("/api/admin/submissions/attach-media", {
                kind,
                id,
                placeId: attachPlaceId,
                reviewedBy: reviewer || undefined,
              },
              labels.attached)
            }
          >
            {labels.attachToPlace}
          </button>
        ) : null}
        {showApprove && !(showAttach && attachPlaceId) ? (
          <button
            type="button"
            className="admin-btn admin-btn--primary text-xs"
            onClick={() =>
              runAction("/api/admin/submissions/approve", {
                kind,
                id,
                reviewedBy: reviewer || undefined,
                adminNotes: adminNotes || undefined,
              },
              labels.approve)
            }
          >
            {labels.approve}
          </button>
        ) : null}
        {showConvert ? (
          <button
            type="button"
            className="admin-btn admin-btn--ghost text-xs"
            onClick={() =>
              runAction(
                "/api/admin/submissions/convert-to-draft",
                {
                  id,
                  reviewedBy: reviewer || undefined,
                  adminNotes: adminNotes || undefined,
                },
                labels.converted
              )
            }
          >
            {labels.convertDraft}
          </button>
        ) : null}
        {showReject ? (
          <>
            <button
              type="button"
              className="admin-btn admin-btn--ghost text-xs"
              onClick={() =>
                runAction("/api/admin/submissions/reject", {
                  kind,
                  id,
                  reviewedBy: reviewer || undefined,
                  adminNotes: adminNotes || undefined,
                },
                labels.reject)
              }
            >
              {labels.reject}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--ghost text-xs"
              onClick={() =>
                runAction("/api/admin/submissions/archive", {
                  kind,
                  id,
                  reviewedBy: reviewer || undefined,
                  adminNotes: adminNotes || undefined,
                },
                labels.archive)
              }
            >
              {labels.archive}
            </button>
          </>
        ) : null}
      </div>
    </div>
    );
  };

  const renderCard = (
    key: string,
    title: string,
    status: SubmissionStatus,
    body: React.ReactNode,
    actions: React.ReactNode
  ) => {
    const open = expandedId === key;
    return (
      <li
        key={key}
        className="rounded-lg border border-white/10 bg-black/30 overflow-hidden"
      >
        <button
          type="button"
          className="w-full flex items-center justify-between gap-3 px-3 py-3 text-left hover:bg-white/[0.03]"
          onClick={() => setExpandedId(open ? null : key)}
        >
          <span className="font-medium text-sm text-violet-100 truncate">
            {title}
          </span>
          <span
            className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${statusBadgeClass(status)}`}
          >
            {status}
          </span>
        </button>
        {open ? (
          <div className="px-3 pb-4 text-sm text-white/75 border-t border-white/8">
            {body}
            {actions}
          </div>
        ) : null}
      </li>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-white/40 text-sm p-8">
        Loading submissions…
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <h2 className="text-sm font-semibold text-violet-100">{labels.title}</h2>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as QueueFilter)}
            className="admin-input text-xs py-1.5"
          >
            <option value="pending">Pending only</option>
            <option value="all">All statuses</option>
          </select>
          <button
            type="button"
            onClick={() => load()}
            className="admin-btn admin-btn--ghost"
            title={labels.reload}
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {message ? (
        <p className="px-4 py-2 text-sm text-violet-200/90 bg-violet-950/30 border-b border-violet-500/20">
          {message}
        </p>
      ) : null}

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/45 mb-3">
            {labels.pendingPlaces} ({places.length})
          </h3>
          {places.length === 0 ? (
            <p className="text-sm text-white/35">{labels.empty}</p>
          ) : (
            <ul className="space-y-2">
              {places.map((s) =>
                renderCard(
                  `place-${s.id}`,
                  s.name,
                  s.status,
                  <>
                    <p className="text-white/55">
                      {s.city}, {s.region} · {String(s.category)}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap">{s.description}</p>
                    {s.history ? (
                      <p className="mt-2 text-xs text-white/45">
                        <strong>History:</strong> {s.history}
                      </p>
                    ) : null}
                    {s.legend ? (
                      <p className="mt-1 text-xs text-white/45">
                        <strong>Legend:</strong> {s.legend}
                      </p>
                    ) : null}
                    {s.convertedPlaceId ? (
                      <p className="mt-2 text-xs text-emerald-300/80">
                        Draft place id: {s.convertedPlaceId}
                      </p>
                    ) : null}
                    {renderMeta(s)}
                  </>,
                  renderActions("place", s.id, { canConvert: true })
                )
              )}
            </ul>
          )}
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/45 mb-3">
            {labels.pendingImages} ({media.length})
          </h3>
          {media.length === 0 ? (
            <p className="text-sm text-white/35">{labels.empty}</p>
          ) : (
            <ul className="space-y-2">
              {media.map((s) =>
                renderCard(
                  `media-${s.id}`,
                  s.caption || s.url.slice(0, 48),
                  s.status,
                  <>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-300 hover:underline break-all"
                    >
                      {labels.openUrl}
                    </a>
                    {s.caption ? (
                      <p className="mt-2">{s.caption}</p>
                    ) : null}
                    <p className="mt-2 text-xs text-white/45">
                      {s.placeId
                        ? placeNameById.get(s.placeId) ?? s.placeId
                        : s.placeName ?? "—"}
                    </p>
                    {s.attachedToPlaceId ? (
                      <p className="text-xs text-emerald-300/80">
                        Attached: {s.attachedToPlaceId}
                      </p>
                    ) : null}
                    {renderMeta(s)}
                  </>,
                  renderActions("media", s.id, { canAttach: true })
                )
              )}
            </ul>
          )}
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/45 mb-3">
            {labels.pendingVideos} ({videos.length})
          </h3>
          {videos.length === 0 ? (
            <p className="text-sm text-white/35">{labels.empty}</p>
          ) : (
            <ul className="space-y-2">
              {videos.map((s) =>
                renderCard(
                  `video-${s.id}`,
                  s.caption || s.url.slice(0, 48),
                  s.status,
                  <>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-300 hover:underline break-all"
                    >
                      {labels.openUrl} ({s.platform ?? "link"})
                    </a>
                    {s.caption ? (
                      <p className="mt-2">{s.caption}</p>
                    ) : null}
                    <p className="mt-2 text-xs text-white/45">
                      {s.placeId
                        ? placeNameById.get(s.placeId) ?? s.placeId
                        : s.placeName ?? "—"}
                    </p>
                    {s.attachedToPlaceId ? (
                      <p className="text-xs text-emerald-300/80">
                        Attached: {s.attachedToPlaceId}
                      </p>
                    ) : null}
                    {renderMeta(s)}
                  </>,
                  renderActions("video", s.id, { canAttach: true })
                )
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
