import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { getReadingWPM } from './config'

export type BlogFaq = {
  q: string
  a: string
}

export type BlogHowToStep = {
  name: string
  text?: string
}

export type BlogHowTo = {
  name?: string
  totalTime?: string
  steps?: BlogHowToStep[]
}

export type BlogFrontmatter = {
  title?: string
  description?: string
  date?: string
  updated?: string
  faq?: BlogFaq[]
  h1?: string
  howto?: BlogHowTo
  keywords?: string[]
  ogImage?: string
  image?: string
  imageAlt?: string
  imagePosition?: string
  [key: string]: unknown
}

export const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

type PostEntry = {
  slug: string
  filePath: string
  frontmatter: BlogFrontmatter
  content: string
}

async function listMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listMdxFiles(entryPath)))
    } else if (entry.isFile() && entry.name.endsWith('.mdx') && !entry.name.startsWith('_')) {
      files.push(entryPath)
    }
  }

  return files
}

async function getAllPosts(): Promise<PostEntry[]> {
  const files = await listMdxFiles(BLOG_DIR)
  const posts = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf8')
      const { data, content } = matter(raw)
      const fm = data as BlogFrontmatter
      const fileSlug = path.basename(filePath, '.mdx')
      const slug = typeof fm.slug === 'string' && fm.slug.trim() ? fm.slug.trim() : fileSlug
      if (!fm.h1 && typeof fm.title === 'string') {
        fm.h1 = fm.title
      }
      return { slug, filePath, frontmatter: fm, content }
    })
  )

  const unique = new Map<string, PostEntry>()
  for (const post of posts) {
    if (!unique.has(post.slug)) {
      unique.set(post.slug, post)
    }
  }
  return Array.from(unique.values())
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((post) => post.slug)
}

export async function getPostBySlug(
  slug: string
): Promise<{ frontmatter: BlogFrontmatter; content: string }> {
  const posts = await getAllPosts()
  const match = posts.find((post) => post.slug === slug)
  if (!match) {
    throw new Error(`File not found: ${slug}.mdx`)
  }
  return { frontmatter: match.frontmatter, content: match.content }
}

export function readingTime(
  text: string,
  wpm: number = getReadingWPM()
): {
  minutes: number
  words: number
} {
  const words = (text.match(/\S+/g) || []).length
  const minutes = Math.max(1, Math.ceil(words / Math.max(1, wpm)))
  return { minutes, words }
}

export function formatReadingTime(
  minutes: number,
  locale: string = 'nl-NL'
): string {
  // Very small i18n helper for concise labels
  const m = Math.max(1, Math.round(minutes))
  const lang = locale.toLowerCase()
  if (lang.startsWith('nl')) return `${m} min leestijd`
  return `${m} min read`
}
