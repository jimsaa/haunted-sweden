/**
 * Add Trollkyrka, Tiveden National Park (id 63)
 * Run: node scripts/add-trollkyrka.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "trollkyrka-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/f/f0/Trollkyrka_trail_2.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "trollkyrka")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "63",
  slug: "trollkyrka",
  name: "Trollkyrka (Tiveden)",
  englishName: "Trollkyrka – Troll’s Church (Tiveden National Park)",
  coverImage: "/places/trollkyrka-cover.jpg",
  category: "Legend Site",
  city: "Tived",
  region: "Örebro",
  country: "Sweden",
  address: "Tivedens Nationalpark, 695 97 Tived, Sweden",
  latitude: 58.76,
  longitude: 14.78,
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
  hauntedSwedenScore: 9.8,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "trollkyrka",
    "tiveden",
    "national_park",
    "blot",
    "pagan_rituals",
    "sacred_site",
    "swedish_folklore",
    "ancient_forest",
    "mystery",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Trollkyrka (“Troll’s Church”) is a dramatic rocky outcrop deep inside Tiveden National Park — one of southern Sweden’s wildest ancient forests between Vänern and Vättern. Official park material presents ice-scoured granite, crack-valley terrain and the demanding Trollkyrkerundan hike; the name Trollkyrka appears in writing from the 1600s, and the ridges once served as seamarks across Vättern. Documented folklore — collected by B. Gösta Carlshult around 1940 and popularised by Hans Lidman in Gudanatt (1972) — tells of secret night ceremonies, a masked “prelatus,” blood offerings and a rule that outsiders who saw the rites risked death in a forest bog or forced initiation into a brotherhood. Those secrecy motifs are often linked to the era when non-Christian ritual could mean capital punishment (commonly cited 1604–1735), but they are oral/literary tradition, not archaeological proof of a Norse blót site. Haunted Sweden keeps national-park geology and trail facts separate from the poem and legend. Fog among moss-covered blocks makes Trollkyrka one of Sweden’s most mysterious natural landmarks.",
  whyItFitsHauntedSweden:
    "Flagship folklore destination: National Park wilderness, unique secret-ritual traditions, deep historical mystery without castle walls. Visual 10/10, historical 10/10, folklore 10/10, paranormal reputation 8.5/10, mystique 10/10 — Haunted Sweden Score 9.8. Premium EXTREMELY HIGH; research confidence VERY HIGH.",
  shortDescription:
    "Granite “Troll’s Church” in Tiveden National Park — documented folklore of secret pagan rites and death-penalty-era secrecy, not archaeological proof of blót.",
  history: `## DOCUMENTED: Geology and Tiveden’s wilderness

Trollkyrka is a prominent rocky knoll / butte-like formation in the heart of **Tiveden National Park** (Laxå / Karlsborg area; managed by **Länsstyrelsen Örebro**). The landscape is a classic ice-age **sprickdalslandskap**: ice-scoured granite, glacial striations, chaotic boulder fields (blocks up to ~10 m), mossy passages, mires and old pine forest shaped by natural fire. Sveriges Nationalparker describes one of southern Sweden’s wildest continuous forest–lake–crack-valley landscapes, protected so the forest can develop toward virgin woodland.

## DOCUMENTED: Border forest and place-names

Tiveden was long an isolating border woodland between **Svealand** and **Götaland** — sparse settlement, difficult terrain, strong local place-name folklore. Official trail texts note **Trollkyrkobergen** as known seamarks for medieval sailors on **Vättern** (with Vadstena’s “blue church” across the water); one park interpretation suggests sailors coined “trolls’ church” for the empty northern shore skyline. The name **Trollkyrka** is attested in writing from the **1600s**; many other “troll-” names in the park are later tourist inventions, while Trollkyrka has the longer tradition (Länsstyrelsen trail material).

## DOCUMENTED: National Park and access

**Tivedens nationalpark** founded **1983**, expanded **2017** (c. 2,030 ha). Marked trails include **Trollkyrkerundan** (~4.6 km, demanding / “berg-och-dalbana” through crack valleys; ~3–3.5 hours with breaks), starting at the main entrance. Stops include **Stora Trollkyrka**, **Lilla Trollkyrka** (views toward Vättern) and Metesjön. Stay on marked trails; follow park regulations (dogs on leash, fire only at designated sites, etc.).

## DOCUMENTED: Later Christian / free-church use (not pagan archaeology)

Swedish Wikipedia notes that in the **1800s** an early free-church movement used Trollkyrkoberget for **secret meetings** when banned by the Church of Sweden — a documented historical use of the rock as a gathering place, separate from prehistoric blót claims. Park texts also mention an “open-air church” häll associated with forbidden services in the konventikel era (early 1700s context in some trail leaflets).

## Archaeology vs folklore (research caution)

No Haunted Sweden claim equates Trollkyrka with an excavated Norse **hörgr** or proven continuous blót site. Possible ritual reading comes from **folklore documentation** (below). Researchers remain cautious: place-name + poem ≠ archaeological horizon.`,

  legend: `## DOCUMENTED FOLKLORE: Forbidden rituals (not verified history)

Folklife researcher **B. Gösta Carlshult** (often spelled Carshult in English summaries), documenting Undenäs / Tiveden traditions around **1940–1941** (*Undenäsbygden genom tiderna*), recorded an “ancient folk poem” describing night journeys to the Troll mountains, three-day “mass,” masked identical garments, horn signals, fire of **nine kinds of wood**, blood sprinkled on participants, best of the offering to the spirits, then midnight invocation of spirits by a **prelatus**. Later published via **S. Karlsson** (*I Tiveden*, 1970) and **Hans Lidman** (*Gudanatt, dagar och nätter i Tiveden*, 1972) — note: **Hans** Lidman, not Olof.

**Secrecy tradition:** anyone not initiated who witnessed the rites risked being silenced in a forest bog/hole **or** sworn into the brotherhood. English/Swedish secondary literature often argues such precautions fit the period when practising non-Christian rites could mean **death** under Swedish law (**commonly cited 1604–1735**). That is an **interpretive link** between folklore and legal history — **not** a court record proving specific executions at Trollkyrka.

**Lidman quote (tradition):** old people said no Christian should go there; the troll-church mountains belong to heathen trolls; a Christian who ventures there comes to grief.

**Authenticity debate (important):** the poem’s author seems familiar with blot-like structure, and some details (nine woods; spirit-calling after the meal) are not simply copied from well-known medieval Icelandic texts — yet the **absence of matching medieval sources also means the poem cannot prove** historical practice. Haunted Sweden presents this as **documented folklore / oral-literary tradition**, not verified ritual archaeology.

## FOLKLORE: Blót / hörgr reading

Popular and neo-pagan readings treat Trollkyrka as a long-lived **hörgr** / blót ground after Christianisation. Possible — but **unproven**. Distinguish: sacred-rock folklore worldwide vs excavated cult sites with finds and dating.

## MODERN WITNESS-STYLE REPORTS (anecdotal)

Hikers report deep silence, feeling watched, strange sounds in fog, heavy atmosphere among the blocks — classic wilderness uncanny, not controlled paranormal evidence. No peer-reviewed investigation of hauntings at Trollkyrka was located.

## Special areas

1. **Trollkyrka rock formation** — folklore centre (Stora Trollkyrka).
2. **Summit / Lilla Trollkyrka** — views; gathering-place tradition.
3. **Forest trails (Trollkyrkerundan)** — demanding wilderness hike.
4. **Surrounding ancient forest** — silence, moss, fog.

## Atmosphere, investigation ideas, best conditions

Ancient forest, massive granite, narrow passages, complete hush, fog in the trees — flagship Haunted Sweden wilderness folklore. Ideas: forbidden-ritual folklore mapping; history vs poem; fog photography; interview local historians; documentary on Sweden’s hidden sacred places. Best: heavy fog, autumn, early morning, blue hour, calm weather. EVP only where legal and non-disruptive to nature/other hikers.`,

  safetyNote:
    "National Park — follow Sveriges Nationalparker / Länsstyrelsen Örebro rules. Reach via marked Trollkyrkerundan (moderate to demanding: steep, rocky, roots; allow several hours). Stay on trails; no camping/fires except where permitted; dogs leashed. Terrain is slippery when wet; bring map, water, sturdy shoes. Respect protected nature — no removing stones, moss or artefacts. Not an easy casual stroll.",

  sourceLinks: [
    "https://www.sverigesnationalparker.se/park/tivedens-nationalpark/",
    "https://www.lansstyrelsen.se/orebro/besoksmal/naturreservat/tivedens-nationalpark.html",
    "https://sv.wikipedia.org/wiki/Trollkyrka",
    "https://en.wikipedia.org/wiki/Trollkyrka",
    "https://www.vastsverige.com/karlsborg/leder/trollkyrkerundan/",
    "https://www.naturkartan.se/sv/vastra-gotalands-lan/trollkyrka",
  ],

  paranormalType: [
    "Heavy Atmosphere",
    "Local Folklore",
    "Sacred Site Folklore",
    "Unusual Sounds",
  ],
  accessType: "Hiking Trail",
  familyFriendly: false,
  visitDifficulty: 3,
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
    "https://www.google.com/maps/search/?api=1&query=Tivedens+nationalpark+Trollkyrka",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/trollkyrka-cover.jpg",
      caption: "Trail toward Trollkyrka, Tiveden National Park",
      captionSv: "Led mot Trollkyrka, Tivedens nationalpark",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Granit-”Trollkyrkan” i Tivedens nationalpark — dokumenterad folklore om hemliga hedningariter och dödsstraffstidens sekretess, inte arkeologiskt bevis för blot.",
  historySv: `## DOKUMENTERAT: Geologi och vildmark

Bergknalle mitt i **Tivedens nationalpark** (Länsstyrelsen Örebro). Inlandsisslipad granit, sprickdalar, blockmarker, brandpräglad tallskog. Nationalpark **1983**, utvidgad **2017**.

## DOKUMENTERAT: Gränsskog och namn

Tiveden som isolerande gränsskog mellan Svealand och Götaland. **Trollkyrka** belagt i skrift från **1600-talet**; sjömärke mot Vättern enligt parkmaterial. **Trollkyrkerundan** ca 4,6 km, krävande led från huvudentrén (Stora/Lilla Trollkyrka).

## DOKUMENTERAT: Senare bruk

1800-talets frikyrkorörelse ska ha hållit hemliga möten på berget (Wikipedia). Skilj från fornnordiska blotpåståenden.

## Arkeologi kontra folklore

Ingen utgrävd hörgr med daterade fynd som “bevisar” kontinuerligt blot. Ritualtolkning vilar på folklore.`,

  legendSv: `## DOKUMENTERAD FOLKLORE: Förbjudna riter (inte verifierad historia)

**B. Gösta Carlshult** (~1940) upptecknade ett folkligt kväde om nattfärder till Trollebergen, tre dagars “mässa”, maskerad skara, hornstötar, eld av **nio slags ved**, blodstänk, offer till andar och midnattsåkallan av en **prelatus**. Publicerat vidare av Karlsson (1970) och **Hans Lidman**, *Gudanatt* (1972).

**Sekretess:** den oinvigde som såg riterna riskerade tystnad i skogen eller upptagning i brödraskapet — ofta kopplat till perioden med **dödsstraff** för icke-kristen rit (**ca 1604–1735**). Det är tolkning, inte rättegångsbevis från Trollkyrka.

**Äkthetsdebatt:** dikten kan spegla blotkunskap — men bevisar inte historisk praktik. Märk som dokumenterad folklore.

## MODERNA UPPLEVELSER (anekdotiska)

Tystnad, känsla av att bli iakttagen, udda ljud i dimma — vildmarksatmosfär, inte kontrollerad paranormal evidens. OMRÅDEN: Stora Trollkyrka; topp/Lilla Trollkyrka; Trollkyrkerundan; gammelskogen.`,

  hauntedSwedenAppSummarySv:
    "Trollkyrka är en dramatisk bergknalle djupt inne i Tivedens nationalpark — en av Sydsveriges vildaste gammelskogar. Parkens fakta handlar om isslipad granit, sprickdalar och den krävande Trollkyrkerundan; namnet finns i skrift från 1600-talet. Dokumenterad folklore — Carlshult ca 1940 och Hans Lidmans Gudanatt (1972) — berättar om hemliga nattliga ceremonier, blodoffer och att den som såg riterna riskerade döden i skogen eller tvångsupptagning i ett brödraskap. Motiven kopplas ofta till tiden då icke-kristen rit kunde ge dödsstraff (ca 1604–1735), men det är muntlig/litterär tradition — inte arkeologiskt bevis för en fornnordisk blotplats. Haunted Sweden håller isär nationalparkens geologi och folkviselegenden. Dimma bland mossiga block gör Trollkyrka till ett av Sveriges mest mystiska naturlandmärken.",
  safetyNoteSv:
    "Nationalpark — följ Sveriges nationalparker / Länsstyrelsen Örebro. Nås via markerade Trollkyrkerundan (medel–krävande). Håll dig till lederna; elda endast där tillåtet. Halt i väta; bra skor, vatten, karta. Respektera naturen.",
  infoBox: [
    {
      label: "Location",
      labelSv: "Läge",
      value: "Tiveden National Park (core)",
      valueSv: "Tivedens nationalpark (centralt)",
    },
    {
      label: "National Park",
      labelSv: "Nationalpark",
      value: "Founded 1983 · expanded 2017",
      valueSv: "Bildad 1983 · utvidgad 2017",
    },
    {
      label: "Trail",
      labelSv: "Led",
      value: "Trollkyrkerundan ~4.6 km (demanding)",
      valueSv: "Trollkyrkerundan ca 4,6 km (krävande)",
    },
    {
      label: "Folklore sources",
      labelSv: "Folklorekällor",
      value: "Carlshult ~1940 · Lidman 1972",
      valueSv: "Carlshult ca 1940 · Lidman 1972",
    },
    {
      label: "Ritual claims",
      labelSv: "Ritualpåståenden",
      value: "Documented folklore — not archaeology",
      valueSv: "Dokumenterad folklore — inte arkeologi",
    },
    {
      label: "Legal context (interpretive)",
      labelSv: "Rättskontext (tolkning)",
      value: "Death penalty era often cited 1604–1735",
      valueSv: "Dödsstraffstid ofta angiven 1604–1735",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 9.8 · Premium EXTREMELY HIGH",
      valueSv: "Poäng 9.8 · Premium EXTREMT HÖG",
    },
  ],
  faq: [
    {
      question: "Was Trollkyrka a proven Norse blót site?",
      questionSv: "Var Trollkyrka en bevisad fornnordisk blotplats?",
      answer:
        "No archaeological proof confirms continuous Norse blót here. The famous ritual description is a folk poem documented by Carlshult (~1940) and retold by Hans Lidman — documented folklore, not excavation evidence. Researchers stay cautious.",
      answerSv:
        "Inget arkeologiskt bevis bekräftar kontinuerligt fornnordiskt blot här. Den kända ritualbeskrivningen är ett folkligt kväde upptecknat av Carlshult (ca 1940) och återgivet av Hans Lidman — dokumenterad folklore, inte utgrävningsbevis. Forskare är försiktiga.",
    },
    {
      question: "What is the death-penalty legend about?",
      questionSv: "Vad handlar dödsstrafflegenden om?",
      answer:
        "Folklore says outsiders who saw secret rites risked being killed (bog/forest) or forced into the brotherhood. Writers link that secrecy to Swedish laws that could punish non-Christian practice with death (often dated 1604–1735). It is interpretive context for the tradition — not a verified case file from Trollkyrka.",
      answerSv:
        "Folklore säger att oinvigda som såg hemliga riter riskerade att tystas (mosse/skog) eller tvingas in i brödraskapet. Skribenter kopplar sekretessen till lagar där icke-kristen praktik kunde ge dödsstraff (ofta 1604–1735). Det är tolkningskontext — inte en verifierad rättsakt från Trollkyrka.",
    },
    {
      question: "How do I get there?",
      questionSv: "Hur tar jag mig dit?",
      answer:
        "Hike the marked Trollkyrkerundan (~4.6 km, demanding) from Tiveden National Park’s main entrance. Follow park maps and regulations; allow several hours.",
      answerSv:
        "Vandra markerade Trollkyrkerundan (ca 4,6 km, krävande) från nationalparkens huvudentré. Följ kartor och föreskrifter; räkna med flera timmar.",
    },
    {
      question: "Who wrote about Trollkyrka’s rituals?",
      questionSv: "Vem skrev om Trollkyrkas riter?",
      answer:
        "Key folklore documentation: B. Gösta Carlshult (Undenäsbygden genom tiderna, ~1941) and Hans Lidman (Gudanatt, 1972). English summaries sometimes misspell Carshult; the author of Gudanatt is Hans Lidman.",
      answerSv:
        "Viktig folklore: B. Gösta Carlshult (Undenäsbygden genom tiderna, ca 1941) och Hans Lidman (Gudanatt, 1972).",
    },
    {
      question: "Has Haunted Sweden investigated Trollkyrka yet?",
      questionSv: "Har Haunted Sweden utrett Trollkyrka ännu?",
      answer:
        "Not yet. Planned: hike Trollkyrkerundan, fog photography, on-site folklore documentation, local historian interviews, compare oral tradition with sources, and a wilderness documentary episode.",
      answerSv:
        "Inte ännu. Planerat: vandra Trollkyrkerundan, dimfotografi, folklore på plats, lokalhistoriker, jämföra muntlig tradition med källor, och vildmarksokumentär.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
