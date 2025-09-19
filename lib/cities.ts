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
  { slug: 'zoetermeer', name: 'Zoetermeer', latitude: 52.0607, longitude: 4.494 },
  { slug: 'lelystad', name: 'Lelystad', latitude: 52.5185, longitude: 5.4714 },
  { slug: 'amstelveen', name: 'Amstelveen', latitude: 52.3075, longitude: 4.8639 },
  { slug: 'hilversum', name: 'Hilversum', latitude: 52.2292, longitude: 5.1669 },
  { slug: 'hoofddorp', name: 'Hoofddorp', latitude: 52.305, longitude: 4.6906 },
  { slug: 'purmerend', name: 'Purmerend', latitude: 52.505, longitude: 4.9592 },
  { slug: 'hoorn', name: 'Hoorn', latitude: 52.6436, longitude: 5.059 },
  { slug: 'gouda', name: 'Gouda', latitude: 52.0116, longitude: 4.7105 },
  { slug: 'spijkenisse', name: 'Spijkenisse', latitude: 51.85, longitude: 4.3297 },
  { slug: 'middelburg', name: 'Middelburg', latitude: 51.4988, longitude: 3.6109 },
  { slug: 'vlissingen', name: 'Vlissingen', latitude: 51.442, longitude: 3.5737 },
  { slug: 'assen', name: 'Assen', latitude: 52.9967, longitude: 6.5622 },
  { slug: 'emmen', name: 'Emmen', latitude: 52.7792, longitude: 6.9068 },
  { slug: 'almelo', name: 'Almelo', latitude: 52.3557, longitude: 6.6625 },
  { slug: 'oss', name: 'Oss', latitude: 51.765, longitude: 5.518 },
  { slug: 'helmond', name: 'Helmond', latitude: 51.479, longitude: 5.657 },
  { slug: 'heerlen', name: 'Heerlen', latitude: 50.8882, longitude: 5.9795 },
  { slug: 'sittard-geleen', name: 'Sittard-Geleen', latitude: 51.0004, longitude: 5.8567 },
  { slug: 'venray', name: 'Venray', latitude: 51.525, longitude: 5.9754 },
  { slug: 'harderwijk', name: 'Harderwijk', latitude: 52.3417, longitude: 5.6206 },
  { slug: 'zeist', name: 'Zeist', latitude: 52.09, longitude: 5.2331 },
  { slug: 'katwijk', name: 'Katwijk', latitude: 52.2036, longitude: 4.3988 },
  { slug: 'bergen-op-zoom', name: 'Bergen op Zoom', latitude: 51.4941, longitude: 4.2871 },
]

export const cities = cityData
export const citySlugs = cityData.map(city => city.slug)

const coreSlugSet = new Set(['amsterdam', 'rotterdam', 'den-haag', 'utrecht'])

export const coreCities = cityData.filter(city => coreSlugSet.has(city.slug))
export const coreCitySlugs = coreCities.map(city => city.slug)

export function getCityBySlug(slug: string): CityMeta | undefined {
  return cityData.find(city => city.slug === slug)
}
