/**
 * Add Stortorget – Stockholm Bloodbath (id 62)
 * Run: node scripts/add-stortorget.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "stortorget-stockholm-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/7/78/Stortorget_i_Gamla_Stan_i_Stockholm-2.JPG";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "stortorget-stockholm")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "62",
  slug: "stortorget-stockholm",
  name: "Stortorget – Stockholm Bloodbath",
  englishName: "Stortorget – Stockholm Bloodbath (Stockholms blodbad)",
  coverImage: "/places/stortorget-stockholm-cover.jpg",
  category: "Historical Tragedy Site",
  city: "Stockholm",
  region: "Stockholm",
  country: "Sweden",
  address: "Stortorget, Gamla Stan, 111 29 Stockholm, Sweden",
  latitude: 59.3255,
  longitude: 18.0708,
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
    "stortorget",
    "gamla_stan",
    "stockholm_bloodbath",
    "christian_ii",
    "schantzska_huset",
    "92_white_stones",
    "ghost_walk",
    "medieval_stockholm",
    "stockholm",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Stortorget is the historic heart of Gamla Stan — and the stage of the Stockholm Bloodbath. In November 1520, after Christian II of Denmark was crowned king of Sweden in Storkyrkan, roughly eighty to a hundred nobles, bishops, burghers and others were executed on this cobbled square: beheaded by sword or hanged from a gallows raised on the marketplace. Bodies lay in the open before being burned on Södermalm; among the dead was Erik Johansson Vasa, father of the future king Gustav Vasa, whose rebellion followed the massacre. Today colourful façades frame Nobel Prize Museum, Stortorgsbrunnen and Schantzska huset (Stortorget 20), whose white façade stones are popularly said to number each Bloodbath victim — a later symbolic tradition, not a 1520 memorial. Folklore adds that if a stone vanishes, its soul wanders Gamla Stan forever. Haunted Sweden keeps Olaus Petri–era chronology separate from ghost-walk atmosphere. Winter fog and lantern light make Stortorget one of Sweden’s most powerful historical mystery locations.",
  whyItFitsHauntedSweden:
    "One of Sweden’s darkest documented historical sites: national turning point, ~80–100 executions, white-stone folklore, and a central Gamla Stan ghost-walk stop. Visual 10/10, historical 10/10, folklore 9.8/10, paranormal reputation 8.8/10, cultural significance 10/10 — Haunted Sweden Score 9.8. Essential Stockholm destination; premium content EXTREMELY HIGH; research confidence VERY HIGH.",
  shortDescription:
    "Gamla Stan’s main square — site of the Stockholm Bloodbath (Nov 1520), later white-stone memorial folklore on Schantzska huset, and Sweden’s most charged medieval urban stage.",
  history: `## DOCUMENTED: Medieval Stortorget and Gamla Stan

Stortorget (“the Great Square”) is Stockholm’s oldest square — the central point around which the medieval city grew from the 1200s onward. Named in sources as *stora torghit* (1420). From the 1300s to 1732 the city’s town hall (rådstuga) stood here; it was the main marketplace (Erik XIV’s 1563 privileges directed trade here). Nearby **Storkyrkan** (Stockholm Cathedral) served royal and civic ritual; since 2001 the **Nobel Prize Museum** occupies the former Stock Exchange (Börshuset) on the square. **Stortorgsbrunnen** (well pavilion by Erik Palmquist / Palmstedt, 1778; moved away 1857, returned 1953 as aesthetic monument) marks the centre. Colourful merchant façades — Grillska, Schantzska, Seyfridtzska and others — define today’s tourist Gamla Stan.

Earlier recorded executions on the square include 1280 (Folkunga uprising victims under Magnus Ladulås). Between 1603 and 1776 the shame-pole figure **Kopparmatte** stood here as a crime warning.

## DOCUMENTED: Christian II’s coronation and the path to massacre

After invading Sweden in 1520 and receiving Stockholm (amnesty letters September 1520), Christian II was acclaimed and crowned king of Sweden in **Storkyrkan on 4 November 1520**, anointed by Archbishop **Gustaf (Gustav) Trolle**. A three-day coronation feast followed at Tre Kronor castle.

On **7 November** guests were summoned back to the great hall; gates closed. Trolle demanded huge compensation for the demolition of **Almarestäket** and other injuries to the church, listing Sten Sture the Younger and supporters as guilty of **manifest heresy**. Arrests followed that evening. A clerical panel the next day affirmed heresy and handed the accused to the secular power for the customary extreme penalty.

## DOCUMENTED: Stockholm Bloodbath, 8–9 November 1520

Executions on **Stortorget** began at midday **Thursday 8 November 1520**. Eyewitness **Olaus Petri** describes bishops of Skara and Strängnäs (**Vincentius** and **Mattias Gregersson (Lillie)**) led out first and **beheaded with the sword**, then nobles by sword, then Stockholm’s burgomasters and councillors **hanged** from a gallows on the square. **9 November** continued with servants and further victims. Bodies lay on the square into Saturday; blood ran in the gutters. On **10 November** corpses were burned on large pyres on **Södermalm** (later Katarina churchyard area); the body of Sten Sture the Younger was exhumed from the Blackfriars and burned too.

Victim counts vary: executioner **Jürgen Homuth** claimed **82**; historians and media often cite **~80–100** (SVT: near 100; popular summaries ~90). Lists commonly include riksråd **Erik Johansson (Vasa)** — father of **Gustav Vasa** — whose rebellion and the break with the Kalmar Union followed. Christian II became known in Sweden as **Kristian Tyrann**. Political terror, disarmament of burghers, and imprisonment of widows (including Kristina Gyllenstierna) followed.

## DOCUMENTED: Schantzska huset (building history — not 1520)

**Schantzska huset**, Stortorget 20 (beside Seyfridtzska huset), is named for royal secretary **Johan Eberhard Schantz**. The present stepped-gabled Nordic Renaissance façade dates to **1650** (restored 1905), with limestone portal by Johan Wendelstam and a German Psalm 37:5 inscription. It is **more than a century after** the Bloodbath — so its decorative white stones cannot be contemporary memorial markers from 1520.

## DOCUMENTED dark history summary (no invented events)

Beheadings and hangings on the marketplace; public display of bodies; burning of corpses (and Sture’s remains) on Södermalm; heresy trial framing; Gustav Vasa’s personal loss and ensuing national revolt. Separate folklore (white stones / restless souls) below.`,

  legend: `## FOLKLORE: The white stones of Schantzska huset

**Widespread tradition:** white stones on the red façade of Schantzska huset each stand for a Bloodbath victim. Popular tourism and media often say **92** stones (Expressen and similar; stockholmgamlastan-linked tellings). **Swedish Wikipedia** notes that if one counts carefully the number is **94**, and states clearly that the stones’ link to the executed has **no real historical foundation** — they are a **later symbolic / mythic reading** of a 1650 façade, not a 1520 memorial programme.

**Missing-stone legend (folklore):** as long as the stones remain, the dead find a measure of peace; if one stone disappears, the soul it “represents” becomes a restless revenant wandering Gamla Stan forever. Haunted Sweden labels this **folklore**, not documented history. Verify any current count by eye on site — do not treat “92” or “94” as an official Bloodbath victim tally.

## FOLKLORE / GHOST-WALK CULTURE

Stortorget is a staple of Gamla Stan ghost and history walks (Stockholm Ghost Walk, Sweden History Tours, story tours, etc.): Bloodbath narrative, executioner motifs, night alleys, oppression of place. Cannonball folklore on a corner house (Gustav Vasa siege legend — Wikipedia notes the visible ball was set into a 1795 rebuild as symbolic memorial, not a verified 1521 hit on Christian II) is a separate local tale often told nearby.

## MODERN WITNESS-STYLE REPORTS (anecdotal)

Visitors and tour guests report apparitions on the square, night footsteps, unexplained voices, sadness or oppression — especially near Schantzska huset, the approximate execution ground, the well, and narrow alleys. No peer-reviewed paranormal study of Stortorget was located. Record as subjective experience and tourism atmosphere, not proven hauntings.

## Special haunted areas (atmosphere + legend)

1. **Schantzska huset** — white stones / memorial folklore.
2. **Execution site** — approximate marketplace centre of the Bloodbath.
3. **Medieval well (Stortorgsbrunnen)** — historic centrepiece.
4. **Narrow alleys** — classic ghost-walk setting into Gamla Stan.

## Atmosphere, investigation ideas, best conditions

Medieval cobbles, colourful façades, lantern evening light, winter fog — one of Sweden’s most atmospheric historic squares. Ideas: Bloodbath after dark (respectful photography); white-stone legend documentation; history vs folklore; join a licensed ghost walk; EVP only where legal and respectful; Haunted Sweden Stockholm documentary. Best: winter evenings, blue hour, heavy rain, late walking tours, autumn fog. Public square year-round; respect residents and businesses.`,

  safetyNote:
    "Public historic square open year-round. Easy walking access through Gamla Stan; cobbles can be slippery when wet or icy. Guided historical and ghost tours available from commercial operators. Respect façades, residents, shops and museums — do not climb buildings, remove or touch façade stones, or block emergency access. Keep night noise low.",

  sourceLinks: [
    "https://sv.wikipedia.org/wiki/Stockholms_blodbad",
    "https://sv.wikipedia.org/wiki/Stortorget,_Stockholm",
    "https://sv.wikipedia.org/wiki/Schantzska_huset",
    "https://www.svt.se/nyheter/inrikes/500-ar-sedan-blodbadet-i-gamla-stan-sahar-gick-det-till",
    "https://stockholmskallan.stockholm.se/",
    "https://stockholmghostwalk.com/historisk-spokvandring-i-gamla-stan/",
    "https://nobelmuseum.se/",
  ],

  paranormalType: [
    "Apparition",
    "Footsteps",
    "Voices",
    "Heavy Atmosphere",
    "Local Folklore",
    "Historical Tragedy",
  ],
  accessType: "Public Landmark",
  familyFriendly: true,
  visitDifficulty: 1,
  nightAccess: true,
  parkingAvailable: false,
  guidedTours: true,
  publicAccess: true,
  evidenceCount: 0,
  reportCount: 0,
  photoCount: 1,
  videoCount: 0,
  googlePlaceId: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Stortorget,+Gamla+Stan,+Stockholm,+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/stortorget-stockholm-cover.jpg",
      caption: "Stortorget, Gamla Stan — site of the Stockholm Bloodbath",
      captionSv: "Stortorget, Gamla stan — platsen för Stockholms blodbad",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Gamla stans huvudtorg — platsen för Stockholms blodbad (nov 1520), senare vitstensfolklore på Schantzska huset, och Sveriges mest laddade medeltida stadsscen.",
  historySv: `## DOKUMENTERAT: Medeltida Stortorget

Stockholms äldsta torg — centralpunkt från 1200-talet. Rådstuga 1300-talet–1732; huvudtorg för handel. **Storkyrkan** intill; **Nobelmuseet** i Börshuset sedan 2001. **Stortorgsbrunnen** (Palmstedt 1778; åter 1953). Avrättningar även 1280 (Folkungaupproret).

## DOKUMENTERAT: Kristian II:s kröning och vägen till blodbadet

Krönt i Storkyrkan **4 november 1520** av ärkebiskop **Gustaf Trolle**. Den **7 november** framförde Trolle kätterianklagelser och krav efter Almarestäkets rivning; gripanden följde.

## DOKUMENTERAT: Stockholms blodbad 8–9 november 1520

Avrättningar på Stortorget från middagstid **8 november**: biskoparna Vincentius och Mattias först (svärd), sedan adelsmän, därefter borgmästare/rådmän (galge). **9 november** fortsatt. Kroppar på torget; bål på **Södermalm 10 november** (även Sten Sture d.y:s lik). Antal: bödeln Jürgen Homuth **82**; ofta **~80–100** / ca 90. Bland de avrättade: **Erik Johansson (Vasa)**, far till Gustav Vasa. Kristian Tyrann; uppror och självständighet följde.

## DOKUMENTERAT: Schantzska huset

Stortorget 20, uppfört **1650** (Johan Eberhard Schantz), restaurerat 1905 — **långt efter** 1520. Vita stenar kan därför inte vara samtidiga minnesstenar från blodbadet.`,

  legendSv: `## FOLKLORE: Vita stenarna

Tradition: vita stenar på Schantzska husets fasad = blodbadets offer. Turism/media säger ofta **92**; Wikipedia anger att man vid räkning får **94** och att kopplingen till de avrättade **saknar reell historisk förankring** — senare symbolisk/mytisk läsning.

**Saknad sten (folklore):** försvinner en sten vandrar själen i Gamla stan för alltid. Märk som folklore.

## SPÖKVANDRINGSKULTUR

Stortorget är standardstopp på Gamla stan-spökvandringar. Kanonkulesägen i hörnhus är separat lokal berättelse (kulan murades in 1795 som symbol).

## MODERNA UPPLEVELSER (anekdotiska)

Apparitioner, fotsteg, röster, tyngd — ej peer-reviewed utredningar. OMRÅDEN: Schantzska huset; ungefärlig avrättningsplats; brunnen; gränder.`,

  hauntedSwedenAppSummarySv:
    "Stortorget är Gamla stans historiska hjärta — och scenen för Stockholms blodbad. I november 1520, efter att Kristian II krönts i Storkyrkan, avrättades ungefär 80–100 personer på torget: halshuggning och hängning. Kroppar brändes på Södermalm; bland de döda fanns Erik Johansson Vasa, far till Gustav Vasa. Idag ramar färgrika fasader in Nobelmuseet, Stortorgsbrunnen och Schantzska huset, vars vita stenar i folklore sägs räkna varje offer — en senare symboltradition, inte ett 1520-minnesmärke. Legenden om den saknade stenen och den osaliga själen är folklore. Haunted Sweden håller isär dokumenterad kronologi och spökvandringsatmosfär.",
  safetyNoteSv:
    "Offentligt historiskt torg året runt. Lätt att gå i Gamla stan; kullerstensgator kan vara hala. Guidade historie- och spökvandringar finns. Respektera fasader, boende och butiker — klättra inte, rör inte fasadstenar. Håll låg volym nattetid.",
  infoBox: [
    {
      label: "Bloodbath",
      labelSv: "Blodbadet",
      value: "8–9 Nov 1520 (events from 7 Nov)",
      valueSv: "8–9 nov 1520 (inleds 7 nov)",
    },
    {
      label: "Victims",
      labelSv: "Offer",
      value: "~80–100 (executioner: 82)",
      valueSv: "ca 80–100 (bödeln: 82)",
    },
    {
      label: "Ordered under",
      labelSv: "Under",
      value: "Christian II · Gustaf Trolle’s heresy case",
      valueSv: "Kristian II · Gustaf Trolles kätterimål",
    },
    {
      label: "Schantzska huset",
      labelSv: "Schantzska huset",
      value: "Façade 1650 · white-stone folklore",
      valueSv: "Fasad 1650 · vitstensfolklore",
    },
    {
      label: "Stone count myth",
      labelSv: "Stenantalsmyt",
      value: "Often 92; Wikipedia count 94",
      valueSv: "Ofta 92; Wikipedia räknar 94",
    },
    {
      label: "Nearby",
      labelSv: "Intill",
      value: "Storkyrkan · Nobel Prize Museum",
      valueSv: "Storkyrkan · Nobelmuseet",
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
      question: "When was the Stockholm Bloodbath?",
      questionSv: "När var Stockholms blodbad?",
      answer:
        "Arrests and the heresy process began 7 November 1520 after Christian II’s coronation; mass executions on Stortorget took place 8–9 November. Bodies were burned on Södermalm on 10 November.",
      answerSv:
        "Gripanden och kätteriprocessen inleddes 7 november 1520 efter Kristian II:s kröning; massavrättningarna på Stortorget skedde 8–9 november. Kroppar brändes på Södermalm den 10 november.",
    },
    {
      question: "How many people were executed?",
      questionSv: "Hur många avrättades?",
      answer:
        "Sources disagree. The executioner Jürgen Homuth claimed 82; historians and media often say roughly 80–100 (commonly summarised as about 90). Exact totals remain debated.",
      answerSv:
        "Källorna skiljer sig. Bödeln Jürgen Homuth uppgav 82; historiker och media säger ofta ungefär 80–100 (vanligen ca 90). Exakt antal är omdiskuterat.",
    },
    {
      question: "Do the white stones on Schantzska huset commemorate the victims?",
      questionSv: "Minns de vita stenarna på Schantzska huset offren?",
      answer:
        "Popular tradition says yes (often 92 stones; Wikipedia’s count is 94). Historically the link has no solid foundation — the house façade dates to 1650, long after 1520. Treat as later symbolic folklore. The “missing stone releases a restless soul” story is folklore.",
      answerSv:
        "Folklig tradition säger ja (ofta 92 stenar; Wikipedia räknar 94). Historiskt saknas fast förankring — fasaden är från 1650, långt efter 1520. Behandla som senare symbolisk folklore. Berättelsen om saknad sten och osalig själ är folklore.",
    },
    {
      question: "How is Gustav Vasa connected?",
      questionSv: "Hur är Gustav Vasa kopplad?",
      answer:
        "His father, riksråd Erik Johansson (Vasa), was among those executed. The Bloodbath helped spark the rebellion that made Gustav Vasa king and ended effective Danish rule under the Kalmar Union.",
      answerSv:
        "Hans far, riksrådet Erik Johansson (Vasa), var bland de avrättade. Blodbadet bidrog till upproret som gjorde Gustav Vasa till kung och avslutade det effektiva danska styret under Kalmarunionen.",
    },
    {
      question: "Has Haunted Sweden investigated Stortorget yet?",
      questionSv: "Har Haunted Sweden utrett Stortorget ännu?",
      answer:
        "Not yet. Planned: night photography, white-stone documentation, ghost-walk observation, historian interviews, history-vs-folklore comparison, and a Stockholm documentary episode.",
      answerSv:
        "Inte ännu. Planerat: nattfotografi, dokumentation av vita stenar, spökvandringsobservation, historikerintervjuer, historia kontra folklore, och Stockholmsdokumentär.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
