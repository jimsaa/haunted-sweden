import fs from "fs";
const data = JSON.parse(fs.readFileSync("data/haunted-places.json", "utf8"));
const remote = [];
for (const p of data.places) {
  for (const img of p.images || []) {
    if (/^https?:\/\//i.test((img.url || "").trim())) {
      remote.push({ slug: p.slug, url: img.url });
    }
  }
}
console.log("Remote images[] URLs:", remote.length);
for (const r of remote) console.log(`${r.slug}\t${r.url}`);
