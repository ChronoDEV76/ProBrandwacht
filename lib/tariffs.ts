import { CITY_DATA } from './city-data'

export type CitySlug = (typeof CITY_DATA)[number]['slug']
export type CityKey = CitySlug | 'industrie'
export type CategoryKey = 'evenementen_bouw' | 'industrie'

export type Range = { min: number; max: number }

export type TariffConfig = Record<CityKey, { standaard: Range; industrie?: Range }>

const STANDARD_RANGE: Range = { min: 40, max: 50 }
const INDUSTRY_RANGE: Range = { min: 45, max: 55 }

const cloneRange = (range: Range): Range => ({ min: range.min, max: range.max })

const BASE_CITY_TARIFFS = CITY_DATA.reduce((acc, city) => {
  acc[city.slug as CitySlug] = {
    standaard: cloneRange(STANDARD_RANGE),
    industrie: cloneRange(INDUSTRY_RANGE),
  }
  return acc
}, {} as Record<CitySlug, { standaard: Range; industrie?: Range }>)

export const DEFAULT_TARIFFS = {
  ...BASE_CITY_TARIFFS,
  industrie: {
    standaard: cloneRange(STANDARD_RANGE),
    industrie: cloneRange(INDUSTRY_RANGE),
  },
} satisfies TariffConfig
