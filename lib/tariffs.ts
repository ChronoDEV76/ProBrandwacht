export type CityKey = 'amsterdam' | 'rotterdam' | 'den-haag' | 'utrecht' | 'industrie'
export type CategoryKey = 'evenementen_bouw' | 'industrie'

export type Range = { min: number; max: number }

export type TariffConfig = Record<CityKey, { standaard: Range; industrie?: Range }>

function buildRanges(baseMin: number, baseMax: number) {
  const industryMin = parseFloat((baseMin * 1.3).toFixed(2))
  const industryMax = parseFloat((baseMax * 1.5).toFixed(2))
  return {
    standaard: { min: baseMin, max: baseMax },
    industrie: { min: industryMin, max: industryMax },
  }
}

export const DEFAULT_TARIFFS: TariffConfig = {
  amsterdam: buildRanges(42, 48),
  rotterdam: buildRanges(42, 48),
  'den-haag': buildRanges(42, 48),
  utrecht: buildRanges(42, 48),
  industrie: buildRanges(42, 48),
}
