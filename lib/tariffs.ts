import { CITY_DATA, CITY_SLUGS, type CitySlug } from './city-data'
export type { CitySlug } from './city-data'
export type CityKey = CitySlug | 'industrie'
export type CategoryKey = 'evenementen_bouw' | 'industrie'

export type Range = { min: number; max: number }

export type TariffConfig = Record<CityKey, { standaard: Range; industrie?: Range }>

const STANDARD_RANGE: Range = { min: 40, max: 55 }
const INDUSTRY_RANGE: Range = { min: 55, max: 75 }

const cloneRange = (range: Range): Range => ({ min: range.min, max: range.max })

const BASE_CITY_TARIFFS = Object.fromEntries(
  CITY_SLUGS.map(slug => [
    slug,
    {
      standaard: cloneRange(STANDARD_RANGE),
      industrie: cloneRange(INDUSTRY_RANGE),
    },
  ]),
) as Record<CitySlug, { standaard: Range; industrie?: Range }>

export const DEFAULT_TARIFFS: TariffConfig = {
  ...BASE_CITY_TARIFFS,
  industrie: {
    standaard: cloneRange(STANDARD_RANGE),
    industrie: cloneRange(INDUSTRY_RANGE),
  },
}
