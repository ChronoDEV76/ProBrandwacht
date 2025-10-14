import type { Metadata } from 'next'
import Link from 'next/link'
import faqContent from '@/content/faq.json'

export const metadata: Metadata = {
  title: 'FAQ | ProBrandwacht.nl',
  description: 'Antwoorden op veelgestelde vragen over brandwachten voor evenementen, bouw en industrie.',
  alternates: { canonical: '/faq', languages: { 'nl-NL': '/faq' } },
  other: { hreflang: 'nl-NL' },
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
    mainEntity: sections.flatMap(section =>
      section.items.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer.join(' ') },
      }))
    ),
  }

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold">Veelgestelde Vragen</h1>
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
    </section>
  )
}
