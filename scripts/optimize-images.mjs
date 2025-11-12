#!/usr/bin/env node
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const allowedExt = new Set(['.jpg', '.jpeg', '.png'])

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'fonts') return []
        return walk(fullPath)
      }
      if (!allowedExt.has(path.extname(entry.name).toLowerCase())) return []
      return [fullPath]
    }),
  )
  return files.flat()
}

async function convertToWebp(inputPath) {
  const rel = path.relative(publicDir, inputPath)
  const outputPath = path.join(publicDir, `${rel.replace(/\.(jpe?g|png)$/i, '')}.webp`)
  try {
    await fs.access(outputPath)
    console.log(`skip  ${rel} -> already optimized`)
    return
  } catch {}

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await sharp(inputPath)
    .webp({ quality: 82, smartSubsample: true })
    .toFile(outputPath)
  console.log(`done  ${rel} -> ${path.relative(publicDir, outputPath)}`)
}

async function run() {
  const targets = await walk(publicDir)
  await Promise.all(targets.map(convertToWebp))
}

run().catch(err => {
  console.error(err)
  process.exitCode = 1
})
