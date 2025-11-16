import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { cities } from '@/lib/cities'

const BASE_URL = 'https://www.probrandwacht.nl'
const FALLBACK_DESCRIPTION =
  'Vraag direct een brandwacht aan met transparante tarieven en DBA-proof afspraken via ProBrandwacht.'

const cityMap = new Map(cities.map(city => [city.slug, city]))

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const slug = params.city.toLowerCase()
  const city = cityMap.get(slug)
  const cityName = city?.name ?? slug.replace(/-/g, ' ')
  const canonical = `${BASE_URL}/brandwacht-huren/${slug}`

  return {
    title: `Brandwacht huren ${cityName} | ProBrandwacht`,
    description: `${FALLBACK_DESCRIPTION} Beschikbaar in ${cityName}.`,
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    openGraph: {
      title: `Brandwacht huren ${cityName} | ProBrandwacht`,
      description: `${FALLBACK_DESCRIPTION} Beschikbaar in ${cityName}.`,
      url: canonical,
      type: 'website',
    },
  }
}



export default function BrandwachtHurenCityRedirect({
  params,
}: {
  params: { city: string }
}) {
  const slug = params.city.toLowerCase()
  if (!cityMap.has(slug)) {
    notFound()
  }
  redirect(`/brandwacht-inhuren/${slug}`)
}
