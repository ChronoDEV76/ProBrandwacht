#!/usr/bin/env node
/**
 * Sanity check voor ProBrandwacht content/components
 * - Scant .tsx/.ts/.mdx/.md
 * - Vindt dubbele zinnen/alinea's
 * - Checkt terminologie-consistentie
 * - Zoekt bronvermelding/links
 * - Rapporteert lange alinea's/zinnen
 * - Controle heading-hiërarchie in MD/MDX
 *
 * Run:
 *   node scripts/qa/sanityCheck.mjs --root src --min-sent-len 80 --max-sent-len 220 --max-par-len 800
 */

import fs from 'node:fs'
import path from 'node:path'

const argv = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, ...rest] = a.replace(/^--/, '').split('=')
    return [k, rest.length ? rest.join('=') : true]
  })
)

const DEFAULT_ROOTS = ['app', 'content', 'components']

function parseRoots(arg) {
  if (typeof arg !== 'string') return null
  const roots = arg
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  return roots.length ? roots : null
}

const ROOT = typeof argv.root === 'string' ? argv.root : null
const ROOTS = parseRoots(argv.roots) || (ROOT && ROOT !== '.' ? [ROOT] : DEFAULT_ROOTS)
const MIN_SENT_LEN = Number(argv['min-sent-len'] || 80)
const MAX_SENT_LEN = Number(argv['max-sent-len'] || 220)
const MAX_PAR_LEN = Number(argv['max-par-len'] || 800)
const EXT_OK = new Set(['.ts', '.tsx', '.mdx', '.md'])

const IGNORE_DIRS = new Set(['node_modules', '.next', 'build', 'dist', '.git'])
const IGNORE_PATH_SEGMENTS = ['/content/blog/']

const TERM_PREFS = [
  ['zzp’er', ['zzp-er', 'zzper', "zzp'er(s)", 'zzp er', 'zelfstandige professional (ind.)']],
  ['tarief', ['uurtarief (onnodig lang in context)', 'vergoeding (onduidelijk)']],
  ['opdrachtgever', ['klant (branche-onzuiver)']],
]

const SOURCE_HINTS = ['CBS', 'consumentenprijsindex', 'CPI', 'cao', 'ZZP Nederland', 'bron', 'StatLine']

const MDX_HEADING_RE = /^ {0,3}(#{1,6})\s+.+/

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (IGNORE_DIRS.has(name) || name.startsWith('.')) continue
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (EXT_OK.has(path.extname(name))) {
      const normalized = p.replace(/\\/g, '/')
      if (IGNORE_PATH_SEGMENTS.some(seg => normalized.includes(seg))) continue
      out.push(p)
    }
  }
  return out
}

function stripCodeBlocks(s) {
  return s
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
}

function extractText(content, file) {
  if (file.endsWith('.ts') || file.endsWith('.tsx')) {
    let s = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
    s = s.replace(/<[^>]+>/g, ' ')
    s = s.replace(/`[\s\S]*?`/g, m => m.replace(/[`$]/g, ''))
    return s
  }
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    let body = content
    if (body.startsWith('---')) {
      const end = body.indexOf('\n---', 3)
      if (end !== -1) {
        body = body.slice(end + 4)
      }
    }
    return stripCodeBlocks(body)
  }
  return stripCodeBlocks(content)
}

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/g)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

function splitSentences(p) {
  return p
    .split(/(?<=[\.!?])\s+(?=[A-ZÀ-ÖØ-Þ])/)
    .map(s => s.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

function norm(s) {
  return s
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[“”"']/g, '')
    .replace(/[.,;:()\-–—]/g, '')
    .trim()
}

function hasSourcesHint(p) {
  const low = p.toLowerCase()
  return SOURCE_HINTS.some(h => low.includes(h.toLowerCase()))
}

function checkHeadingsMD(lines) {
  const probs = []
  let last = 0
  lines.forEach((ln, i) => {
    const m = ln.match(MDX_HEADING_RE)
    if (!m) return
    const level = m[1].length
    if (last && level > last + 1) {
      probs.push({ line: i + 1, msg: `Heading springt van H${last} naar H${level} (sla niveau over).` })
    }
    last = level
  })
  return probs
}

function wpm(words) {
  const WPM = 220
  return Math.ceil(words / WPM)
}

const rootPaths = ROOTS.map(r => path.resolve(r)).filter(p => fs.existsSync(p))
const files = [...new Set(rootPaths.flatMap(p => walk(p)))]
const duplicates = new Map()
const tooLongSentences = []
const tooLongParagraphs = []
const terminology = []
const missingSources = []
const headingIssues = []

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const text = extractText(raw, file)
  const lines = text.split('\n')

  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    const probs = checkHeadingsMD(lines)
    probs.forEach(p => headingIssues.push({ file, ...p }))
  }

  const paragraphs = splitParagraphs(text)
  const isContentFile = file.endsWith('.md') || file.endsWith('.mdx')
  paragraphs.forEach((p, pi) => {
    if (isContentFile && p.length > MAX_PAR_LEN) {
      tooLongParagraphs.push({ file, paragraphIndex: pi + 1, length: p.length, preview: p.slice(0, 140) + '…' })
    }
    if (isContentFile) {
      const sents = splitSentences(p)
      sents.forEach((s, si) => {
        if (s.length >= MIN_SENT_LEN) {
          const key = norm(s)
          const lst = duplicates.get(key) || []
          lst.push({ file, line: si + 1, raw: s })
          duplicates.set(key, lst)
        }
        if (s.length > MAX_SENT_LEN) {
          tooLongSentences.push({ file, paragraphIndex: pi + 1, length: s.length, preview: s.slice(0, 140) + '…' })
        }
      })

      if (/bron|cbs|cao|statline|cpi|zzp/i.test(p)) {
        // bevat al bronverwijzing
      } else if (/data|cijfers|inflatie|index|cao|tarief|uurtarief/i.test(p) && !hasSourcesHint(p)) {
        missingSources.push({ file, paragraphIndex: pi + 1, preview: p.slice(0, 120) + '…' })
      }
    }
  })

  const low = text.toLowerCase()
  TERM_PREFS.forEach(([preferred, alts]) => {
    alts.forEach(a => {
      const re = new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      if (re.test(low)) terminology.push({ file, preferred, found: a })
    })
  })
}

const dupelist = [...duplicates.entries()]
  .filter(([, arr]) => arr.length >= 2)
  .map(([, arr]) => ({ count: arr.length, locations: arr }))
  .sort((a, b) => b.count - a.count)

const totalWords = files.reduce((acc, f) => acc + fs.readFileSync(f, 'utf8').split(/\s+/).length, 0)

const report = {
  scannedRoots: ROOTS,
  scannedFiles: files.length,
  estimatedReadingMinutes: wpm(totalWords),
  duplicates: dupelist.slice(0, 200),
  longSentences: tooLongSentences,
  longParagraphs: tooLongParagraphs,
  terminologyWarnings: terminology,
  missingSourceHints: missingSources,
  headingIssues,
}

console.log(JSON.stringify(report, null, 2))

const hasIssues =
  dupelist.length ||
  tooLongSentences.length ||
  tooLongParagraphs.length ||
  terminology.length ||
  missingSources.length ||
  headingIssues.length

process.exit(hasIssues ? 1 : 0)
