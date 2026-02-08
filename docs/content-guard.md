# Content guard: ProBrandwacht

Doel
- Houd alle content beschrijvend, reflecterend en informatief.
- Vermijd taal die klinkt als advies, oplossing of sturing.
- Bewaak de scheiding: ProBrandwacht = context en duiding, ProSafetyMatch = tooling (apart initiatief).

Kop- en titelrichtlijnen
- Gebruik woorden als: kader, context, duiding, afbakening, rolverdeling, systeemwerking.
- Vermijd: hoe doe je, beste manier, werkt/werkt het, stappenplan, checklist als oplossing.
- Voorbeeldtitels:
  - "Kader bij ..."
  - "Context bij ..."
  - "Duiding: ..."
  - "Toelichting op ..."

Taalguard (inhoud)
- Zeg wat het is: beschrijving, context, afbakening, geen uitvoering.
- Benadruk dat afspraken 1-op-1 tussen opdrachtgever en professional blijven.
- Verwijs bij wet- of regelgeving naar feitelijke context, geen oordeel of uitkomst.
- Vermijd woorden die impliceren dat ProBrandwacht een resultaat garandeert.

Vermijd in copy
- "Zo doe je", "beste manier", "werkt in de regel", "garantie", "wij regelen", "wij sturen".
- Prijs-, tarief-, of beschikbaarheidsclaims.
- Framing die voelt als bemiddeling of matching.
- Emotioneel geladen termen: schijnveiligheid, misbruik, uitbuiting, oneerlijk, schuld, falen, macht, manipulatie, strijd, oorlog, boeman, tegenpartij.

Gebruik in copy
- "Duiding", "kader", "rolverdeling", "uitlegbaarheid", "context", "afbakening".
- "Afspraken worden 1-op-1 gemaakt".
- Positieve positionering in plaats van "geen"-taal.

CTA-richtlijnen
- CTA's verwijzen naar kaders of uitleg, niet naar inzet of planning.
- Voorbeelden:
  - "Bekijk het kader"
  - "Lees de afbakening"
  - "Bekijk de toelichting"

Laatste check (voor publicatie)
- Staat afbakening op de centrale plek, zonder herhaling in elke alinea?
- Is de titel duidend en niet oplossingsgericht?
- Staat er nergens impliciet advies of garantie?
- Is de scheiding met ProSafetyMatch expliciet waar relevant?

Run guards (kort)
- `node scripts/content/probrandwacht-copy-guard.mjs --root .`
- `node scripts/qa/probrandwacht-sanity-guard.mjs --root .`
- `node scripts/content/probrandwacht-copyonly-scan.mjs --root . --config scripts/content/probrandwacht-copyonly.config.json`
- `node scripts/blog/blog-guard-oom.mjs`
- `node scripts/blog/vr-blog-guard.mjs --root . --config scripts/blog/vr-blog-guard.config.json`
- `npx tsx scripts/content/checkCopy.ts` (stdin of arg)
- `npx tsx scripts/content/launch-copy-check.ts`
- `node scripts/qa/copy-audit-app.mjs`
- `node scripts/content/taalSanity-check.ts`

Minimal run order (pre-launch)
1. `node scripts/content/probrandwacht-copy-guard.mjs --root .`
2. `node scripts/qa/probrandwacht-sanity-guard.mjs --root .`
3. `npx tsx scripts/content/launch-copy-check.ts`
