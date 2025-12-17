import Link from 'next/link'
import { notFound } from 'next/navigation'

import PbDirectForm from '@/components/pb-direct-form'
import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags'

export default function ProbrandwachtDirectSpoedPage() {
  if (!SPOED_ROUTE_ENABLED) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      {/* HERO SPOED */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-rose-950 via-slate-950 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex rounded-full border border-rose-400/40 bg-rose-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-200">
              Spoedverzoek zelfstandige brandwacht
            </span>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Direct een{' '}
              <span className="text-emerald-300">zelfstandige brandwacht</span>{' '}
              nodig?
            </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Ook bij spoed blijven tarief en afspraken eerlijk: jij kiest als opdrachtgever
            samen met de zelfstandige brandwacht hoe de inzet eruitziet. ProBrandwacht zorgt
            alleen voor een veilige, snelle match.
          </p>
    
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Via ProBrandwacht kun je bij spoed een aanvraag doen voor ervaren
              zelfstandige brandwachten. We matchen je vraag met professionals in ons
              netwerk, binnen heldere afspraken en zonder onnodige tussenlagen.
            </p>
            <p className="text-xs text-slate-400 md:text-sm">
              Deze spoed-funnel verkent hoe directe aanvragen kunnen werken; ProSafetyMatch is daarbij een concept in ontwikkeling. Door nu al je aanvragen via dit
              kanaal te doen, help je ons de markt slimmer en eerlijker in te richten.
            </p>
          </div>
        </div>
      </section>

      {/* SPOED FUNNEL FORM / STAPPEN */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/95">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[2fr,1.3fr]">
            {/* Linkerkant: uitleg + stappen */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold md:text-2xl">
                Zo werkt de ProBrandwacht spoed-funnel
              </h2>
              <ol className="space-y-4 text-sm text-slate-200 md:text-base">
                <li>
                  <span className="font-semibold text-slate-100">
                    1. Je vult je spoedaanvraag in
                  </span>
                  <br />
                  Je geeft door: locatie, datum & tijd, type object/event, eventuele
                  eisen (bijv. industriele ervaring) en het gewenste aantal
                  brandwachten.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    2. We selecteren passende zelfstandige brandwachten
                  </span>
                  <br />
                  Op basis van beschikbare professionals in het netwerk brengen we
                  jouw vraag onder de aandacht bij zelfstandige brandwachten die
                  passen bij de opdracht.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    3. Direct contact en heldere afspraken
                  </span>
                  <br />
                  Je komt rechtstreeks in contact met de professional(s) en maakt
                  zelf de afspraken over tarief, taken en verantwoordelijkheden - in
                  lijn met een DBA-bewust samenwerking.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    4. Ervaring wordt input voor ProSafetyMatch
                  </span>
                  <br />
                  De manier waarop jouw spoedaanvraag verloopt, gebruiken we als input om ProSafetyMatch verder te ontwikkelen tot een breed
                  inzetbaar safety-platform.
                </li>
              </ol>

              <p className="text-xs text-slate-400 md:text-sm">
                Let op: ProBrandwacht is geen klassieke capaciteitsleverancier. We faciliteren de
                match tussen opdrachtgever en zelfstandige brandwacht, zodat jullie samen heldere
                afspraken kunnen maken.
              </p>
            </div>

            {/* Rechterkant: formulier / call-to-action blok */}
            <div className="space-y-4 rounded-2xl border border-rose-500/40 bg-slate-900/80 p-5 shadow-xl shadow-rose-900/40">
              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-rose-100 md:text-base">
                  Spoedaanvraag indienen
                </h2>
                <p className="text-xs text-slate-200 md:text-sm">
                  Gebruik dit kanaal alleen voor aanvragen met duidelijke tijdsdruk,
                  bijvoorbeeld: aankomend weekend, komende nacht of binnen enkele dagen.
                </p>
              </div>

              <PbDirectForm />

              <div className="space-y-2 text-xs text-slate-400 md:text-sm">
                <p>Toch liever per e-mail? Stuur je aanvraag naar info@probrandwacht.nl.</p>
                <p>
                  Liever eerst rustig verkennen hoe ProBrandwacht en ProSafetyMatch werken?
                </p>
                <Link
                  href="/opdrachtgevers"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-xs font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200 md:text-sm"
                >
                  Meer uitleg voor opdrachtgevers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLOT / CONTEXT */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">
              Spoed nu, structurele verbetering erin
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Met ProBrandwacht Direct Spoed los je acute bezetting op en draag je tegelijkertijd
              bij aan bredere professionalisering van de markt. De inzichten uit deze aanvragen
              kan aansluiten bij ProSafetyMatch, zodat brand- en safety-compliance structureel
              beter georganiseerd wordt.
            </p>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Zo combineren we{' '}
              <span className="font-semibold text-emerald-300">
                snelle inzet als het moet
              </span>{' '}
              met{' '}
              <span className="font-semibold text-emerald-300">
                duurzame verbetering van het model
              </span>{' '}
              voor zelfstandige professionals en opdrachtgevers.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
