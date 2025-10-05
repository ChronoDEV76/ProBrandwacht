# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js routes, layouts, and API handlers; keep loaders beside pages.
- `components/`: Shared client components for UI primitives.
- `lib/`: Typed server utilities and helpers for pricing, escrow, and compliance flows.
- `content/`: MDX marketing copy; track SEO pillars such as “DBA-proof brandwacht” and “brandwacht inhuren”.
- `public/`: Raw assets exposed at root paths (logos, poort-QR check-in visuals).
- `styles/`: Global CSS and Tailwind layers (`styles/globals.css`).
- `__tests__/`: Vitest suites mirroring feature folders.

## Build, Test, and Development Commands
- `pnpm dev`: start the dev server on `http://localhost:3000` with HMR.
- `pnpm build`: create the production bundle and surface data warnings.
- `pnpm start`: serve the built app to verify fixes.
- `pnpm lint`: run `next lint` with project rules.
- `pnpm typecheck`: `tsc --noEmit` for strict typing.
- `pnpm test`, `pnpm test:watch`, `pnpm test:coverage`: run Vitest once, in watch mode, or with coverage.
- `pnpm format` / `pnpm format:check`: write or verify Prettier formatting.

## Coding Style & Naming Conventions
- TypeScript only; annotate props, loaders, and MDX helpers.
- Functional React components; default-export single-component files.
- Filenames use `kebab-case`; components `PascalCase`; hooks/utilities `camelCase`.
- Prettier enforces 2 spaces, single quotes, and no semicolons.
- Tailwind utilities style JSX; extract shared patterns into small components or `lib` helpers.
- ESLint extends `eslint-config-next` and `eslint-config-prettier`; resolve warnings before merge.

## Testing Guidelines
- Vitest with Testing Library and JSDOM via `vitest.setup.ts`.
- Place specs in `__tests__/` or as `*.test.ts(x)` beside code.
- Cover escrow, gasmeting/gasmeter, and ERT/rescue team flows; confirm via `pnpm test:coverage`.
- Mock remote calls through `lib/` helpers to keep runs deterministic.

## SEO & Content Notes
- Refresh MDX copy for gecontroleerde certificaten, industrieel/industriële brandwacht, mangatwacht/buitenwacht, and 24/7,zzp brandwacht tarieven.
- Use headings for poort-QR check-in, brandwacht rijksgediplomeerd, and gasmeting/gasmeter services.
- Link CTAs when highlighting DBA-proof brandwacht or brandwacht inhuren packages.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`).
- Keep PRs focused; include summary, linked issue, screenshots for UI, and executed checks.
- Ensure lint, typecheck, and tests pass; attach Vercel preview URLs when available.

## Security & Configuration Tips
- Never commit `.env.local`; copy from `.env.local.example`.
- Prefix client-safe values with `NEXT_PUBLIC_`; review new keys with maintainers.
- Update `vercel.json` and Tailwind tokens carefully to avoid regressions.
