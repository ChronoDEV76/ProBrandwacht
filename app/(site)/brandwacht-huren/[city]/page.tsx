import { notFound } from 'next/navigation'

import { CITY_RECORD_MAP, CITY_SLUGS, type CitySlug } from '@/lib/city-data'
import { BrandwachtInhurenCityPage, generateMetadata, generateStaticParams } from '../../brandwacht-inhuren/[city]/page'

const isCitySlug = (value: string): value is (typeof CITY_SLUGS)[number] =>
  CITY_SLUGS.includes(value as (typeof CITY_SLUGS)[number])

const resolveLabel = (city: CitySlug) =>
  CITY_RECORD_MAP[city]?.name ?? city.replace(/-/g, ' ')

export default function BrandwachtHurenCityPage({ params }: { params: { city: string } }) {
  const rawCity = params.city
  if (!isCitySlug(rawCity)) return notFound()

  const label = resolveLabel(rawCity)

  return (
    <>
      <h1 className="sr-only">Brandwacht huren in {label} | ProBrandwacht</h1>
      <p className="sr-only">
        ProBrandwacht is een selectief platform voor zelfstandige brandwachten en
        opdrachtgevers die bewust kiezen voor directe samenwerking. Geen klassiek bureau
        en geen tussenlaag. We bewaken uitvoerbaarheid en zeggen soms nee. Inzet is
        contextafhankelijk met heldere rolverdeling en verantwoordelijkheid.
      </p>
      <BrandwachtInhurenCityPage params={params} h1Verb="huren" includeSrOnlyH1={false} />
    </>
  )
}
