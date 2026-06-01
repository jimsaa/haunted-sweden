import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 30 * 60 * 1000;
const MAX_FAILURES = 5;
export const CAPTCHA_AFTER_FAILURES = 2;

type IpRateRecord = {
  failures: number[];
  blockedUntil: number | null;
};

const memory = new Map<string, IpRateRecord>();
const STORE_PATH = path.join(
  process.cwd(),
  "data",
  "admin-security",
  "login-rate-limit.json"
);

function emptyRecord(): IpRateRecord {
  return { failures: [], blockedUntil: null };
}

function pruneFailures(timestamps: number[]): number[] {
  const cutoff = Date.now() - WINDOW_MS;
  return timestamps.filter((t) => t > cutoff);
}

async function loadStore(): Promise<Record<string, IpRateRecord>> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as Record<string, IpRateRecord>;
  } catch {
    return {};
  }
}

async function persistStore(data: Record<string, IpRateRecord>): Promise<void> {
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch {
    /* ignore on serverless */
  }
}

function getRecord(ip: string, store?: Record<string, IpRateRecord>): IpRateRecord {
  const fromMemory = memory.get(ip);
  if (fromMemory) {
    return {
      failures: pruneFailures(fromMemory.failures),
      blockedUntil: fromMemory.blockedUntil,
    };
  }
  const fromDisk = store?.[ip];
  if (!fromDisk) return emptyRecord();
  return {
    failures: pruneFailures(fromDisk.failures ?? []),
    blockedUntil: fromDisk.blockedUntil ?? null,
  };
}

function saveRecord(ip: string, record: IpRateRecord, store: Record<string, IpRateRecord>): void {
  memory.set(ip, record);
  store[ip] = record;
}

export function isLoginRateLimited(record: IpRateRecord): boolean {
  if (record.blockedUntil && Date.now() < record.blockedUntil) return true;
  return false;
}

export function loginRequiresCaptcha(record: IpRateRecord): boolean {
  const failures = pruneFailures(record.failures);
  return failures.length >= CAPTCHA_AFTER_FAILURES;
}

export async function getLoginRateState(ip: string): Promise<{
  record: IpRateRecord;
  blocked: boolean;
  requireCaptcha: boolean;
  failureCount: number;
}> {
  const store = await loadStore();
  const record = getRecord(ip, store);
  return {
    record,
    blocked: isLoginRateLimited(record),
    requireCaptcha: loginRequiresCaptcha(record),
    failureCount: pruneFailures(record.failures).length,
  };
}

export async function recordLoginFailure(ip: string): Promise<{
  blocked: boolean;
  requireCaptcha: boolean;
  failureCount: number;
}> {
  const store = await loadStore();
  const record = getRecord(ip, store);
  const failures = pruneFailures(record.failures);
  failures.push(Date.now());

  let blockedUntil = record.blockedUntil;
  if (failures.length >= MAX_FAILURES) {
    blockedUntil = Date.now() + BLOCK_MS;
  }

  const next: IpRateRecord = { failures, blockedUntil };
  saveRecord(ip, next, store);
  await persistStore(store);

  return {
    blocked: isLoginRateLimited(next),
    requireCaptcha: loginRequiresCaptcha(next),
    failureCount: failures.length,
  };
}

export async function clearLoginFailures(ip: string): Promise<void> {
  const store = await loadStore();
  memory.delete(ip);
  delete store[ip];
  await persistStore(store);
}
