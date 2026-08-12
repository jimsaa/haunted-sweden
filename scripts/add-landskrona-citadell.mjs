/**
 * Add Landskrona Citadell (id 68)
 * Run: node scripts/add-landskrona-citadell.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "landskrona-citadell-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Landskrona_Citadel_%2825620053%29.jpeg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "landskrona-citadell")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "68",
  slug: "landskrona-citadell",
  name: "Landskrona Citadell",
  englishName: "Landskrona Citadel (Citadellet)",
  coverImage: "/places/landskrona-citadell-cover.jpg",
  category: "Castle / Castle Ruin",
  city: "Landskrona",
  region: "Skåne",
  country: "Sweden",
  address: "Citadellet, 261 31 Landskrona, Skåne, Sweden",
  latitude: 55.8718,
  longitude: 12.8227,
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
    "landskrona_citadell",
    "landskrona_slott",
    "skane",
    "hilda_nilsson",
    "anglamakerskan",
    "cell_5",
    "haunted_prison",
    "historic_fortress",
    "female_prison",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Landskrona Citadell — Citadellet — is one of Scandinavia’s best-preserved 16th-century water fortresses: Danish King Christian III’s square stronghold (1549–1559) on Öresund, later expanded after Skåne became Swedish in 1658 into a bastioned fortress with vast moats. From the early 1700s it became a prison; from 1827 a life-sentence facility; and through much of the 1900s a forced-labour institution for women classified as vagrants or “fallen.” That layered history of confinement, punishment and death gives the stone walls real weight — not invented horror. In 1917 Hilda Nilsson, the “Änglamakerskan” of Helsingborg, was sentenced to death for eight child murders and held in Cell No. 5; on 10 August she hanged herself with a linen cloth tied to the cell window — documented fact, not folklore. Later prisoner reports of unrest in the cell, and Statens fastighetsverk’s official Spökelser episode naming Cell No. 5 the citadel’s darkest place, are labelled as testimony and cultural storytelling — not scientific proof of ghosts. SFV states the grounds are open but the main building is not generally open without guided access. Haunted Sweden separates history from paranormal interpretation.",
  whyItFitsHauntedSweden:
    "Flagship fortress: 450+ years of military and prison history, one of Sweden’s best-preserved 16th-century fortifications, documented Hilda Nilsson case tied to a specific cell, later witness reports, official SFV Spökelser production, Skräckfabriken tours, and premium documentary potential. Visual 10/10, historical 10/10, dark history 10/10, folklore 9.5/10, paranormal reputation 9.5/10 — Haunted Sweden Score 9.8. Premium EXTREMELY HIGH; research confidence VERY HIGH (history/Hilda) / HIGH (paranormal reports).",
  shortDescription:
    "16th-century Danish fortress and centuries-long prison in Landskrona — moats, prison tower, Cell No. 5 where Hilda Nilsson died in 1917, and Sweden’s strongest official ghost-story link via SFV’s Spökelser.",
  history: `## DOCUMENTED: Christian III and the Danish fortress (1549–1559)

Statens fastighetsverk (SFV), Riksantikvarieämbetet / BeBR and Landskrona museum sources describe **Landskrona citadell** (Citadellet / Landskrona slott) as a strategic Öresund fortress ordered by **Danish King Christian III** from **1549**, completed about **1559**. The inner core was square (~90×90 m in later descriptions), with corner towers and a moat system eventually reaching roughly **70 m** width in the Danish phase. The main façade toward the sound was heavily armed; other sides used curtain walls and corner towers. Control of Sound trade motivated the build.

## DOCUMENTED: Swedish Skåne, bastions and Gråen

After **Freden i Roskilde (1658)** Skåne became Swedish. **1667–1675** the citadel was rebuilt into what SFV calls **Nordens modernaste fästning** — outer Dutch-style **bastions**, earthworks and wet moats. **1677**: Swedish commandant **Hieronymus Lindeberg** surrendered the citadel to Christian V; Lindeberg was later executed for treason — documented military-political history, not folklore.

On the shoal **Gråen** in Öresund, **Adolfsfäste** was begun **1748** under Fredrik I’s national fortification programme; work dragged for decades and was never finished, though a **kruttorn** remains. SFV and Wikipedia note the incomplete star-fort on Gråen as part of the wider defensive story.

## DOCUMENTED: Prison fortress (1700s–1940)

From the **early 1700s** convicts were held on the citadel. After it ceased as a **land fortress (1822)**, it functioned **solely as a prison until 1940**. **1827**: designated prison for **life-sentenced** prisoners. **1860s**: major rebuild — new prison wing; the **eastern round tower** converted to **cell prison**; new commandant’s house and prison director’s residence. **1886 fire** damaged the main building; upper storeys were merged. Swedish Wikipedia and SFV list preserved features: **prison cells in the prison tower**, an **isolation cell** on the lower floor, and a **16th-century dungeon** in the old western tower (prisoners reportedly thrown through a hatch into darkness — architectural/historical description in English Wikipedia / BeBR tradition).

## DOCUMENTED: Women’s forced-labour institution (1900s)

Under the **1900s** the prison became a **tvångsarbetsanstalt for women** classified as **lösdrivare** (vagrants under the 1885 act) and, from **1902**, also tied to moral-regulation of **reglementerad prostitution** — a documented gendered control system. **1909–1917** a **special pavilion** held **female life-sentence prisoners**; this is the phase when **Hilda Nilsson** was placed in **Cell No. 5**. Historian **Johan Edman** (cited in Folket i Bild/Kulturfront research) gives declining vagrant-workhouse intake statistics (e.g. **1886: 1,444**; **1925: 607**). The institution closed **1940** when the military reoccupied the site.

## DOCUMENTED: Military reuse, refugees, restoration

**1940+**: military use; forts on Gråen. After WWII the citadel served as a **refugee reception centre** — including survivors brought on the **“White Buses”** (English Wikipedia). Long decay followed until **1971–1975** restoration under architect **Sven Silow**. **Statligt byggnadsminne (1935)**; owner **Statens fastighetsverk**. Today: events, exhibitions (e.g. Flykten 1943 in Kommendanthuset), **Citadellkolonierna** (from **1904**, among Sweden’s oldest allotment gardens), café and artists — while the **main fortress building is not generally open** without appropriate access (SFV).

## DOCUMENTED dark history (no sensationalising)

Centuries of **imprisonment**, **isolation**, **forced labour**, **life sentences**, **harsh conditions** and **deaths in custody** are structurally documented through prison-era sources and institutional history. Do not invent execution totals or unnamed epidemics. Individual capital cases (including Hilda Nilsson) belong in documented criminal history — see legend section for her case and for paranormal layers.`,

  legend: `## HISTORICAL FACT — Hilda Nilsson (not a “ghost story”)

**Hilda Nilsson** (born Lagerstedt **24 May 1876**, Tirup; died **10 August 1917**, Landskrona) — **“Änglamakerskan på Bruksgatan”** — is one of Sweden’s most documented female serial offenders. **Helsingborgs stadslexikon**, **Svenskt biografiskt material via Wikipedia**, **Helsingborgs Dagblad** trial coverage (**2–14 June 1917**), and academic work (**Cecilia Riving**, *Scandia* 2003; **Birgitta Nestler Witting**, *Kring Kärnan* 1995) underpin the following:

- She took **foster children** for payment and murdered infants — **eight convictions** at trial (police investigation suggested more; popular accounts sometimes cite up to **seventeen** — treat higher totals as investigative suspicion, not court verdict).
- Trial at **Helsingborgs rådhusrätt** opened **2 June 1917** (with psychiatric examination); **13 June 1917** she was **sentenced to death** (guillotine in period practice).
- Held at the **kvinnliga tvångsinrättningen (Citadellet), Landskrona** awaiting execution transport.
- **Cell No. 5** — behind the staircase on the lower floor, door opening toward a large dark prison hall (Wikipedia / museum tradition; FIB/Kulturfront description).
- **10 August 1917**: she **hanged herself** with a **linen cloth** snare fixed to the **cell window** — documented suicide in legal custody.
- **Same day** the court, following new practice, had **commuted** the death sentence to **life imprisonment** — **she was unaware**; she is widely described as the **last person sentenced to death in Sweden whose sentence was not commuted before death** (stadslexikon / Wikipedia).

This narrative belongs in **documented criminal and institutional history**. Haunted Sweden does not reduce her to folklore.

---

## FOLKLORE / REPORTED EXPERIENCE — Cell No. 5 (primary Haunted Sweden thread)

**Official SFV / Landskrona tourism framing:** Cell No. 5 is called **“den mörkaste platsen på hela Landskrona citadell”** (ilandskrona.se, echoing SFV’s Spökelser material). The story arc: Hilda died there → **later female prisoners reportedly found no peace** in the cell → **“Är det Hilda som aldrig lämnat?”** — explicitly **storytelling question**, not a verified haunting.

**Statens fastighetsverk — Spökelser (2025):** SFV’s filmed series *Spökelser* (première **25–26 September 2025**, **Sevärt** and **YouTube**) includes **Landskrona citadell / Cell nr 5** among five state-owned sites, pairing local ghost narratives with real history. Classify episode content as **official cultural folklore production** (category 3–5 below), not scientific evidence.

**Historical testimony / early folklore (source: Joacim Blomqvist, Folket i Bild/Kulturfront, 2016, citing local tradition and HD):**
- Already **autumn 1917**, an **intern in Cell 5** allegedly called staff, reporting a **woman hanging at the window** — origin story of the haunting reputation (**historical testimony / folklore**, not verified paranormal event).
- Folk belief held **dogs refused to enter Cell 5**; **Helsingborgs Dagblad** (cited in same article) reported **modern police dogs do not refuse** — useful correction.

**Later retellings (guides / media / paranormal interpretation):**
- **Sydsvenskan** (guide **Anders Sjölin**): other prisoners ** hated** Hilda; she awaited transfer to execution — contextual history.
- **Distorted face** apparitions appear in some **later ghost-tour and paranormal retellings**; Haunted Sweden found **no primary 1917 archival source** for a “distorted face” — treat as **modern paranormal interpretation** unless primary documentation emerges.
- Reported motifs in guided and media retellings: **voices**, **footsteps**, **cold spots**, **feeling watched**, **unease in isolation cells** — **modern witness report / folklore** unless tied to named archival testimony.

**Classification key used above:** (1) historical fact, (2) historical testimony, (3) folklore, (4) modern witness report, (5) paranormal interpretation.

---

## OTHER STORIES WITH IDENTIFIABLE SOURCES (Citadel environs)

**Landskrona kommun / Storyspot (2019)** — historian **Linda Segtnan** wrote GPS ghost audio for youth; citadel-linked tales include:
- **Änglamakerskan i cell 5** (Hilda — history + legend).
- **Fiskarpojken och mannen utan huvud** by the **outer moat** — **1874** tragedy leading to discovered murder (**local legend tied to documented tragedy year** in press release text).
- Separate city stories (Östergatan “ghost house”, Borstahusen **1853**, etc.) are **Landskrona-wide**, not inside the fortress — include only as **nearby folklore**, not as verified citadel interior phenomena.

**Western tower dungeon** — architectural dark-history feature (pit/hatch) described in **English Wikipedia / BeBR** tradition; paranormal claims there are **atmosphere + guide folklore**, not peer-reviewed investigation.

**Tycho Brahe’s moose** — SFV’s anecdote of a drunken tame elk dying on citadel stairs: **documented historical anecdote**, not haunting.

---

## SPECIAL HAUNTED AREAS (history + reported atmosphere)

1. **Cell No. 5** — Hilda’s death; later prisoner unrest reports; SFV Spökelser focus.
2. **Prison tower (Fängelsetornet)** — historic cells; isolation.
3. **Isolation cell (understa våningen)** — documented prison terminology (Wikipedia / SFV images).
4. **Old dungeon (västra tornet)** — 16th-century pit prison tradition.
5. **Inner fortress & corridors** — military + prison centuries.
6. **Moat and bastions** — defensive atmosphere; Storyspot moat legends.

## Atmosphere, investigation ideas, best conditions

Massive **16th-century** masonry, **deep moats**, **bastions**, **narrow stairs**, **Öresund** fog and coastal wind — peaceful gardens and kolonilotter by day, heavy history beneath. Ideas: **Cell No. 5 — history vs legend**; **women of the citadel**; **SFV Spökelser vs archives**; **EVP only with permission**; night exterior photography from public grounds. Best: **autumn evening, fog, rain, blue hour, winter darkness** — **lawful access only**.

## ACCESS (do not assume Cell No. 5 is open)

**SFV:** **Citadellområdet** (grounds, ramparts, kolonier, café) **open to visitors**; **the main building is not open for general visits**. Interior, **Cell No. 5**, and **prison tower** require **guided or special arrangement** — **Skräckfabriken AB** runs guided operations (Wikipedia / local tourism). Check **ilandskrona.se** for current tours and exhibitions. **No trespassing** into closed buildings. **Paranormal investigations require owner permission** (SFV / guide operator). Photography: respect tour rules and privacy.`,

  safetyNote:
    "Citadel grounds (ramparts, moats, koloni gardens, café) are generally accessible in daylight; the main fortress interior and Cell No. 5 are NOT freely open — SFV states the building is closed except through guided or authorised access (e.g. Skräckfabriken AB tours when scheduled). Do NOT trespass, force doors, or enter cells without permission. Moats, steep ramparts and wet stone are slip hazards. Respect residents in koloni areas and event staff. Haunted Sweden never encourages illegal entry or unauthorised paranormal investigations.",

  sourceLinks: [
    "https://www.sfv.se/vara-fastigheter/sverige/skane-lan/landskrona-citadell",
    "https://ilandskrona.se/besoka/kultur/spannande-historia-pa-landskrona-slott-citadellet/",
    "https://sv.wikipedia.org/wiki/Landskrona_citadell",
    "https://sv.wikipedia.org/wiki/Hilda_Nilsson",
    "https://stadslexikon.helsingborg.se/hilda-nilsson/",
    "https://news.cision.com/se/statens-fastighetsverk/r/premiar-for-sfv-s-nya-serie-spokelser---fem-berattelser-fran-historiska-platser-i-sverige,c4238585",
    "https://www.old.fib.se/inrikes/item/5239-infor-8-mars-del-ii-arbetshuset-i-landskrona",
    "https://www.mynewsdesk.com/se/storyspot/pressreleases/lokala-spoekberaettelser-i-storyspot-foer-landskronas-unga-2894963",
    "https://www.sydsvenskan.se/skane/anglamakerskan-domdes-till-doden-vad-hande-sen/",
    "https://en.wikipedia.org/wiki/Landskrona_Citadel",
  ],

  paranormalType: [
    "Local Folklore",
    "Heavy Atmosphere",
    "Apparition",
    "Voices",
    "Footsteps",
    "Temperature Changes",
    "Historical Tragedy",
    "Documented Dark History",
  ],
  accessType: "Guided Visits",
  familyFriendly: false,
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
    "https://www.google.com/maps/search/?api=1&query=Landskrona+Citadell,+261+31+Landskrona,+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/landskrona-citadell-cover.jpg",
      caption:
        "Landskrona Citadel at night — Danish fortress (1549–1559) and centuries-long prison.",
      captionSv:
        "Landskrona citadell vid natt — dansk fästning (1549–1559) och århundraden av fängelsehistoria.",
      credit: "Wikimedia Commons / Francois Polito",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Dansk 1500-tals vattenfästning och fängelse i Landskrona — vallgravar, fängelsetorn, cell nr 5 där Hilda Nilsson dog 1917, och SFV:s officiella Spökelser-berättelse.",
  historySv: `## DOKUMENTERAT: Christian III (1549–1559)

**Statens fastighetsverk** och **BeBR**: **Landskrona citadell** uppfördes på order av **Christian III** **1549–1559** — kvadratisk kärna, torn och vallgravar mot Öresundshandeln.

## DOKUMENTERAT: Svensk tid och bastioner

Efter **Roskilde 1658** utbyggdes anläggningen **1667–1675** till bastionfästning med våta gravar. **Gråen** och **Adolfsfäste** (1748–, ofullbordat) ingår i försvarshistorien.

## DOKUMENTERAT: Fängelse (1700-tal–1940)

Fångar från **1700-talets början**. **1827** livstidsfängelse. **1860-tal**: fängelsebyggnad; **östra tornet** blir cellfängelse; **1886** brand. **1900-talet**: **tvångsarbetsanstalt för kvinnor** (lösdrivare m.fl.) till **1940**. Bevarade miljöer: **fängelsetorn**, **isolationscell**, **äldre fängelsehåla** i västra tornet (tradition enligt Wikipedia/BeBR).

## DOKUMENTERAT: Senare tid

**1940** militär; efter WWII **flyktingmottagning** (“de vita bussarna”). Restaurering **1971–1975** (Sven Silow). **Statligt byggnadsminne 1935**; ägare **SFV**. **Citadellkolonierna** från **1904**. SFV: **området öppet**, **byggnaden i regel stängd** utan särskild access.`,

  legendSv: `## HISTORISKT FAKTA — Hilda Nilsson

**Hilda Nilsson** (1876–1917), **änglamakerskan på Bruksgatan**, dömdes **13 juni 1917** till döden för **åtta** barnamord (rättegång **2–14 juni**). Hon satt på **Citadellets kvinnoinrättning** i **cell nr 5** och begick **10 augusti 1917** självmord genom hängning med **linneduk** i fönstret — dokumenterat (stadslexikon, HD, Riving 2003, Nestler Witting 1995). Samma dag omvandlades domen till **livstid**, okänt för henne.

## FOLKLORE — cell nr 5

**SFV / ilandskrona.se:** cellen kallas **den mörkaste platsen**; senare kvinnliga fångar **fick ingen ro** — **berättarfråga**, inte bevis. **SFV:s Spökelser** (2025, Sevärt/YouTube) är **officiell kulturarvsberättelse**.

**Tidigt vittnesmål/folklore (FIB/Kulturfront 2016):** hösten **1917** ska en intern ha sett en **hängande kvinna** i fönstret; **hundar** som vägrade cellen — senare **HD** noterar att polishundar inte vägrar idag.

**Förvridet ansikte** i senare spökvandringar: **ingen primärkälla 1917** — märk som **modern paranormal tolkning** om den inte kan arkiveras.

## ÖVRIGT (källmärkt)

**Storyspot/Linda Segtnan (2019):** Hilda + **vallgravslegender** (1874). **Västra tornets håla** — mörk fängelsehistoria + guidefolklore.`,

  hauntedSwedenAppSummarySv:
    "Landskrona citadell — Citadellet — är en av Nordens bäst bevarade 1500-tals vattenfästningar: Christian III:s danska borg (1549–1559) vid Öresund, utbyggd efter Roskilde 1658 med bastioner och djupa vallgravar. Från 1700-talet fängelse, från 1827 livstidsanstalt, och under 1900-talet tvångsarbetsinrättning för kvinnor klassade som lösdrivare — dokumenterad fångenskap och tvång, inte påhittad skräck. 1917 dömdes Hilda Nilsson, änglamakerskan, till döden för åtta barnamord och satt i cell nr 5; den 10 augusti hängde hon sig med linneduk i fönstret — historiskt faktum. Senare fångars oro i cellen och Statens fastighetsverks Spökelser-avsnitt om cell nr 5 är märkta som vittnesmål och kulturberättelse, inte vetenskapligt spökebevis. SFV: området är öppet, huvudbyggnaden kräver guidning/tillstånd. Haunted Sweden skiljer historia från paranormal tolkning.",
  safetyNoteSv:
    "Vallar, vallgravar och koloniträdgårdar är oftast tillgängliga dagtid; fästningens interiör och cell nr 5 är INTE fritt öppna — SFV anger stängd byggnad utan guidning/tillstånd (t.ex. Skräckfabriken när det erbjuds). Gör INTE intrång. Hala stenar vid vallgravar. Respektera kolonister och personal. Obehöriga paranormala utredningar är olämpliga.",
  infoBox: [
    {
      label: "Built",
      labelSv: "Byggt",
      value: "1549–1559 (Christian III)",
      valueSv: "1549–1559 (Christian III)",
    },
    {
      label: "Prison era",
      labelSv: "Fängelsetid",
      value: "From early 1700s · life prison 1827 · closed 1940",
      valueSv: "Från 1700-talet · livstid 1827 · stängt 1940",
    },
    {
      label: "Hilda Nilsson",
      labelSv: "Hilda Nilsson",
      value: "Sentenced 13 Jun 1917 · suicide 10 Aug 1917 · Cell 5",
      valueSv: "Dömd 13 jun 1917 · självmord 10 aug 1917 · cell 5",
    },
    {
      label: "SFV Spökelser",
      labelSv: "SFV Spökelser",
      value: "Cell nr 5 episode · première Sep 2025",
      valueSv: "Avsnitt cell nr 5 · premiär sep 2025",
    },
    {
      label: "Interior access",
      labelSv: "Interiörtillträde",
      value: "Guided / authorised only (SFV)",
      valueSv: "Endast guidning/tillstånd (SFV)",
    },
    {
      label: "Grounds",
      labelSv: "Område",
      value: "Citadel area open · building closed",
      valueSv: "Citadellområde öppet · byggnad stängd",
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
      question: "Is Landskrona Citadel really haunted?",
      questionSv: "Är Landskrona citadell verkligen hemsökt?",
      answer:
        "The citadel has extremely well-documented prison history and a specific cell tied to Hilda Nilsson’s 1917 suicide. Later prisoner unrest reports and SFV’s official Spökelser storytelling treat Cell No. 5 as a ghost narrative — that is cultural folklore and guided interpretation, not scientific proof of apparitions. Haunted Sweden presents both layers separately.",
      answerSv:
        "Citadellet har mycket väl dokumenterad fängelsehistoria och en specifik cell kopplad till Hilda Nilssons självmord 1917. Senare fångars oro och SFV:s Spökelser är kulturberättelse och guidefolklore — inte vetenskapligt bevis. Haunted Sweden håller isär skikten.",
    },
    {
      question: "Who was Hilda Nilsson?",
      questionSv: "Vem var Hilda Nilsson?",
      answer:
        "Hilda Nilsson (1876–1917) of Helsingborg — the “Änglamakerskan” — was convicted in June 1917 of murdering eight foster children she had taken for payment. She was held at Landskrona Citadel and hanged herself in Cell No. 5 on 10 August 1917, unaware that her death sentence had been commuted to life imprisonment the same day.",
      answerSv:
        "Hilda Nilsson (1876–1917) i Helsingborg — ”änglamakerskan” — dömdes i juni 1917 för att ha mördat åtta fosterbarn hon tagit emot mot betalning. Hon satt på Landskrona citadell och hängde sig i cell nr 5 den 10 augusti 1917, utan att veta att dödsdomen samma dag omvandlats till livstid.",
    },
    {
      question: "Can I visit Cell No. 5?",
      questionSv: "Kan jag besöka cell nr 5?",
      answer:
        "Not freely. SFV states the citadel grounds are open but the main building is not generally open to the public. Interior access including the prison tower and cells depends on guided tours or special permission — check ilandskrona.se and current operators such as Skräckfabriken AB. Never trespass.",
      answerSv:
        "Inte fritt. SFV anger att området är öppet men huvudbyggnaden inte generellt är öppen. Interiör, fängelsetorn och celler kräver guidning eller särskilt tillstånd — se ilandskrona.se och aktuella arrangörer som Skräckfabriken AB. Gör aldrig intrång.",
    },
    {
      question: "What is SFV’s Spökelser episode about?",
      questionSv: "Vad handlar SFV:s Spökelser-avsnitt om?",
      answer:
        "Statens fastighetsverk’s 2025 series Spökelser includes Landskrona citadell and Cell No. 5, describing it as the darkest place on the fortress and linking Hilda Nilsson’s death with later stories of female prisoners who could not rest — official heritage storytelling on Sevärt and YouTube, not a paranormal investigation report.",
      answerSv:
        "Statens fastighetsverk:s Spökelser (2025) har avsnitt om Landskrona citadell och cell nr 5 — den mörkaste platsen och Hilda Nilssons död samt berättelser om senare fångar — officiell kulturarvsfilm på Sevärt och YouTube, inte en paranormal utredning.",
    },
    {
      question: "Has Haunted Sweden investigated yet?",
      questionSv: "Har Haunted Sweden utrett platsen ännu?",
      answer:
        "Not yet. Planned verification: authorised Cell No. 5 access, prison-tower photography, archive research (Helsingborgs stadsarkiv / court records), historian and guide interviews, comparison of 1917 testimony with later folklore, and reference to SFV’s Spökelser episode.",
      answerSv:
        "Inte ännu. Planerad verifiering: tillstånd till cell nr 5, foto av fängelsetorn, arkiv (Helsingborgs stadsarkiv/domstolshistoria), historiker- och guideintervjuer, jämförelse 1917-vittnesmål med senare folklore, och SFV:s Spökelser.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
