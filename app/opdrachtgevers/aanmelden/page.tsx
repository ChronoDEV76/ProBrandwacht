import type { Metadata } from 'next'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import ClientSignupForm from '@/components/opdrachtgevers/client-signup-form'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'

const canonicalUrl = 'https://www.probrandwacht.nl/opdrachtgevers/aanmelden'

export const metadata: Metadata = {
  title: 'Aanmelden als opdrachtgever | ProBrandwacht.nl',
  description:
    'Registreer je als opdrachtgever voor ProSafetyMatch. Lever bedrijfsgegevens veilig aan en ontvang updates zodra je dashboard beschikbaar is.',
  alternates: {
    canonical: canonicalUrl,
    languages: { 'nl-NL': canonicalUrl },
  },
  openGraph: {
    url: canonicalUrl,
    title: 'Aanmelden als opdrachtgever | ProBrandwacht.nl',
    description:
      'Registreer je als opdrachtgever voor ProSafetyMatch. Lever bedrijfsgegevens veilig aan en ontvang updates zodra je dashboard beschikbaar is.',
    images: [
      {
        url: 'https://www.probrandwacht.nl/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Aanmelden als opdrachtgever via ProBrandwacht',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aanmelden als opdrachtgever | ProBrandwacht.nl',
    description:
      'Registreer je als opdrachtgever voor ProSafetyMatch. Lever bedrijfsgegevens veilig aan en ontvang updates zodra je dashboard beschikbaar is.',
    images: ['https://www.probrandwacht.nl/og-home.jpg'],
  },
}

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
    <div className="min-h-full bg-gradient-to-b from-brand-50 to-white py-10">
      <div className="mx-auto w-full max-w-3xl space-y-8 px-4 sm:px-6 md:px-0">
        <StructuredBreadcrumbs items={breadcrumbItems} />
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900">Meld je bedrijf aan</h1>
          <p className="text-sm text-slate-600">
            Vul je bedrijfsgegevens in en ontvang een uitnodiging voor het aanvraagportaal. We verifiëren KvK, contactgegevens en contractgegevens voordat escrow wordt geactiveerd.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/opdrachtgevers/brandwacht-inhuren" className="underline text-brand-700">
              Bekijk eerst hoe inhuur werkt
            </a>
            <a href="/faq" className="underline text-brand-700">
              Lees de veelgestelde vragen
            </a>
          </div>
        </header>
        <ClientSignupForm className="px-0" />
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Veelgestelde vragen</h2>
          <div className="mt-3 space-y-3">
            {opdrachtgeverFaq.map(item => (
              <details key={item.question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900 group-open:text-brand-700">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  )
}
