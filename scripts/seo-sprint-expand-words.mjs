/**
 * Extra content expansion for SEO word-count targets.
 * Run after seo-sprint-priority-places.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "..", "data", "haunted-places.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

function words(s) {
  return (s || "").trim().split(/\s+/).filter(Boolean).length;
}

const extra = {
  "hemsokt-museum": {
    historyAdd: `

## Practical visit notes for dark tourism planners

Tickets, age limits and night-event calendars change seasonally. Before you travel, confirm whether you are booking a standard museum walkthrough, a themed evening, or a full investigation slot with equipment briefings. Arrive with time to read object cards — the strongest experiences often come from slower rooms rather than the loudest scare beats. Photography rules vary by room; always ask staff before flash or video in sensitive spaces.

## How Hemsökt Museum fits a West Sweden haunted itinerary

Start in Borås for the museum, then drive toward Torpa Stenhus for medieval stone atmosphere, or toward Gräfsnäs for lakeside ruin folklore. Hôtel Eggers and Överås Slott extend the loop toward Gothenburg if you have a second day. Haunted Sweden's map filters by access type so you can mix ticketed attractions with outdoor legend sites without wasted driving.

## Editorial stance

We celebrate LaxTon's role in popularising Swedish ghost hunting while refusing to overclaim. A museum of allegedly haunted objects is culturally important whether or not any single item is proven. The public value is curated storytelling, controlled access, and a place where curiosity meets caution.`,
    historySvAdd: `

## Praktiska besöksnoter för dark tourism-planerare

Biljetter, åldersgränser och nattkalendrar ändras säsongsvis. Bekräfta innan resan om du bokar vanlig museivisning, temakväll eller utredningsslot med utrustningsgenomgång. Kom med tid att läsa föremålskorten — de starkaste upplevelserna kommer ofta i lugnare rum snarare än i de mest högljudda skräckmomenten. Fotoregler varierar; fråga alltid personal innan blixt eller video i känsliga utrymmen.

## Hur Hemsökt Museum passar en hemsökt Västsverige-resa

Börja i Borås med museet, kör sedan mot Torpa Stenhus för medeltida stenatmosfär, eller mot Gräfsnäs för sjönära ruinsagor. Hôtel Eggers och Överås Slott förlänger slingan mot Göteborg om du har en andra dag. Haunted Swedens karta filtrerar på tillgångstyp så du kan blanda biljetterade attraktioner med utomhuslegendplatser utan onödig körning.

## Redaktionell hållning

Vi lyfter LaxTons roll i att popularisera svensk spökjakt utan att överdriva. Ett museum med påstått hemsökta föremål är kulturellt viktigt oavsett om något enskilt objekt är bevisat. Det publika värdet är curerad storytelling, kontrollerad tillgång och en plats där nyfikenhet möter försiktighet.`,
    legendAdd: `

## Community reports and what we still need

Haunted Sweden invites lawful visitor reports: which rooms felt heaviest, whether symptoms appeared, and whether staff offered context. We do not publish break-in stories or encourage trespass at other sites after a museum visit. Over time, structured reports help separate recurring patterns from one-off adrenaline responses.

## Investigation checklist for a future team visit

When Haunted Sweden investigates on site we plan to document access rules, photograph non-sensitive public areas with permission, note acoustic quirks that can explain voices, and interview staff about the difference between theatrical scare design and unsolicited visitor claims. Until then, this page remains an editorial landing page grounded in published museum facts plus folklore.`,
    legendSvAdd: `

## Community-rapporter och vad vi fortfarande behöver

Haunted Sweden välkomnar lagliga besöksrapporter: vilka rum kändes tyngst, om symptom uppstod, och om personal gav kontext. Vi publicerar inte inbrottsberättelser och uppmuntrar inte intrång på andra platser efter ett museibesök. Med tiden hjälper strukturerade rapporter att skilja återkommande mönster från tillfälliga adrenalinreaktioner.

## Utredningschecklista för framtida teamvisit

När Haunted Sweden utreder på plats planerar vi att dokumentera tillträdesregler, fotografera icke-känsliga publika ytor med tillstånd, notera akustiska egenheter som kan förklara röster, och intervjua personal om skillnaden mellan teaterisk skräckdesign och spontana besökarpåståenden. Tills dess är denna sida en redaktionell landningssida förankrad i publicerade museumfakta plus folklore.`,
  },
  "malilla-sanatorium": {
    historyAdd: `

## Architecture of care and control

Sanatorium design in early twentieth-century Sweden favoured light, air and separation. Long wings, verandas and regimented corridors were medical tools as much as buildings. Walking those corridors today — on a lawful tour — is a lesson in how society once managed contagious fear. That educational layer is why Haunted Sweden refuses to treat Målilla as a disposable creepy abandoned hospital meme.

## Media amplification without myth inflation

Spökjakt made Målilla nationally searchable overnight. Search Console impressions follow that fame. Our job is to convert curiosity into informed visits: book the right tour, know the medical backstory, and leave folklore labelled as folklore. We link the official Spökjakt playlist for viewers who want the television context without confusing it for a Haunted Sweden team report.

## Regional context in Småland

Småland's haunted map mixes manors, castles and tragedy sites across large distances. Målilla rewards travellers who accept a dedicated drive rather than a casual detour. Pairing it with Berga Herrgård or a Kalmar day requires realistic timing. Use our nearby and related sections to build an honest itinerary instead of stacking too many stops.`,
    historySvAdd: `

## Vårdens och kontrollens arkitektur

Sanatoriedesign i tidigt 1900-talets Sverige gynnade ljus, luft och separation. Långa flyglar, verandor och regisserade korridorer var medicinska verktyg lika mycket som byggnader. Att gå de korridorerna i dag — på en laglig tur — är en lektion i hur samhället en gång hanterade smittsam rädsla. Det utbildande lagret är varför Haunted Sweden vägrar behandla Målilla som ett slit-och-släng-meme om övergivna sjukhus.

## Medieförstärkning utan mytinflation

Spökjakt gjorde Målilla nationellt sökbart över en natt. Search Console-exponering följer det ryktet. Vår uppgift är att omvandla nyfikenhet till informerade besök: boka rätt tur, känna den medicinska bakgrunden och låta folklore vara märkt som folklore. Vi länkar den officiella Spökjakt-spellistan för den som vill ha TV-kontext utan att blanda ihop den med en Haunted Sweden-teamrapport.

## Regional kontext i Småland

Smålands hemsökta karta blandar herrgårdar, slott och tragediplatser över stora avstånd. Målilla belönar resenärer som accepterar en dedikerad bilresa snarare än en tillfällig avstickare. Att para med Berga Herrgård eller en Kalmar-dag kräver realistisk timing. Använd våra närliggande- och relaterat-sektioner för en ärlig itinerary i stället för för många stopp.`,
    legendAdd: `

## Common claim patterns

Online forums recycle the same motifs: footsteps in empty wards, voices near former patient rooms, oppressive air in stairwells. Pattern repetition can mean shared cultural script as easily as shared anomaly. Haunted Sweden logs motifs without crowning a single true ghost narrative.

## Safety and ethics first

Asbestos-era buildings, unstable floors and private security are real risks at many abandoned medical sites worldwide. Even when Målilla offers heritage tours, assume restrictions exist for structural and legal reasons. Never force entry. Never disturb memorial or medical artefacts. Never film patients' descendants' trauma for clicks.

## Future Haunted Sweden investigation goals

Document lawful access routes, capture exterior photography with permission, collect staff-approved historical timelines, and compare TV editing choices with on-the-ground acoustics and lighting. Until that visit happens, this landing page remains the best public brief we can offer searchers landing from Google.`,
    legendSvAdd: `

## Vanliga påståendemönster

Forum online återanvänder samma motiv: fotsteg i tomma salar, röster nära tidigare patientrum, tryckande luft i trapphus. Upprepning kan betyda delad kulturell manusmall lika gärna som delad anomali. Haunted Sweden loggar motiv utan att kröna en enda sann spökberättelse.

## Säkerhet och etik först

Byggnader från asbesttid, ostabila golv och privat bevakning är verkliga risker på många övergivna medicinska platser. Även när Målilla erbjuder kulturarvsturer, utgå från att restriktioner finns av strukturella och juridiska skäl. Tvinga aldrig intrång. Stör aldrig minnes- eller medicinska föremål. Filma aldrig ättlingars trauma för klick.

## Framtida mål för Haunted Sweden-utredning

Dokumentera lagliga tillträdesvägar, ta exteriörfoto med tillstånd, samla personalgodkända historiska tidslinjer och jämför TV-klippval med akustik och ljus på plats. Tills det besöket sker är denna landningssida den bästa publika briefen vi kan ge sökare från Google.`,
  },
  "lacko-slott": {
    historyAdd: `

## Reading the stones: medieval core and baroque skin

Visitors who only photograph the lakeside silhouette miss half the story. Guided routes that descend into older vaults reveal how episcopal fortification logic differs from later aristocratic display. Ask guides about construction phases, fire scars and which rooms retain medieval fabric. That historical literacy makes White Lady folklore more interesting — not less — because you can see which spaces folklore prefers to haunt.

## Cultural programming and seasonal rhythm

Concerts, exhibitions and summer crowds change the emotional temperature of Läckö. Midsummer brightness feels different from autumn fog over Vänern. Paranormal-minded travellers often prefer shoulder seasons when corridors are quieter, but always verify whether the sections you care about are open. Haunted Sweden updates access fields (guided tours, parking, night access notes) as editorial knowledge grows.

## Connecting Läckö to the Vänern haunted circuit

West Sweden's lake and castle belt rewards multi-stop days: Läckö as the flagship, then Åmål, Gräfsnäs or inland manors depending on daylight. Internal links on this page are deliberate SEO and UX — Google visitors arriving for Läckö ghost queries should leave with a wider map of Västra Götaland, not a dead-end article.`,
    historySvAdd: `

## Att läsa stenarna: medeltida kärna och barockt skal

Besökare som bara fotograferar sjösilhuetten missar halva historien. Guidade rutter som går ner i äldre valv visar hur biskoplig befästningslogik skiljer sig från senare aristokratisk representation. Fråga guiderna om byggnadsfaser, brandspår och vilka rum som behåller medeltida tyg. Den historiska läskunnigheten gör Vita frun-folkloren mer intressant — inte mindre — eftersom du ser vilka rum folkloren föredrar att hemsöka.

## Kulturprogram och säsongsrytm

Konserter, utställningar och sommarfolksamlingar förändrar Läckös känslotemperatur. Midsommarljus känns annorlunda än höstdimma över Vänern. Paranormalt intresserade resenärer föredrar ofta lågsäsong när korridorerna är lugnare, men verifiera alltid att de sektioner du bryr dig om är öppna. Haunted Sweden uppdaterar tillgångsfält (guidningar, parkering, nattnoter) i takt med redaktionell kunskap.

## Koppla Läckö till Vänerns hemsökta krets

Västsveriges sjö- och slottsbälte belönar flerstegsdagar: Läckö som flaggskepp, sedan Åmål, Gräfsnäs eller inlandsherrgårdar beroende på dagsljus. Internlänkarna på sidan är medveten SEO och UX — Google-besökare som kommer för Läckö-spökfrågor ska lämna med en bredare karta över Västra Götaland, inte en återvändsgränd.`,
    legendAdd: `

## Variants of the White Lady tale

Like many European White Lady legends, Läckö's story exists in variants: unjust accusation, tragic death, lingering guardianship of a corridor or stair. Collectors of folklore should note which version a guide tells and whether it is tied to a named historical person. Haunted Sweden prefers unnamed folklore over forced identification with poorly sourced biographies.

## Sensory reports visitors share

Cold drafts in thick stone, door sounds in wind, and pale clothing glimpsed at distance are classic misperception recipes — and also classic ghost motifs. We list them because searchers expect them, then remind readers that stone castles manufacture atmosphere efficiently without needing spirits.

## Planned Haunted Sweden fieldwork

Photograph exterior and permitted interiors, map legend hotspots against construction phases, interview museum educators about how they present folklore versus archives, and note which nearby haunted places make the best ethical day-trip companions. Until complete, this premium landing page is our public investigation brief.`,
    legendSvAdd: `

## Varianter av Vita frun-sägnen

Som många europeiska Vita frun-legender finns Läckös berättelse i varianter: orättvis anklagelse, tragisk död, kvarvarande väktarskap över en korridor eller trappa. Folklöresamlare bör notera vilken version en guide berättar och om den knyts till en namngiven historisk person. Haunted Sweden föredrar namnlös folklore framför påtvingad identifiering med dåligt källbelagda biografier.

## Sinnesrapporter besökare delar

Kalla drag i tjock sten, dörrljud i vind och bleka kläder skymtade på avstånd är klassiska feltolkningsrecept — och också klassiska spökmotiv. Vi listar dem för att sökare förväntar sig dem, och påminner sedan om att stenslott tillverkar atmosfär effektivt utan att andar krävs.

## Planerat Haunted Sweden-fältarbete

Fotografera exteriör och tillåtna interiörer, kartlägg legendhotspots mot byggnadsfaser, intervjua museipedagoger om hur de presenterar folklore kontra arkiv, och notera vilka närliggande hemsökta platser som blir bäst etiska dagsutflykter. Tills det är klart är denna premiumlandningssida vår publika utredningsbrief.`,
  },
};

for (const place of data.places) {
  const e = extra[place.slug];
  if (!e) continue;
  place.history = (place.history || "") + e.historyAdd;
  place.historySv = (place.historySv || "") + e.historySvAdd;
  place.legend = (place.legend || "") + e.legendAdd;
  place.legendSv = (place.legendSv || "") + e.legendSvAdd;
  const en =
    words(place.history) +
    words(place.legend) +
    words((place.faq || []).map((f) => f.answer).join(" "));
  console.log(`${place.slug}: EN≈${en} words`);
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Expansion complete.");
