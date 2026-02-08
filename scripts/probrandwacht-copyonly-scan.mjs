#!/usr/bin/env node
/**
 * ProBrandwacht Copy-Only Scanner (OOM-proof)
 * Scant ALLEEN:
 *  - app/(site)
 *  - components
 *  - content
 *  - lib
 * En negeert technische mappen (scripts/docs/utils/etc).
 *
 * Usage:
 *   node --max-old-space-size=4096 scripts/probrandwacht-copyonly-scan.mjs --root . --config scripts/probrandwacht-copyonly.config.json
 */

import fs from 'node:fs'
import path from 'node:path'

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name)
  if (i === -1) return fallback
  return process.argv[i + 1] ?? fallback
}

const ROOT = path.resolve(arg('--root', '.'))
const CONFIG_PATH = path.resolve(
  arg('--config', 'scripts/probrandwacht-copyonly.config.json')
)

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

const cfg = readJson(CONFIG_PATH)
const TONE_PROFILE_PATH = path.resolve(arg('--tone', 'scripts/tone/probrandwacht-tone.json'))

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function phraseToPatternString(phrase) {
  const escaped = escapeRegex(phrase).replace(/\s+/g, '\\s+')
  const startsWord = /^[A-Za-z0-9]/.test(phrase)
  const endsWord = /[A-Za-z0-9]$/.test(phrase)
  return startsWord && endsWord ? `\\b${escaped}\\b` : escaped
}

function loadToneProfile() {
  if (!fs.existsSync(TONE_PROFILE_PATH)) return null
  try {
    return JSON.parse(fs.readFileSync(TONE_PROFILE_PATH, 'utf8'))
  } catch {
    return null
  }
}

function appendToneRules(cfgObj, tone) {
  if (!tone) return
  const disallowed = tone.disallowed_language ?? {}
  const avoidVoice = tone.preferred_voice?.avoid ?? []
  const forbiddenPromises = tone.guarantees_and_promises?.forbidden ?? []
  const closingAvoid = tone.closing_guidance?.avoid ?? []

  const toPatterns = (arr) =>
    (Array.isArray(arr) ? arr : []).map((p) => phraseToPatternString(p))

  const pushRule = (id, patterns, level = 'HIGH') => {
    if (!patterns?.length) return
    cfgObj.rules = cfgObj.rules ?? []
    cfgObj.rules.push({
      id,
      level,
      message: `Tone guard (${id})`,
      patterns
    })
  }

  pushRule('TONE_ACTIVIST', toPatterns(disallowed.activist_terms))
  pushRule('TONE_ACCUSATORY', toPatterns(disallowed.accusatory_terms))
  pushRule('TONE_COLLECTIVE', toPatterns(disallowed.collective_identity))
  pushRule('TONE_EMOTIONAL', toPatterns(disallowed.emotional_charge))
  pushRule('TONE_VOICE_AVOID', toPatterns(avoidVoice), 'MEDIUM')
  pushRule('TONE_GUARANTEES', toPatterns(forbiddenPromises))
  pushRule('TONE_CLOSING_AVOID', toPatterns(closingAvoid), 'MEDIUM')
}

appendToneRules(cfg, loadToneProfile())

const includeRoots = (cfg.includeRoots || []).map((p) => path.join(ROOT, p))
const includeExts = new Set(cfg.includeExtensions || [])
const excludeDirNames = new Set(cfg.excludeDirs || [])
const maxFileSizeBytes = cfg.maxFileSizeBytes ?? 2_000_000
const rules = cfg.rules || []

function isExcludedDir(absPath) {
  const base = path.basename(absPath)
  return excludeDirNames.has(base)
}

function walkFiles(startDir, out) {
  const stack = [startDir]
  while (stack.length) {
    const dir = stack.pop()
    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      continue
    }

    for (const e of entries) {
      const full = path.join(dir, e.name)

      if (e.isDirectory()) {
        if (isExcludedDir(full)) continue
        stack.push(full)
        continue
      }

      if (!e.isFile()) continue

      const ext = path.extname(e.name).toLowerCase()
      if (!includeExts.has(ext)) continue

      out.push(full)
    }
  }
}

function safeReadFile(absFile) {
  const st = fs.statSync(absFile)
  if (st.size > maxFileSizeBytes) return { skipped: true, text: null }
  try {
    const text = fs.readFileSync(absFile, 'utf8')
    return { skipped: false, text }
  } catch {
    return { skipped: true, text: null }
  }
}

function rel(p) {
  return path.relative(ROOT, p).replaceAll('\\', '/')
}

function ruleMatches(text, rule) {
  const allowIf = (rule.allowIf || []).map((s) => new RegExp(s, 'i'))
  if (allowIf.length && allowIf.some((re) => re.test(text))) {
    // If allowIf matches anywhere, we DO NOT skip the whole file.
  }

  const patterns = (rule.patterns || []).map((s) => new RegExp(s, 'gi'))
  const hits = []

  for (const re of patterns) {
    let m
    while ((m = re.exec(text)) !== null) {
      hits.push({ index: m.index, match: m[0] })
      if (m.index === re.lastIndex) re.lastIndex++
      if (hits.length > 50) break
    }
    if (hits.length > 50) break
  }

  if ((rule.allowIf || []).length && hits.length) {
    const allowLineRes = (rule.allowIf || []).map((s) => new RegExp(s, 'i'))
    const lines = text.split('\n')
    let offset = 0
    const lineMeta = lines.map((line) => {
      const start = offset
      offset += line.length + 1
      return { start, end: start + line.length, line }
    })

    return hits.filter((h) => {
      const lm = lineMeta.find((L) => h.index >= L.start && h.index <= L.end)
      if (!lm) return true
      if (
        /garantie/i.test(h.match) &&
        allowLineRes.some((re) => re.test(lm.line))
      ) {
        return false
      }
      return true
    })
  }

  return hits
}

function snippetAround(text, idx, len = 80) {
  const start = Math.max(0, idx - Math.floor(len / 2))
  const end = Math.min(text.length, idx + Math.floor(len / 2))
  return text.slice(start, end).replace(/\s+/g, ' ').trim()
}

function lineNumberAt(text, idx) {
  let n = 1
  for (let i = 0; i < idx && i < text.length; i++) {
    if (text.charCodeAt(i) === 10) n++
  }
  return n
}

console.log('=== ProBrandwacht Copy-Only Scanner (OOM-proof) ===')
console.log('Root:', ROOT)
console.log('Config:', CONFIG_PATH)
console.log('Include roots:', includeRoots.map(rel).join(', '))
console.log(
  'Max file size:',
  `${Math.round(maxFileSizeBytes / 1024 / 1024)} MB`
)
console.log('')

const files = []
for (const r of includeRoots) {
  if (fs.existsSync(r) && fs.statSync(r).isDirectory()) {
    walkFiles(r, files)
  }
}

let scanned = 0
let skipped = 0

const findings = []

for (const f of files) {
  const r = rel(f)
  if ((cfg.ignorePathContains || []).some((p) => r.includes(p))) continue
  const { skipped: isSkip, text } = safeReadFile(f)
  if (isSkip || text == null) {
    skipped++
    continue
  }
  scanned++

  for (const rule of rules) {
    const hits = ruleMatches(text, rule)
    if (!hits || hits.length === 0) continue

    for (const h of hits.slice(0, 10)) {
      findings.push({
        severity: rule.severity || 'MEDIUM',
        id: rule.id || 'RULE',
        note: rule.note || '',
        file: rel(f),
        line: lineNumberAt(text, h.index),
        match: h.match,
        context: snippetAround(text, h.index, 120)
      })
    }
  }
}

const sevRank = { HIGH: 3, MEDIUM: 2, LOW: 1, INFO: 0 }
findings.sort((a, b) => {
  const d = (sevRank[b.severity] ?? 0) - (sevRank[a.severity] ?? 0)
  if (d !== 0) return d
  if (a.file !== b.file) return a.file.localeCompare(b.file)
  return a.line - b.line
})

const counts = findings.reduce(
  (acc, f) => {
    acc.total++
    acc[f.severity] = (acc[f.severity] || 0) + 1
    return acc
  },
  { total: 0, HIGH: 0, MEDIUM: 0, LOW: 0, INFO: 0 }
)

console.log(`Files discovered: ${files.length}`)
console.log(`Files scanned: ${scanned}`)
console.log(`Files skipped (too large/unreadable): ${skipped}`)
console.log(
  `Findings: ${counts.total} (HIGH ${counts.HIGH}, MEDIUM ${counts.MEDIUM}, LOW ${counts.LOW}, INFO ${counts.INFO})`
)
console.log('')

for (const f of findings) {
  console.log(`[${f.severity}] ${f.id}`)
  if (f.note) console.log(`  Note: ${f.note}`)
  console.log(`  File: ${f.file}:${f.line}`)
  console.log(`  Match: ${f.match}`)
  console.log(`  Context: ${f.context}`)
  console.log('')
}

process.exit(counts.HIGH > 0 ? 2 : counts.MEDIUM > 0 ? 1 : 0)
