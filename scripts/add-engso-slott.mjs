/**
 * Add Engsö Slott / Ängsö Slott (id 70) — FLAGSHIP
 * Run: node scripts/add-engso-slott.mjs
 *
 * Sources: Västerås stad, Visit Västmanland, Kulturarv Västmanland,
 * Wikipedia (sv/en), Slottsguiden, engso-events.com, Westmannastiftelsen context,
 * Clas Svahn (Det okända / blog), FREEDOMtravel folklore summary.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "engso-slott-cover.jpg");
const coverUrl =
  "https://commons.wikimedia.org/wiki/Special:FilePath/%C3%84ngs%C3%B6_slott.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "engso-slott")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "70",
  slug: "engso-slott",
  name: "Engsö Slott",
  englishName: "Engsö Castle (Ängsö Slott)",
  coverImage: "/places/engso-slott-cover.jpg",
  category: "Castle / Castle Ruin",
  city: "Västerås",
  region: "Västmanland",
  country: "Sweden",
  address: "Engsö Slott, 725 98 Västerås, Västmanland, Sweden",
  latitude: 59.5325,
  longitude: 16.8575,
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
    "engso_slott",
    "angso_slott",
    "vasteras",
    "vastmanland",
    "anders_luxemburg",
    "brita_baat",
    "cottilion",
    "engsokedjan",
    "haunted_castle",
    "piper",
    "harleman",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Engsö Slott (Ängsö) rises on an island in Lake Mälaren between Västerås and Enköping — more than eight centuries of documented estate history, medieval stone foundations, and an 18th-century Hårleman reconstruction that still defines the museum rooms. The Sparre family held the fortress from the late Middle Ages until 1710; Christina Törnflycht and the Piper family then shaped the castle until 1971. Today Westmannastiftelsen owns the museum building; the Piper family still lives on the estate. Official regional tourism (Visit Västmanland, Kulturarv Västmanland) openly calls Engsö one of Sweden’s most notorious haunted castles and points visitors to Engsökedjan — a narrow gold chain set into a wall, wrapped in centuries of superstition — plus named traditions of Anders Luxemburg, Brita Bååt and the ghost dog Cottilion. Modern residents including Catharina Piper have described daytime sightings of a woman in the ballroom wing; TV’s Det okända filmed here. Haunted Sweden keeps medieval and Piper history clearly separate from folklore and paranormal interpretation.",
  whyItFitsHauntedSweden:
    "FLAGSHIP: 800+ years of documented history, Sparre medieval fortress core, Carl Hårleman’s 1740s interiors, portrait museum, island Mälaren setting, Engsökedjan as a legendary physical object, multiple named ghosts (jester, castle lady, ghost dog), official tourism sources that themselves market the haunted reputation, modern resident testimony (Catharina Piper / Clas Svahn), Det okända (2007/2008), and Ängsö Church folklore adjacency. Visual 10/10, historical 10/10, architectural 10/10, folklore 10/10, paranormal reputation 9.7/10 — Haunted Sweden Score 9.9. Premium EXTREMELY HIGH.",
  shortDescription:
    "Island castle in Lake Mälaren near Västerås — medieval Sparre fortress, Piper–Hårleman baroque museum, Engsökedjan, and Sweden’s most openly tourism-documented haunted-castle folklore set.",
  history: `## DOCUMENTED: Late 1100s origins and Riseberga

**Ängsö / Engsö** (both spellings are used; older form **Engsö**, modern heritage often **Ängsö**) is first named as **"Engsev"** in a royal letter of **King Knut Eriksson**, issued between **1167 and 1196**, stating he inherited the property after his father **Erik Jedvardsson (Erik den helige)** (Swedish Wikipedia; Gahrn & Fridell 2010). Before **1272** the estate was held by **Riseberga Abbey (Riseberga kloster)** (Wikipedia; Kulturarv Västmanland).

## DOCUMENTED: Sparre fortress (1453–1710)

**1453**: the land passed by inheritance settlement to the **Sparre** family (Kulturarv Västmanland; Slottsguiden). In the **1480s** riksråd **Bengt Fadersson Sparre** built a **stone defensive house / fortress**; **lower medieval fabric survives inside today’s castle** (Västerås stad; Kulturarv Västmanland; Wikipedia).

**Knut Bengtsson Sparre** defended Västerås for Christian II and was killed **1521**; **1522** Gustav Vasa took Ängsö after siege. **1538** the castle returned to Knut’s daughter **Hillevi Knutsdotter** (married Arvid Trolle). Later owners include **Arvid Posse**, who gave the estate as morning gift to **Brita Bååt** of Follnäs — a **documented marriage connection**, separate from later ghost legend (Wikipedia owner list).

**1630s** (often **1636–1637** under Per Sparre): major rebuild/expansion; the castle appears in **Erik Dahlbergh’s Suecia antiqua et hodierna**. Sparre ownership continued until **1710**.

## DOCUMENTED: Christina Törnflycht, Piper and Carl Hårleman

**1710**: **Christina Törnflycht** (wife of **Carl Piper**, then a prisoner of Peter the Great) acquired Ängsö. She later made it a **Piper family fideikommiss**. Her son **Carl Fredric Piper** commissioned the major reconstruction of the **1740s** (**1740–1741** uppermost storey and mansard roof with lantern after architect **Carl Hårleman**; works often dated through mid-1740s). Wings, economy buildings and park layout belong to this phase (Västerås stad; Wikipedia; Slottsguiden). Several **18th-century room interiors** survive.

## DOCUMENTED: Museum, listing, Westmannastiftelsen

The main castle was **last lived in as a residence until 1959**. **Erik and Hedvig Piper** worked with **Riksantikvarieämbetet** to restore and open it for tours (Västerås stad). **1965**: **byggnadsminne** (listed historic building). Piper **fideikommiss ownership until 1971** (last fideikommissarie Eric Piper d. 1968). Ownership later passed through a Västmanland nature/outdoor foundation to **Westmannastiftelsen (from 2010)**. The **Piper family still leases and lives on the estate**; the **castle building functions as museum** (Wikipedia; Kulturarv Västmanland).

## DOCUMENTED: Setting and collections

- Nearly **cubic four-storey stone-and-brick** house; **medieval lower levels**.
- Large **portrait collection**; period furnishings restored with help of inventories.
- Historic **park** and island landscape within **Ängsö / Engsö skärgård** (~30 islands in Mälaren).
- Adjacent **Ängsö / Engsö Church** (medieval parish church) — separate operators from the castle museum (engso-events.com FAQ).

## DOCUMENTED: Access (verify seasonally)

**engso-events.com** (2026 season pattern): open from early May; weekends May–June and September; daily July–mid-August (hours typically 11–16 in peak summer). **Museum entry** (adult/child priced); café and shop free to enter. **Guided group tours** (min. ~10). Private photography for personal use allowed inside. Do **not** assume evening ghost access — night visits require official events/bookings. Never trespass.`,

  legend: `## FOLKLORE CLASSIFICATION KEY

1. Historical fact  
2. Historical testimony  
3. Folklore / legend  
4. Modern witness report  
5. Paranormal interpretation  

Haunted Sweden never treats (3)–(5) as proven science.

---

## DOCUMENTED OBJECT + FOLKLORE — Engsökedjan (the Engsö chain)

**Documented / observable (category 1–2):** A **narrow, long gold chain** (tourism texts say about **five feet**) is **set into / displayed in a wall** at the castle — Visit Västmanland and Kulturarv Västmanland describe it as visible on visits; Wikipedia places the chain in a **display case in the stair hall** in present museum practice. It is a real physical object visitors can see on official tours.

**Folklore (category 3):** Legend says **Johan Sigismund Sparre**, alone and wanting a dice partner, summoned a dark figure; after play the stranger gave him the chain and warned it must **never leave the castle or the place would burn**. Variants say he won it gambling with the **Devil**. Superstition: removing the chain brings fire. FREEDOMtravel and Slottsguiden retell the curse narrative.

**Not claimed:** Haunted Sweden does **not** claim supernatural properties, authenticated devil-origin, or scientifically proven curse effects.

---

## FOLKLORE — Anders Luxemburg (court jester)

**Historical basis (category 1–2, incomplete):** Tradition identifies **Anders Luxemburg** as a **hunchbacked court jester** associated with **Karl XII**, later entering Piper service at Engsö; Wikipedia and Slottsguiden place his death at Ängsö in **1744**. Stories link him to Karl XII’s horse **Brandklipparen** (said to panic and die against a wall in **1740** — folklore layered on a named royal horse known from art/history). Full independent biography verification is a future research task.

**Apparition folklore (category 3):** He is said to walk the **castle grounds / park** in a **grey long coat and cap**, nearly 300 years after death. Why he returns is unexplained in the legends.

**Classification:** Named ghost tradition — folklore, not verified haunting.

---

## FOLKLORE + HISTORICAL CORRECTION — Brita Bååt

**Documented (category 1):** **Brita Bååt** of Follnäs married **Arvid Posse** and received Ängsö as morning gift (Wikipedia owner list). She is a real historical figure connected to the estate.

**Legend (category 3):** She is cast as a **cruel woman** who drove husbands to early graves; a **female figure dragging her feet** through **Kungarummet** into **Stora balsalen** around **20:00** (Visit Västmanland says 8 pm; some older texts say 7). Christmas-morning church legend: she rushes to lit **Ängsö Church**, meets skeletons at mass, is attacked by two wraiths (said to be dead husbands); sword and “blood stone” are pointed out in church/churchyard folklore.

**Historical correction (category 1 research note):** Swedish Wikipedia cites modern research that **Brita Bååt was married only once**; the multi-husband cruelty tale may **overlap with earlier lady Elsa Trolle** (married three times, outlived all three). Haunted Sweden flags this as **legend contamination**, not proven biography.

**No separate generic “White Lady” cycle** was found beyond this **female apparition identified as Brita Bååt** in tourism/folklore sources. Do not invent an extra White Lady.

---

## FOLKLORE — Cottilion (ghost dog)

**Tradition (category 3):** Dog **Cottilion** belonged to **Sophie Piper** (Eva Sophie von Fersen, widow of Adolf Ludvig Piper), who primarily lived at **Löfstad** but visited Engsö. Cottilion died **“at his mistress’s feet”** — French text cited on a **gravestone**. Reports: rasping paw sounds / glimpses running from **large dining room** to **salon**.

**Classification:** Ghost-animal folklore. Gravestone text is historical testimony of a pet death; nocturnal dog apparition is legend/interpretation.

---

## MODERN WITNESS REPORTS (category 4)

**Catharina Piper / Clas Svahn:** Journalist **Clas Svahn** stayed overnight with **Catharina Piper** and **Jan Gustafsson**; Piper described seeing a **woman walk into an adjoining room** from the **ballroom** on **three occasions**, including **daytime** observations (csblogg.ufo.se). Svahn and Piper sat in the ballroom at midnight without anomalous events that night — absence of phenomena is also data.

**Det okända:** TV series *Det okända* visited Ängsö / Engsö (**aired Feb 2008**, season 6 ep. 7; Wikipedia notes 2007 visit). Synopsis: **Katarina/Catharina Piper** as long-time resident knowing local legends; medium Vendela Cederholm investigates. Treat as **media paranormal entertainment + resident interview**, not scientific proof.

**Additional sensory reports** (footsteps, newspaper-page rustling, dogs reacting, figure seeming to pass through a wall with later comparison to older openings on plans) circulate in **guide storytelling and paranormal literature**. Haunted Sweden treats the **wall-figure + former opening** pattern as:

- **OBSERVATION (reported):** a figure appeared to pass through a solid wall.  
- **POSSIBLE HISTORICAL EXPLANATION (hypothesis):** older architectural plans may show a former opening at that spot — **verify on site with guides and drawings**.  
- **INTERPRETATION (category 5):** apparition / ghost.

Do **not** present the paranormal reading as proven. On-site verification is listed under Future Mission.

---

## SPECIAL AREAS

1. **Kungarummet** — Brita Bååt route start (folklore).  
2. **Stora balsalen** — continuation of route; modern Piper sightings.  
3. **Engsökedjan** — wall/stair-hall object + curse folklore.  
4. **Corridors / park** — Anders Luxemburg tradition.  
5. **Dining room–salon axis** — Cottilion sounds/glimpses.  
6. **Ängsö Church** — Christmas mass legend; blood stone / sword folklore.  
7. **Piper residential wing** — modern resident reports (private — respect access).

## INVESTIGATION IDEAS (official access only)

The Ghosts of Engsö · Anders Luxemburg · Brita Bååt in the Ballroom · Mystery of Engsökedjan · Ghost Dog Cottilion · Who Walks Through the Wall? · History vs Folklore · Night at Engsö (booked events only).

## BEST CONDITIONS

Autumn · fog · blue hour · evening · rain · winter darkness — for atmosphere photography within **legal opening hours**.`,

  safetyNote:
    "Active museum, café, events and private Piper residence on the estate. Visit only during published opening hours or booked guided tours/events (engso-events.com / Västerås tourism). Do not trespass after hours, enter private wings, or disturb church services or graves at Ängsö Church. Island roads and park paths can be uneven and dark — use normal outdoor caution. Unauthorised overnight ghost hunts are not allowed.",

  sourceLinks: [
    "https://www.vasteras.se/uppleva-och-gora/kultur/museer/engso-slott.html",
    "https://visitvastmanland.com/engso-slott",
    "https://kulturarvvastmanland.se/databas/plats/vasteras/angso-slott",
    "https://sv.wikipedia.org/wiki/%C3%84ngs%C3%B6_slott",
    "https://en.wikipedia.org/wiki/%C3%84ngs%C3%B6_Castle",
    "https://www.slottsguiden.info/slottdetalj.asp?id=34",
    "https://engso-events.com/",
    "https://csblogg.ufo.se/csblogg3/?p=5395",
    "https://commons.wikimedia.org/wiki/Category:%C3%84ngs%C3%B6_slott",
  ],

  paranormalType: [
    "Apparition",
    "Ghostly Lady",
    "Footsteps",
    "Animal Apparition",
    "Heavy Atmosphere",
    "Local Folklore",
  ],
  accessType: "Guided Visits",
  familyFriendly: true,
  visitDifficulty: 1,
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
    "https://www.google.com/maps/search/?api=1&query=Engs%C3%B6+Slott+725+98+V%C3%A4ster%C3%A5s+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/engso-slott-cover.jpg",
      caption: "Engsö Slott (Ängsö) on Lake Mälaren, Västerås",
      captionSv: "Engsö Slott (Ängsö) vid Mälaren, Västerås",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Öslott i Mälaren utanför Västerås — medeltida Sparreborg, Piper–Hårleman-museum, Engsökedjan och ett av Sveriges mest öppet turistbeskrivna spökslott.",
  historySv: `## DOKUMENTERAT: 1100-tal och Riseberga

**Ängsö/Engsö** nämns som **"Engsev"** i kungabrev av **Knut Eriksson (1167–1196)** — arv efter **Erik Jedvardsson**. Före **1272** ägdes godset av **Riseberga kloster** (Wikipedia; Kulturarv Västmanland).

## DOKUMENTERAT: Sparre (1453–1710)

**1453** till Sparre via arvsskifte. **1480-talet:** **Bengt Fadersson Sparre** uppför stenhus/försvarsborg — **medeltida delar kvar i nedre våningar**. Gustav Vasa belägrar **1522**; återlämning till Hillevi Knutsdotter **1538**. **Brita Bååt** får godset som morgongåva av Arvid Posse — historisk koppling, separat från spöklegend. **1630-talet** ombyggnad (Suecia). Sparre till **1710**.

## DOKUMENTERAT: Piper och Hårleman

**1710:** **Christina Törnflycht** köper Ängsö; fideikommiss i Pipersläkten. Sonen **Carl Fredric Piper** låter **Carl Hårleman** forma nuvarande utseende på **1740-talet** (översta våning, mansardtak, flyglar, park). Interiörer från tiden bevarade.

## DOKUMENTERAT: Museum

Bebott till **1959**; **byggnadsminne 1965**; Piper till **1971**; **Westmannastiftelsen från 2010**. Piper bor kvar på godset. Sommarsäsong, café, guidningar — se engso-events.com.`,

  legendSv: `## FOLKLORERESULTAT — FLAGGSKEPPSÅGNER

**Engsökedjan:** smal guldkedja i vägg/monter — verkligt föremål (Visit Västmanland / Kulturarv). Legend: tärningsspel / mörk gestalt / eld om kedjan lämnar slottet. Inte bevisad övernaturlig egenskap.

**Anders Luxemburg:** hovnarr kopplad till Karl XII; död **1744** enligt tradition; grå rock i parken — folklore.

**Brita Bååt:** historisk ägarinna; legend om elakhet och kvinnlig skepnad Kungarummet→balsalen ca kl 20; julotta i kyrkan. Modern forskning: troligen bara gift en gång — legend kan blandas med Elsa Trolle.

**Cottilion:** Sophie Pipers hund; gravstenstext; raspande ljud matsal–salong — djurspöksfolklore.

**Moderna vittnesmål:** Catharina Piper beskriver dagtid kvinna i balsalsflygeln (Clas Svahn); *Det okända* filmade här. Väggfigur / tidningsraspel: cirkulerande rapporter — verifiera på plats. Separera observation, historisk förklaring och spöktolkning.`,

  hauntedSwedenAppSummarySv:
    "Engsö Slott (Ängsö) ligger på ö i Mälaren mellan Västerås och Enköping — över 800 års dokumenterad godshistoria, medeltida stenfundament och 1700-tals Hårleman-ombyggnad som fortfarande präglar museet. Sparre höll fästet till 1710; Christina Törnflycht och Pipersläkten formade sedan slottet till 1971. Idag äger Westmannastiftelsen museibyggnaden; Piper bor kvar på godset. Officiell regional turism (Visit Västmanland, Kulturarv Västmanland) kallar Engsö ett av Sveriges mest ökända spökslott och pekar på Engsökedjan — en smal guldkedja i väggen, omgiven av seklers vidskepelse — plus namngivna traditioner kring Anders Luxemburg, Brita Bååt och hundspöket Cottilion. Moderne boende som Catharina Piper har beskrivit dagtidssiktningar av en kvinna i balsalsflygeln; TV:s Det okända filmade här. Haunted Sweden håller medeltids- och Piperhistoria tydligt isär från folklore och paranormal tolkning.",
  safetyNoteSv:
    "Aktivt museum, café, evenemang och privat Piperboende. Besök endast under publicerade öppettider eller bokad guidning/event (engso-events.com). Ingen trespassing, privatflyglar eller störning av kyrka/gravar. Ojämna stigar. Obehörig nattutredning ej tillåten.",
  infoBox: [
    {
      label: "First mentioned",
      labelSv: "Först nämnt",
      value: "c. 1167–1196 (Knut Eriksson)",
      valueSv: "ca 1167–1196 (Knut Eriksson)",
    },
    {
      label: "Stone fortress",
      labelSv: "Stenborg",
      value: "1480s · Bengt Fadersson Sparre",
      valueSv: "1480-tal · Bengt Fadersson Sparre",
    },
    {
      label: "Baroque rebuild",
      labelSv: "Barockombyggnad",
      value: "1740s · Carl Hårleman / C. F. Piper",
      valueSv: "1740-tal · Carl Hårleman / C. F. Piper",
    },
    {
      label: "Listed",
      labelSv: "Byggnadsminne",
      value: "1965",
      valueSv: "1965",
    },
    {
      label: "Owner",
      labelSv: "Ägare",
      value: "Westmannastiftelsen (from 2010)",
      valueSv: "Westmannastiftelsen (från 2010)",
    },
    {
      label: "Signature object",
      labelSv: "Signaturobjekt",
      value: "Engsökedjan (wall chain + folklore)",
      valueSv: "Engsökedjan (väggkedja + folklore)",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 9.9 · FLAGSHIP · Premium EXTREMELY HIGH",
      valueSv: "Poäng 9.9 · FLAGGSKEPP · Premium EXTREMT HÖG",
    },
  ],
  faq: [
    {
      question: "Is Engsö Castle really haunted?",
      questionSv: "Är Engsö slott verkligen hemsökt?",
      answer:
        "Official Visit Västmanland and Kulturarv Västmanland describe Engsö as famous for ghost stories and name Engsökedjan, Brita Bååt and other traditions. That is strong documented folklore and tourism storytelling. Modern residents such as Catharina Piper have reported seeing a woman in the ballroom wing. Haunted Sweden presents history, folklore and witness reports separately — none of the ghost claims are scientific proof.",
      answerSv:
        "Visit Västmanland och Kulturarv Västmanland beskriver Engsö som känt för spökhistorier och nämner Engsökedjan, Brita Bååt med mera. Det är stark dokumenterad folklore och turismberättelse. Moderne boende som Catharina Piper har rapporterat en kvinna i balsalsflygeln. Haunted Sweden håller isär historia, folklore och vittnesmål — ingen spöktolkning är vetenskapligt bevis.",
    },
    {
      question: "What is Engsökedjan?",
      questionSv: "Vad är Engsökedjan?",
      answer:
        "A real narrow gold chain displayed in the castle wall / stair-hall case. Legend says it was won in a dice game with a dark stranger (sometimes the Devil) and must never leave or the castle will burn. The object is historical/museum fact; the curse is folklore.",
      answerSv:
        "En verklig smal guldkedja i vägg/monter i slottet. Legend: vunnen i tärningsspel med mörk gestalt (ibland djävulen) och får aldrig lämna platsen annars brand. Föremålet är museum/faktum; förbannelsen är folklore.",
    },
    {
      question: "Who was Brita Bååt?",
      questionSv: "Vem var Brita Bååt?",
      answer:
        "A historical lady who received Ängsö as morning gift from Arvid Posse. Folklore paints her as cruel and says her figure walks from Kungarummet into the ballroom around 20:00. Modern research notes she was likely married only once — parts of the cruelty legend may belong to Elsa Trolle instead.",
      answerSv:
        "Historisk fru som fick Ängsö som morgongåva av Arvid Posse. Folklore målar henne som elak och säger att hennes skepnad går från Kungarummet till balsalen omkring kl 20. Modern forskning: troligen bara gift en gång — delar av elakhetslegenden kan höra till Elsa Trolle.",
    },
    {
      question: "Can I visit haunted rooms?",
      questionSv: "Kan jag besöka de hemsökta rummen?",
      answer:
        "During summer museum hours and guided tours you can see historic interiors including areas tied to the legends (confirm current route with guides). Evening ghost access is not free — only via official events or bookings. Check engso-events.com. Never trespass.",
      answerSv:
        "Under sommarens museitider och guidningar syns historiska interiörer kopplade till sägnerna (fråga guiden om aktuell rutt). Kvällsspöktillträde är inte fritt — endast via officiella evenemang/bokning. Se engso-events.com. Gör aldrig intrång.",
    },
    {
      question: "Has Haunted Sweden investigated yet?",
      questionSv: "Har Haunted Sweden utrett platsen ännu?",
      answer:
        "Not on site yet. Planned: official guided tour, photograph Engsökedjan, Kungarummet and ballroom, interview guides, research Luxemburg and Bååt biographies, compare wall-apparition story with older plans, and produce a documentary episode with clear history vs folklore labels.",
      answerSv:
        "Inte på plats ännu. Planerat: officiell guidning, fotografera Engsökedjan, Kungarummet och balsalen, intervjua guider, forska Luxemburg/Bååt, jämföra vägghistorien med äldre ritningar, dokumentär med tydlig historia vs folklore.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
