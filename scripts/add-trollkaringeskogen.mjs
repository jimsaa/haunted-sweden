/**
 * Add Trollkäringeskogen (id 71) — FLAGSHIP historical + folklore
 * Run: node scripts/add-trollkaringeskogen.mjs
 *
 * Sources: Finspångs kommun, Länsstyrelsen Östergötland, Wikipedia (sv/en),
 * NT / local oral history, Finspång folder on witch trials, Brandberg 1761 map refs.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "trollkaringeskogen-cover.jpg");
const coverUrl =
  "https://www.lansstyrelsen.se/images/18.43daae7518a8d054bb44bc80/1695906438369/Sp%C3%A5ng-vid-Lillskiren-2.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "trollkaringeskogen")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "71",
  slug: "trollkaringeskogen",
  name: "Trollkäringeskogen",
  englishName: "Trollkäringeskogen (Witch Forest Nature Reserve)",
  coverImage: "/places/trollkaringeskogen-cover.jpg",
  category: "Forest / Nature Site",
  city: "Finspång",
  region: "Östergötland",
  country: "Sweden",
  address: "Flasbjörke, Finspång, Östergötland, Sweden",
  latitude: 58.759187,
  longitude: 15.738422,
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
  hauntedSwedenScore: 9.8,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "trollkaringeskogen",
    "finspang",
    "ostergotland",
    "witch_trials",
    "witchcraft",
    "1617",
    "trollkaringegolen",
    "haxprocess",
    "folklore",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Trollkäringeskogen north of Finspång near Flasbjörke is one of Sweden’s most important early witch-trial landscapes — not a simplified ghost story. In 1617 nine named women from the Finspång area were imprisoned and accused of witchcraft; Lusse from Mullsätter died during the ordeal of interrogation; seven were condemned and killed; Lusse from Svarttorp was executed later in the Hällestad process (1620). Surviving evidence comes mainly from bailiff Christoffer Andersson’s accounts, letters and later maps — including surveyor Johan Brandberg’s 1761 map marking Trollkäringebergs röse and the göl. Local folklore still says women’s voices cry “Jag är oskyldig” in the forest and warns against imitating them. Today the same ground is a 60.7 ha nature reserve (2023) of old mixed conifer forest between Lilla Skiren and Bleklången. Haunted Sweden treats the women as victims of persecution and keeps documented history strictly separate from legend.",
  whyItFitsHauntedSweden:
    "FLAGSHIP historical + folklore site: Finspång 1617 — among Sweden’s largest witch trials before 1668; nine named victims; fogde accounts and Brandberg 1761 map; water ordeal at Trollkäringegölen; powerful “Jag är oskyldig” legend documented in municipal material; protected ancient forest preserved partly because of the dark reputation. Visual 9.5/10, historical 10/10, dark history 10/10, folklore 10/10, paranormal reputation 8.5/10 (primarily folklore, not modern EVP culture) — Haunted Sweden Score 9.8. Premium EXTREMELY HIGH.",
  shortDescription:
    "Nature reserve north of Finspång at Flasbjörke — landscape of the 1617 witch trials, named victims, Brandberg’s 1761 map, and the folklore of voices crying “Jag är oskyldig.”",
  history: `## DOCUMENTED: Why 1617 — politics and persecution

The **Finspång witch trials of 1617** are among the **largest Swedish witch prosecutions before the great hunt of 1668–1676** (Swedish/English Wikipedia; Finspångs kommun). Context: **Duke Johan of Östergötland** and **Princess Maria Elisabet**, with chaplain **Claudius Prytz**, drove harsh anti-witchcraft policy after earlier cases (including the so-called Tobo witch). Accusations involved **Blåkulla**, **Satan**, and confessions obtained under extreme pressure. This was **judicial and clerical persecution**, not verified witchcraft.

Haunted Sweden treats every condemned woman as a **victim of historical injustice**.

## DOCUMENTED: Sources — and what is missing

Risinge härad court books reportedly contain **little or nothing** on the witchcraft sittings; the core documentary trail is the **bruks fogde Christoffer Andersson’s account book / financial records**, plus letters (e.g. the Skedevi priest’s question to Linköping cathedral chapter about burying Lusse). Equipment for **torture** (e.g. branding tongs, rack) and **water ordeal** is recorded in period notes (Wikipedia summarizing research; Finspångs kommun). Exact trial transcripts are fragmentary — historians reconstruct carefully.

## DOCUMENTED: The nine women (names preserved)

Names commonly listed from the fogde/process tradition (Finspång materials; Wikipedia):

1. **Elin from Näs**, Risinge parish — first arrested / first to confess under pressure  
2. **Kerstin from Näs**, Risinge parish  
3. **Ingrid from Rippestorp**, Risinge parish  
4. **Margareta from Eketorp**, Kvillinge parish  
5. **Kerstin (Kirstin) from Tråbrunna**, Östra Eneby parish  
6. **Ingrid from Gållbo**, Regna parish  
7. **Ingrid Göran Orres (Ingrid Orres)** from Vånga parish  
8. **Lusse from Mullsätter**, Skedevi parish  
9. **Lusse (Lussi) from Svarttorp / Svartorp**, Hällestad parish  

Do **not** collapse them into an anonymous “nine witches burned here.”

## DOCUMENTED: Imprisonment, water ordeal, torture

Women were held in connection with **Finspångs gård**. At a later ting, the **water ordeal** was used: thumbs bound to opposite toes, cast into water — **floating = guilt**, **sinking = innocence** in the superstition of the court (Finspångs kommun). A rope around the waist allowed recovery. This was **not** a scientific test.

Torture followed to force “true confession.” **Lusse from Mullsätter died during the process** (torture / imprisonment) before proceedings finished; priest Bengt of Skedevi wrote to the cathedral chapter asking where to bury her — she had **denied** the accusations (Finspångs kommun).

## DOCUMENTED: Fates — do not oversimplify

- **Seven women** who survived to the fourth ting were **sentenced to death** in 1617 and executed in connection with the steep mountain / **Trollkärringeberget** area north of Finspång near Flasbjörke.  
- **Finspångs kommun** states they were **probably beheaded then burned on a pyre** — the normal Swedish legal pattern.  
- **Graphic later stories** of binding women at a cliff edge, pouring tar, and shoving them alive into a fire below are treated by Wikipedia as **largely legendary embellishment** unless independently verified. Haunted Sweden labels those details **folklore / later retelling**, not proven method.  
- Tradition says **Elin from Näs** was treated as especially dangerous and killed separately; others in groups — treat grouping details as **tradition pending deeper archival check**.  
- **Lusse from Svarttorp**: water ordeal and Blåkulla confession in the Finspång orbit; condemned later; **executed 1620** in the **Hällestad** process (burned) — **not** the same day as the 1617 Flasbjörke executions.

## DOCUMENTED: Brandberg 1761 map

Surveyor **Johan Brandberg’s 1761 map** marks **Trollkäringebergs röse** and the **göl** — cartographic memory of the witch-trial landscape (Länsstyrelsen Östergötland; Finspång materials; NT local reporting). Exact modern pin of every execution step can still be debated; local oral history sometimes places the water ordeal or “berg” differently than the municipal map (NT interview with Ellisif Sjöholm). Haunted Sweden notes **historical uncertainty** where identification is contested.

## DOCUMENTED: Nature reserve today (2023)

**Trollkäringeskogen naturreservat** — **60.7 ha**, protected **2023**, municipality Finspång, landowner Holmen Skog, managed by **Länsstyrelsen Östergötland**. Old mixed **conifer forest**, wet forest, rock, caves; borders **Lilla Skiren** and **Bleklången**. Länsstyrelsen explicitly links sparse historical logging to the **dark reputation and legends**. Visitor rules: no damaging trees, rocks, mosses/lichens (matsvamp OK); no drilling/carving rock. **No official parking yet**; fishing platforms around Lilla Skiren require fishing permit. Approach from Flasbjörke toward signed Trollkäringeskogen / Gräsfallet roads (Finspång reserve checklist coords **58.759187, 15.738422**).

## DOCUMENTED access note

Paths/old roads exist; **marked trails incomplete**. Stay on durable surfaces, follow reserve regulations, respect silence at a place of historical suffering. Do not disturb rocks, caves or water. Never encourage illegal camping or damage.`,

  legend: `## FOLKLORE CLASSIFICATION KEY

1. Historical fact  
2. Historical testimony / period document  
3. Folklore / legend  
4. Modern witness report  
5. Paranormal interpretation  

---

## FOLKLORE — “Jag är oskyldig”

**Category 3 (documented as local legend):** Voices of women are said to cry **“Jag är oskyldig”** (“I am innocent”) in the forest near the execution landscape. Tradition warns: **do not imitate the voices** — anyone who mocks them **dies before sunset**. A careless farmhand is named in some tellings (Swedish Wikipedia summarizing local legend; municipal / tourism retellings).

This is **preserved storytelling**, explicitly tied to the 1617 trauma. It is **not** scientific evidence of ghosts. Haunted Sweden does **not** convert the legend into a modern paranormal “fact.”

## FOLKLORE — Cave, stone, dance rock

- **Cave:** Women hid from authorities before capture — **local tradition** (Naturskyddsföreningen tours; tourism). Historical proof of that hideout is weak; treat as folklore unless archival confirmation appears.  
- **“Hällen där trollen dansade”:** Midsummer troll-dance rock — folklore.  
- **Ättestupa / cliff pyre narrative:** Dramatic shove-into-fire accounts — **legendary layer** over documented executions (see history).  
- **Blåkullebackarna** name on old road — folk memory of Blåkulla accusations.

## MODERN “PARANORMAL” LAYER (category 4–5)

Contemporary hiking/tourism texts call the place **haunted** and repeat the voice legend (e.g. tadigut.nu). Systematic EVP campaigns, professional ghost-hunt corpora and verified multi-witness modern apparitions are **thin** compared with the historical/folklore strength. Score paranormal reputation **MEDIUM–HIGH as folklore continuity**, not as documented modern phenomena.

If visitors report voices, lights or being watched: classify as **modern witness report (4)** or **interpretation (5)** — never as proven haunt.

## SPECIAL LOCATIONS

1. **Trollkäringebergets röse** — historic map reference (1761).  
2. **Execution mountain / ättestupa tradition** — traditional execution landscape (exact pin uncertain).  
3. **Trollkäringegölen** — water-ordeal association.  
4. **The Cave** — hideout folklore.  
5. **Kulknektens stuggrund** — later historic cottage remains (official map).  
6. **Old road** Finspång–Björke / Igelfors — historical route.  
7. **Hällen där trollen dansade** — folklore rock.

## HISTORICAL MYSTERY FRAME

**“The forest where the dead were never allowed to forget.”**

Questions for documentary work: What exactly happened in 1617? Who were the nine? Why these accusations? What do fogde records prove? Where precisely were the executions? How did “Jag är oskyldig” survive 400 years? Why was the forest left comparatively unworked?

## INVESTIGATION IDEAS (legal daylight / reserve rules)

The Witches of Trollkäringeskogen · Jag är oskyldig · The Nine Women of 1617 · Lost Execution Site · Water Ordeal at Trollkäringegölen · History vs Folklore · 400 Years of a Swedish Witch Legend. Dusk audio only where legally permitted — never damage the reserve.

## BEST CONDITIONS

Autumn · fog · early morning · blue hour · light rain · overcast.`,

  safetyNote:
    "Protected nature reserve (2023). Follow Länsstyrelsen Östergötland rules: do not damage trees, rock, mosses or lichens; mats vamp OK to pick. No official parking yet — park legally without blocking forest roads. Uneven wet ground, cliffs and lakes — careful footing. This is a landscape of real historical suffering: visit with respect. Do not carve, dig, light fires if banned, or disturb graves/memorials. Fishing in Lilla Skiren requires a permit. Never trespass private land outside the reserve.",

  sourceLinks: [
    "https://finspang.se/kommunochpolitik/kommunfakta/historia-och-kommunvapen/finspangs-haxprocesser",
    "https://www.finspang.se/download/18.43876c7216bc1b5050814f66/1562848025827/Folder%20om%20trollk%C3%A4ringeskogen%20och%20h%C3%A4xprocesserna.pdf",
    "https://www.lansstyrelsen.se/ostergotland/besoksmal/naturreservat/trollkaringeskogen-naturreservat.html",
    "https://sv.wikipedia.org/wiki/H%C3%A4xprocessen_i_Finsp%C3%A5ng",
    "https://en.wikipedia.org/wiki/Finsp%C3%A5ng_witch_trial",
    "https://tadigut.nu/utflyktsplatser/trollkaringeskogens-stigar-och-vagar/",
    "https://snffinspang.se/2023/06/01/1-6-trollkaringeskogen/",
    "https://www.nt.se/nyheter/flasbjorke/artikel/okand-haxhistoria-lever-i-lokala-sagner/r1kn15xl",
  ],

  paranormalType: [
    "Voices",
    "Heavy Atmosphere",
    "Local Folklore",
    "Apparition",
  ],
  accessType: "Public Landmark",
  familyFriendly: true,
  visitDifficulty: 2,
  nightAccess: false,
  parkingAvailable: false,
  guidedTours: false,
  publicAccess: true,
  evidenceCount: 0,
  reportCount: 0,
  photoCount: 1,
  videoCount: 0,
  googlePlaceId: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=58.759187,15.738422",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/trollkaringeskogen-cover.jpg",
      caption: "Boardwalk at Lilla Skiren, Trollkäringeskogen nature reserve",
      captionSv: "Spång vid Lilla Skiren, Trollkäringeskogens naturreservat",
      credit: "Länsstyrelsen Östergötland",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Naturreservat norr om Finspång vid Flasbjörke — landskapet för häxprocesserna 1617, namngivna offer, Brandbergs karta 1761 och folkloren om röster som ropar »Jag är oskyldig«.",
  historySv: `## DOKUMENTERAT: 1617 — politik och förföljelse

**Finspångs häxprocess 1617** hör till de **största svenska trolldomsprocesserna före 1668–1676**. Bakom står hertigparet **Johan** och **Maria Elisabet** med hovkaplan **Claudius Prytz**. Anklagelser om **Blåkulla** och **Satan**; bekännelser under hårt tryck. Haunted Sweden ser kvinnorna som **offer för rättslig och kyrklig förföljelse**.

## DOKUMENTERAT: Källor

Kärnan är fogden **Christoffer Anderssons** räkenskaper/anteckningar, brev (t.ex. prästen i Skedevi om Lusses begravning) — inte fullständiga Risinge-domböcker om tingen.

## DOKUMENTERAT: Nio namngivna kvinnor

Elin och Kerstin i Näs; Ingrid i Rippestorp; Margareta i Eketorp; Kerstin i Tråbrunna; Ingrid i Gållbo; Ingrid Orres i Vånga; **Lusse i Mullsätter** (dog under processen); **Lusse i Svarttorp** (avrättad **1620** i Hällestad).

## DOKUMENTERAT: Vattenprov och tortyr

Vattenprov i göl (tumme–tå); **flyta = skyldig** i tidens vidskepelse. Tortyr för bekännelse. Lusse i Mullsätter dog; hon hade förnekat.

## DOKUMENTERAT: Avrättningar

Sju dömdes 1617 och dödades kopplat till **Trollkärringeberget** / Flasbjörke. Kommunen: troligen **halshuggning sedan bål**. Dramatiska stup-i-eld-skildringar: **legendskikt** enligt Wikipedia. **Brandbergs karta 1761** markerar **röse** och **göl**.

## DOKUMENTERAT: Naturreservat 2023

**60,7 ha**, Länsstyrelsen Östergötland, Lilla Skiren / Bleklången. Koordinater checklista: **58.759187, 15.738422**. Ingen ordnad parkering ännu.`,

  legendSv: `## FOLKLORE

**»Jag är oskyldig«:** Kvinnoröster i skogen; den som härmar dör före solnedgång — lokal sägen (Wikipedia / kommunmaterial), **inte** vetenskapligt spökebevis.

**Grotta, ättestupa-i-eld, häll där trollen dansade:** sägner. Avrättningarna är dokumenterade; den mest grafiska metoden är troligen utbroderad.

**Moderna »hemsökt«-texter** upprepar mest folkloren. Paranormal poäng: folklorekontinuitet, inte EVP-industri.`,

  hauntedSwedenAppSummarySv:
    "Trollkäringeskogen norr om Finspång vid Flasbjörke är ett av Sveriges viktigaste tidiga häxprocesslandskap — inte en förenklad spökhistoria. 1617 fängslades nio namngivna kvinnor; Lusse från Mullsätter dog under förhören; sju dömdes och avrättades; Lusse från Svarttorp avrättades senare i Hällestadprocessen 1620. Bevarade spår finns främst i fogden Christoffer Anderssons uppgifter, brev och senare kartor — bland dem lantmätare Johan Brandbergs karta 1761 med Trollkäringebergs röse och gölen. Lokal folklore säger att kvinnoröster fortfarande ropar »Jag är oskyldig« och varnar för att härma dem. Idag är samma mark ett 60,7 hektar stort naturreservat (2023) med gammal barrblandskog mellan Lilla Skiren och Bleklången. Haunted Sweden behandlar kvinnorna som offer för förföljelse och håller dokumenterad historia strikt isär från legend.",
  safetyNoteSv:
    "Naturreservat (2023). Följ Länsstyrelsens regler: skada inte träd, berg, mossor eller lavar. Ingen ordnad parkering ännu. Ojämn blöt mark och stup. Besök med respekt för historiskt lidande. Fiskekort krävs i Lilla Skiren.",
  infoBox: [
    {
      label: "Year",
      labelSv: "År",
      value: "1617 (Finspång process) · 1620 (Svarttorp)",
      valueSv: "1617 (Finspång) · 1620 (Svarttorp)",
    },
    {
      label: "Accused",
      labelSv: "Anklagade",
      value: "Nine named women (fogde records)",
      valueSv: "Nio namngivna kvinnor (fogderäkenskaper)",
    },
    {
      label: "Map evidence",
      labelSv: "Kartbevis",
      value: "Johan Brandberg 1761 (röse + göl)",
      valueSv: "Johan Brandberg 1761 (röse + göl)",
    },
    {
      label: "Nature reserve",
      labelSv: "Naturreservat",
      value: "2023 · 60.7 ha · Länsstyrelsen Östergötland",
      valueSv: "2023 · 60,7 ha · Länsstyrelsen Östergötland",
    },
    {
      label: "Signature legend",
      labelSv: "Signaturlegend",
      value: "“Jag är oskyldig” voices (folklore)",
      valueSv: "»Jag är oskyldig«-röster (folklore)",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 9.8 · FLAGSHIP history+folklore",
      valueSv: "Poäng 9.8 · FLAGGSKEPP historia+folklore",
    },
  ],
  faq: [
    {
      question: "Were nine women burned alive at Trollkäringeskogen?",
      questionSv: "Brändes nio kvinnor levande i Trollkäringeskogen?",
      answer:
        "No simplified slogan fits. Nine named women were accused. Lusse from Mullsätter died during interrogation; seven were sentenced to death in 1617 and executed in the Flasbjörke / Trollkärringeberg landscape; Lusse from Svarttorp was executed in 1620 at Hällestad. Finspång municipality says the 1617 women were probably beheaded then burned. Graphic cliff-into-fire stories are largely later legend according to historical summaries.",
      answerSv:
        "Ingen enkel slogan stämmer. Nio namngivna kvinnor anklagades. Lusse i Mullsätter dog under förhören; sju dömdes 1617 och avrättades i Flasbjörke/Trollkärringeberg-landskapet; Lusse i Svarttorp avrättades 1620 i Hällestad. Kommunen: troligen halshuggning sedan bål. Dramatiska stup-i-eld-berättelser är till stor del senare legend.",
    },
    {
      question: "Is it true you can hear “Jag är oskyldig”?",
      questionSv: "Är det sant att man hör »Jag är oskyldig«?",
      answer:
        "That is a powerful local legend preserved in municipal and folklore sources, including a warning not to imitate the voices. It is storytelling about historical injustice — not scientifically verified paranormal audio. Haunted Sweden labels it folklore.",
      answerSv:
        "Det är en stark lokal sägen i kommun- och folklorematerial, med varning mot att härma rösterna. Det är berättelse om historisk orättvisa — inte vetenskapligt verifierat paranormalt ljud. Haunted Sweden klassar det som folklore.",
    },
    {
      question: "Can I visit Trollkäringegölen and the execution site?",
      questionSv: "Kan jag besöka Trollkäringegölen och avrättningsplatsen?",
      answer:
        "The reserve is publicly accessible under allemansrätt and reserve rules. Sites linked to the göl, röse and traditional cliff are reachable via old roads/paths — Finspång’s witch-trial folder maps them. Exact pins can be debated. No marked full trail system and no official parking yet. Use Finspång / Länsstyrelsen guidance and stay respectful.",
      answerSv:
        "Reservatet är tillgängligt under allemansrätt och reservatsregler. Göl, röse och traditionell stupplats nås via gamla vägar/stigar — kommunens folder kartlägger. Exakta punkter kan debatteras. Ingen full markerad led och ingen ordnad parkering ännu. Följ Finspång/Länsstyrelsen och visa respekt.",
    },
    {
      question: "Has Haunted Sweden investigated yet?",
      questionSv: "Har Haunted Sweden utrett platsen ännu?",
      answer:
        "Not on site yet. Planned: daylight walk of the official landscape, photograph historic points, compare terrain with the 1761 map, interview Finspång historians and Östergötlands museum, study surviving records, document the “Jag är oskyldig” tradition carefully, then optional dusk atmosphere recording only where legal.",
      answerSv:
        "Inte på plats ännu. Planerat: dagsvandring, fotografera historiska punkter, jämföra terräng med 1761-kartan, intervjua historiker och Östergötlands museum, studera källor, dokumentera »Jag är oskyldig«-traditionen, eventuell skymningsinspelning endast där det är lagligt.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
