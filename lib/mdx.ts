// lib/mdx.ts
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// MDX components available inside blog posts
import TariefTabel from '@/components/mdx/TariefTabel'
import KostenOpbouw from '@/components/mdx/KostenOpbouw'
import KostenOpbouwScenarios from '@/components/mdx/KostenOpbouwScenarios'
import FeeVergelijk from '@/components/mdx/FeeVergelijk'

export type BlogFrontmatter = Record<string, any>

export interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  compiled: React.ReactNode // render this inside <Prose>{post.compiled}</Prose>
  raw: string               // raw MDX content without frontmatter
}

// Where your .mdx posts live (e.g. /content/blog/*.mdx)
export const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR)
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`)

  let source: string
  try {
    source = await fs.readFile(fullPath, 'utf8')
  } catch {
    // Bubble up a consistent error; caller can notFound() on catch
    throw new Error(`MDX file not found for slug "${slug}" at ${fullPath}`)
  }

  // Extract frontmatter first
  const { content, data } = matter(source)

  // Compile MDX to a React node and inject your MDX components here
  const { content: compiled } = await compileMDX({
    source: content,
    options: {
      // we already parsed frontmatter via gray-matter above
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      },
    },
    // Components available in MDX:
    components: {
      TariefTabel,
      KostenOpbouw,
      KostenOpbouwScenarios,
      FeeVergelijk,
    },
  })

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    compiled,
    raw: content,
  }
}

