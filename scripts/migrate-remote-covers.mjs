/**

 * Download remote coverImage URLs → public/places/{slug}-cover.{ext}

 * Also migrates remote images[] gallery URLs.

 * Updates haunted-places.json coverImage + images[] credit.

 * Run: node scripts/migrate-remote-covers.mjs [--dry-run]

 */

import fs from "fs";

import path from "path";

import { fileURLToPath } from "url";

import { execFileSync } from "child_process";



const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.join(__dirname, "..");

const dataFile = path.join(root, "data", "haunted-places.json");

const placesDir = path.join(root, "public", "places");

const dryRun = process.argv.includes("--dry-run");

const MIN_BYTES = 1000;

const UA = "HauntedSwedenBot/1.0 (+https://haunted-sweden.se)";



fs.mkdirSync(placesDir, { recursive: true });



function isRemote(url) {

  return /^https?:\/\//i.test((url || "").trim());

}



function extFromContentType(ct) {

  const map = {

    "image/jpeg": ".jpg",

    "image/jpg": ".jpg",

    "image/png": ".png",

    "image/webp": ".webp",

    "image/gif": ".gif",

    "image/avif": ".avif",

    "image/svg+xml": ".svg",

  };

  if (!ct) return null;

  const base = ct.split(";")[0].trim().toLowerCase();

  return map[base] || null;

}



function extFromUrl(url) {

  try {

    const u = new URL(url);

    const base = path.basename(u.pathname).split("?")[0];

    const m = base.match(/\.(jpe?g|png|webp|gif|avif|svg)$/i);

    if (m) return "." + m[1].toLowerCase().replace("jpeg", "jpg");

  } catch {

    /* ignore */

  }

  return ".jpg";

}



function creditFromUrl(url) {

  try {

    const host = new URL(url).hostname.replace(/^www\./, "");

    if (/wikimedia\.org$/i.test(host) || /wikipedia\.org$/i.test(host)) {

      return "Wikimedia Commons";

    }

    if (/gstatic\.com$/i.test(host)) return "Google Images (thumbnail)";

    if (/tripadvisor\.com$/i.test(host)) return "Tripadvisor";

    if (/bstatic\.com$/i.test(host)) return "Booking.com";

    if (/ctfassets\.net$/i.test(host)) return "Contentful CDN";

    return host;

  } catch {

    return "Original source";

  }

}



function headContentType(url) {

  try {

    const out = execFileSync(

      "curl.exe",

      ["-sI", "-A", UA, "-L", "--max-time", "30", url],

      { encoding: "utf8", maxBuffer: 1024 * 64 }

    );

    const line = out.split(/\r?\n/).find((l) => /^content-type:/i.test(l));

    return line ? line.split(":").slice(1).join(":").trim() : null;

  } catch {

    return null;

  }

}



function download(url, dest) {

  execFileSync(

    "curl.exe",

    ["-sL", "-A", UA, "--max-time", "60", "-o", dest, url],

    { stdio: "pipe" }

  );

}



function captionForPlace(place) {

  const name = place.englishName || place.name;

  return `${name}${place.city ? `, ${place.city}` : ""}`;

}



function galleryBasename(url, slug, index) {

  try {

    const base = path.basename(new URL(url).pathname).replace(/\.[^.]+$/, "");

    const safe = base.replace(/[^a-zA-Z0-9_-]+/g, "-").slice(0, 40);

    return `${slug}-${safe || `gallery-${index + 1}`}`;

  } catch {

    return `${slug}-gallery-${index + 1}`;

  }

}



function downloadToLocal(url, basename) {

  let ext = extFromUrl(url);

  const ct = headContentType(url);

  const ctExt = extFromContentType(ct);

  if (ctExt) ext = ctExt;



  const filePath = path.join(placesDir, `${basename}${ext}`);

  const localPath = `/places/${basename}${ext}`;



  if (fs.existsSync(filePath) && fs.statSync(filePath).size >= MIN_BYTES) {

    return { localPath, filePath, size: fs.statSync(filePath).size, skipped: true };

  }



  download(url, filePath);

  const size = fs.existsSync(filePath) ? fs.statSync(filePath).size : 0;

  if (size < MIN_BYTES) {

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    throw new Error(`too small (${size} bytes)`);

  }

  return { localPath, filePath, size, skipped: false };

}



function ensureCoverImageEntry(place, localPath, sourceUrl) {

  const credit = creditFromUrl(sourceUrl);

  const caption = captionForPlace(place);

  const entry = {

    url: localPath,

    caption,

    captionSv: caption,

    credit,

    status: "approved",

  };



  if (!Array.isArray(place.images)) place.images = [];



  const idx = place.images.findIndex(

    (img) => isRemote(img?.url) && img.url.trim() === sourceUrl.trim()

  );

  const coverIdx = place.images.findIndex((img) => img?.url === localPath);



  if (idx >= 0) {

    place.images[idx] = { ...place.images[idx], ...entry };

  } else if (coverIdx >= 0) {

    place.images[coverIdx] = { ...place.images[coverIdx], ...entry };

  } else if (place.images.length === 0) {

    place.images.push(entry);

  } else {

    const firstRemote = place.images.findIndex((img) => isRemote(img?.url));

    if (firstRemote >= 0) {

      place.images[firstRemote] = { ...place.images[firstRemote], ...entry };

    } else {

      place.images.unshift(entry);

    }

  }



  if (typeof place.photoCount === "number" && place.photoCount < place.images.length) {

    place.photoCount = place.images.length;

  } else if (place.photoCount === 0 && place.images.length > 0) {

    place.photoCount = place.images.length;

  }

}



const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));

const remotePlaces = data.places.filter((p) => isRemote(p.coverImage));



console.log(`Found ${remotePlaces.length} remote covers${dryRun ? " (dry-run)" : ""}`);



const results = { ok: [], skip: [], fail: [] };



for (const place of remotePlaces) {

  const url = place.coverImage.trim();

  const slug = place.slug;



  if (dryRun) {

    console.log(`Would download cover: ${slug} ← ${url}`);

    continue;

  }



  try {

    const { localPath, size, skipped } = downloadToLocal(url, `${slug}-cover`);

    place.coverImage = localPath;

    ensureCoverImageEntry(place, localPath, url);

    if (skipped) results.skip.push({ slug, file: localPath });

    else results.ok.push({ slug, localPath, size, url });

    console.log(`${skipped ? "↷" : "✓"} ${slug} → ${localPath} (${size} bytes)`);

  } catch (err) {

    results.fail.push({ slug, url, reason: err.message || String(err) });

    console.error(`✗ ${slug}: ${err.message || err}`);

  }

}



// Gallery images (non-cover)

let galleryRemote = 0;

for (const place of data.places) {

  for (let i = 0; i < (place.images || []).length; i++) {

    const img = place.images[i];

    if (!isRemote(img?.url)) continue;

    galleryRemote++;

    const url = img.url.trim();

    const basename = galleryBasename(url, place.slug, i);



    if (dryRun) {

      console.log(`Would download gallery: ${place.slug}[${i}] ← ${url}`);

      continue;

    }



    try {

      const { localPath, size, skipped } = downloadToLocal(url, basename);

      place.images[i] = {

        ...img,

        url: localPath,

        credit: img.credit || creditFromUrl(url),

      };

      if (skipped) results.skip.push({ slug: place.slug, file: localPath });

      else results.ok.push({ slug: place.slug, localPath, size, url });

      console.log(`${skipped ? "↷" : "✓"} ${place.slug} gallery → ${localPath} (${size} bytes)`);

    } catch (err) {

      results.fail.push({ slug: place.slug, url, reason: err.message || String(err) });

      console.error(`✗ ${place.slug} gallery: ${err.message || err}`);

    }

  }

}



if (galleryRemote === 0 && remotePlaces.length === 0) {

  console.log("Nothing to migrate.");

}



if (!dryRun) {

  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2) + "\n");

}



console.log("\n--- Summary ---");

console.log(`Downloaded: ${results.ok.length}`);

console.log(`Skipped (existing): ${results.skip.length}`);

console.log(`Failed: ${results.fail.length}`);



if (results.fail.length) {

  console.log("\nFailures:");

  for (const f of results.fail) {

    console.log(`  ${f.slug}: ${f.reason}`);

    console.log(`    ${f.url}`);

  }

}


