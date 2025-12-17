
import fs from "node:fs";
import path from "node:path";

// Scant app/ en content/ op JSX component-tags en import-paden die lijken op calculators/richtlijnen.
const ROOT = process.cwd();
const SEARCH_ROOTS = ["app", "content", "components"].map(p => path.join(ROOT, p));
const EXTS = new Set([".tsx", ".jsx", ".ts", ".js", ".mdx"]);
const KEYWORDS = ["calculator","tarief","cost","fee","richtlijn","richtlijnen","bereken","slider","tool"];

const found = new Set();

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
    } else if (EXTS.has(path.extname(ent.name))) {
      scanFile(full);
    }
  }
}

function scanFile(file) {
  let src = "";
  try { src = fs.readFileSync(file, "utf8"); } catch {}
  if (!src) return;

  // Vind eenvoudige JSX tags: <Comp ...> of <Comp/>
  const tagRe = /<([A-Z][A-Za-z0-9_]*)\b[^>]*\/?>/g;
  let m;
  while ((m = tagRe.exec(src))) {
    const name = m[1];
    const lower = name.toLowerCase();
    if (KEYWORDS.some(k => lower.includes(k))) found.add(name);
  }

  // Check ook import padnamen op keywords en pluk mogelijke componentnamen uit de import
  const importRe = /import\s+(.+?)\s+from\s+['"]([^'"]+)['"]/gs;
  while ((m = importRe.exec(src))) {
    const importClause = m[1];
    const spec = m[2].toLowerCase();
    if (KEYWORDS.some(k => spec.includes(k))) {
      // named imports
      const named = importClause.match(/{([^}]+)}/);
      if (named) {
        named[1]
          .split(",")
          .map(s => s.trim().split(/\s+as\s+/)[0].trim())
          .filter(Boolean)
          .forEach(n => /^[A-Z]/.test(n) && found.add(n));
      }
      // default import
      const def = importClause.match(/^\s*([A-Z][A-Za-z0-9_]*)\s*(,|$)/);
      if (def) found.add(def[1]);
    }
  }
}

for (const base of SEARCH_ROOTS) walk(base);

// Output als JSON
console.log(JSON.stringify([...found].sort(), null, 2));
