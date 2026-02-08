# Release Notes — Freeze 2026-02-08

## Summary
ProBrandwacht is formally frozen as an independent knowledge and context platform. The copy, tone, and positioning are locked, and automated guards now enforce the freeze state. The site remains a neutral reference point with third‑person, descriptive language only.

## Highlights
- Freeze policy defined and enforced (`scripts/freeze/freeze.json`).
- Freeze guard added (`scripts/freeze/freeze-guard.mjs`) and wired into checks.
- Fixed and standardized blog structure: `Situatieschets → Veiligheidskundig principe → Waar het wringt → Wat dit betekent voor veiligheid → Afbakening → Gerelateerd`.
- Added immutable role‑disclaimer list to `/disclaimer`.
- Tone checks are local‑first (no dependency on running server).
- Local SEO checks are reliable, with minimal `public/robots.txt` and `public/sitemap.xml` in place.

## Status
- `content-check`: PASS
- `freeze-guard`: PASS
- `blog-guard`: PASS
- `tone-check`: PASS (local)
- `seo:check`: PASS (local)

## Freeze Principles (Immutable)
- Geen bureau
- Geen werkgever
- Geen vakbond
- Geen collectief
- Geen bemiddeling
- Geen oplossingstaal
- Geen normatieve uitspraken
- Geen garanties
- Geen oproepen tot actie

## Review Policy
No periodic review. Re-open only for significant legal changes.

Tag: `freeze-2026-02-08`
