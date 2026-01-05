import fs from 'node:fs'
import path from 'node:path'

function parseArgs(argv) {
  const args = {}
  for (const part of argv) {
    if (!part.startsWith('--')) continue
    const [key, ...rest] = part.replace(/^--/, '').split('=')
    args[key] = rest.length ? rest.join('=') : true
  }
  return args
}

const argv = parseArgs(process.argv.slice(2))
const ROOT = path.resolve(process.cwd(), String(argv.root || 'app/(site)'))

const targetToken = String(argv.target || 'bg-slate-950')
const replacementToken = String(
  argv.replacement || 'bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950',
)

const dryRun = argv.dry === true || argv.dry === '1' || argv.dry === 'true'
const backup =
  argv['no-backup'] === true || argv['no-backup'] === '1' || argv['no-backup'] === 'true'
    ? false
    : true

// Alleen EXACT token als los class-token (dus niet `${token}/90`)
const TARGET = new RegExp(`\\b${targetToken.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\b(?!\\/)`, 'g')

const EXT_OK = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx'])
const SKIP_DIRS = new Set(['node_modules', '.next', 'dist', 'build', '.git', '.cache', 'out'])
const SKIP_FILE_SUFFIXES = ['.bak', '.bak2', '.bak-polish']

function walk(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(full)
      continue
    }

    if (SKIP_FILE_SUFFIXES.some((suffix) => entry.name.endsWith(suffix))) continue

    const ext = path.extname(entry.name).toLowerCase()
    if (!EXT_OK.has(ext)) continue

    const original = fs.readFileSync(full, 'utf8')
    if (!TARGET.test(original)) continue

    // reset regex state (belangrijk bij /g)
    TARGET.lastIndex = 0

    const updated = original.replace(TARGET, replacementToken)
    if (updated === original) continue

    if (dryRun) {
      console.log('🧪 dry-run:', full)
      continue
    }

    if (backup) {
      fs.writeFileSync(`${full}.bak-polish`, original, 'utf8')
    }

    fs.writeFileSync(full, updated, 'utf8')
    console.log('✨ polished:', full)
  }
}

if (!fs.existsSync(ROOT)) {
  console.error(`❌ Root bestaat niet: ${ROOT}`)
  process.exit(2)
}

console.log(`🔎 Root: ${ROOT}`)
console.log(`🎯 Target: ${targetToken}`)
console.log(`🧩 Replacement: ${replacementToken}`)
console.log(`🧪 Dry run: ${dryRun ? 'YES' : 'NO'}`)
console.log(`💾 Backup: ${backup ? 'YES' : 'NO'}`)

walk(ROOT)
console.log('✅ done')
