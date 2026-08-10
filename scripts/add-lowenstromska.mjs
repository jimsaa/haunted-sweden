/**
 * Add Löwenströmska lasarettet (id 67)
 * Run: node scripts/add-lowenstromska.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "lowenstromska-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/0/03/L%C3%B6wenstr%C3%B6mska_Ga_Lasarett.JPG";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "lowenstromska-lasarettet")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "67",
  slug: "lowenstromska-lasarettet",
  name: "Löwenströmska lasarettet",
  englishName: "Löwenströmska Hospital (Historic Campus)",
  coverImage: "/places/lowenstromska-cover.jpg",
  category: "Abandoned Place",
  city: "Upplands Väsby",
  region: "Stockholm",
  country: "Sweden",
  address: "194 45 Upplands Väsby, Sweden",
  latitude: 59.54111,
  longitude: 17.91472,
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
  hauntedSwedenScore: 9.5,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "lowenstromska_lasarettet",
    "upplands_vasby",
    "abandoned_hospital",
    "psychiatric_hospital",
    "urban_exploration",
    "gustav_iii",
    "anckarstrom",
    "ghost_hospital",
    "stockholm",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Löwenströmska lasarettet in Upplands Väsby is one of Sweden’s best-known historic hospital campuses — and a flagship abandoned-medical atmosphere site. After Jacob Johan Anckarström murdered King Gustav III at the Stockholm Opera masquerade in 1792, his brother Gustaf Adolf (Anckarström) took the name Löwenström. In 1808–1811 he commissioned Stockholm city architect Carl Christoffer Gjörwell and endowed a charitable hospital near Hammarby / Lake Fysingen; gift deed and will of 1811 placed it under Serafimergillet. Svenskt Biografiskt Lexikon notes the famous atonement motive is not written into the deed but is supported by local oral tradition, alongside his own illness and wartime need for care (1808 Finland war). Stockholms läns landsting took over in 1876; a sanatorium rose in 1910; an 1884 “idiotanstalt” / later Klockbacka special school expanded care for people then labelled sinnesslöa. A new hospital (c. 1964–1968) shifted acute care; historic buildings served long-term care into the early 1990s (often cited closed 1993) before emptying, vandalism and stalled redevelopment (Arlanda noise). A modern Löwenströmska sjukhus still operates nearby. Haunted Sweden separates that medical history from Mitt i / urbex ghost rumours. Private property — never trespass.",
  whyItFitsHauntedSweden:
    "Unique national story (Gustav III / Anckarström / atonement tradition), 180+ years of medical and care history, large mixed campus of ruin and reuse, strong urbex fame. Visual 9.8/10, historical 10/10, urbex value 10/10, folklore 8.8/10 (modern), paranormal reputation 9.2/10 (anecdotal) — Haunted Sweden Score 9.5. Premium EXTREMELY HIGH for exterior documentary and archive research — not illegal entry.",
  shortDescription:
    "Historic Upplands Väsby hospital campus founded c. 1810 by Gustaf Adolf Löwenström after the Anckarström regicide — later sanatorium and care schools; many older buildings abandoned after 1993.",
  history: `## DOCUMENTED: Gustav III, Anckarström and the Löwenström name

On **16 March 1792** King **Gustav III** was shot at the Opera masquerade by **Jacob Johan Anckarström** and died of wounds on 29 March. The family name Anckarström was stained; brother **Gustaf Adolf** adopted **Löwenström**. He later bought/leased land at Torsåker, Hammarby and Holmen near the Stockholm–Uppsala road and Lake Fysingen.

## DOCUMENTED: Founding the hospital (1808–1811)

On **12 November 1808** Löwenström asked Stockholm city architect **Carl Christoffer Gjörwell the Younger** for drawings for a hospital on the Holmen property. Care began in an existing building before the purpose-built house north of Hammarby church was ready (**1810**). By gift deed and testament **1811** he endowed **Löwenströmska lasarettet**, to be administered by **Serafimergillet** (Seraphim Order chapter). First long-serving medical head: Christian Ziegert (German), aided by Beata Westerberg — both commemorated in local street names.

**Atonement motive:** Popular and Wikipedia accounts present the endowment as penance for the brother’s regicide. **Svenskt Biografiskt Lexikon** states the motive is **not explicit in writing** but is **supported by local oral tradition**, while also citing Löwenström’s own illness and the wartime need for regional care after 1808. Haunted Sweden reports both layers — do not treat atonement as a signed confession in the deed.

The original Gjörwell pavilion no longer stands intact; later fabric incorporated older masonry (Locum / SVT note remains in long-care structures).

## DOCUMENTED: County hospital, sanatorium, care institutions

**1876:** Stockholms läns landsting (today Region Stockholm lineage) took over from Serafimerorden. Mid-1800s rebuilds expanded beds (Locum: ~16 then ~54). **1884:** county “idiotanstalt” / early special care and schooling on the campus — historically harsh terminology; later **Klockbacka** school and related homes (care/teaching of people then called sinnesslöa, roughly 1884–1984 in Locum overview). **1910:** **Sanatorium** (TB / Hammarby sanatorium) on the hill. Operations culture of early medicine: instruments used for decades, anaesthesia only from 1858 (Locum heritage text).

## DOCUMENTED: New hospital, long-term care, abandonment of historic stock

New **Löwenströmska sjukhuset** rose in the **1960s** (often **1968** / Locum mid-1960s). Historic buildings served **långvård** (long-term care) into the early 1990s — English Wikipedia and urbex sources commonly say historic hospital functions ceased **1993**; Swedish Wikipedia notes emptiness after the new complex, with landsting sale of older stock to a property company in **2009**. Redevelopment (Savana / Arkitema etc.) repeatedly stalled by **Arlanda airport noise**. Some buildings have been reused or converted (e.g. sanatorium → dementia housing in owner materials); others remain empty, vandalised and photogenic for urbex. A **1985** psychiatric building and modern forensic/psychiatric wards belong to the **active** hospital campus — not the abandoned ruin narrative.

## DOCUMENTED dark / medical context (no invented epidemics)

Nineteenth-century hospital care meant high mortality risk, limited anaesthesia, contagion including tuberculosis at the 1910 sanatorium, and institutionalisation of psychiatric / intellectual disability populations under period labels. Do not invent specific plague years or named mass-death events without archival proof.`,

  legend: `## FOLKLORE / URBAN LEGEND — source-labelled

Abandoned hospitals attract ghost stories almost automatically — Haunted Sweden states that explicitly. Local media (**Mitt i**, Halloween features) report rumours of adventurous locals attempting overnight stays and leaving after **mysterious sights and sounds**. Urbex blogs (Schtaie, Utforskat, Oskyltat) emphasise decay, smashed windows and “spooky aura,” usually without controlled investigation data.

Treat shadow figures, corridor footsteps, voices and cold spots circulating online as **modern urban-exploration / newspaper atmosphere folklore**, not verified hauntings. No peer-reviewed paranormal study was located.

### Atonement storytelling

The Anckarström–atonement narrative is itself partly **oral tradition** (SBL) amplified into founding myth — historically powerful, but distinguish oral tradition from signed deed language.

## Special atmospheric areas (history + decay — not verified hotspots)

1. Historic / “Gamla” lasarett fabric (Gamla Lasarettsvägen area).
2. Former psychiatric / care buildings in the old park (many empty; some active psych elsewhere).
3. Old sanatorium hill (Hammarby / 1910) — partly reused.
4. Long corridors and façades of abandoned stock.
5. Cemetery/chapel — only if documented on a lawful visit; do not invent.

## Atmosphere, investigation ideas, best conditions

Crumbling brick, long empty wings, forest and Fysingen edge, Arlanda rumble in the distance. Ideas: exterior documentary; archive research (Regionarkivet Stockholm / SBL); historian interviews; atonement myth vs deed; history vs urbex legend. Best: fog, autumn, rain, blue hour — **from lawful vantage points only**.`,

  safetyNote:
    "MIXED CAMPUS: a modern Löwenströmska sjukhus and some care homes are ACTIVE. Historic empty buildings are private property (developer ownership). Do NOT trespass, force entry, or film interiors without permission. Structural hazards, vandalism and security apply. Respect patients, staff and residents. Haunted Sweden never encourages illegal urbex. Prefer public roads and lawful exterior photography.",

  sourceLinks: [
    "https://sv.wikipedia.org/wiki/L%C3%B6wenstr%C3%B6mska_lasarettet",
    "https://sok.riksarkivet.se/sbl/Presentation.aspx?id=10126",
    "https://www.locum.se/husen/lowenstromska-sjukhuset/hander-i-huset/nyheter/lowenstromska-ett-sjukhus-med-kungliga-anor/",
    "https://www.svt.se/nyheter/lokalt/stockholm/sinnessjukhus-i-upplands-vasby-har-statt-tomt-i-30-ar",
    "https://www.mitti.se/nyheter/platserna-i-vasby-som-ger-kalla-karar-6.3.181014.c636fc5ee1",
    "https://www.oskyltat.se/2021/10/19/hostpromenad-i-sjukhusens-skugga/",
    "https://www.savana.se/sv/fastighetsforvaltning/fastigheter/hammarby-116-upplands-vasby",
  ],

  paranormalType: [
    "Heavy Atmosphere",
    "Footsteps",
    "Voices",
    "Shadow Figures",
    "Temperature Changes",
    "Local Folklore",
    "Urban Legend",
  ],
  accessType: "Restricted Access",
  familyFriendly: false,
  visitDifficulty: 2,
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
    "https://www.google.com/maps/search/?api=1&query=L%C3%B6wenstr%C3%B6mska+lasarettet,+Upplands+V%C3%A4sby",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/lowenstromska-cover.jpg",
      caption: "Gamla Löwenströmska lasarettet — historic hospital fabric, Upplands Väsby",
      captionSv: "Gamla Löwenströmska lasarettet — historisk sjukhusbyggnad, Upplands Väsby",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Historiskt sjukhusområde i Upplands Väsby grundat ca 1810 av Gustaf Adolf Löwenström efter Anckarströms kungamord — senare sanatorium och omsorgsskolor; många äldre hus tomma efter 1993.",
  historySv: `## DOKUMENTERAT: Gustav III och Anckarström

**1792** mördades Gustav III av **Jacob Johan Anckarström**. Brodern **Gustaf Adolf** antog namnet **Löwenström**.

## DOKUMENTERAT: Lasarettet 1808–1811

Ritningar av **Carl Christoffer Gjörwell**; byggnad klar **1810**; gåvobrev/testamente **1811** under **Serafimergillet**. **SBL:** soningsmotivet är **inte utskrivet** men stöds av **lokal muntlig tradition**; även egen sjukdom och krigsbehov 1808.

## DOKUMENTERAT: Expansion

**1876** landstinget. **1884** “idiotanstalt”/senare Klockbacka. **1910** sanatorium. Nytt sjukhus **1960-tal (ca 1968)**. Historiska hus i långvård till tidigt **1990-tal (ofta 1993)**; sålda **2009**. Modernt sjukhus och viss psykiatri **aktiva**.`,

  legendSv: `## FOLKLORE / URBAN LEGEND — källmärkt

Övergivna sjukhus genererar spökhistorier. **Mitt i** m.fl. återger rykten om syner/ljud vid övernattningsförsök. Urbexbloggar betonar förfall. Märk som **modern urbex-/mediefolklore**, inte bevisad hemsökelse.

Soningsberättelsen är delvis **muntlig tradition** (SBL) — kraftfull, men skilj från gåvobrevets ordalydelse.

Inget intrång.`,

  hauntedSwedenAppSummarySv:
    "Löwenströmska lasarettet i Upplands Väsby är ett av Sveriges mest kända historiska sjukhusområden — och ett flaggskepp för övergiven medicinsk atmosfär. Efter Jacob Johan Anckarströms mord på Gustav III 1792 tog brodern namnet Löwenström och lät 1808–1811 bygga ett välgörenhetslasarett (Gjörwell; Serafimergillet 1811). SBL noterar att soningsmotivet främst vilar på lokal tradition, parallellt med sjukdoms- och krigsbehov. Landstinget 1876; sanatorium 1910; omsorg/skola från 1884; nytt sjukhus ca 1968; historiska hus tömdes efter långvård in på 1990-talet. Modernt sjukhus finns kvar. Haunted Sweden skiljer medicinhistoria från urbex-spökrykten. Privat mark — gör aldrig intrång.",
  safetyNoteSv:
    "BLANDAT OMRÅDE: modernt sjukhus och vissa boenden är AKTIVA. Tomma historiska hus är privatägda. Gör INTE intrång. Respektera patienter och personal. Haunted Sweden uppmuntrar aldrig olaglig urbex.",
  infoBox: [
    {
      label: "Founded",
      labelSv: "Grundat",
      value: "1810 building · 1811 endowment",
      valueSv: "Byggnad 1810 · donation 1811",
    },
    {
      label: "Architect",
      labelSv: "Arkitekt",
      value: "Carl Christoffer Gjörwell",
      valueSv: "Carl Christoffer Gjörwell",
    },
    {
      label: "Founder",
      labelSv: "Grundare",
      value: "Gustaf Adolf Löwenström",
      valueSv: "Gustaf Adolf Löwenström",
    },
    {
      label: "Atonement story",
      labelSv: "Soningsberättelsen",
      value: "Oral tradition (SBL) + popular history",
      valueSv: "Muntlig tradition (SBL) + populärhistoria",
    },
    {
      label: "Historic stock empty",
      labelSv: "Historiska hus tömda",
      value: "Often cited from 1993 · sold 2009",
      valueSv: "Ofta angivet från 1993 · sålt 2009",
    },
    {
      label: "Access",
      labelSv: "Tillträde",
      value: "Mixed campus — no trespassing",
      valueSv: "Blandat område — inget intrång",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 9.5 · Premium EXTREMELY HIGH",
      valueSv: "Poäng 9.5 · Premium EXTREMT HÖG",
    },
  ],
  faq: [
    {
      question: "Was the hospital really built as atonement for Gustav III’s murder?",
      questionSv: "Byggdes sjukhuset verkligen som soning för mordet på Gustav III?",
      answer:
        "It is the dominant popular story: Gustaf Adolf Löwenström endowed the hospital after his brother Jacob Johan Anckarström killed the king. Svenskt Biografiskt Lexikon says the atonement motive is not written into the deed but is backed by local oral tradition, alongside his own illness and regional wartime need.",
      answerSv:
        "Det är den dominerande populära berättelsen: Gustaf Adolf Löwenström donerade lasarettet efter brodern Jacob Johan Anckarströms kungamord. Svenskt Biografiskt Lexikon säger att soningsmotivet inte står i gåvobrevet men stöds av lokal muntlig tradition, parallellt med egen sjukdom och regionalt krigsbehov.",
    },
    {
      question: "Can I explore the abandoned buildings?",
      questionSv: "Kan jag utforska de övergivna byggnaderna?",
      answer:
        "No without owner permission. Empty historic buildings are private; the modern hospital and some care homes are active. Haunted Sweden forbids promoting trespass. Exterior photography from lawful public vantage points only.",
      answerSv:
        "Nej utan ägartillstånd. Tomma historiska hus är privata; moderna sjukhuset och vissa boenden är aktiva. Haunted Sweden förbjuder att uppmuntra intrång. Exteriörfoto endast från lagliga publika lägen.",
    },
    {
      question: "When did the old hospital close?",
      questionSv: "När stängde det gamla lasarettet?",
      answer:
        "Acute care moved to the 1960s complex; historic buildings continued as long-term care into the early 1990s (commonly cited 1993), then stood largely empty until sold around 2009. Redevelopment has been repeatedly delayed.",
      answerSv:
        "Akutsjukvården flyttade till 1960-talskomplexet; historiska hus fortsatte som långvård in på tidigt 1990-tal (ofta 1993), stod sedan mest tomma till försäljning ca 2009. Ombyggnad har upprepade gånger fördröjts.",
    },
    {
      question: "Are the ghost stories proven?",
      questionSv: "Är spökhistorierna bevisade?",
      answer:
        "No. Local media and urbex writers report mysterious sounds and sights. Abandoned hospitals naturally spawn such tales. Haunted Sweden labels them anecdotal modern folklore.",
      answerSv:
        "Nej. Lokalmedia och urbexskribenter rapporterar mystiska ljud och syner. Övergivna sjukhus ger nästan automatiskt sådana berättelser. Haunted Sweden märker dem som anekdotisk modern folklore.",
    },
    {
      question: "Has Haunted Sweden investigated yet?",
      questionSv: "Har Haunted Sweden utrett platsen ännu?",
      answer:
        "Not yet. Planned: lawful exterior photography, Regionarkivet / SBL research, historian interviews, and a documentary comparing the atonement tradition with deeds and medical records.",
      answerSv:
        "Inte ännu. Planerat: lagligt exteriörfoto, Regionarkivet/SBL, historikerintervjuer och dokumentär som jämför soningstraditionen med gåvobrev och medicinska akter.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
