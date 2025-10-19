import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'

export type BrandwachtStubConfig = {
  slug: string
  title: string
  description: string
  hero: {
    badge: string
    heading: string
    intro: string
  }
  bullets: { heading: string; items: string[] }[]
  canonical: string
}

export function buildMetadata({ title, description, canonical }: BrandwachtStubConfig): Metadata {
  return {
    title,
    description,
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    openGraph: {
      url: canonical,
      title,
      description,
      images: [
        {
          url: 'https://www.probrandwacht.nl/og-home.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.probrandwacht.nl/og-home.jpg'],
    },
  }
}

export function BrandwachtStubPage(config: BrandwachtStubConfig) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Brandwacht inhuren', url: 'https://www.probrandwacht.nl/opdrachtgevers/brandwacht-inhuren' },
    { name: config.hero.heading, url: config.canonical },
  ]
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opdrachtgeverFaq.slice(0, 3).map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <main className="mx-auto w-full min-h-full max-w-5xl space-y-10 px-4 py-10">
      <StructuredBreadcrumbs items={breadcrumbItems} />
      <section className="space-y-5 rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100">
          {config.hero.badge}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{config.hero.heading}</h1>
        <p className="max-w-3xl text-slate-700">{config.hero.intro}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/opdrachtgevers/aanmelden"
            className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-brand-700/90"
          >
            Brandwacht aanvragen
          </Link>
          <Link
            href="/zzp/aanmelden"
            className="inline-flex items-center rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
          >
            Aanmelden als brandwacht
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {config.bullets.map(block => (
          <div key={block.heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{block.heading}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {block.items.map(item => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Veelgestelde vragen</h2>
        <div className="mt-3 space-y-3">
          {opdrachtgeverFaq.slice(0, 3).map(item => (
            <details key={item.question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900 group-open:text-brand-700">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
