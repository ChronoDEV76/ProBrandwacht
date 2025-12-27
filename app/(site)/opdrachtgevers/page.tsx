// app/(site)/opdrachtgevers/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import SeoStructuredData from "@/components/SeoStructuredData";
import { opdrachtgeverFaq } from "@/lib/seo/commonFaqs";
import { getRouteMetadata } from "@/lib/seo/metadata";
import { SPOED_UI_ENABLED } from "@/lib/featureFlags";

export const metadata: Metadata = getRouteMetadata("/opdrachtgevers");

export default function OpdrachtgeversPage() {
  const showSpoed = SPOED_UI_ENABLED;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={opdrachtgeverFaq.slice(0, 4)} />

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-5">
            <span className="inline-flex w-fit rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
              Voor opdrachtgevers
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Inhuren werkt alleen als rol, tarief en verantwoordelijkheid vooraf helder zijn.
            </h1>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht ondersteunt samenwerking met zelfstandige brandwachten op een uitlegbare manier:
              directe afstemming, duidelijke rolverdeling en afspraken die vooraf kloppen. Geen tussenlaag die
              besluitvorming overneemt — wél structuur die rust geeft in uitvoering en compliance.
            </p>

            <p className="text-xs text-slate-400">
              ProSafetyMatch is in ontwikkeling als technische laag om afspraken, planning en documentatie later digitaal te ondersteunen —
              zonder extra schakels toe te voegen.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Organisatie aanmelden
              </Link>

              <Link
                href="/belangen"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Bekijk de kaders
              </Link>

              {showSpoed && (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Spoed: ProBrandwacht Direct
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WAAR HET VASTLOOPT */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/90">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold md:text-3xl">Waar inhuur vaak misgaat</h2>
              <p className="text-sm leading-relaxed text-slate-200 md:text-base">
                Problemen ontstaan meestal niet door intentie, maar door onduidelijke inrichting: rolafbakening is te vaag,
                tarieven zijn afgeleid en escalatie/rapportage is niet eenduidig vastgelegd.
              </p>
              <p className="text-sm leading-relaxed text-slate-200 md:text-base">
                Dat vergroot risico’s (DBA/aansprakelijkheid) en veroorzaakt discussie achteraf — precies op het moment dat je
                uitvoering nodig hebt.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Gevolg in de praktijk</p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>– Onduidelijke rol en beslislijnen op locatie</li>
                <li>– Discussie over tarief, reistijd en inzet achteraf</li>
                <li>– DBA-risico door feitelijke gezagsverhouding</li>
                <li>– Minder voorspelbare uitvoering bij spoed of wijzigingen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HET MODEL */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Wat ProBrandwacht wél regelt</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-emerald-300">Heldere informatie</h3>
              <p className="mt-2 text-sm text-slate-200">
                Inzicht in certificaten, ervaring en rolprofielen — zodat je weet wie je inzet en waarom dat passend is.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-sky-300">Afspraken vooraf</h3>
              <p className="mt-2 text-sm text-slate-200">
                Tarief, inzet, verantwoordelijkheden en escalatie-afspraken worden vooraf afgestemd en blijven toetsbaar.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-violet-300">DBA-bewust & uitlegbaar</h3>
              <p className="mt-2 text-sm text-slate-200">
                Inrichting die helpt om de samenwerking professioneel en uitlegbaar te houden, zonder extra complexiteit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOE HET LOOPT */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Hoe dit proces eruitziet</h2>

          <ol className="grid gap-6 md:grid-cols-2">
            {[
              { step: "Stap 1", title: "Aanmelden als organisatie", text: "Je registreert en beschrijft context/locaties waar je brandwacht-inzet gebruikt." },
              { step: "Stap 2", title: "Concrete aanvraag", text: "Je beschrijft locatie, risico’s, duur en rolverdeling. Geen vage intake, wel uitvoerbare info." },
              { step: "Stap 3", title: "Direct afstemmen", text: "Je spreekt rechtstreeks met passende zelfstandige professionals over inzet en voorwaarden." },
              { step: "Stap 4", title: "Toetsbaar samenwerken", text: "Afspraken blijven inzichtelijk en zijn later stap voor stap digitaal te ondersteunen via ProSafetyMatch (i.o.)." },
            ].map(({ step, title, text }) => (
              <li key={step} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{step}</div>
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
            <h2 className="text-xl font-semibold md:text-2xl">Rust in uitvoering begint met structuur vooraf</h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Als je inhuur professioneel wilt organiseren, helpt het om rol, tarief en verantwoordelijkheid vooraf te borgen.
              ProBrandwacht is daarvoor ingericht.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Organisatie aanmelden
              </Link>

              <Link
                href="/voor-brandwachten"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Bekijk de route voor brandwachten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
