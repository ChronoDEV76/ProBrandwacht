#!/usr/bin/env node
/**
 * Internal Link Audit (local)
 * - Scans app/(site) routes and content/blog slugs.
 * - Reports orphans (0 inbound links).
 * - Ignores dynamic routes (:/[param]) and template slugs (<slug>).
 *
 * Run:
 *   node scripts/site/internal-link-audit.mjs
 */

import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()

const skip = ['/node_modules', '/.next', '/dist', '/build', '/coverage', '/.turbo', '/.git']

function walk(dir, exts, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name)
    if (skip.some((s) => abs.includes(s))) continue
    if (entry.isDirectory()) walk(abs, exts, out)
    else if (entry.isFile() && exts.some((e) => abs.endsWith(e))) out.push(abs)
  }
}

function extractLinks(text) {
  const links = []
  const md = /\[[^\]]*]\(([^)]+)\)/g
  const jsx = /href=\{?"([^"]+)"\}?/g
  let m
  while ((m = md.exec(text)) !== null) links.push(m[1])
  while ((m = jsx.exec(text)) !== null) links.push(m[1])
  return links
}

function routeFromPath(p) {
  let rel = path.relative(ROOT, p).replace(/\\/g, '/')
  rel = rel.replace(/^app\/\(site\)\//, '')
  if (rel === 'page.tsx') return '/'
  rel = rel.replace(/\/page\.tsx$/, '')
  rel = rel.replace(/\[(.+?)\]/g, ':$1')
  return '/' + rel.replace(/\\/g, '/')
}

function isDynamicRoute(route) {
  return route.includes(':')
}

function isTemplateSlug(slug) {
  return slug.includes('<') || slug.includes('>')
}

function parseSlugs(mdxFiles) {
  const slugs = new Set()
  const fmRe = /^---\n([\s\S]*?)\n---\n/
  for (const file of mdxFiles) {
    const text = fs.readFileSync(file, 'utf8')
    const m = fmRe.exec(text)
    if (!m) continue
    const fm = m[1]
    const r = /^\s*slug\s*:\s*(.*)$/im.exec(fm)
    if (!r) continue
    const slug = r[1].trim().replace(/^['"]|['"]$/g, '')
    if (!slug || isTemplateSlug(slug)) continue
    slugs.add(slug)
  }
  return slugs
}

function main() {
  const pageFiles = []
  walk(path.join(ROOT, 'app/(site)'), ['.tsx'], pageFiles)
  const routes = pageFiles.filter((f) => f.endsWith('page.tsx')).map(routeFromPath)

  const inboundRoutes = new Map()
  for (const r of routes) inboundRoutes.set(r, 0)

  const sourceFiles = []
  walk(path.join(ROOT, 'app/(site)'), ['.tsx'], sourceFiles)
  walk(path.join(ROOT, 'app/blog'), ['.tsx'], sourceFiles)
  walk(path.join(ROOT, 'components'), ['.tsx'], sourceFiles)
  walk(path.join(ROOT, 'content'), ['.mdx', '.md'], sourceFiles)

  for (const file of sourceFiles) {
    const text = fs.readFileSync(file, 'utf8')
    for (const href of extractLinks(text)) {
      if (!href.startsWith('/')) continue
      if (inboundRoutes.has(href)) inboundRoutes.set(href, inboundRoutes.get(href) + 1)
    }
  }

  const orphanRoutes = [...inboundRoutes.entries()]
    .filter(([route, count]) => count === 0 && !isDynamicRoute(route))
    .map(([route]) => route)

  const mdxFiles = []
  walk(path.join(ROOT, 'content/blog'), ['.mdx'], mdxFiles)
  const slugs = parseSlugs(mdxFiles)
  const inboundBlog = new Map()
  for (const s of slugs) inboundBlog.set(s, 0)

  for (const file of mdxFiles) {
    const text = fs.readFileSync(file, 'utf8')
    for (const href of extractLinks(text)) {
      if (!href.startsWith('/blog/')) continue
      const slug = href.replace('/blog/', '').split(/[?#]/)[0]
      if (!slug || isTemplateSlug(slug)) continue
      if (inboundBlog.has(slug)) inboundBlog.set(slug, inboundBlog.get(slug) + 1)
    }
  }

  const orphanBlogs = [...inboundBlog.entries()]
    .filter(([, count]) => count === 0)
    .map(([slug]) => `/blog/${slug}`)

  console.log('Internal Link Audit')
  console.log('Orphan routes (static only):', orphanRoutes.length)
  for (const r of orphanRoutes) console.log(`- ${r}`)
  console.log('')
  console.log('Orphan blog slugs (template ignored):', orphanBlogs.length)
  for (const s of orphanBlogs) console.log(`- ${s}`)
}

main()
