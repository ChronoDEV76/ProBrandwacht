#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const CONFIG_PATH = path.join(ROOT, 'scripts', 'freeze', 'freeze.json')

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('Freeze config not found:', CONFIG_PATH)
  process.exit(1)
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))

const freezePaths = config.freezeScope?.freezePaths ?? []
const excludePaths = new Set(config.freezeScope?.excludePaths ?? [])
const extensions = new Set(config.freezeScope?.extensions ?? [])
const hardBlocks = config.hardBlocks ?? {}
const forbiddenPhrases = hardBlocks.forbiddenPhrases ?? []
const forbiddenEntities = hardBlocks.forbiddenEntityTargeting?.blockIfContains ?? []
const requiredBlogs = config.requiredBlocksForBlogs ?? {}
const requiredHeadings = requiredBlogs.requiredHeadings ?? []
const requiredFrontmatterKeys = requiredBlogs.requiredFrontmatterKeys ?? []
const requiredDisclaimerMarker = requiredBlogs.requiredDisclaimerMarker ?? ''
const toneAvoid = config.toneOfVoice?.avoid ?? []
const toneViolationLevel =
  (config.enforcement?.severity?.toneViolation ?? 'MEDIUM').toUpperCase()

const findings = []

function report(level, file, label, note, context = '') {
  findings.push({ level, file, label, note, context })
}

function rel(p) {
  return path.relative(ROOT, p).replaceAll(path.sep, '/')
}

function shouldExclude(p) {
  return [...excludePaths].some((ex) => p.includes(`${path.sep}${ex}${path.sep}`) || p.endsWith(`${path.sep}${ex}`))
}

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (shouldExclude(full)) continue
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function matchesExt(file) {
  if (!extensions.size) return true
  return extensions.has(path.extname(file))
}

function parseFrontmatter(src) {
  const match = src.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!match) return null
  const fmText = match[1]
  const fm = {}
  const lines = fmText.split('\n')
  let currentKey = null
  for (const line of lines) {
    if (!line.trim()) continue
    const li = line.match(/^\s*-\s+(.*)\s*$/)
    if (li && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = []
      fm[currentKey].push(li[1].trim().replace(/^['"]|['"]$/g, ''))
      continue
    }
    const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/)
    if (!kv) continue
    const key = kv[1]
    let val = kv[2].trim()
    currentKey = key
    if (val === '' || val === '|' || val === '>' || val === '>-' || val === '|-') {
      fm[key] = val
      continue
    }
    val = val.replace(/^['"]|['"]$/g, '')
    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim()
      fm[key] = inner ? inner.split(',').map((x) => x.trim().replace(/^['"]|['"]$/g, '')) : []
      continue
    }
    fm[key] = val
  }
  return { text: fmText, map: fm }
}

function hasHeading(src, heading) {
  const re = new RegExp(`^##\\s+${heading}\\b`, 'm')
  return re.test(src)
}

const scannedFiles = []

for (const base of freezePaths) {
  const abs = path.join(ROOT, base)
  if (!fs.existsSync(abs)) continue
  const files = fs.statSync(abs).isDirectory() ? walk(abs) : [abs]
  for (const f of files) {
    if (!matchesExt(f)) continue
    scannedFiles.push(f)
    const content = fs.readFileSync(f, 'utf8')
    const file = rel(f)

    const lower = content.toLowerCase()

    for (const phrase of forbiddenPhrases) {
      const p = String(phrase).toLowerCase()
      if (p && lower.includes(p)) {
        report('HIGH', file, 'FORBIDDEN_PHRASE', `Forbidden phrase found: ${phrase}`)
      }
    }

    for (const term of forbiddenEntities) {
      const t = String(term).toLowerCase()
      if (t && lower.includes(t)) {
        report('HIGH', file, 'FORBIDDEN_ENTITY', `Entity targeting found: ${term}`)
      }
    }

    for (const term of toneAvoid) {
      const t = String(term).toLowerCase()
      if (!t) continue
      if (lower.includes(t)) {
        report(toneViolationLevel, file, 'TONE_VIOLATION', `Tone-of-voice avoid term found: ${term}`)
      }
    }

    const isBlog = file.startsWith('content/blog/') && file.endsWith('.mdx')
    if (isBlog) {
      const fm = parseFrontmatter(content)
      if (!fm || !fm.map) {
        report('HIGH', file, 'MISSING_FRONTMATTER', 'Frontmatter ontbreekt')
      } else {
        requiredFrontmatterKeys.forEach((key) => {
          if (fm.map[key] == null || String(fm.map[key]).trim() === '') {
            report('HIGH', file, 'MISSING_FRONTMATTER_KEY', `Ontbrekende key: ${key}`)
          }
        })
      }

      requiredHeadings.forEach((heading) => {
        if (!hasHeading(content, heading)) {
          report('HIGH', file, 'MISSING_SECTION', `Verplichte sectie ontbreekt: ${heading}`)
        }
      })

      if (requiredDisclaimerMarker && !content.includes(requiredDisclaimerMarker)) {
        report('HIGH', file, 'MISSING_FREEZE_MARKER', `Freeze marker ontbreekt: ${requiredDisclaimerMarker}`)
      }
    }
  }
}

const counts = findings.reduce(
  (acc, f) => {
    acc[f.level] = (acc[f.level] ?? 0) + 1
    return acc
  },
  { HIGH: 0, MEDIUM: 0, LOW: 0 }
)

console.log('=== ProBrandwacht Freeze Guard ===')
console.log(`Root: ${ROOT}`)
console.log(`Files scanned: ${scannedFiles.length}`)
console.log(`Findings: ${findings.length} (HIGH ${counts.HIGH}, MEDIUM ${counts.MEDIUM}, LOW ${counts.LOW})`)

for (const f of findings) {
  console.log(`\n[${f.level}] ${f.label}`)
  console.log(`File: ${f.file}`)
  console.log(`Note: ${f.note}`)
  if (f.context) console.log(`Context: ${f.context}`)
}

if (config.enforcement?.exitCodeOnHigh && counts.HIGH > 0) process.exit(2)
process.exit(0)
