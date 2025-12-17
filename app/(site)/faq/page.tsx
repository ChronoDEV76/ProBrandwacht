import type { Metadata } from 'next'
import Link from 'next/link'

import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import faqContent from '@/content/faq.json'
import { getRouteMetadata } from '@/lib/seo/metadata'

const canonicalUrl = 'https://www.probrandwacht.nl/faq'
export const metadata: Metadata = getRouteMetadata('/faq')

const sections = Array.isArray((faqContent as any).sections)
  ? (faqContent as any).sections
  : (faqContent as any)

export default function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sections.flatMap((section: any) =>
      section.items.map((item: any) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: Array.isArray(item.answer) ? item.answer.join('\n') : item.answer,
        },
      })),
    ),
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        <StructuredBreadcrumbs
          items={[
            { name: 'Home', url: 'https://www.probrandwacht.nl/' },
            { name: 'FAQ', url: canonicalUrl },
          ]}
        />

        <article className="space-y-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 md:p-10">
          {/* HEADER */}
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-slate-900">
              Veelgestelde vragen
            </h1>

            <p className="max-w-2xl text-sm text-slate-700">
              Deze veelgestelde vragen sluiten aan op de manier van werken die je op de rest van
              ProBrandwacht ziet: eerlijk, DBA-bewust en met respect voor zelfstandig ondernemerschap.
            </p>

            <p className="text-sm text-slate-600">
              De antwoorden zijn gezamenlijk opgesteld met opdrachtgevers en zzp’ers, zodat processen
              helder, goedgekeurd en controleerbaar blijven.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                Samen zetten we de nieuwe standaard voor veiligheidsprofessionals
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                Aangescherpt met feedback uit de sector (200+ professionals)
              </span>
            </div>
          </header>

          {/* FAQ SECTIONS */}
          <div className="space-y-6">
            {sections.map((section: any) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">
                  {section.title}
                </h2>

                <ul className="space-y-3">
                  {section.items.map((item: any) => (
                    <li
                      key={item.id ?? item.question}
                      id={item.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="font-medium text-slate-900">
                        {item.question}
                      </p>

                      {item.summary && (
                        <p className="text-sm text-slate-600">
                          {item.summary}
                        </p>
                      )}

                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {item.answer.map((line: string, idx: number) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>

                      {item.more && (
                        <p className="mt-2 text-sm">
                          <Link
                            href={item.more.href}
                            className="font-medium text-slate-800 underline hover:text-slate-900"
                          >
                            {item.more.label}
                          </Link>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* TRUST BLOCK */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Waarom opdrachtgevers vertrouwen op ProBrandwacht
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                Certificaten worden handmatig gecontroleerd; verlopen documenten worden opnieuw
                opgevraagd bij aanmelding.
              </li>
              <li>
                Gebruikt door veiligheidsregio-adviseurs als referentie bij vergunningstrajecten.
              </li>
            </ul>
          </section>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </main>
  )
}

