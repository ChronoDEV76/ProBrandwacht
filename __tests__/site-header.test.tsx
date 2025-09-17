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
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
    // No city links in header anymore; site is informational only
    expect(screen.getByRole('link', { name: 'Missie' })).toHaveAttribute('href', '/manifest')
    expect(screen.getByRole('link', { name: /Meld je aan/i })).toBeInTheDocument()
  })
})
