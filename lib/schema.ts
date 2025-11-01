// lib/schema.ts
import type { CityRecord } from "./city-data"

export function serviceJsonLd(city: CityRecord, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Brandwacht inhuren ${city.name}`,
    provider: { "@type": "Organization", name: "ProBrandwacht.nl", url: "https://www.probrandwacht.nl" },
    areaServed: city.name,
    url: pageUrl,
    category: "Brandveiligheid",
  }
}

export function offerCatalogJsonLd(city: CityRecord, ranges: { standaard: { min: number; max: number }, industrie?: { min: number; max: number } }, pageUrl: string) {
  const items = [
    {
      "@type": "Offer",
      name: "Evenementen/Bouw",
      url: pageUrl + "#tarief-calculator",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        minPrice: ranges.standaard.min,
        maxPrice: ranges.standaard.max,
        unitCode: "HUR",
      },
    },
  ]
  if (ranges.industrie) {
    items.push({
      "@type": "Offer",
      name: "Industrie/Petrochemie",
      url: pageUrl + "#tarief-calculator",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        minPrice: ranges.industrie.min,
        maxPrice: ranges.industrie.max,
        unitCode: "HUR",
      },
    })
  }
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `Tarieven brandwacht – ${city.name}`,
    url: pageUrl,
    itemListElement: items,
  }
}

