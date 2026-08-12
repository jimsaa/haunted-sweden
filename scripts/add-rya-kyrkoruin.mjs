/**
 * Add Rya Gamla Kyrka / Rya Kyrkoruin (id 69)
 * Run: node scripts/add-rya-kyrkoruin.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "rya-kyrkoruin-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/7/79/Rya_kyrkoruin_06.jpg";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "rya-kyrkoruin")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "69",
  slug: "rya-kyrkoruin",
  name: "Rya Gamla Kyrka",
  englishName: "Rya Church Ruin (Rya Kyrkoruin)",
  coverImage: "/places/rya-kyrkoruin-cover.jpg",
  category: "Church / Cemetery",
  city: "Örkelljunga",
  region: "Skåne",
  country: "Sweden",
  address: "Rya 144, 286 91 Örkelljunga, Skåne, Sweden",
  latitude: 56.2291,
  longitude: 13.1697,
  featured: false,
  verified: false,
  verificationLevel: "community-verified",
  verifiedByTeam: false,
  visitedByTeam: false,
  visitCount: 0,
  lastInvestigationDate: null,
  investigationPhotos: [],
  investigationVideos: [],
  overnightInvestigation: false,
  hauntingLevel: 1,
  hauntedSwedenScore: 8.5,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "rya_gamla_kyrka",
    "rya_kyrkoruin",
    "orkelljunga",
    "skane",
    "medieval_church",
    "church_ruin",
    "medieval_folklore",
    "historic_mystery",
    "churchyard",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Rya kyrkoruin — Rya gamla kyrka — stands on a hill west of the Pinnån in northwestern Skåne, roughly six kilometres southwest of Örkelljunga. The Romanesque stone church was probably built around the turn of the 1100s/1200s: nave and straight-ended chancel, later 1400s vaults with lime paintings and a southern porch. Herrevad Abbey may have influenced the build; the medieval baptismal font (Mörarpsmästaren workshop) now stands in the 1875 replacement church at Eket. By the 1700s the vaults leaked; in 1715 a timber extension and tower were added. With a thousand parishioners but room for only 132, the sockenstämman decided in 1856 to build anew — inaugurated 1875. Inventories, roof, floors and vault brick were auctioned in 1875–1876; only grey-stone walls remained until restoration in 1941 and 1957. Today the open-air ruin hosts summer services, baptisms and weddings. Haunted Sweden’s targeted research found no credible White Lady cycle, churchyard apparition tradition, or documented paranormal investigations tied to this site — classify it as a HISTORIC MYSTERY: almost 900 years of parish history and strong ruin atmosphere, not a proven haunted reputation.",
  whyItFitsHauntedSweden:
    "Authentic medieval church ruin (~900 years), kyrkligt kulturminne context, Herrevad/Mörarp font lineage, dramatic abandonment-and-stripping story (1875 auction), active outdoor worship, and Länsstyrelsen Skåne kulturmiljöprogram Rya–Ingeborrarp landscape. Visual 9.0/10, historical 9.5/10, architectural 9.0/10, atmosphere 9.5/10 — but folklore strength LOW and paranormal reputation WEAK after targeted search (Svenska kyrkan, kommun, länsstyrelse, Wikipedia, tourism, ghost-list trawls). Haunted Sweden Score 8.5 (under 9.0 — not marketed as haunted). Premium MEDIUM–HIGH for history photography and ‘The Forgotten Medieval Church’ documentary; verification mission: folklore archives, newspaper search, pastorat/local society contact.",
  shortDescription:
    "Medieval Romanesque church ruin in Rya socken — abandoned 1875 after auction stripping, restored 1941; active summer worship; HISTORIC MYSTERY (no verified ghost tradition found).",
  history: `## DOCUMENTED: Medieval Rya parish church

**Rya kyrkoruin** (Rya gamla kyrka) lies in **Rya socken**, **Örkelljunga kommun**, Skåne — on a marked height west of the **Pinnån**, ~600 m southeast of the E4 and ~2 km southwest of **Rya nya kyrka** in **Eket** (Wikipedia / Svenska kyrkan). Address tradition: **Rya 144**. Coordinates in BeBR/Commons cluster ~**56.229°N, 13.170°E**.

The **Romanesque** stone church was **probably built around the turn of the 1100s/1200s** (Svenska kyrkan Örkelljunga pastorat; Wikipedia). Plan: **nave** and **straight-ended chancel** of grey stone, originally with a **flat wooden ceiling**. Dimensions (Wikipedia): total length **23 m** (east–west), width **8 m**; nave **16.5 m**, chancel **6 m**; **porch (vapenhus)** on the south **4×6 m**; walls **>1 m** thick, up to **~8 m** high. A **tower** stood over the west end (1715 timber phase).

## DOCUMENTED: Herrevad, Mörarp font and 1400s Gothic phase

**Herrevad Abbey (Herrevadskloster)** owned estates in Rya socken; pastorat and Wikipedia note **possible Cistercian influence** on the original build. The **sandstone baptismal font** (late 1100s / early 1200s, **Mörarpsmästaren** workshop) was in the old church and is now in the **1875** replacement (**Rya kyrka, Eket** — Wikipedia / pastorat). On the **1400s** the flat ceiling was replaced by **brick cross-vaults** with **medieval lime paintings (kalkmålningar)**; a **porch** was built before the south portal. **Länsstyrelsen Skåne** kulturmiljöprogram adds later **sacristia** to the Romanesque scheme.

Pre-Reformation interior was austere: congregation **stood or knelt** through services; **pews came only after the Reformation** (Wikipedia). Floor in nave and chancel: **oak boards**; later aisle quarters **cobblestone** until closure.

## DOCUMENTED: Decline, 1715 tower, 1856 decision

Early **1700s**: the parish priest reported **rain leaking through the vaults**. **1715**: **timber extension** and **tower** added on the wooden superstructure (pastorat). By the **1800s** the church was **too small and in poor repair**.

**1856 sockenstämma**: decision to build a new church — parish ~**1,000** inhabitants, old church seated **132** (pastorat / Wikipedia).

## DOCUMENTED: 1875 new church, auction stripping, ruin

**New Rya kyrka** in **Eket** built in brick; architect/builder **J. Hallberg**, Ängelholm; **inaugurated 1875** (Wikipedia). The medieval church was **abandoned**. **1875–1876 public auction**: furnishings, **roof**, **floor beams**, **vault brick** sold — **only grey-stone walls left** (pastorat). **Medieval lime paintings did not survive** in the ruin; they went with the stripped vault fabric (logical inference from auction description — do not claim specific buyer).

**Transferred objects (documented):** font to new church; **bell cast 1727** by **Andreas Wetterholtz**, Malmö (inscriptions — Wikipedia cites *Skånes Annonsblad*, 1902); **late-1500s altarpiece** in new church; **1727 bell** history.

## DOCUMENTED: Restoration and present use

Walls **deteriorated** until **1941 restoration**; **1957** further repair — **cement** on wall crowns and window sills (pastorat). **1967/1968**: new **wooden bell-stapel** with recast bell west of ruin (pastorat says **1967**, Wikipedia **1968**). Modern **wooden benches and altar** inside ruin for services.

**Today (Svenska kyrkan / kommun):** **outdoor services**, **baptisms**, **weddings**, **vägkyrka** in summer. ~**1 km path** from **Ingeborrarp** / friluftsmuseum area (Visit Örkelljunga).

## DOCUMENTED: Landscape and heritage framing

**Länsstyrelsen Skåne — Kulturmiljöprogram Rya–Ingeborrarp:** ruin exemplifies late-1800s shift when **former socken centres were abandoned** for new industrial/communication nodes; Eket became the new centre. **Ödekyrkogård** with some **gravestones and cast-iron crosses** inside a **dry-stone wall** (Wikipedia). Nearby **U-plan farms** and **Ingeborrarpsgården** (hembygdsgård, byggnadsminne) anchor the historic landscape.

## DOCUMENTED dark / regional context (no invented tragedies)

As a parish church for ~650+ years, the churchyard holds **ordinary Christian burials** — no specific mass tragedy, battle or epidemic at the ruin was located in this research pass. Northwestern Skåne shared **Danish–Swedish border history** (Skåne Swedish from **1658**); Rya was not highlighted in sources reviewed as a conflict battle site. **Reformation** changed worship style (pews, etc.) but is not documented here as a haunting origin. Do **not** manufacture plague years or unnamed executions.`,

  legend: `## FOLKLORE & PARANORMAL RESEARCH RESULT — HISTORIC MYSTERY

Haunted Sweden performed **targeted research** (not assumption from “old church = haunted”):

**Sources searched:** Svenska kyrkan / Örkelljunga pastorat; Örkelljunga kommun; Visit Örkelljunga; Länsstyrelsen Skåne kulturmiljöprogram; Wikipedia / BeBR tradition; regional tourism; online ghost-site lists; newspaper-index hints (*Skånes Annonsblad* 1902 on bell — historical, not paranormal); commons/local photo archives.

### Ghost stories — NOT FOUND (credible tradition)

No substantiated **White Lady / Grey Lady**, **priest ghost**, **phantom bells**, **churchyard apparition cycle**, or **named oral tradition** specifically attached to **Rya gamla kyrka / Rya kyrkoruin** was located in official church, municipal, county or Wikipedia sources. None of the reviewed texts present the ruin as a known haunted site.

**Do not infer** hauntings from age, open roof, or ödekyrkogård atmosphere alone.

### Paranormal reputation — WEAK / ABSENT

- **No** documented paranormal investigation reports, EVP claims, or newspaper “ghost hunt” features tied to this ruin were found.
- **No** credible visitor witness corpus (apparitions, shadow figures, footsteps, voices, lights) with identifiable sources.
- Generic “medieval churches feel spooky” social-media tone may exist; Haunted Sweden **does not** treat that as local folklore.

**Explicit conclusion:** Rya kyrkoruin is **not classified as haunted** in Haunted Sweden on current evidence.

### Classification

**HISTORIC MYSTERY** — flagship question: **“The Forgotten Medieval Church”**

- Why was the medieval church **abandoned** rather than demolished? (Economic reuse: auction of fabric; walls kept as memorial/landmark; later **1941** conscious preservation.)
- What happened to **furnishings, vault brick and lime paintings**? (**1875–1876 auction** — paintings lost with vault teardown.)
- What survives **archaeologically** under and around the ruin? (Medieval footprint, ödekyrkogård stones — further parish/archive research needed.)
- Who was **buried** here across centuries? (Normal parish burials; no sensational list found — future graveyard study.)
- Why preserve a **roofless** church today? (Living worship, heritage, Skåne kulturmiljö identity.)

### Future folklore verification (open research)

Örkelljunga pastorat, hembygdsförening, **Folklivsarkiv** / university folklore collections, pre-digital **newspaper archives**, and oral history interviews may yet surface local stories — none met Haunted Sweden’s credibility bar in this pass.

## Special areas (atmosphere — not verified paranormal hotspots)

1. **Main ruin** — Romanesque grey-stone shell, open sky.
2. **Former chancel (east)** — oldest liturgical focus.
3. **Medieval churchyard** — walled ödekyrkogård, scattered stones/crosses.
4. **Southern entrance / porch** — medieval portal zone.
5. **Surrounding Rya–Ingeborrarp landscape** — Pinnån valley, hagmark, oak/beech slopes.

## Investigation ideas (historical — not ghost-hunt default)

- *The Forgotten Medieval Church* / *What Happened to Rya’s Medieval Church?*
- Herrevad & Mörarp font lineage; 1875 auction documentary.
- History vs folklore archive hunt; compare with **Eket** new church.
- Medieval Skåne landscape photography — fog, blue hour, autumn.

**Paranormal investigation ideas:** only if future verification finds credible tradition — **not recommended** as primary framing today.

## Best conditions

Autumn, fog, blue hour, early morning mist, overcast — for **historical atmosphere photography**, respecting active worship and graves.`,

  safetyNote:
    "Active outdoor church ruin and ödekyrkogård — summer services, baptisms and weddings may be in progress. Respect worship, graves and archaeological remains; do not disturb stones, dig, or remove material. Uneven ground and wall bases; caution in wet/foggy conditions. Verify access via Örkelljunga pastorat / kommun. Allemansrätt applies to surrounding countryside — do not damage fences, crops or livestock. Haunted Sweden does not encourage unauthorised night investigations or graveyard intrusion.",

  sourceLinks: [
    "https://www.svenskakyrkan.se/orkelljunga/rya-kyrkoruin",
    "https://sv.wikipedia.org/wiki/Rya_kyrkoruin",
    "https://sv.wikipedia.org/wiki/Rya_kyrka,_%C3%96rkelljunga",
    "https://www.orkelljunga.se/16/uppleva-och-gora/visit-orkelljunga/uppleva/se/rya-kyrkoruin.html",
    "https://www.visitorkelljunga.com/rya-kyrkoruin",
    "https://www.lansstyrelsen.se/skane/besoksmal/kulturmiljoprogram/kulturmiljoprogram-omraden/kulturmiljoprogram-rya-ingeborrarp.html",
    "https://commons.wikimedia.org/wiki/Category:Rya_kyrkoruin",
  ],

  paranormalType: ["Heavy Atmosphere", "Local Folklore"],
  accessType: "Public Landmark",
  familyFriendly: true,
  visitDifficulty: 1,
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
    "https://www.google.com/maps/search/?api=1&query=Rya+144,+286+91+%C3%96rkelljunga,+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/rya-kyrkoruin-cover.jpg",
      caption: "Rya kyrkoruin — medieval Romanesque church ruin, Örkelljunga",
      captionSv: "Rya kyrkoruin — medeltida romansk kyrkoruin, Örkelljunga",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Medeltida romansk kyrkoruin i Rya socken — övergiven 1875 efter auktionsrivning, restaurerad 1941; sommargudstjänster; HISTORISKT MYSTERIUM (ingen verifierad spöktradition).",
  historySv: `## DOKUMENTERAT: Medeltida sockenkyrka

**Rya kyrkoruin** i **Rya socken**, **Örkelljunga kommun** — på höjd väster om **Pinnån**, ca **2 km** från **Rya nya kyrka** i **Eket**.

**Romansk** stenkyrka troligen **ca sekelskiftet 1100/1200** (Svenska kyrkan): **långhus** och **rakslutet kor**, trätt innertak. Mått enligt Wikipedia: längd **23 m**, bredd **8 m**; **vapenhus** söder **4×6 m**; murar **>1 m** tjocka, upp till **~8 m** höga.

## DOKUMENTERAT: Herrevad, 1400-tal, 1700-tal

**Herrevadskloster** ägde jord i socknen — möjligt inflytande på kyrkbygget. **Dopfunten** ( **Mörarpsmästaren**, 1100/1200-tal) flyttades till nya kyrkan **1875**. **1400-talet:** **kryssvalv** med **kalkmålningar**; **vapenhus**. **Tidigt 1700-tal:** läckande valv; **1715** träutbyggnad och **torn**.

## DOKUMENTERAT: 1856–1876 övergivande

**1856:** sockenstämma beslutar ny kyrka — **1000** invånare, **132** sittplatser. **Ny kyrka Eket** (**J. Hallberg**, tegel) **invigd 1875**. **Auktion 1875–1876:** inventarier, **tak**, **bjälklag**, **valvtegel** såldes — kvar **gråstensmurarna**. **1941** restaurering; **1957** reparation; **1967/1968** klockstapel.

## DOKUMENTERAT: Idag

**Friluftsgudstjänster**, **dop**, **bröllop**, **vägkyrka** sommartid. **Ödekyrkogård** med gravstenar och gjutjärnskors innanför **kallmur**. **Länsstyrelsen:** kulturmiljö **Rya–Ingeborrarp** — typiskt att sockencentrat övergavs till förmån för Eket/industrialismen.`,

  legendSv: `## FOLKLORERESULTAT — HISTORISKT MYSTERIUM

Målriktad research (Svenska kyrkan, kommun, länsstyrelse, Wikipedia, turism, spöklistor):

### Spöktradition — EJ FUNNEN (trovärdig)

Ingen substantiell **Vita/Gra gumman**-tradition, prästspöke, fantomklockor eller etablerad kyrkogårdslegend knuten till **Rya kyrkoruin** i granskade källor.

### Paranormalt rykte — SVAGT/SAKNAS

Inga dokumenterade spökjakter, EVP-påståenden eller tidningsvittnesmål specifikt för ruinen hittades.

**Slutsats:** Platsen klassas **INTE** som hemsökt på nuvarande underlag.

### HISTORISKT MYSTERIUM

Varför övergavs kyrkan? Vad hände med **kalkmålningar** och inventarier (**auktion 1875–1876**)? Vem begravdes här? Varför bevarades **murarna**?

Framtida verifiering: pastorat, hembygd, folklorearkiv, tidningsarkiv, muntliga intervjuer.

OMRÅDEN (atmosfär): ruinen; koret; ödekyrkogården; sydportalen; Rya–Ingeborrarp-landskapet.`,

  hauntedSwedenAppSummarySv:
    "Rya kyrkoruin — Rya gamla kyrka — står på en höjd väster om Pinnån i nordvästra Skåne, cirka sex kilometer sydväst om Örkelljunga. Den romanska stenkyrkan byggdes troligen kring sekelskiftet 1100/1200-talet med långhus och rakslutet kor; på 1400-talet tillkom valv, kalkmålningar och vapenhus. Herrevadskloster kan ha påverkat bygget; dopfunten (Mörarpsmästaren) finns nu i 1875 års kyrka i Eket. På 1700-talet läckte valven; 1715 tillkom träutbyggnad och torn. 1856 beslutade sockenstämman om ny kyrka — tusen invånare men bara 132 platser. 1875 invigdes nya kyrkan; tak, golv och valvtegel auktionerades bort 1875–1876. Murarna restaurerades 1941 och 1957; idag friluftsgudstjänster, dop och bröllop. Haunted Swedens research hittade ingen trovärdig lokal spöktradition — klassificering: HISTORISKT MYSTERIUM, inte bevisat hemsökt.",
  safetyNoteSv:
    "Aktiv kyrkoruin och ödekyrkogård — sommargudstjänster, dop och bröllop förekommer. Respektera gudstjänst, gravar och fornlämningar; stör inte stenar eller gräv. Ojämn mark. Kontrollera tillträde via pastorat/kommun. Ingen obehörig nattutredning eller störning av kyrkogård.",
  infoBox: [
    {
      label: "Built",
      labelSv: "Byggd",
      value: "c. 1100s/1200s · Romanesque stone",
      valueSv: "ca 1100/1200-tal · romansk sten",
    },
    {
      label: "Abandoned",
      labelSv: "Övergiven",
      value: "1875 · auction stripping 1875–76",
      valueSv: "1875 · auktionsrivning 1875–76",
    },
    {
      label: "Restored",
      labelSv: "Restaurerad",
      value: "1941 · 1957",
      valueSv: "1941 · 1957",
    },
    {
      label: "Font",
      labelSv: "Dopfunt",
      value: "Mörarpsmästaren → new church 1875",
      valueSv: "Mörarpsmästaren → nya kyrkan 1875",
    },
    {
      label: "Classification",
      labelSv: "Klassificering",
      value: "Historic Mystery (no verified haunting)",
      valueSv: "Historiskt mysterium (ej verifierad hemsökelse)",
    },
    {
      label: "Use today",
      labelSv: "Användning",
      value: "Outdoor services · baptisms · weddings",
      valueSv: "Friluftsgudstjänster · dop · bröllop",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 8.5 · Folklore LOW · Premium MED–HIGH",
      valueSv: "Poäng 8.5 · Folklore LÅG · Premium MED–HÖG",
    },
  ],
  faq: [
    {
      question: "Is Rya church ruin haunted?",
      questionSv: "Är Rya kyrkoruin hemsökt?",
      answer:
        "Not on evidence found in this research. Official church, municipal and county sources describe history and present worship — not ghost traditions. Haunted Sweden classifies Rya as a HISTORIC MYSTERY, not a verified haunted site. Future folklore archive work may change that if credible traditions emerge.",
      answerSv:
        "Inte enligt underlag i denna research. Officiella kyrka-, kommun- och länsstyrelsekällor beskriver historia och gudstjänst — inte spöktraditioner. Haunted Sweden klassar Rya som HISTORISKT MYSTERIUM. Framtida folklorearkiv kan ändra bedömningen om trovärdiga traditioner hittas.",
    },
    {
      question: "Why was the medieval church abandoned?",
      questionSv: "Varför övergavs medeltidskyrkan?",
      answer:
        "The 1856 parish meeting decided a new church was needed: about 1,000 inhabitants but only 132 seats, and the building was in poor condition (leaking vaults since at least the early 1700s). The 1875 church at Eket replaced it; roof, floors and vault brick were sold at auction, leaving the stone walls as a ruin preserved from 1941.",
      answerSv:
        "Sockenstämman 1856 beslöt om ny kyrka: cirka 1000 invånare men bara 132 platser, och byggnaden i dåligt skick (läckande valv sedan tidigt 1700-tal). 1875 ersattes den av kyrkan i Eket; tak, golv och valvtegel auktionerades bort så att stenmurarna blev ruin, bevarad från 1941.",
    },
    {
      question: "What happened to the medieval lime paintings?",
      questionSv: "Vad hände med medeltida kalkmålningar?",
      answer:
        "They were part of the 1400s vault interior. When the church was stripped in 1875–1876, vault brick and furnishings were auctioned — the paintings did not survive in the ruin. Haunted Sweden found no separate catalogue of where specific paintings went; parish and museum archive research could clarify.",
      answerSv:
        "De ingick i 1400-talsvalven. Vid rivning/auktion 1875–1876 såldes valvtegel och inventarier — målningarna finns inte kvar i ruinen. Ingen detaljerad lista över vart de tog vägen hittades i denna research; arkivstudie kan klargöra.",
    },
    {
      question: "Can I visit and attend services?",
      questionSv: "Kan jag besöka och gå på gudstjänst?",
      answer:
        "Yes — the ruin is an outdoor heritage and worship site. Summer outdoor services, baptisms and weddings are held (Svenska kyrkan / kommun). Respect active services and the churchyard. A walking path from Ingeborrarp is commonly described (~1 km).",
      answerSv:
        "Ja — ruinen är utomhus kultur- och gudstjänstplats. Sommartid friluftsgudstjänster, dop och bröllop (Svenska kyrkan/kommun). Respektera gudstjänst och kyrkogård. Stig från Ingeborrarp beskrivs ofta (~1 km).",
    },
    {
      question: "Has Haunted Sweden investigated yet?",
      questionSv: "Har Haunted Sweden utrett platsen ännu?",
      answer:
        "Not on site yet. Planned verification: photograph the ruin, search folklore and newspaper archives, contact Örkelljunga pastorat and local historical societies, study churchyard history, and compare any oral tradition with documented parish records.",
      answerSv:
        "Inte på plats ännu. Planerad verifiering: fotografera ruinen, söka folklore- och tidningsarkiv, kontakta Örkelljunga pastorat och hembygdsförening, studera kyrkogårdshistoria, jämföra muntlig tradition med sockenakter.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
