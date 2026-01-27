import type { CitySlug } from './city-data'
import type { CityCopy } from './city-copy.base'
import { cityCopy as baseCityCopy } from './city-copy.base'
import { cityCopyOverrides } from './city-copy.overrides'

export type { CityCopy }

const mergedCityCopy: Partial<Record<CitySlug, CityCopy>> = {}

for (const [slug, base] of Object.entries(baseCityCopy)) {
  const override = cityCopyOverrides[slug as CitySlug]
  mergedCityCopy[slug as CitySlug] = {
    ...base,
    ...(override ?? {}),
  }
}

for (const [slug, override] of Object.entries(cityCopyOverrides)) {
  const key = slug as CitySlug
  if (!mergedCityCopy[key] && override) {
    mergedCityCopy[key] = override as CityCopy
  }
}

export const cityCopy = mergedCityCopy
