// scripts/cta-audit.mjs
// Scan ONLY current live pages + components (skip backups/OLD).
//
// Default scan scope:
// - app/**/page.(ts|tsx|js|jsx|mdx)
// - components/**/*.(ts|tsx|js|jsx|mdx)
//
// Excludes:
// - any path segment: /OLD/, /old/, /backup/, /backups/
// - any filename containing: backup, .backup, .bak, .old, .tmp
//
// Usage:
//   node scripts/cta-audit.mjs
//   node scripts/cta-audit.mjs --json reports/cta-audit.json
//   node scripts/cta-audit.mjs --fix
//   node scripts/cta-audit.mjs --include-layout   (also scan layout.tsx files)

import fs from "node:fs/promises";
import path from "node:path";

const argv = process.argv.slice(2);
const args = {
  root: ".",
  jsonOut: null,
  fix: false,
  includeLayout: false,
  maxSnippet: 120,
};

for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--root") args.root = argv[++i];
  else if (a === "--json") args.jsonOut = argv[++i];
  else if (a === "--fix") args.fix = true;
  else if (a === "--include-layout") args.includeLayout = true;
  else if (a === "--max-snippet") args.maxSnippet = Number(argv[++i] ?? 120);
}

const ALLOWED_EXTS = new Set(["ts", "tsx", "js", "jsx", "mdx"]);

const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  "coverage",
  ".turbo",
  "OLD",
  "old",
  "backup",
  "backups",
]);

const EXCLUDED_FILE_SUBSTRINGS = [
  "backup",
  ".backup",
  ".bak",
  ".old",
  ".tmp",
];

const LEGACY_CTA_MAP = [
  {
    match: "Neem contact op",
    replace: "Verkennend contact",
    rationale: "Minder sales, meer selectie/oriëntatie.",
    idHint: "tertiary_contact_exploratory",
  },
  {
    match: "Ik herken mijzelf, dit past",
    replace: "Dit sluit aan bij hoe ik wil werken",
    rationale: "Zelfselectie i.p.v. bevestiging.",
    idHint: "primary_select",
  },
  { match: "Meld je aan", replace: "Lees of dit bij mijn manier van werken past", rationale: "Selecterend i.p.v. funnel.", idHint: "secondary_how_we_work" },
  { match: "Schrijf je in", replace: "Lees of dit bij mijn manier van werken past", rationale: "Selecterend i.p.v. funnel.", idHint: "secondary_how_we_work" },
  { match: "Start nu", replace: "Lees eerst onze werkwijze →", rationale: "Eerst uitleg, dan actie.", idHint: "secondary_how_we_work" },
  { match: "Vraag direct aan", replace: "Bespreek of dit past", rationale: "Rustiger, geen urgentie.", idHint: "tertiary_contact_exploratory" },
  { match: "Boek nu", replace: "Bespreek of dit past", rationale: "Rustiger, geen retail-gevoel.", idHint: "tertiary_contact_exploratory" },
  { match: "Direct aanvragen", replace: "Verkennend contact", rationale: "Minder sales.", idHint: "tertiary_contact_exploratory" },

  { match: "Bekijk hoe dit werkt →", replace: "Lees hoe wij opdrachten selecteren →", rationale: "Selectie/uitvoerbaarheid centraal.", idHint: "brandwacht_learn_selection" },
  { match: "Lees meer →", replace: "Waarom wij soms nee zeggen →", rationale: "Positionering zichtbaar maken.", idHint: "secondary_why_no" },
];

const POSITIONING_PHRASES = [
  "geen klassiek bemiddelingsbureau",
  "uitvoerbaarheid",
  "wij zeggen soms nee",
  "rollen helder",
];

function normalize(s) {
  return (s ?? "").toLowerCase();
}

function shouldExcludePath(relPath) {
  const lower = relPath.toLowerCase();

  // skip anything under excluded dirs
  for (const seg of lower.split(path.sep)) {
    if (EXCLUDED_DIRS.has(seg)) return true;
  }

  // skip backup-ish filenames
  const base = path.basename(lower);
  if (EXCLUDED_FILE_SUBSTRINGS.some((x) => base.includes(x))) return true;

  return false;
}

function isInAllowedScope(relPath) {
  const p = relPath.split(path.sep).join("/"); // normalize for matching
  const ext = p.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTS.has(ext)) return false;

  // components: all allowed files
  if (p.startsWith("components/")) return true;

  // app: ONLY current pages (and optionally layouts)
  if (p.startsWith("app/")) {
    const base = path.basename(p);
    if (base.startsWith("page.")) return true;
    if (args.includeLayout && base.startsWith("layout.")) return true;
    return false;
  }

  return false;
}

async function listFiles(rootDir) {
  const files = [];
  await walk(path.join(rootDir, "app"), rootDir, files);
  await walk(path.join(rootDir, "components"), rootDir, files);
  return files;
}

async function walk(absDir, rootAbs, out) {
  let entries = [];
  try {
    entries = await fs.readdir(absDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    if (EXCLUDED_DIRS.has(e.name)) continue;

    const p = path.join(absDir, e.name);
    const rel = path.relative(rootAbs, p);

    if (shouldExcludePath(rel)) continue;

    if (e.isDirectory()) {
      await walk(p, rootAbs, out);
      continue;
    }

    if (!e.isFile()) continue;

    if (isInAllowedScope(rel)) out.push(p);
  }
}

function findAllOccurrences(haystack, needle) {
  const idxs = [];
  if (!needle) return idxs;
  let i = 0;
  while (true) {
    const j = haystack.indexOf(needle, i);
    if (j === -1) break;
    idxs.push(j);
    i = j + needle.length;
  }
  return idxs;
}

function lineColAt(text, index) {
  const before = text.slice(0, index);
  const lines = before.split("\n");
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  return { line, col };
}

function snippetAround(text, index, maxLen) {
  const start = Math.max(0, index - Math.floor(maxLen / 2));
  const end = Math.min(text.length, start + maxLen);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

function isLikelyCtaContext(text, index) {
  const windowStart = Math.max(0, index - 250);
  const windowEnd = Math.min(text.length, index + 250);
  const win = text.slice(windowStart, windowEnd);
  return /<Link\b|href=|<Button\b|<Cta\b|onClick=|className=.*(rounded|border|px-5|py-3)/.test(win);
}

function hasPositioning(text) {
  const t = normalize(text);
  return POSITIONING_PHRASES.some((p) => t.includes(p));
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  const rootAbs = path.resolve(args.root);
  const files = await listFiles(rootAbs);

  const findings = [];
  const fileSummaries = [];

  for (const f of files) {
    const rel = path.relative(rootAbs, f);
    const raw = await fs.readFile(f, "utf8");

    const fileFinding = {
      file: rel,
      hits: [],
      positioning: {
        hasAny: hasPositioning(raw),
        missing: POSITIONING_PHRASES.filter((p) => !normalize(raw).includes(p)),
      },
    };

    let updated = raw;
    let didFix = false;

    for (const rule of LEGACY_CTA_MAP) {
      const occ = findAllOccurrences(raw, rule.match);
      if (!occ.length) continue;

      for (const idx of occ) {
        const { line, col } = lineColAt(raw, idx);
        const ctaLike = isLikelyCtaContext(raw, idx);
        const snip = snippetAround(raw, idx, args.maxSnippet);

        const hit = {
          kind: "legacy_cta_text",
          match: rule.match,
          suggestion: rule.replace,
          rationale: rule.rationale,
          idHint: rule.idHint,
          file: rel,
          line,
          col,
          ctaLike,
          snippet: snip,
        };

        findings.push(hit);
        fileFinding.hits.push(hit);
      }

      // Safe fix: only replace exact string literals occurrences
      if (args.fix) {
        const patterns = [
          new RegExp(`"${escapeRegExp(rule.match)}"`, "g"),
          new RegExp(`'${escapeRegExp(rule.match)}'`, "g"),
          new RegExp("`" + escapeRegExp(rule.match) + "`", "g"),
        ];

        let tmp = updated;
        for (const re of patterns) {
          tmp = tmp.replace(re, (m) => m.replace(rule.match, rule.replace));
        }
        if (tmp !== updated) {
          updated = tmp;
          didFix = true;
        }
      }
    }

    // Tone flags (only for current pages/components now)
    const INTERMEDIARY_TERMS = ["bemiddel", "bemiddeling", "tussenpersoon", "wij regelen", "snel geregeld", "direct beschikbaar"];
    const t = normalize(raw);
    const intermediaryHits = INTERMEDIARY_TERMS.filter((w) => t.includes(w));
    if (intermediaryHits.length) {
      const note = {
        kind: "tone_intermediary",
        file: rel,
        terms: intermediaryHits,
        suggestion:
          "Overweeg in de eerste alinea 'geen klassiek bemiddelingsbureau' + 'uitvoerbaarheid' + link naar '/waarom-wij-soms-nee-zeggen'.",
      };
      findings.push(note);
      fileFinding.hits.push(note);
    }

    fileSummaries.push({
      file: rel,
      hitCount: fileFinding.hits.length,
      positioningHasAny: fileFinding.positioning.hasAny,
    });

    if (args.fix && didFix) {
      await fs.writeFile(f, updated, "utf8");
    }
  }

  const total = findings.length;
  const legacy = findings.filter((x) => x.kind === "legacy_cta_text").length;
  const tone = findings.filter((x) => x.kind === "tone_intermediary").length;

  console.log("");
  console.log("CTA Audit Summary");
  console.log("-----------------");
  console.log(`Files scanned: ${files.length}`);
  console.log(`Findings total: ${total}`);
  console.log(`- Legacy CTA text hits: ${legacy}`);
  console.log(`- Intermediary-tone flags: ${tone}`);
  console.log("");

  const byFile = new Map();
  for (const f of findings) byFile.set(f.file, (byFile.get(f.file) ?? 0) + 1);
  const top = [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  if (top.length) {
    console.log("Top files (most findings):");
    for (const [file, count] of top) console.log(`- ${file}: ${count}`);
    console.log("");
  }

  for (const f of findings) {
    if (f.kind === "legacy_cta_text") {
      console.log(
        `${f.file}:${f.line}:${f.col} ${f.ctaLike ? "[CTA?]" : "[text]"}  "${f.match}" -> "${f.suggestion}"  (hint: ${f.idHint})`
      );
      console.log(`  ${f.snippet}`);
    } else if (f.kind === "tone_intermediary") {
      console.log(`${f.file} [tone] terms=${f.terms.join(", ")}`);
      console.log(`  ${f.suggestion}`);
    }
  }

  if (args.jsonOut) {
    await fs.mkdir(path.dirname(path.join(rootAbs, args.jsonOut)), { recursive: true });
    await fs.writeFile(
      path.join(rootAbs, args.jsonOut),
      JSON.stringify(
        {
          meta: {
            root: rootAbs,
            scannedAt: new Date().toISOString(),
            filesScanned: files.length,
            totalFindings: total,
            fixApplied: args.fix,
            includeLayout: args.includeLayout,
          },
          fileSummaries,
          findings,
        },
        null,
        2
      ),
      "utf8"
    );
    console.log("");
    console.log(`Wrote JSON report: ${args.jsonOut}`);
  }

  if (args.fix) {
    console.log("");
    console.log("Applied safe fixes (quoted-string replacements only).");
    console.log("Review diff before committing.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
