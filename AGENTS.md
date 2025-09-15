# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router routes (e.g., `api/`, `(site)/`).
- `components/`: Reusable React components (e.g., `site-header.tsx`).
- `lib/`: Server/util code (e.g., `blog.ts`, `cities.ts`).
- `content/`: MDX content (e.g., `content/blog/*.mdx`).
- `public/`: Static assets served at `/`.
- `styles/`: Global styles (`globals.css`, Tailwind).
- Root config: `next.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, `tsconfig.json`.

## Build, Test, and Development Commands

- Local dev: `pnpm dev` — Next.js on `http://localhost:3000`.
- Build: `pnpm build` — production bundle.
- Start: `pnpm start` — run built app.
- Lint: `pnpm lint` — ESLint with Next rules.
- Test (Vitest): `pnpm test` (run), `pnpm test:watch`, `pnpm test:coverage`.
- Alt tests (Jest): `pnpm test:jest` if your env restricts native builds.
- Format (Prettier): `pnpm format` to write, `pnpm format:check` to verify.
- Env: copy `.env.local.example` to `.env.local`. Never commit secrets.
- Requirements: Node 18.17+; pnpm preferred.

## Coding Style & Naming Conventions

- Language: TypeScript (`strict: true`).
- Components: Functional components; default export when file has a single component.
- Filenames: `kebab-case` (e.g., `site-header.tsx`, `jsonld.tsx`). Component names: `PascalCase`.
- Indentation: 2 spaces; single quotes; no semicolons (Prettier enforced).
- Styling: Tailwind CSS utilities in JSX; prefer small, composable components.
- Linting: `eslint-config-next` + `eslint-config-prettier`. Fix or justify warnings in PRs.

## Testing Guidelines

- Framework: Vitest with Testing Library (`@testing-library/react`, `@testing-library/jest-dom`).
- Structure: `__tests__/` or co-locate as `*.test.ts(x)`.
- Coverage: keep critical utils/components covered; check `pnpm test:coverage`.
- Example: see `__tests__/smoke.test.tsx`.

## Commit & Pull Request Guidelines

- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`). One concern per commit.
- PRs: Clear description, linked issues, screenshots for UI changes, test plan, and Vercel preview URL when available.
- Scope: Keep PRs small and focused; update docs/config when behavior changes.

## Security & Configuration Tips

- Use `NEXT_PUBLIC_` prefix only for safe, public env vars.
- Never commit secrets. Add `.env.local` only; validate config in PRs.

## Install Dev Tools (one-time)

- Install dev deps: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom @types/jsdom prettier eslint-config-prettier`.
- Optionally run `pnpm format` once to normalize formatting.
