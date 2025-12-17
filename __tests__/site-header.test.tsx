import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ComponentProps, ReactNode } from 'react'
import SiteHeader from '@/components/site-header'

vi.mock('next/headers', () => ({
  headers: () => ({
    get: vi.fn(() => '/'),
  }),
}))

// Mock next/link to a plain anchor for testing
vi.mock('next/link', () => {
  type AnchorProps = ComponentProps<'a'> & { children: ReactNode; prefetch?: boolean }
  return {
    default: ({ href, children, prefetch: _prefetch, ...props }: AnchorProps) => (
      <a href={href ?? undefined} {...props}>
        {children}
      </a>
    ),
  }
})

describe('SiteHeader', () => {
  it('renders brand and primary links', () => {
    render(<SiteHeader />)
    expect(screen.getByText('ProBrandwacht.nl')).toBeInTheDocument()
    const blogLinks = screen.getAllByRole('link', { name: /blog/i })
    expect(blogLinks.some(link => link.getAttribute('href') === '/blog')).toBe(true)
    const aboutLinks = screen.getAllByRole('link', { name: /over ons/i })
    expect(aboutLinks.some(link => link.getAttribute('href') === '/over-ons')).toBe(true)

    const ctaLinks = screen.getAllByRole('link', { name: /meld je aan/i })
    expect(ctaLinks.length).toBeGreaterThan(0)
    expect(ctaLinks.every(link => link.getAttribute('href') === '/zzp/aanmelden')).toBe(true)
  })
})
