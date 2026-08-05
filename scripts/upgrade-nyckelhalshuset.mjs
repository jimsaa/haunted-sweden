/**
 * Upgrade Nyckelhålshuset (id 32) with full DOCUMENTED vs URBAN LEGEND research.
 * Run: node scripts/upgrade-nyckelhalshuset.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverJpg = path.join(root, "public", "places", "nyckelhalshuset-cover.jpg");
const coverPng = path.join(root, "public", "places", "nyckelhalshuset-cover.png");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/Sveagatan_2.jpg";

fs.mkdirSync(path.dirname(coverJpg), { recursive: true });
if (!fs.existsSync(coverJpg) || fs.statSync(coverJpg).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverJpg, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
const idx = data.places.findIndex((p) => p.slug === "nyckelhalshuset");
if (idx < 0) {
  console.error("nyckelhalshuset not found");
  process.exit(1);
}

const coverImage =
  fs.existsSync(coverJpg) && fs.statSync(coverJpg).size > 1000
    ? "/places/nyckelhalshuset-cover.jpg"
    : fs.existsSync(coverPng)
      ? "/places/nyckelhalshuset-cover.png"
      : "/places/nyckelhalshuset-cover.jpg";

const upgrade = {
  id: "32",
  slug: "nyckelhalshuset",
  name: "Nyckelhålshuset – Arthur Lowells plakett",
  englishName: "The Keyhole House – Arthur Lowell Plaque",
  coverImage,
  category: "Urban Legend",
  city: "Göteborg",
  region: "Västra Götaland",
  country: "Sweden",
  address: "Sveagatan 2, 413 14 Göteborg, Sweden",
  latitude: 57.6952,
  longitude: 11.9535,
  featured: true,
  verified: false,
  verificationLevel: "community-verified",
  verifiedByTeam: false,
  visitedByTeam: false,
  visitCount: data.places[idx].visitCount ?? 0,
  lastInvestigationDate: null,
  investigationPhotos: [],
  investigationVideos: [],
  overnightInvestigation: false,
  hauntingLevel: 3,
  hauntedSwedenScore: 8.8,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "nyckelhalshuset",
    "sveagatan2",
    "goteborg",
    "percival_lowell",
    "arthur_lowell",
    "urban_legend",
    "haunted_building",
    "mystery_plaque",
    "jugend",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Nyckelhålshuset at Sveagatan 2 in Linnéstaden is one of Göteborg’s strangest modern urban legends. The 1903 Jugend corner house by architects R. Hanson and K. A. Löfmark is named for its keyhole-shaped entrance — a genuine architectural curiosity. Beside the door sits a bronze-style plaque claiming a tall, slim, headless ghost: “astronomer Arthur Lowell,” discoverer of the canals on Mars, who supposedly stayed on the second floor 3–16 June 1909. There is no verified evidence that Percival Lowell (the real Mars-canal astronomer the plaque almost certainly riffs on) lived here — or that any haunting is historical fact. Atlas Obscura and secondary sources identify the sign as a leftover from Thomas Liljenberg’s 1998 public-art project Gothenburg Haunts, which mixed fact and fiction across the city; the plaque outlived the temporary project and became folklore. Göteborg.com still lists the house among haunted city stops. Visit from the pavement only: blue hour and night photography make this a perfect history-versus-myth stop.",
  whyItFitsHauntedSweden:
    "One of Sweden’s best modern urban legends: unique mystery plaque, beautiful Jugend architecture, and a clear documented vs invented split. Visual 8.5/10, historical 8.5/10, urban-legend strength 10/10, paranormal reputation 7.5/10, curiosity 10/10 — Haunted Sweden Score 8.8. Premium MEDIUM–HIGH; research confidence HIGH (building) / MEDIUM (legend & plaque origin details).",
  shortDescription:
    "1903 Jugend keyhole-entrance house at Sveagatan 2 — famous for a faux “Arthur Lowell” ghost plaque rooted in modern public art, not verified history.",
  history: `## DOCUMENTED: Construction 1903 and architects

Nyckelhålshuset stands at Sveagatan 2 (corner Risåsgatan), kvarteret Vaktposten, Kommendantsängen / Linnéstaden, Göteborg. Wikimedia Commons and local estate/heritage descriptions record construction in **1903** after drawings by architects **R. Hanson** and **K. A. Löfmark** (Hanson & Löfmark). It is a residential stone apartment house from the early-1900s expansion of western Göteborg, when Linné filled with freer multi-storey façades influenced by **Jugend / Art Nouveau**.

## DOCUMENTED: Architecture and the keyhole nickname

The well-preserved exterior mixes light smooth render, red brick and limestone, with plant ornament, undulating eaves and two prominent corner turrets. The staircase entrance is uniquely **keyhole-shaped** — the feature that gave the building (and Brf Nyckelhålet) its popular name **Nyckelhålshuset**. Stair hall details include ceiling rose and wall ornament; a small front garden with wrought-iron railing sits before the portal. Period apartments retain high ceilings, mouldings and timber floors typical of the era. Later attic conversion added loft flats while keeping the landmark exterior (estate press ~2020).

## DOCUMENTED: Linnéstaden context

Around 1900 Linné / Kommendantsängen developed as a dense residential district of café streets, trams and monumental stone blocks near Skansberget — part of Göteborg’s westward growth after the wooden-city era. The house remains a private housing cooperative; the exterior and plaque are the public curiosity.

## DOCUMENTED: Percival Lowell (the real astronomer)

**Percival Lowell** (1855–1916) was a real American astronomer whose Mars “canal” maps fuelled popular speculation about intelligent life — later explained as optical illusion / pareidolia. He is **not** documented as a resident of Sveagatan 2. Haunted Sweden found **no verified primary evidence** that Lowell visited Göteborg in June 1909 or stayed in this building. The plaque’s “Arthur Lowell” is a **fictional / playful name** attached to Lowell’s public fame.

## Preservation / access

Exterior publicly viewable from the street (corner Sveagatan / Risåsgatan). Active private residence — do not enter. Nearest transit often cited as Prinsgatan (Atlas Obscura).`,

  legend: `## URBAN LEGEND / PUBLIC ART: The Lowell plaque (not historical monument)

**Plaque wording** (English paraphrase widely published; Swedish façade text equivalent): that the house is haunted by a tall, slim, headless man — the ghost of astronomer **Arthur Lowell**, “discoverer of the canals on Mars,” who stayed in a second-floor apartment **3–16 June 1909**.

### Who commissioned it / when it appeared

According to **Atlas Obscura** (and matching secondary coverage), the sign is a remnant of Swedish artist **Thomas Liljenberg**’s **1998** public-art project ***Gothenburg Haunts***: temporary plaques around Göteborg blending real city history with invented stories to make familiar places feel strange again. The Keyhole House plaque was meant to be temporary; it remained, and the fiction took root as local legend. Treat this as the best-documented origin for the plaque — an **art intervention**, not a parish or municipal historical marker.

### Why “Arthur” / Percival?

The figure evokes **Percival Lowell**; “Arthur” is almost certainly an intentional twist or artistic error. There is **no verified historical evidence** that Lowell haunted — or lived in — the building. Göteborg & Co / Göteborg.com retell the plaque story in haunted-city guides without claiming archival proof of the stay.

### Public reaction

Residents, ghost hunters and tourists have reacted with unease, curiosity and amusement for years. The site appears on official tourism haunted guides and Atlas Obscura — a rare case where **modern public art became urban folklore**.

## FOLKLORE / MODERN WITNESS MOTIFS (anecdotal)

Headless tall man near the entrance; unease at the plaque; ghost-walk stop reputation. No controlled paranormal investigation with scientific standing was located. Do not exaggerate: reputation = plaque + tourism storytelling.

## Special points of interest

1. **Bronze / metal plaque** — main attraction; source of the legend (art-project remnant).
2. **Keyhole entrance** — unique 1903 architectural feature.
3. **Historic Jugend façade** — turrets, ornament, render/brick/limestone.

## Atmosphere, investigation ideas, best conditions

Quiet residential corner, decorative Jugend façade, keyhole portal, one of Göteborg’s best hidden curiosities. Ideas: Who created the Lowell plaque?; fact vs fiction; newspaper-archive search; did Percival Lowell ever visit Göteborg?; history vs urban legend documentary. Best: evening, blue hour, night photography. Respect residents — pavement only.`,

  safetyNote:
    "Private residential building (Brf Nyckelhålet). View the keyhole entrance and plaque only from the public pavement. Do not enter the property, block the doorway, ring buzzers without reason, or disturb residents. Keep noise low, especially at night.",

  sourceLinks: [
    "https://www.goteborg.com/guider/guide-hemsokta-platser-i-goteborg",
    "https://www.atlasobscura.com/places/keyhole-house-ghost-plaque",
    "https://commons.wikimedia.org/wiki/File:Sveagatan_2.jpg",
    "https://press.bjurfors.se/pressreleases/bjurfors-foermedlar-vindsvaaningar-i-linnestaden-2979104",
    "https://thomasliljenberg.se/about-personal/",
    "https://www.expressen.se/gt/har-ar-platserna-dar-det-sags-spoka-i-goteborg/",
  ],

  paranormalType: [
    "Apparition",
    "Urban Legend",
    "Local Folklore",
    "Heavy Atmosphere",
  ],
  accessType: "Public Landmark",
  familyFriendly: true,
  visitDifficulty: 1,
  nightAccess: true,
  parkingAvailable: false,
  guidedTours: false,
  publicAccess: true,
  evidenceCount: 0,
  reportCount: 0,
  photoCount: 1,
  videoCount: 0,
  googlePlaceId: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sveagatan+2,+413+14+G%C3%B6teborg,+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: coverImage,
      caption: "Nyckelhålshuset, Sveagatan 2 — Jugend corner house with keyhole entrance",
      captionSv: "Nyckelhålshuset, Sveagatan 2 — jugendhörnhus med nyckelhålsentré",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Jugendhus från 1903 med nyckelhålsentré på Sveagatan 2 — berömt för en falsk ”Arthur Lowell”-spökplakett med rötter i modern offentlig konst, inte verifierad historia.",
  historySv: `## DOKUMENTERAT: Bygge 1903 och arkitekter

Nyckelhålshuset vid Sveagatan 2 (hörn Risåsgatan), kvarteret Vaktposten, Kommendantsängen/Linnéstaden. Uppfört **1903** efter ritningar av **R. Hanson** och **K. A. Löfmark**. Representerar tidigt 1900-tals jugend/art nouveau i västra Göteborgs stenhusexpansion.

## DOKUMENTERAT: Arkitektur och smeknamn

Välbevarad fasad med ljus puts, rött tegel och kalksten, växtornament, hörntorn och den unika **nyckelhålsformade portalen** som gett namnet **Nyckelhålshuset** / Brf Nyckelhålet.

## DOKUMENTERAT: Percival Lowell

Verklig amerikansk astronom (1855–1916) känd för Mars-”kanaler”. **Ingen verifierad primärkälla** visar att han bodde på Sveagatan 2 eller besökte Göteborg juni 1909. ”Arthur Lowell” på plaketten är fiktion/lek med hans namn.

## Tillträde

Exteriör synlig från gatan. Privat bostad — gå inte in.`,

  legendSv: `## URBAN LEGEND / OFFENTLIG KONST: Lowell-plaketten

Plaketten hävdar att en lång, smal, huvudlös man hemsöker huset — astronomen **Arthur Lowell**, Mars kanaler, vistelse **3–16 juni 1909** i andra våningen.

### Ursprung

Enligt Atlas Obscura m.fl. rest från konstnären **Thomas Liljenbergs** projekt ***Gothenburg Haunts* (1998)** — skyltar som blandade fakta och fiktion. Projektet var tillfälligt; plaketten blev kvar och blev folklore. Inte ett historiskt minnesmärke.

### Reaktion

Boende, spökjägare och turister; listad av Göteborg.com. Modern offentlig konst som blivit urban legend.

## ANEKDOTISKA MOTIV

Huvudlös gestalt, obehag vid skylten — ej kontrollerade utredningar. OMRÅDEN: plaketten; nyckelhålsentrén; jugendfasaden. Endast trottoar.`,

  hauntedSwedenAppSummarySv:
    "Nyckelhålshuset på Sveagatan 2 i Linnéstaden är en av Göteborgs märkligaste moderna urban legends. Jugendhörnhuset från 1903 av R. Hanson och K. A. Löfmark har fått sitt namn av den nyckelhålsformade entrén. Vid dörren sitter en plakett om en lång, smal, huvudlös ”Arthur Lowell” — astronomen som upptäckte Mars kanaler och ska ha bott här 3–16 juni 1909. Det finns ingen verifierad bevisning för att Percival Lowell (den verkliga astronomen) bodde här, eller för någon historisk hemsökelse. Atlas Obscura kopplar skylten till Thomas Liljenbergs konstprojekt Gothenburg Haunts 1998. Besök från trottoaren: blåtimme och nattfoto gör platsen till ett perfekt stopp för historia kontra myt.",
  safetyNoteSv:
    "Privat bostadshus (Brf Nyckelhålet). Betrakta nyckelhålsentrén och plaketten endast från allmän trottoar. Gå inte in, blockera inte dörren eller stör boende. Håll låg volym, särskilt nattetid.",
  infoBox: [
    {
      label: "Built",
      labelSv: "Byggt",
      value: "1903 · R. Hanson & K. A. Löfmark",
      valueSv: "1903 · R. Hanson & K. A. Löfmark",
    },
    {
      label: "Style",
      labelSv: "Stil",
      value: "Jugend / Art Nouveau",
      valueSv: "Jugend / art nouveau",
    },
    {
      label: "Nickname",
      labelSv: "Smeknamn",
      value: "Nyckelhålshuset (keyhole portal)",
      valueSv: "Nyckelhålshuset (nyckelhålsport)",
    },
    {
      label: "Plaque origin",
      labelSv: "Plakettens ursprung",
      value: "Liljenberg · Gothenburg Haunts 1998 (art)",
      valueSv: "Liljenberg · Gothenburg Haunts 1998 (konst)",
    },
    {
      label: "Astronomer",
      labelSv: "Astronom",
      value: "Percival Lowell (plaque: “Arthur”)",
      valueSv: "Percival Lowell (plakett: ”Arthur”)",
    },
    {
      label: "Haunting evidence",
      labelSv: "Bevis för spökeri",
      value: "None verified — urban legend",
      valueSv: "Inget verifierat — urban legend",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 8.8 · Premium MEDIUM–HIGH",
      valueSv: "Poäng 8.8 · Premium MEDEL–HÖG",
    },
  ],
  faq: [
    {
      question: "Is the Lowell ghost plaque historically authentic?",
      questionSv: "Är Lowell-spökplaketten historiskt äkta?",
      answer:
        "No as a historical monument. Best-documented origin: Thomas Liljenberg’s 1998 Gothenburg Haunts art project mixed fact and fiction on temporary city plaques; this one remained and became an urban legend. It is not evidence of a verified haunting.",
      answerSv:
        "Nej som historiskt minnesmärke. Bäst dokumenterade ursprunget: Thomas Liljenbergs konstprojekt Gothenburg Haunts 1998 blandade fakta och fiktion på tillfälliga skyltar; denna blev kvar och blev urban legend. Den är inte bevis för verifierat spökeri.",
    },
    {
      question: "Did Percival Lowell live at Sveagatan 2?",
      questionSv: "Bodde Percival Lowell på Sveagatan 2?",
      answer:
        "There is no verified documentary evidence that Percival Lowell stayed in this building or visited Göteborg on the plaque’s dates. “Arthur Lowell” on the sign is a fictional twist on the real astronomer’s name and Mars-canal fame.",
      answerSv:
        "Det finns ingen verifierad dokumentation att Percival Lowell bodde i huset eller besökte Göteborg på plakettens datum. ”Arthur Lowell” är en fiktiv vridning av den verkliga astronomens namn och Mars-kanalfame.",
    },
    {
      question: "Why is it called Nyckelhålshuset?",
      questionSv: "Varför heter det Nyckelhålshuset?",
      answer:
        "From the distinctive keyhole-shaped main entrance on the 1903 Jugend façade by Hanson & Löfmark — also the name of the housing cooperative Brf Nyckelhålet.",
      answerSv:
        "Efter den karakteristiska nyckelhålsformade huvudentrén på 1903 års jugendfasad av Hanson & Löfmark — också namnet på Brf Nyckelhålet.",
    },
    {
      question: "Can I go inside?",
      questionSv: "Kan jag gå in?",
      answer:
        "No — it is a private residence. Photograph the façade and plaque from the public pavement only, and respect residents.",
      answerSv:
        "Nej — privat bostad. Fotografera fasad och plakett endast från allmän trottoar och respektera boende.",
    },
    {
      question: "Has Haunted Sweden investigated yet?",
      questionSv: "Har Haunted Sweden utrett platsen ännu?",
      answer:
        "Not yet. Planned: plaque photography, architecture documentation, newspaper-archive search, local-historian interviews, and checking whether Percival Lowell ever visited Göteborg.",
      answerSv:
        "Inte ännu. Planerat: plakettfoto, arkitekturdokumentation, tidningsarkiv, lokalhistorikerintervjuer och kontroll om Percival Lowell någonsin besökte Göteborg.",
    },
  ],
};

data.places[idx] = { ...data.places[idx], ...upgrade };
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log(
  "Upgraded",
  upgrade.slug,
  "cover",
  coverImage,
  fs.existsSync(coverJpg) ? fs.statSync(coverJpg).size : "n/a",
  "version",
  data.version
);
