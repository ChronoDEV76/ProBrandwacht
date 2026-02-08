// scripts/content/copy-migration-check.v2.mjs
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

// Alleen publieke site pages checken (default true)
const argv = process.argv.slice(2);
const PAGES_ONLY = !argv.includes("--all"); // use --all om components/content ook mee te nemen
const VERBOSE = argv.includes("--verbose");

// directories die je wél wil scannen (pages-only => alleen app/(site))
const TARGET_DIRS = PAGES_ONLY ? ["app/(site)"] : ["app/(site)", "components", "content"];

// bestanden/directories die vrijwel altijd irrelevant zijn voor copy-migratie
const IGNORE_PATH_PARTS = [
  "/admin/",
  "/api/",
  "/_",
  "/opengraph",
  "/sanity-checker",
  "/analytics",
  "/error",
  "/not-found",
  ".backup.",
  "/page.backup",
];

// --- Helpers ---
const hasIgnorePart = (p) => IGNORE_PATH_PARTS.some((x) => p.includes(x));

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const rel = full.replace(ROOT + "/", "");

    if (hasIgnorePart("/" + rel + "/")) continue;

    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (full.endsWith(".tsx") || full.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
}

// --- “Oude framing” patterns (minder fragiel) ---
// Belangrijk: we willen NIET “werkvloer”, “werkwijze”, “werkinstructie” flaggen.
const OLD_PATTERNS = [
  // werk als in "werkgarantie" / "werk regelen" / "werk bieden"
  {
    id: "WORK_PROMISE",
    re: /\bwerk\b(?!vloer)(?!wijze)(?!instructie)/i,
    allowIf: /\bgeen\s+werkgarantie\b/i,
  },

  // opdrachten ok in blog, maar op pages wil je het meestal neutraler hebben
  { id: "OPDRACHTEN", re: /\bopdrachten\b/i },

  // “bemiddel” alleen flaggen als het NIET expliciet ontkend wordt
  { id: "BEMIDDEL", re: /\bbemiddel(?!aar)?\b/i, allowIf: /\bgeen\s+bemiddel/i },

  // detach alleen flaggen als het NIET ontkend wordt
  {
    id: "DETACH",
    re: /\b(detach|detacher)\w*/i,
    allowIf: /\bgeen\s+(detach|detacher)\w*/i,
  },

  // garantie alleen flaggen als het NIET “geen garantie” is
  { id: "GARANTIE", re: /\bgarantie\b/i, allowIf: /\bgeen\s+garantie\b/i },

  // absolute claims
  { id: "ALTIJD", re: /\baltijd\b/i },
  { id: "NOOIT", re: /\bnooit\b/i },

  // “wij brengen/matchen/regelen” (platform-claim)
  { id: "WE_MATCH", re: /\bwij\s+(brengen|matchen|regelen)\b/i },
];

// --- “Nieuwe framing signals” ---
// We eisen deze alleen op PUBLIC PAGES (page.tsx) zodat components niet “falen”
const NEW_SIGNALS = [
  /\binitiatief\b/i,
  /\banalyse\b/i,
  /\bverkennend\b/i,
  /\bb[eè]ta\b/i,
  /\bwachtlijst\b/i,
  /\bgeen\s+bureau\b/i,
  /\bgeen\s+bemiddel/i,
  /\bgeen\s+werkgarantie\b/i,
  /\bcontextafhankelijk\b/i,
  /\bin\s+de\s+regel\b/i,
  /\bverantwoordelijkheid\b/i,
  /\brolverdeling\b/i,
];

// Page-only: alleen page.tsx moet “new signals” hebben.
// Andere .tsx bestanden (components) hoeven dat niet.
function requiresNewSignals(filePath) {
  if (!PAGES_ONLY) return true; // in --all mode eisen we overal signalen (kan streng zijn)
  return filePath.endsWith("/page.tsx");
}

function scanFile(filePath) {
  const rel = filePath.replace(ROOT + "/", "");
  const content = fs.readFileSync(filePath, "utf8");

  // OLD hits
  const oldHits = [];
  for (const rule of OLD_PATTERNS) {
    if (!rule.re.test(content)) continue;

    // allowIf => als veilige ontkenning bestaat, niet flaggen
    if (rule.allowIf && rule.allowIf.test(content)) continue;

    oldHits.push(rule.id);
  }

  // NEW signals
  let newCount = 0;
  if (requiresNewSignals(filePath)) {
    newCount = NEW_SIGNALS.filter((re) => re.test(content)).length;
  } else {
    newCount = -1; // n.v.t.
  }

  const shouldReport =
    oldHits.length > 0 ||
    (requiresNewSignals(filePath) && newCount === 0);

  if (!shouldReport) return null;

  return {
    file: rel,
    oldIssues: oldHits,
    newSignalsFound: newCount,
  };
}

function main() {
  const allFiles = [];
  for (const d of TARGET_DIRS) {
    const full = path.join(ROOT, d);
    if (fs.existsSync(full)) walk(full, allFiles);
  }

  const results = [];
  for (const f of allFiles) {
    const r = scanFile(f);
    if (r) results.push(r);
  }

  console.log("🔎 Copy migration check v2");
  console.log("Mode:", PAGES_ONLY ? "pages-only (default)" : "all (--all)");
  console.log("————————————————————————");

  if (results.length === 0) {
    console.log("✅ OK — geen oude framing gevonden op relevante files.");
    process.exit(0);
  }

  for (const r of results) {
    console.log(`⚠️ ${r.file}`);

    if (r.oldIssues.length) {
      console.log("   ❌ Oude patronen:", r.oldIssues.join(", "));
    }

    if (r.newSignalsFound === 0) {
      console.log("   ⚠️ Geen nieuwe framing-signalen gevonden (page.tsx)");
    }

    if (VERBOSE) console.log("   (tip) open deze file en check alleen de zichtbare copy.");
  }

  console.log("————————————————————————");
  console.log(`Bestanden met aandacht: ${results.length}`);

  // exit 0 want dit is een “guide”, geen fail gate
  process.exit(0);
}

main();
