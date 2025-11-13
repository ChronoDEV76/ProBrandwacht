import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import faqContent from '@/content/faq.json'

const canonicalUrl = 'https://www.probrandwacht.nl/faq'

export const metadata: Metadata = {
  title: 'FAQ | ProBrandwacht.nl',
  description: 'Antwoorden op veelgestelde vragen over brandwachten voor evenementen, bouw en industrie.',
  keywords: [
    'brandwacht',
    'brandwacht inhuren',
    'brandwacht huren',
    'DBA-proof brandwacht',
    'brandwacht tarieven',
  ],
  alternates: { canonical: canonicalUrl, languages: { 'nl-NL': canonicalUrl } },
  other: { hreflang: 'nl-NL' },
  openGraph: {
    url: canonicalUrl,
    title: 'FAQ | ProBrandwacht.nl',
    description: 'Antwoorden op veelgestelde vragen over brandwachten voor evenementen, bouw en industrie.',
    images: [
      {
        url: 'https://www.probrandwacht.nl/og-home.webp',
        width: 1200,
        height: 630,
        alt: 'Veelgestelde vragen over brandwacht inhuren',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | ProBrandwacht.nl',
    description: 'Antwoorden op veelgestelde vragen over brandwachten voor evenementen, bouw en industrie.',
  },
}

type FAQItem = {
  id?: string
  question: string
  summary?: string
  answer: string[]
  more?: { href: string; label: string }
}

type FAQSection = {
  title: string
  items: FAQItem[]
}

const sections = faqContent as FAQSection[]

export default function FAQPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sections
      .flatMap(section => section.items.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer.join(' ') },
      })))
      .slice(0, 6),
  }

  return (
    <section className="space-y-8">
      <StructuredBreadcrumbs
        items={[
          { name: 'Home', url: 'https://www.probrandwacht.nl/' },
          { name: 'FAQ', url: canonicalUrl },
        ]}
      />
      <h1 className="text-3xl font-semibold">Veelgestelde vragen</h1>
      {/* __seo-badges */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
          Samen zetten we de nieuwe standaard voor veiligheids professionals
        </span>
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
          Aangescherpt met feedback uit de sector (200+ professionals)
        </span>
      </div>
{/* marketing intro intentionally removed */}
      {sections.map(section => (
        <div key={section.title} className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
          <ul className="space-y-3">
            {section.items.map(item => (
              <li
                key={item.id ?? item.question}
                id={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <p className="font-medium text-slate-900">{item.question}</p>
                {item.summary ? <p className="text-sm font-medium text-slate-600">{item.summary}</p> : null}
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {item.answer.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
                {item.more ? (
                  <p className="mt-2 text-sm">
                    <Link href={item.more.href} className="underline">
                      {item.more.label}
                    </Link>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Waarom opdrachtgevers vertrouwen op ProBrandwacht</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>• Certificaten worden realtime gecontroleerd en verlopen documenten blokkeren we direct</li>
          <li>• Gebruikt door veiligheidsregio-adviseurs als referentie voor vergunningstrajecten</li>
        </ul>
      </div>
    </section>
  )
}
