#!/usr/bin/env node
/**
 * Tone Guard Auto-fix (safe)
 * - Default: DRY-RUN (prints unified diffs)
 * - --apply writes changes
 *
 * Philosophy:
 * - Only change human-facing copy (tsx/mdx/md)
 * - Avoid damaging language ("niet altijd" -> "niet meestal")
 * - Avoid touching code/scripts/api routes by default
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const argv = process.argv.slice(2);
const APPLY = argv.includes("--apply");
const DRY = argv.includes("--dry") || !APPLY;
const CHECK = argv.includes("--check");

// Basic arg parsing
function argValue(flag, fallback = null) {
  const i = argv.findIndex((a) => a === flag);
  if (i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--")) return argv[i + 1];
  const eq = argv.find((a) => a.startsWith(flag + "="));
  if (eq) return eq.split("=").slice(1).join("=");
  return fallback;
}

const ROOT = path.resolve(argValue("--root", process.cwd()));

const INCLUDE_EXT = new Set([".tsx", ".mdx", ".md"]);
const DEFAULT_INCLUDE_DIRS = [
  "app",
  "components",
  "content",
  "docs",
  "lib", // ← zet uit als je lib niet wilt auto-fixen
];

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  ".git",
  "reports",
  "public",
  "scripts", // <- super belangrijk: niet je checks / tooling auto-wijzigen
]);

// Hard excludes (files we never want to modify)
const EXCLUDE_FILE_MATCH = [
  /\/app\/api\//,            // routes / backend
  /\/route\.ts$/,            // api routes
  /\/opengraph-image\.tsx$/, // generated-ish
  /\/sitemap\.xml\.ts$/,     // generated-ish
];

// ------------------------------
// Safer replacements
// ------------------------------

// Helper: replace with guard that prevents changes inside obvious codey places
// (very light heuristic: don't rewrite lines that look like regex, imports, urls, or comments)
function isProbablyCodeLine(line) {
  const t = line.trim();
  if (!t) return false;
  if (t.startsWith("import ")) return true;
  if (t.startsWith("export ")) return true;
  if (t.startsWith("//") || t.startsWith("/*") || t.startsWith("*")) return true;
  if (t.includes("new RegExp(")) return true;
  if (t.includes("http://") || t.includes("https://")) return true;
  if (t.includes("href=") || t.includes("src=")) return false; // could be UI
  // lots of punctuation often implies code
  const punct = (t.match(/[{}()[\];=<>]/g) || []).length;
  return punct >= 4;
}

// Phrase-level smart rewrites for "altijd"
function rewriteAlwaysPhrases(text) {
  // 1) "niet altijd" -> "niet in alle gevallen"
  text = text.replace(/\bniet altijd\b/gi, "niet in alle gevallen");

  // 2) "vrijwel altijd" -> "in de meeste gevallen"
  text = text.replace(/\bvrijwel altijd\b/gi, "in de meeste gevallen");

  // 3) Remaining standalone "altijd" (not preceded by "bijna"/"vrijwel"/"niet")
  // Use "in de regel" because it's natural and non-committal.
  // Keep punctuation spacing intact.
  text = text.replace(
    /(^|[^a-zà-ÿ])(altijd)([^a-zà-ÿ]|$)/gi,
    (m, pre, w, post) => `${pre}in de regel${post}`
  );

  return text;
}

// Absolute claims to “transparantie”
function rewriteHiddenMargins(text) {
  // Cover plural/singular, verdienmodel etc.
  return text
    .replace(/zonder verborgen marges/gi, "met transparantie over kosten en eventuele marges")
    .replace(/zonder verborgen verdienmodellen/gi, "met transparantie over kosten en eventuele verdienmodellen")
    .replace(/geen verborgen marges/gi, "transparantie over kosten en eventuele marges")
    .replace(/geen verborgen verdienmodellen/gi, "transparantie over kosten en eventuele verdienmodellen");
}

// “volledige vrijheid/autonomie” -> softer but still strong
function rewriteFullAutonomy(text) {
  return text
    .replace(/volledige vrijheid/gi, "veel vrijheid")
    .replace(/volledig vrij/gi, "vrij in de praktijk")
    .replace(/volledige autonomie/gi, "veel autonomie");
}

// “binnen enkele minuten” -> expectation + dependency
function rewriteMinutes(text) {
  return text
    .replace(/\bbinnen enkele minuten\b/gi, "soms snel (afhankelijk van beschikbaarheid)")
    .replace(/\bwithin minutes\b/gi, "often quickly (depending on availability)");
}

// “zeker / zeker weten / garanties” -> context-aware phrasing
function rewriteCertainty(text) {
  return text
    .replace(/\bzeker weten\b/gi, "met meer zekerheid (contextafhankelijk)")
    .replace(/\bzekerheid over\b/gi, "duidelijkheid over (contextafhankelijk)")
    .replace(/\bwerkgarantie\b/gi, "geen garanties; wel duidelijke afspraken")
    .replace(/\bgegarandeerd\b/gi, "in de praktijk vaak haalbaar (contextafhankelijk)");
}

// One safe pipeline (only for copy lines)
function applyRewritesToLine(line) {
  let out = line;
  out = rewriteHiddenMargins(out);
  out = rewriteFullAutonomy(out);
  out = rewriteMinutes(out);
  out = rewriteCertainty(out);
  out = rewriteAlwaysPhrases(out);
  return out;
}

// ------------------------------
// File walking
// ------------------------------
function listFilesRecursive(dir) {
  const out = [];
  const stack = [dir];

  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(cur, e.name);
      const rel = full.replace(ROOT, "").replaceAll("\\", "/");

      if (e.isDirectory()) {
        const base = e.name;
        if (EXCLUDE_DIRS.has(base)) continue;
        stack.push(full);
      } else if (e.isFile()) {
        const ext = path.extname(e.name).toLowerCase();
        if (!INCLUDE_EXT.has(ext)) continue;
        if (EXCLUDE_FILE_MATCH.some((re) => re.test(rel))) continue;

        // only include selected top dirs
        const top = rel.split("/").filter(Boolean)[0];
        if (!DEFAULT_INCLUDE_DIRS.includes(top)) continue;

        out.push(full);
      }
    }
  }

  return out;
}

// Diff printer (very small, readable)
function printMiniDiff(oldStr, newStr, file) {
  const oldLines = oldStr.split("\n");
  const newLines = newStr.split("\n");

  // naive line-by-line compare; good enough for small patches
  const changes = [];
  const max = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < max; i++) {
    const a = oldLines[i] ?? "";
    const b = newLines[i] ?? "";
    if (a !== b) changes.push({ line: i + 1, a, b });
  }
  if (!changes.length) return;

  console.log(`\n✏️  ${path.relative(ROOT, file).replaceAll("\\", "/")}`);
  // print up to 6 hunks
  for (const c of changes.slice(0, 6)) {
    console.log(`   L${c.line}`);
    console.log(`   - ${c.a}`);
    console.log(`   + ${c.b}`);
  }
  if (changes.length > 6) console.log(`   … (${changes.length - 6} more changes)`);
  console.log(`   ℹ️ ${DRY ? "dry-run (use --apply to write)" : "written"}`);
}

function main() {
  console.log(`🛡️ Tone Guard Auto-fix (${DRY ? "DRY-RUN" : "APPLY"})`);
  console.log(`Root: ${ROOT}`);

  const files = listFilesRecursive(ROOT);
  let matched = 0;

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const lines = raw.split("\n");

    let changed = false;
    const outLines = lines.map((line) => {
      if (isProbablyCodeLine(line)) return line;

      const next = applyRewritesToLine(line);
      if (next !== line) changed = true;
      return next;
    });

    if (!changed) continue;

    matched++;
    const out = outLines.join("\n");
    printMiniDiff(raw, out, file);

    if (APPLY) {
      fs.writeFileSync(file, out, "utf8");
    }
  }

  console.log(`\nDone. Files matched: ${matched}`);

  if (DRY && CHECK && matched > 0) {
    process.exit(1);
  }

  process.exit(0);
}

main();
