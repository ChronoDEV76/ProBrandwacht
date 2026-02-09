import { readFile, readdir } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../../content/blog', import.meta.url))

const RULES = [
  {
    id: 'schijnveiligheid',
    severity: 'warn',
    message: 'Term “schijnveiligheid” kan persoonlijk gelezen worden; overweeg “schijnbare zekerheid”.',
    pattern: /schijnveiligheid/gi,
  },
  {
    id: 'aanwezigheid-alleen',
    severity: 'warn',
    message: '“Aanwezigheid alleen” kan persoonlijk klinken; benoem rolafbakening of mandaat.',
    pattern: /aanwezigheid\s+(alleen|op\s+zich)/gi,
  },
  {
    id: 'kan-niets',
    severity: 'error',
    message: '“Kan niets doen” is persoonlijk toeschrijfbaar; herformuleer naar context/mandaat.',
    pattern: /kan\s+niets\s+doen/gi,
  },
  {
    id: 'ontwerpfout',
    severity: 'warn',
    message: '“Ontwerpfout” kan hard klinken; overweeg “systemisch spanningsveld”.',
    pattern: /ontwerpfout/gi,
  },
  {
    id: 'systeemfout',
    severity: 'warn',
    message: '“Systeemfout” kan hard klinken; overweeg “systemisch spanningsveld”.',
    pattern: /systeemfout/gi,
  },
  {
    id: 'markt-oordeel',
    severity: 'warn',
    message: 'Normatieve markt-taal kan wringen; benoem context en rolafbakening.',
    pattern: /(markt\s+faalt|markt\s+werkt\s+slecht|draait\s+op\s+kwantiteit)/gi,
  },
]

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(full, files)
    } else if (entry.isFile() && extname(entry.name) === '.mdx') {
      files.push(full)
    }
  }
  return files
}

function stripFrontmatter(text) {
  if (text.startsWith('---')) {
    const parts = text.split('---')
    if (parts.length >= 3) {
      return parts.slice(2).join('---')
    }
  }
  return text
}

function stripMarkdownLinks(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
}

function findMatches(text, pattern) {
  const matches = []
  let match
  while ((match = pattern.exec(text)) !== null) {
    matches.push({ index: match.index, value: match[0] })
  }
  return matches
}

function lineAt(text, index) {
  const lines = text.slice(0, index).split('\n')
  return lines.length
}

const files = await walk(ROOT)
let hasError = false

for (const file of files) {
  const raw = await readFile(file, 'utf8')
  const content = stripMarkdownLinks(stripFrontmatter(raw))
  for (const rule of RULES) {
    const matches = findMatches(content, rule.pattern)
    for (const match of matches) {
      const line = lineAt(content, match.index)
      const prefix = rule.severity === 'error' ? 'ERROR' : 'WARN'
      console.log(`${prefix} ${rule.id} ${file}:${line} → ${match.value}`)
      if (rule.severity === 'error') hasError = true
    }
  }
}

if (hasError) {
  process.exitCode = 1
}
