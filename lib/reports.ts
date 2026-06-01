import reportsFile from "@/data/place-reports.json";
import type { PlaceReport } from "@/lib/types/place";

const data = reportsFile as { reports: PlaceReport[] };

/** All reports (any status) — for moderation pipelines. */
export function getAllReports(): PlaceReport[] {
  return data.reports;
}

/** Approved reports shown on place detail pages. Match `placeId` to location `id`. */
export function getReportsForPlace(placeId: string): PlaceReport[] {
  return data.reports.filter(
    (r) => r.placeId === placeId && r.status === "approved"
  );
}

export function getPendingReportsForPlace(placeId: string): PlaceReport[] {
  return data.reports.filter(
    (r) => r.placeId === placeId && r.status === "pending"
  );
}
