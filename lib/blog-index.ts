export const CATEGORY_LABELS = [
  'Evenementen',
  'Industrie',
  'Wetgeving',
  'Veiligheidskundig kader',
] as const
export type CategoryLabel = (typeof CATEGORY_LABELS)[number] | 'Overig'

export const CITY_FILTERS = ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht'] as const
export type CityFilter = (typeof CITY_FILTERS)[number]

const BASELINE_DATE = new Date('2025-01-01')

export function resolveDate(baseIso: string | undefined) {
  if (baseIso) {
    const parsed = new Date(baseIso)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed
    }
  }
  return new Date(BASELINE_DATE)
}

export function normalizeCategory(value: unknown): CategoryLabel {
  if (typeof value !== 'string') return 'Overig'
  return CATEGORY_LABELS.includes(value as (typeof CATEGORY_LABELS)[number])
    ? (value as (typeof CATEGORY_LABELS)[number])
    : 'Overig'
}

export function normalizeCity(value: unknown): CityFilter | undefined {
  if (typeof value !== 'string') return undefined
  return CITY_FILTERS.includes(value as CityFilter) ? (value as CityFilter) : undefined
}
