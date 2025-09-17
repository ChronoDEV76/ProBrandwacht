import Link from 'next/link'
import type { Metadata } from 'next'
import { getSignupUrl } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Het eerlijke brandwacht-platform – ProBrandwacht.nl',
  description:
    'Eerlijk platform voor brandwachten. Transparant, snel, veilig. ProSafetyMatch – in ontwikkeling door ProBrandwacht.nl – geeft zicht op tarieven, betalingen en certificaten.',
  alternates: { canonical: '/', languages: { 'nl-NL': '/' } },
  other: { hreflang: 'nl-NL' },
}

const problemModels = [
  {
    title: 'Traditioneel bureau',
    subtitle: 'Opdrachtgever betaalt €50/u',
    total: 50,
    segments: [
      { label: 'Bureau €20', amount: 20, className: 'bg-slate-300 text-slate-800' },
      { label: 'Brandwacht €30', amount: 30, className: 'bg-brand-500/90 text-white' },
    ],
  },
  {
    title: 'ProSafetyMatch (binnenkort)',
    subtitle: 'Opdrachtgever betaalt €45/u',
    total: 45,
    segments: [
      { label: 'Platform €5', amount: 5, className: 'bg-emerald-300 text-slate-900' },
      { label: 'Brandwacht €40', amount: 40, className: 'bg-brand-500/90 text-white' },
    ],
  },
]

const missionHighlights = [
  {
    title: 'Eerlijke beloning',
    description: 'De marge verdwijnt uit de keten: wat de opdrachtgever betaalt, zie jij vooraf én netto terug.',
  },
  {
    title: 'Transparante samenwerking',
    description:
      'Escrow-betalingen, inzicht in verdeling en directe communicatie bouwen vertrouwen naar beide kanten.',
  },
  {
    title: 'Langdurige motivatie',
    description: 'Certificaten, reviews en herhaalopdrachten zorgen voor teams die betrokken en betrouwbaar blijven.',
  },
]

const steps = [
  {
    title: 'Meld je vandaag aan',
    text: 'Vul je gegevens in, upload certificaten en word onderdeel van de eerste lichting brandwachten.',
  },
  {
    title: 'Ontvang updates',
    text: 'We delen pilots, feedbacksessies en de roadmap van ProSafetyMatch rechtstreeks met jou.',
  },
  {
    title: 'Start met opdrachten',
    text: 'Krijg transparante opdrachten met vaste uitbetaling zodra het platform live is.',
  },
]

export default function HomePage() {
  const signupUrl = getSignupUrl()

  return (
    <div className="relative w-full bg-gradient-to-r from-brand-50 to-white">
      <div className="relative text-slate-900">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-20 lg:pb-24 space-y-12">
          {/* Hero */}
          <header className="space-y-5">
            <p className="text-sm uppercase tracking-wide text-brand-600">Eerlijk platform voor brandwachten</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Sluit je aan bij het betrouwbare brandwachtcollectief.
            </h1>
            <p className="text-slate-700 max-w-2xl text-lg">
              Transparant, snel, veilig. ProSafetyMatch — het platform in ontwikkeling door
              ProBrandwacht.nl — brengt brandwachten en opdrachtgevers samen met duidelijkheid over
              tarieven, betalingen en certificaten.
            </p>
          </header>

          {/* Probleem */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Het probleem</h2>
              <p className="text-slate-700 max-w-3xl">
                Traditionele bureaus pakken forse marges, schuiven risico’s door en laten brandwachten
                werken zonder betalingszekerheid. Tegelijkertijd maakt de Wet DBA opdrachtgevers
                zenuwachtig om zzp’ers in te huren. Het resultaat: lage tarieven, onduidelijke
                afspraken en stress over uitbetaling.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {problemModels.map(model => (
                <article
                  key={model.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{model.title}</h3>
                    <p className="text-sm text-slate-600">{model.subtitle}</p>
                  </div>
                  <div className="overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <div className="flex h-10">
                      {model.segments.map(segment => (
                        <div
                          key={segment.label}
                          className={`flex items-center justify-center text-xs font-medium ${segment.className}`}
                          style={{ width: `${(segment.amount / model.total) * 100}%` }}
                          aria-label={segment.label}
                        >
                          {segment.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="rounded-2xl border border-brand-500/20 bg-brand-50 p-5 text-sm space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Onze oplossing</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>Transparante overeenkomsten die aansluiten op de Wet DBA en schijnzelfstandigheid voorkomen.</li>
                <li>Escrow-betalingen: zekerheid voor brandwacht én opdrachtgever.</li>
                <li>Eerlijke tarieven met volledige verdeling zichtbaar voor alle partijen.</li>
              </ul>
            </div>
          </section>

          {/* Managementvraag */}
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs uppercase tracking-wide text-brand-600">De eeuwige managementvraag</p>
              <h2 className="text-2xl font-semibold">Doen we de juiste dingen?</h2>
            </div>
            <div className="relative mx-auto max-w-3xl">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-slate-500">Efficiëntie</div>
              <div className="absolute top-1/2 -translate-y-1/2 -left-10 origin-center -rotate-90 text-sm text-slate-500">
                laag
              </div>
              <div className="grid grid-cols-2 grid-rows-2 border border-slate-300 bg-white text-sm font-medium text-slate-800">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-b border-slate-300 bg-amber-200 px-6 py-8 text-center">
                  <span>Efficiënt maar niet effectief</span>
                  <span className="font-semibold">De grote bureaus</span>
                </div>
                <div className="flex items-center justify-center border-b border-slate-300 px-6 py-8 text-center">
                  Efficiënt en effectief
                </div>
                <div className="flex items-center justify-center border-r border-slate-300 px-6 py-8 text-center">
                  Niet efficiënt, niet effectief
                </div>
                <div className="flex flex-col items-center justify-center gap-1 bg-orange-400 px-6 py-8 text-center text-slate-900">
                  <span className="font-semibold">ProSafetyMatch</span>
                  <span>probrandwacht.nl</span>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-slate-500">Effectiviteit</div>
            </div>
          </section>

          {/* Missie */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Onze missie</h2>
            <p className="text-slate-700 max-w-3xl">
              ProSafetyMatch zet transparantie en zekerheid centraal: DBA-proof overeenkomsten,
              escrow-betalingen en heldere tariefopbouw maken het werken met zzp-brandwachten
              geloofwaardig en toekomstbestendig.
            </p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {missionHighlights.map(item => (
                <li key={item.title} className="rounded-lg border bg-white p-4 text-sm shadow-sm">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-slate-600 mt-1">{item.description}</p>
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="/manifest"
                className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Lees de volledige missie →
              </Link>
            </div>
          </section>

          {/* Zo bouw je mee */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Zo bouw je mee aan het platform</h2>
            <ul className="grid gap-3 md:grid-cols-3">
              {steps.map(step => (
                <li key={step.title} className="rounded-lg border bg-white p-4 text-sm shadow-sm">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-slate-600 mt-1">{step.text}</p>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black shadow"
              >
                Meld je aan als zzp’er
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
