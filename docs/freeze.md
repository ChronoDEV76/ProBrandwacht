# ProBrandwacht Freeze State

Status: **frozen**
Freeze date: **2026-02-08**
Owner: **Chrono4Solutions**

## Intent
ProBrandwacht is bevroren als onafhankelijk kennis- en duidingskader. De site mag blijven bestaan als referentiepunt, zonder nieuwe positionering, activerende copy of commerciële funnels.

## Immutable Principles
- Geen bureau
- Geen werkgever
- Geen vakbond
- Geen collectief
- Geen bemiddeling
- Geen oplossingstaal
- Geen normatieve uitspraken
- Geen garanties
- Geen oproepen tot actie

## Allowed Changes (Only)
- Correctie van feitelijke onjuistheden
- Wetswijzigingen (inhoudelijk, beschrijvend)
- Technische updates zonder inhoudelijke impact

## Forbidden Changes
- Toevoegen van activerende CTA’s
- Aanscherpen van taal richting partijen
- Heropening van tariefdiscussies
- Persoonlijke opinie toevoegen
- Actualiteitspolitiek verwerken
- Reactieve content naar marktincidenten

## Tone of Voice
- Neutraal-beschrijvend
- Derde persoon
- Uitleg en context, geen oordeel

Te vermijden (hard in freeze guard):
- “wij vinden”
- “wij eisen”
- “dit moet”
- “dit klopt niet”
- “schijnveiligheid (als beschuldiging)”
- “misstanden”
- “boosdoener”

## Enforcement
- Config: `scripts/freeze/freeze.json`
- Guard: `scripts/freeze/freeze-guard.mjs`
- Run: `npm run freeze:guard`

## Review Policy
Geen periodieke review. Alleen heropenen bij significante wetswijziging.
