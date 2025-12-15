import type { Metadata } from "next";
import Link from "next/link";

import HeroBackground from "@/components/HeroBackground";
import StructuredBreadcrumbs from "@/components/structured-breadcrumbs";
import { getRouteMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = getRouteMetadata("/voor-brandwachten");

const perks = [
  {
    title: "Jouw tarief = jouw keuze",
    body: "Geen druk, geen sturing. Jij bepaalt jouw tarief en voorwaarden — volledig eerlijk.",
  },
  {
    title: "Jij kiest je opdrachten",
    body: "Geen planning achter de schermen. Jij beslist welke opdrachten bij jouw ervaring en beschikbaarheid passen.",
  },
  {
    title: "Heldere afspraken zonder marges",
    body: "Duidelijke uitleg over hoe de samenwerking werkt, zonder verborgen verdienmodellen of onduidelijke afspraken; jij kunt zien en toetsbaar vastleggen wat normaal is.",
  },
  {
    title: "DBA-proof samenwerking",
    body: "Documenten, werkwijze en communicatie zijn geoptimaliseerd voor zelfstandigheid en uitlegbaarheid richting opdrachtgevers.",
  },
  {
    title: "Toegang tot ProSafetyMatch",
    body: "De digitale laag waarin we eerlijk werken met de informatie die jij kiest en met afspraken die zichtbaar blijven — ontwikkeld samen met zelfstandige professionals.",
  },
  {
    title: "Geen verplichtingen",
    body: "Geen minimumuren, geen exclusiviteit, geen langdurige binding. Jij blijft ondernemer.",
  },
];

const differentiators = [
  {
    title: "We behandelen jou als ondernemer",
    body: "Je bent geen uitvoerder in een keten, maar een zelfstandig professional met expertise en verantwoordelijkheid; jij kiest en legt vast.",
  },
  {
    title: "Heldere afspraken als basis",
    body: "Geen marges in opdracht of tarief. Geen onduidelijkheid — alleen volwassen samenwerking waarin afspraken zichtbaar en toetsbaar blijven.",
  },
  {
    title: "Groeipad voor zelfstandigen",
    body: "Met betere opdrachtgevers, eerlijke tarieven, certificeringsroutes en een netwerk van professionals.",
  },
];

const bridgeSteps = [
  {
    title: "Samen aan tafel",
    body: "Opdrachtgevers zien jouw profiel, certificaten en tariefvoorstel; jij voegt context toe zodat alles duidelijk is en goedgekeurd kan worden.",
  },
  {
    title: "Realtime afstemming",
    body: "Statusupdates, documentatie en bijkomende afspraken leven in één dossier zodat de inzet in de praktijk soepel verloopt en controleerbaar blijft.",
  },
  {
    title: "Zichtbaar vertrouwen",
    body: "Je samenwerking blijft toetsbaar dankzij gedeelde checklists, foto’s en evaluaties die in de platformgeschiedenis blijven en samen verantwoordelijk zijn.",
  },
];

const steps = [
  "Maak je profiel aan",
  "Deel relevante kwalificaties en voorkeuren",
  "Ontvang voorstellen die passen bij jouw vakmanschap",
];

export default function VoorBrandwachtenPage() {
  const breadcrumbItems = [
  { name: "Home", url: "https://www.probrandwacht.nl/" },
  { name: "Voor brandwachten", url: "https://www.probrandwacht.nl/voor-brandwachten" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* HERO */}
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 pb-12 pt-6 text-center md:pb-14 md:pt-8">
          <div className="inline-flex w-fit items-center rounded-full border border-brand-200/40 bg-brand-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-100">
            Voor zelfstandige brandwachten
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Professioneel werken als zelfstandige brandwacht
            </h1>
            <p className="max-w-3xl text-sm text-slate-200 md:text-base">
              ProSafetyMatch wordt gebouwd voor brandwachten die écht zelfstandig willen ondernemen. Geen oude planningsstructuren, maar een
              moderne manier van samenwerken waarin jouw vakmanschap, autonomie en tarief centraal staan.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Meld je gratis aan
            </Link>
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Bekijk de standpunten
            </Link>
          </div>
        </div>
      </HeroBackground>

      {/* CONTENT */}
      <section className="border-b border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-16 md:space-y-12 md:pb-20">
          {/* Wat jij krijgt */}
          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/85 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)] md:p-8">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Wat jij krijgt bij ProBrandwacht
              </p>
              <p className="text-sm text-slate-200 md:text-base">
                Een manier van samenwerken die past bij modern ondernemerschap in de brandveiligheidssector.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {perks.map(item => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.6)]"
                >
                  <p className="text-sm font-semibold text-white">✔ {item.title}</p>
                  <p className="mt-2 text-sm text-slate-200">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Differentiators */}
          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)] md:p-8">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Wat ons anders maakt</p>
              <p className="text-sm text-slate-200 md:text-base">
                Geen keten, geen tussenlaag — maar een platform dat jouw rol als ondernemer versterkt.
              </p>
            </div>

          <div className="grid gap-4 md:grid-cols-3">
            {differentiators.map(item => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.6)]"
              >
                <p className="text-sm font-semibold text-white">🔥 {item.title}</p>
                <p className="mt-2 text-sm text-slate-200">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brug */}
        <section className="border-y border-white/5 bg-slate-900/70">
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Brug tussen zelfstandigen en opdrachtgevers
              </p>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Samen vormgeven aan inzet en kwaliteit
              </h2>
            <p className="text-sm text-slate-200 md:text-base">
              Jij bouwt jouw profiel, deelt certificaten en stelt een tariefvoorstel voor. Opdrachtgevers zien dit, reageren met feedback en bevestigen
              planning, scope en documenten. Duidelijk beschreven afspraken worden gezamenlijk goedgekeurd, zodat iedereen exact weet wat er van
              elkaar verwacht wordt.
            </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {bridgeSteps.map(step => (
                <div key={step.title} className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                  <p className="text-sm text-slate-200">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stappen */}
        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/85 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)] md:p-8">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Aanmelden in 3 stappen</p>
            <p className="mt-4 text-xs text-slate-300">
              Via ProBrandwacht werk je nu al op deze manier, ondersteund door ProSafetyMatch die planning, documentatie en facturatie digitaal bij elkaar brengt. De voorbeelden zijn indicatief en afhankelijk van jouw inzet, beschikbaarheid en risico’s.
            </p>
            <p className="text-sm text-slate-200 md:text-base">
              We werken stap voor stap aan een eerlijke manier van samenwerken: jouw profiel, certificaten en afspraken blijven van jou,
              zonder tussenlagen. Meld je aan om mee te bouwen, direct zichtbaar te zijn en zelf te kiezen welke inzet je vastlegt.
            </p>
          </div>

            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.6)]"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100/15 text-sm font-semibold text-brand-100">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-100">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/zzp/aanmelden"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Meld je gratis aan
              </Link>

              <Link
                href="/belangen"
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Bekijk de standpunten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
