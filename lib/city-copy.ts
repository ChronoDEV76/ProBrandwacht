import type { CitySlug } from './city-data'

export type CityCopy = {
  h1: string
  intro: string
  metaTitle: string
  metaDescription: string
  body: string
  localCaseTitle?: string
  localCaseBody?: string
}

export const cityCopy: Partial<Record<CitySlug, CityCopy>> = {
  amsterdam: {
    h1: 'Brandwacht inhuren in Amsterdam',
    intro:
      'In Amsterdam heb je brandwachten nodig die gewend zijn aan tempo, evenementen en tijdelijke locaties. ProBrandwacht helpt je snel een passende zzp-brandwacht of klein team te vinden. Dat kan zonder ingewikkelde tussenlagen.',
    metaTitle:
      'Brandwacht inhuren Amsterdam – zzp-brandwachten voor events, bouw en industrie | ProBrandwacht',
    metaDescription:
      'Zoek je een brandwacht in Amsterdam? Via ProBrandwacht vind je rijksgediplomeerde zzp-brandwachten voor evenementen, bouw en industriële inzet. Nuchtere, heldere afspraken.',
    body: `## Afspraken vooraf in Amsterdam

- **Scope en rol**: toezicht, heetwerk, mangat/buitenwacht of publieksveiligheid
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

## Waarom opdrachtgevers in Amsterdam voor zzp-brandwachten kiezen

- Sterk in evenementen, podiumbouw en tijdelijke locaties
- Elke brandwacht minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over tijden, taken en aanspreekpunt
- Heldere, toetsbare communicatie over inzet en bereikbaarheid
- Mogelijkheid om vaste gezichten terug te laten komen bij herhaalopdrachten

## Veelgevraagde inzet in Amsterdam

- Toezicht bij evenementen op NDSM, ArenA-gebied en binnenstad
- Brandwacht bij festivals, clubnachten en tijdelijke pop-up locaties
- Bouw- en renovatieprojecten in hoogbouw en binnenstedelijke gebieden
- Toezicht tijdens tijdelijke afsluitingen, nachtwerk en ombouwmomenten`,
    localCaseTitle: 'Voorbeeld: brandwacht op NDSM-terrein',
    localCaseBody:
      'Een opdrachtgever had kortdurend toezicht nodig bij een evenement op het NDSM-terrein. Binnen korte tijd is een kleine ploeg zzp-brandwachten geregeld die het terrein goed kenden. Er waren duidelijke afspraken over op- en afbouw, publiekstijden en nazorg. Eén aanspreekpunt en dezelfde gezichten bij vervolgopdrachten.',
  },

  rotterdam: {
    h1: 'Brandwacht inhuren in Rotterdam',
    intro:
      'Rotterdam vraagt om brandwachten die gewend zijn aan haven, industrie en grote bouwprojecten. Via ProBrandwacht vind je zzp-brandwachten die hun weg kennen in deze omgeving. Duidelijke afspraken staan voorop.',
    metaTitle:
      'Brandwacht inhuren Rotterdam – zzp-brandwachten voor haven, bouw en industrie | ProBrandwacht',
    metaDescription:
      'Brandwacht nodig in Rotterdam? ProBrandwacht verbindt je met rijksgediplomeerde zzp-brandwachten voor haven, bouw en industriële inzet. Eerlijke, duidelijke afspraken.',
    body: `## Afspraken vooraf in Rotterdam

- **Scope en rol**: toezicht, heetwerk, onderhoudsstops of besloten ruimten
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

## Waarom opdrachtgevers in Rotterdam voor zzp-brandwachten kiezen

- Sterke ervaring in haven, bouw en industriële omgevingen
- Minimaal rijksgediplomeerd Manschap A/B
- Korte lijnen: rechtstreeks contact met de uitvoerende brandwacht of ploegleider
- Nuchtere afspraken, vastgelegd vóór de inzet
- Mogelijkheid om vaste ploegen in te plannen bij terugkerend werk

## Veelgevraagde inzet in Rotterdam

- Haven- en industriewerk (Botlek, Europoort, Maasvlakte)
- Toezicht bij heetwerk, onderhoudstops en tijdelijke shutdowns
- Brandwacht tijdens renovaties en verbouwingen in de stad
- Extra toezicht bij evenementen, scheepsbezoeken en publieksactiviteiten`,
    localCaseTitle: 'Voorbeeld: toezicht bij onderhoud in de haven',
    localCaseBody:
      'Voor een onderhoudsperiode in de haven zocht een opdrachtgever meerdere brandwachten die gewend zijn aan industriële procedures. Er is een klein team samengesteld dat in shifts draaide. Afspraken over taken, rapportage en bereikbaarheid buiten kantoortijden lagen vooraf vast. Geen onnodige lagen, wel een vast aanspreekpunt.',
  },

  'den-haag': {
    h1: 'Brandwacht inhuren in Den Haag',
    intro:
      'In Den Haag en omstreken gaat het vaak om combinaties van evenementen, overheidslocaties en binnenstedelijke bouw. ProBrandwacht helpt je aan zzp-brandwachten die hiermee om kunnen gaan. Afbakening en communicatie zijn leidend.',
    metaTitle:
      'Brandwacht inhuren Den Haag – zzp-brandwachten voor events en bouw | ProBrandwacht',
    metaDescription:
      'Brandwacht nodig in Den Haag? Via ProBrandwacht huur je rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en tijdelijke projecten. Heldere, nuchtere afspraken.',
    body: `## Afspraken vooraf in Den Haag

- **Scope en rol**: toezicht, publieksveiligheid of tijdelijke installaties
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

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
      'Bij een renovatieproject in het Haagse centrum zocht de opdrachtgever een brandwacht die gewend was aan werken in een pand dat deels in gebruik bleef. Er zijn duidelijke afspraken gemaakt over werktijden, looproutes, sleutelbeheer en contactmomenten met de uitvoerder. Dezelfde professional keerde meerdere weken terug voor continuïteit.',
  },

  utrecht: {
    h1: 'Brandwacht inhuren in Utrecht',
    intro:
      'Utrecht heeft een mix van evenementen, binnenstedelijke bouw en logistieke hubs. ProBrandwacht koppelt je aan zzp-brandwachten die hier dagelijks mee werken. Heldere afspraken houden de inzet uitlegbaar.',
    metaTitle:
      'Brandwacht inhuren Utrecht – zzp-brandwachten voor evenementen en bouw | ProBrandwacht',
    metaDescription:
      'Zoek je een brandwacht in Utrecht? ProBrandwacht verbindt je met rijksgediplomeerde zzp-brandwachten voor evenementen, bouwprojecten en logistieke locaties.',
    body: `## Afspraken vooraf in Utrecht

- **Scope en rol**: toezicht, publieksveiligheid of tijdelijke installaties
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

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
      'Voor een tijdelijk evenement in de Utrechtse binnenstad is een brandwacht ingezet die ervaring had met zowel opbouw- als publieksuren. Afgesproken is wie het aanspreekpunt was voor de gemeente en de organisatie. Ook is vastgelegd welke checks er voor aanvang gedaan werden en hoe bevindingen werden teruggekoppeld.',
  },

  eindhoven: {
    h1: 'Brandwacht inhuren in Eindhoven',
    intro:
      'Eindhoven combineert techniek, industrie en evenementen. ProBrandwacht koppelt je aan zzp-brandwachten die gewend zijn aan dit soort omgevingen. Kaders en rolverdeling blijven duidelijk.',
    metaTitle:
      'Brandwacht inhuren Eindhoven – zzp-brandwachten voor industrie en events | ProBrandwacht',
    metaDescription:
      'Brandwacht nodig in Eindhoven? Vind rijksgediplomeerde zzp-brandwachten voor industriële inzet, evenementen en bouwprojecten via ProBrandwacht.',
    body: `## Afspraken vooraf in Eindhoven

- **Scope en rol**: toezicht, heetwerk, onderhoudsstops of publieksveiligheid
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

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
      'Een organisator in Eindhoven zocht een brandwacht die zowel met publiek als techniek uit de voeten kon. Er is gekozen voor een zzp-brandwacht met ervaring in evenementen en basiskennis van technische installaties. De taken waren vooraf duidelijk afgestemd.',
  },

  tilburg: {
    h1: 'Brandwacht inhuren in Tilburg',
    intro:
      'Tilburg kent grote evenementen en stevige logistiek. ProBrandwacht helpt je aan zzp-brandwachten die hiermee overweg kunnen. De focus ligt op duidelijke afspraken.',
    metaTitle:
      'Brandwacht inhuren Tilburg – zzp-brandwachten voor evenementen en logistiek | ProBrandwacht',
    metaDescription:
      'Brandwacht nodig in Tilburg? Huur rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en logistieke locaties via ProBrandwacht.',
    body: `## Afspraken vooraf in Tilburg

- **Scope en rol**: toezicht, publieksveiligheid of tijdelijke installaties
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

## Waarom opdrachtgevers in Tilburg voor zzp-brandwachten kiezen

- Ervaring met grote evenementen en kermisperioden
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over aanwezigheid, taken en rapportage
- Mogelijkheid om dezelfde mensen terug te vragen bij vervolgopdrachten

## Veelgevraagde inzet in Tilburg

- Toezicht bij evenementen en festivals
- Brandwacht bij verbouw, renovaties en tijdelijke locaties
- Extra toezicht bij logistieke hubs`,
    localCaseTitle: 'Voorbeeld: inzet rondom een festivalweek',
    localCaseBody:
      'Bij een festivalperiode in Tilburg zocht de organisatie een kleine, vaste ploeg brandwachten. Er is een team samengesteld dat meerdere dagen aanwezig was, met vaste tijden en duidelijke taken. Eén aanspreekpunt hield contact met de organisatie.',
  },

  groningen: {
    h1: 'Brandwacht inhuren in Groningen',
    intro:
      'In Groningen draait het vaak om evenementen, zorglocaties en projecten in en rond de stad. ProBrandwacht helpt je passende zzp-brandwachten te vinden. Afspraken zijn vooraf toetsbaar.',
    metaTitle:
      'Brandwacht inhuren Groningen – zzp-brandwachten voor events en projecten | ProBrandwacht',
    metaDescription:
      'Brandwacht zoeken in Groningen? Via ProBrandwacht huur je rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en andere projecten.',
    body: `## Afspraken vooraf in Groningen

- **Scope en rol**: toezicht, publieksveiligheid of tijdelijke installaties
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

## Waarom opdrachtgevers in Groningen voor zzp-brandwachten kiezen

- Ervaring met evenementen, zorglocaties en binnenstedelijke projecten
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over toegang, taken en rapportage
- Flexibel inzetbaar bij korte en langere trajecten

## Veelgevraagde inzet in Groningen

- Toezicht bij evenementen en publiekslocaties
- Brandwacht bij verbouw- en renovatieprojecten
- Extra inzet bij tijdelijke installaties en onderhoud`,
    localCaseTitle: 'Voorbeeld: inzet bij zorglocatie',
    localCaseBody:
      'Bij een zorglocatie was tijdelijk extra toezicht nodig tijdens onderhoud. Er zijn afspraken gemaakt over rolverdeling, communicatielijnen en verslaglegging. Zo bleef bewonersveiligheid voorop staan.',
  },

  almere: {
    h1: 'Brandwacht inhuren in Almere',
    intro:
      'Almere kent veel nieuwbouw, evenementen en tijdelijke locaties. ProBrandwacht helpt je aan zzp-brandwachten die hiermee vertrouwd zijn. De inzet blijft helder afgebakend.',
    metaTitle:
      'Brandwacht inhuren Almere – zzp-brandwachten voor bouw en evenementen | ProBrandwacht',
    metaDescription:
      'Brandwacht nodig in Almere? Via ProBrandwacht huur je rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en tijdelijke projecten.',
    body: `## Afspraken vooraf in Almere

- **Scope en rol**: toezicht, publieksveiligheid of tijdelijke installaties
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

## Waarom opdrachtgevers in Almere voor zzp-brandwachten kiezen

- Ervaring met nieuwbouw, tijdelijke locaties en evenementen
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over planning, taken en rapportage
- Flexibel inzetbaar bij piekdrukte of last-minute wijzigingen

## Veelgevraagde inzet in Almere

- Toezicht bij evenementen en tijdelijke podia
- Brandwacht bij bouw- en renovatieprojecten
- Extra toezicht bij tijdelijke installaties`,
    localCaseTitle: 'Voorbeeld: toezicht bij nieuwbouw',
    localCaseBody:
      'Bij een nieuwbouwlocatie in Almere was extra toezicht nodig tijdens heetwerk. Er zijn afspraken gemaakt over toegangsprocedures, werkvergunningen en escalatie bij incidenten.',
  },

  breda: {
    h1: 'Brandwacht inhuren in Breda',
    intro:
      'Breda kent een mix van evenementen, binnenstedelijke projecten en logistieke locaties. ProBrandwacht helpt je passende zzp-brandwachten te vinden. Heldere rolafspraken maken het werk voorspelbaar.',
    metaTitle:
      'Brandwacht inhuren Breda – zzp-brandwachten voor evenementen en projecten | ProBrandwacht',
    metaDescription:
      'Brandwacht nodig in Breda? Via ProBrandwacht huur je rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en logistieke inzet.',
    body: `## Afspraken vooraf in Breda

- **Scope en rol**: toezicht, publieksveiligheid of tijdelijke installaties
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

## Waarom opdrachtgevers in Breda voor zzp-brandwachten kiezen

- Ervaring met binnenstedelijke events en bouwprojecten
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over toegang, taken en rapportage
- Mogelijkheid om vaste gezichten terug te laten komen

## Veelgevraagde inzet in Breda

- Toezicht bij evenementen en festivals
- Brandwacht bij verbouw- en renovatieprojecten
- Extra inzet bij logistieke locaties`,
    localCaseTitle: 'Voorbeeld: inzet bij stadsfestival',
    localCaseBody:
      'Tijdens een stadsfestival in Breda is een zzp-brandwacht ingezet voor toezicht en afstemming met de organisatie. Heldere taken en communicatielijnen voorkwamen ruis tijdens piekuren.',
  },

  nijmegen: {
    h1: 'Brandwacht inhuren in Nijmegen',
    intro:
      'Nijmegen combineert evenementen, onderwijs en binnenstedelijke projecten. ProBrandwacht helpt je aan zzp-brandwachten die hier ervaring mee hebben. Afstemming en uitvoering blijven duidelijk.',
    metaTitle:
      'Brandwacht inhuren Nijmegen – zzp-brandwachten voor evenementen en projecten | ProBrandwacht',
    metaDescription:
      'Brandwacht nodig in Nijmegen? Via ProBrandwacht huur je rijksgediplomeerde zzp-brandwachten in voor evenementen, bouw en tijdelijke projecten.',
    body: `## Afspraken vooraf in Nijmegen

- **Scope en rol**: toezicht, publieksveiligheid of tijdelijke installaties
- **Communicatie**: aanspreekpunt, escalatie en overdracht
- **Certificaten**: welke bevoegdheden aantoonbaar nodig zijn
- **Randvoorwaarden**: reistijd, wachtdienst, nacht/weekend en rapportage

## Waarom opdrachtgevers in Nijmegen voor zzp-brandwachten kiezen

- Ervaring met evenementen, onderwijs en binnenstedelijke projecten
- Minimaal rijksgediplomeerd Manschap A/B
- Duidelijke afspraken over planning, taken en rapportage
- Flexibel inzetbaar bij korte en langere trajecten

## Veelgevraagde inzet in Nijmegen

- Toezicht bij evenementen en publiekslocaties
- Brandwacht bij verbouw- en renovatieprojecten
- Extra inzet bij tijdelijke installaties`,
    localCaseTitle: 'Voorbeeld: toezicht bij onderwijsinstelling',
    localCaseBody:
      'Bij een onderwijsinstelling was tijdelijk extra toezicht nodig tijdens werkzaamheden. Er zijn afspraken gemaakt over toegang, communicatie en verslaglegging. Zo kon de bedrijfsvoering doorgaan.',
  },
}
