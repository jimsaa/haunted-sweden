/**
 * Add Jungfrutornet, Visby (id 64)
 * Run: node scripts/add-jungfrutornet.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "jungfrutornet-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/1/15/Junfrun_ringmuren_Visby.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "jungfrutornet")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "64",
  slug: "jungfrutornet",
  name: "Jungfrutornet",
  englishName: "Jungfrutornet – The Maiden Tower (Visby City Wall)",
  coverImage: "/places/jungfrutornet-cover.jpg",
  category: "Legend Site",
  city: "Visby",
  region: "Gotland",
  country: "Sweden",
  address: "Paviljongsgatan 8, 621 55 Visby, Gotland, Sweden",
  latitude: 57.638,
  longitude: 18.288,
  featured: true,
  verified: false,
  verificationLevel: "community-verified",
  verifiedByTeam: false,
  visitedByTeam: false,
  visitCount: 0,
  lastInvestigationDate: null,
  investigationPhotos: [],
  investigationVideos: [],
  overnightInvestigation: false,
  hauntingLevel: 4,
  hauntedSwedenScore: 9.7,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "jungfrutornet",
    "visby",
    "gotland",
    "visby_city_wall",
    "unesco",
    "valdemar_atterdag",
    "battle_of_visby",
    "walled_maiden",
    "medieval_folklore",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Jungfrutornet is one of the most famous towers in Visby’s medieval city wall — the UNESCO World Heritage Hanseatic town of Visby (listed 1995). Built in the 1400s to strengthen the sea-facing Strandmuren, the limestone tower stands between Murfallet and Silverhättan with Baltic views along Strandpromenaden. Its fame rests on the legend of Nils Guldsmed’s daughter from Unghanse: she supposedly betrayed Visby to Valdemar Atterdag in 1361 — smuggling keys or signalling the Danes — and was walled in alive as punishment. That story cannot be historical fact: the tower did not exist in 1361. The documented dark history of that year is the Battle of Visby at Korsbetningen, where ~1,800 Gotlanders fell and mass graves were later excavated. Alternative etymology links the name to the old volume measure jungfru. Haunted Sweden keeps Riksantikvarieämbetet wall chronology separate from Medeltidsveckan folklore. Blue hour along the wall makes Jungfrutornet one of Gotland’s iconic mystery stops.",
  whyItFitsHauntedSweden:
    "UNESCO World Heritage wall tower; Sweden’s most famous walled-maiden legend; Valdemar 1361 national trauma nearby; outstanding atmosphere. Visual 10/10, historical 10/10, folklore 10/10, paranormal reputation 8.8/10, cultural significance 10/10 — Haunted Sweden Score 9.7. Essential Visby stop; premium EXTREMELY HIGH; research confidence VERY HIGH.",
  shortDescription:
    "1400s Visby sea-wall tower — UNESCO-listed Ringmuren — famous for the Unghanse maiden legend that cannot fit 1361 chronology, still told each Medieval Week.",
  history: `## DOCUMENTED: Visby ringmur and Hanseatic Visby

Visby’s limestone **ringmur** (city wall) is Northern Europe’s best-preserved medieval town wall (~3.6 km). Construction of the first major phase — the **Strandmur** / sea wall (~1.400 m) — began around the mid-1200s as Visby rose as a Hanseatic Baltic trade hub; a full circuit followed. Packhouses, parish churches and the street grid express that Hanseatic boom. The wall and historic town form the core of UNESCO World Heritage **Hansestaden Visby** (inscribed **1995**). Region Gotland owns most of the wall; **Riksantikvarieämbetet** manages conservation (RAÄ Visby 105:1).

## DOCUMENTED: Valdemar Atterdag and 1361

In July **1361** Danish king **Valdemar Atterdag** invaded Gotland. On **27 July** his professional army crushed a Gotlander peasant levy outside the walls (**Battle of Visby / Korsbetningen**). Contemporary tradition and later sources cite about **1,800** Gotlanders killed (c. 300 Danes in some accounts); mass graves at Solberga convent grounds were excavated in the early 1900s with extraordinary armour finds. Two days later Visby opened; Valdemar exacted tribute and symbolically breached the wall southeast of Söderport (rebuilt 1363). Rural Gotland suffered burning and depopulation; Visby remained a privileged town under Danish power for centuries. This is the documented catastrophe behind later betrayal legends — not a maiden walled into Jungfrutornet.

## DOCUMENTED: Why Jungfrutornet was built (1400s)

**Jungfrutornet** was erected in the **1400s** along Strandmuren between **Murfallet** and **Silverhättan**, both to stiffen sea defence and to brace a weaker stretch of wall (Mitt Visby / ringmur literature; RAÄ notes 1400s towers added along the sea wall). Remains of a wall-walk (skyttegång) survive beside the north side. It is decades after 1361 — so it cannot be the prison of a 1361 traitor.

## DOCUMENTED: Name alternatives

Besides the maiden legend, local scholarship often prefers the old volume measure **jungfru** (~8.2 cl) — a vessel wide at the base and tapering upward, like the tower’s silhouette (Wikipedia / Guteinfo).

## Accessibility / heritage

Public exterior year-round along the wall and Strandpromenaden; easy walk from central Visby. Respect UNESCO protected fabric — no climbing fragile masonry, no graffiti.`,

  legend: `## FOLKLORE: The walled maiden (not historical fact)

**Classic telling:** Daughter of **Nils Guldsmed** of **Unghanse** (often called the Unghanse maiden) fell for Valdemar (disguised as a merchant) or a Danish soldier; she betrayed Visby — white cloth over the farm to spare it, and/or smuggling **city gate keys** by night. Captured after the conquest, she was sentenced to be **walled in alive** inside Jungfrutornet. The tale is performed each year during **Medeltidsveckan** (Medieval Week).

**Chronology problem (critical):** Jungfrutornet dates to the **1400s**. Valdemar’s attack was **1361**. The punishment literally cannot have happened in this tower. Present the story as **medieval/early-modern folklore and tourism theatre**, not documented justice.

**19th-century literary versions** (e.g. Svenska Familj-Journalen 1879) elaborate romance, betrayal and abandonment — further evidence of legend growth, not archival trial records.

## MODERN WITNESS-STYLE REPORTS (anecdotal)

Tour and visitor motifs: young woman in white near the tower; evening cries; cold spots; sadness; unease along Strandmuren at dusk. No peer-reviewed paranormal investigation specific to Jungfrutornet was located. Record as subjective experience and ghost-walk atmosphere.

## Special haunted areas (atmosphere + legend)

1. **Jungfrutornet** — centre of the maiden legend.
2. **Strandmuren** — historic sea defences.
3. **Murfallet** — adjacent wall section.
4. **Strandpromenaden** — evening Baltic light.

## Atmosphere, investigation ideas, best conditions

Medieval limestone, wall silhouette, Murfallet, sea views, Medeltidsveckan pageantry. Ideas: walled-maiden legend vs chronology; wall night photography; Medieval Week documentation; guide/historian interviews; history vs folklore documentary. Best: autumn evenings, blue hour, heavy fog, Medieval Week, winter evenings.`,

  safetyNote:
    "UNESCO World Heritage city wall — publicly accessible exteriors year-round. Easy walking from central Visby; uneven cobbles and grass banks. Do not climb the wall or tower fabric, remove stones, or disturb conservation work. Respect residents along Paviljongsgatan / Strandpromenaden. Keep night noise low.",

  sourceLinks: [
    "https://sv.wikipedia.org/wiki/Visby_ringmur",
    "https://www.raa.se/om-riksantikvarieambetet/fragor-och-svar/visby-ringmur/",
    "https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/hansestaden-visby/",
    "https://www.mittvisby.se/ringmuren/jungfrutornet/",
    "http://www.guteinfo.com/?id=1265",
    "https://sv.wikipedia.org/wiki/Slaget_vid_Visby",
    "https://sv.wikipedia.org/wiki/Valdemar_Atterdags_invasion_av_Gotland",
  ],

  paranormalType: [
    "Apparition",
    "Ghostly Lady",
    "Voices",
    "Temperature Changes",
    "Heavy Atmosphere",
    "Local Folklore",
  ],
  accessType: "Public Landmark",
  familyFriendly: true,
  visitDifficulty: 1,
  nightAccess: true,
  parkingAvailable: true,
  guidedTours: true,
  publicAccess: true,
  evidenceCount: 0,
  reportCount: 0,
  photoCount: 1,
  videoCount: 0,
  googlePlaceId: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jungfrutornet,+Visby,+Gotland",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/jungfrutornet-cover.jpg",
      caption: "Jungfrutornet on Visby’s medieval city wall, Gotland",
      captionSv: "Jungfrutornet i Visby ringmur, Gotland",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "1400-talstorn i Visby strandmur — UNESCO-listade ringmuren — känt för Unghanse-jungfrulegenden som inte kan stämma med 1361 års kronologi, men som återberättas varje Medeltidsvecka.",
  historySv: `## DOKUMENTERAT: Visby ringmur och hansestaden

Kalkstensringmur (~3,6 km), Nordeuropas bäst bevarade medeltida stadsmur. **Strandmuren** från mitten av 1200-talet; hansestadshandel. UNESCO **Hansestaden Visby** 1995. Region Gotland äger; **Riksantikvarieämbetet** förvaltar.

## DOKUMENTERAT: Valdemar Atterdag 1361

**27 juli 1361**: Slaget vid Visby / Korsbetningen — ca **1 800** gutar stupade; massgravar vid Solberga. Visby kapitulerade; brandskatt; symboliskt murbrott vid Söderport (åter 1363). Dokumenterad katastrof bakom senare förräderilegender.

## DOKUMENTERAT: Jungfrutornet (1400-talet)

Uppfört under **1400-talet** längs Strandmuren mellan Murfallet och Silverhättan — förstärkning mot havet och stöd åt svagare murparti. **Fanns inte 1361.**

## Namnalternativ

Äldre rymdmått **jungfru** (~8,2 cl) — form lik tornets avsmalning.`,

  legendSv: `## FOLKLORE: Den inmurade jungfrun (inte historisk fakta)

**Nils Guldsmeds** dotter från **Unghanse** ska ha förrått Visby åt Valdemar 1361 (nycklar / vit duk) och murats in levande i Jungfrutornet. Spelas under **Medeltidsveckan**.

**Kronologiproblem:** Tornet är från **1400-talet**; attacken **1361**. Kan inte vara historisk sanning om just detta torn. Märk som folklore.

## MODERNA UPPLEVELSER (anekdotiska)

Kvinna i vitt, skrik, köld, sorg — ej peer-reviewed utredningar. OMRÅDEN: Jungfrutornet; Strandmuren; Murfallet; Strandpromenaden.`,

  hauntedSwedenAppSummarySv:
    "Jungfrutornet är ett av de mest berömda tornen i Visby ringmur — UNESCO-världsarvet Hansestaden Visby (1995). Byggt på 1400-talet för att stärka Strandmuren står det mellan Murfallet och Silverhättan med utsikt över Östersjön. Ryktet vilar på legenden om Nils Guldsmeds dotter från Unghanse: hon ska ha förrått Visby åt Valdemar Atterdag 1361 och murats in levande. Det kan inte vara historisk fakta — tornet fanns inte 1361. Den dokumenterade mörka historien det året är slaget vid Korsbetningen med ca 1 800 stupade gutar. Alternativ etymologi pekar på rymdmåttet jungfru. Haunted Sweden håller isär ringmurens kronologi och Medeltidsveckans folklore.",
  safetyNoteSv:
    "UNESCO-världsarv — exteriör tillgänglig året runt. Lätt promenad från centrala Visby. Klättra inte på muren, ta inte stenar. Respektera boende. Håll låg volym nattetid.",
  infoBox: [
    {
      label: "Built",
      labelSv: "Byggt",
      value: "1400s · Strandmuren reinforcement",
      valueSv: "1400-talet · förstärkning av Strandmuren",
    },
    {
      label: "UNESCO",
      labelSv: "UNESCO",
      value: "Hansestaden Visby · listed 1995",
      valueSv: "Hansestaden Visby · listad 1995",
    },
    {
      label: "Valdemar Atterdag",
      labelSv: "Valdemar Atterdag",
      value: "Conquered Visby July 1361",
      valueSv: "Intog Visby juli 1361",
    },
    {
      label: "Maiden legend",
      labelSv: "Jungfrulegenden",
      value: "Folklore — tower did not exist in 1361",
      valueSv: "Folklore — tornet fanns inte 1361",
    },
    {
      label: "Name alternative",
      labelSv: "Namnalternativ",
      value: "Volume measure jungfru (~8.2 cl)",
      valueSv: "Rymdmått jungfru (ca 8,2 cl)",
    },
    {
      label: "Nearby dark history",
      labelSv: "Närliggande mörk historia",
      value: "Battle of Visby / Korsbetningen",
      valueSv: "Slaget vid Visby / Korsbetningen",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 9.7 · Premium EXTREMELY HIGH",
      valueSv: "Poäng 9.7 · Premium EXTREMT HÖG",
    },
  ],
  faq: [
    {
      question: "Was a maiden really walled into Jungfrutornet in 1361?",
      questionSv: "Murades verkligen en jungfru in i Jungfrutornet 1361?",
      answer:
        "No. The famous Unghanse / Nils Guldsmed daughter story is folklore. Jungfrutornet was built in the 1400s — decades after Valdemar Atterdag’s 1361 conquest — so the punishment cannot have taken place in this tower.",
      answerSv:
        "Nej. Berättelsen om Unghanses / Nils Guldsmeds dotter är folklore. Jungfrutornet byggdes på 1400-talet — årtionden efter Valdemars erövring 1361 — så straffet kan inte ha skett i just detta torn.",
    },
    {
      question: "What did happen in Visby in 1361?",
      questionSv: "Vad hände i Visby 1361?",
      answer:
        "Valdemar Atterdag invaded Gotland. On 27 July his army defeated a Gotlander force outside the walls (Battle of Visby / Korsbetningen); roughly 1,800 Gotlanders are traditionally said to have fallen and were buried in mass graves later excavated near Solberga. Visby then paid tribute.",
      answerSv:
        "Valdemar Atterdag invaderade Gotland. Den 27 juli besegrades en gutahär utanför murarna (slaget vid Visby / Korsbetningen); ca 1 800 gutar sägs ha stupat och begravdes i massgravar vid Solberga. Visby brandskattades.",
    },
    {
      question: "Why is it called Jungfrutornet?",
      questionSv: "Varför heter det Jungfrutornet?",
      answer:
        "Popular tradition ties the name to the walled-maiden legend. Many local sources prefer the old volume measure jungfru (~8.2 cl), whose tapering shape resembles the tower.",
      answerSv:
        "Folklig tradition knyter namnet till den inmurade jungfrun. Många lokala källor föredrar rymdmåttet jungfru (ca 8,2 cl), vars avsmalnande form liknar tornet.",
    },
    {
      question: "Is Jungfrutornet part of a UNESCO site?",
      questionSv: "Ingår Jungfrutornet i ett världsarv?",
      answer:
        "Yes — it is part of Visby’s ringmur within the Hanseatic Town of Visby World Heritage Site (UNESCO 1995), managed with Riksantikvarieämbetet involvement.",
      answerSv:
        "Ja — det ingår i Visby ringmur inom världsarvet Hansestaden Visby (UNESCO 1995), med Riksantikvarieämbetet som förvaltare av muren.",
    },
    {
      question: "Has Haunted Sweden investigated yet?",
      questionSv: "Har Haunted Sweden utrett platsen ännu?",
      answer:
        "Not yet. Planned: night photography, wall walk after sunset, Medieval Week documentation, historian/guide interviews, legend-vs-history comparison, and a Visby documentary episode.",
      answerSv:
        "Inte ännu. Planerat: nattfotografi, murvandring efter solnedgång, Medeltidsveckan, historiker-/guideintervjuer, legend kontra historia, och Visbydokumentär.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
