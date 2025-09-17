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
  howto?: BlogHowTo
  keywords?: string[]
  [key: string]: unknown
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR)
  return files.filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''))
}

export async function getPostBySlug(
  slug: string,
): Promise<{ frontmatter: BlogFrontmatter; content: string }> {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(raw)
  return { frontmatter: data as BlogFrontmatter, content }
}

export function readingTime(
  text: string,
  wpm: number = getReadingWPM(),
): {
  minutes: number
  words: number
} {
  const words = (text.match(/\S+/g) || []).length
  const minutes = Math.max(1, Math.ceil(words / Math.max(1, wpm)))
  return { minutes, words }
}

export function formatReadingTime(minutes: number, locale: string = 'nl-NL'): string {
  // Very small i18n helper for concise labels
  const m = Math.max(1, Math.round(minutes))
  const lang = locale.toLowerCase()
  if (lang.startsWith('nl')) return `${m} min leestijd`
  return `${m} min read`
}
