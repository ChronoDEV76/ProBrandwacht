export type CityKey = 'amsterdam' | 'rotterdam' | 'den-haag' | 'utrecht' | 'industrie'
export type CategoryKey = 'evenementen_bouw' | 'industrie'

export type Range = { min: number; max: number }

export type TariffConfig = Record<CityKey, { standaard: Range; industrie?: Range | undefined }> // Ensure optionality

export const DEFAULT_TARIFFS: TariffConfig = { 
  amsterdam: { standaard: { min: 50, max: 55 }, industrie: { min: 60, max: 70 } },
  rotterdam: { standaard: { min: 48, max: 53 }, industrie: { min: 62, max: 75 } },
  'den-haag': { standaard: { min: 47, max: 52 }, industrie: { min: 58, max: 68 } },
  utrecht: { standaard: { min: 45, max: 50 }, industrie: { min: 56, max: 66 } },
  industrie: { standaard: { min: 60, max: 70 }, industrie: { min: 60, max: 70 } },
}
