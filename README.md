# ProBrandwacht.nl — Next.js App

## Scripts

- `npm run dev` — start local dev on http://localhost:3000
- `npm run build` — production build
- `npm start` — run built app
- `npm run lint` — ESLint (Next.js rules)
- `npm run typecheck` — TypeScript
- `npm test` / `npm run test:watch` / `npm run test:coverage` — Vitest + Testing Library
- `npm run format` / `npm run format:check` — Prettier

## Content & Structure

- `app/(site)/` — routes (`/`, `/blog`, `/faq`, `/missie`, city pages)
- `components/` — UI (header, share bar, prose)
- `content/blog/*.mdx` — blog posts with frontmatter (title, description, date, optional `howto`, `faq`)
- `lib/` — server/util code (blog loader, config)
- `public/` — static assets (`/og.jpg`, `favicon.ico`)

## Env vars

Copy `.env.local.example` to `.env.local` and set as needed:

- `NEXT_PUBLIC_SIGNUP_URL` — signup form URL
- `NEXT_PUBLIC_GTM_ID` — optional Google Tag Manager container
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — optional GA4 Measurement ID for analytics/pageview tracking

## SEO

- `/robots.txt` and `/sitemap.xml` are generated via App Router routes.
- Per‑page metadata set via `metadata`/`generateMetadata`; hreflang configured.

## Testing

- Vitest + @testing-library/react + jsdom.
- Jest config removed to keep stack simple.

## Changelog

See `CHANGELOG.md` for notable changes.
