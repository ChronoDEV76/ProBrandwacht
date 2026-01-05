// Taal sanity checker (lightweight)
// Doel:
//  - Alleen content checken op rare herhalingen als:
//      - "zelfstandig zelfstandig zelfstandig ..."
//      - "in eerlijke samenwerking in eerlijke samenwerking ..."
//
// Scope:
//  - content/**/*.(md|mdx|json)
//  - app/(site)/**/*.(tsx|md|mdx)
//
// Geen:
//  - generieke dubbele woorden
//  - lange-zinnen-check
//  - Tailwind/className meldingen

import * as fs from "fs";
import * as path from "path";

interface Hit {
  file: string;
  line: number;
  pattern: string;
  match: string;
}

const ROOT_DIR = process.cwd();

// Alleen content & site-pagina's
const BASE_DIRS = [
  path.join(ROOT_DIR, "content"),
  path.join(ROOT_DIR, "app", "(site)"),
  path.join(ROOT_DIR, "components"),
];

const EXTENSIONS = new Set<string>([".md", ".mdx", ".json", ".tsx"]);

// Patronen die we wél willen zien
const PATTERNS: { id: string; regex: RegExp; message: string }[] = [
  {
    id: "zelfstandig-3x",
    // zelfstandig zelfstandig zelfstandig (minimaal 3x achter elkaar)
    regex: /\b(zelfstandig\s+){2,}zelfstandig\b/gi,
    message: 'Herhaling van "zelfstandig" (3x of vaker) – waarschijnlijk typfout.',
  },
  {
    id: "eerlijke-samenwerking-2x",
    // in eerlijke samenwerking in eerlijke samenwerking (minimaal 2x)
    regex: /\bin\s+eerlijke\s+samenwerking(\s+in\s+eerlijke\s+samenwerking)+\b/gi,
    message:
      'Herhaling van "in eerlijke samenwerking" (2x of vaker) – waarschijnlijk copy-paste fout.',
  },
];

// Check of pad onder een van de base dirs valt
function isInBaseDirs(filePath: string): boolean {
  const normalized = path.resolve(filePath);
  return BASE_DIRS.some((base) => normalized.startsWith(path.resolve(base)));
}

// Recursief bestanden verzamelen
function collectFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, acc);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.has(ext) && isInBaseDirs(fullPath)) {
        acc.push(fullPath);
      }
    }
  }

  return acc;
}

// Herken Tailwind / className-achtige content die we willen overslaan
function looksLikeClassName(str: string): boolean {
  const utilityHints = [
    "bg-",
    "text-",
    "border-",
    "ring-",
    "px-",
    "py-",
    "pl-",
    "pr-",
    "pt-",
    "pb-",
    "mx-",
    "my-",
    "flex",
    "grid",
    "gap-",
    "items-",
    "justify-",
    "rounded-",
    "shadow-",
    "sm:",
    "md:",
    "lg:",
    "xl:",
    "2xl:",
  ];

  if (utilityHints.some((h) => str.includes(h))) return true;

  const dashCount = (str.match(/-/g) || []).length;
  const spaceCount = (str.match(/\s/g) || []).length;
  if (dashCount >= 2 && spaceCount >= 1) return true;

  return false;
}

// Uit een TSX-regel: haal natuurlijke tekst-segmenten
function extractTextSegmentsFromTsxLine(line: string): string[] {
  const segments: string[] = [];

  // 1) JSX tekst tussen > en <
  const betweenTags = />[^<]+</g;
  let m: RegExpExecArray | null;
  while ((m = betweenTags.exec(line)) !== null) {
    const inner = m[0].slice(1, -1).trim();
    if (inner && !looksLikeClassName(inner)) {
      segments.push(inner);
    }
  }

  // 2) String-literals "..."
  const stringLit = /"([^"]+)"/g;
  while ((m = stringLit.exec(line)) !== null) {
    const inner = m[1].trim();
    if (!inner) continue;
    if (looksLikeClassName(inner)) continue;
    if (/https?:\/\//.test(inner)) continue;
    segments.push(inner);
  }

  return segments;
}

// Markdown / MDX / JSON: volledige regel als tekst (wat geen codefence is)
function extractTextSegmentsFromTextLine(line: string): string[] {
  const trimmed = line.trim();
  if (trimmed.startsWith("```") || trimmed.startsWith("    ") || trimmed.startsWith("\t")) {
    return [];
  }
  return [line];
}

// Analyseer één bestand op onze specifieke patronen
function analyseFile(filePath: string): Hit[] {
  const content = fs.readFileSync(filePath, "utf8");
  const ext = path.extname(filePath).toLowerCase();
  const lines = content.split(/\r?\n/);

  const hits: Hit[] = [];

  lines.forEach((rawLine, idx) => {
    const lineNo = idx + 1;
    let segments: string[] = [];

    if (ext === ".tsx") {
      segments = extractTextSegmentsFromTsxLine(rawLine);
    } else {
      segments = extractTextSegmentsFromTextLine(rawLine);
    }

    for (const segment of segments) {
      for (const pattern of PATTERNS) {
        pattern.regex.lastIndex = 0; // reset
        let match: RegExpExecArray | null;
        while ((match = pattern.regex.exec(segment)) !== null) {
          hits.push({
            file: filePath,
            line: lineNo,
            pattern: pattern.message,
            match: match[0],
          });
        }
      }
    }
  });

  return hits;
}

function printHits(allHits: Hit[]): void {
  if (allHits.length === 0) {
    console.log("✅ Geen rare herhalingen gevonden (zelfstandig/eerlijke samenwerking).");
    return;
  }

  const byFile = new Map<string, Hit[]>();
  for (const hit of allHits) {
    if (!byFile.has(hit.file)) byFile.set(hit.file, []);
    byFile.get(hit.file)!.push(hit);
  }

  for (const [file, hits] of byFile) {
    console.log(`\n📄 ${file}`);
    for (const hit of hits) {
      console.log(
        `  🔁 regel ${hit.line}: ${hit.pattern}\n     ↳ "${hit.match.trim()}"`
      );
    }
  }

  console.log(`\n📝 Totaal ${allHits.length} issues in ${byFile.size} bestanden.`);
}

function main() {
  console.log("🔍 Taal sanity (light) – zoekt alleen naar 'zelfstandig zelfstandig ...' en 'in eerlijke samenwerking ...'");

  const files: string[] = [];
  for (const base of BASE_DIRS) {
    collectFiles(base, files);
  }

  if (files.length === 0) {
    console.log("⚠️ Geen bestanden gevonden om te scannen. Check BASE_DIRS/EXTENSIONS.");
    return;
  }

  console.log(`📦 Bestanden om te scannen: ${files.length}`);

  const allHits: Hit[] = [];
  for (const file of files) {
    const fileHits = analyseFile(file);
    allHits.push(...fileHits);
  }

  printHits(allHits);
}

main();
