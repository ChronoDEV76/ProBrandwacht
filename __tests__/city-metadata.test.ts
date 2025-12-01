import { describe, it, expect } from 'vitest'

import { generateStaticParams } from '@/app/(site)/steden/[city]/page'
import { CITY_SLUGS } from '@/lib/city-data'

describe('city page metadata', () => {
  it('pre-renders all configured city routes', async () => {
    const params = await generateStaticParams()
    const returned = params.map(p => p.city).sort()

    expect(returned).toEqual([...CITY_SLUGS].sort())
  })
})
