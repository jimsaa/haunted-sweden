/**
 * Add Borgholms Slottsruin (id 59)
 * Run: node scripts/add-borgholms-slottsruin.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "borgholms-slottsruin-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/7/73/Borgholms_slott.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "borgholms-slottsruin")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "59",
  slug: "borgholms-slottsruin",
  name: "Borgholms Slottsruin",
  englishName: "Borgholm Castle Ruin",
  coverImage: "/places/borgholms-slottsruin-cover.jpg",
  category: "Castle / Castle Ruin",
  city: "Borgholm",
  region: "Öland",
  country: "Sweden",
  address: "Sollidenvägen 5, 387 94 Borgholm, Öland, Sweden",
  latitude: 56.8799,
  longitude: 16.6563,
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
  hauntedSwedenScore: 9.9,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "borgholms_slott",
    "borgholms_slottsruin",
    "oland",
    "white_lady",
    "ghost_riders",
    "castle_ruin",
    "renaissance_castle",
    "baroque_palace",
    "kalmar_strait",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Borgholms Slottsruin crowns Öland's west coast above Kalmarsund — often called the mightiest ruin in the Nordic countries, with more than 900 years of fortress history. A late-1100s defensive tower grew into a royal stronghold fought over by Swedes and Danes, rebuilt as Johan III's Renaissance palace under Dominicus Pahr (1570s–80s), then reshaped toward a Baroque residence for Karl X Gustav by Nicodemus Tessin the Elder. After decline and a cloth-dye works in the north wing, fire on 14 October 1806 left the cinematic ruin visitors climb today. Folklore of the White Lady, Gråterskan, treasure-guarding ghost riders and voices from the castle well is presented on the site's own autumn ghost tour När skuggorna vaknar — as legend and storytelling, not proven hauntings. Haunted Sweden keeps SFV / Riksantikvarieämbetet chronology separate from tour folklore. Check seasonal opening hours; respect protected masonry.",
  whyItFitsHauntedSweden:
    "Flagship Öland castle ruin: 900+ years documented history, Nordic-scale ruin silhouette, official ghost and dark-side tours, White Lady / well / ghost-rider folklore, museum and events, Kalmarsund photography. Visual 10/10, historical 10/10, architectural 10/10, folklore 10/10, paranormal reputation 9.7/10 — Haunted Sweden Score 9.9. Premium content EXTREMELY HIGH; research confidence VERY HIGH. Verification mission: full photography, attend När skuggorna vaknar, well documentation, guide interviews, history-vs-folklore documentary.",
  shortDescription:
    "Öland's iconic castle ruin above Kalmarsund — 900+ years from medieval fortress to Renaissance and Baroque palace, ruined by fire in 1806, with White Lady folklore and official ghost tours.",
  history: `## DOCUMENTED: From kastal to royal fortress

Borgholms Slottsruin stands on the west coast of Öland overlooking Kalmarsund (address Sollidenvägen 5, Borgholm). Statens Fastighetsverk (SFV) and Riksantikvarieämbetet / BeBR describe origins in a late-1100s kastal (defensive tower) inside a strong curtain wall. The first securely dated reference as a royal fortress is 1281. Medieval expansions followed; Duke Valdemar is associated with a court presence around 1316. In 1361 Valdemar Atterdag of Denmark captured and partly destroyed the castle — a documented episode in the Swedish–Danish struggle for Öland and the Kalmar Strait.

## DOCUMENTED: Johan III, Dominicus Pahr and Renaissance Borgholm

After later war damage, Gustav Vasa's son King Johan III ordered a full rebuild (commonly dated 1572–1589/92) transforming the medieval fortress into a Renaissance palace. Architect Dominicus Pahr (with brother Johan Baptista Pahr in some accounts) created a monumental square plan with round corner towers, courtyard ranges and west-facing state rooms toward the cliff. Bastion systems on the landward side mark its role as a border fortress between Sweden and Denmark.

## DOCUMENTED: Kalmar War, Tessin and Karl X Gustav

During the Kalmar War (1611–1613) the castle was severely damaged and returned after the Peace of Knäred in plundered condition. Mid-1600s reconstruction under Karl X Gustav (then heir, later king — the only Swedish monarch to reside here for a longer continuous period per SFV) engaged Nicodemus Tessin the Elder to create a strict Baroque-classicist palace. Works slowed after the king's death (1660), restarted intermittently, and never fully matched Tessin's complete vision; by the early 1700s building momentum faded and the palace declined.

## DOCUMENTED: The fire of 14 October 1806

In 1803 Axel Adlersparre leased parts of the complex and established a dye / cloth works in the north wing. On 14 October 1806 a spark from a damaged chimney ignited the north-wing roof; wind-driven fire reduced the palace to the ruin known today (official Borgholms Slott history). Mid-1800s conservation began (state funds from 1860; vault and stair repairs later) as Borgholm became a bathing resort. SFV manages the ruin as a major cultural property with museum exhibitions, concerts and guided tours.

## DOCUMENTED dark history (no invented events)

Repeated medieval and early-modern sieges, Danish and Swedish occupations, Kalmar War destruction, imprisonment and fortress discipline are part of the documented military past. The 1806 fire is accidental industrial catastrophe, not a battle. Do not invent named mass executions without archival citation; present warfare deaths as the expected cost of a frontier fortress rather than a fabricated ghost roster.`,

  legend: `## FOLKLORE presented by Borgholms Slott (not verified history)

The official autumn dark tour När skuggorna vaknar (ghosts and apparitions at Borgholm Castle) invites visitors into legends of the mythical White Lady (Vita frun), asking whether she is the same figure as Gråterskan på Borgholm, and whether other spirits watch the ruins. Guides tell of hidden treasure guarded by terrifying ghost riders (spökryttare) and of the deep castle well where voices echo from the unknown. Age guidance typically 12+. A related tour, Slottets mörka sida, focuses on dungeons, punishments and Öland hardship — historical atmosphere storytelling, not scientific proof.

## FOLKLORE motifs (tradition / tour narrative)

White Lady apparitions in former royal apartments; weeping woman (Gråterskan); treasure and ghost riders at gates or approaches; whispering or echoing voices at the well; shadow figures in the inner courtyard. These are preserved local and tour-presented legends spanning generations of visitor storytelling.

## MODERN WITNESS-STYLE REPORTS (anecdotal)

Guests and guides on evening programmes report cold spots, footsteps on empty levels, whispering, strange lights and shadow impressions among massive walls — typical ruin-atmosphere claims. Treat as experience narrative unless tied to a named, documented investigation. Special areas: (1) Castle well — voices/echoes folklore; (2) Former royal apartments — White Lady; (3) Inner courtyard — shadow reports; (4) Tower ruins — battle memory and photography; (5) Main gate — ghost-rider tradition.

## Atmosphere, investigation ideas, best conditions

Massive stone walls, tower silhouettes, underground chambers, Kalmarsund panoramas, evening mist and sunsets make Borgholm one of Sweden's most cinematic ruins. Investigation ideas: official ghost-tour review; White Lady folklore mapping; EVP at the well only with permission; history vs folklore documentary. Best conditions: autumn evenings, heavy fog, blue hour, winter darkness, full moon. Respect opening hours and protected historic fabric.`,

  safetyNote:
    "Active museum ruin managed by Statens Fastighetsverk / Borgholms Slott — respect seasonal opening hours, tickets and barriers. Uneven stone, stairs and drop-offs; stay on visitor routes. Ghost / dark tours may be intense (often 12+). Do not climb closed masonry or enter restricted chambers.",

  sourceLinks: [
    "https://www.borgholmsslott.se/",
    "https://www.borgholmsslott.se/slottshistoria/",
    "https://www.borgholmsslott.se/guidningar/nar-skuggorna-vaknar/",
    "https://www.sfv.se/vara-fastigheter/sverige/kalmar-lan/borgholms-slottsruin",
    "https://sv.wikipedia.org/wiki/Borgholms_slott",
    "https://bebyggelseregistret.raa.se/bbr2/anlaggning/visaHistorik.raa?page=historik&visaHistorik=true&anlaggningId=21300000012333",
  ],

  paranormalType: [
    "Apparition",
    "Ghostly Lady",
    "Footsteps",
    "Voices",
    "Temperature Changes",
    "Heavy Atmosphere",
    "Local Folklore",
  ],
  accessType: "Guided Visits",
  familyFriendly: true,
  visitDifficulty: 2,
  nightAccess: false,
  parkingAvailable: true,
  guidedTours: true,
  publicAccess: true,
  evidenceCount: 0,
  reportCount: 0,
  photoCount: 1,
  videoCount: 0,
  googlePlaceId: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sollidenv%C3%A4gen+5,+387+94+Borgholm,+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/borgholms-slottsruin-cover.jpg",
      caption: "Borgholms Slottsruin, Öland",
      captionSv: "Borgholms slottsruin, Öland",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Ölands ikoniska slottsruin över Kalmarsund — 900+ år från medeltidsfäste till renässans och barock, ruin efter branden 1806, med Vita frun-folklore och officiella spökturer.",
  historySv: `## DOKUMENTERAT: Från kastal till kungligt fäste

Borgholms slottsruin ligger på Ölands västkust med utsikt över Kalmarsund (Sollidenvägen 5, Borgholm). SFV och Riksantikvarieämbetet/BeBR beskriver ursprung i en kastal från sent 1100-tal innanför ringmur. Första säkra belägget som kungaborg är 1281. Medeltida utbyggnader följde; hertig Valdemar förknippas med hov omkring 1316. 1361 intog Valdemar Atterdag borgen och förstörde den delvis.

## DOKUMENTERAT: Johan III, Dominicus Pahr och renässansborgholm

Gustav Vasas son Johan III lät genomföra fullständig ombyggnad (vanligen 1572–1589/92) till renässanspalats under Dominicus Pahr (med brodern Johan Baptista i vissa uppgifter): monumental kvadrat, runda hörntorn, borggårdslängor och praktgemak mot branten, med bastioner åt landsidan.

## DOKUMENTERAT: Kalmarkriget, Tessin och Karl X Gustav

Under Kalmarkriget 1611–1613 skadades slottet svårt. Omkring mitten av 1600-talet anlitade Karl X Gustav Nicodemus Tessin d.ä. för barockklassicistiskt palats. Karl X Gustav är enligt SFV den ende svenske kung som bott här längre sammanhängande tid. Arbetet avstannade efter kungens död 1660 och fullföljde aldrig Tessins hela vision; förfall följde.

## DOKUMENTERAT: Branden 14 oktober 1806

1803 etablerade Axel Adlersparre färgeri/klädesverksamhet i norra längan. Den 14 oktober 1806 antände en gnista från trasig murstock taket; elden i blåst lämnade dagens ruin (officiell slotts historia). Från 1860 kom statligt underhåll. SFV förvaltar ruinen med museum, konserter och guidningar.

## DOKUMENTERAD mörk historia (inga påhittade massavrättningar)

Belägringar, dansk–svenska krig, Kalmarkrigets förstörelse och fästningsdisciplin hör till den dokumenterade militära historien. 1806 års brand var olycka i industriell verksamhet — inte slag.`,

  legendSv: `## FOLKLORE från Borgholms Slott (inte verifierad historia)

Höstguidningen När skuggorna vaknar presenterar Vita frun, frågan om hon är samma som Gråterskan på Borgholm, gömd skatt bevakad av spökryttare och röster från den djupa slottsbrunnen. Relaterad tur: Slottets mörka sida (fängelsehålor, straff — oftast 12+).

## FOLKLOREMOTIV

Vita frun i forna kungagemak; Gråterskan; skatt och spökryttare; brunnsröster; skuggor på borggården.

## MODERNA UPPLEVELSERAPPORTER (anekdotiska)

Köldkänslor, fotsteg, viskningar, ljus och skuggor bland murarna — tur- och besöksberättelser, inte vetenskapliga bevis. OMRÅDEN: brunnen; kungagemak; borggård; tornruiner; huvudport. Respektera öppettider och skyddad sten.`,

  hauntedSwedenAppSummarySv:
    "Borgholms slottsruin — ofta kallad Nordens mäktigaste ruin — blickar ut över Kalmarsund efter mer än 900 års historia: 1100-talskastal, Johan III:s renässanspalats under Dominicus Pahr, Tessins barock under Karl X Gustav, och branden 14 oktober 1806. Officiella turer som När skuggorna vaknar berättar om Vita frun, Gråterskan, spökryttare och brunnen som folklore. Haunted Sweden skiljer SFV/RAÄ-kronologi från spökberättelser. Kolla säsongsöppettider.",
  safetyNoteSv:
    "Aktiv museiruin (SFV / Borgholms Slott) — respektera öppettider, biljetter och avspärrningar. Ojämn sten och fallrisk; håll dig till besöksleder. Spök-/mörkerturer kan vara intensiva (ofta 12+). Klättra inte på stängd mur.",
  infoBox: [
    {
      label: "Origins",
      labelSv: "Ursprung",
      value: "Late 1100s kastal",
      valueSv: "Sent 1100-tal (kastal)",
    },
    {
      label: "Renaissance rebuild",
      labelSv: "Renässansombyggnad",
      value: "Johan III · Dominicus Pahr (1572–1589/92)",
      valueSv: "Johan III · Dominicus Pahr (1572–1589/92)",
    },
    {
      label: "Baroque phase",
      labelSv: "Barockfas",
      value: "Karl X Gustav · Nicodemus Tessin the Elder",
      valueSv: "Karl X Gustav · Nicodemus Tessin d.ä.",
    },
    {
      label: "Ruin since",
      labelSv: "Ruin sedan",
      value: "Fire 14 October 1806",
      valueSv: "Brand 14 oktober 1806",
    },
    {
      label: "Managed by",
      labelSv: "Förvaltare",
      value: "Statens Fastighetsverk",
      valueSv: "Statens Fastighetsverk",
    },
    {
      label: "Ghost tour",
      labelSv: "Spöktur",
      value: "När skuggorna vaknar (seasonal)",
      valueSv: "När skuggorna vaknar (säsong)",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Investigation planned · Score 9.9",
      valueSv: "Utredning planerad · Poäng 9.9",
    },
  ],
  faq: [
    {
      question: "Why is Borgholm only a ruin today?",
      questionSv: "Varför är Borgholm bara en ruin idag?",
      answer:
        "After centuries as fortress, Renaissance palace and unfinished Baroque project, a fire on 14 October 1806 — started in the north wing dye/cloth works — destroyed the roofs and left the stone shell visitors see now (official castle history / SFV).",
      answerSv:
        "Efter århundraden som fäste, renässanspalats och ofullbordat barockprojekt förstörde en brand den 14 oktober 1806 — i norra längans färgeri/klädesverk — taken och lämnade den stenruin besökare ser idag (officiell slotts historia / SFV).",
    },
    {
      question: "Who was the White Lady of Borgholm?",
      questionSv: "Vem var Vita frun på Borgholm?",
      answer:
        "She is a folklore figure featured on the castle's own ghost storytelling (När skuggorna vaknar), sometimes linked to Gråterskan. Haunted Sweden treats her as legend presented by guides — not a documented historical person proven to haunt the ruin.",
      answerSv:
        "Hon är en folkloregestalt i slottets egen spökberättelse (När skuggorna vaknar), ibland kopplad till Gråterskan. Haunted Sweden behandlar henne som legend från guidningar — inte en dokumenterad historisk person bevisad att hemsöka ruinen.",
    },
    {
      question: "Can I take the official ghost tour?",
      questionSv: "Kan jag gå den officiella spökturen?",
      answer:
        "Yes when scheduled — När skuggorna vaknar runs seasonally (often autumn), typically ~45 minutes in Swedish, with age guidance around 12+. Check borgholmsslott.se for current dates.",
      answerSv:
        "Ja när den ges — När skuggorna vaknar körs säsongsvis (ofta höst), ca 45 min på svenska, åldersvägledning omkring 12+. Kolla borgholmsslott.se för aktuella datum.",
    },
    {
      question: "Is Borgholm open year-round?",
      questionSv: "Har Borgholm öppet året runt?",
      answer:
        "Opening hours are seasonal and event-driven. Confirm times, tickets and accessibility on the official Borgholms Slott website before travelling.",
      answerSv:
        "Öppettider är säsongs- och evenemangsberoende. Bekräfta tider, biljetter och tillgänglighet på Borgholms Slotts officiella webb innan resan.",
    },
    {
      question: "Has Haunted Sweden investigated Borgholm yet?",
      questionSv: "Har Haunted Sweden utrett Borgholm ännu?",
      answer:
        "Not yet. Status is investigation planned — photography, official ghost-tour attendance, well documentation and guide interviews for a history-vs-folklore brief.",
      answerSv:
        "Inte ännu. Status är utredning planerad — foto, officiell spöktur, brunnsdokumentation och guideintervjuer för brief historia kontra folklore.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
