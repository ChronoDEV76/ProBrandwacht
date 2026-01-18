// app/(site)/voor-brandwachten/page.tsx
import type { Metadata } from "next";

import HeroBackground from "@/components/HeroBackground";
import { Cta } from "@/components/Cta";
import SeoStructuredData from "@/components/SeoStructuredData";
import StructuredBreadcrumbs from "@/components/structured-breadcrumbs";
import { generalPlatformFaq } from "@/lib/seo/commonFaqs";
import { getRouteMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = getRouteMetadata("/voor-brandwachten");

export default function VoorBrandwachtenPage() {
  const breadcrumbItems = [
    { name: "Home", url: "https://www.probrandwacht.nl/" },
    { name: "Voor brandwachten", url: "https://www.probrandwacht.nl/voor-brandwachten" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 4)} />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Voor brandwachten • Professionaliteit & uitvoerbaarheid
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            Werk als professional,
            <br />
            <span className="text-emerald-300">niet als sluitstuk.</span>
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht is geen urenfabriek. Wij brengen je alleen in opdrachten waar jouw rol helder is,
            waar je professioneel kunt handelen en waar afspraken ook echt uitvoerbaar zijn in de praktijk.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Cta id="tertiary_contact_exploratory" />
            <Cta
              id="secondary_why_no"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5"
            />
          </div>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-12 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Wat jij van ons mag verwachten</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
              <li>
                <strong>Vooraf duidelijkheid</strong> over rol, verantwoordelijkheden en verwachtingen.
              </li>
              <li>
                <strong>Opdrachten die kloppen</strong> in de praktijk (niet alleen op papier).
              </li>
              <li>
                <strong>Professionele ruimte</strong>: kritisch meedenken hoort bij het vak.
              </li>
              <li>
                <strong>Geen eenzijdige afwenteling</strong> van risico&apos;s op jou als uitvoerder.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Waar wij op selecteren</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Wij toetsen niet alleen &quot;mag het&quot;, maar vooral: <strong>werkt het</strong>? In de praktijk.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Rolzuiverheid</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Is de rol van brandwacht expliciet? Is er geen grijs gebied met andere taken of aannames?
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Uitvoerbaarheid</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Kun je doen wat er gevraagd wordt, zonder te moeten improviseren tegen het papier in?
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Professionele ruimte</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Wordt jouw vakmanschap gebruikt - of alleen jouw aanwezigheid?
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Risico in balans</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Ligt het risico daar waar het beinvloedbaar is? Of wordt het eenzijdig doorgeschoven?
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Waarom wij soms nee zeggen (ook voor jou)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Soms is een opdracht formeel mogelijk, maar praktisch onhoudbaar. Dan zeggen we nee. Niet uit
              gemak, maar omdat een onuitvoerbare opdracht jou in de praktijk klem zet.
            </p>
            <div className="mt-5">
              <Cta id="secondary_how_we_work" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Past dit bij jou?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Als jij veiligheid inhoudelijk benadert en verantwoordelijkheid serieus neemt, dan past
              onze werkwijze waarschijnlijk goed. Liever eerst aftasten dan overtuigen.
            </p>
            <p className="mt-3 text-sm text-slate-200">
              Geen inschrijving en geen verplichtingen - wel een verkennende intake.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Cta id="brandwacht_interest_waitlist" />
              <Cta id="tertiary_contact_exploratory" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
