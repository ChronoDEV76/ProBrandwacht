import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { authoritativeSources } from '@/lib/seo/authoritative-sources'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/seo-resources');


export default function SeoResourcesPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'SEO bronnen', url: 'https://www.probrandwacht.nl/seo-resources' },
  ]
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalPlatformFaq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <main className="mx-auto w-full min-h-full max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <StructuredBreadcrumbs items={breadcrumbItems} />

      <article className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 md:p-10">
        <h1 className="text-3xl font-semibold text-slate-900">
          Autoritaire bronnen voor brandwachtcontent
        </h1>
        <p className="text-sm text-slate-600">
          Gebruik deze lijst wanneer je blogs of landingspagina’s schrijft. Link naar de passende bron
          met een beschrijvende anchor-tekst om Expertise, Authoritativeness en Trustworthiness te
          versterken.
        </p>
      </article>

      <ol className="mt-8 space-y-6">
        {authoritativeSources.map((src, index) => (
          <li key={src.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase text-slate-500">{index + 1}.</div>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">{src.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{src.description}</p>
            <ul className="mt-4 space-y-2">
              {src.links.map(link => (
                <li key={link.href}>
                  <Link
                    className="text-sm font-medium text-brand-700 underline hover:text-brand-800"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Veelgestelde vragen</h2>
        <div className="mt-3 space-y-3">
          {generalPlatformFaq.map(item => (
            <details key={item.question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900 group-open:text-brand-700">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        <Link href="/opdrachtgevers" className="rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700/90">
          Brandwacht inhuren
        </Link>
        <Link href="/zzp/aanmelden" className="rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50">
          ZZP aanmelden
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
