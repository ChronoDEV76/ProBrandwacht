// lib/mdx.ts
import React from 'react'
import type { ComponentProps } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// MDX components available inside blog posts
import Bronnen from '@/components/mdx/Bronnen'
import ConclusieMarkt from '@/components/mdx/ConclusieMarkt'
import Tldr from '@/components/mdx/Tldr'
import VeiligheidskundigKader from '@/components/mdx/VeiligheidskundigKader'
import VeiligheidskundigAfbakening from '@/components/mdx/VeiligheidskundigAfbakening'
import { getPostBySlug as getPostBySlugRaw } from './blog'
import type { BlogFrontmatter } from './blog'

export { getPostSlugs } from './blog'

export interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  compiled: React.ReactNode // render this inside <Prose>{post.compiled}</Prose>
  raw: string               // raw MDX content without frontmatter
}

// Where your .mdx posts live (e.g. /content/blog/*.mdx)

const ANTI_FRICTION_SENTENCE =
  'Dit zegt niets over inzet of vakmanschap; het gaat om de inrichting van verantwoordelijkheden en verwachtingen.'

function stripRelatedSection(content: string) {
  const match = content.match(/^\s*##\s+Gerelateerd\b/m)
  if (!match || match.index == null) return content
  return content.slice(0, match.index).trimEnd()
}

function ensureAfbakeningSentence(content: string) {
  const marker = '## Afbakening'
  const idx = content.indexOf(marker)
  if (idx < 0) return content
  const after = content.slice(idx + marker.length)
  const nextHeading = after.search(/\n##\s+/)
  const section = nextHeading >= 0 ? after.slice(0, nextHeading) : after
  if (section.includes(ANTI_FRICTION_SENTENCE)) return content
  const insertion = `\n${ANTI_FRICTION_SENTENCE}\n`
  return content.slice(0, idx + marker.length) + insertion + after
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const { frontmatter, content } = await getPostBySlugRaw(slug)
  const normalized = ensureAfbakeningSentence(stripRelatedSection(content))

  // Compile MDX to a React node and inject your MDX components here
  const { content: compiled } = await compileMDX({
    source: normalized,
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
      Bronnen,
      ConclusieMarkt,
      Tldr,
      VeiligheidskundigKader,
      VeiligheidskundigAfbakening,
      h1: (props: ComponentProps<'h1'>) => React.createElement('h2', props),
    },
  })

  return {
    slug,
    frontmatter: frontmatter as BlogFrontmatter,
    compiled,
    raw: content,
  }
}
