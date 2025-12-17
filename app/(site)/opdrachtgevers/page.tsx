import Link from 'next/link'
import { SPOED_UI_ENABLED } from '@/lib/featureFlags'
import SeoStructuredData from '@/components/SeoStructuredData'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata = getRouteMetadata('/opdrachtgevers')

export default function OpdrachtgeversPage() {
  const showSpoed = SPOED_UI_ENABLED

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={opdrachtgeverFaq.slice(0, 4)} />
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
              Voor opdrachtgevers die het goed willen regelen
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Direct samenwerken met{' '}
              <span className="text-emerald-300">zelfstandige brandwachten</span>{' '}
              – eerlijk en DBA-bewust
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              Je werkt rechtstreeks samen met zelfstandige brandwachten. Tarief, taken en rolverdeling spreken
              jullie onderling af. ProBrandwacht zorgt voor een helder en uitlegbaar platform, terwijl
              ProSafetyMatch is een platformconcept in ontwikkeling (planning, documenten en rapportages kunnen onderdeel worden).
            </p>

            <p className="text-xs text-slate-400">
              Tariefvoorstellen zijn indicatief en afhankelijk van inzet, locatie en certificering.
              Bespreek samen met de zzp’er welke afspraken passend zijn.
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is een onafhankelijk platform waar opdrachtgevers en zelfstandige
              brandwachten elkaar direct vinden. Geen klassieke ketenconstructies, maar duidelijke
              profielen, heldere afspraken en samenwerking binnen wet- en regelgeving.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Start met zoeken naar brandwachten
              </Link>

              {showSpoed && (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
                >
                  Snelle inzet regelen? Meld je via ProBrandwacht Direct
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VOORDELEN */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/90">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Waarom opdrachtgevers kiezen voor ProBrandwacht
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Brandveiligheid goed organiseren vraagt om duidelijkheid, zorgvuldigheid en respect
              voor wetgeving. ProSafetyMatch is in ontwikkeling om dit praktisch en werkbaar te helpen inrichten.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-emerald-300">Heldere informatie</h3>
              <p className="text-sm text-slate-200">
                Inzichtelijke en toetsbare informatie over ervaring en kwalificaties van
                zelfstandige brandwachten, zonder anonieme dossiers.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-sky-300">Duidelijke afspraken</h3>
              <p className="text-sm text-slate-200">
                Tarieven, duur en verantwoordelijkheden worden vooraf vastgelegd.
                Geen vage constructies, maar volwassen samenwerking.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-violet-300">
                Samenwerken binnen DBA-kaders
              </h3>
              <p className="text-sm text-slate-200">
                Praktische ondersteuning richting DBA-bewust samenwerking, zonder je
                organisatie onnodig complex te maken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRUG */}
      <section className="border-b border-slate-900/60 bg-slate-900/80">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Brug tussen opdrachtgever en zelfstandige
            </p>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Samen beslissen en vastleggen
            </h2>
            <p className="text-sm text-slate-200 md:text-base">
              ProSafetyMatch is in ontwikkeling om afspraken, inzet, certificaten en evaluaties te bundelen in één omgeving
              digitaal dossier. Alles is controleerbaar vastgelegd en wordt gezamenlijk
              bijgehouden door opdrachtgever en zzp’er.
            </p>
          </div>
        </div>
      </section>

      {/* HOE HET WERKT */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Hoe het concept werkt voor jouw organisatie
            </h2>
            <p className="text-sm text-slate-200 md:text-base">
              Van eerste aanvraag tot inzet op locatie: een overzichtelijk proces zonder
              onnodige schakels.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-2">
            {[
              {
                step: 'Stap 1',
                title: 'Organisatie aanmelden',
                text: 'Je registreert je als opdrachtgever en geeft aan in welke context je brandwachten inzet.'
              },
              {
                step: 'Stap 2',
                title: 'Concrete aanvraag plaatsen',
                text: 'Je beschrijft locatie, risico’s, duur en het gewenste aantal brandwachten.'
              },
              {
                step: 'Stap 3',
                title: 'Direct contact',
                text: 'Je gaat rechtstreeks in gesprek met passende zelfstandige professionals.'
              },
              {
                step: 'Stap 4',
                title: 'Duurzaam samenwerken',
                text: 'Je bouwt aan een toekomstbestendig safety-model, klaar voor integratie met ProSafetyMatch.'
              }
            ].map(({ step, title, text }) => (
              <li
                key={step}
                className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {step}
                </div>
                <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
                <p className="text-sm text-slate-200">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">
              Veiligheid op niveau, samenwerking in balans
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Met ProBrandwacht kies je voor transparantie en vakmanschap, met een
              samenwerkingsmodel dat goed uitlegbaar is richting HR, OR en toezichthouders.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Aanmelden als opdrachtgever
              </Link>

              {showSpoed && (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-400/10"
                >
                  Snelle inzet nodig? ProBrandwacht Direct
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
