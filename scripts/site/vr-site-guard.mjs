#!/usr/bin/env node
/**
 * VR/Bbl Site Guard — ProBrandwacht
 * Scant content/copy in de repo op toon, rolzuiverheid en VR/Bbl-proof formuleringen.
 *
 * Run:
 *   node scripts/site/vr-site-guard.mjs --root . --config scripts/site/vr-site-guard.config.json
 */

import fs from 'fs'
import path from 'path'
import process from 'process'

function parseArgs(argv) {
  const args = {}
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true
      args[key] = val
    }
  }
  return args
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function isUnderAny(dirPath, rootsAbs) {
  const norm = dirPath.split(path.sep).join('/')
  return rootsAbs.some((r) => norm.startsWith(r.split(path.sep).join('/')))
}

function walkFiles(rootAbs, cfg) {
  const includeAbs = (cfg.include || []).map((p) => path.join(rootAbs, p))
  const excludeAbs = (cfg.exclude || []).map((p) => path.join(rootAbs, p))
  const exts = new Set(cfg.extensions || [])
  const maxSize = cfg.maxFileSizeBytes ?? 2_000_000

  const out = []

  function walk(dir) {
    for (const ex of excludeAbs) {
      if (dir.startsWith(ex)) return
    }

    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }

    for (const e of entries) {
      const abs = path.join(dir, e.name)
      if (excludeAbs.some((ex) => abs.startsWith(ex))) continue

      if (e.isDirectory()) {
        walk(abs)
      } else if (e.isFile()) {
        const ext = path.extname(e.name)
        if (!exts.has(ext)) continue
        if (!isUnderAny(abs, includeAbs)) continue

        let st
        try {
          st = fs.statSync(abs)
        } catch {
          continue
        }
        if (st.size > maxSize) continue

        out.push(abs)
      }
    }
  }

  walk(rootAbs)
  return out
}

function parseFrontmatter(text) {
  if (!text.startsWith('---')) return { fm: null, body: text }
  const end = text.indexOf('\n---', 3)
  if (end === -1) return { fm: null, body: text }
  const fmRaw = text.slice(3, end).trim()
  const body = text.slice(end + 4).trimStart()
  return { fm: fmRaw, body }
}

function hasHeading(body, heading) {
  const re = new RegExp(`^#{1,6}\\s+${escapeRegex(heading)}\\b`, 'mi')
  return re.test(body)
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findAllMatches(text, regex) {
  const out = []
  const re = new RegExp(regex, 'gmi')
  let m
  while ((m = re.exec(text)) !== null) {
    out.push({ index: m.index, match: m[0] })
    if (m.index === re.lastIndex) re.lastIndex++
  }
  return out
}

function getLineContext(text, idx, span = 120) {
  const start = Math.max(0, idx - span)
  const end = Math.min(text.length, idx + span)
  const snippet = text.slice(start, end).replace(/\s+/g, ' ').trim()
  return snippet
}

function lineNumberAt(text, idx) {
  let ln = 1
  for (let i = 0; i < idx && i < text.length; i++) {
    if (text.charAt(i) === '\n') ln++
  }
  return ln
}

function frontmatterHasKey(fmRaw, key) {
  const re = new RegExp(`^\\s*${escapeRegex(key)}\\s*:`, 'mi')
  return re.test(fmRaw)
}

function passesIgnoreIf(context, ignoreList) {
  if (!ignoreList || ignoreList.length === 0) return false
  return ignoreList.some((pat) => new RegExp(pat, 'i').test(context))
}

function main() {
  const args = parseArgs(process.argv)
  const root = path.resolve(String(args.root || '.'))
  const configPath = path.resolve(
    String(args.config || 'scripts/site/vr-site-guard.config.json')
  )
  const cfg = loadJson(configPath)

  console.log('=== VR/Bbl Site Guard ===')
  console.log('Root:', root)
  console.log('Config:', configPath)
  console.log('Include roots:', (cfg.include || []).join(', ') || '(none)')
  console.log(
    'Max file size:',
    Math.round((cfg.maxFileSizeBytes ?? 2_000_000) / 1_000_000),
    'MB\n'
  )

  const files = walkFiles(root, cfg)
  console.log('Files discovered:', files.length)

  const findings = []

  for (const fileAbs of files) {
    let raw
    try {
      raw = fs.readFileSync(fileAbs, 'utf8')
    } catch {
      continue
    }

    const rel = path.relative(root, fileAbs).split(path.sep).join('/')

    const ext = path.extname(fileAbs)
    if (ext === '.mdx' || ext === '.md') {
      const { fm, body } = parseFrontmatter(raw)

      if (fm && cfg.required?.frontmatterKeys?.length) {
        for (const k of cfg.required.frontmatterKeys) {
          if (!frontmatterHasKey(fm, k)) {
            findings.push({
              severity: 'MEDIUM',
              id: 'FRONTMATTER_MISSING',
              file: rel,
              line: 1,
              match: k,
              note: `Frontmatter mist key: ${k}`
            })
          }
        }
      }

      const requiredHeadings = cfg.required?.mdxHeadingsAnyOf || []
      if (requiredHeadings.length) {
        for (const h of requiredHeadings) {
          if (!hasHeading(body, h)) {
            findings.push({
              severity: 'LOW',
              id: 'HEADING_MISSING',
              file: rel,
              line: 1,
              match: h,
              note: `Mist sectie-heading: ${h}`
            })
          }
        }
      }
    }

    for (const rule of cfg.rules || []) {
      for (const pat of rule.patterns || []) {
        const matches = findAllMatches(raw, pat)
        for (const m of matches) {
          const ctx = getLineContext(raw, m.index)
          if (passesIgnoreIf(ctx, rule.ignoreIf)) continue

          findings.push({
            severity: rule.severity,
            id: rule.id,
            file: rel,
            line: lineNumberAt(raw, m.index),
            match: m.match,
            note: rule.note,
            context: ctx,
            suggestions: rule.suggestions || null
          })
        }
      }
    }
  }

  const counts = { HIGH: 0, MEDIUM: 0, LOW: 0, INFO: 0 }
  for (const f of findings) counts[f.severity] = (counts[f.severity] || 0) + 1

  console.log(
    `Files scanned: ${files.length}\nFindings: ${findings.length} (HIGH ${
      counts.HIGH || 0
    }, MEDIUM ${counts.MEDIUM || 0}, LOW ${counts.LOW || 0}, INFO ${
      counts.INFO || 0
    })\n`
  )

  const order = ['HIGH', 'MEDIUM', 'LOW', 'INFO']
  for (const sev of order) {
    const group = findings.filter((f) => f.severity === sev)
    for (const f of group) {
      console.log(`[${sev}] ${f.id}`)
      console.log(`  Note: ${f.note}`)
      console.log(`  File: ${f.file}:${f.line}`)
      console.log(`  Match: ${f.match}`)
      console.log(`  Context: ${f.context}`)
      if (f.suggestions?.length) {
        console.log(`  Suggestions: ${f.suggestions.join(' | ')}`)
      }
      console.log('')
    }
  }

  if ((counts.HIGH || 0) > 0) process.exit(2)
  if ((counts.MEDIUM || 0) > 0) process.exit(1)
  process.exit(0)
}

main()
