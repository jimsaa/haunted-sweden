import { appendFile, mkdir } from "fs/promises";
import path from "path";

export type SecurityEventType =
  | "geo_blocked"
  | "rate_limited"
  | "login_failed"
  | "login_blocked"
  | "captcha_failed"
  | "login_success"
  | "session_expired"
  | "unauthorized_api";

export type SecurityLogEntry = {
  type: SecurityEventType;
  timestamp: string;
  ip: string;
  country?: string | null;
  username?: string;
  path?: string;
  reason: string;
};

const LOG_DIR = path.join(process.cwd(), "data", "admin-security");
const LOG_FILE = path.join(LOG_DIR, "security-events.log");

let logDirReady = false;

async function ensureLogDir(): Promise<void> {
  if (logDirReady) return;
  try {
    await mkdir(LOG_DIR, { recursive: true });
    logDirReady = true;
  } catch {
    /* ignore */
  }
}

/** Server-side audit log — never includes passwords. */
export function logSecurityEvent(
  entry: Omit<SecurityLogEntry, "timestamp"> & { timestamp?: string }
): void {
  const line: SecurityLogEntry = {
    ...entry,
    timestamp: entry.timestamp ?? new Date().toISOString(),
  };

  const payload = JSON.stringify(line);
  console.warn("[admin-security]", payload);

  void (async () => {
    try {
      await ensureLogDir();
      await appendFile(LOG_FILE, `${payload}\n`, "utf8");
    } catch {
      /* Vercel read-only FS — console only */
    }
  })();
}
