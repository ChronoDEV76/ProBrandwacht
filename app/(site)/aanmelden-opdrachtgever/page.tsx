import type { Metadata } from 'next'
import Link from 'next/link'
import { getSignupUrl } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Aanmelden voor wachtlijst opdrachtgevers | ProBrandwacht.nl',
  description:
    'Word als eerste op de hoogte gebracht wanneer ProSafetyMatch voor opdrachtgevers live gaat. Vul je gegevens in en ontvang updates over transparante brandwacht-inhuur.',
  alternates: { canonical: '/aanmelden-opdrachtgever' },
  openGraph: {
    title: 'Aanmelden voor wachtlijst opdrachtgevers | ProBrandwacht.nl',
    description:
      'Word als eerste op de hoogte gebracht wanneer ProSafetyMatch voor opdrachtgevers live gaat. Vul je gegevens in en ontvang updates over transparante brandwacht-inhuur.',
    url: 'https://probrandwacht.nl/aanmelden-opdrachtgever',
    type: 'website',
  },
}

const checklistItems = [
  'Volledige transparantie over tariefopbouw (opdrachtgever, professional, platformfee).',
  'Voorgeselecteerde, gecertificeerde brandwachten met gecontroleerde documenten.',
  'Escrow-betalingen en DBA-proof documentatie om risico’s te verkleinen.',
]

export default function AanmeldenOpdrachtgeverPage() {
  const signupUrl = getSignupUrl()

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-wide text-brand-600">Wachtlijst opdrachtgevers</p>
        <h1 className="text-3xl font-semibold text-slate-900">Word eerste gebruiker van ProSafetyMatch</h1>
        <p className="text-slate-700">
          Vul je gegevens in en ontvang updates over de livegang, pilots en onboarding voor opdrachtgevers.
          We gebruiken je gegevens alleen om relevant contact te houden over ProSafetyMatch.
        </p>
      </header>

      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Wat je krijgt als wachtlijstlid</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          {checklistItems.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-sm text-slate-600">
          Na aanmelding ontvang je een bevestiging per e-mail met vervolgstappen. Zodra het platform pilotopdrachten uitrolt, ben jij als eerste aan de beurt.
        </p>
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-2xl bg-brand-700 px-5 py-3 text-white shadow hover:bg-brand-500"
        >
          Meld je aan via het formulier
        </a>
      </div>

      <footer className="space-y-3 text-sm text-slate-600">
        <p>
          Liever direct contact? Stuur ons een e-mail via{' '}
          <a className="underline" href="mailto:info@probrandwacht.nl">
            info@probrandwacht.nl
          </a>{' '}
          en we plannen een intake.
        </p>
        <p>
          Of blader door de{' '}
          <Link className="underline" href="/opdrachtgevers">
            overzichtspagina voor opdrachtgevers
          </Link>{' '}
          om meer te lezen over de voordelen.
        </p>
      </footer>
    </section>
  )
}
