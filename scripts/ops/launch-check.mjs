
// scripts/ops/launch-check.mjs
// Usage:
//   node scripts/ops/launch-check.mjs
//   node scripts/ops/launch-check.mjs --fix
//   node scripts/ops/launch-check.mjs --fix --site=https://www.probrandwacht.nl --from="ProBrandwacht <noreply@prosafetymatch.nl>" --no-build
//
// Doel:
// - Controleer launch readiness (env, Supabase, e-mail, routes, public assets)
// - Auto-fix lokaal veilige dingen met --fix (robots.txt, env-aanvullingen, package scripts)
// - Niet-interactief; exit-code >0 bij blockers

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import childProcess from "node:child_process";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const args = process.argv.slice(2);
const flags = new Map(
  args
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, ...rest] = a.slice(2).split("=");
      return [k, rest.join("=") || true];
    })
);

const FIX = !!flags.get("fix");
const NO_BUILD = !!flags.get("no-build");
const SITE_URL_FLAG = flags.get("site");
const FROM_FLAG = flags.get("from");

const log = {
  info: (m) => console.log(m),
  ok: (m) => console.log(`✔ ${m}`),
  warn: (m) => console.log(`▲ ${m}`),
  err: (m) => console.log(`✘ ${m}`),
};

let errors = 0;
let warns = 0;

function incErr(msg) { errors++; log.err(msg); }
function incWarn(msg) { warns++; log.warn(msg); }

function readJSON(p) {
  try {
    const s = fs.readFileSync(p, "utf8");
    return JSON.parse(s);
  } catch { return null; }
}

function writeFileSafe(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}

function appendEnvLine(filePath, line) {
  fs.appendFileSync(filePath, (fs.existsSync(filePath) ? "\n" : "") + line + "\n", "utf8");
}

function loadEnv() {
  // laadt .env.local en .env.production (productie override)
  const localPath = path.join(ROOT, ".env.local");
  const prodPath = path.join(ROOT, ".env.production");
  if (fs.existsSync(localPath)) dotenv.config({ path: localPath });
  if (fs.existsSync(prodPath)) dotenv.config({ path: prodPath }); // laat prod ‘winnen’
  return { localPath, prodPath };
}

function envHasSiteUrl() {
  return !!(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || SITE_URL_FLAG);
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || SITE_URL_FLAG || "";
}

function routeExistsAppRouter(routePath) {
  // accepteer bronbestand of build-output (Next app router)
  const segments = routePath.split("/").filter(Boolean);
  const variants = [
    path.join(ROOT, "app", ...segments, "page.tsx"),
    path.join(ROOT, "app", ...segments, "page.jsx"),
    path.join(ROOT, "app", "(site)", ...segments, "page.tsx"),
    path.join(ROOT, "app", "(site)", ...segments, "page.jsx"),
    path.join(ROOT, ".next", "server", "app", ...segments, "index.html"),
    path.join(ROOT, ".next", "server", "app", ...segments, "page.js"),
    path.join(ROOT, ".next", "server", "app", "(site)", ...segments, "page.js"),
  ];
  return variants.some((p) => fs.existsSync(p));
}

function apiRouteExists(routePath) {
  const fileTs = path.join(ROOT, "app", ...routePath.split("/"), "route.ts");
  const fileJs = path.join(ROOT, "app", ...routePath.split("/"), "route.js");
  const built = path.join(ROOT, ".next", "server", "app", ...routePath.split("/"), "route.js");
  return [fileTs, fileJs, built].some((p) => fs.existsSync(p));
}

function hasSitemap() {
  const publicFile = path.join(ROOT, "public", "sitemap.xml");
  const routeBuilt = path.join(ROOT, ".next", "server", "app", "sitemap.xml", "route.js");
  const topRoute = path.join(ROOT, ".next", "server", "app", "sitemap.xml.js");
  return fs.existsSync(publicFile) || fs.existsSync(routeBuilt) || fs.existsSync(topRoute);
}

function hasRobotsTxt() {
  return fs.existsSync(path.join(ROOT, "public", "robots.txt"));
}

function buildIfNeeded() {
  if (NO_BUILD) {
    log.info("[Build] overslagen (–-no-build)");
    return true;
  }
  log.info("\n[Build] next build uitvoeren…");
  try {
    childProcess.execSync("npm run build", { stdio: "inherit" });
    log.ok("Build OK");
    return true;
  } catch {
    incErr("Build faalde.");
    return false;
  }
}

function ensurePackageScripts() {
  const pkgPath = path.join(ROOT, "package.json");
  const pkg = readJSON(pkgPath);
  if (!pkg) { incWarn("package.json onleesbaar."); return; }

  pkg.scripts = pkg.scripts || {};
  let changed = false;

  if (!pkg.scripts["launch:check"]) {
    pkg.scripts["launch:check"] = "node scripts/ops/launch-check.mjs";
    changed = true;
  }
  if (!pkg.scripts["launch:quick"]) {
    pkg.scripts["launch:quick"] = "node scripts/ops/launch-check.mjs --no-build";
    changed = true;
  }
  if (changed && FIX) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
    log.ok("Package scripts aangevuld (launch:check / launch:quick).");
  } else if (changed) {
    incWarn("Package scripts ontbreken; run met --fix om aan te vullen.");
  } else {
    log.ok("Package scripts OK.");
  }
}

// ---- MAIN ----
log.info("\n[ENV] Controleren environment variabelen");
const { localPath, prodPath } = loadEnv();

// ENV file signalering
if (!fs.existsSync(prodPath)) {
  incWarn(".env.production niet gevonden. In Vercel is dat oké als je env vars in het dashboard zet.");
} else {
  log.ok(".env.production gevonden");
}
if (!fs.existsSync(localPath)) {
  incWarn(".env.local niet gevonden (optioneel, voor lokaal testen).");
}

if (!envHasSiteUrl()) {
  incErr("NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_BASE_URL ontbreekt (of vlag --site=...).");
  if (FIX && SITE_URL_FLAG) {
    appendEnvLine(localPath, `NEXT_PUBLIC_BASE_URL=${SITE_URL_FLAG}`);
    log.ok(`NEXT_PUBLIC_BASE_URL toegevoegd aan ${path.basename(localPath)}`);
  }
} else {
  log.ok(`Site URL: ${getSiteUrl() || "(uit env)"}`);
}

// Supabase
log.info("\n[Supabase] Basiscontrole");
if (!process.env.SUPABASE_URL) incErr("SUPABASE_URL ontbreekt");
else log.ok("SUPABASE_URL aanwezig");

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) incWarn("SUPABASE_SERVICE_ROLE_KEY mist (server inserts?)");
else log.ok("SUPABASE_SERVICE_ROLE_KEY aanwezig");

if (!process.env.SUPABASE_ANON_KEY) incWarn("SUPABASE_ANON_KEY mist (client features?)");
else log.ok("SUPABASE_ANON_KEY aanwezig");

// E-mail
log.info("\n[E-mail] Config check");
const hasResend = !!(process.env.RESEND_API_KEY && (process.env.RESEND_FROM || FROM_FLAG));
const hasSmtp =
  !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM);

if (!hasResend && !hasSmtp) {
  incErr("Geen mailconfig gevonden. Configureer óf Resend (RESEND_API_KEY + RESEND_FROM) óf SMTP (SMTP_HOST/USER/PASS/FROM).");
  if (FIX && FROM_FLAG) {
    appendEnvLine(localPath, `RESEND_FROM=${FROM_FLAG}`);
    log.ok(`RESEND_FROM toegevoegd aan ${path.basename(localPath)}`);
  }
} else {
  log.ok(`Mailconfig: ${hasResend ? "Resend" : "SMTP"}`);
}

// Bestanden
log.info("\n[Bestanden] robots.txt / sitemap / OG / logo");
if (!hasRobotsTxt()) {
  incWarn("public/robots.txt ontbreekt");
  if (FIX && envHasSiteUrl()) {
    const robots = `User-agent: *
Allow: /

Sitemap: ${getSiteUrl().replace(/\/$/, "")}/sitemap.xml
`;
    writeFileSafe(path.join(ROOT, "public", "robots.txt"), robots);
    log.ok("robots.txt automatisch aangemaakt.");
  }
} else {
  log.ok("robots.txt aanwezig");
}

if (!hasSitemap()) {
  incWarn("sitemap ontbreekt (public/sitemap.xml of app route). Je generate nu al sitemaps via routes; dit is alleen een waarschuwing.");
} else {
  log.ok("sitemap aanwezig");
}

// OG/Logo controles (optioneel)
const og = path.join(ROOT, 'public', 'og-home.webp');
if (fs.existsSync(og)) log.ok('public/og-home.webp aanwezig');
else incWarn('public/og-home.webp ontbreekt');

const logo = path.join(ROOT, "public", "probrandwacht-logo.png");
if (fs.existsSync(logo)) log.ok("Logo voor PDF aanwezig");
else incWarn("Logo voor PDF ontbreekt: public/probrandwacht-logo.png");

// Routes
log.info("\n[Routes] Verwachte paden");
const mustPages = [
  "/opdrachtgevers",
  "/faq",
  "/over-ons",
  "/belangen",
  "/voor-brandwachten",
];
for (const r of mustPages) {
  if (routeExistsAppRouter(r)) log.ok(`route ${r}`);
  else incWarn(`route ${r} niet gevonden (kan elders gerenderd worden; check navigatie).`);
}

// API routes
log.info("\n[API] Endpoints");
const apis = ["/api/probrandwacht-direct"];
for (const r of apis) {
  if (apiRouteExists(r)) log.ok(`API ${r}`);
  else incErr(`API ${r} ontbreekt`);
}

// Package scripts
log.info("\n[Package scripts]");
ensurePackageScripts();

// Build
if (!buildIfNeeded()) {
  // build faalde, errors al geteld
}

// Samenvatting
log.info(`\n— RESULTAAT —`);
if (errors > 0) {
  log.err(`Klaar met ${errors} fout(en) en ${warns} waarschuwing(en).`);
  process.exit(1);
} else if (warns > 0) {
  log.warn(`Klaar met ${warns} waarschuwing(en).`);
  process.exit(0);
} else {
  log.ok("Alles OK voor launch! 🚀");
  process.exit(0);
}
