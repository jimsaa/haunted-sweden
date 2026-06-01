/** Safe admin API error for clients; detailed in development only. */
export function formatSubmissionApiError(
  err: unknown,
  fallback: string
): string {
  if (process.env.NODE_ENV === "production") {
    return fallback;
  }
  if (err instanceof Error && err.message) {
    return `${fallback}: ${err.message}`;
  }
  return fallback;
}
