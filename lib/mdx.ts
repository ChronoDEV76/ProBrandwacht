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

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const { frontmatter, content } = await getPostBySlugRaw(slug)

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
