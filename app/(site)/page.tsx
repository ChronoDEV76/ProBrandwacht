import Link from 'next/link'

import WhyProBrandwachtSection from '@/components/why-probrandwacht-section'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24">
          <div className="relative z-10 max-w-xl space-y-6">
            <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              Onafhankelijk platform voor brandwachten en opdrachtgevers
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Voor zelfstandige brandwachten{' '}
              <span className="text-emerald-300">die zelf de regie houden</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              ProBrandwacht verbindt zelfstandige brandwachten en opdrachtgevers in transparante,
              DBA-proof samenwerking — zonder klassiek bureaumodel of andere onnodige schakels.
            </p>
            <p className="text-base leading-relaxed text-slate-200 md:text-lg">
              Je kiest zelf wat je deelt, welk tarief je rekent en hoe je samenwerkt. Opdrachtgevers
              krijgen duidelijke profielen, heldere afspraken en geen verborgen schakels in de keten.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/zzp/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Meld je gratis aan en bouw mee aan ProSafetyMatch
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              ProBrandwacht is de vakinhoudelijke voorloper van ProSafetyMatch - het
              bredere platform voor brand- en safetyprofessionals.
            </p>
          </div>

          <div className="relative ml-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-black/50 md:w-1/2">
            <h2 className="text-sm font-semibold text-slate-100">
              Wat lever je straks op ProSafetyMatch aan?
            </h2>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>- Je certificaten en ervaring als zelfstandige brandwacht</li>
              <li>- Je eigen uurtarief en beschikbaarheid</li>
              <li>- Voorkeuren qua projecten, sector en werktijden</li>
              <li>- Heldere, DBA-proof afspraken met opdrachtgevers</li>
            </ul>
            <p className="text-xs text-slate-400">
              Vandaag beginnen we in de niche van brandwachten. Morgen is dit jouw
              toegangspoort tot een breder safety-netwerk.
            </p>
          </div>
        </div>
      </section>

      {/* VOOR WIE */}
      <section className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
              Voor zelfstandige professionals en opdrachtgevers die het goed willen
              regelen
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is er in de eerste plaats voor de{' '}
              <strong className="font-semibold text-emerald-300">
                zelfstandige brandwacht
              </strong>{' '}
              die eigen tarief, agenda en voorwaarden wil bewaken. Tegelijk ondersteunen we opdrachtgevers
              in industrie, events en infra met expertise om op een transparante manier samen te werken
              met ervaren brandwachten - zonder onnodige tussenlagen.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                Voor zelfstandige brandwachten
              </h3>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>- Je bepaalt zelf je tarief en beschikbaarheid.</li>
                <li>
                  - Je behoudt je zelfstandigheid en eigen naam - geen verborgen
                  werkgeverschap.
                </li>
                <li>
                  - Je profiel sluit straks direct aan op ProSafetyMatch voor bredere
                  safety-opdrachten.
                </li>
              </ul>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                Voor opdrachtgevers
              </h3>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>
                  - Direct inzicht in profielen, certificaten en ervaring van
                  zelfstandige brandwachten.
                </li>
                <li>
                  - Transparante afspraken en DBA-proof samenwerking - zonder
                  ingewikkelde constructies.
                </li>
                <li>
                  - Een onafhankelijk platform in plaats van een wirwar aan bureaus.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WAAROM ANDERS DAN EEN BUREAU */}
      <WhyProBrandwachtSection />

      {/* HOE WERKT HET */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
              Zo werkt ProBrandwacht in de praktijk
            </h2>
            <p className="text-sm text-slate-200 md:text-base">
              Geen ingewikkelde constructies, maar een helder proces waarin iedereen
              weet waar hij aan toe is.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-2">
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 1
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Je maakt je profiel als zelfstandige brandwacht aan
              </h3>
              <p className="text-sm text-slate-200">
                Je vult ervaring, certificaten, voorkeuren en uurtarief in. Jij houdt
                de regie over wat je deelt en welke opdrachten bij je passen.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 2
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Opdrachtgevers plaatsen transparante opdrachten
              </h3>
              <p className="text-sm text-slate-200">
                Locatie, risico&apos;s, duur en gewenste expertise worden helder
                omschreven. Geen vage calls, maar concrete informatie.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 3
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Directe match en afspraken op eigen voorwaarden
              </h3>
              <p className="text-sm text-slate-200">
                Via ProBrandwacht kom je rechtstreeks met elkaar in contact. Je maakt
                afspraken binnen duidelijke, DBA-proof kaders - zonder dat een bureau
                ertussen zit.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 4
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Doorstromen naar ProSafetyMatch
              </h3>
              <p className="text-sm text-slate-200">
                ProBrandwacht is de niche-voorloper. Met jouw profiel kun je straks
                ook in de bredere safety-markt via ProSafetyMatch opdrachten vinden.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* VAKBOND-STYLE SLOT */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              Wij kiezen geen kamp, we kiezen voor duidelijke afspraken
            </h2>
            <p className="text-sm text-slate-200 md:text-base">
              ProBrandwacht is geen klassieke vakbond, maar wel een plek waar de
              positie van de zelfstandig professional serieus wordt genomen. We
              wijzen niet met vingers, maar kijken naar wat wel werkt: duidelijke
              contracten, kostendekkende tarieven en heldere rolverdeling.
            </p>
            <p className="text-sm text-slate-200 md:text-base">
              Zo maken we samen het werkveld veiliger, professioneler en eerlijker -
              zonder de samenwerking met goede opdrachtgevers of bestaande partijen in
              de weg te zitten.
            </p>
            <div>
              <Link
                href="/over-ons"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-400/10"
              >
                Lees onze missie en achtergrond
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
