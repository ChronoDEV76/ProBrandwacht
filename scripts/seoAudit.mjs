#!/usr/bin/env node
/**
 * seoAudit.mjs — ProBrandwacht SEO/UX Auditor v5
 *
 * Features
 * - Crawl with concurrency; normalizes www/apex; optional sitemap seeding
 * - NEW: --seed-from=https://prod.site and --rewrite-host=prod.host->localhost:3000
 * - Domain control: --same-domain=true|false + optional --domain=example.nl
 * - Checks: title/meta/H1, heading hierarchy, canonical, OG/Twitter, JSON-LD (Service/Article/FAQ),
 *           internal links, images (alt/lazy/legacy), CTA/tel, html[lang], rough perf hints
 * - Severity (critical/warning/info) + colorized terminal output (no deps)
 * - JSON + Markdown report; sorted by most issues
 * - Autofix (--apply) for MD/MDX in --content=dir1,dir2 (frontmatter, extra H1→H2, alt/lazy)
 *
 * Examples:
 * node scripts/seoAudit.mjs --start=https://www.probrandwacht.nl --max-pages=200 --seed-sitemap=true --domain=probrandwacht.nl --output=seo_report.json --md=seo_report.md
 * node scripts/seoAudit.mjs --start=http://localhost:3000 --max-pages=300 --seed-sitemap=true --seed-from=https://www.probrandwacht.nl --rewrite-host=www.probrandwacht.nl->localhost:3000 --apply --content=content/blog,content/pages --output=local_seo.json --md=local_seo.md
 */

import {
  writeFileSync, existsSync, readFileSync, readdirSync
} from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { URL } from "node:url";
import { fetch } from "undici";
import * as cheerio from "cheerio";
import matter from "gray-matter";

// ---------------------- Args ----------------------
const args = Object.fromEntries(
  process.argv.slice(2).map(p => {
    const [k, ...rest] = p.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const START = String(args.start || "");
if (!START) {
  console.error("Gebruik: --start=https://www.jouwdomein.nl");
  process.exit(2);
}
const MAX_PAGES = Number(args["max-pages"] || 50);
const OUTPUT = String(args.output || "seo_report.json");
const MDOUT = args.md ? String(args.md) : null;
const TIMEOUT_MS = Number(args.timeout || 15000);
const SAME_DOMAIN_ONLY = String(args["same-domain"] ?? "true") !== "false";
const USER_AGENT = "ProBrandwacht-SEOAudit/5.0 (+audit)";
const SEED_SITEMAP = String(args["seed-sitemap"] ?? "false") === "true";
const SEED_FROM = args["seed-from"] ? String(args["seed-from"]) : null;              // e.g. https://www.probrandwacht.nl
const REWRITE_HOST = args["rewrite-host"] ? String(args["rewrite-host"]) : null;      // e.g. www.probrandwacht.nl->localhost:3000
const BASE_FILTER_DOMAIN = args.domain ? String(args.domain).toLowerCase() : null;
const LOG = String(args.log || "");
const CONCURRENCY = Number(args.concurrency || 6);

// Autofix
const APPLY = args.apply === true || args.apply === "true";
const CONTENT_DIRS = (args.content ? String(args.content) : "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// Colors (no deps)
const useColor = process.stdout.isTTY && String(args.color ?? "true") !== "false";
const C = {
  red:   (s) => useColor ? `\x1b[31m${s}\x1b[0m` : String(s),
  yellow:(s) => useColor ? `\x1b[33m${s}\x1b[0m` : String(s),
  green: (s) => useColor ? `\x1b[32m${s}\x1b[0m` : String(s),
  cyan:  (s) => useColor ? `\x1b[36m${s}\x1b[0m` : String(s),
  bold:  (s) => useColor ? `\x1b[1m${s}\x1b[0m`  : String(s),
};
const dlog = (...x) => { if (LOG === "debug") console.error("[debug]", ...x); };

// ---------------------- Helpers ----------------------
function norm(u) {
  try {
    const url = new URL(u);
    url.hash = "";
    if (url.pathname !== "/" && url.pathname.endsWith("/")) url.pathname = url.pathname.slice(0, -1);
    return url.toString();
  } catch {
    return u;
  }
}
const normalizeHost = (h) => h.replace(/^www\./i, "");
function sameHost(a, b) {
  try {
    const A = new URL(a), B = new URL(b);
    return normalizeHost(A.host) === normalizeHost(B.host);
  } catch { return false; }
}
function hostMatchesDomain(u, domain) {
  try {
    const h = new URL(u).host.toLowerCase();
    return h === domain || h.endsWith(`.${domain}`);
  } catch { return false; }
}
function isHTTP(u) { return u.startsWith("http://") || u.startsWith("https://"); }
function within(n, min, max) { return n >= min && n <= max; }
function bytesFromHeaders(headers) {
  const cl = headers.get("content-length");
  return cl ? Number(cl) : null;
}
function getOg($, prop) { return $(`meta[property="${prop}"]`).attr("content") || ""; }
function getMeta($, name) { return $(`meta[name="${name}"]`).attr("content") || ""; }
function linkRel($, rel) { return $(`link[rel="${rel}"]`).attr("href") || ""; }

function headingIssues($) {
  const issues = [];
  const h1s = $("h1");
  if (h1s.length !== 1) issues.push(`H1-count is ${h1s.length} (moet precies 1 zijn).`);
  let last = 0;
  $("h1,h2,h3,h4,h5,h6").each((_, el) => {
    const level = Number(el.tagName.substring(1));
    if (last && level > last + 1) issues.push(`Heading springt van H${last} naar H${level}.`);
    last = level;
  });
  return issues;
}
function parseJSONLD($) {
  const out = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const txt = $(el).text();
    try {
      const obj = JSON.parse(txt);
      if (Array.isArray(obj)) out.push(...obj);
      else out.push(obj);
    } catch { /* ignore */ }
  });
  return out;
}
function hasType(objs, t) {
  return objs.some(o => o["@type"] === t || (Array.isArray(o["@type"]) && o["@type"].includes(t)));
}
function countInternalLinks($, origin) {
  const a = $("a[href]");
  let internal = 0;
  a.each((_, el) => {
    const href = String($(el).attr("href") || "");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    try {
      const abs = new URL(href, origin).toString();
      if (sameHost(abs, origin)) internal++;
    } catch {}
  });
  return internal;
}
function findCTAs($) {
  const texts = [];
  $("a,button").each((_, el) => {
    const t = $(el).text().trim().toLowerCase();
    if (!t) return;
    if (/(offerte|aanvraag|contact|bel|nu aanvragen|vrijblijvend)/i.test(t)) texts.push(t);
  });
  const tel = $('a[href^="tel:"]').length;
  const whatsapp = $('a[href*="wa.me"],a[href*="api.whatsapp.com"]').length;
  return { ctaTexts: Array.from(new Set(texts)), telLinks: tel, whatsappLinks: whatsapp };
}
function imageHints($) {
  const imgs = $("img");
  let missingAlt = 0, noLazy = 0, legacyFormat = 0;
  imgs.each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined || alt === "") missingAlt++;
    const loading = $(el).attr("loading");
    if (!loading || !/lazy/i.test(loading)) noLazy++;
    const src = $(el).attr("src") || "";
    if (/\.(jpg|jpeg|png)$/i.test(src)) legacyFormat++;
  });
  return { imgCount: imgs.length, missingAlt, noLazy, legacyFormat };
}
function collectScriptsStyles($) {
  return {
    js: $('script[src]').map((_,e)=>$(e).attr('src')).get(),
    css: $('link[rel="stylesheet"]').map((_,e)=>$(e).attr('href')).get()
  };
}

// Severity mapping
function severityOf(msg) {
  const m = msg.toLowerCase();
  if (
    m.includes('ontbrekende <title>') ||
    m.includes('meta description ontbreekt') ||
    m.includes('ontbrekende <link rel="canonical">') ||
    m.includes('open graph onvolledig') ||
    m.includes('h1-count') ||
    m.includes('heading springt') ||
    m.includes('json-ld ontbreekt') ||
    m.includes('status: 4') || m.includes('status: 5')
  ) return 'critical';

  if (
    m.includes('weinig interne links') ||
    m.includes('loading="lazy"') ||
    m.includes('afbeelding(en) zonder alt') ||
    m.includes('twitter card ontbreekt') ||
    m.includes('grote html-respons') ||
    m.includes('veel js bestanden') ||
    m.includes('veel stylesheets') ||
    m.includes('<html lang> ontbreekt') ||
    m.includes('tel: link')
  ) return 'warning';

  return 'info';
}

// Host rewrite (prod -> localhost)
function rewriteHost(u, mapSpec) {
  if (!mapSpec) return u;
  const [from, to] = mapSpec.split('->').map(s => s.trim());
  try {
    const src = new URL(u);
    const fromBare = from.replace(/^www\./i, '');
    const hostMatch = src.host === from || src.host.replace(/^www\./i, '') === fromBare;
    if (!hostMatch) return u;

    // Build target
    const dst = new URL(u);
    if (to.includes('localhost')) {
      // e.g. localhost:3000
      const [host, port] = to.split(':');
      dst.protocol = 'http:';
      dst.hostname = host;
      dst.port = port || '';
    } else {
      dst.hostname = to.replace(/^https?:\/\//,'');
      dst.port = '';
    }
    return dst.toString();
  } catch { return u; }
}

// ---------------------- Fetch / Crawl ----------------------
async function fetchHTML(url) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": USER_AGENT, "accept": "text/html,*/*" }
    });
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    const isHTML = ct.includes("text/html") || ct.includes("application/xhtml");
    const text = isHTML ? await res.text() : "";
    return { res, text, isHTML };
  } catch (e) {
    return { error: String(e) };
  } finally {
    clearTimeout(id);
  }
}

async function fetchText(url) {
  try {
    const r = await fetch(url, { headers: { "user-agent": USER_AGENT }});
    if (!r.ok) return { status: r.status, text: "" };
    return { status: r.status, text: await r.text() };
  } catch {
    return { status: 0, text: "" };
  }
}

async function seedFromSitemap(sitemapUrl) {
  try {
    const r = await fetch(sitemapUrl, { headers: { "user-agent": USER_AGENT }});
    if (!r.ok) return [];
    const xml = await r.text();
    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    return locs.map(norm);
  } catch { return []; }
}

function makeEmptyChecks() {
  return {
    title: '', metaDesc: '', lang: '',
    canonical: '', robotsMeta: '',
    og: { title: '', description: '', image: '' },
    twitterCard: null,
    h1Count: 0,
    internalLinks: 0,
    images: { imgCount: 0, missingAlt: 0, noLazy: 0, legacyFormat: 0 },
    schema: { hasFAQ: false, hasService: false, hasArticle: false, faqCount: 0 },
    cta: { ctaTexts: [], telLinks: 0, whatsappLinks: 0 },
    resources: { jsCount: 0, cssCount: 0 },
  };
}

async function crawl(start, maxPages) {
  const startUrl = norm(start);
  const q = [];
  const enqueued = new Set(); // to avoid duplicate queueing
  const results = [];
  const pushed = new Set();   // URLs already pushed to results (by URL)

  const enqueue = (u) => {
    if (!u) return;
    const url = norm(u);
    if (enqueued.has(url)) return;
    if (results.length + q.length >= maxPages) return;
    enqueued.add(url);
    q.push(url);
  };

  enqueue(startUrl);

  // Seed from sitemap (from start or from --seed-from)
  if (SEED_SITEMAP) {
    const seedBase = SEED_FROM ? new URL(SEED_FROM).origin : new URL(startUrl).origin;
    let seeds = await seedFromSitemap(`${seedBase}/sitemap.xml`);
    if (REWRITE_HOST) seeds = seeds.map(u => rewriteHost(u, REWRITE_HOST));
    for (const u of seeds) {
      // domain guards for seeds too
      if (SAME_DOMAIN_ONLY) {
        if (!sameHost(u, startUrl)) continue;
      } else if (BASE_FILTER_DOMAIN && !hostMatchesDomain(u, BASE_FILTER_DOMAIN)) {
        continue;
      }
      enqueue(u);
    }
  }

  const workers = Math.max(1, Math.min(CONCURRENCY, MAX_PAGES));

  async function worker() {
    while (q.length && results.length < maxPages) {
      const url = q.shift();
      try {
        const { res, text, isHTML, error } = await fetchHTML(url);
        const page = {
          url, status: res?.status ?? 0, ok: !!res?.ok,
          errors: [], suggestions: [], bytes: null,
          checks: makeEmptyChecks()
        };

        if (pushed.has(url)) { continue; } // already processed (safety)
        pushed.add(url);

        if (error) {
          page.errors.push(`Fetch error: ${error}`);
          results.push(page);
          continue;
        }
        page.bytes = bytesFromHeaders(res.headers);

        if (!isHTML) {
          // keep empty checks so reports never crash
          results.push(page);
          continue;
        }

        const $ = cheerio.load(text);

        // meta
        page.checks.title = ($("title").text() || "").trim();
        page.checks.metaDesc = getMeta($, "description");
        page.checks.lang = $("html").attr("lang") || "";
        page.checks.canonical = linkRel($, "canonical");
        page.checks.robotsMeta = getMeta($, "robots");
        page.checks.og.title = getOg($, "og:title");
        page.checks.og.description = getOg($, "og:description");
        page.checks.og.image = getOg($, "og:image");
        page.checks.twitterCard = getMeta($, "twitter:card");

        // headings
        const hIssues = headingIssues($);
        page.checks.h1Count = $("h1").length;

        // internal links
        page.checks.internalLinks = countInternalLinks($, url);

        // images
        page.checks.images = imageHints($);

        // JSON-LD
        const jsonld = parseJSONLD($);
        page.checks.schema.hasFAQ = hasType(jsonld, "FAQPage");
        page.checks.schema.hasService = hasType(jsonld, "Service");
        page.checks.schema.hasArticle = hasType(jsonld, "Article");
        if (page.checks.schema.hasFAQ) {
          const faq = jsonld.find(o => o["@type"] === "FAQPage" || (Array.isArray(o["@type"]) && o["@type"].includes("FAQPage")));
          page.checks.schema.faqCount = Array.isArray(faq?.mainEntity) ? faq.mainEntity.length : 0;
        }

        // CTAs / contact
        page.checks.cta = findCTAs($);

        // Scripts / styles
        const { js, css } = collectScriptsStyles($);
        page.checks.resources = { jsCount: js.length, cssCount: css.length };

        // Build suggestions
        const s = [];
        if (!page.checks.title) s.push("Ontbrekende <title>.");
        if (page.checks.title && !within(page.checks.title.length, 10, 60)) s.push(`Title-lengte ${page.checks.title.length} (streef 10–60).`);
        if (!page.checks.metaDesc) s.push("Meta description ontbreekt.");
        else if (!within(page.checks.metaDesc.length, 50, 160)) s.push(`Meta description-lengte ${page.checks.metaDesc.length} (streef 50–160).`);
        if (hIssues.length) s.push(...hIssues);
        if (!page.checks.canonical) s.push('Ontbrekende <link rel="canonical">.');
        if (!page.checks.og.title || !page.checks.og.description || !page.checks.og.image) s.push("Open Graph onvolledig (og:title/description/image).");
        if (!page.checks.twitterCard) s.push("Twitter card ontbreekt (name=twitter:card).");
        if (!page.checks.schema.hasService && !page.checks.schema.hasArticle && !page.checks.schema.hasFAQ) s.push("JSON-LD ontbreekt (Service/Article/FAQ). Voeg passende schema toe.");
        if (page.checks.schema.hasFAQ && page.checks.schema.faqCount && (page.checks.schema.faqCount < 2 || page.checks.schema.faqCount > 4)) s.push(`FAQ schema heeft ${page.checks.schema.faqCount} Q&A (streef 2–4).`);
        if (page.checks.internalLinks < 2) s.push(`Weinig interne links (${page.checks.internalLinks}). Voeg 2–5 interne links toe.`);
        if (page.checks.images.missingAlt > 0) s.push(`${page.checks.images.missingAlt} afbeelding(en) zonder alt-tekst.`);
        if (page.checks.images.noLazy > 0) s.push(`${page.checks.images.noLazy} afbeelding(en) zonder loading="lazy".`);
        if (page.checks.images.legacyFormat > 0) s.push(`${page.checks.images.legacyFormat} afbeelding(en) in JPG/PNG. Overweeg WebP/AVIF.`);
        if (!page.checks.lang) s.push(`<html lang> ontbreekt.`);
        if (page.checks.cta.ctaTexts.length === 0) s.push("Geen duidelijke CTA (Offerte/Contact) gevonden.");
        if (page.checks.cta.telLinks === 0) s.push("Geen tel: link gevonden (snelle bereikbaarheid).");
        if ((page.bytes ?? 0) > 1500000) s.push(`Grote HTML-respons (~${Math.round((page.bytes||0)/1024)}KB). Optimaliseer.`);
        if (page.checks.resources.jsCount > 15) s.push(`Veel JS bestanden (${page.checks.resources.jsCount}). Bundling/treeshaking overwegen.`);
        if (page.checks.resources.cssCount > 10) s.push(`Veel stylesheets (${page.checks.resources.cssCount}). Combineer/optimaliseer.`);

        page.suggestions = s;
        results.push(page);

        // Enqueue anchors
        const anchors = $("a[href]").map((_, el) => $(el).attr("href")).get();
        dlog(url, "anchors found:", anchors.length);
        for (let href of anchors) {
          if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
          try { href = new URL(href, url).toString(); } catch { continue; }
          if (!isHTTP(href)) continue;

          // Domain guards
          if (SAME_DOMAIN_ONLY) {
            if (!sameHost(href, startUrl)) continue;
          } else if (BASE_FILTER_DOMAIN && !hostMatchesDomain(href, BASE_FILTER_DOMAIN)) {
            continue;
          }

          enqueue(href);
        }
      } catch {
        // swallow and continue
      } finally {
        await sleep(30);
      }
    }
  }

  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

// ---------------------- Reporting ----------------------
function summarize(pages) {
  let crit = 0, warn = 0, info = 0, pagesWithIssues = 0;
  for (const p of pages) {
    const counts = { critical:0, warning:0, info:0 };
    for (const s of p.suggestions) counts[severityOf(s)]++;
    if (p.suggestions.length) pagesWithIssues++;
    crit += counts.critical; warn += counts.warning; info += counts.info;
    p._severityCounts = counts;
  }
  return { crit, warn, info, pagesWithIssues, total: pages.length };
}

function toMD(report) {
  const lines = [];
  lines.push(`# SEO/UX Audit Rapport`);
  lines.push(`Start: ${report.start}  `);
  lines.push(`Gecrawlde pagina's: ${report.pages.length}  `);
  lines.push(`Datum: ${new Date().toISOString()}`);
  lines.push(``);

  const totals = (() => {
    let crit=0,warn=0,info=0,pagesWithIssues=0;
    for (const p of report.pages) {
      const counts = { critical:0, warning:0, info:0 };
      for (const s of p.suggestions) counts[severityOf(s)]++;
      if (p.suggestions.length) pagesWithIssues++;
      crit += counts.critical; warn += counts.warning; info += counts.info;
    }
    return {crit, warn, info, pagesWithIssues, total: report.pages.length};
  })();

  lines.push(`**Samenvatting**: ${totals.total} pagina's · ${totals.pagesWithIssues} met issues · ` +
             `Critical: ${totals.crit} · Warnings: ${totals.warn} · Info: ${totals.info}`);
  lines.push(``);

  const sorted = [...report.pages].sort((a,b)=>b.suggestions.length - a.suggestions.length);

  for (const p of sorted) {
    const imgCount = p?.checks?.images?.imgCount ?? 0;
    const internalLinks = p?.checks?.internalLinks ?? 0;

    lines.push(`---`);
    lines.push(`### ${p.url}`);
    lines.push(`Status: ${p.status}  `);
    lines.push(`Interne links: ${internalLinks}  `);
    lines.push(`Afbeeldingen: ${imgCount}`);
    if (p.suggestions.length) {
      lines.push(`**Verbeterpunten (${p.suggestions.length}):**`);
      for (const s of p.suggestions) {
        const sev = severityOf(s);
        lines.push(`- [${sev}] ${s}`);
      }
    } else {
      lines.push(`✅ Geen directe issues gedetecteerd.`);
    }
    lines.push(``);
  }
  return lines.join("\n");
}

function printPretty(pages, summary, outputs) {
  const { crit, warn, info, pagesWithIssues, total } = summary;
  const sorted = [...pages].sort((a,b) => b.suggestions.length - a.suggestions.length);

  console.log('');
  console.log(C.bold('=== SEO/UX Audit – Overzicht ==='));
  console.log(`Totaal pagina's: ${total}`);
  console.log(`Pagina's met issues: ${pagesWithIssues}`);
  console.log(`${C.red('Critical')}: ${crit} · ${C.yellow('Warnings')}: ${warn} · ${C.cyan('Info')}: ${info}`);
  console.log('');

  console.log(C.bold('Top probleempagina’s (max 10):'));
  for (const p of sorted.slice(0, 10)) {
    const sc = p._severityCounts ?? {critical:0, warning:0, info:0};
    const line =
      `- ${p.url}\n  ${C.red('critical:'+sc.critical)}  ${C.yellow('warning:'+sc.warning)}  ${C.cyan('info:'+sc.info)}  · totaal: ${p.suggestions.length}`;
    console.log(line);
  }

  console.log('\n' + C.green('Rapporten: ') + outputs.join(', '));
}

// ---------------------- Autofix (MD/MDX) ----------------------
function summarizeBody(body, max = 160) {
  const first = (body || '')
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/```[\s\S]*?```/g, '')
    .split(/\n\s*\n/)[0] || '';
  const clean = first.replace(/\s+/g,' ').trim();
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean;
}
function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}
function fixHeadings(markup) {
  const lines = markup.split('\n');
  let h1Seen = false;
  const out = lines.map(l => {
    const hashes = (l.match(/^#{1,6}\s/) || [])[0];
    if (!hashes) return l;
    if (hashes.startsWith('##')) return l; // niet H1
    if (hashes.startsWith('# ')) {
      if (!h1Seen) { h1Seen = true; return l; }
      return l.replace(/^#\s/,'## ');
    }
    return l;
  });
  return out.join('\n');
}
function fixHtmlImgs(markup) {
  return markup.replace(/<img([^>]*?)>/gi, (m, attrs) => {
    let a = attrs;
    if (!/\balt\s*=/.test(a)) {
      const src = (a.match(/\bsrc\s*=\s*["']([^"']+)["']/i) || [,''])[1];
      const file = src ? path.basename(src).replace(/\.[a-z0-9]+$/i,'') : 'afbeelding';
      a += ` alt="${file.replace(/[-_]+/g,' ')}"`;
    } else {
      a = a.replace(/\balt\s*=\s*["']\s*["']/i, 'alt="afbeelding"');
    }
    if (!/\bloading\s*=/.test(a)) a += ' loading="lazy"';
    return `<img${a}>`;
  });
}
function fixMdImgs(markup) {
  return markup.replace(/!\[(.*?)\]\(([^)]+)\)/g, (_, alt, src) => {
    let newAlt = alt;
    if (!alt || !alt.trim()) {
      const file = path.basename(src).replace(/\.[a-z0-9]+$/i,'');
      newAlt = file.replace(/[-_]+/g,' ');
    }
    return `![${newAlt}](${src})`;
  });
}
function ensureFrontmatter(filePath, input) {
  const parsed = matter(input);
  const data = parsed.data || {};
  const body = parsed.content || '';

  let changed = false;

  if (!data.description || !String(data.description).trim()) {
    data.description = summarizeBody(input, 160);
    changed = true;
  }
  if (!data.slug || !String(data.slug).trim()) {
    const base = path.basename(filePath).replace(/\.(mdx?|MDX?)$/,'');
    data.slug = slugify(data.title || base);
    changed = true;
  }
  if (!data.updated) {
    data.updated = new Date().toISOString().slice(0,10);
    changed = true;
  }

  const fm = matter.stringify(body, data);
  return { text: fm, changed };
}
function applyMdFixes(original) {
  let s = original;
  const before = s;
  s = fixHeadings(s);
  s = fixMdImgs(s);
  s = fixHtmlImgs(s);
  return { text: s, changed: s !== before };
}
async function autofixContent(dirs) {
  const patched = [];
  for (const dir of dirs) {
    if (!dir) continue;
    const abs = path.resolve(dir);
    if (!existsSync(abs)) continue;

    const stack = [abs];
    while (stack.length) {
      const d = stack.pop();
      const entries = readdirSync(d, { withFileTypes: true });
      for (const e of entries) {
        if (e.name.startsWith('.')) continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) { stack.push(p); continue; }
        if (!/\.(mdx?|MDX?)$/.test(e.name)) continue;

        const raw = readFileSync(p, 'utf8');

        // 1) Frontmatter
        const fm = ensureFrontmatter(p, raw);

        // 2) Body fixes
        const current = matter(fm.text);
        const fixedBody = applyMdFixes(current.content);
        let finalText = fm.text;
        if (fixedBody.changed) {
          finalText = matter.stringify(fixedBody.text, current.data);
        }

        if (fm.changed || fixedBody.changed) {
          writeFileSync(p, finalText, 'utf8');
          patched.push({
            file: p,
            frontmatterChanged: fm.changed,
            contentChanged: fixedBody.changed
          });
        }
      }
    }
  }
  return patched;
}

// ---------------------- Main ----------------------
(async () => {
  const startUrl = START.endsWith("/") ? START.slice(0, -1) : START;

  // Site-level info (robots/sitemap) — from start origin
  const base = new URL(startUrl);
  const robotsURL = `${base.origin}/robots.txt`;
  const sitemapURL = `${base.origin}/sitemap.xml`;

  const [robots, sitemap] = await Promise.all([fetchText(robotsURL), fetchText(sitemapURL)]);
  const siteSuggestions = [];
  if (!robots.status || robots.status >= 400) siteSuggestions.push("robots.txt niet gevonden of onbereikbaar.");
  if (!sitemap.status || sitemap.status >= 400) siteSuggestions.push("sitemap.xml niet gevonden of onbereikbaar.");

  // Crawl
  const pages = await crawl(startUrl, MAX_PAGES);
  const summary = summarize(pages);

  // Duplicate titles/descriptions site-wide
  const titleMap = new Map();
  const descMap = new Map();
  for (const p of pages) {
    const t = (p?.checks?.title || "").toLowerCase();
    const d = (p?.checks?.metaDesc || "").toLowerCase();
    if (t) titleMap.set(t, (titleMap.get(t) || 0) + 1);
    if (d) descMap.set(d, (descMap.get(d) || 0) + 1);
  }
  const dupTitles = [...titleMap.entries()].filter(([, c]) => c > 1).map(([k, c]) => `"${k}" ×${c}`);
  const dupDescs  = [...descMap.entries()].filter(([, c]) => c > 1).map(([k, c]) => `"${k}" ×${c}`);
  if (dupTitles.length) siteSuggestions.push(`Dubbele <title>: ${dupTitles.slice(0,10).join("; ")}`);
  if (dupDescs.length) siteSuggestions.push(`Dubbele meta descriptions: ${dupDescs.slice(0,10).join("; ")}`);

  const report = {
    start: startUrl,
    robots: { status: robots.status },
    sitemap: { status: sitemap.status },
    siteSuggestions,
    pages
  };

  // Write outputs
  const outs = [OUTPUT];
  writeFileSync(OUTPUT, JSON.stringify(report, null, 2), "utf8");
  if (MDOUT) { writeFileSync(MDOUT, toMD(report), "utf8"); outs.push(MDOUT); }

  printPretty(pages, summary, outs);

  console.log(`\n✅ Audit voltooid: ${pages.length} pagina's`);
  console.log(`↳ JSON: ${OUTPUT}${MDOUT ? `, MD: ${MDOUT}` : ""}`);

  // Autofix
  if (APPLY && CONTENT_DIRS.length) {
    console.log('\n🛠  Autofix: start op', CONTENT_DIRS.join(', '));
    const patched = await autofixContent(CONTENT_DIRS);
    if (patched.length === 0) {
      console.log('ℹ️  Geen contentbestanden om te patchen of geen wijzigingen nodig.');
    } else {
      console.log(`✅ Autofix klaar — aangepaste bestanden: ${patched.length}`);
      patched.slice(0, 20).forEach(p =>
        console.log(`- ${p.file} ${p.frontmatterChanged ? '[frontmatter]' : ''} ${p.contentChanged ? '[content]' : ''}`)
      );
      if (patched.length > 20) console.log(`… (+${patched.length - 20} meer)`);
      console.log('💡 Review & commit je wijzigingen -> deploy.');
    }
  }

  // Exit as a quality gate: non-zero if issues found
  const hasSerious =
    siteSuggestions.length > 0 ||
    pages.some(p => p.suggestions.length > 0 || !p.ok || p.status >= 400);
  process.exit(hasSerious ? 1 : 0);
})();

