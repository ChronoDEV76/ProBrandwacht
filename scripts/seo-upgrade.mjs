
// SEO Upgrade v2 (no block comments)
// Banner injection is intentionally disabled; keep snippet empty to avoid re-adding sitewide banners.
// - Scans all app/**/page.tsx (including (site) and dynamic routes)
// - Skips admin, dashboard, api, layout/not-found/opengraph/etc.
// - Injects a short SEO snippet with keywords links
// - Adds metadata.keywords if missing
// Flags: --root=., --dry, --backup

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const argv = process.argv.slice(2);
const opts = { root: ".", dry: false, backup: false };
for (const a of argv) {
  if (a.startsWith("--root=")) opts.root = a.split("=")[1] || ".";
  else if (a === "--dry") opts.dry = true;
  else if (a === "--backup") opts.backup = true;
}

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(process.cwd(), opts.root);
const appDir = path.join(projectRoot, "app");

const SKIP_DIR_MATCH = ["/api/", "/admin/", "/(dashboard)/", "/node_modules/", "/.next/"];
const SKIP_FILE_NAMES = new Set([
  "layout.tsx",
  "not-found.tsx",
  "opengraph-image.tsx",
  "robots.ts",
  "sitemap.ts",
  "sitemap-cities.xml",
  "_not-found.tsx",
]);

const SEO_MARK_START = "{/* SEO-UPGRADE START */}";
const SEO_MARK_END = "{/* SEO-UPGRADE END */}";

// Banner injection disabled; keep markers for detection but inject nothing.
const SEO_SNIPPET = "";

const DEFAULT_KEYWORDS = [
  "brandwacht",
  "brandwacht inhuren",
  "brandwacht huren",
  "DBA-proof brandwacht",
  "brandwacht tarieven",
];

function shouldSkipByPath(p) {
  const norm = p.split(path.sep).join("/");
  if (!norm.includes("/app/")) return true;
  for (const s of SKIP_DIR_MATCH) if (norm.includes(s)) return true;
  const base = path.basename(norm);
  if (SKIP_FILE_NAMES.has(base)) return true;
  return false;
}

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (shouldSkipByPath(full)) continue;
      await walk(full, out);
    } else if (e.isFile()) {
      if (e.name === "page.tsx" && !shouldSkipByPath(full)) out.push(full);
    }
  }
  return out;
}

function alreadyHasSnippet(src) {
  return src.includes(SEO_MARK_START) && src.includes(SEO_MARK_END);
}

function injectSnippet(src) {
  if (!SEO_SNIPPET.trim()) return src;
  if (alreadyHasSnippet(src)) return src;

  const headerOpenIdx = src.indexOf("<header");
  const headerCloseIdx = src.indexOf("</header>");
  if (headerOpenIdx !== -1 && headerCloseIdx !== -1 && headerCloseIdx > headerOpenIdx) {
    const h1EndInHeader = src.indexOf("</h1>", headerOpenIdx);
    if (h1EndInHeader !== -1 && h1EndInHeader < headerCloseIdx) {
      const insertAt = h1EndInHeader + "</h1>".length;
      return src.slice(0, insertAt) + "\n" + SEO_SNIPPET + src.slice(insertAt);
    } else {
      const headerStartContent = src.indexOf(">", headerOpenIdx);
      if (headerStartContent !== -1 && headerStartContent < headerCloseIdx) {
        const insertAt = headerStartContent + 1;
        return src.slice(0, insertAt) + "\n" + SEO_SNIPPET + src.slice(insertAt);
      }
    }
  }

  const h1End = src.indexOf("</h1>");
  if (h1End !== -1) {
    const insertAt = h1End + "</h1>".length;
    return src.slice(0, insertAt) + "\n" + SEO_SNIPPET + src.slice(insertAt);
  }

  const mainOpenIdx = src.indexOf("<main");
  if (mainOpenIdx !== -1) {
    const mainStartContent = src.indexOf(">", mainOpenIdx);
    if (mainStartContent !== -1) {
      const insertAt = mainStartContent + 1;
      return src.slice(0, insertAt) + "\n" + SEO_SNIPPET + src.slice(insertAt);
    }
  }

  return src + "\n\n" + SEO_SNIPPET + "\n";
}

function addKeywordsToMetadata(src) {
  const metaStartRe =
    /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{|\bexport\s+const\s+metadata\s*=\s*{/m;
  const m = metaStartRe.exec(src);
  if (!m) return src;

  const startIdx = m.index + m[0].length - 1;
  let i = startIdx;
  let depth = 0;
  let endIdx = -1;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
    i++;
  }
  if (endIdx === -1) return src;

  const before = src.slice(0, startIdx + 1);
  const body = src.slice(startIdx + 1, endIdx);
  const after = src.slice(endIdx);

  if (/\bkeywords\s*:\s*\[/.test(body)) return src;

  const kwLine = `\n  keywords: ${JSON.stringify(DEFAULT_KEYWORDS)},`;
  const descMatch = /(\bdescription\s*:\s*[^,]+,?)/m.exec(body);
  let injected;
  if (descMatch) {
    const insertPos = descMatch.index + descMatch[0].length;
    injected = body.slice(0, insertPos) + kwLine + body.slice(insertPos);
  } else {
    injected = kwLine + body;
  }
  return before + injected + after;
}

async function processFile(file) {
  const original = await fs.readFile(file, "utf8");
  let updated = original;
  let changed = false;

  const withKeywords = addKeywordsToMetadata(updated);
  if (withKeywords !== updated) {
    updated = withKeywords;
    changed = true;
  }

  const withSnippet = injectSnippet(updated);
  if (withSnippet !== updated) {
    updated = withSnippet;
    changed = true;
  }

  if (!changed) return { file, changed: false };
  if (opts.dry) return { file, changed: true, dry: true };

  if (opts.backup) await fs.writeFile(file + ".bak", original, "utf8");
  await fs.writeFile(file, updated, "utf8");
  return { file, changed: true };
}

(async function main() {
  try {
    const stat = await fs.stat(appDir).catch(() => null);
    if (!stat || !stat.isDirectory()) {
      console.log("✘ Kan 'app' map niet vinden. Run vanuit project root of gebruik --root=.");
      process.exit(1);
    }

    const pages = await walk(appDir);
    if (!pages.length) {
      console.log("Geen page.tsx bestanden gevonden onder /app.");
      return;
    }

    console.log("SEO Upgrade:");
    let changedCount = 0;
    for (const f of pages) {
      const rel = path.relative(projectRoot, f);
      const res = await processFile(f);
      if (!res.changed) {
        console.log("• No change:", rel);
      } else if (res.dry) {
        console.log("-", rel, "(zou wijzigen)");
        changedCount++;
      } else {
        console.log("-", rel);
        changedCount++;
      }
    }
    console.log(
      `\nMode: ${opts.dry ? "DRY-RUN (geen wijzigingen)" : "WRITE"} — ${changedCount} file(s) ${opts.dry ? "gepland" : "gewijzigd"}`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
