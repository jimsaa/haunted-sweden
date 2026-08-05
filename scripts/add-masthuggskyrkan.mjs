/**
 * Add Masthuggskyrkan / Gamla Masthuggskyrkan legends (id 61)
 * Run: node scripts/add-masthuggskyrkan.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "masthuggskyrkan-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/5/55/Masthuggskyrkan_September_2014_05.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "masthuggskyrkan")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "61",
  slug: "masthuggskyrkan",
  name: "Gamla Masthuggskyrkan – Legenden om Vita Damen och den Svarta Prästen",
  englishName: "Masthuggskyrkan – White Lady & Black Priest Legends",
  coverImage: "/places/masthuggskyrkan-cover.jpg",
  category: "Church / Cemetery",
  city: "Göteborg",
  region: "Västra Götaland",
  country: "Sweden",
  address: "Storebackegatan 15, 413 18 Göteborg, Sweden",
  latitude: 57.6948,
  longitude: 11.9448,
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
  hauntedSwedenScore: 8.9,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "masthuggskyrkan",
    "goteborg",
    "white_lady",
    "black_priest",
    "haunted_church",
    "urban_legend",
    "national_romantic",
    "ghost_walk",
    "vastkusten",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Masthuggskyrkan crowns Stigberget above Göteborg harbour — a National Romantic brick landmark designed by Sigfrid Ericson and built 1910/11–1914 for the new Masthuggs parish. Its ~60-metre tower and panoramic city views made it a sailor’s seamark and one of Göteborg’s most photographed silhouettes. Documented history includes the parish decision to build, Ericson’s winning competition design, consecration in October 1914, and bells that rang on 2 August 1914 for wartime mobilisation before the official inauguration. Local urban legends later attached the White Lady (Vita damen) and the Black Priest (Svarta prästen) to the church and its surroundings; these appear mainly in ghost-list and tourism storytelling, not on Svenska kyrkan’s official history pages. Haunted Sweden keeps Riksantikvarieämbetet / parish chronology separate from folklore. Fog, blue hour and evening light turn the ridge into one of Västkusten’s most atmospheric church settings — history first, legend clearly labelled.",
  whyItFitsHauntedSweden:
    "One of Göteborg’s most iconic buildings: outstanding National Romantic architecture, panoramic Stigberget location, sailor-landmark role, and well-circulated White Lady / Black Priest urban legends. Visual 10/10, historical 9.5/10, architectural 10/10, folklore 8.5/10, paranormal reputation 8.0/10 — Haunted Sweden Score 8.9. Strong Göteborg collection addition; premium content HIGH; research confidence HIGH (history) / MEDIUM (folklore).",
  shortDescription:
    "Göteborg’s National Romantic landmark church on Stigberget (1910/11–1914, Sigfrid Ericson) — panoramic views, sailor seamark, and urban legends of the White Lady and the Black Priest.",
  history: `## DOCUMENTED: Why Masthuggskyrkan was built

Masthuggs parish was formed 1 January 1908 (split from earlier parish structures). Already in 1906 church authorities decided a new parish church was needed. Proposed sites included using S:t Johanneskyrkan (too small), Gamla Varvsparken (later Sjöfartsmuseet), or the crown of Stigberget. On 12 September 1907 Göteborg city council granted the Stigberget plot (Majornas 5:e rote). An architectural competition began 4 November 1907; Sigfrid Ericson’s National Romantic proposal (“15/2”) was accepted 24 May 1909. Drawings were fixed in 1910; builder Ivar Burman started work in December 1910.

## DOCUMENTED: Construction 1910/11–1914 and Sigfrid Ericson

Riksantikvarieämbetet’s Bebyggelseregistret records new construction 1910–1914 (often summarised 1911–1914) after Ericson’s designs: nave, choir, sacristy, transepts, tower and baptismal chapel, linked to parish premises. Cost rose from an estimated ~365,000 to about 526,000 kronor. Bishop Edvard Herman Rodhe consecrated the church in October 1914 (Wikipedia and parish tradition cite 14 October; BeBR summarises 11 October — treat inauguration as October 1914). Capacity about 1,050 (including galleries).

## DOCUMENTED: World War I bells before inauguration

Two bells cast 1914 at Götaverken (large ~3,200 kg, small ~2,000 kg). On 2 August 1914 — before official consecration — the bells, like others in the city, rang between 08:00 and 11:00 at ten-minute intervals to announce general mobilisation at the outbreak of World War I. BeBR explicitly notes the bells first rang to announce the war before the church was inaugurated.

## DOCUMENTED: National Romantic architecture and landmark role

Hand-struck red brick (Börringe), fieldstone base, monk-and-nun tile roof, copper-clad iron spire, ~60 m tower (cockerel ~127 m above sea level). Timber ceiling, whitewashed brick interior, limestone floors and pier details; wrought-iron crowns with dragon heads. Altar triptych design by Ericson; sculptures by Ninnan Santesson; painting by Engelbert Bertel-Nordström / Bertel Nordström (altarpiece completed 1923; triumph crucifix 1925). Ship model of the full-rigger Java gifted by Göteborgs Sjöfartsmuseum (1944). Organ originally 1914 (Johannes Magnusson); later rebuilds — today the largest church organ in Göteborg diocese. City engineer Albert Lilienberg praised the silhouette as defining the formerly bare ridge for Majorna and Masthugget. The tower remains a panoramic landmark for sailors and citizens; Svenska kyrkan notes ~100,000 visitors yearly and seasonal guided tower climbs.

## DOCUMENTED: Masthugget / Stigberget before the church

Name Masthugget (Mastehugget, 1647) from mast-making for sailing ships. From the 1600s Stigberget slopes held dense wooden housing for sailors, harbour and yard workers — steep lanes, overcrowding, and hard living conditions documented in Göteborg Stadsmuseum and local history (Sjömanshuset and related institutions served maritime welfare). Late 1800s–early 1900s growth as a working-class district (“Röda Masthugget”); 1960s–70s clearance replaced most old wooden fabric. A few Storebackegatan houses near the church recall Gamla Masthugget. The standing church is not a ruin — popular ghost-list titles saying “Gamla Masthuggskyrkan är en ruin” confuse folklore branding with the active 1914 landmark.

## DOCUMENTED dark / wartime / parish context (no invented tragedies)

Hard living conditions in old Masthugget (cramped worker housing, harbour poverty) are historically attested. Wartime link: August 1914 mobilisation ringing. February 1940 fuel shortage closed several Göteborg churches temporarily, including Masthugget’s. Parish life includes ordinary funerals and mourning as at any active church — do not invent specific undocumented deaths as “haunted history.”`,

  legend: `## FOLKLORE vs HISTORY — research note (confidence: MEDIUM)

Official Svenska kyrkan and BeBR pages document architecture and parish history; they do not present White Lady or Black Priest narratives as historical fact. Those motifs circulate mainly in online haunted-place lists, tourism/ghost-walk style copy, and oral/urban-legend culture. Haunted Sweden has not found archival parish “first sighting” records proving older documented hauntings. Treat legends as folklore / modern storytelling unless primary sources appear.

## URBAN LEGEND / FOLKLORE: The White Lady (Vita damen)

Popular tellings speak of a woman in white near the church — sometimes framed as a jilted bride left at the altar, or as a figure at a “church ruin.” That ruin framing does not match the standing National Romantic church at Storebackegatan 15. Descriptions of apparitions, cold air, and churchyard sightings are anecdotal and secondary. Origin: oral tradition and modern ghost-list/ghost-walk culture rather than verified historical biography. Do not present the White Lady as documented history.

## URBAN LEGEND / FOLKLORE: The Black Priest (Svarta prästen)

Stories describe a black-clad priestly figure near pillars, doors or shadowy corners of the church — a classic Swedish “dark cleric” motif. Reports are local anecdote and tourism narrative. No confirmed link to a named historical priest in parish archives was found in this research pass. Whether the tale predates commercial ghost tours is unclear; current evidence points to modern circulation more than early printed folklore collections. Label as folklore.

## MODERN WITNESS-STYLE REPORTS (anecdotal — not controlled investigations)

Visitor and list-site motifs include apparitions, footsteps in empty space, unexplained organ-like sound, cold spots, shadow figures, and feeling watched — especially in the nave, tower approaches, churchyard, and main entrance (often cited as a ghost-walk meeting point in tourism copy). No peer-reviewed paranormal investigation of Masthuggskyrkan was located. Record as subjective experience and urban reputation, not proven hauntings.

## Special haunted areas (atmosphere + legend — not verified hotspots)

1. Main nave — historic National Romantic interior, heavy atmosphere.
2. Church tower — panoramic views; folklore attaches mystery to height and darkness (official tower visits are guided heritage tours, not ghost hunts).
3. Churchyard / exterior grounds — reported apparition motifs in folklore lists.
4. Main entrance — traditional meetup point in ghost-walk marketing.

## Atmosphere, investigation ideas, best conditions

Massive brick church, stone base, ~60 m tower, evening lighting, fog over Göteborg, quiet churchyard, views across harbour and city. Investigation ideas (with permission / respect for worship): White Lady folklore mapping; Black Priest legend origins; night photography from Stigberget; history vs folklore documentary; EVP only where explicitly permitted. Best conditions: blue hour, winter evenings, heavy fog, rain after sunset. Accessibility: church open during published hours (~100,000 visitors/year); grounds publicly approachable; respect services; outdoor photography generally fine — confirm indoor rules.`,

  safetyNote:
    "Active parish church (Svenska kyrkan / Masthuggs församling) — respect opening hours, services, funerals and quiet visitors. Tower climbs are guided and seasonal when offered. Uneven stone and steep Stigberget streets can be slippery in rain or ice. No overnight stays. Do not disturb worship or invent ‘investigations’ during services.",

  sourceLinks: [
    "https://www.svenskakyrkan.se/carl-johans-pastorat/masthugg/masthuggskyrkan",
    "https://bebyggelseregistret.raa.se/bbr2/byggnad/visaHistorik.raa?byggnadId=21400000238459&page=historik&visaHistorik=true",
    "https://sv.wikipedia.org/wiki/Masthuggskyrkan",
    "https://sv.wikipedia.org/wiki/Masthugget",
    "https://sv.wikipedia.org/wiki/Stigberget,_G%C3%B6teborg",
    "https://www.masthuggspojkarna.se/om-oss/masthuggets-historia-9179185",
    "https://www.svenskakyrkan.se/carl-johans-pastorat/masthugg/nyheter/upptack-masthuggskyrkans-torn",
  ],

  paranormalType: [
    "Apparition",
    "Ghostly Lady",
    "Shadow Figures",
    "Footsteps",
    "Temperature Changes",
    "Heavy Atmosphere",
    "Local Folklore",
    "Urban Legend",
  ],
  accessType: "Public Landmark",
  familyFriendly: true,
  visitDifficulty: 2,
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
    "https://www.google.com/maps/search/?api=1&query=Storebackegatan+15,+413+18+G%C3%B6teborg,+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/masthuggskyrkan-cover.jpg",
      caption: "Masthuggskyrkan, Göteborg — National Romantic landmark on Stigberget",
      captionSv: "Masthuggskyrkan, Göteborg — nationalromantiska landmärket på Stigberget",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Göteborgs nationalromantiska landmärkeskyrka på Stigberget (1910/11–1914, Sigfrid Ericson) — panoramavyer, sjömanssiktmärke och urban legends om Vita damen och Svarta prästen.",
  historySv: `## DOKUMENTERAT: Varför Masthuggskyrkan byggdes

Masthuggs församling bildades 1 januari 1908. Redan 1906 beslutades att en ny församlingskyrka behövdes. Tomt på Stigberget uppläts 12 september 1907. Arkitekttävling från 4 november 1907; Sigfrid Ericsons nationalromantiska förslag antogs 24 maj 1909. Byggstart december 1910 under Ivar Burman.

## DOKUMENTERAT: Bygge 1910/11–1914 och Sigfrid Ericson

Enligt Riksantikvarieämbetets BeBR uppfördes kyrkan 1910–1914 (ofta sammanfattat 1911–1914) efter Ericsons ritningar. Invigning oktober 1914 (Wikipedia/församlingstradition 14 oktober; BeBR anger 11 oktober). Plats för ca 1 050 personer.

## DOKUMENTERAT: Första världskrigets klockringning före invigning

Två klockor gjutna 1914 vid Götaverken. Den 2 augusti 1914 — före den officiella invigningen — ringde klockorna (liksom andra i staden) mellan kl. 8 och 11 med tio minuters mellanrum och kungjorde allmän mobilisering vid krigsutbrottet. BeBR noterar uttryckligen att klockorna ringde för kriget innan kyrkan invigdes.

## DOKUMENTERAT: Nationalromantisk arkitektur och landmärke

Handslaget rött tegel, naturstenssockel, ca 60 m torn, kopparspira. Interiör med timmertak, kalkstensgolv, altarskåp (Santesson / Nordström, 1923), triumfkrucifix 1925. Stifts största kyrkorgel. Lilienberg framhöll silhuetten som avgörande för Majornas och Masthuggets stadsbild. Svenska kyrkan: ca 100 000 besökare per år; säsongsvis tornvisningar.

## DOKUMENTERAT: Masthugget före kyrkan

Namnet från masttillverkning (1647). Stigberget: sjöfolkets och hamnarbetarnas trähusmiljö med trångboddhet och hårda villkor (Göteborgs stadsmuseum m.fl.). 1960-talets sanering raderade det mesta av Gamla Masthugget. Den stående kyrkan är ingen ruin — spöklistor som kallar den “ruin” blandar folklore med den aktiva 1914-kyrkan.

## DOKUMENTERAD mörk/krigs-/församlingskontext (inga påhittade tragedier)

Dokumenterad trångboddhet och fattigdom i gamla Masthugget; mobiliseringsringning augusti 1914; tillfällig stängning februari 1940 p.g.a. bränslebrist. Vanliga begravningar hör till församlingsliv — hitta inte på odokumenterade dödsfall som “spökhistoria”.`,

  legendSv: `## FOLKLORE kontra HISTORIA — forskningsnot (konfidens: MEDEL)

Svenska kyrkan och BeBR dokumenterar arkitektur och församlingshistoria — inte Vita damen eller Svarta prästen som historiska fakta. Motiven cirkulerar främst i nätlistor, turism-/spökvandringsstil och muntlig urban legend. Inga arkivfynd av tidiga “första observationer” i denna research. Behandla som folklore/modern storytelling.

## URBAN LEGEND: Vita damen

Berättelser om kvinna i vitt — ibland brud lämnad vid altaret, ibland kopplad till “kyrkoruin” (stämmer inte med den stående kyrkan). Anekdotiska syner och köld. Ursprung: muntlig tradition och modern spöklistkultur, inte verifierad biografi.

## URBAN LEGEND: Svarta prästen

Svartklädd prästgestalt vid pelare/dörrar — klassiskt motiv. Anekdot och turismnarrativ; ingen säker koppling till namngiven historisk präst funnen här. Om legenden föregår moderna spökturer är oklart; nuvarande spår pekar mot modern cirkulation.

## MODERNA UPPLEVELSER (anekdotiska)

Apparitioner, fotsteg, orgelliknande ljud, köld, skuggfigurer, känsla av att bli iakttagen — långhus, torn, kyrkogård/utomhus, huvudingång. Inga peer-reviewed paranormala utredningar lokaliserade. OMRÅDEN ovan = atmosfär + legend, inte verifierade “hotspots”. Respektera gudstjänst; fotografera utomhus fritt, kontrollera inomhusregler.`,

  hauntedSwedenAppSummarySv:
    "Masthuggskyrkan tronar på Stigberget över Göteborgs hamn — nationalromantiskt tegellandmärke av Sigfrid Ericson, byggt 1910/11–1914 för den nya Masthuggs församlingen. Det ca 60 meter höga tornet och panoramavyerna gjorde kyrkan till sjömanssiktmärke och en av stadens mest fotograferade silhuetter. Dokumenterad historia omfattar församlingsbeslut, Ericsons tävlingsvinst, invigning oktober 1914 och klockor som ringde 2 augusti 1914 för mobilisering före den officiella invigningen. Senare urban legends knyter Vita damen och Svarta prästen till platsen — främst i spöklistor och turismberättelser, inte på Svenska kyrkans officiella historiksidor. Haunted Sweden håller isär BeBR/församlingskronologi och folklore. Dimma, blåtimme och kvällsljus gör åsen till en av Västkustens mest atmosfäriska kyrkomiljöer.",
  safetyNoteSv:
    "Aktiv församlingskyrka (Svenska kyrkan / Masthuggs församling) — respektera öppettider, gudstjänster, begravningar och tysta besökare. Tornvisningar är guidade och säsongsvisa när de erbjuds. Ojämn sten och branta Stigbergsgator kan vara hala. Ingen övernattning. Stör inte gudstjänst.",
  infoBox: [
    {
      label: "Built",
      labelSv: "Byggd",
      value: "1910/11–1914 · Sigfrid Ericson",
      valueSv: "1910/11–1914 · Sigfrid Ericson",
    },
    {
      label: "Style",
      labelSv: "Stil",
      value: "National Romantic",
      valueSv: "Nationalromantisk",
    },
    {
      label: "Tower",
      labelSv: "Torn",
      value: "~60 m · panoramic views",
      valueSv: "ca 60 m · panoramavyer",
    },
    {
      label: "WWI bells",
      labelSv: "Krigsklockor",
      value: "Rang 2 Aug 1914 (mobilisation)",
      valueSv: "Ringde 2 aug 1914 (mobilisering)",
    },
    {
      label: "Folklore",
      labelSv: "Folklore",
      value: "White Lady · Black Priest (urban legend)",
      valueSv: "Vita damen · Svarta prästen (urban legend)",
    },
    {
      label: "Access",
      labelSv: "Tillträde",
      value: "Open daily (parish hours)",
      valueSv: "Öppen dagligen (församlingens tider)",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 8.9 · Premium HIGH",
      valueSv: "Poäng 8.9 · Premium HÖG",
    },
  ],
  faq: [
    {
      question: "Is Masthuggskyrkan really a ruined church?",
      questionSv: "Är Masthuggskyrkan verkligen en kyrkoruin?",
      answer:
        "No. The landmark at Storebackegatan 15 is an active parish church completed and consecrated in 1914. Some ghost-list sites wrongly call “Gamla Masthuggskyrkan” a ruin — that framing is folklore branding, not the building’s documented status.",
      answerSv:
        "Nej. Landmärket på Storebackegatan 15 är en aktiv församlingskyrka invigd 1914. Vissa spöklistor kallar felaktigt “Gamla Masthuggskyrkan” för ruin — det är folkloreetikett, inte byggnadens dokumenterade status.",
    },
    {
      question: "Did the church bells ring for World War I before inauguration?",
      questionSv: "Ringde kyrkklockorna för första världskriget före invigningen?",
      answer:
        "Yes — documented in BeBR and local history: on 2 August 1914 the new bells rang with other Göteborg churches to announce general mobilisation, before the October 1914 consecration.",
      answerSv:
        "Ja — dokumenterat i BeBR och lokalhistoria: den 2 augusti 1914 ringde de nya klockorna tillsammans med andra Göteborgskyrkor för allmän mobilisering, före invigningen i oktober 1914.",
    },
    {
      question: "Who are the White Lady and the Black Priest?",
      questionSv: "Vem är Vita damen och Svarta prästen?",
      answer:
        "They are urban-legend / folklore figures linked to the church in modern haunted-place lists and oral storytelling — not verified historical persons in parish archives. Haunted Sweden labels them clearly as legend.",
      answerSv:
        "De är urban-legend-/folkloregestalter knutna till kyrkan i moderna spöklistor och muntlig storytelling — inte verifierade historiska personer i församlingsarkiv. Haunted Sweden märker dem tydligt som legend.",
    },
    {
      question: "Can visitors go inside and up the tower?",
      questionSv: "Kan besökare gå in och upp i tornet?",
      answer:
        "The church is open during published parish hours (often daily). Guided tower visits are offered seasonally when announced by Masthuggs församling — book or check svenskakyrkan.se. Respect services.",
      answerSv:
        "Kyrkan är öppen under publicerade församlingstider (ofta dagligen). Guidade tornvisningar erbjuds säsongsvis när församlingen annonserar — kolla svenskakyrkan.se. Respektera gudstjänster.",
    },
    {
      question: "Has Haunted Sweden investigated Masthuggskyrkan yet?",
      questionSv: "Har Haunted Sweden utrett Masthuggskyrkan ännu?",
      answer:
        "Not yet. Planned verification: night photography from Stigberget, interviews with church guides, folklore-archive checks, comparing ghost-walk stories with historical sources, and a history-vs-folklore documentary episode.",
      answerSv:
        "Inte ännu. Planerad verifiering: nattfotografi från Stigberget, intervjuer med kyrkoguider, folklorearkiv, jämförelse spökvandringsberättelser mot historiska källor, och dokumentärepisod historia kontra folklore.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
