#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function walk(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function stripRelatedSection(content) {
  const match = content.match(/^\s*##\s+Gerelateerd\b/m)
  if (!match || match.index == null) return content
  return content.slice(0, match.index)
}

const files = walk(BLOG_DIR).filter((f) => f.endsWith('.mdx') && !path.basename(f).startsWith('_'))

const posts = files.map((file) => {
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const slug = typeof data.slug === 'string' && data.slug.trim()
    ? data.slug.trim()
    : path.basename(file, '.mdx')
  const canonical = typeof data.canonical === 'string' ? data.canonical.trim() : ''
  return { file, slug, canonical, content }
})

const slugSet = new Set(posts.map((p) => p.slug))
const findings = []

function report(level, file, message, context = '') {
  findings.push({ level, file, message, context })
}

const linkPattern = /\((\/blog\/[^)#\s]+)(#[^)]+)?\)/g
const hrefPattern = /href=\{?['"](\/blog\/[^'"#\s]+)(#[^'"]+)?['"]\}?/g

for (const post of posts) {
  if (!post.canonical || post.canonical !== `/blog/${post.slug}`) {
    report('HIGH', post.file, `Canonical mismatch: expected /blog/${post.slug}`, post.canonical)
  }

  const body = stripRelatedSection(post.content)
  let m
  while ((m = linkPattern.exec(body)) !== null) {
    const slug = m[1].replace(/^\/blog\//, '').replace(/\/$/, '')
    if (slug && !slugSet.has(slug)) {
      report('HIGH', post.file, `Broken blog link: /blog/${slug}`)
    }
  }
  while ((m = hrefPattern.exec(body)) !== null) {
    const slug = m[1].replace(/^\/blog\//, '').replace(/\/$/, '')
    if (slug && !slugSet.has(slug)) {
      report('HIGH', post.file, `Broken blog link: /blog/${slug}`)
    }
  }
}

console.log('=== Blog Link Check ===')
console.log(`Files scanned: ${posts.length}`)
console.log(`Findings: ${findings.length}`)

findings.forEach((f) => {
  console.log(`\n[${f.level}] ${f.message}`)
  console.log(`File: ${f.file}`)
  if (f.context) console.log(`Context: ${f.context}`)
})

process.exit(findings.some((f) => f.level === 'HIGH') ? 2 : 0)
