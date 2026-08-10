/**
 * Add Eksjöhovgårds Slottsruin (id 65) — historic mystery; weak folklore/paranormal
 * Run: node scripts/add-eksjohovgard.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "eksjohovgard-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/f/f1/0400Eksj%C3%B6_Hovg%C3%A5rd.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "eksjohovgard")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "65",
  slug: "eksjohovgard",
  name: "Eksjöhovgårds Slottsruin",
  englishName: "Eksjöhovgård Castle Ruin",
  coverImage: "/places/eksjohovgard-cover.jpg",
  category: "Castle / Castle Ruin",
  city: "Sävsjö",
  region: "Småland",
  country: "Sweden",
  address: "Eksjöhovgårdssjön, 576 91 Sävsjö, Sweden",
  latitude: 57.391947,
  longitude: 14.686944,
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
  hauntingLevel: 2,
  hauntedSwedenScore: 8.4,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "eksjohovgard",
    "eksjohovgards_slottsruin",
    "savsjo",
    "smaland",
    "stureatten",
    "lewenhaupt",
    "castle_ruin",
    "historic_estate",
    "island_castle",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Eksjöhovgårds slottsruin stands on a small island in Eksjöhovgårdssjön just east of Sävsjö — reached by footbridge and framed by lake and trees. Written sources mention Ekesjö/Ekesio from 1287 (Cecilia Elofsdotter’s testament); the farm later passed to Nydala monastery, then by land exchange in 1420 to Sven Sture. Through 1420–1616 it was a hub of the younger Sture / Natt och Dag estate (up to 43 farms in 13 parishes). In the 1650s Field Marshal Carl Mauritz Lewenhaupt began a prestige three-storey stone residence with a party floor and Stockholm-inspired symmetry — unfinished at his death in 1666. The 1680s Reduction stripped heirs of most of the estate; the remainder sold in 1700 with roof barely on and no interiors, windows or façade décor. Magnus Julius De la Gardie altered the house after 1730; decay accelerated when the copper roof was removed in 1812. Conserved from the 1930s (again 2009), it is Sävsjö’s landmark and coat-of-arms motif. Haunted Sweden classifies it as a HISTORIC MYSTERY: romantic unfinished-castle atmosphere is exceptional, but no substantial ghost folklore or verified paranormal tradition was found in this research pass.",
  whyItFitsHauntedSweden:
    "700+ years of documented history, Sture–Lewenhaupt–De la Gardie lineages, unfinished Great Power–era castle, and a dramatic island ruin. Visual 9.5/10, historical 10/10, architectural 9.5/10, atmosphere 10/10 — but folklore strength LOW and paranormal reputation WEAK after targeted search. Haunted Sweden Score 8.4 (kept under 9.0). Premium HIGH for history photography and unfinished-castle storytelling; not marketed as one of Sweden’s most haunted sites.",
  shortDescription:
    "Island castle ruin outside Sävsjö — medieval Sture estate, Lewenhaupt’s unfinished 1600s stone palace, conserved ruin; historic mystery more than haunted folklore.",
  history: `## DOCUMENTED: Medieval origins (from 1287)

First written reference to **Ekesjö / Ekesio** is **1287**, when **Cecilia Elofsdotter**’s testament mentions gifts to household people at Ekesio (Sävsjö kommun / place-name register tradition). The farm later passed to **Nydala monastery** (Cistercian), typical of large medieval donations. In the 1300s–early 1400s Ekesjö is noted as a **tingsplats** (assembly/court site) for Västra härad, with a strategic position on trade routes.

## DOCUMENTED: Sture estate (1420–1616)

In **1420** a land exchange brought the estate to **Sven Sture**, who likely raised the first fortification on the lake island. It then passed through the younger Sture line / **Natt och Dag**: Bo Stensson, Nils Bosson (Sture), Svante Nilsson (Sture), Sten Sture the Younger, Svante Sture the Younger. By the late Middle Ages the island was the centre of one of Småland’s largest complexes — **43 farms in 13 parishes** (Jönköpings läns museum). Building fabric then was probably mostly timber; an early-1500s stone house is said to incorporate parts of an earlier defence tower. The Sture line’s hold ends **1616**; by then the family’s focus had shifted toward Stockholm.

**Tradition (not proven residence):** Sten Sture the Younger used a building here as a **hunting lodge** — recorded as tradition by Wikipedia / local summaries; later named Stures are not documented as resident here.

## DOCUMENTED: Lewenhaupt’s unfinished castle (1650s–1700)

Around **1630** Field Marshal **Carl Mauritz (Karl Mauritz) Lewenhaupt** inherited; in the **1650s** he began the square three-storey stone house with rooftop terrace that forms today’s ruin — models from Stockholm, second floor planned for festivities, intended symmetry and wings. He died **1666** before completion; heirs could not finish it. The **1680s Reduction** cost the family most of the estate; the rest was **sold in 1700**. By then the steep roof with terrace was barely in place — **interiors, windows and façade decoration missing**, façades not even symmetrical (museum account). Erik Dahlbergh’s Suecia antiqua drawing (~1680) shows the unfinished ambition.

## DOCUMENTED: De la Gardie, abandonment, conservation

Empty until the **1730s**, when **Magnus Julius De la Gardie** removed the top storey, changed room layout, moved the kitchen from a wing and finished some rooms — unclear whether the house was ever truly inhabited before his death **1741**. Decline followed; after the **copper roof was taken down in 1812**, ruin accelerated. **1930s** conservation found the south façade collapsed; further care including **2009**. Outdoor attraction via **footbridge**; motif of Sävsjö’s municipal coat of arms. RAÄ **Vallsjö 31:1**. Nearby manor/inn (1805 copper-works context) is separate from the ruin.

## DOCUMENTED dark / political context (no invented tragedies)

Noble power shifts (Sture extinction 1616); Great Power building ambition vs **Reduction** poverty; unfinished construction and roof stripping as economic failure — not ghost origin stories. No reliable sources in this pass document estate-specific fires, murders or hauntings as historical fact.`,

  legend: `## FOLKLORE RESEARCH RESULT — HISTORIC MYSTERY

Targeted search of Jönköpings läns museum, Sävsjö kommun, Wikipedia, regional tourism, and online ghost/folklore lists did **not** yield a substantial body of White Lady / Grey Lady stories, treasure legends, lake lights, or established local ghost traditions specifically attached to Eksjöhovgårds slottsruin.

### Thin tradition only

- **Sten Sture hunting-lodge tradition** — local/popular tradition that Sten Sture the Younger used a building here as a jaktslott. Mark as tradition, not verified continuous residence for the later Sture lords.
- Wikipedia cites *Sällsamheter i Småland*, del 3, for background; that series mixes curiosities and history — Haunted Sweden did **not** locate an extractable, widely retold ghost cycle for this ruin online.

### Paranormal reputation — WEAK

No credible visitor investigation reports, EVP claims, or newspaper-documented hauntings specific to this ruin were found in this research pass. Do not invent apparitions, footsteps or shadow figures. The site’s power is **romantic unfinished architecture + island isolation**, not a proven haunted reputation.

### Classification

**HISTORIC MYSTERY** within Haunted Sweden: exceptional atmosphere and noble history; folklore strength and paranormal reputation remain research gaps for a future verification mission (local historical society, newspaper archives, oral interviews).

## Special areas (atmosphere — not verified hotspots)

1. Castle ruin — unfinished Lewenhaupt stone shell.
2. Island — isolation, footbridge approach.
3. Interior voids — missing floors/finishes of the stalled project.
4. Lakeshore — fog and reflections.
5. Footbridge — arrival sequence.

## Atmosphere, investigation ideas, best conditions

Massive unfinished walls on water, mature trees, quiet countryside, fog over the lake. Ideas: unfinished-castle documentary; Sture legacy; night/blue-hour photography where legally permitted; folklore archive hunt; historian interviews. Best: autumn, fog, blue hour, rain, winter evenings. Respect heritage — no climbing unstable masonry.`,

  safetyNote:
    "Outdoor cultural heritage site (RAÄ Vallsjö 31:1). Reach the island by footbridge. Verify current visitor access with Sävsjö kommun. Do not climb unstable walls or enter restricted/unsafe areas. Uneven stone and wet surfaces; lake edge caution. Respect conservation work.",

  sourceLinks: [
    "https://jonkopingslansmuseum.se/se-och-gora/smultronstallen/savsjo/eksjohovgards-slottsruin/",
    "https://savsjo.se/turism/nyhetsarkiv/nyheter/se-och-gora/2020-07-06-eksjohovgard.html",
    "https://savsjo.se/turism/nyhetsarkiv/nyheter/se-och-gora/2019-04-12-eksjohovgards-slottsruin.html",
    "https://sv.wikipedia.org/wiki/Eksj%C3%B6hovg%C3%A5rds_slottsruin",
    "https://sv.wikipedia.org/wiki/Eksj%C3%B6hovg%C3%A5rd",
    "https://jonkopingslansmuseum.se/wp-content/uploads/2017/12/2014-53.pdf",
  ],

  paranormalType: ["Local Folklore", "Heavy Atmosphere"],
  accessType: "Public Landmark",
  familyFriendly: true,
  visitDifficulty: 2,
  nightAccess: false,
  parkingAvailable: true,
  guidedTours: false,
  publicAccess: true,
  evidenceCount: 0,
  reportCount: 0,
  photoCount: 1,
  videoCount: 0,
  googlePlaceId: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Eksj%C3%B6hovg%C3%A5rds+slottsruin,+S%C3%A4vsj%C3%B6",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/eksjohovgard-cover.jpg",
      caption: "Eksjöhovgårds slottsruin on the island in Eksjöhovgårdssjön",
      captionSv: "Eksjöhovgårds slottsruin på ön i Eksjöhovgårdssjön",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Ö-ruin utanför Sävsjö — medeltida Sturegods, Lewenhaupts ofullbordade 1600-talspalats, konserverad ruin; historiskt mysterium mer än spökfolklore.",
  historySv: `## DOKUMENTERAT: Medeltid från 1287

Första skriftliga belägget **1287** (Cecilia Elofsdotters testamente, Ekesio). Senare **Nydala kloster**; tingsplats i Västra härad under 1300-/tidigt 1400-tal.

## DOKUMENTERAT: Sture 1420–1616

**1420** bytte **Sven Sture** till sig gården (troligen första borgen på ön). Yngre Sture / Natt och Dag; vid medeltidens slut **43 gårdar i 13 socknar** (Jönköpings läns museum). Stureätten utgången **1616**. Tradition om Sten Sture d.y:s jaktslott — tradition, inte bevisad bostad för senare Sturar.

## DOKUMENTERAT: Lewenhaupts ofullbordade slott

**Carl Mauritz Lewenhaupt** började på **1650-talet** ett tresidigt stenhus i tre våningar (festvåning, Stockholmförlagor). Död **1666**; **reduktionen** på 1680-talet; resten såld **1700**. Tak med altan knappt på plats — **saknade inredning, fönster, fasaddekor**.

## DOKUMENTERAT: De la Gardie, förfall, konservering

**Magnus Julius De la Gardie** från **1730-talet** (övre våning riven, vissa rum inredda; oklart om bebott före 1741). **Koppartaket ner 1812** → snabb ruin. Konservering **1930-tal** (södra fasaden rasad), vård **2009**. Gångbro till ön; Sävsjös vapenmotiv. RAÄ Vallsjö 31:1.`,

  legendSv: `## FOLKLORERESULTAT — HISTORISKT MYSTERIUM

Ingen substantiell Vita damen-/skatt-/spöktradition knuten till ruinen hittades i museum, kommun eller spöklistor i denna research.

### Tunn tradition

Jaktslotts-tradition kring Sten Sture d.y. — märk som tradition.

### Paranormalt rykte — SVAGT

Inga trovärdiga utredningsrapporter lokaliserade. Klassificering: **HISTORISKT MYSTERIUM** — stark atmosfär och ofullbordad arkitektur, inte bevisat “mest hemsökta” Sverige.

OMRÅDEN (atmosfär): ruinen; ön; inre tomrum; sjökanten; gångbron.`,

  hauntedSwedenAppSummarySv:
    "Eksjöhovgårds slottsruin står på en ö i Eksjöhovgårdssjön öster om Sävsjö — nås via gångbro. Skrift från 1287; Nydala kloster; från 1420 Stureätten (1420–1616) och ett av Smålands största godskomplex. På 1650-talet började fältmarskalk Carl Mauritz Lewenhaupt ett tresidigt stenhus som aldrig blev färdigt — reduktionen och försäljningen 1700 lämnade taket knappt på plats utan inredning. De la Gardie byggde om efter 1730; koppartaket togs ner 1812. Konserverad från 1930-talet. Haunted Sweden klassar platsen som HISTORISKT MYSTERIUM: exceptionell ruinatmosfär, men ingen substantiell spökfolklore eller verifierad paranormal tradition hittades i denna research.",
  safetyNoteSv:
    "Utomhus kulturmiljö (RAÄ Vallsjö 31:1). Nås via gångbro. Kontrollera aktuell tillträde hos Sävsjö kommun. Klättra inte på ostabila murar. Halt sten och sjökant. Respektera vårdarbeten.",
  infoBox: [
    {
      label: "First written",
      labelSv: "Första skrift",
      value: "1287 · Ekesjö / Ekesio",
      valueSv: "1287 · Ekesjö / Ekesio",
    },
    {
      label: "Sture period",
      labelSv: "Stureperioden",
      value: "1420–1616",
      valueSv: "1420–1616",
    },
    {
      label: "Stone castle",
      labelSv: "Stenslottet",
      value: "1650s · C. M. Lewenhaupt (unfinished)",
      valueSv: "1650-tal · C. M. Lewenhaupt (ofullbordat)",
    },
    {
      label: "Roof removed",
      labelSv: "Taket ner",
      value: "1812 · rapid ruin",
      valueSv: "1812 · snabb ruin",
    },
    {
      label: "Conservation",
      labelSv: "Konservering",
      value: "1930s · care again 2009",
      valueSv: "1930-tal · vård igen 2009",
    },
    {
      label: "Classification",
      labelSv: "Klassificering",
      value: "Historic Mystery (weak folklore)",
      valueSv: "Historiskt mysterium (svag folklore)",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 8.4 · Premium HIGH",
      valueSv: "Poäng 8.4 · Premium HÖG",
    },
  ],
  faq: [
    {
      question: "Is Eksjöhovgård known as a haunted castle?",
      questionSv: "Är Eksjöhovgård känt som ett hemsökt slott?",
      answer:
        "Not in any substantial documented tradition found in this research. Official museum and municipal texts emphasise unfinished Great Power architecture and romantic ruin atmosphere. Haunted Sweden lists it as a historic mystery, not one of Sweden’s most haunted sites.",
      answerSv:
        "Inte enligt någon substantiell dokumenterad tradition i denna research. Museum och kommun betonar ofullbordad stormaktstidsarkitektur och romantisk ruin. Haunted Sweden listar platsen som historiskt mysterium, inte bland Sveriges mest hemsökta.",
    },
    {
      question: "Why was the castle never finished?",
      questionSv: "Varför blev slottet aldrig färdigt?",
      answer:
        "Lewenhaupt died in 1666 mid-project; heirs lacked means. The 1680s Reduction seized much of the estate; by sale in 1700 the roof was barely on and interiors, windows and façade decoration were still missing. Later De la Gardie changes never restored the original three-storey ambition.",
      answerSv:
        "Lewenhaupt dog 1666 mitt i bygget; arvingarna saknade medel. Reduktionen på 1680-talet tog stora delar av godset; vid försäljningen 1700 satt taket knappt och inredning, fönster och fasaddekor saknades. De la Gardies ändringar återställde aldrig det ursprungliga tresidiga ambitionerna.",
    },
    {
      question: "How do I visit?",
      questionSv: "Hur besöker jag platsen?",
      answer:
        "The ruin sits on an island in Eksjöhovgårdssjön about 1 km east of Sävsjö on road 127 toward Vetlanda, reached by footbridge. Confirm current access with Sävsjö kommun; do not climb unstable walls.",
      answerSv:
        "Ruinen ligger på en ö i Eksjöhovgårdssjön ca 1 km öster om Sävsjö vid väg 127 mot Vetlanda, nås via gångbro. Bekräfta tillträde hos Sävsjö kommun; klättra inte på ostabila murar.",
    },
    {
      question: "What is the Sture connection?",
      questionSv: "Vad är Sturekopplingen?",
      answer:
        "From 1420 to 1616 the estate belonged to the younger Sture / Natt och Dag line and grew into a major Småland complex (43 farms in 13 parishes by the late Middle Ages). A popular tradition links Sten Sture the Younger to a hunting lodge here.",
      answerSv:
        "1420–1616 tillhörde godset den yngre Stureätten / Natt och Dag och växte till ett stort småländskt komplex (43 gårdar i 13 socknar). En folklig tradition knyter Sten Sture d.y. till ett jaktslott här.",
    },
    {
      question: "Has Haunted Sweden investigated yet?",
      questionSv: "Har Haunted Sweden utrett platsen ännu?",
      answer:
        "Not yet. Planned: blue-hour photography, local historian and historical-society interviews, newspaper and folklore-archive search, and honest comparison of any oral stories against documented history.",
      answerSv:
        "Inte ännu. Planerat: blåtimmesfoto, lokalhistoriker och hembygdsförening, tidnings- och folklorearkiv, och ärlig jämförelse av eventuella muntliga berättelser mot dokumenterad historia.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
