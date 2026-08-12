import fs from "fs";
const data = JSON.parse(fs.readFileSync("data/haunted-places.json", "utf8"));
const remote = data.places.filter((p) => /^https?:\/\//i.test((p.coverImage || "").trim()));
console.log("Remote covers:", remote.length);
for (const p of remote) {
  console.log(`${p.id}\t${p.slug}\t${p.coverImage}`);
}
