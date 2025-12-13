import Link from 'next/link'

import { SPOED_UI_ENABLED } from '@/lib/featureFlags'

export default function OpdrachtgeversPage() {
  const showSpoed = SPOED_UI_ENABLED

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
              Voor opdrachtgevers die het goed willen regelen
            </span>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Direct samenwerken met{' '}
              <span className="text-emerald-300">zelfstandige brandwachten</span>{' '}
              - transparant en DBA-proof
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              Je werkt direct samen met zelfstandige brandwachten. Tarief, taken en gezag spreken
              jullie zelf af — ProBrandwacht helpt om dat helder, uitlegbaar en praktisch te
              organiseren, zonder klassiek bureaumodel of ketenconstructie.
            </p>
    
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is een onafhankelijk platform waar je direct in contact komt met
              zelfstandige brandwachten. Geen klassieke ketenconstructie, maar duidelijke profielen,
              heldere afspraken en een samenwerking die past binnen de wet- en regelgeving.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Start met zoeken naar brandwachten
              </Link>
              {showSpoed ? (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
                >
                  Snelle inzet regelen? Meld je via ProBrandwacht Direct
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* VOORDELEN VOOR OPDRACHTGEVERS */}
      <section className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Waarom opdrachtgevers met ProBrandwacht werken
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Je wilt brandveiligheid goed organiseren en tegelijkertijd netjes
              omgaan met zelfstandigen en wetgeving. ProBrandwacht helpt je om dat
              concreet en werkbaar te maken.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-emerald-300">
                Transparante profielen
              </h3>
              <p className="text-sm text-slate-200">
                In een oogopslag zicht op ervaring, certificaten en specialisaties van zelfstandige
                brandwachten - zodat je gericht kunt kiezen.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-sky-300">
                Duidelijke afspraken
              </h3>
              <p className="text-sm text-slate-200">
                Tarief, duur, werkzaamheden en verantwoordelijkheden worden helder
                vastgelegd. Geen vage constructies, wel volwassen samenwerking.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-violet-300">
                DBA-proof samenwerken
              </h3>
              <p className="text-sm text-slate-200">
                We denken mee in de richting van DBA-proof samenwerking, zonder je
                organisatie onnodig complex te maken. Praktisch, helder en goed
                uitlegbaar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOE HET WERKT VOOR OPDRACHTGEVERS */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Zo werkt ProBrandwacht voor jouw organisatie
            </h2>
            <p className="text-sm text-slate-200 md:text-base">
              Van eerste vraag tot inzet op locatie: een helder proces zonder
              onnodige schakels.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-2">
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 1
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Meld je organisatie aan
              </h3>
              <p className="text-sm text-slate-200">
                Je registreert je als opdrachtgever in transparante samenwerking en geeft aan in welke
                context je brandwachten inzet: events, industrie, bouw, infra of combinatie.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 2
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Plaats een concrete vraag
              </h3>
              <p className="text-sm text-slate-200">
                Je omschrijft locatie, risico&apos;s, duur, aantal brandwachten en
                eventueel specifieke eisen. Hoe concreter, hoe beter de match.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 3
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Direct contact met zelfstandige brandwachten
              </h3>
              <p className="text-sm text-slate-200">
                Je komt rechtstreeks in gesprek met passende professionals. Samen
                maak je heldere afspraken over tarief, taken en verwachtingen.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 4
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Naar een duurzaam safety-model
              </h3>
              <p className="text-sm text-slate-200">
                Door met zelfstandigen te werken via een transparant platform, bouw
                je aan een duurzaam model dat toekomstbestendig is - en klaar voor
                de koppeling met ProSafetyMatch.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* SLOT / CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">
              Veiligheid op niveau, samenwerking in balans
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Met ProBrandwacht kies je niet voor nog een bureau, maar voor een
              model waarin vakmanschap en zelfstandigheid centraal staan. Dat is niet
              alleen eerlijker voor de professional, maar ook beter uitlegbaar naar
              HR, OR en toezichthouders.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Aanmelden als opdrachtgever
              </Link>
              {showSpoed ? (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-400/10"
                >
                  Snelle inzet regelen? Meld je via ProBrandwacht Direct
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
