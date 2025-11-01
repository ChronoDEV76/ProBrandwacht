import type { Metadata } from 'next'
import Link from 'next/link'
import Prose from '@/components/prose'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'

const canonicalUrl = 'https://www.probrandwacht.nl/missie'

export const metadata: Metadata = {
  title: 'Missie | ProBrandwacht.nl',
  description:
    'De nieuwe standaard voor brandwachten in Nederland: eerlijk, duidelijk en betrouwbaar voor professionals én opdrachtgevers.',
  alternates: { canonical: canonicalUrl, languages: { 'nl-NL': canonicalUrl } },
  other: { hreflang: 'nl-NL' },
  openGraph: {
    title: 'Missie | ProBrandwacht.nl',
    description:
      'De nieuwe standaard voor brandwachten in Nederland: eerlijk, duidelijk en betrouwbaar voor professionals én opdrachtgevers.',
    url: canonicalUrl,
    images: [{ url: '/og-home.jpg', width: 1200, height: 630, alt: 'Missie van ProBrandwacht.nl' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
    images: ['/og-home.jpg'],
  },
}

export default function ManifestPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Missie', url: canonicalUrl },
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
    <>
      <article className="space-y-8 pb-28 sm:pb-0">
        <StructuredBreadcrumbs items={breadcrumbItems} />

        {/* HERO */}
        <header className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">Onze Missie</h1>
          <p className="mt-2 max-w-2xl text-slate-700">
            Eerlijk, duidelijk en betrouwbaar voor brandwachten én opdrachtgevers. ProBrandwacht werft
            professionals en opdrachtgevers voor <strong>ProSafetyMatch</strong> — het platform dat transparantie,
            escrow en DBA-proof samenwerken de norm maakt.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/zzp/aanmelden"
              className="rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Meld je aan als zzp-brandwacht
            </Link>
            <Link
              href="/opdrachtgevers/aanmelden"
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-white"
            >
              Aanmelden als opdrachtgever
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Samen zetten we de nieuwe standaard voor brandwachten
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Aangescherpt met feedback uit de sector (200+ professionals)
            </span>
          </div>
        </header>

        {/* KERNPILAREN */}
        <section className="grid gap-4 sm:grid-cols-3">
          <Card title="Eerlijke tarieven" text="Iedereen ziet de opbouw. 10% platformfee + 1–2% escrow, geen verborgen marges." />
          <Card title="Escrow-betaling" text="Vooraf gestort, automatisch uitbetaald na bevestigde uitvoering." />
          <Card title="Gecertificeerd netwerk" text="Actuele certificaten en reviews in één oogopslag, DBA-proof vastgelegd." />
        </section>

        <Prose>
          <h2>De nieuwe standaard voor brandwachten</h2>
          <p>
            De branche staat onder druk: te lage tarieven, te veel schakels en te weinig zeggenschap. Met
            ProSafetyMatch maken we het fundament weer gezond: transparantie in tarieven, zekerheid in betaling
            en duidelijke, zelfstandige afspraken tussen opdrachtgever en professional.
          </p>

          <h2>Wat gaat er mis in het oude model?</h2>
          <ul>
            <li><strong>Ondoorzichtige prijsopbouw</strong> → opdrachtgever en brandwacht missen zicht op elkaars kant.</li>
            <li><strong>Hoge overhead</strong> → marges blijven hangen bij tussenlagen, niet bij vakmanschap.</li>
            <li><strong>Dumpingtarieven</strong> → ogenschijnlijk goedkoper, maar duur door verloop en kwaliteitsverlies.</li>
          </ul>

          <h2>Hoe doen wij het anders?</h2>
          <ul>
            <li><strong>Tarieftransparantie</strong> — helder voor beide kanten, inclusief platformfee en escrow.</li>
            <li><strong>Escrow-zekerheid</strong> — op tijd betaald, minder risico, meer rust op de vloer.</li>
            <li><strong>DBA-proof</strong> — rol en onafhankelijkheid zijn contractueel geborgd.</li>
            <li><strong>Vrijheid & motivatie</strong> — professionals kiezen opdrachten en bouwen reputatie op kwaliteit.</li>
          </ul>

          <h2>Onze missie</h2>
          <p>
            ProBrandwacht.nl werft en informeert; <strong>ProSafetyMatch</strong> is het platform waar transparantie en directe samenwerking
            samenkomen. Eerlijk voor professionals, helder voor opdrachtgevers en beter voor iedereen die rekent op veiligheid.
          </p>

          <h2>Doe mee met de verandering</h2>
          <p>
            Sluit je aan en bouw mee aan de nieuwe norm. Vandaag transparant regelen, morgen sterker samenwerken.
          </p>

          <div className="not-prose mt-3 flex flex-wrap gap-2">
            <Link href="/zzp/aanmelden" className="rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
              Aanmelden als brandwacht
            </Link>
            <Link href="/opdrachtgevers/aanmelden" className="rounded-2xl border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
              Aanmelden als opdrachtgever
            </Link>
          </div>
        </Prose>

        {/* FAQ */}
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

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </article>

      {/* Sticky mobiele CTA-bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-6px_18px_rgba(0,0,0,0.06)] px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:hidden">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-2">
          <div className="flex w-full items-center gap-2">
            <Link
              href="/zzp/aanmelden"
              className="flex-1 rounded-md bg-brand-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-600"
            >
              Meld je aan (zzp)
            </Link>
            <Link
              href="/opdrachtgevers/aanmelden"
              className="rounded-md border border-slate-200 px-3 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-white"
            >
              Brandwacht aanvragen
            </Link>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Samen zetten we de nieuwe standaard voor brandwachten
          </p>
        </div>
      </div>
    </>
  )
}

/* -------------------------- Kleine componenten -------------------------- */

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-600 mt-1">{text}</p>
    </div>
  )
}

