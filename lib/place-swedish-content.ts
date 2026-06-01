/** Static Swedish copy for all Haunted Sweden locations (no external APIs). */
export type SwedishPlaceContent = {
  shortDescription: string;
  history: string;
  legend: string;
  /** Optional card/popup summary; defaults to shortDescription in locale helpers. */
  summary?: string;
  safetyNote?: string;
};

const SWEDISH_BY_SLUG: Record<string, SwedishPlaceContent> = {
  "borgvattnets-vandrarhem": {
    shortDescription:
      "Historiskt vandrarhem i det ökända spökområdet Borgvattnet, ett stenkast från Borgvattnets prästgård (~200 m) — starkt förknippat med intensiva paranormala rapporter.",
    history:
      "Borgvattnets vandrarhem uppfördes 1920 och är en av Sveriges mest kända spökplatser med besökare från hela världen. Det ingår i Borgvattnet-klustret tillsammans med prästgården.",
    legend:
      "Besökare och utredare berättar om fotsteg, oförklarliga ljud, förflyttande föremål och plötsliga temperaturfall.",
  },
  "borgvattnets-prastgard": {
    shortDescription:
      "Sveriges legendariska hemsökta prästgård i Borgvattnet-klustret, cirka 200 meter från vandrarhemmet.",
    history:
      "Borgvattnets prästgård från 1800-talet räknas som ett av Sveriges mest dokumenterade spökhus och delar det paranormala klustret med vandrarhemmet i byn.",
    legend:
      "Skuggfigurer, röster, dörrar som öppnas av sig själva och en tryckande atmosfär i byggnaden nämns i vittnesmål och utredningar.",
  },
  "brahehus-slottsruin": {
    shortDescription:
      "Dramatisk slottsruin från 1600-talet ovanför Vättern, omgiven av sägner, spökberättelser och den sorgsna damen bland murarna.",
    history:
      "Brahehus beställdes 1637 av greve Per Brahe den yngre som morgongåva till hustru Kristina Katarina Stenbock. Hon avled 1650 innan slottet stod färdigt. 1708 förstördes anläggningen av en eldsvåda från Uppgränna — ruinen mot sjön är det som återstår.",
    legend:
      "Lokala sägner talar om en sorgsen kvinnlig gestalt i stenmuren i dimma och skymning, ibland kopplad till grevinnan som aldrig fick bo här. Ruin, tomma fönster och Vätterns dimma har gjort platsen till en klassiker i svensk spökfolklore.",
  },
  "barnmordarkorset": {
    shortDescription:
      "Historiskt träkors i skogen norr om Hova, omgivet av mörk folklore och lokala legender längs Eriksgatan.",
    history:
      "Barnmördarkorset står vid den medeltida pilgrimsvägen Eriksgatan utanför Hova. Korset har länge varit en markör längs rutten och knyts till berättelser som förts vidare i bygden.",
    legend:
      "Enligt folklore markerar platsen en tragisk händelse med ett barns död. Området omtalas som rastlöst, med obehag bland besökare och märkliga upplevelser i skogen.",
  },
  "hemsokt-museum": {
    shortDescription:
      "Sveriges första hemsökta museum av LaxTon Ghost Sweden — hundratals påstått förbannade och spöklika föremål i centrala Borås.",
    history:
      "Hemsökt Museum öppnade 2021 i Borås som Sveriges första museum helt inriktat på hemsökta och förbannade objekt. Grundat av Tony Martinsson och Niclas Laaksonen (LaxTon Ghost Sweden, 2014) visar museet på cirka 450 m² föremål från utredningar i Sverige och utomlands.",
    legend:
      "Besökare beskriver plötslig ångest, sorg, illamående, huvudvärk och köldkänslor. Svarta spegelsrummet, Borgvattnet-rummet och Horror Room (15+) nämns ofta tillsammans med ljud och rörelser i säkerhetsfilm.",
  },
  "grafenas-slottsruin": {
    shortDescription:
      "Mystisk slottsruin vid Anten — bränd tre gånger med exakt hundra år mellan varje eldsvåda. En av Västsveriges mest suggestiva historiska platser.",
    history:
      "Gräfsnäs slott byggdes omkring 1550 av greve Sten Eriksson Leijonhufvud vid Anten utanför Alingsås. Tre stora bränder inträffade 1634, 1734 och 1834 — varje gång ett sekel efter den förra. Sägnen säger att den sista elden bröt ut samma dag som nya ägarhandlingar skulle undertecknas.",
    legend:
      "Känsla av att bli betraktad, kölddrag, fotsteg vid övre murverk, skuggor i fönster och ljud efter solnedgång — särskilt vid gamla trappor. «Hundraårsbranden» är platsens signatur: slump, förbannelse eller något annat?",
  },
  "george-seatons-jaktslott": {
    shortDescription:
      "Ruiner av ett glömt lyxjakt slott på Hyltenäs kulle — byggt 1915–1917, förstört i brand 1923. Dramatisk kulle med sjöar och skog.",
    history:
      "Göteborgsköpmannen George Seaton lät uppföra sitt jakt slott på Hyltenäs kulle i Marks kommun 1915–1917 med el, värme, rinnande vatten och omkring 35 rum. Den 17 december 1923 ödelade en morgonbrand hela anläggningen på några timmar. Endast stenfundament återstår.",
    legend:
      "Ruinbesökare berättar om övervakningskänsla, köldkänslor, fotsteg bland stenarna, skuggor vid terrasserna och viskningar i skymning — särskilt ensamma. Seatons starka band till platsen omtalas i lokala teorier.",
  },
  "lacko-slott": {
    shortDescription:
      "Ett av Sveriges mest ikoniska slott vid Vänern — grundat 1298, vita frun, medeltida valv och århundraden av makt, fångenskap och spökberättelser.",
    history:
      "Läckö slott grundades omkring 1298 av biskop Brynolf Algotsson. Platsen växte genom konflikter och bränder, togs av kronan vid reformationen och blev senare barockresidens under Magnus Gabriel De la Gardie. Valv, torn och salar bär på mer än sju sekler av religiös makt, fångenskap och dokumenterade dödsfall.",
    legend:
      "Den vita frun är Läckös mest kända spöksaga: en kvinna ska ha blivit orättvist anklagad och straffad, och hennes gestalt sägs vandra i korridorer och trappor. Köldkänslor, fotsteg, skuggor och tung stämning i de äldsta delarna rapporteras ofta.",
  },
  "tjuvholmen": {
    shortDescription:
      "Skogsö i Göta älv mitt emot Kungälv — i århundraden stadens officiella avrättningsplats («Tjuvholmen»), med en av regionens mörkaste folklorer.",
    history:
      "Före sent 1800-talets granplantering var Tjuvholmen en karg klippö med galgar på högsta punkten. Källor beskriver offentliga avrättningar, kroppar som varnade exemplar och begravningar vid platsen. På 1900-talet dränktes flera pojkar i de starka strömmarna vid ön.",
    legend:
      "Från Kungälvskusten omtalas känsla av att bli iakttagen, obehag efter mörkrets inbrott, rörelser bland träden och ljud från ön. Skräcken är ofta psykologisk: vardagsliv vid promenaden kontrasterar mot århundraden av avrättningar i dimma.",
  },
  "falkenbergs-borgruin": {
    shortDescription:
      "Medeltida borgruin (Falkenbergshus) vid Ätran i Falkenberg — förstörd 1434, känd för Ätrajungfrun, skatter och en suggestiv flodmiljö.",
    history:
      "Falkenbergs borgruin byggdes i slutet av 1200-talet när Halland tillhörde Danmark och blev en viktig befästning vid Ätran. Borgen förstördes under Engelbrektsupproret 1434 och återuppbyggdes aldrig. Ruinen vid Hamngatan bär på regional historia trots stenröjning och järnväg.",
    legend:
      "Ätrajungfrun: under ett anfall gömde en ung kvinna skatt under slottet; när murarna rasade blev hon instängd. En magisk tupp ska väcka henne om Falkenberg hotas igen. Obehag vid ruinerna, tystnad och ljud vid floden nämns i vittnesmål.",
  },
  "bohus-fastning": {
    shortDescription:
      "Medeltida öfästning i Kungälv — grundad 1308, aldrig erövrad trots 14 belägringar, senare fruktad fängelsefästning med valv och avrättningar.",
    history:
      "Bohus fästning byggdes 1308 av kung Håkon V på en klippö i Göta älv. Anläggningen utvidgades, stod emot fjorton belägringar utan att falla och överlevde bland annat krutexplosionen 1566. Militär roll minskade; stora delar blev fängelse med källare, tortyr och avrättningar fram till våra dagars bevarade fängelseutrymmen.",
    legend:
      "Besökare beskriver känsla av att bli iakttagen, ljud i tomma korridorer, fotsteg i trapphus, köld i källare och skuggor vid torn — ofta kopplat till soldater och fångar. Fars Hatt, valven och cellerna är de tyngsta zonerna. Älvdimma och murar ger stark filmisk stämning efter mörkrets inbrott.",
  },
  "solberga-prastgard": {
    shortDescription:
      "Historisk prästgård i Solberga (1787) på mark knuten till mordet på Herr Arne 1586 — folklore som Selma Lagerlöf gjorde nationellt känd.",
    history:
      "Solberga prästgård i Kode har rötter från 1500-talet. Platsen är sammanvävd med mordet på prästen Herr Arne 1586 och hushållets offer — en av Bohusläns mest omskrivna brott. Nuvarande huvudbyggnad uppfördes 1787. Tragedin inspirerade Selma Lagerlöfs Herr Arnes penningar (1904).",
    legend:
      "Många kopplar gården till en kvarvarande närvaro efter dödsfallen 1586. Tung stämning, känsla av att bli betraktad och stark emotionell tyngd vid den gamla prästbostaden rapporteras. Särskilt suggestivt i dimma, regn och höstskymning.",
  },
  "carlstens-fastning": {
    shortDescription:
      "Öfästning på Marstrand — från 1658 fästning och ökänt fängelse (marstrandsarbete), belägringar, Lasse-Maja, spökvandringar och kustnära atmosfär.",
    history:
      "Carlstens fästning beställdes efter Roskildefreden 1658 och byggdes under två hundra år, till stor del av fångar i marstrandsarbetet — tunga straff, kedjor och hårda förhållanden med hög dödlighet. Fästningen erövrades bland annat 1677 och 1719 (Tordenskjold). Den blev ett av Sveriges mest ökända fängelser innan den blev kulturarv på Marstrandsön.",
    legend:
      "Spökvandringar bygger på lång ryktesrykte. Fotsteg, köld, ljud i celler och skuggor i torn kopplas till fångar. Suckarnas gång och fängelsegångarna nämns ofta. Havsdimma och öisolering kontrasterar mot solig hamn — en av västkustens mest cinematiska fästningar efter mörker.",
  },
  "den-stora-smallen": {
    shortDescription:
      "Ett av Bohusläns största gravfält vid Ytterby — 160+ dokumenterade gravar, cirka 1 500 års begravningar (RAÄ 22:1) och stark folklore efter mörker.",
    history:
      "DOKUMENTERAT: Den stora smällen (Västra porten–Stora smällen; fornlämning Ytterby RAÄ 22:1) är bland de största gravfälten i Kungälvs kommun med minst 160 gravar: högar, resta stenar, skeppssättningar och stenkrets. Arkeologiska undersökningar visar bruk från sen bronsålder till järnålder i upp emot 1 500–1 700 år. Tillgång via stig från Torsbyvägen söder om järnvägsövergången.",
    legend:
      "FOLKLORE OCH BESÖKARRAPPORTER (ej arkeologiskt verifierat): Platsen ses som fäfölksmark. Nattbesökare beskriver obehag, ovanlig tystnad, känsla av att bli iakttagen, köld, ljud och skuggor mellan högar — särskilt vid gravkoncentrationen och skogskanten. Haunted Sweden skiljer sägner från dokumenterade gravantal.",
  },
  "schillers-krog": {
    shortDescription:
      "Restaurang i centrala Alingsås med rapporterade skuggfigurer, glas som rör sig och aktivitet efter stängning — ägaren Marcus Schiller har gått ut offentligt.",
    history:
      "DOKUMENTERAT: Schillers krog ligger i historiska stadskärnan vid Norra Strömgatan. Byggnaden ingår i stadens kanal- och industriarv; Haunted Sweden registrerar platsen främst för samtida vittnesmål snarare än en enskild historisk tragedi.",
    legend:
      "VITTNESMÅL (ej vetenskapligt verifierat): Ägaren har beskrivit en gestalt i mörka kläder vid kassan när ingen fanns där. Personal rapporterar övervakningskänsla, ljud efter gästerna lämnat och glas som flyttats. Utredare (bland annat LaxTon Ghost Sweden) har varit inbjudna efter stängning; Haunted Sweden presenterar detta som dokumenterade berättelser, inte bevisad hämning.",
  },
  "valla-kyrka": {
    shortDescription:
      "En av Tjörns äldsta kyrkor (från 1100-talet) i Kållekärr — medeltida sten, århundraden av begravningar och ihållande spökberättelser.",
    history:
      "DOKUMENTERAT: Valla kyrka härstammar från 1100-talet och har byggts om flera gånger som religiöst centrum med dop, begravningar och sammankomster i generationer. Kyrkogården bär på historiska gravstenar och är en av öns viktigaste medeltida miljöer.",
    legend:
      "FOLKLORE: Sägner om rörelse bland gravarna efter mörker och traditionella föreställningar om helig mark på natten. Besökare nämner köld, tystnad, skuggor mellan stenarna och tyngd — särskilt i äldre gravpartier och vid kyrkans medeltida murar.",
  },
  "borringekloster-slott": {
    shortDescription:
      "Rokokoslott från 1760-talet på forna benediktinerklostermark vid Börringesjön — upplöst efter reformationen; Skånsk historisk mystik med diskret folklore.",
    history:
      "Börringekloster i Svedala kommun växte fram som benediktinerkloster omkring 1100-talet. Efter reformationen försvann klosterbyggnaderna; 1582 omvandlade Görvel Fadersdotter Sparre platsen till adelsresidens. Nuvarande slott uppfördes på 1760-talet i rokokostil; tredje våningen tillkom på 1800-talet. Klosterviken, Börringesjön och Lindholmen ingår i det bredare landskapet.",
    legend:
      "Platsen marknadsförs sällan som Sveriges högljuddaste spökhotspot. Folklore talar om tyngd på forna klostermark, försvunnen helig plats under senare slott och suggestiv stämning i höstdimma och regn över sjön. Peter Ullgren ska ha vistats här 2004 i samband med skrivande om herrgårdsspöken — utan att det bevisar aktivitet.",
  },
  "frammegarden": {
    shortDescription:
      "Legendarisk spökgård i Värmland från Spökjakt S2 E6 — övernattningar där många gäster lämnar före midnatt.",
    history:
      "Frammegården är en 1700-tals hembygdsgård i Skillingmark, Eda kommun, förvaltad av hembygdsföreningen sedan donation 1941. Dokumenterade barnsdödlighet 1865 (difteri) förankrar tragedin; gården blev rikskänd genom Spökjakt säsong 2 avsnitt 6 (2020) efter tidigare Lundell-besök.",
    legend:
      "Gästbok och media: gråt, möbelljud, ljus, gestalter i fönster och vindsrädsla. Många övernattande gäster avbryter vistelsen före midnatt. Folklore om häxmark och «dödsrummet» med gungstol. Se originalutredningen i Familjen Lundells Spökjakt-spellista.",
    summary:
      "Värmländsk spökgård från Spökjakt — många övernattare lämnar före midnatt.",
  },
  "bogesunds-slott": {
    shortDescription:
      "Ikoniskt slott på Värmdö från Spökjakt S3 E6 — skuggor, fotsteg och ett av Sveriges mest omtalade hemsökta hus nära Stockholm.",
    history:
      "Bogesunds slott uppfördes på Värmdö för Ulrik Sparre på 1800-talet och används idag till konserter, guidningar och evenemang i skärgårdstradition.",
    legend:
      "Personal och besökare beskriver närvaro i torn och korridorer; Spökjakt utredde tornrum och salar — påståenden förblir folkloristiska. Se Familjen Lundells officiella Spökjakt-spellista.",
    summary: "Värmdöslott från Spökjakt — skuggor och fotsteg i torn och salar.",
  },
  "malilla-sanatorium": {
    shortDescription:
      "LEGENDARISKT övergivet tuberkulossanatorium — Spökjakt S3 E1 premiär bland bevarade salar och medicinsk mörker.",
    history:
      "Grundat på 1910-talet i Målilla, Småland; behandlade lungpatienter till nedläggning. Senare museum och guidade turer i bevarade byggnader.",
    legend:
      "Besökare beskriver tyngd, korridorsljud och vårdavdelningsfolklore; guider delar anekdoter. TV använde förfallna interiörer för stämning — inget bevisat paranormalt. Spökjakt S3 E1.",
    summary: "Övergivet sanatorium — Spökjakt S3 E1 bland bevarade vårdavdelningar.",
  },
  "osterbybruks-herrgard": {
    shortDescription:
      "LEGENDARISK Roslagsherregård — Spökjakt S2 E2 med seansbord, bland de starkaste tidiga TV-utredningarna.",
    history:
      "1700-talets järnbruksanläggning vid Österby bruk, Östhammar; koppling till familjerna De Geer och Grill. Förvaltas som kulturarv av Stiftelsen Österbybruks herrgård.",
    legend:
      "Långvariga rapporter om märklig aktivitet; ökänd seanskväll i Spökjakt där teamet avbröt natten. Återbesökt S6. Haunted Sweden skiljer folklore från TV-dramatik.",
    summary: "Roslags herrgård — Spökjakt S2 E2 och den ökända seanskvällen.",
  },
  "backaskogs-kloster": {
    shortDescription:
      "Medeltida kloster blev kungligt slott — Spökjakt S2 E5, LEGENDARISK skånsk historia och klostertradition.",
    history:
      "Cisterciensisk grund vid Fjälkinge (Kristianstad); senare kungligt gods och evenemangsplats med guidningar idag.",
    legend:
      "Spökberättelser kopplade till klosterbegravningar och adel; Spökjakt nattutredning i kloster- och slottsrum. Påståenden anekdotiska.",
    summary: "Bäckaskogs kloster och slott — Spökjakt S2 E5 i Skåne.",
  },
  "nasby-slott": {
    shortDescription:
      "Skånskt slotts hotell — Spökjakt S2 E3 med övernattning och klassiska svenska spökberättelser.",
    history:
      "Näsbyholms gods nära Skurup; lång adelshistoria; driver idag hotell och evenemang.",
    legend:
      "Hotellfolklore om ljud och närvaro i historiska flyglar; Spökjakt med utrustningssvep. Elegant fasad kontrasterar rapporterad tyngd — anekdotiskt.",
    summary: "Näsby slott — Spökjakt S2 E3 och hotellfolklore.",
  },
  "norrsvedje-gastgiveri": {
    shortDescription:
      "Historiskt skånskt gästgiveri — Spökjakt S3 E2 med knackningar, fotsteg och övernattningsfolklore.",
    history:
      "Traditionellt gästgiveri på landsbygden i Skåne med resvägars arv och karaktäristisk arkitektur.",
    legend:
      "Spökberättelser från personal och gäster; Spökjakt med nattinspelningar och intervjuer. Rapporter ej verifierade.",
    summary: "Skånskt gästgiveri — Spökjakt S3 E2 med knackningar och fotsteg.",
  },
  "blombacka-herrgard": {
    shortDescription:
      "Lantlig herrgård — Spökjakt S3 E4 med korridorsfolklore och återkommande oförklarliga rapporter.",
    history:
      "Herrgårdsmiljö från 1700–1800-talet i Blombacka-trakten; kan användas för privata evenemang.",
    legend:
      "Gestalter i korridorer, nattliga fotsteg och vita frun-archetyper; Spökjakt med EVP. Kontrollera tillträde före besök.",
    summary: "Blombacka herrgård — Spökjakt S3 E4 i korridorer.",
  },
  "toftaholm-herrgard": {
    shortDescription:
      "Legendariskt småländskt herrgårdshotell vid Vidöstern — över 600 års historia, spöket Mats, ökända rum 324 och en av Sveriges mest kända hemsökta övernattningar.",
    history:
      "DOKUMENTERAT: Toftaholms historia dokumenteras från 1389 och släkten Stenbock. Gustav Vasa sägs ha besökt godset; dagens huvudbyggnad från 1871 efter brand. Den Gyllene Abborren från 1640 är en av de äldsta bevarade delarna. Hotellet vid Vidöstern är populärt bland historie- och spökintresserade.",
    legend:
      "MATS (folklore): 1700-tals tjänare som älskade grevens dotter, försvann vid bröllopet och påträffades död på ett gästrum — graven vid Mats-stenen. RAPPORTER: fotsteg, köld, rum 324, manlig närvaro; hotellet beskriver Mats som vänlig ande. OMRÅDEN: rum 324, herrgården, Mats-stenen, Den Gyllene Abborren.",
    summary:
      "Toftaholm vid Vidöstern — Mats, rum 324 och ett av Sveriges mest kända hemsökta herrgårdshotell.",
  },
  "horle-herrgard": {
    shortDescription:
      "Ett av Smålands finaste herrgårdar från 1746 vid Lagan — Hörle bruks järnhistoria, karolinsk arkitektur och den vita fruns legend om Anna Margareta Lilliecreutz.",
    history:
      "DOKUMENTERAT: Hörle bruk grundades 1659 av Justus Baak. Herrgården utvecklades från tidigt 1700-tal av Anna Margareta Lilliecreutz och hennes makar och stod färdig 1746. Bengt Wilhelm Carlberg, Carl Hårleman och Johan Pasch knyts till byggnad och interiör. Byggnadsminne sedan 1992; omfattande restaurering på 2010-talet.",
    legend:
      "DEN VITA FRUN (folklore): Anna Margareta Lilliecreutz sägs vandra i vitt genom salar och korridorer och försvinna — en av Smålands mest kända herrgårdssägner. RAPPORTER: skuggfigur, fotsteg, knarrande, dörrar, närvaro på övre våningar. OMRÅDEN: huvudsal, övre plan, trapphus, park. Framtida Haunted Sweden: arkiv, EVP, nattfoto, dimma.",
    summary:
      "Hörle Herrgård vid Lagan — 1746 års Smålandsjuvel och den vita fruns legend i ett av landets bäst bevarade herrgårdsmiljöer.",
  },
  "vadstena-klosterhotell": {
    shortDescription:
      "Historiskt klosterhotell vid Vadstena kloster — birgittinskt moderkloster från 1300-talet, senare sjukhus och anstalt, nu en av Sveriges mest suggestiva övernattningar vid Vättern.",
    history:
      "DOKUMENTERAT: Vadstena kloster grundades som birgittinskt moderkloster efter heliga Birgitta; klosterliv på platsen dateras till 1300-talet. Dubbelkloster med munkar och nunnor fortgick till reformationen och upplöstes successivt efter 1527. Delar av anläggningen blev senare krigsmanshus, sjukhus, fängelse och mentalvård — sjukdom, isolering och död lager på lager. Flera medeltida byggnader ingår i dag i Vadstena Klosterhotell vid Lasarettsgatan 3, bland Sveriges äldsta bevarade profana miljöer i hotellform.",
    legend:
      "FOLKLORE OCH GÄSTRAPPORTER (ej verifierat paranormalt): Fotsteg i tomma korridorer, viskningar, känsla av att bli iakttagen och nattliga ljud — ibland kopplat till munkar eller nunnor i medeltida flyglar. SÄRSKILDA OMRÅDEN: forna klosterbyggnader, munksovsalar, nunnornas kapitelsal, gård och klostergång, sjukhus-/krigsmanshusdelar. STÄMNING: sten, ljus och Vätterns dimma — unik övernattning. Framtida Haunted Sweden-uppdrag: övernattning, EVP, nattfoto, personalintervjuer.",
    summary:
      "Vadstena Klosterhotell — övernatta i Birgittas moderkloster vid Vättern, med sjuhundra års historia från kloster till sjukhus och hotell.",
  },
  "kullaberg": {
    shortDescription:
      "Dramatisk skånsk halvö — Spökjakt S2 E4 med grottor, klippor, sägner och utomhusnattutredning.",
    history:
      "Kullabergs naturreservat (Höganäs kommun); Kullabergsgrottorna, fyr och bronsåldersarv i skyddat kustlandskap.",
    legend:
      "Ljus, röster och gestalter längs klipporna; vandrares obehag i grottor och dimma. Spökjakt med drönare och stigar på natten. Folklore ej bevisad.",
    summary: "Kullaberg — Spökjakt S2 E4 med grottor, klippor och nattliga svep.",
  },
  "amals-stadshotell": {
    shortDescription:
      "Byggnadsminnesförklarat stadshotell från 1905 i centrala Åmål — tre bränder på platsen, bevarade salar och korridorer, spökberättelser i pressen och en klassisk svensk hotellmysterium-övernattning.",
    history:
      "Åmåls stadshotell vid Kungsgatan 9 — bränder 1645, 1809 och 1902; uppfört 1903–1904, invigt 1905; byggnadsminne 1978; bevarade trapphus, festsal och matsalar.",
    legend:
      "Press och vittnen: rörliga dörrhandtag, bestick som faller, fotsteg, viskningar och köld i äldre delar — folklore, ej bevisad paranormal aktivitet.",
    summary:
      "Åmåls Stadshotell — klassiskt stadshotellmysterium i gamla stan med dokumenterad brandhistoria och lokala spöksägner.",
    safetyNote:
      "Aktivt stadshotell – boka endast via officiella kanaler. Respektera gäster, personal, brandskydd och nattlig tystnad. Historiska trappor och golv kan vara ojämna; följ hotellets anvisningar i stängda eller personalutrymmen.",
  },
  "overas-slott": {
    shortDescription:
      "Göteborgs palatsliknande Dickson-herregård i Örgryte — 1860-talets slott, engelsk park och legenden om Svarta damen (vittnesmål från 1924).",
    history:
      "Överås vid Danska vägen 20 — Dickson-palats från 1860-talet (Bulnois/Krüger), metodistseminarium från 1924, bevarade salar och engelsk park.",
    legend:
      "Svarta damen — svartklädd gestalt, fotsteg, korridorer; sägen om tragedi på 1800-talet. Folklore och vittnesmål, ej verifierat paranormalt.",
    summary:
      "Överås Slott — Göteborgs främsta spöklegender med Dickson-historia och Svarta damen.",
    safetyNote:
      "Privat herregård och eventlokal – betrakta fasad och park endast från allmänna vägar om du inte har bokning eller uttryckligt tillstånd. Gå inte in i byggnaden, på området efter stängning eller i avspärrade delar utan tillstånd. Respektera personal, gäster och grannar.",
  },
  "nyckelhalshuset": {
    shortDescription:
      "Göteborgs Nyckelhålshus (1903 jugend) — berömd spökskylt vid nyckelhålsentrén om en huvudlös \"Arthur Lowell\"; urban legend, ej verifierad historia.",
    history:
      "Nyckelhålshuset vid Sveagatan 2 i Linnéstaden, uppfört 1903 i jugendstil med nyckelhålsformad entré.",
    legend:
      "Skylt om huvudlös \"Arthur Lowell\" — sannolikt folklore kring Percival Lowell, juni 1909. Ej bevisat spöke.",
    summary:
      "Nyckelhålshuset — Göteborgs mest igenkännbara stads-spöklegender vid nyckelhålsporten.",
    safetyNote:
      "Aktivt flerfamiljshus – betrakta entré och spökskylt endast från allmän trottoar. Gå inte in i huset, blockera inte entrén eller stör boende. Håll låg volym, särskilt på natten.",
  },
  "hotel-eggers": {
    shortDescription:
      "Sveriges järnvägserahotell sedan 1859 vid Drottningtorget — sekelskifteslyx, spöket Ebba Eggers och folklore kring rum 397.",
    history:
      "Hôtel Eggers vid Drottningtorget — Jernvägshotellet 1859, Eggers-epoken, Ebba Eggers till 1948.",
    legend:
      "Ebba Eggers — vänligt spöke efter flygkrasch 1948; rum 397 och korridorer i gäst- och medieberättelser. Folklore.",
    summary:
      "Hôtel Eggers — Göteborgs klassiska spökhotell vid Centralstationen.",
    safetyNote:
      "Aktivt hotell – boka endast via officiella kanaler. Respektera gäster, personal, brandskydd och nattlig tystnad. Filma eller utred inte i korridorer eller andras rum utan tillstånd; önskemål om rum (t.ex. 397) beror på tillgång.",
  },
  "gathenhielmska-huset": {
    shortDescription:
      "Göteborgs 1740-tals träborgarhus vid Stigbergstorget — stadens första byggnadsminne, kopplat till kaparen Lars Gathenhielm och folklore om fantomhovar.",
    history:
      "Gathenhielmska huset 1743–1747, Busck/Gathe-familjen; Lars Gathenhielm död 1718; första byggnadsminnet i Göteborg 1943.",
    legend:
      "Lasse i Gatan — fantomhovar höstnätter från Onsala; ryttare i sägner. Folklore, ej bevisad aktivitet.",
    summary:
      "Gathenhielmska Huset — maritim spöklegender och 1700-tals autenticitet i Majorna.",
    safetyNote:
      "Byggnadsminnesmärkt hus och eventlokal – betrakta fasaden fritt från Stigbergstorget; gå endast in vid officiella öppningar, visningar eller bokade evenemang. Trespassera inte på tomten efter stängning eller stör grannar.",
  },
};

export function getSwedishContentForSlug(
  slug: string
): SwedishPlaceContent | undefined {
  return SWEDISH_BY_SLUG[slug];
}

export function getAllSwedishContentSlugs(): string[] {
  return Object.keys(SWEDISH_BY_SLUG);
}

export function getSwedishContentMap(): Readonly<
  Record<string, SwedishPlaceContent>
> {
  return SWEDISH_BY_SLUG;
}
