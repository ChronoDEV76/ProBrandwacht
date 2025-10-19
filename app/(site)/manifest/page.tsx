import type { Metadata } from 'next'
import Link from 'next/link'
import Prose from '@/components/prose'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'

const canonicalUrl = 'https://www.probrandwacht.nl/manifest'

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
    <article>
      <StructuredBreadcrumbs items={breadcrumbItems} />
      {/* Kleine hero-kop voor context */}
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">Onze Missie</h1>
        <p className="text-slate-700 mt-1 max-w-2xl">
          Eerlijk, duidelijk en betrouwbaar voor brandwachten én opdrachtgevers.
        </p>
      </header>

      {/* Heldere kaarten voor consistentie met de landingspagina */}
      <section className="mb-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 mb-2 text-brand-700 opacity-90"
            >
              <path
                fill="currentColor"
                d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm.5 4h-2v2H9v2h1.5v2H9v2h1.5v2h2v-2h1.75v-2H12.5v-2h2.25V9H12.5V7Z"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">Eerlijke tarieven</h3>
            <p className="text-sm text-slate-600 mt-1">Iedereen ziet wat er betaald wordt.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 mb-2 text-brand-700 opacity-90"
            >
              <path
                fill="currentColor"
                d="M12 2a7 7 0 0 1 7 7v2h1a2 2 0 0 1 2 2v7h-6v-6H8v6H2v-7a2 2 0 0 1 2-2h1V9a7 7 0 0 1 7-7Zm0 2a5 5 0 0 0-5 5v2h10V9a5 5 0 0 0-5-5Z"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">Escrow‑betaling</h3>
            <p className="text-sm text-slate-600 mt-1">Veilig en op tijd uitbetaald.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 mb-2 text-brand-700 opacity-90"
            >
              <path
                fill="currentColor"
                d="M12 2 4 6v6c0 5 3.4 9.3 8 10 4.6-.7 8-5 8-10V6l-8-4Zm0 4.3 5 2.5V12c0 3.6-1.9 6.9-5 7.7-3.1-.8-5-4.1-5-7.7V8.8l5-2.5Zm0 3.7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">Gecertificeerde professionals</h3>
            <p className="text-sm text-slate-600 mt-1">Focus op actuele certificaten en reviews.</p>
          </div>
        </div>
      </section>

      <Prose>
        <h2>De nieuwe standaard voor brandwachten in Nederland</h2>
        <p>
          De brandwachtbranche staat onder druk. We horen elke week dezelfde verhalen: lage tarieven, laat geld, te veel schakels
          en te weinig zeggenschap. Professionals en opdrachtgevers verdienen beter. Daarom bouwen we aan een eerlijk en snel alternatief.
        </p>

        <h2>🔥 Wat gaat er mis in de markt?</h2>
        <ul>
          <li>
            <strong>Geen vakbond of collectieve afspraken</strong> → iedere ketenpartij hanteert eigen
            spelregels.
          </li>
          <li>
            <strong>Hoge marges</strong> → in klassieke modellen blijft een groot deel van het tarief
            hangen bij management en overhead.
          </li>
          <li>
            <strong>Dumpingtarieven</strong> → tarieven van €30/u lijken aantrekkelijk, maar zorgen voor
            minder motivatie, meer verloop en hogere risico’s.
          </li>
          <li>
            <strong>Korte termijn denken</strong> → bedrijven worden opgericht en na enkele jaren
            weer doorverkocht.
          </li>
          <li>
            <strong>Te weinig openheid</strong> → opdrachtgever weet niet wat de brandwacht
            verdient, brandwacht weet niet wat de opdrachtgever betaalt.
          </li>
        </ul>

        <h3>Drie groepen brandwachten die we bij elkaar brengen</h3>
        <ul>
          <li>
            <strong>Repressieve brandwachten</strong> – werken bij korps of veiligheidsregio, draaien af en toe extra uren
            en brengen operationele ervaring mee, maar willen duidelijke afspraken.
          </li>
          <li>
            <strong>Volledig zzp-brandwachten</strong> – rijksgediplomeerd, vaak met ademlucht en aanvullende certificaten.
            Ze kiezen voor vrijheid, maar alleen als de beloning eerlijk is en afspraken helder zijn.
          </li>
          <li>
            <strong>Industrieel inzetbare brandwachten</strong> – beschikken over petrochemische certificaten en projectroutine.
            Zij willen voorkomen dat ze worden ingezet voor lage tarieven waarbij weinig overblijft voor hun expertise.
          </li>
        </ul>

        <h2>✅ Hoe ProSafetyMatch het anders doet</h2>
        <p>
          Wij zijn geen bureau dat tarieven voorschrijft. ProSafetyMatch maakt zichtbaar wat opdrachtgever en zzp’er
          afspreken, houdt escrow veilig en zorgt dat documenten DBA-proof zijn. Binnen enkele minuten staat je profiel live en kun je zelf bepalen welke opdrachten bij je passen.
        </p>
        <h3>Eerlijke tarieven</h3>
        <ul>
          <li>Opdrachtgever ziet precies wat er betaald wordt en kan onderbouwen waarom.</li>
          <li>Brandwacht weet exact wat hij/zij overhoudt en kan een tarief voorstellen dat past bij de opdracht.</li>
        </ul>
        <h3>Meer verdienen als professional</h3>
        <ul>
          <li>Geen verborgen marges, maar een eerlijke verdeling.</li>
          <li>Escrow‑betalingen zorgen dat je altijd op tijd betaald krijgt.</li>
        </ul>
        <h3>Ondernemersvrijheid terug</h3>
        <ul>
          <li>Jij kiest opdrachten, tijden en tarieven. Het platform ondersteunt met tooling en betaling, niet met sturing.</li>
          <li>Geen verkapt dienstverband: je werkt als ondernemer met de voordelen en zekerheid die daarbij horen.</li>
        </ul>
        <h3>Motivatie en kwaliteit centraal</h3>
        <ul>
          <li>
            Brandwachten met goede reviews en actuele certificaten krijgen meer opdrachten en betere
            tarieven.
          </li>
          <li>Gemotiveerde mensen leveren betere veiligheid.</li>
        </ul>
        <h3>Collectieve voordelen</h3>
        <ul>
          <li>Toegang tot opleidingen, hercertificering en verzekeringen via het platform.</li>
          <li>Een community die elkaar versterkt.</li>
        </ul>
        <h3>Community & inspraak</h3>
        <ul>
          <li>Volledig zzp-brandwachten hebben geen vakbond. Wij bieden een digitaal collectief waar kennis en cases
            worden gedeeld.</li>
          <li>Zzp’ers en opdrachtgevers leveren input voor nieuwe features, compliance-tools en marktobservaties.</li>
          <li>Door samen te bouwen, blijven tarieven eerlijk en motivatie hoog.</li>
        </ul>
        <h3>Lange termijn relaties</h3>
        <ul>
          <li>
            Opdrachtgevers kunnen favorietenlijstjes maken en vaker samenwerken met dezelfde
            professionals.
          </li>
          <li>Dit zorgt voor betrokkenheid, vertrouwen en continuïteit op de werkvloer.</li>
        </ul>

        <h3>Waarom extreem lage tarieven uiteindelijk meer kosten</h3>
        <p>
          Zeer scherpe tarieven leveren op korte termijn voordeel op, maar zorgen voor meer uitval, minder motivatie en
          extra risico’s op de werkvloer. Of je nu via een bureau of direct samenwerkt: als de verdeling niet klopt,
          betaalt de kwaliteit de rekening. Door afspraken eerlijk vast te leggen en fee/escrow zichtbaar te maken,
          houden we de kwaliteit hoog én weten opdrachtgever en professional precies waar ze aan toe zijn.
        </p>
        <p>
          We delen onze inzichten openlijk via blogs, checklists en marktrapporten. Zo blijven opdrachtgevers, repressieve
          krachten en zzp’er-brandwachten op de hoogte van trends en best practices — en wordt ProSafetyMatch het eerste
          digitale referentiepunt in de sector.
        </p>

        <h2>🌍 Onze missie</h2>
        <p>
          ProBrandwacht.nl werft professionals voor ProSafetyMatch, het platform dat de brandwachtmarkt digitaliseert en structureel beter maakt: eerlijk
          voor professionals, helder voor opdrachtgevers en betrouwbaar voor iedereen die rekent op
          brandveiligheid.
        </p>

        <h2>👉 Doe mee met de verandering</h2>
        <div className="not-prose">
          <Link
            href="/zzp/aanmelden"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Aanmelden als brandwacht
          </Link>
        </div>
      </Prose>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

      <section className="mt-6 flex flex-wrap gap-3">
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
          Meld je aan als zzp-brandwacht
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </article>
  )
}
