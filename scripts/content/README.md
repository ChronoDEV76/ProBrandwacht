# Content Scripts

## City Copy Generator

This repo uses a two-tier city copy setup to keep **generic generation** and **editorial overrides** separate.

### Files
- `lib/city-copy.generated.ts`
  - Auto-generated output from `scripts/content/generate-city-copy.mjs`.
- `lib/city-copy.overrides.ts`
  - Hand-crafted overrides for specific cities. This file is **never overwritten**.
- `lib/city-copy.ts`
  - Runtime merge of `generated` + `overrides` (overrides win).

### How to update
1. Run the generator (safe):

```bash
node scripts/content/generate-city-copy.mjs
```

2. Add or adjust any city-specific wording in:

- `lib/city-copy.overrides.ts`

### Why this structure
- Keeps the generator simple and repeatable.
- Protects editorial, city-specific copy from accidental overwrites.
- Lets you update only what needs custom nuance.
