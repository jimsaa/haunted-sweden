/**
 * Add Löfstad Slott (id 60)
 * Run: node scripts/add-lofstad-slott.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "haunted-places.json");
const coverPath = path.join(root, "public", "places", "lofstad-slott-cover.jpg");
const coverUrl =
  "https://upload.wikimedia.org/wikipedia/commons/4/4e/L%C3%B6fstads_slott%2C_den_10_december_2008%2C_bild_16.JPG";

fs.mkdirSync(path.dirname(coverPath), { recursive: true });
if (!fs.existsSync(coverPath) || fs.statSync(coverPath).size < 1000) {
  execFileSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", coverPath, coverUrl], {
    stdio: "inherit",
  });
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.places.some((p) => p.slug === "lofstad-slott")) {
  console.error("already exists");
  process.exit(1);
}

const place = {
  id: "60",
  slug: "lofstad-slott",
  name: "Löfstad Slott",
  englishName: "Löfstad Castle (Lövstad)",
  coverImage: "/places/lofstad-slott-cover.jpg",
  category: "Castle / Castle Ruin",
  city: "Norrköping",
  region: "Östergötland",
  country: "Sweden",
  address: "Lövstad Slott, 605 97 Norrköping, Sweden",
  latitude: 58.553,
  longitude: 16.207,
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
  hauntedSwedenScore: 9.6,
  hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  suggestedHauntedSwedenTags: [
    "lofstad_slott",
    "norrkoping",
    "axel_lillie",
    "emilie_piper",
    "von_fersen",
    "grey_lady",
    "haunted_castle",
    "english_park",
    "ostergotland",
    "haunted_sweden",
  ],
  hauntedSwedenAppSummary:
    "Löfstad Slott (also Lövstad) between Norrköping and Linköping is one of Sweden's best-preserved historic castle homes. Field Marshal Axel Lillie began the present building in 1637; the family moved in around 1660. After a devastating fire in 1750 that began in the north wing, the main house and north range were rebuilt into today's exterior while the south wing was largely saved. Later owners from the De la Gardie, von Fersen and Piper lines furnished the house; Sophie Piper created the English landscape park around 1800 and raised a marble memorial (1813) to her brother Axel von Fersen the Younger, murdered in Stockholm in 1810. Last private owner Emilie Piper died in 1926 having left interiors virtually untouched; her will transferred buildings/grounds to Riddarhuset and collections to Östergötlands museum (museum opened 1942). Folklore of the Grey Lady (often identified with Sophie Piper mourning her brother), room 13, and staff/visitor experiences is told on official evening ghost tours — as legend and storytelling, not proven hauntings. Haunted Sweden keeps lofstad.se / museum chronology separate from guide lore.",
  whyItFitsHauntedSweden:
    "Flagship Östergötland castle museum: nearly 400 years of documented noble history, freeze-frame 1926 interiors, English park and Fersen memorial, official Spökvisning, Grey Lady tradition. Visual 10/10, historical 10/10, architectural 10/10, folklore 9.5/10, paranormal reputation 9.0/10 — Haunted Sweden Score 9.6. Premium content EXTREMELY HIGH; research confidence VERY HIGH. Verification mission: guided tour, park/memorial photography, guide interviews, history-vs-folklore documentary.",
  shortDescription:
    "Best-preserved Östergötland castle home (1637–c.1660) — rebuilt after the 1750 fire, freeze-framed by Emilie Piper in 1926, with Grey Lady folklore and official ghost tours.",
  history: `## DOCUMENTED: Axel Lillie and the 1600s castle

Löfstad Slott stands in Norrköping Municipality, Östergötland (postal address Lövstad Slott). The estate name is known from the 1400s; Field Marshal Axel Lillie greatly expanded the holdings and began the present castle in 1637. Plans changed during construction (lengthened main range, wing towers); the builder could move in around 1660. The main house rose three storeys with lower wings and decorative façade painting (fragments later revealed on the south wing). Later 1600s work under Axel Lillie the Younger / Mathias Spihler enriched interiors and added a courtyard stair tower with cupola.

## DOCUMENTED: Fire of 1750 and rebuild

In January 1750 fire started in the north wing (kitchen and servants' rooms); official castle history cites the servant Cajsa possibly dropping embers in a weaving room. Flames spread via a newly tarred shingle roof into the main building; the south wing was largely saved along with a few objects from the principal floor. Rebuild began the same year and gave Löfstad its present exterior (flatter broken roof, plaster rustication) while retaining 1600s sandstone frieze, sculpted portals and stair tower fabric. Ownership at the fire passed through Hedvig Catharina De la Gardie, who married Axel von Fersen the Elder (1752); the couple renovated interiors simply before daughter Sophie von Fersen (Piper) fully furnished the house as a year-round residence.

## DOCUMENTED: Sophie Piper, English park and Axel von Fersen memorial

Around 1800 Countess Sophie Piper laid out the English landscape park below the castle. In 1813 she raised a marble memorial on an islet in the pond to her brother, Marshal of the Realm Axel von Fersen the Younger (1755–1810), murdered by a Stockholm mob on 20 June 1810 after the funeral of Crown Prince Charles August — a documented national tragedy commemorated here, not a castle battlefield death.

## DOCUMENTED: Emilie Piper and the museum freeze-frame

Emilie Hedvig Sophie Piper (1857–1926), eighth generation from builder Lillie, became sole owner after buying out her sister. Her will (Stockholm, 4 May 1923) donated buildings, park and lands to Riddarhuset and inventories to Östergötlands fornminnes- och museiförening (today Östergötlands museum) so the house could be shown as an aristocratic home. Emilie died 13 December 1926; time effectively stopped in the rooms. After her sister Sophie Nordenfalk died in 1940 the will took effect; the museum opened to the public in 1942. Collections include ~5,000 library volumes and extensive portraits — presented as she left them (art, furniture, textiles, clothes, china).

## DOCUMENTED dark / emotional history (no invented events)

1750 fire (servants' wing origin); Axel von Fersen the Younger's 1810 murder in Stockholm and the park memorial; motherless Piper sisters after 1873; childless last generation ending private ownership. Do not invent undocumented duel deaths as historical fact — room-13 bloodstain duel tales belong in folklore sections below.`,

  legend: `## FOLKLORE: The Grey Lady (Grå damen) — not verified history

Guide lore and local tradition speak of a Grey Lady walking the park and corridors, often identified with Sophie Piper mourning her brother Axel von Fersen. Popular tellings say she appears in connection with approaching death among those close to the estate (e.g. a 1937 servant warning motif in secondary folklore sites). Official evening Spökvisning (Östergötlands museum / lofstad.se) begins in the cellars and ends in “(ghost) room 13,” lantern-lit in a darkened house — recommended in darker months. Haunted Sweden records this as museum storytelling and folklore, not proven paranormal science.

## FOLKLORE motifs (guide / tour narrative)

Grey Lady in park and salons; Axel Lillie stomping with a wooden leg; “Lillie-kärringen”; keys of the castle mistress checking maids after the fire; room 13 bloodstain / duel death tale told on night walks; myling and White Lady type motifs occasionally referenced in tour framing. Academic note: ethnology work on Löfstad “guidelore” describes how guides transmit expected supernatural stories alongside historical fact.

## MODERN WITNESS-STYLE REPORTS (anecdotal)

Museum staff interviewed in media (e.g. Sveriges Radio P4) and night-tour write-ups describe odd sounds, personal unease, and colleagues' strange experiences after years on site — experience narratives, not controlled investigations. Visitor reports on tours include cold spots, footsteps, doors, shadow impressions. Special areas: (1) Historic state rooms — preserved 1926 atmosphere; (2) Grand staircase / stair tower — frequent in stories; (3) English park — Grey Lady; (4) Axel von Fersen memorial islet — historical grief symbolism; (5) Cellars — tour start, heavy historic feel.

## Atmosphere, investigation ideas, best conditions

Baroque silhouette, freeze-frame interiors, English park, ancient trees, stone bridges and autumn fog make Löfstad one of Sweden's most atmospheric castle museums. Investigation ideas: Grey Lady folklore mapping; Emilie Piper legacy; Fersen memorial photography; history vs folklore; evening park photography; attend Spökvisning with permission. Best conditions: autumn evenings, heavy fog, winter darkness, rain after sunset, blue hour. Respect museum rules — no overnight stays.`,

  safetyNote:
    "Active museum operated with Östergötlands museum — respect opening hours, tickets, guided-tour rules and no-touch interiors. Park paths can be uneven and wet. Official ghost tours are dark and intense; not for the easily frightened. No overnight accommodation in the castle.",

  sourceLinks: [
    "https://lofstad.se/om-slottet/slottets-historia",
    "https://lofstad.se/om-slottet/aegarlaengd/emilie-piper/",
    "https://lofstad.se/guidade-visningar/gruppvisningar/spoekvisning/",
    "https://ostergotlandsmuseum.se/besoek/loefstad-slott/",
    "https://sv.wikipedia.org/wiki/L%C3%B6fstad_slott",
    "https://www.norrkopingshistoria.se/lofstad-slott/",
    "https://www.sverigesradio.se/artikel/6487343",
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
    "https://www.google.com/maps/search/?api=1&query=L%C3%B6vstad+Slott,+605+97+Norrk%C3%B6ping,+Sweden",
  googleRating: null,
  googleReviewsEnabled: false,
  images: [
    {
      url: "/places/lofstad-slott-cover.jpg",
      caption: "Löfstad Slott, Östergötland",
      captionSv: "Löfstad slott, Östergötland",
      credit: "Wikimedia Commons",
      status: "approved",
    },
  ],
  videos: [],
  status: "approved",
  shortDescriptionSv:
    "Ett av Östergötlands bäst bevarade slottshem (1637–ca 1660) — återuppbyggt efter branden 1750, fryst av Emilie Piper 1926, med Grå damen-folklore och officiella spökvisningar.",
  historySv: `## DOKUMENTERAT: Axel Lillie och 1600-talsslottet

Löfstad slott ligger i Norrköpings kommun, Östergötland (Lövstad Slott). Godset är känt från 1400-talet; fältmarskalk Axel Lillie utökade ägorna och påbörjade nuvarande slott 1637. Omkring 1660 kunde byggherren flytta in. Senare 1600-talsarbete under Axel Lillie d.y. / Mathias Spihler berikade interiörer och trapptorn.

## DOKUMENTERAT: Branden 1750 och återuppbyggnad

I januari 1750 började brand i norra flygeln (kök/pigkammare); enligt slotts historia kan pigan Cajsa ha tappat glöd. Elden spred sig via nytjärat spåntak till huvudbyggnaden; södra flygeln räddades till stor del. Återbyggnad samma år gav dagens exteriör medan 1600-talsportalerna, sandstensfrisen och trapptornet behölls. Hedvig Catharina De la Gardie / Axel von Fersen d.ä. renoverade; dottern Sophie Piper möblerade och gjorde slottet till åretruntbostad.

## DOKUMENTERAT: Engelska parken och Fersen-monumentet

Omkring 1800 anlade grevinnan Sophie Piper den engelska parken. 1813 reste hon ett marmormonument på en holme över brodern riksmarskalken Axel von Fersen d.y., mördad i Stockholm 20 juni 1810 — dokumenterad nationell tragedi, inte en dödsfall på själva slottsgården.

## DOKUMENTERAT: Emilie Piper och museifrysta rum

Emilie Piper (1857–1926) blev ensam ägare och testamenterade 1923 byggnader/park/ägor till Riddarhuset och inventarier till Östergötlands museum. Hon dog 13 december 1926; tiden stannade i rummen. Efter systerns död 1940 trädde testamentet i kraft; museet öppnade 1942.

## DOKUMENTERAD mörk/emotionell historia (inga påhittade dueller)

1750 års brand; Fersens mord 1810 och minnesvården; barnlös sista generation. Rum 13-duell/blodfläck hör till folkloreavsnittet.`,

  legendSv: `## FOLKLORE: Grå damen — inte verifierad historia

Guide- och lokaltradition talar om Grå damen i park och korridorer, ofta identifierad med Sophie Piper som sörjer brodern Axel von Fersen. Officiell Spökvisning (kväll, nedsläckt, källare → rum 13) presenterar dessa berättelser som storytelling.

## FOLKLOREMOTIV

Grå damen; Axel Lillie med träben; Lillie-kärringen; husfruns nycklar efter branden; rum 13 blodfläck/duell (turberättelse).

## MODERNA UPPLEVELSERAPPORTER (anekdotiska)

Personal i media och på nattvisningar beskriver udda ljud och obehag — erfarenhetsberättelser. OMRÅDEN: paradvåning; trapphus; engelska parken; Fersen-monumentet; källare. Respektera museiregler; ingen övernattning.`,

  hauntedSwedenAppSummarySv:
    "Löfstad slott mellan Norrköping och Linköping är ett av Sveriges bäst bevarade slottshem. Axel Lillie började bygget 1637 (inflyttning ca 1660). Efter branden 1750 återuppbyggdes huset till dagens yttre; Sophie Piper skapade engelska parken ca 1800 och reste 1813 minnesvården över brodern Axel von Fersen d.y. Emilie Piper dog 1926 och lämnade interiören orörd — museum från 1942 (Östergötlands museum / Riddarhuset). Grå damen och spökvisningar hålls isär från dokumenterad historia.",
  safetyNoteSv:
    "Aktivt museum (Östergötlands museum) — respektera öppettider, biljetter, guidningsregler och rör inte inventarier. Parkstigar kan vara hala. Spökvisningar är mörka och intensiva. Ingen övernattning i slottet.",
  infoBox: [
    {
      label: "Built",
      labelSv: "Byggt",
      value: "1637 – c. 1660 (Axel Lillie)",
      valueSv: "1637 – ca 1660 (Axel Lillie)",
    },
    {
      label: "Fire & rebuild",
      labelSv: "Brand & återbyggnad",
      value: "1750",
      valueSv: "1750",
    },
    {
      label: "English park",
      labelSv: "Engelska parken",
      value: "c. 1800 · Sophie Piper",
      valueSv: "ca 1800 · Sophie Piper",
    },
    {
      label: "Last private owner",
      labelSv: "Sista privata ägaren",
      value: "Emilie Piper (d. 1926)",
      valueSv: "Emilie Piper (död 1926)",
    },
    {
      label: "Museum since",
      labelSv: "Museum sedan",
      value: "1942 · Östergötlands museum",
      valueSv: "1942 · Östergötlands museum",
    },
    {
      label: "Ghost tour",
      labelSv: "Spökvisning",
      value: "Official evening Spökvisning (bookable)",
      valueSv: "Officiell kvälls-Spökvisning (bokningsbar)",
    },
    {
      label: "Haunted Sweden",
      labelSv: "Haunted Sweden",
      value: "Investigation planned · Score 9.6",
      valueSv: "Utredning planerad · Poäng 9.6",
    },
  ],
  faq: [
    {
      question: "Why is Löfstad so well preserved inside?",
      questionSv: "Varför är Löfstad så välbevarat invändigt?",
      answer:
        "Last private owner Emilie Piper left the rooms essentially as they were when she died in 1926. Her will placed collections with Östergötlands museum and buildings with Riddarhuset; the museum opened in 1942 as a time capsule of an aristocratic home.",
      answerSv:
        "Sista privata ägaren Emilie Piper lämnade rummen i princip som de stod när hon dog 1926. Testamentet gav inventarier till Östergötlands museum och byggnader till Riddarhuset; museet öppnade 1942 som en tidskapsel av ett högreståndshem.",
    },
    {
      question: "Who is the Grey Lady of Löfstad?",
      questionSv: "Vem är Grå damen på Löfstad?",
      answer:
        "She is a folklore figure, often identified in guide stories with Sophie Piper mourning her brother Axel von Fersen. Appearances are traditionally linked to warnings of death. Treat as legend told on tours — not documented historical fact.",
      answerSv:
        "Hon är en folkloregestalt, i guideberättelser ofta identifierad med Sophie Piper som sörjer brodern Axel von Fersen. Visningar kopplas traditionellt till dödsvarsel. Behandla som legend på turer — inte dokumenterad historisk fakta.",
    },
    {
      question: "Can I take an official ghost tour?",
      questionSv: "Kan jag gå en officiell spökvisning?",
      answer:
        "Yes — Löfstad offers bookable evening Spökvisning (lantern-lit, darkened house, cellar to room 13), best in darker months. Contact the museum via lofstad.se for dates and group booking.",
      answerSv:
        "Ja — Löfstad erbjuder bokningsbar kvälls-Spökvisning (lykta, nedsläckt hus, källare till rum 13), bäst under mörkare månader. Kontakta museet via lofstad.se för datum och gruppbokning.",
    },
    {
      question: "What happened to Axel von Fersen?",
      questionSv: "Vad hände med Axel von Fersen?",
      answer:
        "Axel von Fersen the Younger was murdered by a mob in Stockholm on 20 June 1810. His sister Sophie Piper raised a marble memorial to him in Löfstad's English park in 1813 — documented history commemorated on the estate.",
      answerSv:
        "Axel von Fersen d.y. mördades av en folkmassa i Stockholm den 20 juni 1810. Systern Sophie Piper reste ett marmormonument över honom i Löfstads engelska park 1813 — dokumenterad historia som minns på godset.",
    },
    {
      question: "Has Haunted Sweden investigated Löfstad yet?",
      questionSv: "Har Haunted Sweden utrett Löfstad ännu?",
      answer:
        "Not yet. Status is investigation planned — guided tour, park and memorial photography, guide interviews, and a history-vs-folklore documentary brief.",
      answerSv:
        "Inte ännu. Status är utredning planerad — guidad tur, park- och monumentsfoto, guideintervjuer och dokumentärbrief historia kontra folklore.",
    },
  ],
};

data.places.push(place);
data.version = data.places.length;
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Added", place.slug, "cover", fs.statSync(coverPath).size, "version", data.version);
