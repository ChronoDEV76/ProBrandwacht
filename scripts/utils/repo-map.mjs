
/**
 * Repo Map — maakt een overzicht van je repo-structuur.
 *
 * Features:
 * - Tree (tekst), JSON en Markdown output (kies met --format of "all")
 * - Standaard-ignore op build/dep folders (zonder extra deps)
 * - Optioneel bestandsgroottes (--sizes) en max diepte (--max-depth)
 * - Extensiestats (–ext-stats) met aantallen per bestandstype
 *
 * Voorbeelden:
 *   node scripts/utils/repo-map.mjs
 *   node scripts/utils/repo-map.mjs --root . --format=all --out=repo-map --sizes --ext-stats
 *   node scripts/utils/repo-map.mjs --max-depth=3 --exclude=.vercel,.next,coverage
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DEFAULT_IGNORES = new Set([
  ".git",
  ".svn",
  ".hg",
  ".DS_Store",
  "node_modules",
  ".next",
  ".turbo",
  ".vercel",
  ".cache",
  ".pnpm-store",
  ".parcel-cache",
  "dist",
  "build",
  "coverage",
  ".idea",
  ".vscode",
  ".husky",
  ".eslintcache",
  ".nyc_output",
  ".playwright",
  ".pytest_cache",
  ".expo",
]);

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, ...rest] = arg.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const CWD = process.cwd();
const ROOT = path.resolve(CWD, args.root && args.root !== true ? args.root : ".");
const OUT_STEM = args.out && args.out !== true ? String(args.out) : "repo-map";
const FORMAT = (args.format && String(args.format).toLowerCase()) || "tree"; // tree|json|md|all
const MAX_DEPTH = args["max-depth"] ? Number(args["max-depth"]) : Infinity;
const INCLUDE_SIZES = Boolean(args.sizes);
const EXT_STATS = Boolean(args["ext-stats"]);
const EXCLUDE = new Set(
  String(args.exclude || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

for (const ex of EXCLUDE) DEFAULT_IGNORES.add(ex);

/** Helpers */
const isDir = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();
const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile();
const getSize = (p) => (INCLUDE_SIZES ? fs.statSync(p).size : undefined);

function humanBytes(bytes) {
  if (bytes === 0) return "0 B";
  if (!bytes && bytes !== 0) return "-";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

function shouldIgnore(name) {
  return DEFAULT_IGNORES.has(name);
}

/** Walk de repo */
function walk(dir, depth = 0, base = ROOT, extTally = new Map()) {
  if (depth > MAX_DEPTH) return null;

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return null;
  }

  const node = {
    type: "dir",
    name: path.basename(dir),
    path: path.relative(base, dir) || ".",
    size: INCLUDE_SIZES ? 0 : undefined,
    children: [],
  };

  for (const entry of entries) {
    const name = entry.name;
    if (shouldIgnore(name)) continue;

    const full = path.join(dir, name);
    if (entry.isDirectory()) {
      const child = walk(full, depth + 1, base, extTally);
      if (child) {
        node.children.push(child);
        if (INCLUDE_SIZES) node.size += child.size || 0;
      }
    } else if (entry.isFile()) {
      const size = getSize(full);
      const rel = path.relative(base, full);
      const child = {
        type: "file",
        name,
        path: rel,
        size,
      };
      node.children.push(child);
      if (INCLUDE_SIZES) node.size += size || 0;

      if (EXT_STATS) {
        const ext = path.extname(name).toLowerCase() || "<no-ext>";
        extTally.set(ext, (extTally.get(ext) || 0) + 1);
      }
    }
  }

  // sort: folders first, then files, each alphabetically
  node.children.sort((a, b) => {
    if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return node;
}

/** Renderers */
function renderTree(node, prefix = "", isLast = true) {
  const parts = [];
  const branch = prefix ? (isLast ? "└─ " : "├─ ") : "";

  const label = INCLUDE_SIZES && typeof node.size === "number"
    ? `${node.name} ${node.type === "dir" ? `(${humanBytes(node.size)})` : `- ${humanBytes(node.size)}`}`
    : node.name;

  parts.push(`${prefix}${branch}${label}`);

  if (node.type === "dir" && node.children) {
    const nextPrefix = prefix ? (isLast ? `${prefix}   ` : `${prefix}│  `) : "";
    node.children.forEach((child, idx) => {
      const last = idx === node.children.length - 1;
      parts.push(renderTree(child, nextPrefix, last));
    });
  }

  return parts.join("\n");
}

function renderMarkdownTree(node) {
  const content = renderTree(node);
  return `# Repository map\n\n\`\`\`\n${content}\n\`\`\`\n`;
}

function collectStats(node, stats = { files: 0, dirs: 0, bytes: 0 }) {
  if (!node) return stats;
  if (node.type === "dir") {
    stats.dirs += 1;
    (node.children || []).forEach((c) => collectStats(c, stats));
  } else {
    stats.files += 1;
    stats.bytes += node.size || 0;
  }
  return stats;
}

function main() {
  if (!isDir(ROOT)) {
    console.error(`✘ ROOT bestaat niet of is geen map: ${ROOT}`);
    process.exit(1);
  }

  const extTally = new Map();
  const tree = walk(ROOT, 0, ROOT, extTally);
  if (!tree) {
    console.error("✘ Kon repo niet inlezen.");
    process.exit(1);
  }

  const stats = collectStats(tree);
  const formats = FORMAT === "all" ? ["tree", "json", "md"] : [FORMAT];

  if (formats.includes("tree")) {
    const text = renderTree(tree);
    fs.writeFileSync(`${OUT_STEM}.tree.txt`, text + "\n", "utf8");
    console.log(`✔ Geschreven: ${OUT_STEM}.tree.txt`);
  }

  if (formats.includes("json")) {
    const json = {
      generatedAt: new Date().toISOString(),
      root: path.basename(ROOT),
      rootPath: ROOT,
      includeSizes: INCLUDE_SIZES,
      maxDepth: isFinite(MAX_DEPTH) ? MAX_DEPTH : "∞",
      stats: {
        files: stats.files,
        dirs: stats.dirs,
        bytes: INCLUDE_SIZES ? stats.bytes : undefined,
        humanBytes: INCLUDE_SIZES ? humanBytes(stats.bytes) : undefined,
      },
      extStats: EXT_STATS
        ? Object.fromEntries([...extTally.entries()].sort((a, b) => b[1] - a[1]))
        : undefined,
      tree,
    };
    fs.writeFileSync(`${OUT_STEM}.json`, JSON.stringify(json, null, 2), "utf8");
    console.log(`✔ Geschreven: ${OUT_STEM}.json`);
  }

  if (formats.includes("md")) {
    const md = renderMarkdownTree(tree);
    fs.writeFileSync(`${OUT_STEM}.md`, md, "utf8");
    console.log(`✔ Geschreven: ${OUT_STEM}.md`);
  }

  console.log(
    `\n— Samenvatting —\n` +
      `Root: ${ROOT}\n` +
      `Mappen: ${stats.dirs} | Bestanden: ${stats.files}` +
      (INCLUDE_SIZES ? ` | Totaal: ${humanBytes(stats.bytes)}` : "") +
      (EXT_STATS ? ` | Ext-stats: ${extTally.size} types` : "") +
      `\n`
  );
}

main();

