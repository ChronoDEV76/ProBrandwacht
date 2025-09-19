import { describe, it, expect } from 'vitest'
import { generateMetadata, generateStaticParams } from '@/app/(site)/brandwacht-inhuren/[city]/page'
import { citySlugs } from '@/lib/cities'

describe('city page metadata', () => {
  it('emits canonical URLs with the provided city slug', async () => {
    const metadata = await generateMetadata({ params: { city: 'amsterdam' } })

    expect(metadata.alternates?.canonical).toBe('/brandwacht-inhuren/amsterdam')
    expect(metadata.openGraph?.url).toBe('https://www.probrandwacht.nl/brandwacht-inhuren/amsterdam')
    expect(metadata.title).toContain('Brandwacht inhuren Amsterdam')
  })

  it('pre-renders all configured city routes', async () => {
    const params = await generateStaticParams()
    const returned = params.map(p => p.city).sort()

    expect(returned).toEqual([...citySlugs].sort())
  })
})
