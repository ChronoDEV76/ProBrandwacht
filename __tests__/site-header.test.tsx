import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SiteHeader from '@/components/site-header'

// Mock next/link to a plain anchor for testing
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href as string} {...props}>
      {children}
    </a>
  ),
}))

describe('SiteHeader', () => {
  it('renders brand and primary links', () => {
    render(<SiteHeader />)
    expect(screen.getByText('ProBrandwacht.nl')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
    expect(screen.getByRole('link', { name: 'Brandwacht Amsterdam' })).toHaveAttribute(
      'href',
      '/brandwacht-inhuren/amsterdam',
    )
  })
})

