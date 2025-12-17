import type { CitySlug } from './city-data'
import { DEFAULT_TARIFFS, type Range } from './tariffs'

export type CityCopy = {
  h1: string
  intro: string
  metaTitle: string
  metaDescription: string
  body: string
  localCaseTitle?: string
  localCaseBody?: string
}

const formatEuroRange = (range?: Range) => (range ? `€${range.min}–€${range.max}` : '€n.t.b.')

const resolveStandardRange = (city: CitySlug) =>
  formatEuroRange(DEFAULT_TARIFFS[city]?.standaard ?? DEFAULT_TARIFFS.industrie.standaard)

const resolveIndustryRange = (city: CitySlug) =>
  formatEuroRange(
    DEFAULT_TARIFFS[city]?.industrie ?? DEFAULT_TARIFFS.industrie?.industrie ?? DEFAULT_TARIFFS.industrie.standaard,
  )

export const cityCopy: Partial<Record<CitySlug, CityCopy>> = {
  amsterdam: {
    h1: 'Brandwacht inhuren in Amsterdam',
    intro:
      'In Amsterdam heb je brandwachten nodig die gewend zijn aan tempo, evenementen en tijdelijke locaties. ProBrandwacht helpt je snel een passende zzp-brandwacht of klein team te vinden, zonder ingewikkelde tussenlagen.',
    metaTitle:
      'Brandwacht inhuren Amsterdam – zzp-brandwachten voor events, bouw en industrie | ProBrandwacht.nl',
    metaDescription:
      'Zoek je een brandwacht in Amsterdam? Via ProBrandwacht vind je rijksgediplomeerde zzp-brandwachten voor evenementen, bouw en industriële inzet. Nuchtere, eerlijke afspraken.',
    body: `## Indicatief tarief in Amsterdam

De meeste zzp-brandwachten in Amsterdam werken in de praktijk met uurtarieven tussen:

- **${resolveStandardRange('amsterdam')} per uur** bij evenementen en bouw
- **${resolveIndustryRange('amsterdam')} per uur** bij industriële inzet of nacht/weekend

De exacte prijs hangt af van duur van de klus, risico, tijdstip en reistijd. Tariefafspraken maak je altijd rechtstreeks met de professional of het team. ProBrandwacht kan desgewenst meedenken over een passend voorstel.

## Waarom opdrachtgevers in Amsterdam voor zzp-brandwachten kiezen

- Sterk in evenementen, podiumbouw en tijdelijke locaties
- Elke brandwacht minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over tijden, taken en aanspreekpunt
- Heldere, toetsbare communicatie over tarief en bereikbaarheid
- Mogelijkheid om vaste gezichten terug te laten komen bij herhaalopdrachten

## Veelgevraagde inzet in Amsterdam

- Toezicht bij evenementen op NDSM, ArenA-gebied en binnenstad
- Brandwacht bij festivals, clubnachten en tijdelijke pop-up locaties
- Bouw- en renovatieprojecten in hoogbouw en binnenstedelijke gebieden
- Toezicht tijdens tijdelijke afsluitingen, nachtwerk en ombouwmomenten`,
    localCaseTitle: 'Voorbeeld: brandwacht op NDSM-terrein',
    localCaseBody:
      'Een opdrachtgever had kortdurend toezicht nodig bij een evenement op het NDSM-terrein. Binnen korte tijd is een kleine ploeg zzp-brandwachten geregeld die het terrein goed kenden, met duidelijke afspraken over op- en afbouw, publiekstijden en nazorg. Eén aanspreekpunt, heldere uurtarieven en dezelfde gezichten bij vervolgopdrachten.'
  },

  rotterdam: {
    h1: 'Brandwacht inhuren in Rotterdam',
    intro:
      'Rotterdam vraagt om brandwachten die gewend zijn aan haven, industrie en grote bouwprojecten. Via ProBrandwacht vind je zzp-brandwachten die hun weg kennen in deze omgeving.',
    metaTitle:
      'Brandwacht inhuren Rotterdam – zzp-brandwachten voor haven, bouw en industrie | ProBrandwacht.nl',
    metaDescription:
      'Brandwacht nodig in Rotterdam? ProBrandwacht verbindt je met rijksgediplomeerde zzp-brandwachten voor haven, bouw en industriële inzet. Eerlijke, eerlijke afspraken.',
    body: `## Indicatief tarief in Rotterdam

In en rond Rotterdam liggen de meeste uurtarieven van zzp-brandwachten grofweg op:

- **${resolveStandardRange('rotterdam')} per uur** voor bouw- en renovatiewerk
- **${resolveIndustryRange('rotterdam')} per uur** bij haven- en industriële inzet (bijv. terminals, besloten ruimten)

Het uiteindelijke tarief spreek je altijd samen af met de professional, op basis van risico, duur van de opdracht en werktijden. Geen standaard pakketten, maar maatwerk per klus.

## Waarom opdrachtgevers in Rotterdam voor zzp-brandwachten kiezen

- Sterke ervaring in haven, bouw en industriële omgevingen
- Minimaal rijksgediplomeerd Manschap A/B
- Korte lijnen: direct contact met de uitvoerende brandwacht of ploegleider
- Nuchtere afspraken, vastgelegd vóór de inzet
- Mogelijkheid om vaste ploegen in te plannen bij terugkerend werk

## Veelgevraagde inzet in Rotterdam

- Haven- en industriewerk (Botlek, Europoort, Maasvlakte)
- Toezicht bij heetwerk, onderhoudstops en tijdelijke shutdowns
- Brandwacht tijdens renovaties en verbouwingen in de stad
- Extra toezicht bij evenementen, scheepsbezoeken en publieksactiviteiten`,
    localCaseTitle: 'Voorbeeld: toezicht bij onderhoud in de haven',
    localCaseBody:
      'Voor een onderhoudsperiode in de haven zocht een opdrachtgever meerdere brandwachten die gewend zijn aan industriële procedures. Er is een klein team samengesteld dat in shifts draaide, met duidelijke afspraken over taken, rapportage en bereikbaarheid buiten kantoortijden. Geen onnodige lagen, wel een vast aanspreekpunt.'
  },

  'den-haag': {
    h1: 'Brandwacht inhuren in Den Haag',
    intro:
      'In Den Haag en omstreken gaat het vaak om combinaties van evenementen, overheidslocaties en binnenstedelijke bouw. ProBrandwacht helpt je aan zzp-brandwachten die hiermee om kunnen gaan.',
    metaTitle:
      'Brandwacht inhuren Den Haag – zzp-brandwachten voor events en bouw | ProBrandwacht.nl',
    metaDescription:
      'Brandwacht nodig in Den Haag? Via ProBrandwacht huur je rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en tijdelijke projecten. Heldere, nuchtere afspraken.',
    body: `## Indicatief tarief in Den Haag

De meeste zzp-brandwachten in Den Haag werken met:

- **${resolveStandardRange('den-haag')} per uur** voor evenementen en bouw
- **${resolveIndustryRange('den-haag')} per uur** bij zwaardere of meer verantwoordelijke inzet

We bekijken per aanvraag wat passend is. Jij bespreekt het tarief rechtstreeks met de professional; ProBrandwacht kan helpen om de verwachtingen aan beide kanten helder te maken.

## Waarom opdrachtgevers in Den Haag voor zzp-brandwachten kiezen

- Ervaring met (semi-)overheidslocaties en protocollen
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over toegang, beveiliging en rapportage
- Flexibel opschalen bij piekdrukte of last-minute wijzigingen

## Veelgevraagde inzet in Den Haag

- Evenementen rondom Binnenhof, Plein en strandlocaties
- Renovatie en verbouw van kantoren en publieke gebouwen
- Toezicht bij tijdelijke installaties en evenementenstructuren`,
    localCaseTitle: 'Voorbeeld: tijdelijke inzet bij renovatie van een kantoorlocatie',
    localCaseBody:
      'Bij een renovatieproject in het Haagse centrum zocht de opdrachtgever een brandwacht die gewend was aan werken in een pand dat deels in gebruik bleef. Er zijn duidelijke afspraken gemaakt over werktijden, looproutes, sleutelbeheer en contactmomenten met de uitvoerder. Dezelfde professional keerde meerdere weken terug voor continuïteit.'
  },

  utrecht: {
    h1: 'Brandwacht inhuren in Utrecht',
    intro:
      'Utrecht heeft een mix van evenementen, binnenstedelijke bouw en logistieke hubs. ProBrandwacht koppelt je aan zzp-brandwachten die hier dagelijks mee werken.',
    metaTitle:
      'Brandwacht inhuren Utrecht – zzp-brandwachten voor evenementen en bouw | ProBrandwacht.nl',
    metaDescription:
      'Zoek je een brandwacht in Utrecht? ProBrandwacht verbindt je met rijksgediplomeerde zzp-brandwachten voor evenementen, bouwprojecten en logistieke locaties.',
    body: `## Indicatief tarief in Utrecht

Gebruikelijk liggen uurtarieven van zzp-brandwachten in Utrecht rond:

- **${resolveStandardRange('utrecht')} per uur** bij evenementen en reguliere bouw
- **${resolveIndustryRange('utrecht')} per uur** bij complexere inzet of onregelmatige uren

Het tarief wordt vooraf afgestemd tussen jou en de brandwacht. Geen standaardpakket, maar een afspraak die past bij het werk en de verantwoordelijkheid.

## Waarom opdrachtgevers in Utrecht voor zzp-brandwachten kiezen

- Ervaring met binnenstedelijke projecten en drukke publieksstromen
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke communicatie over planning, bereikbaarheid en overdrachten
- Geschikt voor zowel korte klussen als langere trajecten

## Veelgevraagde inzet in Utrecht

- Toezicht bij evenementen in en rond de binnenstad
- Brandwacht bij verbouw- en renovatieprojecten
- Extra inzet bij logistieke hubs en distributielocaties`,
    localCaseTitle: 'Voorbeeld: evenement op een binnenstedelijke locatie',
    localCaseBody:
      'Voor een tijdelijk evenement in de Utrechtse binnenstad is een brandwacht ingezet die ervaring had met zowel opbouw- als publieksuren. Afgesproken is wie het aanspreekpunt was voor de gemeente en de organisatie, welke checks er voor aanvang gedaan werden en hoe bevindingen werden teruggekoppeld.'
  },

  eindhoven: {
    h1: 'Brandwacht inhuren in Eindhoven',
    intro:
      'Eindhoven combineert techniek, industrie en evenementen. ProBrandwacht koppelt je aan zzp-brandwachten die gewend zijn aan dit soort omgevingen.',
    metaTitle:
      'Brandwacht inhuren Eindhoven – zzp-brandwachten voor industrie en events | ProBrandwacht.nl',
    metaDescription:
      'Brandwacht nodig in Eindhoven? Vind rijksgediplomeerde zzp-brandwachten voor industriële inzet, evenementen en bouwprojecten via ProBrandwacht.',
    body: `## Indicatief tarief in Eindhoven

In Eindhoven werken zzp-brandwachten meestal met:

- **${resolveStandardRange('eindhoven')} per uur** voor reguliere inzet bij bouw en evenementen
- **${resolveIndustryRange('eindhoven')} per uur** bij technische of industriële klussen

We kijken per opdracht naar wat passend is. Jij stemt het uurtarief direct af met de professional, op basis van werkzaamheden, duur en werktijden.

## Waarom opdrachtgevers in Eindhoven voor zzp-brandwachten kiezen

- Aansluiting bij technische en industriële bedrijven
- Minimaal rijksgediplomeerd Manschap A/B
- Nuchtere afspraken, duidelijk vastgelegd vooraf
- Flexibel inzetbaar bij zowel korte klussen als langere projecten

## Veelgevraagde inzet in Eindhoven

- Toezicht bij events op Strijp en in de binnenstad
- Brandwacht bij renovaties en verbouwingen
- Industriële inzet bij onderhoud, heetwerk en tijdelijke stops`,
    localCaseTitle: 'Voorbeeld: inzet bij technisch evenement',
    localCaseBody:
      'Een organisator in Eindhoven zocht een brandwacht die zowel met publiek als techniek uit de voeten kon. Er is gekozen voor een zzp-brandwacht met ervaring in evenementen en basiskennis van technische installaties, met vooraf duidelijk afgestemde taken en uurtarief.'
  },

  tilburg: {
    h1: 'Brandwacht inhuren in Tilburg',
    intro:
      'Tilburg kent grote evenementen en stevige logistiek. ProBrandwacht helpt je aan zzp-brandwachten die hiermee overweg kunnen.',
    metaTitle:
      'Brandwacht inhuren Tilburg – zzp-brandwachten voor evenementen en logistiek | ProBrandwacht.nl',
    metaDescription:
      'Brandwacht nodig in Tilburg? Huur rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en logistieke locaties via ProBrandwacht.',
    body: `## Indicatief tarief in Tilburg

De meeste zzp-brandwachten in Tilburg rekenen:

- **${resolveStandardRange('tilburg')} per uur** bij evenementen en bouw
- **${resolveIndustryRange('tilburg')} per uur** bij nachtwerk of hogere risico’s

Het tarief spreek je vooraf samen af. Daarmee weet je waar je aan toe bent voordat de inzet start.

## Waarom opdrachtgevers in Tilburg voor zzp-brandwachten kiezen

- Ervaring met grote evenementen en kermisperioden
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over aanwezigheid, taken en rapportage
- Mogelijkheid om dezelfde mensen terug te vragen bij vervolgopdrachten

## Veelgevraagde inzet in Tilburg

- Toezicht bij evenementen en festivals
- Brandwacht bij verbouw, renovaties en tijdelijke locaties
- Extra beveiliging van brandveiligheid bij logistieke hubs`,
    localCaseTitle: 'Voorbeeld: inzet rondom een festivalweek',
    localCaseBody:
      'Bij een festivalperiode in Tilburg zocht de organisatie een kleine, vaste ploeg brandwachten. Er is een team samengesteld dat meerdere dagen aanwezig was, met vaste tijden, duidelijke taken en één aanspreekpunt voor de organisatie.'
  },

  groningen: {
    h1: 'Brandwacht inhuren in Groningen',
    intro:
      'In Groningen draait het vaak om evenementen, zorglocaties en projecten in en rond de stad. ProBrandwacht helpt je passende zzp-brandwachten te vinden.',
    metaTitle:
      'Brandwacht inhuren Groningen – zzp-brandwachten voor events en projecten | ProBrandwacht.nl',
    metaDescription:
      'Brandwacht zoeken in Groningen? Via ProBrandwacht huur je rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en andere projecten.',
    body: `## Indicatief tarief in Groningen

In Groningen liggen uurtarieven voor zzp-brandwachten meestal rond:

- **${resolveStandardRange('groningen')} per uur** bij reguliere inzet
- **${resolveIndustryRange('groningen')} per uur** bij complexere of onregelmatige inzet

De exacte prijs wordt vooraf besproken tussen jou en de professional. Geen verrassingen achteraf.

## Waarom opdrachtgevers in Groningen voor zzp-brandwachten kiezen

- Ervaring met regionale evenementen en grotere projecten
- Minimaal rijksgediplomeerd Manschap A/B
- Heldere afspraken over planning en bereikbaarheid
- Flexibel in te zetten voor korte en langere trajecten

## Veelgevraagde inzet in Groningen

- Evenementen in de binnenstad en op campussen
- Brandwacht bij verbouwingen en renovaties
- Toezicht bij tijdelijke locaties en opslag`,
    localCaseTitle: 'Voorbeeld: meerdaagse inzet bij een binnenstadsevenement',
    localCaseBody:
      'Een organisator in Groningen had meerdere dagen achter elkaar brandwacht nodig. Er is een kleine ploeg samengesteld die in shifts werkte, met vaste overdrachtsmomenten en duidelijke afspraken over rapportage aan de organisatie.'
  },

  almere: {
    h1: 'Brandwacht inhuren in Almere',
    intro:
      'Almere groeit hard en heeft veel tijdelijke projecten en evenementen. ProBrandwacht koppelt je aan zzp-brandwachten die daarin meebewegen.',
    metaTitle:
      'Brandwacht inhuren Almere – zzp-brandwachten voor groeiende stad en projecten | ProBrandwacht.nl',
    metaDescription:
      'Brandwacht nodig in Almere? Huur rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en tijdelijke projecten via ProBrandwacht.',
    body: `## Indicatief tarief in Almere

Gemiddeld werken zzp-brandwachten in Almere met:

- **${resolveStandardRange('almere')} per uur** voor standaard inzet
- **${resolveIndustryRange('almere')} per uur** bij complexere of onregelmatige klussen

Het uurtarief wordt vooraf afgestemd. Jij weet waar je aan toe bent, de professional weet wat er van hem of haar verwacht wordt.

## Waarom opdrachtgevers in Almere voor zzp-brandwachten kiezen

- Meebewegen met een snelgroeiende stad en nieuwe projecten
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke, eenvoudige afspraken zonder onnodige lagen
- Snel schakelen bij nieuwe projecten of wijzigingen in de planning

## Veelgevraagde inzet in Almere

- Toezicht bij evenementen en publieksactiviteiten
- Brandwacht bij nieuwbouw- en afbouwprojecten
- Extra toezicht bij tijdelijke of seizoensgebonden locaties`,
    localCaseTitle: 'Voorbeeld: brandwacht bij nieuwbouwproject',
    localCaseBody:
      'Voor een nieuwbouwproject in Almere is een zzp-brandwacht ingezet tijdens kritieke fases van de afbouw. Er zijn duidelijke afspraken gemaakt over werktijden, alarmering en rapportage aan de uitvoerder. Na oplevering is dezelfde professional nog kort ingezet bij nazorgwerkzaamheden.'
  },

  breda: {
    h1: 'Brandwacht inhuren in Breda',
    intro:
      'In Breda draait veel om evenementen, horeca en bouw. ProBrandwacht helpt je snel een passende zzp-brandwacht te vinden.',
    metaTitle:
      'Brandwacht inhuren Breda – zzp-brandwachten voor events en bouw | ProBrandwacht.nl',
    metaDescription:
      'Brandwacht huren in Breda? Vind rijksgediplomeerde zzp-brandwachten voor evenementen, bouw en andere projecten via ProBrandwacht.',
    body: `## Indicatief tarief in Breda

In Breda liggen de meeste uurtarieven van zzp-brandwachten rond:

- **${resolveStandardRange('breda')} per uur** bij evenementen en bouw
- Met mogelijke toeslagen bij nachtwerk of korte, eenmalige klussen

Tariefafspraken maak je rechtstreeks met de professional. Zo is voor iedereen duidelijk wat er tegenover de inzet staat.

## Waarom opdrachtgevers in Breda voor zzp-brandwachten kiezen

- Ervaring met evenementen en een levendige binnenstad
- Minimaal rijksgediplomeerd Manschap A/B
- Nuchtere afspraken over uren, taken en bereikbaarheid
- Mogelijkheid om bij herhaalopdrachten dezelfde gezichten in te plannen

## Veelgevraagde inzet in Breda

- Toezicht bij festivals, horeca-evenementen en publieksactiviteiten
- Brandwacht bij verbouwingen en renovaties
- Extra toezicht bij tijdelijke locaties en opslag`,
    localCaseTitle: 'Voorbeeld: inzet tijdens een stadsfestival',
    localCaseBody:
      'Tijdens een stadsfestival in Breda is een brandwacht ingezet die bekend was met de binnenstad en de locatie. Taken, aanmelding en afstemming met beveiliging zijn vooraf helder doorgenomen, zodat de organisatie één aanspreekpunt had voor de brandveiligheid.'
  },

  nijmegen: {
    h1: 'Brandwacht inhuren in Nijmegen',
    intro:
      'In Nijmegen gaat het vaak om evenementen, seizoensdrukte en projecten in en rond de stad. ProBrandwacht helpt je aan zzp-brandwachten die dat aankunnen.',
    metaTitle:
      'Brandwacht inhuren Nijmegen – zzp-brandwachten voor events en projecten | ProBrandwacht.nl',
    metaDescription:
      'Brandwacht nodig in Nijmegen? Huur rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en andere projecten via ProBrandwacht.',
    body: `## Indicatief tarief in Nijmegen

De meeste zzp-brandwachten in Nijmegen werken met:

- **${resolveStandardRange('nijmegen')} per uur** bij reguliere inzet
- **${resolveIndustryRange('nijmegen')} per uur** bij drukke periodes of complexere inzet

Het tarief is altijd onderdeel van de afspraak vooraf, zodat je niet voor verrassingen komt te staan.

## Waarom opdrachtgevers in Nijmegen voor zzp-brandwachten kiezen

- Ervaring met grote evenementen en seizoenspieken
- Minimaal rijksgediplomeerd Manschap A/B
- Heldere, nuchtere afspraken over wie wat doet en wanneer
- Mogelijkheid om terugkerende inzet goed in te plannen

## Veelgevraagde inzet in Nijmegen

- Evenementen en drukke publieksmomenten in en rond de stad
- Brandwacht bij verbouwingen, tijdelijke locaties en opslag
- Extra toezicht tijdens piekperiodes (bijv. grote evenementen of acties)`,
    localCaseTitle: 'Voorbeeld: inzet rondom een druk evenement',
    localCaseBody:
      'Tijdens een drukke evenementenweek in Nijmegen was extra toezicht nodig bij een tijdelijke locatie. Er is een zzp-brandwacht ingezet die meerdere dagen aanwezig was, met vaste start- en eindtijden en korte rapportages richting de organisatie.'
  }
}
