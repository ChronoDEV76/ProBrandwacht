import type { Metadata } from 'next'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import ClientSignupForm from '@/components/opdrachtgevers/client-signup-form'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

const canonicalUrl = 'https://www.probrandwacht.nl/opdrachtgevers/aanmelden'
export const metadata: Metadata = getRouteMetadata('/opdrachtgevers/aanmelden');


export default function OpdrachtgeverAanmeldenPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Voor opdrachtgevers', url: 'https://www.probrandwacht.nl/opdrachtgevers' },
    { name: 'Aanmelden', url: canonicalUrl },
  ]
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opdrachtgeverFaq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12 sm:px-6 md:px-8">
          <StructuredBreadcrumbs items={breadcrumbItems} />
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold md:text-4xl">Meld je bedrijf aan</h1>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="/opdrachtgevers" className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-slate-100 hover:border-emerald-300 hover:text-emerald-200">
                Bekijk hoe inhuur werkt
              </a>
              <a href="/faq" className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-slate-100 hover:border-emerald-300 hover:text-emerald-200">
                Veelgestelde vragen
              </a>
            </div>
          </header>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-12 sm:px-6 md:px-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
            <ClientSignupForm
              className="px-0"
              heading="Aanmelden als opdrachtgever"
              description="Gegevens gaan direct naar het platform; we bewaren alleen een lokale kopie in je browser (localStorage) zodat je ze later kunt hergebruiken of importeren."
              headingClassName="text-2xl font-semibold text-slate-50 md:text-3xl"
              descriptionClassName="text-sm text-slate-200 md:text-base"
            />
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              Gegevens worden opgeslagen conform de AVG (Algemene Verordening Gegevensbescherming) op beveiligde servers binnen de EU. U heeft te allen tijde recht op inzage, correctie of verwijdering van uw gegevens. Neem hiervoor contact op via{' '}
              <a href="mailto:privacy@prosafetymatch.nl" className="underline text-emerald-200">privacy@prosafetymatch.nl</a> of gebruik het formulier op onze <a href="/privacy" className="underline text-emerald-200">privacy-pagina</a>.
            </p>
          </div>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-50">Veelgestelde vragen</h2>
            <div className="mt-3 space-y-3">
              {opdrachtgeverFaq.map(item => (
                <details key={item.question} className="group rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-50 group-open:text-emerald-200">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-200">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
