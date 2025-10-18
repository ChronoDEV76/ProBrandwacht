import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ComponentProps, ReactNode } from 'react'
import SiteHeader from '@/components/site-header'

// Mock next/link to a plain anchor for testing
vi.mock('next/link', () => {
  type AnchorProps = ComponentProps<'a'> & { children: ReactNode }
  return {
    default: ({ href, children, ...props }: AnchorProps) => (
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
    const blogLinks = screen.getAllByRole('link', { name: 'Blog' })
    expect(blogLinks.some(link => link.getAttribute('href') === '/blog')).toBe(true)
    const missionLinks = screen.getAllByRole('link', { name: 'Missie' })
    expect(missionLinks.some(link => link.getAttribute('href') === '/manifest')).toBe(true)
    const ctaLinks = screen.getAllByRole('link', {
      name: 'Meld je aan (gratis) en kom straks met je profiel op ProSafetyMatch',
    })
    expect(ctaLinks.length).toBeGreaterThan(0)
    expect(ctaLinks.every(link => link.getAttribute('href') === '/zzp/aanmelden')).toBe(true)
  })
})
