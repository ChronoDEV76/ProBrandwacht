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

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR)
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export async function getPostBySlug(
  slug: string
): Promise<{ frontmatter: BlogFrontmatter; content: string }> {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`)
  let raw: string
  try {
    raw = await fs.readFile(fullPath, 'utf8')
  } catch {
    throw new Error(`File not found: ${slug}.mdx`)
  }

  const { data, content } = matter(raw)
  const fm = data as BlogFrontmatter
  if (!fm.h1 && typeof fm.title === 'string') {
    fm.h1 = fm.title
  }
  return { frontmatter: fm, content }
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
