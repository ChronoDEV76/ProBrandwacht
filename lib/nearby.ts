// lib/nearby.ts
import type { CityRecord } from "./city-data"
import { CITY_DATA } from "./city-data"

function toRad(n: number) { return (n * Math.PI) / 180 }
function haversine(a: CityRecord, b: CityRecord) {
  const R = 6371
  const dLat = toRad(b.latitude - a.latitude)
  const dLon = toRad(b.longitude - a.longitude)
  const lat1 = toRad(a.latitude)
  const lat2 = toRad(b.latitude)
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

export function getNearby(slug: string, limit = 4) {
  const current = CITY_DATA.find(c => c.slug === slug)
  if (!current) return []
  return CITY_DATA
    .filter(c => c.slug !== slug)
    .map(c => ({ city: c, dist: haversine(current, c) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, limit)
    .map(x => x.city)
}

