/**
 * Upgrade Eksjöhovgårds Slottsruin (id 65) — expanded historic-mystery entry
 * Run: node scripts/upgrade-eksjohovgard.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");

const data = JSON.parse(fs.readFileSync(file, "utf8"));
const idx = data.places.findIndex((p) => p.slug === "eksjohovgard");
if (idx === -1) {
  console.error("eksjohovgard not found");
  process.exit(1);
}

const place = {
  ...data.places[idx],
  history: `## DOCUMENTED: Medieval origins (from 1287)

First written reference to **Ekesjö / Ekesio** is **1287**, when **Cecilia Elofsdotter**’s testament mentions gifts to household people at Ekesio (Sävsjö kommun / place-name register). The farm later passed to **Nydala monastery** (Cistercian). In the **1300s** Ekesjö is noted as a **tingsplats** (assembly/court site) for **Västra härad**, on strategic trade routes through Småland.

## DOCUMENTED: Sture estate (1420–1616)

In **1420** **Sven Sture** exchanged land to acquire Ekesjö and **settled here** (Wikipedia / museum tradition) — likely building the **first fortification on the lake island**. The estate then passed through the younger Sture line / **Natt och Dag**: Bo Stensson, Nils Bosson (Sture), Svante Nilsson (Sture), Sten Sture the Younger, Svante Sture the Younger. By the late Middle Ages the island was the centre of one of Småland’s largest complexes — **43 farms in 13 parishes** (Jönköpings läns museum). Medieval building stock was probably mostly **timber**; an **early-1500s stone house** incorporates parts of an earlier **defence tower** (Wikipedia).

The Sture line’s hold ends **1616** as the family’s centre of gravity shifted toward Stockholm. **Tradition (not proven residence for later Stures):** Sten Sture the Younger used a building here as a **hunting lodge (jaktslott)**.

## DOCUMENTED: Lewenhaupt and the unfinished castle (1650s–1700)

Around **1630** Field Marshal **Carl Mauritz (Karl Mauritz) Lewenhaupt** — Thirty Years’ War commander, later **riksråd** — inherited the estate. In the **1650s** he began the square **three-storey stone house** with **rooftop terrace** that forms today’s ruin.

**Jönköpings läns museum** (key source) describes the project as a **Great Power–era noble building programme** that **“strandade på grund av verklighetens knappa resurser”**:

- **Second floor intended solely for festivities** (festvåning).
- **Design models from Stockholm**; ambition for a **symmetrical** building with wings.
- Lewenhaupt died **1666** before completion; heirs could not finish.
- **1680s Reduction:** Lewenhaupt heirs lost much of the estate; remainder **sold 1700**.
- By then the **steep roof with terrace was barely in place** — **no interiors, no windows, no façade decoration**; façades **not even symmetrical** (museum text).
- **Erik Dahlbergh**, *Suecia antiqua et hodierna* (~**1680**), depicts the stalled project — a visual record of aristocratic ambition frozen mid-build.

As a **century-scale building project**, Eksjöhovgård was a **failure**; as a **romantic ruin** it became a **strong symbol for Sävsjö** (museum) and appears on the **municipal coat of arms** despite the modern town’s later railway origin.

## DOCUMENTED: De la Gardie, abandonment, conservation

Empty until the **1730s**, **Magnus Julius De la Gardie** **removed the top storey**, altered room layout, moved the kitchen from a wing and finished some rooms — **unclear if ever inhabited** before his death **1741**. After **1812**, when the **copper roof was sold/removed**, decay accelerated rapidly.

**1930s conservation:** ruin in very poor condition; **entire south façade collapsed**. Recurrent care since, **latest major attention 2009**. **2014:** Sävsjö kommun marked **350 years** since Lewenhaupt’s stone construction began (Wikipedia / local summaries).

**Access (museum):** island in **Eksjöhovgårdssjön**, ~**1 km east of Sävsjö** on **road 127** toward Vetlanda, via **footbridge**. **RAÄ Vallsjö 31:1**. Separate nearby manor/inn context (1805 copper-works) is not the ruin itself.

## DOCUMENTED dark / political context (no invented tragedies)

Documented “dark” layers are **political and economic**: Sture extinction (**1616**), **Reduction** dispossession, **unfinished magnificence**, **roof stripping (1812)**. No reliable sources in museum, municipal or Wikipedia accounts document estate-specific **murders, fires, treasure deaths or hauntings** as historical fact. Do not invent noble ghosts from the Sture or Lewenhaupt names alone.`,

  legend: `## FOLKLORE & PARANORMAL RESEARCH RESULT — HISTORIC MYSTERY

Haunted Sweden searched **Jönköpings läns museum**, **Sävsjö kommun**, **Wikipedia**, **murberg.se** local photo/history pages, regional tourism, *Sällsamheter i Småland* references, and online ghost lists — **without finding a substantial, source-backed ghost tradition** tied to Eksjöhovgårds slottsruin.

### What was NOT verified

- **White Lady / Grey Lady** specifically named to this ruin — **not** in museum or municipal texts.
- **Hidden treasure** legends — **not** located in primary sources for this island.
- **Lake lights / mysterious lights on Eksjöhovgårdssjön** — **no** documented local cycle found.
- **Noble residents returning as apparitions** — **no** named oral tradition with archive citation.
- **Paranormal investigations / EVP / ghost-hunt reports** — **none** credibly tied to this site in this research pass.

**Note on web rumours:** Some secondary web summaries mention a **Vita frun** near **Korsdammen** in the Sävsjö area. Haunted Sweden **did not** locate that story in Jönköpings läns museum, Sävsjö kommun or Wikipedia primary texts — treat as **unverified secondary claim** until folklore-archive or newspaper proof emerges. Do **not** import generic “Swedish castle = white lady” templates.

### Thin tradition only (label clearly)

- **Sten Sture the Younger hunting-lodge tradition** — widespread local/popular tradition; **not** the same as verified residence for later Sture lords (Wikipedia: later Stures “tycks inte ha varit bosatta här”).
- *Sällsamheter i Småland*, del 3 — cited by Wikipedia for background; Haunted Sweden found **no extractable ghost cycle** for this ruin online.

### Paranormal reputation — WEAK

The site’s power is **unfinished Great Power architecture + island isolation + lake fog** — exceptional **atmosphere**, not a proven **haunted reputation**. No peer-reviewed or newspaper-documented hauntings specific to the ruin were found.

### Classification

**HISTORIC MYSTERY** — flagship narrative: **The Unfinished Castle** (Lewenhaupt’s stalled three-storey stone palace vs Reduction reality).

## Special areas (atmosphere — not verified paranormal hotspots)

1. **Castle ruin** — Lewenhaupt stone shell, missing floors and finishes.
2. **Island** — isolation in Eksjöhovgårdssjön.
3. **Interior voids** — stalled aristocratic rooms without windows/decoration.
4. **Lakeshore** — fog, reflections, blue hour.
5. **Footbridge** — approach sequence to the island.

## Investigation ideas (historical first)

*The Unfinished Castle* · *The Sture Legacy* · *History vs Folklore* · blue-hour / autumn photography where legally permitted · folklore-archive and newspaper search · Sävsjö historian interviews.

**Paranormal / EVP framing:** only if future verification finds credible local tradition — **not** the default today.

## Best conditions

Autumn, fog, blue hour, rain, winter evenings — respect heritage; no climbing unstable masonry.`,

  historySv: `## DOKUMENTERAT: Medeltid från 1287

Första skriftliga belägget **1287** (Cecilia Elofsdotters testamente, Ekesio). Senare **Nydala kloster**; **tingsplats** i Västra härad under **1300-talet**.

## DOKUMENTERAT: Sture 1420–1616

**1420** bytte **Sven Sture** till sig Ekesjö och **bosatte sig** — troligen första borgen på ön. Yngre Sture / Natt och Dag; vid medeltidens slut **43 gårdar i 13 socknar** (Jönköpings läns museum). **Tidigt 1500-tal:** stenhus med delar av **försvarstorn**. Stureätten ut **1616**. Jaktslotts-tradition kring **Sten Sture d.y.** — tradition, inte bevisad bostad för senare Sturar.

## DOKUMENTERAT: Lewenhaupts ofullbordade slott

**Carl Mauritz Lewenhaupt** (fältmarskalk, riksråd) började på **1650-talet** ett **tresidigt** stenhus — **andra våningen enbart för festligheter**, Stockholmförlagor, planerad symmetri. Död **1666**; **reduktionen** 1680-talet; försäljning **1700**. Tak med altan knappt på plats — **ingen inredning, inga fönster, ingen fasaddekor**, asymmetriska fasader (museum). **Erik Dahlbergh** ~**1680** visar det oavslutade projektet. Som **hundraårigt byggprojekt** misslyckande; som **romantisk ruin** Sävsjös symbol (kommunvapen).

## DOKUMENTERAT: De la Gardie, förfall, konservering

**Magnus Julius De la Gardie** **1730-tal** (övre våning riven; oklart bebott före **1741**). **Koppartak bort 1812** → snabb ruin. **1930-tal:** södra fasaden rasad; vård **2009**; jubileum **2014** (350 år). **Gångbro**; väg **127**; RAÄ Vallsjö 31:1.`,

  legendSv: `## FOLKLORERESULTAT — HISTORISKT MYSTERIUM

Research i **Jönköpings läns museum**, **Sävsjö kommun**, Wikipedia och spöklistor: **ingen substantiell, källbackad spöktradition** för ruinen.

**Ej verifierat:** Vita/Gra damen specifikt här; skatt; sjöljud/ljus; paranormala utredningar. Rykten om **Vita frun** vid **Korsdammen** i sekundära webbkällor — **ingen primärkälla** i museum/kommun/Wikipedia; märk som **overifierat** tills arkivstöd finns.

**Tunn tradition:** jaktslott Sten Sture d.y.; *Sällsamheter i Småland* utan utdragbar spökcykel online.

**Paranormalt rykte — SVAGT.** Klassificering: **HISTORISKT MYSTERIUM** — *Det ofullbordade slottet*.

OMRÅDEN (atmosfär): ruinen; ön; tomma innerrum; sjökant; gångbro.`,

  whyItFitsHauntedSweden:
    "700+ years of documented history, Sture–Lewenhaupt–De la Gardie lineages, a flagship unfinished Great Power castle on an island, and one of Småland’s strongest ruin atmospheres. Visual 9.5/10, historical 10/10, architectural 9.5/10, atmosphere 10/10 — folklore strength LOW and paranormal reputation WEAK after targeted search (including unverified Korsdammen/Vita frun web claims). Haunted Sweden Score 8.4 (under 9.0). Premium HIGH for history photography and unfinished-castle documentary; NOT marketed as one of Sweden’s most haunted locations.",

  hauntedSwedenAppSummary:
    "Eksjöhovgårds slottsruin stands on a small island in Eksjöhovgårdssjön east of Sävsjö — reached by footbridge along road 127. Written sources name Ekesjö from 1287; Nydala monastery; from 1420 the younger Sture / Natt och Dag line made it one of Småland’s greatest estates (43 farms in 13 parishes). Field Marshal Carl Mauritz Lewenhaupt began a three-storey stone palace in the 1650s — second floor for festivities, Stockholm-inspired symmetry — but died in 1666; the 1680s Reduction and 1700 sale left a roof barely on and no interiors, windows or façade décor. Jönköpings läns museum calls it a century-long building failure that became a romantic symbol of Sävsjö. De la Gardie altered it in the 1730s; the copper roof came off in 1812; conservation from the 1930s (again 2009). Haunted Sweden classifies it as HISTORIC MYSTERY: no substantial verified ghost folklore or paranormal reports were found — honesty over invented hauntings.",

  hauntedSwedenAppSummarySv:
    "Eksjöhovgårds slottsruin står på en ö i Eksjöhovgårdssjön öster om Sävsjö — nås via gångbro vid väg 127. Skrift från 1287; Nydala; från 1420 Stureätten och 43 gårdar i 13 socknar. Fältmarskalk Carl Mauritz Lewenhaupt började på 1650-talet ett tresidigt stenhus (festvåning, Stockholmförlagor) men dog 1666; reduktionen och försäljningen 1700 lämnade taket knappt utan inredning. Jönköpings läns museum: hundraårigt misslyckande som blev romantisk ruin och Sävsjös symbol. De la Gardie 1730-tal; koppartak bort 1812; konservering från 1930-talet (2009). Haunted Sweden: HISTORISKT MYSTERIUM — ingen substantiell verifierad spöktradition hittades.",

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
      value: "1420–1616 · up to 43 farms / 13 parishes",
      valueSv: "1420–1616 · upp till 43 gårdar / 13 socknar",
    },
    {
      label: "Unfinished castle",
      labelSv: "Ofullbordat slott",
      value: "1650s · Lewenhaupt · party floor · stalled 1666",
      valueSv: "1650-tal · Lewenhaupt · festvåning · stannade 1666",
    },
    {
      label: "Roof removed",
      labelSv: "Tak bort",
      value: "1812 · rapid ruin",
      valueSv: "1812 · snabb ruin",
    },
    {
      label: "Conservation",
      labelSv: "Konservering",
      value: "1930s (S façade lost) · care 2009",
      valueSv: "1930-tal (S-fasad rasad) · vård 2009",
    },
    {
      label: "Classification",
      labelSv: "Klassificering",
      value: "Historic Mystery · folklore LOW",
      valueSv: "Historiskt mysterium · folklore LÅG",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Score 8.4 · Premium HIGH",
      valueSv: "Poäng 8.4 · Premium HÖG",
    },
  ],
};

data.places[idx] = place;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Upgraded", place.slug, "id", place.id);
