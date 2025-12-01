#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
}

const log = (msg, color = 'reset') => {
  console.log(colors[color] + msg + colors.reset)
}

const args = process.argv.slice(2)
const siteArg = args.find(a => a.startsWith('--site='))
const maxPagesArg = args.find(a => a.startsWith('--max-pages='))
const outArg = args.find(a => a.startsWith('--out='))

const BASE_URL = (siteArg ? siteArg.split('=')[1] : 'https://www.probrandwacht.nl').replace(/\/$/, '')
const MAX_PAGES = maxPagesArg ? parseInt(maxPagesArg.split('=')[1], 10) : 100
const OUTPUT_PATH = outArg ? outArg.split('=')[1] : null

// Eventuele “belangrijke” oude city-URLs om redirect op te checken
const OLD_CITY_SLUGS = [
  'amsterdam',
  'rotterdam',
  'den-haag',
  'utrecht',
  'eindhoven',
  'groningen',
  'nijmegen',
  'breda',
]

/**
 * Helpers
 */

async function safeFetch(url, opts = {}) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      ...opts,
    })
    return res
  } catch (e) {
    log(`✖ Fetch error for ${url}: ${e.message}`, 'red')
    return null
  }
}

async function getSitemapUrls(baseUrl) {
  const sitemapIndexUrl = `${baseUrl}/sitemap.xml`
  log(`\n🗺  Fetching sitemap index: ${sitemapIndexUrl}`, 'blue')

  const res = await safeFetch(sitemapIndexUrl)
  if (!res || !res.ok) {
    log(`⚠️  Could not fetch sitemap index (status ${res && res.status})`, 'yellow')
    return [baseUrl]
  }

  const xml = await res.text()
  const $ = cheerio.load(xml, { xmlMode: true })

  const sitemapLocs = $('sitemap > loc')
    .map((_, el) => $(el).text().trim())
    .get()

  let urlLocs = $('url > loc')
    .map((_, el) => $(el).text().trim())
    .get()

  // Als het een index is, ook child-sitemaps ophalen
  if (sitemapLocs.length) {
    log(`🔎 Found ${sitemapLocs.length} sitemap(s) in index`, 'cyan')
    for (const sm of sitemapLocs) {
      const resSm = await safeFetch(sm)
      if (!resSm || !resSm.ok) continue
      const xmlSm = await resSm.text()
      const $sm = cheerio.load(xmlSm, { xmlMode: true })
      const locs = $sm('url > loc')
        .map((_, el) => $sm(el).text().trim())
        .get()
      urlLocs = urlLocs.concat(locs)
    }
  }

  // Uniek maken
  const allUrls = Array.from(new Set(urlLocs))

  log(`📄 Found ${allUrls.length} URL(s) in sitemaps`, 'green')

  return allUrls
}

function extractPageMetrics(url, html, finalUrl, status) {
  const $ = cheerio.load(html)

  const title = $('title').first().text().trim()
  const metaDescription = $('meta[name="description"]').attr('content') || ''
  const canonical = $('link[rel="canonical"]').attr('href') || ''

  const h1Count = $('h1').length
  const h2Count = $('h2').length

  const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
  const wordCount = bodyText ? bodyText.split(' ').length : 0

  const images = $('img')
  const imagesWithoutAlt = images.filter((_, el) => !$(el).attr('alt')).length

  const hasCanonicalMismatch =
    canonical &&
    !canonical.startsWith(finalUrl) &&
    !finalUrl.startsWith(canonical)

  return {
    url,
    finalUrl,
    status,
    title,
    metaDescription,
    canonical,
    h1Count,
    h2Count,
    wordCount,
    imagesWithoutAlt,
    hasCanonicalMismatch,
  }
}

async function analyzeUrl(url) {
  const res = await safeFetch(url)
  if (!res) {
    return {
      url,
      finalUrl: null,
      status: null,
      error: 'fetch-failed',
    }
  }

  const finalUrl = res.url
  const status = res.status

  if (!res.headers.get('content-type')?.includes('text/html')) {
    return {
      url,
      finalUrl,
      status,
      error: 'non-html',
    }
  }

  const html = await res.text()
  return extractPageMetrics(url, html, finalUrl, status)
}

async function analyzeUrls(urls, maxPages) {
  const limited = urls.slice(0, maxPages)
  log(`\n🌐 Analyzing ${limited.length} page(s) (limit: ${maxPages})...\n`, 'blue')

  const results = []
  const concurrency = 5
  let index = 0

  async function worker() {
    while (index < limited.length) {
      const current = limited[index++]
      log(`  → [${index}/${limited.length}] ${current}`, 'cyan')
      const metrics = await analyzeUrl(current)
      results.push(metrics)
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker())
  await Promise.all(workers)

  return results
}

async function checkCityRedirects(baseUrl) {
  log(`\n🚦 Checking city redirects (/brandwacht-inhuren/:city → /steden/:city)...`, 'blue')

  const results = []

  for (const slug of OLD_CITY_SLUGS) {
    const oldUrl = `${baseUrl}/brandwacht-inhuren/${slug}`
    const expectedNew = `${baseUrl}/steden/${slug}`

    const res = await safeFetch(oldUrl)
    if (!res) {
      results.push({
        city: slug,
        oldUrl,
        finalUrl: null,
        status: null,
        ok: false,
        reason: 'fetch-failed',
      })
      continue
    }

    const finalUrl = res.url
    const status = res.status

    const isRedirect =
      status >= 300 && status < 400
    const ok =
      (isRedirect || status === 200) &&
      finalUrl.replace(/\/$/, '') === expectedNew.replace(/\/$/, '')

    results.push({
      city: slug,
      oldUrl,
      finalUrl,
      status,
      ok,
      reason: ok ? null : 'mismatch',
    })
  }

  return results
}

function summarizePageIssues(pages) {
  const issues = {
    total: pages.length,
    byStatus: {},
    missingTitle: [],
    missingDescription: [],
    missingCanonical: [],
    canonicalMismatch: [],
    noH1: [],
    multiH1: [],
    lowWordCount: [],
    imagesMissingAlt: [],
    notFound: [],
  }

  for (const p of pages) {
    if (!p || p.error === 'fetch-failed') continue

    const statusKey = p.status || 'unknown'
    issues.byStatus[statusKey] = (issues.byStatus[statusKey] || 0) + 1

    if (!p.title) issues.missingTitle.push(p.url)
    if (!p.metaDescription) issues.missingDescription.push(p.url)
    if (!p.canonical) issues.missingCanonical.push(p.url)
    if (p.hasCanonicalMismatch) issues.canonicalMismatch.push(p.url)
    if (p.h1Count === 0) issues.noH1.push(p.url)
    if (p.h1Count > 1) issues.multiH1.push(p.url)
    if (p.wordCount > 0 && p.wordCount < 200) issues.lowWordCount.push(p.url)
    if (p.imagesWithoutAlt > 0) issues.imagesMissingAlt.push(p.url)
    if (p.status === 404) issues.notFound.push(p.url)
  }

  return issues
}

function printSummary(issues, cityRedirects) {
  log('\n=====================================================', 'cyan')
  log('📊 SEO DASHBOARD – SUMMARY', 'cyan')
  log('=====================================================\n', 'cyan')

  log(`🌐 Pages analyzed: ${issues.total}`, 'green')

  log('\nHTTP status:', 'magenta')
  Object.entries(issues.byStatus).forEach(([status, count]) => {
    const col = status.startsWith('2') ? 'green' : status.startsWith('3') ? 'yellow' : 'red'
    log(`  ${status}: ${count}`, col)
  })

  const showList = (label, arr, sev) => {
    if (!arr.length) return
    const col = sev === 'critical' ? 'red' : sev === 'warning' ? 'yellow' : 'cyan'
    log(`\n${label}: ${arr.length}`, col)
    arr.slice(0, 5).forEach(u => log(`  • ${u}`, col))
    if (arr.length > 5) log(`  ... +${arr.length - 5} more`, col)
  }

  showList('❌ Missing <title>', issues.missingTitle, 'critical')
  showList('⚠️ Missing meta description', issues.missingDescription, 'warning')
  showList('⚠️ Missing canonical', issues.missingCanonical, 'warning')
  showList('⚠️ Canonical mismatch', issues.canonicalMismatch, 'warning')
  showList('⚠️ No H1', issues.noH1, 'warning')
  showList('⚠️ Multiple H1s', issues.multiH1, 'warning')
  showList('💡 Low word count (<200 words)', issues.lowWordCount, 'cyan')
  showList('💡 Images without alt', issues.imagesMissingAlt, 'cyan')
  showList('❌ 404 pages (from sitemap)', issues.notFound, 'critical')

  // City redirects
  log('\n🚦 City redirect check (/brandwacht-inhuren/:city → /steden/:city):', 'magenta')
  let okCount = 0
  let failCount = 0
  cityRedirects.forEach(r => {
    if (r.ok) {
      okCount++
      log(`  ✅ ${r.oldUrl} → ${r.finalUrl} [${r.status}]`, 'green')
    } else {
      failCount++
      log(
        `  ❌ ${r.oldUrl} → ${r.finalUrl || '—'} [${r.status ?? 'no status'}]`,
        'red',
      )
    }
  })
  log(`  Summary: ${okCount} OK, ${failCount} issues`, failCount ? 'yellow' : 'green')

  log('\n=====================================================\n', 'cyan')
}

function maybeWriteJson(pages, issues, cityRedirects) {
  if (!OUTPUT_PATH) return

  const out = {
    generatedAt: new Date().toISOString(),
    site: BASE_URL,
    pages,
    issues,
    cityRedirects,
  }

  const full = path.isAbsolute(OUTPUT_PATH)
    ? OUTPUT_PATH
    : path.join(process.cwd(), OUTPUT_PATH)

  fs.writeFileSync(full, JSON.stringify(out, null, 2), 'utf8')
  log(`💾 JSON report written to ${full}`, 'green')
}

async function main() {
  log('🚀 SEO Dashboard starting...', 'blue')
  log(`Site: ${BASE_URL}`, 'blue')
  log(`Max pages: ${MAX_PAGES}\n`, 'blue')

  const urls = await getSitemapUrls(BASE_URL)
  const pageMetrics = await analyzeUrls(urls, MAX_PAGES)
  const issues = summarizePageIssues(pageMetrics)
  const cityRedirects = await checkCityRedirects(BASE_URL)

  printSummary(issues, cityRedirects)
  maybeWriteJson(pageMetrics, issues, cityRedirects)
}

main().catch(err => {
  log(`Unexpected error: ${err.stack || err.message}`, 'red')
  process.exit(1)
})
