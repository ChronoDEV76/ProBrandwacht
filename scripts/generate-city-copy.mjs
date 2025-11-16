#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// 10 belangrijkste steden: amsterdam, rotterdam, den-haag, utrecht,
// eindhoven, tilburg, groningen, almere, breda, nijmegen.
const cityCopyData = {
  amsterdam: {
    slug: "amsterdam",
    name: "Amsterdam",
    metaTitle:
      "Brandwacht inhuren Amsterdam | Direct, eerlijk & rijksgediplomeerd",
    metaDescription:
      "Rijksgediplomeerde brandwacht in Amsterdam nodig? Snelle reacties, eerlijke tarieven en geen bemiddelingsmarge. Voor events, bouw en tijdelijke veiligheid. Plaats direct je opdracht.",
    h1: "Brandwacht inhuren in Amsterdam – direct, eerlijk & zonder bemiddelingsbureau",
    intro:
      "Direct rijksgediplomeerde brandwachten voor evenementen, bouw, horeca en tijdelijke veiligheid in Amsterdam. De stad draait op continue dynamiek: NDSM-werf, Westergas, AFAS Live, Ziggo Dome, de Zuidas, creatieve producties, verbouwingen en tijdelijke locaties. Daardoor is er regelmatig behoefte aan snelle, korte en betrouwbare inzet van brandwachten. Via dit platform huur je rechtstreeks een rijksgediplomeerde brandwacht (minimaal Manschap A/B) in. Geen bemiddelingsmarge, geen tussenpersonen, geen planningsbureau.",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Bekijk direct het uurtarief van de brandwacht + de platformfee.  
Eerlijk en duidelijk, zonder verborgen opslag.

## Waarom opdrachtgevers in Amsterdam voor zzp-brandwachten kiezen

- Snelle inzet bij events, horeca, bouw en producties  
- Eerlijke tarieven zonder bemiddelingsmarge  
- Elke brandwacht is minimaal rijksgediplomeerd Manschap A/B  
- Korte lijnen zorgen voor snelle opstart  
- Duidelijke afspraken, zonder onrealistische beloften  

## Veelgevraagde inzet in Amsterdam

**Evenementen & festivals**  
NDSM-werf, Westergas, AFAS Live, Ziggo Dome, RAI, Paradiso en Melkweg.  
Events vragen flexibele en snelle inzet, ideaal voor zelfstandige brandwachten.

**Bouw & renovatie (Zuidas, Noord, Oost, Centrum)**  
Toezicht bij las- en snijwerk, heetwerk, tijdelijke verbouwingen en nachtbezetting.

**Horeca & tijdelijke locaties**  
Pop-ups, filmsets, tijdelijke verhuringen, festivals, verbouwprojecten.

**Industrie & opslag (Westpoort)**  
Toezicht bij risicowerk, kortdurende reparaties, onderhoud en ad-hoc inzet.

## Hoe het werkt

1. Plaats je opdracht (locatie, tijden en eisen).  
2. Ontvang reacties van brandwachten met tarief en beschikbaarheid.  
3. Bevestig de inzet en regel het direct met de professional.  

Eerlijk, snel en zonder tussenpersonen.

## Indicatief tarief (Amsterdam)

| Component           | Bedrag        |
| ------------------- | ------------- |
| Uurtarief brandwacht | €38–€50       |
| Platformfee         | €4–€6         |
| **Totaal**          | **€42–€56/uur** |

Eerlijk tarief, zonder opslag en zonder verrassingen.

## Veelgestelde vragen

**Hoe snel zijn de reacties?**  
Vaak binnen enkele uren, afhankelijk van tijd en eisen.

**Zijn alle brandwachten gecertificeerd?**  
Ja, elke brandwacht is minimaal rijksgediplomeerd Manschap A/B.

**Werken brandwachten ook ’s avonds of ’s nachts?**  
Ja, zelfstandigen in Amsterdam zijn gewend aan wisselende diensten.

**Kan ik meerdere brandwachten tegelijk boeken?**  
Ja, via meerdere opdrachten of door meerdere professionals uit te nodigen.

## Call to action

Plaats je opdracht (vrijblijvend).  
Binnen enkele minuten geregeld. Jij houdt de regie.`,
    localCaseTitle: "Case: tijdelijk event op de NDSM-werf",
    localCaseBody:
      "Voor een tijdelijk evenement op de NDSM-werf werd extra toezicht gevraagd tijdens op- en afbouw. Binnen 3 uur reageerden meerdere rijksgediplomeerde brandwachten uit Amsterdam en directe omgeving. De opdrachtgever kon direct schakelen zonder bemiddelingsbureau, waardoor de inzet dezelfde dag gestart kon worden."
  },

  rotterdam: {
    slug: "rotterdam",
    name: "Rotterdam",
    metaTitle:
      "Brandwacht inhuren Rotterdam | Haven, bouw & events – direct & eerlijk",
    metaDescription:
      "Rijksgediplomeerde brandwacht in Rotterdam nodig? Direct schakelen met zzp-brandwachten voor haven, bouw, events en industrie. Transparant tarief, zonder bureau-opslag.",
    h1: "Brandwacht inhuren in Rotterdam – direct, eerlijk en zonder bureaumarge",
    intro:
      "Rotterdam draait op haven, bouw en evenementen: van Maasvlakte en Botlek tot Ahoy, De Kuip en de binnenstad. Voor heetwerk, onderhoudsstops, tijdelijke bouwprojecten en events is regelmatig extra brandwachtcapaciteit nodig. Via dit platform huur je rechtstreeks een rijksgediplomeerde brandwacht (minimaal Manschap A/B), zonder tussenkomst van een bemiddelingsbureau en zonder verborgen opslag.",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Je ziet vooraf het uurtarief van de brandwacht + de platformfee.  
Transparant en eerlijk – geen verrassingen achteraf.

## Waarom opdrachtgevers in Rotterdam voor zzp-brandwachten kiezen

- Sterk in haven, bouw en industrie  
- Geen bureaumarge, je betaalt het tarief van de professional  
- Elke brandwacht minimaal rijksgediplomeerd Manschap A/B  
- Snel schakelen bij spoedklussen en korte opdrachten  
- Eerlijke, transparante afspraken

## Veelgevraagde inzet in Rotterdam

**Haven & industrie (Botlek, Europoort, Maasvlakte)**  
Toezicht bij onderhoud, heetwerk, tijdelijke shutdowns en risicovolle werkzaamheden.

**Evenementen & grote publieksstromen**  
Ahoy, De Kuip, festivals op het Noordereiland, Coolsingel en tijdelijke locaties.

**Bouw & renovatie (Centrum, Kop van Zuid, Alexander)**  
Brandwacht-inzet bij las- en snijwerk, verbouwingen, daken en nachtbewaking.

## Hoe het werkt

1. Plaats je opdracht met locatie, tijden en type werkzaamheden.  
2. Beschikbare brandwachten uit regio Rotterdam reageren met tarief en beschikbaarheid.  
3. Jij kiest wie past bij jouw klus en bevestigt de inzet direct.

## Indicatief tarief (Rotterdam)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €38–€52       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€42–€58/uur** |

Tarief afhankelijk van dienstlengte, nacht/weekend en type locatie.

## Veelgestelde vragen

**Kunnen brandwachten in de haven terecht?**  
Ja, veel professionals hebben ervaring in haven- en industriële omgevingen.

**Zijn alle brandwachten gecertificeerd?**  
Ja, elke brandwacht is minimaal rijksgediplomeerd Manschap A/B.

**Kan ik snel iemand inzetten bij een spoedklus?**  
Bij duidelijke opdrachten reageren zzp-brandwachten vaak dezelfde dag.

## Call to action

Plaats vrijblijvend je opdracht voor Rotterdam of de havenregio.  
Je houdt zelf de regie over tarief, planning en keuze van de professional.`,
    localCaseTitle: "Case: kortdurende laswerkzaamheden op de Maasvlakte",
    localCaseBody:
      "Voor een reeks laswerkzaamheden op de Maasvlakte zocht een aannemer een extra brandwacht voor twee nachtdiensten. Via het platform reageerden meerdere zzp-brandwachten met havenervaring. De opdrachtgever koos zelf op basis van tarief en ervaring en kon zonder bureaumarge een passende professional boeken."
  },

  "den-haag": {
    slug: "den-haag",
    name: "Den Haag",
    metaTitle:
      "Brandwacht inhuren Den Haag | Evenementen, overheid & kust – direct geregeld",
    metaDescription:
      "Brandwacht in Den Haag of Scheveningen nodig? Direct contact met rijksgediplomeerde brandwachten voor events, overheidspanden en tijdelijke projecten. Eerlijke, transparante tarieven.",
    h1: "Brandwacht inhuren in Den Haag – transparant, direct en zonder omweg",
    intro:
      "Den Haag combineert overheid, internationale organisaties, events en kustlocaties. Van Scheveningen tot het World Forum en het Binnenhofgebied: regelmatig zijn extra brandwachten nodig voor evenementen, verbouwingen en tijdelijke veiligheidsmaatregelen. Via dit platform huur je rechtstreeks een rijksgediplomeerde brandwacht (minimaal Manschap A/B), zonder bureau-opslag en met eerlijke, transparante tarieven.",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Je ziet vooraf wat je betaalt: uurtarief + platformfee.  
Geen vaste pakketten, maar transparante prijzen per opdracht.

## Waarvoor worden brandwachten in Den Haag vaak ingezet?

**Evenementen & congressen**  
World Forum, Malieveld, city-events en congreslocaties vragen vaak flexibele brandwachtcapaciteit.

**Overheid & kantoren**  
Verbouwingen, tijdelijke installaties en brandwachten bij aangepaste vluchtroutes.

**Kust & horeca (Scheveningen)**  
Brandwacht bij strandpaviljoens, tijdelijke festivals, vuurwerkshows en op- en afbouw.

## Werkwijze

1. Je beschrijft kort de opdracht (locatie, datum, risico’s).  
2. Beschikbare brandwachten uit regio Den Haag reageren met tarief en beschikbaarheid.  
3. Jij kiest op basis van tarief, ervaring en planning.

## Indicatief tarief (Den Haag)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €38–€50       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€42–€56/uur** |

Afhankelijk van duur, nacht/weekend en type locatie.

## Veelgestelde vragen

**Zijn alle brandwachten rijksgediplomeerd?**  
Ja, minimaal Manschap A/B.

**Kunnen brandwachten ook protocollen van mijn organisatie volgen?**  
Ja, je maakt vooraf duidelijke afspraken over huisregels en procedures.

**Is inzet voor meerdere dagen mogelijk?**  
Ja, je kunt meerdere dagen of diensten afspreken met dezelfde professional.

## Call to action

Plaats direct je opdracht in Den Haag of Scheveningen.  
Je hebt snel zicht op beschikbare, rijksgediplomeerde brandwachten.`,
    localCaseTitle:
      "Case: congres met extra brandveiligheid bij het World Forum",
    localCaseBody:
      "Een congreslocatie in Den Haag zocht een extra brandwacht tijdens een meerdaags event met stands, tijdelijke elektra en extra publieksstromen. Via het platform vond de locatie een rijksgediplomeerde brandwacht die de volledige driedaagse kon draaien, zonder tussenkomst van een bemiddelingsbureau."
  },

  utrecht: {
    slug: "utrecht",
    name: "Utrecht",
    metaTitle:
      "Brandwacht inhuren Utrecht | Jaarbeurs, bouw & mkb – direct met de professional",
    metaDescription:
      "Rijksgediplomeerde brandwacht in Utrecht nodig? Ideaal voor Jaarbeurs-events, bouwprojecten en tijdelijke locaties. Eerlijke tarieven, geen bureaumarge.",
    h1: "Brandwacht inhuren in Utrecht – direct schakelen met rijksgediplomeerde professionals",
    intro:
      "Utrecht is een knooppunt voor events, kantoren en bouwprojecten. Jaarbeurs, stationsgebied, Leidsche Rijn en binnenstad vragen regelmatig om extra brandwachtcapaciteit. Via dit platform huur je direct een rijksgediplomeerde brandwacht (minimaal Manschap A/B), zonder bureau-opslag en met transparante tarieven.",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Zie meteen het uurtarief van de brandwacht en de platformfee.  
Zo weet je vooraf waar je aan toe bent.

## Veelgevraagde inzet in Utrecht

**Events & beurzen (Jaarbeurs, TivoliVredenburg)**  
Extra brandveiligheid bij stands, tijdelijke opbouw, backstage en publieksgebieden.

**Bouw & renovatie (Stationsgebied, Leidsche Rijn)**  
Brandwacht bij heetwerk, daken, afbouw en nachtbewaking.

**MKB & kantoren**  
Tijdelijke maatregelen bij verbouwingen, testopstellingen of beperkte vluchtwegen.

## Werkwijze

1. Plaats je opdracht met de basics: locatie, tijden, type werkzaamheden.  
2. Beschikbare brandwachten uit regio Utrecht reageren met hun tarief.  
3. Jij maakt de keuze en stemt details direct met de professional af.

## Indicatief tarief (Utrecht)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €38–€50       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€42–€56/uur** |

Nuchtere, transparante prijsopbouw.

## Veelgestelde vragen

**Kan ik dezelfde brandwacht meerdere dagen boeken?**  
Ja, zolang de professional beschikbaar is kun je afspraken voor meerdere dagen maken.

**Zijn het allemaal zzp’ers?**  
Ja, je schakelt direct met de zelfstandige brandwacht. Geen bureau ertussen.

**Is nacht- of weekendinzet mogelijk?**  
Ja, veel brandwachten draaien gewend onregelmatige diensten.

## Call to action

Plaats nu je opdracht in Utrecht of regio.  
Binnen korte tijd zie je welke rijksgediplomeerde brandwachten beschikbaar zijn.`,
    localCaseTitle: "Case: opbouw & afbouw bij beurs in de Jaarbeurs",
    localCaseBody:
      "Voor een beurs op de Jaarbeurs zocht een organisator één brandwacht voor opbouw en afbouw, inclusief toezicht op tijdelijk elektrisch materiaal. Via het platform vond hij een zzp-brandwacht die beide dagen kon draaien, met duidelijke afspraken over tijden en tarief."
  },

  eindhoven: {
    slug: "eindhoven",
    name: "Eindhoven",
    metaTitle:
      "Brandwacht inhuren Eindhoven | Hightech, events & bouw – direct geregeld",
    metaDescription:
      "Brandwacht in Eindhoven nodig? Rechtstreeks rijksgediplomeerde brandwachten voor Strijp-S, High Tech Campus, PSV-events en bouw. Eerlijke, transparante tarieven.",
    h1: "Brandwacht inhuren in Eindhoven – slim, transparant en zonder bureaumarge",
    intro:
      "Eindhoven is sterk in hightech, events en stedelijke ontwikkeling. Strijp-S, High Tech Campus, PSV-stadion en binnenstedelijke bouwprojecten vragen geregeld extra brandwachten. Via dit platform huur je direct een rijksgediplomeerde brandwacht (minimaal Manschap A/B), zonder omweg via een bureau.",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Je ziet in één keer het uurtarief + platformfee.  
Geen lange offertes of verborgen toeslagen.

## Veelgevraagde inzet in Eindhoven

**Hightech & innovatiecampus**  
Brandwacht bij testopstellingen, tijdelijke labs en bijzondere installaties.

**Events & stadionactiviteiten**  
Extra brandveiligheid bij events in en rond het PSV-stadion en Strijp-S.

**Bouw & renovatie**  
Heetwerk, daken, tijdelijke vluchtroutes en verbouwingen in kantoren en woonprojecten.

## Werkwijze

1. Omschrijf je opdracht en locatie.  
2. Zzp-brandwachten uit regio Eindhoven reageren met tarief en beschikbaarheid.  
3. Jij kiest wie past en spreekt direct de details af.

## Indicatief tarief (Eindhoven)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €38–€50       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€42–€56/uur** |

Afhankelijk van dienstlengte en moment (dag/avond/nacht).

## Veelgestelde vragen

**Zijn brandwachten bekend met hightech-omgevingen?**  
Veel professionals hebben ervaring met industrie, technologie en complexe installaties. Je kunt dit specifiek uitvragen.

**Kan ik meerdere brandwachten tegelijk boeken?**  
Ja, via meerdere uitnodigingen of duidelijk omschreven opdrachten.

## Call to action

Plaats vrijblijvend je opdracht in Eindhoven.  
Je houdt zelf de regie over selectie, tarief en planning.`,
    localCaseTitle:
      "Case: brandwacht bij testopstelling op de High Tech Campus",
    localCaseBody:
      "Een bedrijf op de High Tech Campus had tijdelijk extra brandveiligheid nodig bij een testopstelling met verhoogd risico. Via het platform vond men een rijksgediplomeerde brandwacht met industriële ervaring, die voor meerdere dagen kon worden ingezet."
  },

  tilburg: {
    slug: "tilburg",
    name: "Tilburg",
    metaTitle:
      "Brandwacht inhuren Tilburg | Events, bouw & logistiek – direct geregeld",
    metaDescription:
      "Brandwacht in Tilburg nodig? Direct contact met rijksgediplomeerde brandwachten voor evenementen, bouw en logistieke hallen. Eerlijke tarieven zonder bureaumarge.",
    h1: "Brandwacht inhuren in Tilburg – eerlijk tarief, korte lijnen",
    intro:
      "Tilburg combineert evenementen, logistiek en stedelijke ontwikkeling. Van de Spoorzone en Piushaven tot grote hallen aan de rand van de stad: extra brandwachtcapaciteit is regelmatig nodig. Via dit platform huur je rechtstreeks een rijksgediplomeerde brandwacht (minimaal Manschap A/B).",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Je ziet precies wat de inzet kost: tarief van de brandwacht + platformfee.  
Transparant en zonder verrassingen.

## Veelgevraagde inzet in Tilburg

**Events & Spoorzone**  
Brandwacht bij festivals, events en tijdelijke locaties in en rond de Spoorzone.

**Bouw & verbouw**  
Heetwerk, daken en verbouwingen bij woningen, kantoren en voorzieningen.

**Logistiek & opslag**  
Toezicht bij werkzaamheden in magazijnen en distributiecentra.

## Werkwijze

1. Plaats je opdracht met locatie, tijden en risico’s.  
2. Beschikbare zzp-brandwachten uit regio Tilburg reageren.  
3. Jij kiest de professional en maakt directe afspraken.

## Indicatief tarief (Tilburg)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €36–€48       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€40–€54/uur** |

## Veelgestelde vragen

**Kunnen brandwachten ook korte shifts draaien?**  
Ja, mits dat vooraf duidelijk is. Soms wordt een minimale afname afgesproken.

**Zijn alle brandwachten rijksgediplomeerd?**  
Ja, minimaal Manschap A/B.

## Call to action

Plaats een vrijblijvende opdracht in Tilburg.  
Je ziet snel wie beschikbaar is en wat het kost.`,
    localCaseTitle: "Case: extra brandwacht bij festival in de Spoorzone",
    localCaseBody:
      "Een festivalorganisatie in de Spoorzone zocht een extra brandwacht voor opbouw en showavonden. Via het platform kwam er snel reactie van meerdere brandwachten uit de regio, waarna één professional geselecteerd werd op basis van ervaring en tarief."
  },

  groningen: {
    slug: "groningen",
    name: "Groningen",
    metaTitle:
      "Brandwacht inhuren Groningen | Stad, zorg & industrie – direct geregeld",
    metaDescription:
      "Brandwacht in Groningen nodig? Direct rijksgediplomeerde brandwachten voor stad, zorginstellingen en industrie. Transparante tarieven, geen bureaumarge.",
    h1: "Brandwacht inhuren in Groningen – nuchter, transparant en direct",
    intro:
      "Groningen heeft een mix van zorg, onderwijs, evenementen en industrie. Vanuit de stad en omliggende dorpen is er geregeld vraag naar tijdelijke brandwachten. Via dit platform huur je direct een rijksgediplomeerde brandwacht (minimaal Manschap A/B), zonder tussenkomst van een traditioneel bureau.",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Je ziet direct het tarief van de professional en de platformfee.  
Nuchter en duidelijk.

## Veelgevraagde inzet in Groningen

**Zorg & onderwijs**  
Brandwacht bij verbouwingen, tijdelijke afzettingen of aangepaste vluchtroutes.

**Evenementen & cultuur**  
Events in de binnenstad, op campussen en bij culturele locaties.

**Industrie & opslag**  
Toezicht bij heetwerk, onderhoud en tijdelijke aanpassingen.

## Werkwijze

1. Omschrijf je opdracht (locatie, type werk, tijdstip).  
2. Beschikbare brandwachten uit regio Groningen reageren.  
3. Jij maakt de keuze en spreekt direct alles af.

## Indicatief tarief (Groningen)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €36–€48       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€40–€54/uur** |

## Veelgestelde vragen

**Werken brandwachten ook buiten de stad?**  
Ja, veel professionals rijden ook naar omliggende dorpen en industrieterreinen.

**Kan ik vaste dagen afspreken?**  
Ja, zolang de professional beschikbaar is, kun je langere trajecten afspreken.

## Call to action

Plaats je opdracht in Groningen of omgeving.  
Binnen korte tijd zie je welke rijksgediplomeerde brandwachten kunnen aansluiten.`,
    localCaseTitle: "Case: verbouwing bij zorginstelling in Groningen",
    localCaseBody:
      "Een zorginstelling in Groningen had tijdens een verbouwing tijdelijk aangepaste vluchtroutes. Via het platform vonden zij een brandwacht die over meerdere dagen de kritieke uren kon afdekken, met duidelijke afspraken over tijden en verantwoordelijkheden."
  },

  almere: {
    slug: "almere",
    name: "Almere",
    metaTitle:
      "Brandwacht inhuren Almere | Nieuwbouw, events & kantoren – direct geregeld",
    metaDescription:
      "Brandwacht in Almere nodig? Direct schakelen met rijksgediplomeerde zzp-brandwachten voor nieuwbouw, events en kantoren. Eerlijke tarieven, geen bureaumarge.",
    h1: "Brandwacht inhuren in Almere – transparante inzet voor nieuwbouw en events",
    intro:
      "Almere groeit snel in nieuwbouw, kantoren en events. Bij opleveringen, verbouwingen en tijdelijke evenementen is vaak tijdelijk extra brandveiligheid nodig. Via dit platform huur je rechtstreeks een rijksgediplomeerde brandwacht (minimaal Manschap A/B).",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Je ziet vooraf wat je betaalt, zonder verborgen opslag.

## Veelgevraagde inzet in Almere

**Nieuwbouw & oplevering**  
Brandwacht rond opleveringen, testmomenten en tijdelijke installaties.

**Events & openbare ruimte**  
Brandveiligheid bij lokale festivals, markten en tijdelijke podia.

**Kantoren & bedrijfsverzamelgebouwen**  
Extra toezicht bij verbouwingen of tijdelijke beperking van vluchtroutes.

## Werkwijze

1. Plaats je opdracht met locatie en tijden.  
2. Beschikbare brandwachten uit Almere en omgeving reageren.  
3. Jij kiest wie het beste past en maakt afspraken.

## Indicatief tarief (Almere)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €36–€48       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€40–€54/uur** |

## Veelgestelde vragen

**Kunnen brandwachten ook naar omliggende plaatsen rijden?**  
Ja, veel professionals zijn actief in Almere én regio (bijv. richting Amsterdam of ’t Gooi).

## Call to action

Plaats vrijblijvend je opdracht in Almere.  
Je ziet snel wie beschikbaar is en tegen welk tarief.`,
    localCaseTitle:
      "Case: brandwacht bij oplevering van een nieuwbouwcomplex",
    localCaseBody:
      "Bij de oplevering van een groot nieuwbouwcomplex in Almere was tijdelijk extra brandveiligheid nodig tijdens testen en rondleidingen. Via het platform werd een rijksgediplomeerde brandwacht geboekt die meerdere dagen aanwezig was tijdens de kritieke uren."
  },

  breda: {
    slug: "breda",
    name: "Breda",
    metaTitle:
      "Brandwacht inhuren Breda | Evenementen, horeca & bouw – direct met zzp",
    metaDescription:
      "Brandwacht in Breda nodig? Direct contact met rijksgediplomeerde zzp-brandwachten voor events, horeca en bouw. Transparante tarieven, zonder bemiddelingsbureau.",
    h1: "Brandwacht inhuren in Breda – eerlijk tarief, direct contact",
    intro:
      "Breda is sterk in evenementen en horeca, met daarnaast veel bouw- en renovatieprojecten. Vanaf het centrum tot evenementenlocaties en bedrijventerreinen is er regelmatig behoefte aan extra brandwachten. Via dit platform huur je direct een rijksgediplomeerde brandwacht (minimaal Manschap A/B), zonder bureaumarge.",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Je ziet vooraf het tarief van de brandwacht en de platformfee.

## Veelgevraagde inzet in Breda

**Evenementen & festivals**  
Extra brandveiligheid bij stadsfestivals, tentconstructies en tijdelijke podia.

**Horeca & nachtleven**  
Brandwachten bij verbouwingen, tijdelijke aanpassingen en bijzondere evenementen.

**Bouw & renovatie**  
Heetwerk, dakwerkzaamheden en verbouwingen in en rond de stad.

## Werkwijze

1. Omschrijf kort je opdracht.  
2. Zzp-brandwachten uit regio Breda reageren met tarief en beschikbaarheid.  
3. Jij kiest en maakt direct afspraken, zonder tussenpersoon.

## Indicatief tarief (Breda)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €36–€48       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€40–€54/uur** |

## Veelgestelde vragen

**Kan ik last-minute iemand boeken?**  
Dat hangt af van de beschikbaarheid, maar bij duidelijke opdrachten reageren brandwachten vaak snel.

## Call to action

Plaats nu je opdracht in Breda.  
Je houdt zelf de regie over wie je inhuurt en tegen welk tarief.`,
    localCaseTitle: "Case: extra brandwacht bij stadsfestival",
    localCaseBody:
      "Een organisator van een stadsfestival in Breda zocht een extra brandwacht tijdens twee avonden. Via het platform werden meerdere reacties ontvangen en kon de organisator een professional kiezen op basis van tarief en ervaring met evenementen."
  },

  nijmegen: {
    slug: "nijmegen",
    name: "Nijmegen",
    metaTitle:
      "Brandwacht inhuren Nijmegen | Events, zorg & bouw – direct geregeld",
    metaDescription:
      "Brandwacht in Nijmegen nodig? Direct contact met rijksgediplomeerde brandwachten voor Vierdaagse-events, zorg en bouw. Eerlijke, transparante tarieven.",
    h1: "Brandwacht inhuren in Nijmegen – transparant en zonder bureaumarge",
    intro:
      "Nijmegen kent grote events, zorginstellingen en een groeiende bouwopgave. Rond de Vierdaagse, stadsfeesten en verbouwingen is regelmatig extra brandwachtcapaciteit nodig. Via dit platform huur je direct een rijksgediplomeerde brandwacht (minimaal Manschap A/B).",
    body: `## Tariefcalculator

[CONVERSIECALCULATOR HIER LADEN]

Transparant inzicht in kosten: tarief van de brandwacht + platformfee.

## Veelgevraagde inzet in Nijmegen

**Events & Vierdaagseperiode**  
Extra brandveiligheid bij tijdelijke podia, tenten en publieksstromen.

**Zorg & onderwijs**  
Brandwacht bij verbouwingen en tijdelijke aanpassingen aan vluchtroutes.

**Bouw & renovatie**  
Heetwerk, daken en verbouwingen in en rond de stad.

## Werkwijze

1. Plaats kort je opdracht.  
2. Beschikbare zzp-brandwachten uit regio Nijmegen reageren.  
3. Jij kiest wie past en stemt direct alles af.

## Indicatief tarief (Nijmegen)

| Component            | Bedrag        |
| -------------------- | ------------- |
| Uurtarief brandwacht | €36–€48       |
| Platformfee          | €4–€6         |
| **Totaal**           | **€40–€54/uur** |

## Veelgestelde vragen

**Zijn alle brandwachten rijksgediplomeerd?**  
Ja, minimaal Manschap A/B.

**Kan ik meerdere dagen vastleggen?**  
Ja, zolang de professional beschikbaar is, kun je meerdere dagen of diensten boeken.

## Call to action

Plaats vrijblijvend je opdracht in Nijmegen.  
Je ziet snel welke rijksgediplomeerde brandwachten kunnen aansluiten.`,
    localCaseTitle: "Case: evenement tijdens de Vierdaagsefeesten",
    localCaseBody:
      "Een horeca-exploitant in Nijmegen had tijdens de Vierdaagsefeesten een tijdelijk terras en podium. Via het platform werd een brandwacht geboekt die meerdere avonden aanwezig was, met duidelijke afspraken over werktijden en taken."
  }
};

const header = `// AUTO-GENERATED BY scripts/generate-city-copy.mjs
// City-specific marketing copy for brandwacht-inhuren pages.
// Pas gerust handmatig aan als je wilt fine-tunen.

export type CityCopy = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  body: string;
  localCaseTitle: string;
  localCaseBody: string;
};

export const cityCopy: Record<string, CityCopy> = `;

const fileContent =
  header + JSON.stringify(cityCopyData, null, 2) + ";\n";

const targetPath = resolve(process.cwd(), "lib", "city-copy.ts");
writeFileSync(targetPath, fileContent, "utf8");
console.log("✅ lib/city-copy.ts gegenereerd op", targetPath);

