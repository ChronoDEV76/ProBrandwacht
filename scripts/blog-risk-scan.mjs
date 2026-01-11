#!/usr/bin/env node
import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import process from "node:process";

// --- SEO allowlist (option 3) ---
async function loadSeoAllowlist(seoKeywordsPath) {
  if (!seoKeywordsPath) return { phrases: new Set(), tokens: new Set() };

  try {
    const raw = await fs.readFile(seoKeywordsPath, "utf8");

    // Pak alle '...' strings uit het TS bestand
    const phrases = new Set();
    for (const m of raw.matchAll(/'([^']+)'/g)) {
      const p = (m[1] || "").trim().toLowerCase();
      if (p) phrases.add(p);
    }

    // Tokens uit de phrases (voor woordniveau-whitelist)
    const tokens = new Set();
    const stop = new Set([
      "de",
      "het",
      "een",
      "en",
      "of",
      "voor",
      "bij",
      "in",
      "op",
      "met",
      "van",
      "naar",
      "aan",
      "via",
      "zonder",
      "wat",
      "waarom",
      "hoe",
      "welke",
      "zijn",
      "is",
      "niet",
      "wel",
      "als",
      "dan",
      "om",
      "te",
      "door",
    ]);

    for (const p of phrases) {
      for (const t of p.split(/[^a-z0-9à-ÿ]+/i)) {
        const tok = t.trim().toLowerCase();
        if (tok && tok.length >= 3 && !stop.has(tok)) tokens.add(tok);
      }
    }

    return { phrases, tokens };
  } catch {
    return { phrases: new Set(), tokens: new Set() };
  }
}

function isSeoCovered(snippet, seoAllow) {
  const s = (snippet || "").toLowerCase();
  if (!seoAllow) return false;

  // Phrase hit
  for (const p of seoAllow.phrases) {
    if (p && s.includes(p)) return true;
  }

  // Token hit
  for (const w of seoAllow.tokens) {
    if (w && s.includes(w)) return true;
  }

  return false;
}

// Optional render-scan
let JSDOM = null;
try {
  ({ JSDOM } = await import("jsdom"));
} catch (_) {
  // ok: render scan is optional
}

const DEFAULTS = {
  repoRoot: process.cwd(),
  contentGlob: "content/blog/*.mdx",
  outPrefix: "reports/blog-risk-scan",
  baseUrl: "http://localhost:3000",
  renderScan: false,
  maxSnippetsPerFile: 60,
  seoKeywordsPath: "seo/seo-keywords.ts",
};

// -----------------------------
// Heuristic patterns (NL)
// -----------------------------
const RE = {
  email: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}\b/g,
  phone: /\b(?:\+?\d{1,3}[\s\-]?)?(?:\(?\d{2,4}\)?[\s\-]?)?\d{6,10}\b/g,
  iban: /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/g,
  date:
    /\b(?:\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2}|(?:jan|feb|mrt|apr|mei|jun|jul|aug|sep|okt|nov|dec)[a-z]*\s+\d{1,2}(?:,\s*\d{4})?)\b/gi,
  companySuffix: /\b(BV|B\.V\.|NV|N\.V\.|VOF|V\.O\.F\.|Stichting)\b/g,

  // Tone / defamation-ish markers (heuristic)
  accusatory:
    /\b(fout|schuldig|nalatig|bedrog|misleiding|oplichting|afpersing|corrupt|incapabel|onprofessioneel|rotzooi|prutswerk)\b/gi,

  // Words that, combined with dates/names, can increase identifiability
  identifiableContext:
    /\b(klant|opdrachtgever|directeur|bedrijf|project|locatie|evenement)\b/gi,
};

// -----------------------------
// Finding helpers
// -----------------------------
function clipSnippet(text, start, end, window = 90) {
  const s = Math.max(0, start - window);
  const e = Math.min(text.length, end + window);
  return text.slice(s, e).replace(/\s+/g, " ").trim();
}

function collectMatches(text, regex, category, severity) {
  const out = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    // phone false-positive guard: require >= 9 digits
    if (category === "PII:phone") {
      const digits = m[0].replace(/\D/g, "");
      if (digits.length < 9) continue;
    }
    out.push({
      category,
      severity,
      snippet: clipSnippet(text, m.index, m.index + m[0].length),
    });
  }
  return out;
}

function severityScore(findings) {
  return findings.reduce((acc, f) => {
    if (f.severity === "high") return acc + 7;
    if (f.severity === "medium") return acc + 3;
    return acc + 1;
  }, 0);
}

function scanText(text, seoAllow) {
  const findings = [];

  findings.push(...collectMatches(text, new RegExp(RE.email), "PII:email", "high"));
  findings.push(...collectMatches(text, new RegExp(RE.phone), "PII:phone", "high"));
  findings.push(...collectMatches(text, new RegExp(RE.iban), "PII:iban", "high"));

  findings.push(...collectMatches(text, new RegExp(RE.date), "Identifiability:date", "medium"));
  findings.push(
    ...collectMatches(text, new RegExp(RE.companySuffix), "Identifiability:company_suffix", "medium")
  );

  findings.push(...collectMatches(text, new RegExp(RE.accusatory), "Tone:accusatory", "medium"));

  // 1) ZWARE termen: altijd melden, tenzij ze expliciet SEO-gedekt zijn
  const HEAVY =
    /\b(onrechtmatig|rechtmatig|aansprakelijk|wanprestatie|onrechtmatige daad|garandeert|100%|zeker weten|definitief)\b/gi;
  for (const f of collectMatches(text, new RegExp(HEAVY), "Legal:heavy claim", "medium")) {
    if (!isSeoCovered(f.snippet, seoAllow)) findings.push(f);
  }

  // 2) LICHTE/SEO-termen: alleen melden als ze NIET SEO-gedekt zijn en normerend
  const NORM = /\b(je moet|je mag|u moet|u mag|dient te|je bent verplicht|u bent verplicht)\b/gi;
  for (const f of collectMatches(text, new RegExp(NORM), "Legal:advice-like phrasing", "low")) {
    if (!isSeoCovered(f.snippet, seoAllow)) findings.push(f);
  }

  // combo flag (slimmer): alleen als er (1) contextwoorden en (2) een datum in de body
  // en (3) de datum niet alleen een wet-/versiedatum lijkt.
  const hasContext = RE.identifiableContext.test(text);
  const dateMatches = [...text.matchAll(new RegExp(RE.date))];
  const dateLooksLikeLawVersion = (snippet) =>
    /wetten\.overheid\.nl|BWBR|\/\d{4}-\d{2}-\d{2}\//i.test(snippet);
  const hasBodyDateThatIsNotLawVersion = dateMatches.some((m) => {
    const snip = clipSnippet(text, m.index, m.index + m[0].length, 60);
    return !dateLooksLikeLawVersion(snip);
  });

  if (hasContext && hasBodyDateThatIsNotLawVersion) {
    findings.push({
      category: "Identifiability:case-story combo",
      severity: "medium",
      snippet:
        "Contextwoorden + datum in body (niet enkel wet-/versiedatum) gevonden: check herleidbaarheid.",
    });
  }

  return findings;
}

// -----------------------------
// Render-scan (optional)
// -----------------------------
async function scanRenderedPage(url, seoAllow) {
  if (!JSDOM) return { ok: false, reason: "jsdom not installed" };
  const res = await fetch(url, { headers: { "User-Agent": "PBW-BlogRiskScan/1.0" } });
  const html = await res.text();
  const dom = new JSDOM(html);
  const text = dom.window.document.body?.textContent || "";
  return { ok: true, status: res.status, findings: scanText(text, seoAllow) };
}

// -----------------------------
// Main
// -----------------------------
function parseArgs(argv) {
  const args = { ...DEFAULTS };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--render") args.renderScan = true;
    else if (a === "--base") args.baseUrl = argv[++i];
    else if (a === "--glob") args.contentGlob = argv[++i];
    else if (a === "--out") args.outPrefix = argv[++i];
    else if (a === "--seo") args.seoKeywordsPath = argv[++i];
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const seoAllow = await loadSeoAllowlist(path.join(args.repoRoot, args.seoKeywordsPath));

  const files = await fg(args.contentGlob, { cwd: args.repoRoot, absolute: true });
  if (!files.length) {
    console.error(`[ERROR] No files matched glob: ${args.contentGlob}`);
    process.exit(1);
  }

  const reports = [];
  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const { data: frontmatter, content } = matter(raw);

    const slug = path.basename(file).replace(/\.mdx$/, "");
    // Scan alleen de body, niet de frontmatter → voorkomt false positives op date/updated/slug
    const bodyText = content ?? raw;
    const mdxFindings = scanText(bodyText, seoAllow);

    const rep = {
      file: path.relative(args.repoRoot, file),
      slug,
      title: frontmatter?.title || "",
      findings: mdxFindings.slice(0, args.maxSnippetsPerFile),
      score: severityScore(mdxFindings),
      rendered: null,
    };

    if (args.renderScan) {
      const url = `${args.baseUrl.replace(/\/$/, "")}/blog/${slug}`;
      try {
        const rendered = await scanRenderedPage(url, seoAllow);
        rep.rendered = {
          url,
          ...rendered,
          score: rendered.ok ? severityScore(rendered.findings) : 0,
        };
      } catch (e) {
        rep.rendered = { url, ok: false, reason: String(e) };
      }
    }

    reports.push(rep);
  }

  // sort: highest risk first
  reports.sort((a, b) => b.score - a.score);

  // write JSON
  await fs.mkdir(path.dirname(path.join(args.repoRoot, args.outPrefix)), { recursive: true });
  const jsonPath = path.join(args.repoRoot, `${args.outPrefix}.json`);
  await fs.writeFile(jsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), reports }, null, 2), "utf8");

  // simple HTML report
  const htmlRows = reports
    .map((r) => {
      const cats = [...new Set(r.findings.map((f) => f.category))].join(", ") || "—";
      const renderScore = r.rendered?.ok ? r.rendered.score : "";
      const renderLink = r.rendered?.url ? `<a href="${r.rendered.url}">${r.rendered.url}</a>` : "";
      return `<tr>
        <td><code>${r.file}</code></td>
        <td>${escapeHtml(r.title || "")}</td>
        <td>${r.slug}</td>
        <td><b>${r.score}</b></td>
        <td>${escapeHtml(cats)}</td>
        <td>${renderScore}</td>
        <td>${renderLink}</td>
      </tr>`;
    })
    .join("\n");

  const htmlDetails = reports
    .filter((r) => r.findings.length)
    .map((r) => {
      const items = r.findings
        .map((f) => `<li><b>${f.severity.toUpperCase()}</b> — ${escapeHtml(f.category)}<br><code>${escapeHtml(f.snippet)}</code></li>`)
        .join("\n");
      return `<h3>${escapeHtml(r.title || r.slug)}</h3><p><code>${r.file}</code></p><ul>${items}</ul>`;
    })
    .join("\n");

  const html = `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"/>
<title>ProBrandwacht Blog Risk Scan</title>
<style>
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:24px}
table{border-collapse:collapse;width:100%}
th,td{border:1px solid #ddd;padding:10px;vertical-align:top}
th{background:#f5f5f5;text-align:left}
code{display:block;white-space:pre-wrap;background:#fafafa;padding:8px;border:1px solid #eee}
.small{color:#555}
</style></head>
<body>
<h1>ProBrandwacht Blog Risk Scan</h1>
<p class="small">Heuristische scan (geen juridisch oordeel). Review HIGH en MEDIUM eerst.</p>

<h2>Summary</h2>
<table>
<thead><tr>
<th>File</th><th>Title</th><th>Slug</th><th>Score</th><th>Categories</th>
<th>Render score</th><th>Rendered URL</th>
</tr></thead>
<tbody>${htmlRows}</tbody>
</table>

<h2>Details</h2>
${htmlDetails || "<p>No findings.</p>"}
</body></html>`;

  const htmlPath = path.join(args.repoRoot, `${args.outPrefix}.html`);
  await fs.writeFile(htmlPath, html, "utf8");

  // Console summary
  const totalFindings = reports.reduce((acc, r) => acc + r.findings.length, 0);
  const high = reports.reduce((acc, r) => acc + r.findings.filter((f) => f.severity === "high").length, 0);
  const med = reports.reduce((acc, r) => acc + r.findings.filter((f) => f.severity === "medium").length, 0);
  const low = reports.reduce((acc, r) => acc + r.findings.filter((f) => f.severity === "low").length, 0);

  console.log(`Done. Files: ${reports.length}. Findings: ${totalFindings} (HIGH ${high} / MED ${med} / LOW ${low})`);
  console.log(`Wrote: ${jsonPath}`);
  console.log(`Wrote: ${htmlPath}`);
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
