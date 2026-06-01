import {
  getIndexNowHost,
  getIndexNowKey,
  getIndexNowKeyLocation,
  INDEXNOW_ENDPOINTS,
  isIndexNowEnabled,
} from "@/lib/indexnow/config";

const MAX_URLS_PER_REQUEST = 10_000;

/**
 * Notify Bing and IndexNow partners about URL changes.
 * Fire-and-forget safe — logs errors, never throws to callers.
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<{
  submitted: boolean;
  urlCount: number;
  errors: string[];
}> {
  const unique = [...new Set(urls.map((u) => u.trim()).filter(Boolean))];
  if (unique.length === 0) {
    return { submitted: false, urlCount: 0, errors: [] };
  }

  if (!(await isIndexNowEnabled())) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[indexnow] Skipped — set INDEXNOW_KEY (run: npm run indexnow:generate-key)"
      );
    }
    return { submitted: false, urlCount: unique.length, errors: [] };
  }

  const key = await getIndexNowKey();
  if (!key) {
    return { submitted: false, urlCount: unique.length, errors: ["missing key"] };
  }

  const host = getIndexNowHost();
  const keyLocation = await getIndexNowKeyLocation(key);
  const errors: string[] = [];

  for (let i = 0; i < unique.length; i += MAX_URLS_PER_REQUEST) {
    const urlList = unique.slice(i, i + MAX_URLS_PER_REQUEST);
    const body = JSON.stringify({ host, key, keyLocation, urlList });

    await Promise.all(
      INDEXNOW_ENDPOINTS.map(async (endpoint) => {
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body,
          });
          if (!res.ok && res.status !== 202) {
            const text = await res.text().catch(() => "");
            errors.push(`${endpoint}: HTTP ${res.status} ${text.slice(0, 120)}`);
            console.error("[indexnow]", endpoint, res.status, text);
          } else {
            console.info(
              `[indexnow] Submitted ${urlList.length} URL(s) via ${endpoint}`
            );
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          errors.push(`${endpoint}: ${msg}`);
          console.error("[indexnow]", endpoint, err);
        }
      })
    );
  }

  return {
    submitted: errors.length < INDEXNOW_ENDPOINTS.length,
    urlCount: unique.length,
    errors,
  };
}
