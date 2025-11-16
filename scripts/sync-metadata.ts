#!/usr/bin/env ts-node

/**
 * sync-metadata.ts
 *
 * Loopt alle page.tsx bestanden onder de app/ directory langs en zorgt dat ze:
 * - import type { Metadata } from 'next'
 * - import { getRouteMetadata } from '@/lib/seo/metadata'
 * - export const metadata: Metadata = getRouteMetadata('<route>')
 *
 * Zodat je niet per pagina handmatig metadata hoeft te beheren.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const APP_DIR = path.join(ROOT, 'app')

// Welke pagina's overslaan (bijv. blog/[slug] die eigen generateMetadata heeft)
function shouldSkip(filePath: string, routePath: string): boolean {
  const norm = filePath.replace(/\\/g, '/')
  if (norm.includes('/blog/[slug]/page.tsx')) return true
  // eventueel later meer uitzonderingen toevoegen
  return false
}

function walk(dir: string, out: string[] = []): string[] {
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, out)
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      out.push(full)
    }
  }
  return out
}

// Bepaal route pad uit bestandspad
// app/page.tsx                       -> '/'
// app/(site)/opdrachtgevers/page.tsx -> '/opdrachtgevers'
// app/(site)/steden/[city]/page.tsx  -> '/steden/[city]'
function routeFromFile(file: string): string {
  const rel = path.relative(APP_DIR, file).replace(/\\/g, '/')
  let withoutPage = rel.replace(/\/page\.tsx$/, '')

  const parts = withoutPage.split('/').filter(Boolean)
  const filtered = parts.filter((seg) => !(seg.startsWith('(') && seg.endsWith(')')))

  if (filtered.length === 0) return '/'
  return '/' + filtered.join('/')
}

function ensureImport(source: string, importLine: string, matcher: RegExp): string {
  if (matcher.test(source)) return source

  const lines = source.split('\n')
  let lastImportIndex = -1

  for (let i = 0; i < lines.length; i++) {
    if (/^import\s.+from\s['"].+['"];?$/.test(lines[i].trim())) {
      lastImportIndex = i
    }
  }

  if (lastImportIndex === -1) {
    // geen imports? zet bovenaan
    return importLine + '\n' + source
  }

  lines.splice(lastImportIndex + 1, 0, importLine)
  return lines.join('\n')
}

function removeExistingMetadataExports(source: string): string {
  let s = source

  // export const metadata = ...
  s = s.replace(
    /export\s+const\s+metadata[\s\S]*?(?=^export\s+(const|function|default)\s|\Z)/m,
    ''
  )

  // export function generateMetadata(...) { ... }
  s = s.replace(
    /export\s+function\s+generateMetadata[\s\S]*?(?=^export\s+(const|function|default)\s|\Z)/m,
    ''
  )

  return s
}

function insertMetadataExport(source: string, routePath: string): string {
  const snippet = `\nexport const metadata: Metadata = getRouteMetadata('${routePath}');\n`

  // probeer vóór "export default" te plaatsen
  const match = source.match(/^\s*export\s+default/m)
  if (!match) {
    // geen default export gevonden, plak onderaan
    return source.trimEnd() + snippet + '\n'
  }

  const idx = match.index ?? 0
  const before = source.slice(0, idx)
  const after = source.slice(idx)

  return before.trimEnd() + snippet + '\n\n' + after
}

function processFile(file: string) {
  const routePath = routeFromFile(file)

  if (shouldSkip(file, routePath)) {
    console.log(`⏭  Skip: ${routePath} (${file})`)
    return
  }

  let source = readFileSync(file, 'utf8')
  const original = source

  // zorg voor Metadata import
  source = ensureImport(
    source,
    `import type { Metadata } from 'next'`,
    /import\s+type\s+{[^}]*Metadata[^}]*}\s+from\s+['"]next['"]/
  )

  // zorg voor getRouteMetadata import
  source = ensureImport(
    source,
    `import { getRouteMetadata } from '@/lib/seo/metadata'`,
    /from\s+['"]@\/lib\/seo\/metadata['"]/
  )

  // bestaande metadata exports opruimen
  source = removeExistingMetadataExports(source)

  // nieuwe metadata export invoegen
  source = insertMetadataExport(source, routePath)

  if (source !== original) {
    writeFileSync(file, source, 'utf8')
    console.log(`✅ Updated metadata binding for ${routePath} (${file})`)
  } else {
    console.log(`ℹ️  No change needed for ${routePath} (${file})`)
  }
}

function main() {
  console.log('🔍 Syncing metadata exports with lib/seo/metadata...')
  console.log(`   App directory: ${APP_DIR}`)

  const pages = walk(APP_DIR)
  if (pages.length === 0) {
    console.error('Geen page.tsx bestanden gevonden onder app/')
    process.exit(1)
  }

  pages.forEach(processFile)

  console.log('✨ Klaar. Controleer even git diff en commit als alles klopt.')
}

main()

