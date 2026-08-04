/**
 * Import Google Search Console CSV export folder into data/seo/search-console/
 *
 * Usage:
 *   node scripts/import-gsc-export.mjs "C:\Users\...\hauntedsweden.se-Performance-on-Search-2026-08-04" 2026-07
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outRoot = path.join(root, "data", "seo", "search-console");

const sourceDir = process.argv[2];
const period = process.argv[3] || "2026-07";

if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error("Usage: node scripts/import-gsc-export.mjs <export-folder> [YYYY-MM]");
  process.exit(1);
}

function readCsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return row;
  });
}

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

function parsePct(v) {
  if (v == null || v === "") return 0;
  return Number(String(v).replace("%", "").replace(",", ".").trim()) || 0;
}

function parseNum(v) {
  if (v == null || v === "") return 0;
  return Number(String(v).replace(",", ".").trim()) || 0;
}

function metricRow(row) {
  return {
    clicks: parseNum(row.Klick ?? row.Clicks),
    impressions: parseNum(row.Exponeringar ?? row.Impressions),
    ctr: parsePct(row.CTR),
    position: parseNum(row.position ?? row.Position),
  };
}

function findFile(dir, candidates) {
  const files = fs.readdirSync(dir);
  for (const name of candidates) {
    const hit = files.find((f) => f.toLowerCase() === name.toLowerCase());
    if (hit) return path.join(dir, hit);
  }
  // fuzzy for encoding-mangled names
  for (const f of files) {
    const lower = f.toLowerCase();
    if (candidates.some((c) => lower.includes(c.toLowerCase().slice(0, 5)))) {
      return path.join(dir, f);
    }
  }
  return null;
}

const filterPath = findFile(sourceDir, ["Filter.csv"]);
const pagesPath = findFile(sourceDir, ["Sidor.csv", "Pages.csv"]);
const queriesPath = findFile(sourceDir, ["Frågor.csv", "Queries.csv", "Frgor.csv"]);
const diagramPath = findFile(sourceDir, ["Diagram.csv", "Chart.csv"]);
const devicesPath = findFile(sourceDir, ["Enheter.csv", "Devices.csv"]);
const countriesPath = findFile(sourceDir, ["Länder.csv", "Countries.csv", "Lnder.csv"]);

const filterRows = filterPath ? readCsv(filterPath) : [];
const filter = Object.fromEntries(
  filterRows.map((r) => [r.Filtrera || r.Filter, r.Värde || r.Value])
);

function pagePathFromUrl(url) {
  try {
    const u = new URL(url);
    return u.pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
}

const pagesRaw = pagesPath
  ? readCsv(pagesPath).map((r) => {
      const url = r["Populäraste sidorna"] || r["Top pages"] || r[Object.keys(r)[0]];
      return {
        url,
        path: pagePathFromUrl(url),
        ...metricRow(r),
      };
    })
  : [];

/** Aggregate www + apex for same path */
const pagesByPath = new Map();
for (const p of pagesRaw) {
  const prev = pagesByPath.get(p.path) || {
    path: p.path,
    clicks: 0,
    impressions: 0,
    positionWeighted: 0,
    urls: [],
  };
  prev.clicks += p.clicks;
  prev.impressions += p.impressions;
  prev.positionWeighted += p.position * p.impressions;
  prev.urls.push(p.url);
  pagesByPath.set(p.path, prev);
}

const pagesAggregated = [...pagesByPath.values()]
  .map((p) => ({
    path: p.path,
    clicks: p.clicks,
    impressions: p.impressions,
    ctr:
      p.impressions > 0
        ? Math.round((p.clicks / p.impressions) * 10000) / 100
        : 0,
    position:
      p.impressions > 0
        ? Math.round((p.positionWeighted / p.impressions) * 100) / 100
        : 0,
    urls: [...new Set(p.urls)],
  }))
  .sort((a, b) => b.impressions - a.impressions);

const queries = queriesPath
  ? readCsv(queriesPath).map((r) => {
      const query = r["Vanligaste frågorna"] || r["Top queries"] || r[Object.keys(r)[0]];
      return { query, ...metricRow(r) };
    })
  : [];

const daily = diagramPath
  ? readCsv(diagramPath).map((r) => ({
      date: r.Datum || r.Date,
      ...metricRow(r),
    }))
  : [];

const devices = devicesPath
  ? readCsv(devicesPath).map((r) => ({
      device: r.Enhet || r.Device,
      ...metricRow(r),
    }))
  : [];

const countries = countriesPath
  ? readCsv(countriesPath).map((r) => ({
      country: r.Land || r.Country,
      ...metricRow(r),
    }))
  : [];

const totals = pagesAggregated.reduce(
  (acc, p) => {
    acc.clicks += p.clicks;
    acc.impressions += p.impressions;
    return acc;
  },
  { clicks: 0, impressions: 0 }
);
// Prefer daily chart totals if present (site-wide)
const dailyTotals = daily.reduce(
  (acc, d) => {
    acc.clicks += d.clicks;
    acc.impressions += d.impressions;
    acc.positionWeighted += d.position * d.impressions;
    return acc;
  },
  { clicks: 0, impressions: 0, positionWeighted: 0 }
);

const snapshot = {
  period,
  importedAt: new Date().toISOString(),
  source: path.basename(sourceDir),
  filter: {
    searchType: filter["Söktyp"] || filter["Search type"] || "Web",
    dateRange: filter.Datum || filter.Date || period,
  },
  totals: {
    clicks: dailyTotals.clicks || totals.clicks,
    impressions: dailyTotals.impressions || totals.impressions,
    ctr:
      (dailyTotals.impressions || totals.impressions) > 0
        ? Math.round(
            ((dailyTotals.clicks || totals.clicks) /
              (dailyTotals.impressions || totals.impressions)) *
              10000
          ) / 100
        : 0,
    position:
      dailyTotals.impressions > 0
        ? Math.round((dailyTotals.positionWeighted / dailyTotals.impressions) * 100) /
          100
        : 0,
  },
  priorityFocus: pagesAggregated
    .filter((p) => p.impressions >= 50)
    .slice(0, 10)
    .map((p) => ({
      path: p.path,
      impressions: p.impressions,
      clicks: p.clicks,
      ctr: p.ctr,
      position: p.position,
      note:
        p.ctr < 3 && p.impressions >= 100
          ? "High impressions, low CTR — meta/content sprint"
          : p.position >= 8 && p.position <= 20
            ? "Page 2 / edge of page 1 — ranking sprint"
            : "Monitor",
    })),
  pages: pagesAggregated,
  pagesRaw,
  queries,
  daily,
  devices,
  countries,
};

const periodDir = path.join(outRoot, period);
fs.mkdirSync(periodDir, { recursive: true });
fs.writeFileSync(path.join(periodDir, "snapshot.json"), JSON.stringify(snapshot, null, 2) + "\n");

// Copy raw CSVs for audit trail
const rawDir = path.join(periodDir, "raw");
fs.mkdirSync(rawDir, { recursive: true });
for (const f of fs.readdirSync(sourceDir)) {
  if (f.toLowerCase().endsWith(".csv")) {
    fs.copyFileSync(path.join(sourceDir, f), path.join(rawDir, f));
  }
}

// Update index
const indexPath = path.join(outRoot, "index.json");
let index = { months: [] };
if (fs.existsSync(indexPath)) {
  index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
}
index.months = [...new Set([...(index.months || []), period])].sort().reverse();
index.latest = index.months[0];
index.updatedAt = new Date().toISOString();
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");

console.log("Imported", period);
console.log("Totals", snapshot.totals);
console.log("Top pages by impressions:");
pagesAggregated.slice(0, 8).forEach((p) =>
  console.log(
    `  ${p.path}  imp=${p.impressions} clk=${p.clicks} ctr=${p.ctr}% pos=${p.position}`
  )
);
console.log("Priority focus:", snapshot.priorityFocus.map((p) => p.path).join(", "));
