/**
 * Add Bona – Statens uppfostringsanstalt & Västra Ny sjukhus (id 66)
 * Run: node scripts/add-bona.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "bona-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bona_folkh%C3%B6gskola.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "bona")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "66",
  slug: "bona",
  name: "Bona – Statens uppfostringsanstalt & Västra Ny sjukhus",
  englishName: "Bona – State Reform School & Västra Ny Hospital",
  coverImage: "/places/bona-cover.jpg",
  category: "Abandoned Place",
  city: "Motala",
  region: "Östergötland",
  country: "Sweden",
  address: "Bona, 591 97 Motala, Östergötland, Sweden",
  latitude: 58.64917,
  longitude: 15.05444,
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
  hauntingLevel: 5,
  hauntedSwedenScore: 9.6,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "bona",
    "motala",
    "vastra_ny",
    "reform_school",
    "mental_hospital",
    "abandoned",
    "institution",
    "urban_exploration",
    "ghosts",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Bona (pronounced Båna) north of Motala is one of Sweden’s most discussed abandoned institutional landscapes. A Grill ironworks estate from 1775, it was bought by the Swedish state in 1902 and opened in 1905 as Statens uppfostringsanstalt — a reform school for boys aged about 15–18 sentenced to tvångsuppfostran instead of prison. Life meant school, hard labour, military-style discipline, nightly lock-up and, until reforms under director Bertil Forsell from 1938, corporal punishment and isolation for breaches. After tvångsuppfostran was abolished, the site became Västra Ny sjukhus (1948–1981), a mental hospital — secondary sources often note care for men found not criminally responsible (straffriförklarade). Later came a refugee centre and Bona Folkhögskola (1984–1998 on site; the school continues in Motala). Buildings then emptied into prolonged decay and urbex fame. Haunted Sweden separates that documented institutional history from modern ghost-map folklore (unexplained sounds, voices, cold drafts on Spökkartan and similar). Private property — never trespass.",
  whyItFitsHauntedSweden:
    "Exceptional documented dark-institution history, national reform-school memory (“Är du inte snäll kommer du till Bona”), long psychiatric phase, abandoned brick campus, and strong modern urbex/ghost-map reputation. Visual 10/10, historical 10/10, dark history 10/10, folklore 9.2/10 (modern), paranormal reputation 9.0/10 (anecdotal) — Haunted Sweden Score 9.6. Premium EXTREMELY HIGH for exterior documentary and archive work — not for break-ins.",
  shortDescription:
    "Abandoned institutional campus north of Motala — state reform school 1905–1948, Västra Ny mental hospital 1948–1981, later folk high school; private property with modern urbex folklore.",
  history: `## DOCUMENTED: Estate and ironworks

Bona was originally a frälsehemman. In **1775** Jean Abraham Grill of Godegård bought the estate and founded a **stångjärn** ironworks (hammer and hearths). The Grill family ran **Bona bruk** until **1886** (bar iron, semi-finished goods, tools). Gustaf Grill kept a large Swedish wildlife collection here. Later owners included patrons Oskar Lundqvist and S. V. Lundborg (agriculture and forestry). Eric Lundqvist (1902–1978), author and forester, grew up linked to this family line.

## DOCUMENTED: State purchase and Statens uppfostringsanstalt (1902–1948)

The Swedish state purchased Bona in **1902**. From **1905 to 1948** it operated as **Statens uppfostringsanstalt** for criminal / “vanartiga” youths — part of the **tvångsuppfostran** system (SFS 1902:72 in force 1905): boys roughly **15–18**, sentenced by court for an indeterminate stay instead of fine or prison (Riksarkivet forvaltningshistorik). Popular warning: *“Är du inte snäll kommer du till Bona.”* Placement was not only for theft/violence — contemporary categories also included moral “wildness,” defiance of authority, etc. (secondary historical essays).

Daily life (documented in research and survivor literature such as Renée Frangeur’s work and Hans Möller’s *Bonagrabben!*): schooling, agricultural and industrial labour, military-like order, locked in at night. Misconduct punished with isolation; corporal punishment (aga) used until milder rules under director **Bertil Forsell** from **1938** (aga banned, letter censorship eased; he also resisted race-biology sterilisation pressure per secondary accounts). Architect **David Lundegårdh** is credited for institutional buildings. A C-section / further reform-school construction is noted during WWI-era expansion in secondary sources.

## DOCUMENTED: Västra Ny sjukhus (1948–1981)

When tvångsuppfostran was abolished, Bona became **Västra Ny sjukhus**, a **mentalsjukhus** (mental / psychiatric hospital). Secondary institutional histories often describe it as caring for **straffriförklarade** men — men found not criminally responsible under older Swedish criminal law (sinnessjukdom / related categories) and held for psychiatric care of indefinite length. Do **not** reduce the hospital phase to a vague “intellectual disability home” without that legal-medical context. Hospital closed **1981**.

## DOCUMENTED: Folk high school, refugees, abandonment

**Bona Folkhögskola** operated on site **1984–1998** (Left Party origins; later moved to Motala — still named Bona Folkhögskola). Refugee accommodation also used the buildings and was later closed. From the late 1990s onward many structures stood empty; vandalism and urbex interest grew. Media (Corren, EFN, Dagens PS ~2024) reported major building sales via auction platforms, noting severe decay and illegal entry problems; Motala Municipality has discussed ownership issues without necessarily buying the stock. Treat current ownership as **private / changing** — always verify before any visit.

## DOCUMENTED dark history (no invented deaths)

Strict reform-school discipline, isolation punishments, corporal punishment (pre-1938), total-institution control, and long psychiatric confinement for straffriförklarade men are historically attested themes. Specific named death/accident lists require primary archives (Riksarkivet / regional) — Haunted Sweden does not invent body counts. Survivor memoirs and academic studies are the proper sources for lived experience.`,

  legend: `## FOLKLORE / URBAN LEGEND — source-labelled

Modern Swedish ghost-map and urbex writing (notably **Spökkartan**’s Bona page) frames the empty campus as haunted by its dual past: reform-school boys and psychiatric patients. Reported motifs on that and similar sites include **unexplained sounds**, **voices from nowhere**, and **cold drafts** through rooms. Media sales coverage casually calls Bona a “spökby” (ghost village) as atmosphere marketing — not archival folklore collection.

Haunted Sweden treats these as **modern urban-exploration / internet folklore**, not proven hauntings and not equivalent to parish oral legends collected by ethnologists. No peer-reviewed paranormal investigation with scientific standing was located in this research pass.

### Do not invent

Ghost-children lists, named chapel hauntings, or “service tunnel EVPs” appear in some explorer chatter online — only include after primary confirmation. This entry does **not** claim a verified chapel ghost or mapped tunnel hotspot.

## Special atmospheric areas (history + decay — not verified paranormal zones)

1. Main administration / central institutional blocks.
2. Former reform-school wings (C-section era fabric where surviving).
3. Former hospital wards.
4. Forest edge and approach roads — exterior atmosphere.
5. Basements / tunnels — **only with owner permission**; structural and legal hazards; do not encourage entry.

## Atmosphere, investigation ideas, best conditions

Large brick institutional buildings, long corridors (interior only if lawfully allowed), forest setting, silence and decay. Ideas: exterior documentary; archive research (Riksarkivet); historian / hembygdsförening interviews; history vs urbex myth; *never* trespass shoots. Best exterior conditions: autumn, fog, rain, blue hour — from public roads only unless invited.`,

  safetyNote:
    "PRIVATE / CHANGING OWNERSHIP. Buildings are not a public museum. Do NOT trespass, force doors, climb fences or enter interiors without explicit owner permission. Structures are decayed, vandalised and potentially hazardous (unstable floors, glass, mould, asbestos-era materials). Respect Motala Municipality guidance and police rules. Haunted Sweden will never encourage illegal urbex. Exterior photography from public roads only unless you have written access.",

  sourceLinks: [
    "https://sv.wikipedia.org/wiki/Bona,_Motala_kommun",
    "https://forvaltningshistorik.riksarkivet.se/33_Barn_Ungdom.htm",
    "https://psykmuseet.se/2017/02/bona-vastra-ny-sjukhus/",
    "https://www.lindelof.nu/bona-istallet-for-fangelse/",
    "https://www.spokkartan.se/overgivna-platser/bona/",
    "https://sv.wikipedia.org/wiki/Bona_folkh%C3%B6gskola",
    "https://www.corren.se/nyheter/motala/artikel/bonahusen-ar-till-salu-sa-ser-kommunens-intresse-ut-for-en-affar/lyv5k6vl",
  ],

  paranormalType: [
    "Heavy Atmosphere",
    "Voices",
    "Temperature Changes",
    "Local Folklore",
    "Urban Legend",
  ],
  accessType: "Restricted Access",
  familyFriendly: false,
  visitDifficulty: 3,
  nightAccess: false,
  parkingAvailable: true,
  guidedTours: false,
  publicAccess: false,
  evidenceCount: 0,
  reportCount: 0,
  photoCount: 1,
  videoCount: 0,
  googlePlaceId: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Bona,+Motala,+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/bona-cover.jpg",
      caption: "Bona folk high school buildings (historic institutional campus), Motala",
      captionSv: "Bona folkhögskolas byggnader (historiskt institutionsområde), Motala",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Övergivet institutionsområde norr om Motala — statlig uppfostringsanstalt 1905–1948, Västra Ny mentalsjukhus 1948–1981, senare folkhögskola; privat mark med modern urbex-folklore.",
  historySv: `## DOKUMENTERAT: Bruk och gods

Frälsehemman; **1775** Jean Abraham Grill anlade stångjärnsbruk. Grill till **1886**. Senare Lundqvist m.fl.

## DOKUMENTERAT: Statens uppfostringsanstalt 1905–1948

Staten köpte **1902**; anstalt **1905–1948** för pojkar ca 15–18 under **tvångsuppfostran**. Skola, arbete, militärisk disciplin, inlåsning; aga/isolering före mildare regler under **Bertil Forsell** från **1938**. Arkitekt **David Lundegårdh**.

## DOKUMENTERAT: Västra Ny sjukhus 1948–1981

**Mentalsjukhus** efter avskaffad tvångsuppfostran; sekundärkällor nämner ofta **straffriförklarade** män. Nedlagt **1981**.

## DOKUMENTERAT: Folkhögskola, flyktingar, förfall

**Bona Folkhögskola** på plats **1984–1998** (fortsätter i Motala). Flyktingförläggning senare nedlagd. Därefter långvarigt förfall; försäljningar/media ca 2024. **Privat mark — inget intrång.**`,

  legendSv: `## FOLKLORE / URBAN LEGEND — källmärkt

Moderna spökkartor (t.ex. **Spökkartan**) och urbex-texter beskriver oförklarliga ljud, röster och kölddrag. Media kallar ibland Bona “spökby” i försäljningsvinkel. Haunted Sweden: **modern internet-/urbex-folklore**, inte bevisad hemsökelse och inte etnologisk sockensägen.

Påhittade kapellspöken eller tunnel-EVP utan primärkälla tas inte in här.

OMRÅDEN (atmosfär): administrationsblock; uppfostringsflyglar; sjukhusavdelningar; skogsinfart — interiör endast med ägartillstånd.`,

  hauntedSwedenAppSummarySv:
    "Bona (Båna) norr om Motala är ett av Sveriges mest omtalade övergivna institutionslandskap. Grillbruk från 1775; staten köpte 1902 och öppnade 1905 Statens uppfostringsanstalt för pojkar under tvångsuppfostran. Hård disciplin, arbete och inlåsning — aga mildrades under Bertil Forsell från 1938. 1948–1981 Västra Ny mentalsjukhus (ofta kopplat till straffriförklarade män i sekundärlitteratur). Därefter flyktingförläggning och Bona Folkhögskola (1984–1998 på plats). Sedan förfall och urbex-rykte. Haunted Sweden skiljer dokumenterad institutionhistoria från moderna spökkartsberättelser. Privat mark — gör aldrig intrång.",
  safetyNoteSv:
    "PRIVAT / FÖRÄNDERLIGT ÄGANDE. Inte ett publikt museum. Gör INTE intrång, forcera inte dörrar eller klättra över stängsel. Förfallna, vandaliserade och farliga byggnader. Exteriörfoto från allmän väg endast utan skriftligt tillträde. Haunted Sweden uppmuntrar aldrig olaglig urbex.",
  infoBox: [
    {
      label: "State purchase",
      labelSv: "Statens köp",
      value: "1902",
      valueSv: "1902",
    },
    {
      label: "Reform school",
      labelSv: "Uppfostringsanstalt",
      value: "1905–1948 · tvångsuppfostran",
      valueSv: "1905–1948 · tvångsuppfostran",
    },
    {
      label: "Hospital",
      labelSv: "Sjukhus",
      value: "Västra Ny · 1948–1981",
      valueSv: "Västra Ny · 1948–1981",
    },
    {
      label: "Folk high school on site",
      labelSv: "Folkhögskola på plats",
      value: "1984–1998 (now in Motala)",
      valueSv: "1984–1998 (nu i Motala)",
    },
    {
      label: "Access",
      labelSv: "Tillträde",
      value: "Private — no trespassing",
      valueSv: "Privat — inget intrång",
    },
    {
      label: "Folklore type",
      labelSv: "Folkloretyp",
      value: "Modern urbex / ghost-map",
      valueSv: "Modern urbex / spökkarta",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 9.6 · Premium EXTREMELY HIGH",
      valueSv: "Poäng 9.6 · Premium EXTREMT HÖG",
    },
  ],
  faq: [
    {
      question: "Can I go inside Bona’s abandoned buildings?",
      questionSv: "Kan jag gå in i Bonas övergivna byggnader?",
      answer:
        "No — not without explicit owner permission. The campus is private property with hazardous decay. Haunted Sweden does not support trespassing or illegal urbex. Exterior views from public roads only unless invited.",
      answerSv:
        "Nej — inte utan uttryckligt ägartillstånd. Området är privat mark med farligt förfall. Haunted Sweden stöder inte intrång eller olaglig urbex. Exteriör från allmän väg endast om du är inbjuden.",
    },
    {
      question: "What was Statens uppfostringsanstalt?",
      questionSv: "Vad var Statens uppfostringsanstalt?",
      answer:
        "A state reform school (1905–1948) for boys roughly 15–18 sentenced to tvångsuppfostran instead of prison: education, labour and strict discipline under a total-institution regime.",
      answerSv:
        "En statlig uppfostringsanstalt (1905–1948) för pojkar ca 15–18 dömda till tvångsuppfostran i stället för fängelse: skola, arbete och sträng disciplin i en total institution.",
    },
    {
      question: "What was Västra Ny sjukhus?",
      questionSv: "Vad var Västra Ny sjukhus?",
      answer:
        "After 1948 Bona became a mental hospital (mentalsjukhus) until 1981. Secondary sources often link it to psychiatric care of men found not criminally responsible (straffriförklarade) under older Swedish law — not merely a generic disability home.",
      answerSv:
        "Efter 1948 blev Bona mentalsjukhus till 1981. Sekundärkällor kopplar ofta verksamheten till vård av straffriförklarade män enligt äldre straffrätt — inte bara ett generellt ”funktionshinderhem”.",
    },
    {
      question: "Are the ghost stories proven?",
      questionSv: "Är spökhistorierna bevisade?",
      answer:
        "No. Modern ghost-map and urbex sites report sounds, voices and cold drafts. Haunted Sweden labels these anecdotal modern folklore, separate from the well-documented institutional history.",
      answerSv:
        "Nej. Moderna spökkartor och urbex-sajter rapporterar ljud, röster och kölddrag. Haunted Sweden märker dem som anekdotisk modern folklore, skild från den väl dokumenterade institutionhistorien.",
    },
    {
      question: "Has Haunted Sweden investigated Bona yet?",
      questionSv: "Har Haunted Sweden utrett Bona ännu?",
      answer:
        "Not yet. Planned: lawful exterior photography, Riksarkivet / local archive work, historian interviews, and a documentary that contrasts records with urbex myth — never illegal entry.",
      answerSv:
        "Inte ännu. Planerat: lagligt exteriörfoto, Riksarkivet/lokala arkiv, historikerintervjuer och dokumentär som kontrasterar akter mot urbex-myt — aldrig olagligt intrång.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
