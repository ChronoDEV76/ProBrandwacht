import type { Metadata } from 'next'

import ClientPage from '@/app/zzp/aanmelden/client-page'
import AfbakeningNote from '@/components/afbakening-note'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/voor-brandwachten/aanmelden')

export default function VoorBrandwachtenAanmeldenPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalPlatformFaq.slice(0, 4).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const heading = (
    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
      Verkennende intake voor zelfstandige brandwachten
    </h1>
  )

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 pt-8">
        <div className="panel mb-6 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Belangrijk om te weten
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>• ProBrandwacht is een verkennend initiatief - geen klassiek bureau en geen tussenlaag.</li>
            <li>• We lichten toe hoe uitvoerbaarheid herkenbaar wordt en zeggen soms nee als randvoorwaarden niet kloppen.</li>
            <li>• We doen geen garantie op inzet: samenwerking en inzet blijven contextafhankelijk.</li>
            <li>• Verkennende intake = geen inschrijving; selectie kan onderdeel zijn van onboarding.</li>
            <li>• Doel: DBA-bewuste, uitlegbare afspraken en professioneel gedrag in de praktijk.</li>
          </ul>
        </div>
      </div>
      <ClientPage heading={heading} />
      <div className="mx-auto w-full max-w-5xl px-4 pb-10">
        <AfbakeningNote />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
