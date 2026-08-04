/**
 * Add Blå Jungfrun (id 58) to haunted-places.json
 * Run: node scripts/add-bla-jungfrun.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "bla-jungfrun-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Bl%C3%A5_Jungfrun.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync(
    "curl.exe",
    ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl],
    { stdio: "inherit" }
  );
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "bla-jungfrun")) {
  console.error("bla-jungfrun already exists");
  process.exit(1);
}

const place = {
  id: "58",
  slug: "bla-jungfrun",
  name: "Blå Jungfrun",
  englishName: "Blå Jungfrun (Blue Maiden / Blåkulla)",
  coverImage: "/places/bla-jungfrun-cover.jpg",
  category: "Legend Site",
  city: "Oskarshamn",
  region: "Småland",
  country: "Sweden",
  address: "Blå Jungfrun National Park, Kalmarsund, Kalmar County, Sweden",
  latitude: 57.267,
  longitude: 16.795,
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
  hauntedSwedenScore: 10,
  hauntedSwedenInvestigation: {
    status: "not_investigated_yet",
  },
  suggestedHauntedSwedenTags: [
    "bla_jungfrun",
    "blakulla",
    "national_park",
    "witches",
    "folklore",
    "trojeborg",
    "stone_curse",
    "kalmarsund",
    "haunted_island",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Blå Jungfrun rises as a granite dome from the middle of Kalmarsund — Sweden's legendary Blåkulla island and a national park since 1926. For more than five centuries sailors, writers and folklore have linked the rock to witches, Maundy Thursday sabbaths and supernatural weather. Olaus Magnus wrote of the island in 1555; Carl Linnaeus landed in 1741 and recorded both its bleak beauty and the stone labyrinth Trojeborg. Modern visitors come by seasonal boat for cliffs, ancient deciduous forest, giant's kettles and the famous folk rule: never take a stone home — Oskarshamn Municipality regularly returns mailed stones. Haunted Sweden keeps Ice Age geology and park history separate from Blåkulla myth and the living stone-curse tradition. Follow national-park rules; stay on marked trails.",
  whyItFitsHauntedSweden:
    "Flagship folklore island: Blåkulla identification, National Park since 1926, Olaus Magnus and Linné layers, Trojeborg labyrinth, stone-curse tradition documented in local media, extreme photography and isolation. Visual 10/10, historical 10/10, folklore 10/10, paranormal reputation 9.5/10, mystique 10/10 — Haunted Sweden Score 10/10. Premium content EXTREMELY HIGH; research confidence VERY HIGH. Verification mission: boat expedition, Trojeborg and jättegrytor photography, guide interviews, history vs folklore documentary.",
  shortDescription:
    "Sweden's legendary Blåkulla island in Kalmarsund — granite national park (1926) with 500+ years of witch folklore, Trojeborg labyrinth, and the famous stone curse.",
  history: `## DOCUMENTED: Ice, granite and a national park

Blå Jungfrun is an uninhabited granite island in Kalmarsund between the Småland mainland and Öland, in Oskarshamn Municipality, Kalmar County. The island dome rises dramatically from the sea (summit commonly cited around 86 m). Sveriges Nationalparker and Länsstyrelsen Kalmar describe ice-sculpted red granite, polished bedrock, ädellövskog (deciduous forest), and numerous jättegrytor (giant's kettles) formed during the Ice Age. The national park covers land plus surrounding water (island land area is a majority of the park footprint); purpose in regulation is to preserve the island in its natural state.

## DOCUMENTED: Early human traces and Trojeborg

Archaeological and heritage writing places human activity on and around the island deep into prehistory (Stone Age presence is cited in popular heritage summaries). On the south side lies the stone labyrinth Trojeborg — roughly 18 m across with about 13 circuits laid on polished bedrock. Its exact age is unknown; it was already present when Carl Linnaeus visited in 1741. Linnaeus speculated a waiting sailor built it for favourable wind — a historically recorded opinion, not a proven origin. Walking the labyrinth is today framed as cultural heritage and folklore practice, not a dated ritual proven in excavation.

## DOCUMENTED: Olaus Magnus (1555) and Linnaeus (1741)

Olaus Magnus named the island in northern European geography (Carta Marina context 1539; Historia de gentibus septentrionalibus 1555) as a place associated with northern witches' gatherings — a Renaissance ethnographic claim, not a modern forensic investigation. Carl Linnaeus (Carl von Linné) landed during his Öland journey in June 1741. Sailors warned him not to call the rock Blåkulla (preferring Jungfrun / Känningen) lest storms rise — he recorded the stormy landing, the island's harsh appearance, dense woods, Trojeborg, and his famous sceptical remark that anyone who has been there will hardly wish to return, and that if any place looks dreadful, this is among the grimmest. Treat Linnaeus as a primary documentary witness for 1741 conditions and contemporary superstition, not as confirmation of witchcraft.

## DOCUMENTED: Quarrying 1904–1925 and park founding 1926

Red Jungfru granite (rapakivi-type decorative stone) was quarried on the south side from about 1904, with export notably to Germany; quarrying damaged dramatic geology including giant's kettles. Conservation campaigns followed (parliamentary motion for national park protection already 1914). In 1925 Torsten Kreuger financed purchase arrangements (with local advocates including County Governor John Falk) so quarrying could stop and the island could be given to the Crown. By royal decision of 5 February 1926 (SFS 1926:16 context), Blå Jungfrun was established as a national park — among Sweden's early parks. The park was later extended (1988). Management today involves Naturvårdsverket with Länsstyrelsen Kalmar; seasonal boat tours typically depart Oskarshamn and Byxelkrok when weather allows.

## DOCUMENTED dark / maritime context (no invented disasters)

Isolation, steep shores and Kalmarsund weather made the island hazardous for small craft — Linnaeus's near-wreck landing is a documented example of sea risk, not a catalogue of named mass tragedies. Sailors historically avoided or euphemised the island's name. Quarrying brought temporary worker housing later removed when the park was formed. Do not invent undocumented shipwreck lists or executions on the island.`,

  legend: `## FOLKLORE: Blåkulla and witch traditions (not proven history)

From at least the 1400s (as summarised by Länsstyrelsen / Sveriges Nationalparker), magical beliefs about witches and sorcery surrounded Blå Jungfrun. In Swedish folk tradition Blåkulla is the mythical mountain where witches flew on Maundy Thursday (skärtorsdagen) to meet the Devil. The island became popularly identified with that Blåkulla — a folklore identification layered onto a real rock in Kalmarsund. Olaus Magnus (1555) already framed Jungfrun as a meeting place for northern witches testing magic. Swedish witch-trial eras elsewhere in the realm drew on Blåkulla imagery; that does not mean documented sabbaths occurred on this island. Separate: (A) real island geography and park status; (B) centuries of Blåkulla storytelling; (C) any modern paranormal claim.

## FOLKLORE: The stone curse (modern living tradition)

A widespread belief holds that visitors must never remove a stone from Blå Jungfrun or bad luck follows until the stone returns. This is folklore — not a verified physical curse. Yet it is a documented social practice: Oskarshamn Municipality and guides (e.g. SVT Småland reporting) regularly receive stones mailed or delivered with letters linking accidents, illness or misfortune to the souvenir; stones are periodically returned to the island. Mark dates on returned stones (even decades later) appear in media coverage. Haunted Sweden presents this as contemporary folklore behaviour, not scientific proof.

## MODERN ATMOSPHERE & WITNESS-STYLE REPORTS (anecdotal)

Visitors and guides describe sudden silence in the forest, feelings of being watched on cliffs, heavy weather mood, odd sounds in fog, and shadow-like impressions among boulders — typical high-mystique landscape reports. Treat as experience narrative unless tied to a named, documented investigation. Special haunted / mythic areas: (1) Trojeborg labyrinth — ritual mystery folklore; (2) Summit — panoramic Kalmarsund and Blåkulla associations; (3) Giant's kettles — Ice Age geology with uncanny shapes; (4) Deciduous forest — Linné's dense woods, deep quiet; (5) Boulder shore / Stensliperiet — stone-curse photography zone.

## Atmosphere, investigation ideas, best conditions

Granite cliffs from the sea, ancient deciduous canopy, sea caves and fog make Blå Jungfrun one of Sweden's most mythical landscapes. Investigation ideas (where permitted): Is Blå Jungfrun the real Blåkulla?; Trojeborg walk; stone-curse documentary ethics; history vs folklore; respectful daytime EVP only with park approval. Best conditions: heavy sea fog, sunrise/sunset, calm weather, autumn, blue hour. Never remove stones or disturb fornlämningar; stay on marked trails.`,

  safetyNote:
    "National park — follow Sveriges Nationalparker / Länsstyrelsen Kalmar rules. Reach only by seasonal boat tours (Oskarshamn, Byxelkrok) or authorised craft; landings depend on weather. Stay on marked trails; rocky terrain can be slippery. Do not remove stones, plants or cultural remains. Overnight and fires are restricted — only where officially permitted. No drones or disturbance without checking current park regulations.",

  sourceLinks: [
    "https://www.sverigesnationalparker.se/park/bla-jungfrun-nationalpark/",
    "https://www.lansstyrelsen.se/kalmar/besoksmal/nationalparker/bla-jungfrun.html",
    "https://lagen.nu/1926:16",
    "https://sv.wikipedia.org/wiki/Bl%C3%A5_Jungfrun",
    "https://sv.wikipedia.org/wiki/Bl%C3%A5_Jungfruns_nationalpark",
    "https://www.svt.se/nyheter/lokalt/smaland/otursstenar-aterforda-till-bla-jungfrun",
    "https://kalmarlansmuseum.se/wp-content/uploads/2022/05/blajungfrun.pdf",
  ],

  paranormalType: [
    "Local Folklore",
    "Heavy Atmosphere",
    "Apparition",
    "Voices",
    "Paranormal Sightings",
  ],
  accessType: "Guided Visits",
  familyFriendly: true,
  visitDifficulty: 3,
  nightAccess: false,
  parkingAvailable: false,
  guidedTours: true,
  publicAccess: true,
  evidenceCount: 0,
  reportCount: 0,
  photoCount: 1,
  videoCount: 0,
  googlePlaceId: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=57.267,16.795",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/bla-jungfrun-cover.jpg",
      caption: "Blå Jungfrun National Park, Kalmarsund",
      captionSv: "Blå Jungfruns nationalpark, Kalmarsund",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Sveriges legendariska Blåkulla-ö i Kalmarsund — granitnationalpark sedan 1926 med över 500 års häxfolklore, Trojeborg och den berömda stenförbannelsen.",
  historySv: `## DOKUMENTERAT: Is, granit och nationalpark

Blå Jungfrun är en obebodd granitö i Kalmarsund mellan Smålandskusten och Öland, i Oskarshamns kommun, Kalmar län. Ön reser sig dramatiskt ur havet (topp ofta angiven omkring 86 m). Sveriges Nationalparker och Länsstyrelsen Kalmar beskriver isslipad röd granit, hällar, ädellövskog och många jättegrytor från istiden. Nationalparken omfattar land och vatten; syftet är att bevara ön i naturligt tillstånd.

## DOKUMENTERAT: Tidiga spår och Trojeborg

Arkeologi och kulturarv pekar på mänsklig närvaro sedan stenåldern i bredare sammanhang. På sydsidan ligger stenlabyrinten Trojeborg — ca 18 m, omkring 13 varv på polerat berg. Åldern är okänd; den fanns när Linné besökte 1741. Linné gissade att en sjöman lagt den i väntan på vind — dokumenterad åsikt, inte bevisat ursprung.

## DOKUMENTERAT: Olaus Magnus (1555) och Linné (1741)

Olaus Magnus nämner ön i nordisk geografi (Carta Marina 1539; Historia 1555) som plats för nordiska häxors möten — renässansetnografi, inte modern utredning. Carl von Linné landsteg i juni 1741. Sjöfolk varnade för namnet Blåkulla (föredrog Jungfrun/Känningen) av stormskäl; han beskrev stormig landning, öns hiskeliga utseende, tät skog, Trojeborg och sin berömda skepsis. Linné är primärkälla för 1741 — inte bevis för trolldom.

## DOKUMENTERAT: Stenbrott 1904–1925 och park 1926

Röd jungfrugranit bröts från ca 1904 på sydsidan (export bl.a. till Tyskland) och skadade geologi inklusive jättegrytor. Skyddskamp följde (motion om nationalpark 1914). 1925 finansierade Torsten Kreuger friköp (med bl.a. landshövding John Falk) så brottet upphörde och ön kunde skänkas till kronan. Den 5 februari 1926 avsattes Blå Jungfrun till nationalpark. Utvidgning 1988. Förvaltning: Naturvårdsverket / Länsstyrelsen Kalmar; säsongsbåtar från Oskarshamn och Byxelkrok vid lämpligt väder.

## DOKUMENTERAD mörk/maritim kontext (inga påhittade katastrofer)

Isolering och Kalmarsundsväder gjorde landningar farliga — Linnés nästan-vrak är dokumenterad sjörisk, inte inventerad katastroflista. Sjöfolk undvek eller omskrev öns namn. Stenbrottet hade tillfällig arbetarbostad som senare revs.`,

  legendSv: `## FOLKLORE: Blåkulla och häxtraditioner (inte bevisad historia)

Redan på 1400-talet (enligt Länsstyrelsen/Sveriges Nationalparker) omgavs ön av magiska föreställningar. I svensk folktro är Blåkulla berget dit häxor for på skärtorsdagen. Ön identifierades populärt med denna Blåkulla — folklore ovanpå en verklig klippa. Olaus Magnus (1555) skildrar Jungfrun som mötesplats för nordiska häxor. Håll isär: (A) geografi och nationalpark; (B) Blåkulla-sägner; (C) moderna paranormala påståenden.

## FOLKLORE: Stenförbannelsen (levande modern tradition)

Tron att den som tar en sten drabbas av otur tills stenen återförs är folklore — inte verifierad fysisk förbannelse. Men praxisen är dokumenterad: Oskarshamns kommun och guider (t.ex. SVT) tar emot stenar med brev om olycka; stenar återförs till ön. Presentera som samtida folktro, inte vetenskapligt bevis.

## MODERNA ATMOSFÄR- OCH UPPLEVELSERAPPORTER (anekdotiska)

Besökare beskriver plötslig tystnad, känsla av att bli iakttagen, tung väderstämning, ljud i dimma och skugglika intryck. Behandla som upplevelsenarrativ. OMRÅDEN: Trojeborg; toppen; jättegrytor; ädellövskog; blockstrand/Stensliperiet. Följ nationalparksregler; ta aldrig sten.`,

  hauntedSwedenAppSummarySv:
    "Blå Jungfrun reser sig som en granitdom mitt i Kalmarsund — Sveriges legendariska Blåkulla-ö och nationalpark sedan 1926. Över 500 års sjöfolks- och häxfolklore, Olaus Magnus 1555, Linnés besök 1741, labyrinten Trojeborg och den levande stenförbannelsen (kommunen återför postsända stenar) gör ön till en flaggskeppsplats. Haunted Sweden skiljer istidsgeologi och parkhistoria från Blåkulla-myt. Följ nationalparksregler; gå på markerade leder.",
  safetyNoteSv:
    "Nationalpark — följ Sveriges Nationalparker / Länsstyrelsen Kalmar. Nås med säsongsbåt (Oskarshamn, Byxelkrok) eller behörig farkost; landning väderberoende. Håll dig till markerade leder; hala klippor. Ta aldrig sten, växter eller fornlämningsmaterial. Övernattning och eld endast där det är tillåtet. Kontrollera gällande regler för drönare.",
  infoBox: [
    {
      label: "National park since",
      labelSv: "Nationalpark sedan",
      value: "1926",
      valueSv: "1926",
    },
    {
      label: "Also known as",
      labelSv: "Även känd som",
      value: "Blåkulla",
      valueSv: "Blåkulla",
    },
    {
      label: "County",
      labelSv: "Län",
      value: "Kalmar",
      valueSv: "Kalmar",
    },
    {
      label: "Access",
      labelSv: "Tillgång",
      value: "Seasonal boat (Oskarshamn / Byxelkrok)",
      valueSv: "Säsongsbåt (Oskarshamn / Byxelkrok)",
    },
    {
      label: "Famous folklore",
      labelSv: "Känd folklore",
      value: "Witches · Trojeborg · Stone curse",
      valueSv: "Häxor · Trojeborg · Stenförbannelse",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Investigation planned",
      valueSv: "Utredning planerad",
    },
    {
      label: "Haunted Sweden Score",
      labelSv: "Haunted Sweden-poäng",
      value: "10/10",
      valueSv: "10/10",
    },
  ],
  faq: [
    {
      question: "Is Blå Jungfrun the same as Blåkulla?",
      questionSv: "Är Blå Jungfrun samma sak som Blåkulla?",
      answer:
        "In folklore, yes — the island is traditionally identified with mythical Blåkulla. Historically it is a real granite island and national park. Haunted Sweden separates the place-name folklore from documented geology and park history.",
      answerSv:
        "I folkloren ja — ön identifieras traditionellt med mytiska Blåkulla. Historiskt är det en verklig granitö och nationalpark. Haunted Sweden skiljer ortnamnsfolklore från dokumenterad geologi och parkhistoria.",
    },
    {
      question: "Can I take a stone as a souvenir?",
      questionSv: "Får jag ta med en sten som souvenir?",
      answer:
        "No. Park rules protect nature and cultural remains, and local folklore says stones bring bad luck until returned. Oskarshamn Municipality regularly receives mailed stones and returns them to the island.",
      answerSv:
        "Nej. Nationalparksregler skyddar natur och fornlämningar, och lokal folklore säger att stenar ger otur tills de återförs. Oskarshamns kommun tar regelbundet emot postsända stenar och återför dem.",
    },
    {
      question: "How do I visit Blå Jungfrun?",
      questionSv: "Hur besöker jag Blå Jungfrun?",
      answer:
        "Seasonal boat tours typically run from Oskarshamn and Byxelkrok when weather allows. Check current schedules and national-park visitor guidance before travel. Landing is weather-dependent.",
      answerSv:
        "Säsongsbåtar går vanligtvis från Oskarshamn och Byxelkrok när vädret tillåter. Kontrollera aktuella tider och nationalparkens besöksinformation. Landning är väderberoende.",
    },
    {
      question: "What did Linnaeus write about the island?",
      questionSv: "Vad skrev Linné om ön?",
      answer:
        "In 1741 Carl Linnaeus recorded a stormy landing, sailors' fear of the name Blåkulla, the Trojeborg labyrinth, and a blunt description of the island as grim — valuable historical testimony, not paranormal proof.",
      answerSv:
        "1741 beskrev Carl von Linné en stormig landning, sjöfolks rädsla för namnet Blåkulla, labyrinten Trojeborg och ön som hiskelig — värdefull historisk vittnesbörd, inte paranormalt bevis.",
    },
    {
      question: "Has Haunted Sweden investigated Blå Jungfrun yet?",
      questionSv: "Har Haunted Sweden utrett Blå Jungfrun ännu?",
      answer:
        "Not yet. Status is investigation planned — a future boat expedition with photography of Trojeborg and giant's kettles, guide interviews, and a history-vs-folklore documentary brief.",
      answerSv:
        "Inte ännu. Status är utredning planerad — framtida båtexpedition med foto av Trojeborg och jättegrytor, guideintervjuer och dokumentärbrief historia kontra folklore.",
    },
  ],
};

data.places.push(place);
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "id", place.id, "cover bytes", fs.statSync(coverPath).size);
