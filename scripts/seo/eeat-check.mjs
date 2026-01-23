#!/usr/bin/env node
/**
 * E-E-A-T Check (heuristic)
 * - Scans key pages for trust signals: About/Contact, policies, author info, last updated,
 *   organization/contact schema, outbound references, clear identity.
 *
 * Usage:
 *   node scripts/seo/eeat-check.mjs --base http://localhost:3000
 *   node scripts/seo/eeat-check.mjs --base https://www.probrandwacht.nl --strict
 *   node scripts/seo/eeat-check.mjs --base http://localhost:3000 --paths "/,/over-ons,/blog"
 *   node scripts/seo/eeat-check.mjs --base http://localhost:3000 --json reports/eeat.json
 */

import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const out = {
    base: "http://localhost:3000",
    strict: false,
    paths: null,
    json: "reports/eeat-report.json",
    timeoutMs: 12000,
    userAgent: "ProBrandwacht E-E-A-T Check",
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;

    if (a.includes("=")) {
      const [k, v] = a.slice(2).split("=");
      out[k] = v === undefined ? true : v;
      continue;
    }

    const key = a.slice(2);
    const next = argv[i + 1];

    if (key === "strict") {
      out.strict = true;
      continue;
    }

    if (next && !next.startsWith("--")) {
      out[key] = next;
      i++;
    } else {
      out[key] = true;
    }
  }

  out.timeoutMs = Number(out.timeoutMs || 12000);
  return out;
}

function safeBase(b) {
  return String(b || "").replace(/\/+$/, "");
}

function localhostFallbackBase(base) {
  if (!/^https?:\/\/localhost(?::\d+)?/i.test(base)) return null;
  return base.replace("://localhost", "://127.0.0.1");
}

function uniq(arr) {
  return [...new Set(arr)];
}

function defaultPaths() {
  // Minimal set: homepage + identity + policies + blog hub
  return [
    "/",
    "/over-ons",
    "/opdrachtgevers",
    "/voor-brandwachten",
    "/disclaimer",
    "/privacy",
    "/voorwaarden",
    "/blog",
  ];
}

function stripHtmlToText(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countRegexHits(text, regexes) {
  const hits = [];
  for (const re of regexes) {
    if (re.test(text)) hits.push(re.toString());
  }
  return hits;
}

async function fetchHtml(url, { timeoutMs, userAgent }) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": userAgent },
    });

    const html = await res.text().catch(() => "");
    return { ok: res.ok, status: res.status, html };
  } finally {
    clearTimeout(t);
  }
}

function hasJsonLdWithTypes(html, wantedTypes = []) {
  // lightweight: search inside <script type="application/ld+json">
  const scripts = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    scripts.push(m[1] || "");
  }
  if (!scripts.length) return { present: false, matchedTypes: [] };

  const all = scripts.join("\n");
  const matched = [];
  for (const t of wantedTypes) {
    const rt = new RegExp(`"@type"\\s*:\\s*"?${t}"?`, "i");
    if (rt.test(all)) matched.push(t);
  }
  return { present: true, matchedTypes: matched };
}

// -----------------------------------------
// Heuristics (tunable)
// -----------------------------------------
const SIGNALS = {
  // Identity & policies
  hasAboutOrIdentity: [
    /\bover ons\b/i,
    /\bover probrandwacht\b/i,
    /\bwie we zijn\b/i,
    /\bmissie\b/i,
    /\bvisie\b/i,
  ],
  hasContact: [
    /\bcontact\b/i,
    /\bkvk\b/i,
    /\bbtw\b/i,
    /\badres\b/i,
    /\btelefoon\b/i,
    /\be-?mail\b/i,
  ],
  hasPolicies: [
    /\bprivacy\b/i,
    /\bdisclaimer\b/i,
    /\bvoorwaarden\b/i,
    /\bavg\b/i,
    /\bverwerkingsverantwoordelijke\b/i,
  ],
  hasDuidingLanguage: [
    /\bduid(t|en|ing)\b/i,
    /\buitleg\b/i,
    /\bkader(s)?\b/i,
    /\brolafbakening\b/i,
    /\brolverdeling\b/i,
    /\bonafhankelijk\b/i,
    /\binitiatief\b/i,
    /\bgeen bureau\b/i,
    /\bgeen bemiddeling\b/i,
  ],

  // Experience / Expertise signals
  hasExperienceLanguage: [
    /\bin de praktijk\b/i,
    /\bpraktijkervaring\b/i,
    /\bervaring\b/i,
    /\bop de vloer\b/i,
    /\bwerkvloer\b/i,
    /\bop locatie\b/i,
    /\buitvoering\b/i,
    /\bcasus\b/i,
    /\bscenario\b/i,
    /\btoetsbaar\b/i,
  ],
  hasExpertiseLanguage: [
    /\bgecertificeerd\b/i,
    /\bcursus\b/i,
    /\bdiploma\b/i,
    /\brijksgediplomeerd\b/i,
    /\bVCA\b/i,
    /\bBHV\b/i,
    /\bveiligheidsplan\b/i,
    /\bWet DBA\b/i,
    /\bvakmanschap\b/i,
    /\bprofessioneel\b/i,
  ],

  // Trust/Transparency (avoid absolute promises; you already handle with tone guard)
  hasNuanceTerms: [
    /\bindicatief\b/i,
    /\bcontextafhankelijk\b/i,
    /\bin de regel\b/i,
    /\bafhankelijk van\b/i,
    /\bgeen garantie\b/i,
    /\bzonder beloftes\b/i,
  ],

  // Author / freshness (mostly relevant for blog pages)
  hasAuthorSignals: [
    /\bauteur\b/i,
    /\bdoor\b\s+[A-Z][a-z]/, // "door Naam"
    /\bdoor probrandwacht\b/i,
    /\bgeschreven door\b/i,
  ],
  hasDateSignals: [
    /\b\d{4}\b/, // very broad; we refine below with "laatst bijgewerkt" etc
    /\blaatst bijgewerkt\b/i,
    /\bgepubliceerd\b/i,
    /\bupdate\b/i,
  ],
  hasUpdatedExplicit: [/\blaatst bijgewerkt\b/i, /\bgeüpdatet\b/i, /\bgeupdate\b/i],

  // References/outbound sources (especially for legal/price posts)
  hasOutboundLinks: [/https?:\/\/(?!www\.probrandwacht\.nl)/i],
};

function scorePage({ url, html, text }) {
  const pathname = new URL(url).pathname || "/";
  // Detect blog-like pages by URL heuristic
  const isBlog = /\/blog(\/|$)/i.test(pathname);
  const isBlogDetail = /\/blog\/[^/]+/i.test(pathname);
  const isPolicyPage = /\/(privacy|voorwaarden|disclaimer)/i.test(pathname);
  const isIdentityPage = /^\/$|\/over-ons|\/opdrachtgevers|\/voor-brandwachten/i.test(pathname);

  const findings = [];

  function ok(key, msg) {
    findings.push({ level: "ok", key, msg });
  }
  function warn(key, msg) {
    findings.push({ level: "warn", key, msg });
  }
  function fail(key, msg) {
    findings.push({ level: "fail", key, msg });
  }

  // JSON-LD checks
  const ld = hasJsonLdWithTypes(html, ["Organization", "WebSite", "WebPage", "FAQPage", "Article"]);
  if (ld.present) ok("jsonld_present", `JSON-LD aanwezig (types match: ${ld.matchedTypes.join(", ") || "geen specifieke match"})`);
  else warn("jsonld_missing", "Geen JSON-LD (ld+json) gevonden (kan E-E-A-T en rich results beperken).");

  // Identity / policies
  const hasPolicies = countRegexHits(text, SIGNALS.hasPolicies).length > 0;
  const hasAbout = countRegexHits(text, SIGNALS.hasAboutOrIdentity).length > 0;

  if (hasAbout) ok("identity", "Identiteit/‘over ons’ signalen gevonden.");
  else if (isIdentityPage) warn("identity", "Geen duidelijke identiteit/‘over ons’ signalen gevonden op deze pagina.");
  else ok("identity_optional", "Identiteitssignalen zijn optioneel op deze pagina.");

  if (hasPolicies) ok("policies", "Privacy/voorwaarden/disclaimer signalen gevonden.");
  else if (isPolicyPage) warn("policies", "Geen policy-signalen gevonden (privacy/voorwaarden/disclaimer/AVG).");
  else ok("policies_optional", "Policy-signalen zijn optioneel op deze pagina.");

  // Contact signals (harder on key pages)
  const contactHits = countRegexHits(text, SIGNALS.hasContact);
  if (contactHits.length) ok("contact", `Contact/bedrijfsgegevens signalen gevonden (${contactHits.length}).`);
  else warn("contact", "Geen contact/bedrijfsgegevens signalen gevonden op deze pagina.");

  // Experience / expertise
  const expHits = countRegexHits(text, SIGNALS.hasExperienceLanguage);
  const exptHits = countRegexHits(text, SIGNALS.hasExpertiseLanguage);
  const duidingHits = countRegexHits(text, SIGNALS.hasDuidingLanguage);

  if (expHits.length) ok("experience", "Ervarings-taal gevonden (praktijk/casus/scenario).");
  else if (duidingHits.length) ok("experience_contextual", "Duidings-taal gevonden; expliciete ervaringsclaim is optioneel.");
  else warn("experience", "Geen duidelijke ‘ervaring in de praktijk’ signalen gevonden.");

  if (exptHits.length) ok("expertise", "Expertise/kwalificatie signalen gevonden (certificering/wetgeving).");
  else if (duidingHits.length) ok("expertise_contextual", "Duidings-taal gevonden; expliciete kwalificaties zijn optioneel.");
  else warn("expertise", "Geen duidelijke expertise/kwalificatie signalen gevonden.");

  // Nuance terms (nice-to-have; only warn on key pages)
  const nuanceHits = countRegexHits(text, SIGNALS.hasNuanceTerms);
  if (nuanceHits.length) ok("nuance", "Nuance-termen gevonden (indicatief/contextafhankelijk/etc.).");
  else if (isIdentityPage || isPolicyPage) warn("nuance", "Geen nuance-termen gevonden (kan ok zijn, maar helpt ‘vertrouwen zonder belofte’).");
  else ok("nuance_optional", "Nuance-termen zijn optioneel op deze pagina.");

  // Blog-specific: author/date/references
  if (isBlogDetail) {
    const author = countRegexHits(text, SIGNALS.hasAuthorSignals);
    if (author.length) ok("author", "Auteur-signaal gevonden (door/auteur).");
    else warn("author", "Geen auteur-signaal gevonden (overweeg ‘door ProBrandwacht’ of naam/rol).");

    const updated = countRegexHits(text, SIGNALS.hasUpdatedExplicit);
    const dates = countRegexHits(text, SIGNALS.hasDateSignals);
    if (updated.length) ok("freshness", "‘Laatst bijgewerkt’/update-signaal gevonden.");
    else if (dates.length) warn("freshness", "Wel datum-achtige signalen, maar geen expliciete ‘laatst bijgewerkt’.");
    else warn("freshness", "Geen publicatie/update signalen gevonden (publicatiedatum helpt E-E-A-T).");

    const outbound = countRegexHits(html, SIGNALS.hasOutboundLinks);
    if (outbound.length) ok("references", "Outbound links gevonden (bronverwijzingen).");
    else warn("references", "Geen outbound links gevonden (voor wet/regels/claims helpt bronvermelding).");
  } else if (isBlog) {
    ok("author_optional", "Auteur/datum-signalen gelden vooral voor individuele blogposts.");
  }

  // Determine final status
  const hasFail = findings.some((f) => f.level === "fail");
  const warnCount = findings.filter((f) => f.level === "warn").length;

  // For now: FAIL only if strict criteria missing on key pages? Keep non-fragile:
  // We'll not auto-fail on heuristics; strict mode will decide later in main().
  const final = hasFail ? "fail" : warnCount > 0 ? "warn" : "ok";

  return { final, findings };
}

// -----------------------------------------
// Main
// -----------------------------------------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const base = safeBase(args.base);
  const fallbackBase = localhostFallbackBase(base);
  const strict = !!args.strict;

  let paths = defaultPaths();
  if (args.paths) {
    paths = args.paths
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
  }
  paths = uniq(paths);

  console.log("—".repeat(90));
  console.log("🔎 E-E-A-T Check — trust signals (heuristic, non-fragile)");
  console.log("—".repeat(90));
  console.log(`Base:   ${base}`);
  console.log(`Strict: ${strict ? "YES" : "NO"}`);
  console.log("");

  const report = {
    base,
    strict,
    scannedAt: new Date().toISOString(),
    pages: [],
    errors: [],
    summary: { ok: 0, warn: 0, fail: 0 },
  };

  let hardFail = false;

  for (const p of paths) {
    const url = new URL(p, base).toString();
    console.log(`📄 ${url}`);

    let fetched;
    try {
      fetched = await fetchHtml(url, { timeoutMs: args.timeoutMs, userAgent: args.userAgent });
    } catch (e) {
      if (fallbackBase) {
        const fallbackUrl = new URL(p, fallbackBase).toString();
        try {
          fetched = await fetchHtml(fallbackUrl, { timeoutMs: args.timeoutMs, userAgent: args.userAgent });
        } catch (fallbackError) {
          const msg = String(fallbackError?.message || fallbackError);
          console.log(`   💥 Fetch error: ${msg}\n`);
          report.errors.push({ url, error: msg });
          if (strict) hardFail = true;
          continue;
        }
      } else {
        const msg = String(e?.message || e);
        console.log(`   💥 Fetch error: ${msg}\n`);
        report.errors.push({ url, error: msg });
        if (strict) hardFail = true;
        continue;
      }
    }

    if (!fetched.ok) {
      console.log(`   💥 HTTP ${fetched.status} (pagina niet beschikbaar)\n`);
      report.errors.push({ url, error: `HTTP ${fetched.status}` });
      // Non-strict: warn only; strict: can fail
      if (strict) hardFail = true;
      continue;
    }

    const text = stripHtmlToText(fetched.html);
    const { final, findings } = scorePage({ url, html: fetched.html, text });

    // Strict behavior: fail if key trust pages are missing too much
    // (You can tune this later. For now: strict fails if any page ends up WARN with 6+ warnings)
    const warnCount = findings.filter((f) => f.level === "warn").length;
    const strictFinal = strict && final === "warn" && warnCount >= 6 ? "fail" : final;
    if (strictFinal === "fail") hardFail = true;

    report.pages.push({
      url,
      path: p,
      final: strictFinal,
      warnCount,
      findings,
    });

    report.summary[strictFinal]++;

    const icon = strictFinal === "ok" ? "✅" : strictFinal === "warn" ? "⚠️" : "❌";
    console.log(`   ${icon} ${strictFinal.toUpperCase()} — warnings: ${warnCount}`);

    // Print a compact list of WARNs
    const warns = findings.filter((f) => f.level === "warn");
    if (warns.length) {
      for (const w of warns.slice(0, 6)) {
        console.log(`      - ${w.key}: ${w.msg}`);
      }
      if (warns.length > 6) console.log(`      … +${warns.length - 6} meer`);
    }
    console.log("");
  }

  // Write JSON
  const outPath = path.resolve(process.cwd(), String(args.json || "reports/eeat-report.json"));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), "utf8");
  console.log(`📝 JSON report: ${outPath}\n`);

  console.log("📊 Summary");
  console.log(`OK:   ${report.summary.ok}`);
  console.log(`WARN: ${report.summary.warn}`);
  console.log(`FAIL: ${report.summary.fail}`);
  if (report.errors.length) console.log(`ERR:  ${report.errors.length}`);

  // Exit code
  // - strict: fail on hardFail/errors
  // - non-strict: never fail (warn only)
  if (strict && (hardFail || report.errors.length)) process.exit(2);
  process.exit(0);
}

main().catch((e) => {
  console.error("E-E-A-T check crashed:", e);
  process.exit(2);
});
