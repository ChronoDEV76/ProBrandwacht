export type CityMeta = {
  slug: string
  name: string
  latitude: number
  longitude: number
}

const cityData: CityMeta[] = [
  { slug: 'amsterdam', name: 'Amsterdam', latitude: 52.3676, longitude: 4.9041 },
  { slug: 'rotterdam', name: 'Rotterdam', latitude: 51.9244, longitude: 4.4777 },
  { slug: 'den-haag', name: 'Den Haag', latitude: 52.0705, longitude: 4.3007 },
  { slug: 'utrecht', name: 'Utrecht', latitude: 52.0907, longitude: 5.1214 },
  { slug: 'eindhoven', name: 'Eindhoven', latitude: 51.4416, longitude: 5.4697 },
  { slug: 'tilburg', name: 'Tilburg', latitude: 51.556, longitude: 5.0913 },
  { slug: 'groningen', name: 'Groningen', latitude: 53.2194, longitude: 6.5665 },
  { slug: 'almere', name: 'Almere', latitude: 52.3508, longitude: 5.2647 },
  { slug: 'breda', name: 'Breda', latitude: 51.5719, longitude: 4.7683 },
  { slug: 'nijmegen', name: 'Nijmegen', latitude: 51.8126, longitude: 5.8372 },
  { slug: 'haarlem', name: 'Haarlem', latitude: 52.3874, longitude: 4.6462 },
  { slug: 'arnhem', name: 'Arnhem', latitude: 51.9851, longitude: 5.8987 },
  { slug: 'amersfoort', name: 'Amersfoort', latitude: 52.1561, longitude: 5.3878 },
  { slug: 'apeldoorn', name: 'Apeldoorn', latitude: 52.2112, longitude: 5.9699 },
  { slug: 'enschede', name: 'Enschede', latitude: 52.2215, longitude: 6.8937 },
  { slug: 'den-bosch', name: 'Den Bosch', latitude: 51.6978, longitude: 5.3037 },
  { slug: 'leiden', name: 'Leiden', latitude: 52.1601, longitude: 4.497 },
  { slug: 'maastricht', name: 'Maastricht', latitude: 50.8514, longitude: 5.69 },
  { slug: 'dordrecht', name: 'Dordrecht', latitude: 51.8133, longitude: 4.6901 },
  { slug: 'zwolle', name: 'Zwolle', latitude: 52.5168, longitude: 6.083 },
  { slug: 'leeuwarden', name: 'Leeuwarden', latitude: 53.2012, longitude: 5.7999 },
  { slug: 'alkmaar', name: 'Alkmaar', latitude: 52.6324, longitude: 4.7534 },
  { slug: 'delft', name: 'Delft', latitude: 52.0116, longitude: 4.3571 },
  { slug: 'deventer', name: 'Deventer', latitude: 52.2661, longitude: 6.1552 },
  { slug: 'zaanstad', name: 'Zaanstad', latitude: 52.479, longitude: 4.7527 },
  { slug: 'venlo', name: 'Venlo', latitude: 51.3704, longitude: 6.1724 },
]

export const cities = cityData
export const citySlugs = cityData.map(city => city.slug)

const coreSlugSet = new Set(['amsterdam', 'rotterdam', 'den-haag', 'utrecht'])

export const coreCities = cityData.filter(city => coreSlugSet.has(city.slug))
export const coreCitySlugs = coreCities.map(city => city.slug)

export function getCityBySlug(slug: string): CityMeta | undefined {
  return cityData.find(city => city.slug === slug)
}
