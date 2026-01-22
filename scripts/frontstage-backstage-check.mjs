#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)
const rootArgIndex = args.indexOf('--root')
const ROOT = rootArgIndex !== -1 ? args[rootArgIndex + 1] : '.'

const FRONTSTAGE_PATHS = ['app/(site)', 'components', 'content', 'lib/seo']

// Hard fails: claims/words that should not appear frontstage.
const BACKSTAGE_TERMS = [
  /dba[-\s]?proof/i,
  /\bcompliant\b/i,
  /juridisch\s+veilig/i,
  /wij\s+garanderen/i,
  /audit[-\s]?trail/i,
  /rolsamenvatting/i,
]

// Hard fails: price publication on frontstage.
const PRICE_PUBLICATION_TERMS = [
  /€\s?\d+/i,
  /\bEUR\s?\d+/i,
  /\d+\s?(?:-|\u2013)\s?\d+\s?\/\s?(?:u|uur)\b/i,
  /\b\d+\s?(?:\/u|\/uur)\b/i,
  /\bbandbreedte\b/i,
  /\bpercent\b/i,
  /%\b/,
  /\buurtarief\b/i,
]

// "Tarief" is allowed only in explicit boundary statements.
const TARIFF_WORD = /\btarief(?:en)?\b/gi

const TARIFF_ALLOWLIST = [
  /probrandwacht\s+bepaalt\s+geen\s+tarief/i,
  /wij\s+bepalen\s+geen\s+tarief/i,
  /wij\s+sturen\s+niet\s+op\s+tarief/i,
  /tarief(?:en)?\s+word(?:t|en)\s+1[-\s]?op[-\s]?1\s+afgesproken/i,
  /afspraken\s+over\s+tarief(?:en)?\s+maak\s+je\s+onderling/i,
]

function isTariffAllowed(text) {
  return TARIFF_ALLOWLIST.some((re) => re.test(text))
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else files.push(full)
  }
  return files
}

function snippetAround(content, idx, len = 140) {
  const start = Math.max(0, idx - Math.floor(len / 2))
  const end = Math.min(content.length, idx + Math.floor(len / 2))
  return content.slice(start, end).replace(/\s+/g, ' ').trim()
}

const findings = []

for (const relPath of FRONTSTAGE_PATHS) {
  const fullPath = path.join(ROOT, relPath)
  if (!fs.existsSync(fullPath)) continue

  const files = walk(fullPath).filter((f) => /\.(ts|tsx|js|md|mdx|json)$/i.test(f))

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')

    // Backstage leaks (hard).
    for (const re of BACKSTAGE_TERMS) {
      const match = content.match(re)
      if (match) {
        findings.push({
          severity: 'HIGH',
          type: 'BACKSTAGE_LEAK',
          file,
          match: match[0],
        })
      }
    }

    // Price publication (hard).
    for (const re of PRICE_PUBLICATION_TERMS) {
      const match = re.exec(content)
      if (match) {
        const idx = match.index ?? content.indexOf(match[0])
        findings.push({
          severity: 'HIGH',
          type: 'PRICE_PUBLICATION',
          file,
          match: match[0],
          context: snippetAround(content, idx),
        })
      }
    }

    // Tariff word (review).
    TARIFF_WORD.lastIndex = 0
    let t
    while ((t = TARIFF_WORD.exec(content)) !== null) {
      const idx = t.index
      const ctx = snippetAround(content, idx)

      if (isTariffAllowed(ctx)) continue

      findings.push({
        severity: 'MEDIUM',
        type: 'TARIFF_REVIEW',
        file,
        match: t[0],
        context: ctx,
      })
    }
  }
}

console.log('=== Frontstage / Backstage Sanity Check (v2) ===')
console.log(`Root: ${path.resolve(ROOT)}`)
const high = findings.filter((f) => f.severity === 'HIGH').length
const med = findings.filter((f) => f.severity === 'MEDIUM').length
console.log(`Findings: ${findings.length} (HIGH ${high}, MEDIUM ${med})\n`)

for (const f of findings) {
  console.log(`[${f.severity}] ${f.type}`)
  console.log(` File: ${f.file}`)
  console.log(` Match: ${f.match}`)
  if (f.context) console.log(` Context: ${f.context}`)
  console.log('')
}

process.exit(high > 0 ? 2 : med > 0 ? 1 : 0)
