import type { Metadata } from 'next'
import { cities } from '@/lib/cities'
import Link from 'next/link'

export async function generateStaticParams() {
  return cities.map(city => ({ city }))
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const city = params.city
  const title = `Brandwacht inhuren ${city} | ProBrandwacht.nl`
  const url = `/brandwacht-inhuren/${city}`
  return {
    title,
    description: `Direct brandwacht inhuren in ${city}. Transparante tarieven en gecertificeerde professionals.`,
    alternates: { canonical: url },
    other: { hreflang: 'nl-NL' },
    openGraph: { url, title },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const { city } = params
  const nice = city.replace(/-/g, ' ')
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Brandwacht inhuren in {nice}</h1>
      <p>
        Zoek en boek direct gecertificeerde brandwachten in {nice}. Transparante tarieven, escrow-betaling en
        verificatie van certificaten.
      </p>
      <ul className="list-disc pl-6">
        <li>Evenementen & hospitality</li>
        <li>Bouw & industrie</li>
        <li>Specialistische inzet (Manschappen A/B, MVK/HVK)</li>
      </ul>
      <p className="text-sm text-slate-500">
        Andere steden:{' '}
        {cities
          .filter(c => c !== city)
          .map(c => (
            <Link key={c} href={`/brandwacht-inhuren/${c}`} className="underline mr-2">
              {c.replace(/-/g, ' ')}
            </Link>
          ))}
      </p>
    </section>
  )
}

