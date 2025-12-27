// scripts/launch-copy-check.ts
// Run:  npx tsx scripts/launch-copy-check.ts
// (or)  node --loader tsx scripts/launch-copy-check.ts
//
// What it checks (fast, no browser needed):
// 1) No placeholder copy (TODO/lorem/xxx/..)
// 2) Pages have an H1
// 3) Pages export metadata OR generateMetadata (basic SEO hygiene)
// 4) No accidental “big claims” phrases (configurable)
// 5) CTA routes: warn if core CTAs are missing across key pages
//
// Adjust ROOTS / patterns if your repo differs.

import fs from "node:fs";
import path from "node:path";

type Finding = {
  file: string;
  level: "error" | "warn";
  message: string;
  excerpt?: string;
};

const ROOT = process.cwd();

// Directories we scan for pages
const ROOTS = [
  "app/(site)",
  "app/blog",
  "app", // fallback: catches robots.ts, sitemap.ts if you want to extend
];

// Page-like files we care about
const TARGET_FILE = /page\.tsx$/;

// Ignore folders you don't want
const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "out",
]);

// Placeholder / dev-copy markers
const PLACEHOLDER_PATTERNS: Array<{ re: RegExp; label: string }> = [
  { re: /\bTODO\b/i, label: "TODO marker" },
  { re: /\bFIXME\b/i, label: "FIXME marker" },
  { re: /\b(lorem ipsum|ipsum lorem)\b/i, label: "Lorem ipsum placeholder" },
  { re: /\bxxx+\b/i, label: "XXX placeholder" },
  { re: /\btest(tekst|text)\b/i, label: "Test text placeholder" },
  { re: /\bcoming soon\b/i, label: "Coming soon placeholder" },
  {
    re: /(?<!\bplaceholder\s*=\s*["'])\bplaceholder\b(?!\s*=\s*["']|[:\-])/i,
    label: "Placeholder word (not input attribute)",
  },
  { re: /\b(nog invullen|later invullen)\b/i, label: "Dutch placeholder" },
];

// "Big claims" / hype language you said you want to avoid (INTJ-style)
const BIG_CLAIM_PATTERNS: Array<{ re: RegExp; label: string }> = [
  { re: /\b(de beste|beste platform)\b/i, label: "‘beste’ claim" },
  { re: /\b(garantie|gegarandeerd)\b/i, label: "Guarantee language" },
  { re: /\b(altijd|nooit)\b/i, label: "Absolute language" },
  { re: /\b(100%|totaal)\b/i, label: "Over-absolute numeric claim" },
  { re: /\b(wereldwijd|marktleider)\b/i, label: "Market leader claim" },
];

// Expected CTA links (warn if missing on key pages; not an error)
const EXPECTED_CTA_HREFS = [
  "/zzp/aanmelden",
  "/opdrachtgevers/aanmelden",
  "/voor-brandwachten",
  "/opdrachtgevers",
  "/belangen",
];

const KEY_PAGES = new Set([
  // add/adjust as needed: these are file-path suffix checks
  path.join("app", "(site)", "page.tsx"),
  path.join("app", "(site)", "voor-brandwachten", "page.tsx"),
  path.join("app", "(site)", "opdrachtgevers", "page.tsx"),
  path.join("app", "blog", "page.tsx"),
]);

function walk(dirAbs: string, out: string[] = []): string[] {
  if (!fs.existsSync(dirAbs)) return out;
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const e of entries) {
    if (IGNORE_DIRS.has(e.name)) continue;
    const p = path.join(dirAbs, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function read(fileAbs: string) {
  return fs.readFileSync(fileAbs, "utf8");
}

function rel(fileAbs: string) {
  return path.relative(ROOT, fileAbs).replaceAll(path.sep, "/");
}

function excerptAround(content: string, idx: number, radius = 70) {
  const start = Math.max(0, idx - radius);
  const end = Math.min(content.length, idx + radius);
  const chunk = content.slice(start, end).replace(/\s+/g, " ").trim();
  return chunk.length ? chunk : undefined;
}

function hasH1(content: string) {
  // catches <h1 ...> and <h1> plus JSX fragments with string/JSX
  return /<h1\b[^>]*>/.test(content);
}

function hasMetadataExport(content: string) {
  return (
    /export\s+const\s+metadata\b/.test(content) ||
    /export\s+async\s+function\s+generateMetadata\b/.test(content) ||
    /export\s+function\s+generateMetadata\b/.test(content)
  );
}

function findAllMatches(content: string, re: RegExp) {
  const flags = re.flags.includes("g") ? re.flags : re.flags + "g";
  const rg = new RegExp(re.source, flags);
  const hits: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = rg.exec(content)) !== null) {
    hits.push(m.index);
    if (m.index === rg.lastIndex) rg.lastIndex++;
  }
  return hits;
}

function checkFile(fileAbs: string): Finding[] {
  const findings: Finding[] = [];
  const content = read(fileAbs);
  const file = rel(fileAbs);

  // Only enforce H1/metadata on page.tsx
  const isPage = TARGET_FILE.test(fileAbs);

  // Placeholders (error)
  for (const p of PLACEHOLDER_PATTERNS) {
    for (const idx of findAllMatches(content, p.re)) {
      findings.push({
        file,
        level: "error",
        message: `Placeholder detected: ${p.label}`,
        excerpt: excerptAround(content, idx),
      });
    }
  }

  // Big claims (warn)
  for (const p of BIG_CLAIM_PATTERNS) {
    for (const idx of findAllMatches(content, p.re)) {
      findings.push({
        file,
        level: "warn",
        message: `Potential hype/absolute language: ${p.label}`,
        excerpt: excerptAround(content, idx),
      });
    }
  }

  // Basic structure checks for pages
  if (isPage) {
    if (!hasH1(content)) {
      findings.push({
        file,
        level: "error",
        message: "Missing <h1> on page (SEO/accessibility).",
      });
    }
    if (!hasMetadataExport(content)) {
      findings.push({
        file,
        level: "warn",
        message: "No metadata export / generateMetadata found on page (check SEO).",
      });
    }
  }

  // CTA checks on key pages (warn)
  if (KEY_PAGES.has(file.replaceAll("/", path.sep))) {
    for (const href of EXPECTED_CTA_HREFS) {
      if (!content.includes(`href="${href}"`) && !content.includes(`href='${href}'`) && !content.includes(`href={\"${href}\"}`)) {
        // only warn for "core routes" on key pages — not all pages need all CTAs
        findings.push({
          file,
          level: "warn",
          message: `Key-page CTA route not found: ${href} (this is a soft check).`,
        });
      }
    }
  }

  // Quick sanity: no obvious JSX comment placeholders
  if (/\/\*\s*\.\.\.\s*\*\//.test(content) || /\{\s*\/\*\s*\.\.\.\s*\*\/\s*\}/.test(content)) {
    findings.push({
      file,
      level: "warn",
      message: "Found '...' placeholder comment pattern — verify nothing was left incomplete.",
    });
  }

  return findings;
}

function main() {
  const filesAbs: string[] = [];
  for (const r of ROOTS) {
    const abs = path.join(ROOT, r);
    if (!fs.existsSync(abs)) continue;
    filesAbs.push(...walk(abs));
  }

  const targets = filesAbs.filter((f) => TARGET_FILE.test(f));
  if (!targets.length) {
    console.log("No page.tsx files found under the configured roots.");
    process.exit(0);
  }

  const findings: Finding[] = [];
  for (const f of targets) findings.push(...checkFile(f));

  const errors = findings.filter((x) => x.level === "error");
  const warns = findings.filter((x) => x.level === "warn");

  const print = (items: Finding[], title: string) => {
    if (!items.length) return;
    console.log("\n" + title);
    console.log("-".repeat(title.length));
    for (const it of items) {
      console.log(`• [${it.level.toUpperCase()}] ${it.file}`);
      console.log(`  - ${it.message}`);
      if (it.excerpt) console.log(`  - Excerpt: "${it.excerpt}"`);
    }
  };

  console.log(`Scanned ${targets.length} page.tsx files.`);
  print(errors, "ERRORS (block launch unless intentional)");
  print(warns, "WARNINGS (review before launch)");

  if (errors.length) {
    console.log(`\nResult: FAIL ❌  (${errors.length} error(s), ${warns.length} warning(s))`);
    process.exit(1);
  }

  console.log(`\nResult: PASS ✅  (${warns.length} warning(s))`);
  process.exit(0);
}

main();
