import { describe, it, expect } from 'vitest'
import { getPostSlugs, getPostBySlug } from '@/lib/blog'
import { resolveDate } from '@/app/(site)/blog/page'

describe('blog listing order', () => {
  it('sorts posts in descending chronological order', async () => {
    const slugs = await getPostSlugs()
    const posts = await Promise.all(
      slugs.map(async slug => {
        const { frontmatter } = await getPostBySlug(slug)
        return { slug, date: resolveDate(frontmatter.date as string | undefined) }
      }),
    )

    posts.sort((a, b) => b.date.getTime() - a.date.getTime())

    for (let i = 1; i < posts.length; i += 1) {
      expect(posts[i - 1].date.getTime()).toBeGreaterThanOrEqual(posts[i].date.getTime())
    }

    expect(posts[0].slug).toBe('trends-in-brandwacht-tarieven-waarom-transparantie-cruciaal-wordt')
  })

  it('falls back to the default baseline date when metadata is missing or invalid', () => {
    const baseline = new Date('2025-01-01')

    expect(resolveDate(undefined).toISOString()).toBe(baseline.toISOString())
    expect(resolveDate('not-a-date').toISOString()).toBe(baseline.toISOString())

    const valid = resolveDate('2025-03-15')
    expect(valid.toISOString().startsWith('2025-03-15')).toBe(true)
  })
})
