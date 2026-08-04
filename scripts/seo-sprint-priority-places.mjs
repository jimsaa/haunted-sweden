/**
 * SEO Priority Sprint — expand Hemsökt Museum, Målilla Sanatorium, Läckö Slott.
 * Run: node scripts/seo-sprint-priority-places.mjs
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

const LACKO_COVER =
  "https://upload.wikimedia.org/wikipedia/commons/d/d6/L%C3%A4ck%C3%B6_slott.jpg";
const MALILLA_COVER =
  "https://upload.wikimedia.org/wikipedia/commons/c/cd/M%C3%A5lilla_sanatorium_01.jpg";

const updates = {
  "hemsokt-museum": {
    coverImage: "",
    shortDescription:
      "Sweden's first haunted museum in Borås — hundreds of allegedly haunted artifacts, night events and investigation experiences from LaxTon Ghost Sweden. A flagship dark-tourism stop in Västra Götaland.",
    shortDescriptionSv:
      "Sveriges första hemsökta museum i Borås — hundratals påstått hemsökta föremål, nattarrangemang och utredningsupplevelser från LaxTon Ghost Sweden. En flaggskeppsdestination för dark tourism i Västra Götaland.",
    history: `## Sweden's first haunted museum

Hemsökt Museum opened in 2021 in central Borås as Sweden's first museum dedicated entirely to haunted and allegedly cursed objects. Founded by Tony Martinsson and Niclas Laaksonen of LaxTon Ghost Sweden (established 2014), the venue occupies roughly 450 square metres and displays hundreds of items collected from haunted locations across Sweden and abroad.

## From YouTube investigations to a permanent collection

Before the museum existed, LaxTon Ghost Sweden built a national audience through YouTube investigations, podcasts, live events and overnight ghost hunts. Years of field collecting — dolls, mirrors, religious artifacts, furniture fragments and personal belongings linked to reported paranormal activity — eventually needed a permanent public home. Hemsökt Museum answers that need: not a traditional cultural-history museum, but a curated dark-tourism attraction that treats visitor reaction as part of the experience.

## Rooms designed for atmosphere

The layout is deliberately theatrical. The Black Mirror Room presents mirrors described in folklore as portals; guests report shadows, figures and sudden unease. A Borgvattnet-inspired room references Sweden's most famous haunted vicarage, using furniture and props tied to that legend cycle. The Horror Room (recommended 15+) intensifies scare design for those who want a stronger adrenaline experience. Between these set pieces, quieter corridors hold cases of smaller objects with written provenance stories — some documented, many anecdotal.

## Why Borås matters on the haunted map

Located at Åsboholmsgatan 16B, the museum sits within easy reach of Gothenburg and the wider Västra Götaland haunted circuit (castles, manors and legend sites). For Haunted Sweden it is a category anchor: the rare place filed under Haunted Museum rather than castle ruin or abandoned hospital. That uniqueness drives Search interest — people looking for "hemsökt museum", "haunted museum Sweden" or "LaxTon Ghost" often land here first.

## Documented vs. experienced

Haunted Sweden separates what can be verified (opening year, founders, square metres, ticketed events, published visitor guidelines) from what remains experiential (anxiety, nausea, cold spots, alleged movement on security footage). Both belong on a responsible paranormal map: one as fact, the other as reported experience.`,
    historySv: `## Sveriges första hemsökta museum

Hemsökt Museum öppnade 2021 i centrala Borås som Sveriges första museum helt inriktat på hemsökta och påstått förbannade föremål. Grundat av Tony Martinsson och Niclas Laaksonen från LaxTon Ghost Sweden (startat 2014) omfattar lokalen cirka 450 m² och visar hundratals objekt från utredningar i Sverige och utomlands.

## Från YouTube-utredningar till permanent samling

Innan museet fanns byggde LaxTon Ghost Sweden en nationell publik via YouTube, podcasts, liveevent och nattliga spökjakter. Åratal av fältsamlande — dockor, speglar, religiösa föremål, möbelfragment och personliga tillhörigheter kopplade till rapporterad aktivitet — behövde ett publikt hem. Hemsökt Museum är svaret: inte ett traditionellt kulturhistoriskt museum, utan en curerad dark tourism-attraktion där besökarens reaktion är en del av upplevelsen.

## Rum byggda för atmosfär

Planlösningen är medvetet teaterisk. Svarta spegelsrummet presenterar speglar som i folklore beskrivs som portaler; gäster rapporterar skuggor, gestalter och plötslig oro. Ett Borgvattnet-inspirerat rum anknyter till Sveriges mest kända hemsökta prästgård. Horror Room (rekommenderas från 15 år) höjer intensiteten för den som vill ha mer adrenaline. Däremellan ligger lugnare korridorer med mindre objekt och skrivna proveniensberättelser — en del dokumenterade, många anekdotiska.

## Varför Borås hör hemma på spökkartan

På Åsboholmsgatan 16B ligger museet inom räckhåll från Göteborg och Västra Götalands övriga hemsökta krets (slott, herrgårdar och legendplatser). För Haunted Sweden är det ett kategoriankare: en sällsynt plats under Haunted Museum snarare än slottsruin eller övergivet sjukhus. Den unikheten driver sökintresse — personer som söker "hemsökt museum", "haunted museum Sweden" eller "LaxTon Ghost" landar ofta här först.

## Dokumenterat kontra upplevt

Haunted Sweden skiljer det som kan verifieras (öppningsår, grundare, yta, biljetterade event, publicerade besöksregler) från det som förblir upplevelsebaserat (ångest, illamående, köldkänslor, påstådd rörelse i säkerhetsfilm). Båda hör hemma på en ansvarsfull paranormal karta: det ena som fakta, det andra som rapporterad erfarenhet.`,
    legend: `## What visitors report

Guests frequently describe sudden anxiety, sadness, nausea, headaches and chills — especially near denser object clusters and in the Black Mirror Room. Staff and security footage have been associated with unexplained sounds and sensations, though Haunted Sweden treats these as reports, not proven phenomena.

## Signature spaces

### Black Mirror Room
Mirrors framed as portals; shadows and figures are among the most repeated claims.

### Borgvattnet room
Furniture and staging linked to Sweden's famous haunted vicarage — a bridge between national folklore and museum theatre.

### Horror Room (15+)
Scare design and intensity warnings; not required for a standard daytime visit but central to night-event marketing.

## Overnight investigation potential

Night events and investigation experiences are part of the museum's product. That makes Hemsökt Museum relevant for paranormal tourism beyond a quick daytime walkthrough: booked sessions, team tools and controlled darkness change the atmosphere entirely.

## Nearby haunted places worth combining

Within roughly an hour you can pair a museum visit with Torpa Stenhus, Schillers Krog, George Seatons Jaktslott or Gräfsnäs Slottsruin — a ready-made West Sweden haunted day trip.`,
    legendSv: `## Vad besökare rapporterar

Gäster beskriver ofta plötslig ångest, sorg, illamående, huvudvärk och köldkänslor — särskilt nära tätare föremålssamlingar och i Svarta spegelsrummet. Personal och säkerhetsfilm har kopplats till oförklarliga ljud och känslor, men Haunted Sweden behandlar detta som rapporter, inte bevisade fenomen.

## Signaturutrymmen

### Svarta spegelsrummet
Speglar som beskrivs som portaler; skuggor och gestalter är bland de mest återkommande påståendena.

### Borgvattnet-rummet
Möbler och scenografi kopplade till Sveriges kända hemsökta prästgård — en bro mellan nationell folklore och museiteater.

### Horror Room (15+)
Skräckdesign och intensitetsvarningar; inte obligatoriskt för ett vanligt dagsbesök men centralt i nattarrangemangens marknadsföring.

## Potential för nattlig utredning

Nattarrangemang och utredningsupplevelser ingår i museets erbjudande. Det gör Hemsökt Museum relevant för paranormal turism bortom en snabb dagsvisning: bokade sessioner, teamverktyg och kontrollerat mörker förändrar atmosfären helt.

## Närliggande hemsökta platser att kombinera

Inom ungefär en timme kan du para museibesöket med Torpa Stenhus, Schillers Krog, George Seatons Jaktslott eller Gräfsnäs Slottsruin — en färdig hemsökt dagstur i Västsverige.`,
    images: [],
    faq: [
      {
        question: "Where is Hemsökt Museum and how do I visit?",
        questionSv: "Var ligger Hemsökt Museum och hur besöker jag det?",
        answer:
          "Hemsökt Museum is at Åsboholmsgatan 16B, 507 51 Borås. It is a ticketed museum attraction — check current opening hours and event nights on the official LaxTon Ghost / museum channels before you travel. Parking is generally available nearby; follow on-site staff guidance.",
        answerSv:
          "Hemsökt Museum ligger på Åsboholmsgatan 16B, 507 51 Borås. Det är en biljetterad museiattraktion — kontrollera aktuella öppettider och nattarrangemang via officiella LaxTon Ghost-/museikanaler innan du åker. Parkering finns vanligtvis i närheten; följ personalens anvisningar.",
      },
      {
        question: "Is Hemsökt Museum suitable for families and children?",
        questionSv: "Passar Hemsökt Museum för familjer och barn?",
        answer:
          "Daytime museum visits can work for many ages, but the Horror Room is recommended for visitors 15+. Night investigations and intense scare elements may be unsuitable for young children. Always read age guidance for the specific event you book.",
        answerSv:
          "Dagsbesök kan fungera för många åldrar, men Horror Room rekommenderas från 15 år. Nattliga utredningar och intensiva skräckmoment kan vara olämpliga för små barn. Läs alltid åldersvägledning för det specifika evenemang du bokar.",
      },
      {
        question: "Are the objects at Hemsökt Museum proven haunted?",
        questionSv: "Är föremålen på Hemsökt Museum bevisat hemsökta?",
        answer:
          "No. Haunted Sweden lists documented museum facts separately from folklore and visitor reports. Objects are presented with alleged histories; reported reactions (anxiety, cold spots, sounds) are experiential claims, not scientific proof.",
        answerSv:
          "Nej. Haunted Sweden skiljer dokumenterade museumfakta från folklore och besökarrapporter. Föremål presenteras med påstådda historier; rapporterade reaktioner (ångest, köldkänslor, ljud) är upplevelsebaserade påståenden, inte vetenskapliga bevis.",
      },
      {
        question: "What nearby haunted places can I visit the same day?",
        questionSv: "Vilka närliggande hemsökta platser kan jag besöka samma dag?",
        answer:
          "Popular West Sweden combinations include Torpa Stenhus (~24 km), Schillers Krog, George Seatons Jaktslott and Gräfsnäs Slottsruin. Use the Haunted Sweden map to plan driving time and access type for each stop.",
        answerSv:
          "Populära kombinationer i Västsverige är Torpa Stenhus (~24 km), Schillers Krog, George Seatons Jaktslott och Gräfsnäs Slottsruin. Använd Haunted Swedens karta för att planera körtid och tillgångstyp för varje stopp.",
      },
      {
        question: "Has Haunted Sweden investigated Hemsökt Museum yet?",
        questionSv: "Har Haunted Sweden utrett Hemsökt Museum ännu?",
        answer:
          "A Haunted Sweden team investigation is planned but not yet completed. We welcome tips, photos and respectful visitor reports via the submit form while the location remains on our shortlist.",
        answerSv:
          "En utredning av Haunted Sweden-teamet är planerad men ännu inte genomförd. Vi välkomnar tips, foton och respektfulla besöksrapporter via tipsformuläret medan platsen står på vår shortlist.",
      },
    ],
    hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  },

  "malilla-sanatorium": {
    coverImage: MALILLA_COVER,
    shortDescription:
      "Legendary abandoned tuberculosis sanatorium in Målilla, Småland — Spökjakt Season 3 premiere location with preserved wards, medical history and intense atmosphere. Guided heritage access when available.",
    shortDescriptionSv:
      "Legendariskt övergivet tuberkulossanatorium i Målilla, Småland — Spökjakt säsong 3:s premiärplats med bevarade salar, medicinhistoria och intensiv atmosfär. Guidat kulturarvstillträde när det erbjuds.",
    history: `## A tuberculosis hospital in the Småland forests

Målilla Sanatorium was founded in the 1910s at Målilla in Hultsfred Municipality, Småland, as a specialised institution for pulmonary tuberculosis. Patients lived for long periods in isolation-oriented wards designed around rest, air and regimented medical routines. The buildings and landscape still communicate that medical purpose: long corridors, patient rooms, treatment spaces and the quiet weight of an era when TB shaped public health across Sweden.

## Closure, decay and heritage reuse

After tuberculosis treatment declined and the institution eventually closed, buildings entered a second life as an abandoned medical site — then, in parts, as a heritage and museum-oriented destination with guided tours. Preservation and decay sit side by side: peeling paint, empty beds and institutional architecture create the visual language that later made the site famous on television, while heritage stewards work to keep access legal, safe and historically grounded.

## Spökjakt Season 3 premiere

Målilla Sanatorium opened Season 3 of Familjen Lundell's Spökjakt (Episode 1, 2021) with investigators including Joakim and Jonna Lundell alongside LaxTon Ghost Sweden. That premiere cemented national recognition: searchers looking for "Målilla Sanatorium", "Spökjakt sanatorium" or "abandoned hospital Sweden" consistently find this location. Haunted Sweden scores it among the map's LEGENDARY tier for recognition while insisting that TV atmosphere is not the same as proven haunting.

## How Haunted Sweden catalogues the site

We list Målilla under Abandoned Place / medical history, note guided-visit access when offered, and keep family-friendly set to no because of intensity and subject matter. Night access is not recommended without official permission. Source material should always privilege medical history and lawful tours over trespassing narratives.

## Visiting responsibly

Book museum or heritage tours when available. Respect barriers, private property and staff instructions. The site's power comes from real illness and isolation in Swedish history — sensational break-ins undermine both safety and the dignity of that past.`,
    historySv: `## Ett tuberkulossjukhus i Smålandsskogarna

Målilla sanatorium grundades på 1910-talet i Målilla, Hultsfreds kommun i Småland, som en specialiserad institution för lungtuberkulos. Patienter vistades under långa perioder i isoleringsinriktade salar byggda kring vila, luft och strikta medicinska rutiner. Byggnader och landskap förmedlar fortfarande det medicinska syftet: långa korridorer, patientrum, behandlingsytor och den tysta tyngden från en tid då TBC formade folkhälsan i Sverige.

## Nedläggning, förfall och kulturarv

När tuberkulosvården minskade och institutionen så småningom stängde fick byggnaderna ett andra liv som övergiven medicinsk plats — och delvis som kulturarvs- och museiinriktad destination med guidningar. Bevarande och förfall står sida vid sida: flagnande färg, tomma sängar och institutionsarkitektur skapar det visuella språk som senare gjorde platsen känd på TV, medan kulturarvsförvaltare arbetar för laglig, säker och historiskt förankrad tillgång.

## Spökjakt säsong 3-premiär

Målilla sanatorium öppnade säsong 3 av Familjen Lundells Spökjakt (avsnitt 1, 2021) med bland andra Joakim och Jonna Lundell samt LaxTon Ghost Sweden. Premiären cementerade nationell igenkänning: den som söker "Målilla Sanatorium", "Spökjakt sanatorium" eller "övergivet sjukhus Sverige" hittar ofta hit. Haunted Sweden placerar platsen i LEGENDARY-skiktet för igenkänning men understryker att TV-atmosfär inte är detsamma som bevisad hemsökelse.

## Hur Haunted Sweden katalogiserar platsen

Vi listar Målilla under Abandoned Place / medicinhistoria, noterar guidat besök när det erbjuds, och sätter familjevänligt till nej på grund av intensitet och ämne. Nattbesök rekommenderas inte utan officiellt tillstånd. Källmaterial ska alltid prioritera medicinhistoria och lagliga turer framför intrångsberättelser.

## Besök ansvarsfullt

Boka museum- eller kulturarvsturer när de finns. Respektera avspärrningar, privat mark och personalens instruktioner. Platsens kraft kommer från verklig sjukdom och isolering i svensk historia — sensationalistiska inbrott undergräver både säkerhet och värdighet.`,
    legend: `## Atmosphere and folklore

Visitors and guides describe heaviness in corridors, unexplained sounds, and ward-related folklore. These accounts circulate widely online and in TV framing. Haunted Sweden records them as anecdotal atmosphere — not laboratory evidence.

## What Spökjakt showed

The Season 3 premiere used decaying interiors for investigative television: darkness, medical props and emotional stakes. That production value drives tourism curiosity; it does not by itself prove paranormal activity.

## Separating medical tragedy from ghost stories

Tuberculosis wards were places of hope, fear, recovery and death. Responsible dark tourism starts with that medical truth. Ghost narratives may layer on top, but they should never erase the patients and staff who lived the history.

## Nearby haunted places

Within a broader Småland / Southeast Sweden loop, consider Berga Herrgård, Teleborgs Slott, Kalmar Slott and other manor or castle stops on the Haunted Sweden map — plan distances carefully; Målilla is more remote than West Sweden castle clusters.`,
    legendSv: `## Atmosfär och folklore

Besökare och guider beskriver tyngd i korridorer, oförklarliga ljud och salrelaterad folklore. Berättelserna cirkulerar brett online och i TV-ramar. Haunted Sweden registrerar dem som anekdotisk atmosfär — inte laboratoriebevis.

## Vad Spökjakt visade

Säsong 3-premiären använde förfallna interiörer för utrednings-TV: mörker, medicinska rekvisita och emotionella insatser. Den produktionskvaliteten driver turistnyfikenhet; den bevisar inte i sig paranormal aktivitet.

## Separera medicinsk tragedi från spökhistorier

Tuberkulossalar var platser för hopp, rädsla, tillfrisknande och död. Ansvarsfull dark tourism börjar i den medicinska sanningen. Spökberättelser kan läggas ovanpå, men de får aldrig sudda ut patienter och personal som levde historien.

## Närliggande hemsökta platser

I en bredare Småland-/sydöstsverigeslinga kan du överväga Berga Herrgård, Teleborgs Slott, Kalmar Slott och andra herrgårds- eller slottsstopp på Haunted Swedens karta — planera avstånd noga; Målilla ligger mer avsides än Västsveriges slottskluster.`,
    images: [
      {
        url: MALILLA_COVER,
        caption: "Målilla Sanatorium — exterior",
        credit: "Wikimedia Commons",
        status: "approved",
      },
    ],
    photoCount: 1,
    faq: [
      {
        question: "Can I visit Målilla Sanatorium on my own at night?",
        questionSv: "Kan jag besöka Målilla Sanatorium på egen hand på natten?",
        answer:
          "No. Haunted Sweden does not recommend unsupervised night visits. Use official museum or heritage tours when available, respect private property and never trespass.",
        answerSv:
          "Nej. Haunted Sweden rekommenderar inte oövervakade nattbesök. Använd officiella museum- eller kulturarvsturer när de finns, respektera privat mark och gör aldrig intrång.",
      },
      {
        question: "Why is Målilla Sanatorium famous?",
        questionSv: "Varför är Målilla Sanatorium känt?",
        answer:
          "It is a historic tuberculosis sanatorium from the 1910s that later became a nationally recognised abandoned medical site, amplified by Spökjakt Season 3 Episode 1 (2021).",
        answerSv:
          "Det är ett historiskt tuberkulossanatorium från 1910-talet som senare blev en nationellt känd övergiven medicinsk plats, förstärkt av Spökjakt säsong 3 avsnitt 1 (2021).",
      },
      {
        question: "Is Målilla Sanatorium family friendly?",
        questionSv: "Är Målilla Sanatorium familjevänligt?",
        answer:
          "Generally no. The subject matter (illness, isolation, decay) and intense atmosphere make it unsuitable for young children. Check tour operator guidance for your group.",
        answerSv:
          "Generellt nej. Ämnet (sjukdom, isolering, förfall) och den intensiva atmosfären gör platsen olämplig för små barn. Kontrollera arrangörens vägledning för din grupp.",
      },
      {
        question: "Has Haunted Sweden completed an on-site investigation?",
        questionSv: "Har Haunted Sweden genomfört en utredning på plats?",
        answer:
          "Not yet. Status is investigation planned. Spökjakt and LaxTon have featured the site on television/YouTube; Haunted Sweden team verification is still pending. Tips and lawful tour reports are welcome.",
        answerSv:
          "Inte ännu. Status är utredning planerad. Spökjakt och LaxTon har visat platsen på TV/YouTube; Haunted Swedens teamverifiering väntar fortfarande. Tips och lagliga toursrapporter välkomnas.",
      },
      {
        question: "What should I know about tuberculosis history here?",
        questionSv: "Vad bör jag veta om tuberkuloshistorien här?",
        answer:
          "Patients were treated for pulmonary TB in an era of long stays and strict routines. Approach the site as medical heritage first — ghost stories are secondary folklore layers.",
        answerSv:
          "Patienter behandlades för lung-TBC i en tid av långa vistelser och strikta rutiner. Närma dig platsen som medicinskt kulturarv först — spökhistorier är sekundära folklorelager.",
      },
    ],
    hauntedSwedenInvestigation: { status: "not_investigated_yet" },
    sourceLinks: [
      "https://www.youtube.com/playlist?list=PLWKhE3zmPwDYAcU4Er1vOX46EviylvcRg",
    ],
  },

  "lacko-slott": {
    coverImage: LACKO_COVER,
    shortDescription:
      "One of Sweden's most iconic castles on Lake Vänern — founded c. 1298, White Lady folklore, baroque halls and medieval vaults. A premium haunted-history destination near Lidköping.",
    shortDescriptionSv:
      "Ett av Sveriges mest ikoniska slott vid Vänern — grundat ca 1298, Vita frun-folklore, barocksalar och medeltida valv. En premiumdestination för hemsökt historia nära Lidköping.",
    history: `## Founded for the bishops of Skara

Läckö Slott rises from a rocky peninsula on Kållandsö in Lake Vänern, near Lidköping in Västra Götaland. The stronghold was founded around 1298 by Bishop Brynolf Algotsson as a fortified residence for the Diocese of Skara. From the start it combined ecclesiastical power with military defensibility — stone walls, vaults and a commanding lake view that still defines the visitor experience today.

## Reformation, crown seizure and noble ambition

During the Reformation the castle passed to the Swedish Crown. Later centuries reshaped Läckö into one of Sweden's grandest baroque residences, especially under Magnus Gabriel De la Gardie. Ceremonial halls, towers and landscaped approaches announce aristocratic display; deeper medieval chambers and staircases preserve older layers of imprisonment, conflict and everyday fortress life.

## Seven centuries of documented human drama

Fires, reconstructions, political shifts and documented deaths leave a dense historical record. Haunted Sweden emphasises that density: Läckö does not need invented horror to feel heavy. Power struggles, religious change and carceral use of stone rooms already supply the emotional architecture that later ghost folklore attaches to.

## Museum, events and public access

Today Läckö operates as an active cultural destination — museum exhibitions, guided tours, concerts and seasonal events. That means excellent daytime access and clear rules. Night atmosphere (fog on Vänern, lit white façades, echoing corridors) is part of why the site ranks so highly for paranormal tourism, but visitors must respect opening hours and barriers.

## Why it ranks as a Haunted Sweden flagship

National recognition, lake-side photography, White Lady folklore and 700+ years of history make Läckö a Search Console magnet and a natural internal-link hub to other Västra Götaland haunted places.`,
    historySv: `## Grundat för Skara biskopar

Läckö slott reser sig från en klippig udde på Kållandsö i Vänern, nära Lidköping i Västra Götaland. Fästet grundades omkring 1298 av biskop Brynolf Algotsson som befäst residens för Skara stift. Från början kombinerades kyrklig makt med militär försvarsbarhet — stenmurar, valv och en kommenderande sjöutsikt som fortfarande präglar besöksupplevelsen.

## Reformation, kronans övertagande och adelns ambitioner

Under reformationen övergick slottet till den svenska kronan. Senare århundraden omformade Läckö till ett av Sveriges ståtligaste barockresidens, särskilt under Magnus Gabriel De la Gardie. Ceremoniella salar, torn och anlagda tillfarter signalerar aristokratisk representation; djupare medeltida kammare och trappor bevarar äldre lager av fångenskap, konflikt och vardagligt fästningsliv.

## Sju sekler av dokumenterat mänskligt drama

Bränder, ombyggnader, politiska skiften och dokumenterade dödsfall ger ett tätt historiskt arkiv. Haunted Sweden betonar den densiteten: Läckö behöver ingen påhittad skräck för att kännas tungt. Maktkamper, religiös förändring och carceral användning av stenrum ger redan den emotionella arkitektur som senare spökfolklore fäster vid.

## Museum, evenemang och allmän tillgång

I dag fungerar Läckö som aktiv kulturdestination — museiutställningar, guidningar, konserter och säsongsevent. Det betyder utmärkt dagtillgång och tydliga regler. Nattatmosfär (dimma över Vänern, belysta vita fasader, ekande korridorer) förklarar varför platsen rankas högt för paranormal turism, men besökare måste respektera öppettider och avspärrningar.

## Varför det är ett Haunted Sweden-flaggskepp

Nationell igenkänning, sjönära fotografi, Vita frun-folklore och över 700 års historia gör Läckö till en Search Console-magnet och en naturlig internlänkshubb till andra hemsökta platser i Västra Götaland.`,
    legend: `## The White Lady of Läckö

Läckö's best-known paranormal story is the White Lady (Vita frun). Folklore says a woman was falsely accused and punished; her pale figure is said to linger in corridors and staircases. Reports mention movement in empty rooms, whispers in stone passages, cold spots and shadow figures on upper floors.

## Atmosphere after dark

Lake fog, moonlit walls and echoing vaults intensify visitor imagination. Haunted Sweden records these sensory claims as folklore and experience reports — valuable for dark tourism storytelling, unverified as scientific proof.

## What to explore on a haunted-history visit

Focus on the oldest stone sections, stair towers and vaults during guided access. Pair historical interpretation (bishops, De la Gardie, Reformation) with legend listening rather than treating ghost stories as the only narrative.

## Nearby haunted places

Within driving distance: Åmåls Stadshotell, Barnmördarkorset, Home Hotel Bilan, Gräfsnäs Slottsruin and other West Sweden stops. Läckö works as a day-trip anchor around Lidköping and Vänern.`,
    legendSv: `## Vita frun på Läckö

Läckös mest kända paranormala berättelse är Vita frun. Enligt folklore ska en kvinna ha blivit orättvist anklagad och straffad; hennes bleka gestalt sägs dröja kvar i korridorer och trappor. Rapporter nämner rörelse i tomma rum, viskningar i stenpassager, köldkänslor och skuggfigurer på övre plan.

## Atmosfär efter mörkrets inbrott

Sjödimma, månljus på murar och ekande valv förstärker besökarnas föreställningar. Haunted Sweden registrerar dessa sinnesintryck som folklore och upplevelserapporter — värdefulla för dark tourism-storytelling, overifierade som vetenskapliga bevis.

## Vad du bör utforska på ett hemsökt historiebesök

Fokusera på de äldsta stendelarna, trapptorn och valv under guidat tillträde. Para historisk tolkning (biskopar, De la Gardie, reformationen) med legendlyssnande snarare än att låta spökhistorier vara enda berättelsen.

## Närliggande hemsökta platser

Inom köravstånd: Åmåls Stadshotell, Barnmördarkorset, Home Hotel Bilan, Gräfsnäs Slottsruin och andra Västsverige-stopp. Läckö fungerar som dagsutflyktsankare runt Lidköping och Vänern.`,
    images: [
      {
        url: LACKO_COVER,
        caption: "Läckö Slott on Lake Vänern",
        credit: "Wikimedia Commons",
        status: "approved",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/L%C3%A4ck%C3%B6_slott_interior_02.jpg",
        caption: "Läckö Slott interior",
        credit: "Wikimedia Commons",
        status: "approved",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/4/48/L%C3%A4ck%C3%B6_slott_interior_04.jpg",
        caption: "Läckö Slott interior hall",
        credit: "Wikimedia Commons",
        status: "approved",
      },
    ],
    photoCount: 3,
    faq: [
      {
        question: "Where is Läckö Slott and how do I get there?",
        questionSv: "Var ligger Läckö Slott och hur tar jag mig dit?",
        answer:
          "Läckö Slott is on Kållandsö in Lake Vänern, address Läckö slott 1, 531 99 Lidköping. Drive from Lidköping onto the island; parking is available for museum visitors. Check lacko.se for seasonal opening hours before you go.",
        answerSv:
          "Läckö slott ligger på Kållandsö i Vänern, adress Läckö slott 1, 531 99 Lidköping. Kör från Lidköping ut på ön; parkering finns för museibesökare. Kontrollera lacko.se för säsongens öppettider innan du åker.",
      },
      {
        question: "Who is the White Lady at Läckö Castle?",
        questionSv: "Vem är Vita frun på Läckö slott?",
        answer:
          "She is the castle's best-known folklore figure — a woman said to have been falsely accused and punished, whose spirit allegedly appears in corridors and staircases. Treat this as legend layered on real medieval and baroque history.",
        answerSv:
          "Hon är slottets mest kända folkloregestalt — en kvinna som ska ha blivit orättvist anklagad och straffad, och vars ande påstås synas i korridorer och trappor. Behandla detta som legend ovanpå verklig medeltida och barock historia.",
      },
      {
        question: "Can I visit Läckö Slott at night for ghost hunting?",
        questionSv: "Kan jag besöka Läckö Slott på natten för spökjakt?",
        answer:
          "Only within official opening hours, events or authorised programmes. Do not enter closed areas. Fog and medieval vaults can be atmospheric after sunset during permitted events — always follow staff rules.",
        answerSv:
          "Endast inom officiella öppettider, evenemang eller auktoriserade program. Gå inte in i stängda områden. Dimma och medeltida valv kan vara stämningsfulla efter solnedgång under tillåtna evenemang — följ alltid personalens regler.",
      },
      {
        question: "Is Läckö Slott good for families?",
        questionSv: "Passar Läckö Slott för familjer?",
        answer:
          "Yes for daytime museum visits and guided tours. Ghost-focused night programmes may be more intense — check age recommendations for specific events.",
        answerSv:
          "Ja för dagsbesök på museet och guidningar. Spökfokuserade nattprogram kan vara mer intensiva — kontrollera åldersrekommendationer för specifika evenemang.",
      },
      {
        question: "Has Haunted Sweden investigated Läckö yet?",
        questionSv: "Har Haunted Sweden utrett Läckö ännu?",
        answer:
          "Investigation is planned but not yet completed by the Haunted Sweden team. We continue collecting historical sources, visitor tips and folklore notes for a future on-site verification.",
        answerSv:
          "Utredning är planerad men ännu inte genomförd av Haunted Sweden-teamet. Vi fortsätter samla historiska källor, besökartips och folklorenoteringar inför en framtida verifiering på plats.",
      },
    ],
    hauntedSwedenInvestigation: { status: "not_investigated_yet" },
  },
};

let touched = 0;
for (const place of data.places) {
  const patch = updates[place.slug];
  if (!patch) continue;
  Object.assign(place, patch);
  touched++;
  const en =
    words(place.history) + words(place.legend) + words((place.faq || []).map((f) => f.answer).join(" "));
  const sv =
    words(place.historySv) +
    words(place.legendSv) +
    words((place.faq || []).map((f) => f.answerSv || "").join(" "));
  console.log(
    `${place.slug}: EN≈${en} words, SV≈${sv} words, faq=${(place.faq || []).length}, images=${(place.images || []).length}`
  );
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log(`Updated ${touched} places → ${file}`);
