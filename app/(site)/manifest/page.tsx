import type { Metadata } from 'next'
import Prose from '@/components/prose'
import { getSignupUrl } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Missie | ProBrandwacht.nl',
  description:
    'De nieuwe standaard voor brandwachten in Nederland: eerlijk, duidelijk en betrouwbaar voor professionals én opdrachtgevers.',
  alternates: { canonical: '/manifest', languages: { 'nl-NL': '/manifest' } },
  other: { hreflang: 'nl-NL' },
  openGraph: {
    title: 'Missie | ProBrandwacht.nl',
    description:
      'De nieuwe standaard voor brandwachten in Nederland: eerlijk, duidelijk en betrouwbaar voor professionals én opdrachtgevers.',
    url: 'https://www.probrandwacht.nl/manifest',
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
  const signupUrl = getSignupUrl()
  return (
    <article>
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
        <h1>De nieuwe standaard voor brandwachten in Nederland</h1>
        <p>
          De brandwachtbranche staat onder druk. Professionals krijgen lage tarieven, bureaus houden
          hoge marges en transparantie ontbreekt. Opdrachtgevers merken ondertussen dat kwaliteit en
          motivatie daardoor afnemen. Dat kan én moet beter.
        </p>

        <h2>🔥 Wat gaat er mis in de markt?</h2>
        <ul>
          <li>
            <strong>Geen vakbond of collectieve afspraken</strong> → ieder bureau hanteert eigen
            spelregels.
          </li>
          <li>
            <strong>Hoge marges</strong> → opdrachtgevers betalen veel, maar de brandwacht ziet daar
            weinig van terug.
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

        <h2>✅ Hoe ProSafetyMatch het anders doet</h2>
        <h3>Eerlijke tarieven</h3>
        <ul>
          <li>Opdrachtgever ziet precies wat er betaald wordt.</li>
          <li>Brandwacht weet exact wat hij/zij overhoudt.</li>
        </ul>
        <h3>Meer verdienen als professional</h3>
        <ul>
          <li>Geen verborgen marges, maar een eerlijke verdeling.</li>
          <li>Escrow‑betalingen zorgen dat je altijd op tijd betaald krijgt.</li>
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
        <h3>Lange termijn relaties</h3>
        <ul>
          <li>
            Opdrachtgevers kunnen favorietenlijstjes maken en vaker samenwerken met dezelfde
            professionals.
          </li>
          <li>Dit zorgt voor betrokkenheid, vertrouwen en continuïteit op de werkvloer.</li>
        </ul>

        <h2>🌍 Onze missie</h2>
        <p>
          ProBrandwacht.nl werft professionals voor ProSafetyMatch, het platform dat de brandwachtmarkt digitaliseert en structureel beter maakt: eerlijk
          voor professionals, helder voor opdrachtgevers en betrouwbaar voor iedereen die rekent op
          brandveiligheid.
        </p>

        <h2>👉 Doe mee met de verandering</h2>
        <div className="not-prose">
          <a
            href={signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Aanmelden als brandwacht
          </a>
        </div>
      </Prose>
    </article>
  )
}
