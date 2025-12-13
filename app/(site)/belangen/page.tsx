// app/(site)/belangen/page.tsx

export default function BelangenPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Belangen & Vakmanschap
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              De positie van de{" "}
              <span className="text-emerald-300">zelfstandige brandwacht</span>
              <br className="hidden md:block" /> professioneel en toekomstbestendig organiseren
            </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Dezelfde uitgangspunten zie je terug in alle pagina&apos;s, tools en in de
            toekomstige ProSafetyMatch-functionaliteiten: transparantie, zelfstandigheid en
            duidelijke, DBA-proof afspraken voor alle betrokken partijen.
          </p>
    

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              De brandwachtsector is in beweging. De behoefte aan transparantie,
              duidelijke afspraken en professionele samenwerking groeit – zowel voor
              zelfstandige brandwachten als voor opdrachtgevers. ProBrandwacht
              brengt deze belangen bij elkaar en maakt de sector stap voor stap
              toekomstbestendiger.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-14 space-y-6">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Waarom belangenbehartiging nodig is
          </h2>

          <p className="text-sm leading-relaxed text-slate-200 md:text-base max-w-3xl">
            Zelfstandige brandwachten leveren cruciale bijdragen op evenementen,
            industriële locaties, bouwplaatsen en in openbare ruimtes. Toch is de
            manier waarop deze professionals samenwerken met opdrachtgevers niet
            altijd helder geregeld. Dat is geen onwil, maar vaak een gevolg van
            wisselende werkwijzen, verschillende verwachtingen en onduidelijke
            contractvormen.
          </p>

          <p className="text-sm leading-relaxed text-slate-200 md:text-base max-w-3xl">
            ProBrandwacht zet in op duidelijkheid: een sector waarin zelfstandigen{" "}
            <span className="font-semibold text-emerald-300">eigen regie</span> houden en
            opdrachtgevers kunnen rekenen op{" "}
            <span className="font-semibold text-emerald-300">professionele samenwerking</span>.
          </p>
        </div>
      </section>

      {/* BELANGENBLOKKEN */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="text-2xl font-semibold mb-6 md:text-3xl">
            De kernbelangen van de zelfstandige brandwacht
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-emerald-300">
                1. Eerlijke en transparante afspraken
              </h3>
              <p className="text-sm text-slate-200">
                Duidelijke tarieven, heldere verantwoordelijkheden en afspraken die
                passen bij zelfstandig ondernemerschap. Geen grijze gebieden, maar
                goed uitgewerkte werkrelaties.
              </p>
            </div>

            {/* 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-sky-300">
                2. Eigen regie over tarief, agenda en voorwaarden
              </h3>
              <p className="text-sm text-slate-200">
                Als zelfstandige brandwacht bepaal je zélf hoe je werkt. Het model van
                ProBrandwacht versterkt jouw autonomie: je kiest zelf opdrachten,
                voorwaarden en samenwerkingen.
              </p>
            </div>

            {/* 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-violet-300">
                3. Werkbare DBA-proof samenwerking
              </h3>
              <p className="text-sm text-slate-200">
                De sector heeft behoefte aan duidelijke kaders die voldoen aan de
                Wet DBA. ProBrandwacht ondersteunt zelfstandigen en opdrachtgevers
                bij het maken van uitlegbare, professionele afspraken.
              </p>
            </div>

            {/* 4 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-orange-300">
                4. Waardering voor vakmanschap en ervaring
              </h3>
              <p className="text-sm text-slate-200">
                Brandveiligheid draait om expertise. Door profielen zichtbaar te
                maken en specialisaties te benadrukken, krijgt vakmanschap de plek
                die het verdient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAT PROBRANDWACHT DOET */}
      <section className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-6">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Wat ProBrandwacht concreet bijdraagt
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-2">
              <h3 className="text-sm font-semibold text-emerald-300">
                Toegang tot transparante samenwerking
              </h3>
              <p className="text-sm text-slate-200">
                Geen tussenlagen, maar directe samenwerking tussen zelfstandige
                brandwachten en opdrachtgevers. Het platform biedt een helder kader
                voor professionele afspraken.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-2">
              <h3 className="text-sm font-semibold text-sky-300">
                Sterke positie binnen een groeiende sector
              </h3>
              <p className="text-sm text-slate-200">
                Door de rol van zelfstandige professionals zichtbaar en uitlegbaar
                te maken, ontstaat een duurzaam model waarin vakmanschap centraal
                staat.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-2">
              <h3 className="text-sm font-semibold text-violet-300">
                Praktische kennis & heldere richtlijnen
              </h3>
              <p className="text-sm text-slate-200">
                Van contractuitleg tot tariefstructuren en wetgeving: ProBrandwacht
                biedt toegankelijke informatie die zelfstandigen helpt professioneel
                te ondernemen.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-2">
              <h3 className="text-sm font-semibold text-orange-300">
                Fundament voor ProSafetyMatch
              </h3>
              <p className="text-sm text-slate-200">
                De inzichten uit de brandwachtsector vormen de basis voor
                ProSafetyMatch: een breder platform voor safety-professionals in
                Nederland. Door nu aan te sluiten bouw je mee aan die toekomst.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SLOT / CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Samen bouwen aan een gezonde, professionele sector
            </h2>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              De brandwachtsector verandert snel. Door belangen van zelfstandigen en
              opdrachtgevers naast elkaar te plaatsen en te streven naar een helder,
              toekomstbestendig model, versterken we de kwaliteit van het vak én de
              samenwerking binnen de keten.
            </p>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht staat voor transparantie, vakmanschap en duidelijke
              afspraken — de pijlers voor professionele brandveiligheid in
              Nederland.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
