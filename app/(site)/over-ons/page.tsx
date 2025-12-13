// app/(site)/over-ons/page.tsx

import Link from "next/link";

import HeroBackground from "@/components/HeroBackground";
import StructuredBreadcrumbs from "@/components/structured-breadcrumbs";

export default function OverOnsPage() {
  const breadcrumbItems = [
    { name: "Home", url: "https://www.probrandwacht.nl/" },
    { name: "Over ons", url: "https://www.probrandwacht.nl/over-ons" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* HERO */}
      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 pb-14 pt-8">
          <div className="inline-flex w-fit items-center rounded-full border border-brand-300/40 bg-brand-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-100">
            Over ProBrandwacht
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Een moderne manier van samenwerken in brandveiligheid
            </h1>
            <p className="max-w-3xl text-sm text-slate-200 md:text-base">
              De praktijk van brandveiligheid verandert, maar de manier van samenwerken bleef te lang hetzelfde. Wij verbinden zelfstandige
              brandwachten, opdrachtgevers en partners op een transparante, professionele en uitlegbare manier.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Bekijk onze standpunten
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Lees de kennisbank
            </Link>
          </div>
        </div>
      </HeroBackground>

      {/* SECTIE: waarom & aanpak */}
      <section className="border-b border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1.4fr,1fr] md:py-16">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Wij verbeteren de sector samen</p>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Eerlijke opdrachtgevers en zelfstandige professionals vinden elkaar altijd. Niet door elkaar te beconcurreren, maar door
              helderheid over rollen, verantwoordelijkheden en verwachtingen.
            </p>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is geen tegenhanger van bureaus, maar een aanvullende laag: een plek waar zelfstandigheid, vakmanschap en
              transparantie centraal staan. Dat geeft opdrachtgevers én zelfstandigen ruimte om professioneel samen te werken.
            </p>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Zo bouwen we stap voor stap aan een sector waarin afspraken helder zijn, tarieven uitlegbaar zijn en iedereen in zijn eigen rol
              kan excelleren.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.65)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Onze belofte</p>
              <p className="mt-2 text-sm text-slate-200">
                Transparante afspraken zonder verborgen marges, volledige autonomie voor zelfstandige brandwachten en DBA-proof samenwerking
                voor opdrachtgevers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.65)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Volgende stap</p>
              <p className="mt-2 text-sm text-slate-200">
                Fundament voor ProSafetyMatch: dezelfde principes, digitaal ondersteund met planning, documentatie en facturatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSIE & VISIE */}
      <section className="border-b border-slate-900/60 bg-slate-950">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Onze missie</p>
            <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">Transparant samenwerken mogelijk maken</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Een moderne, uitlegbare manier van samenwerken waarin zelfstandigen, opdrachtgevers en partners helder omgaan met afspraken,
              tarieven en verantwoordelijkheden.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.65)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Onze visie</p>
            <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">Vakmanschap centraal, systemen ondersteunend</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              ProBrandwacht wordt de standaard voor transparante inzet van zelfstandige brandwachten in Nederland en vormt het fundament voor
              het bredere safety-platform ProSafetyMatch.
            </p>
          </div>
        </div>
      </section>

      {/* WAAROM PROBRANDWACHT */}
      <section className="bg-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-12 md:py-16">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Waarom ProBrandwacht?</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Eén lijn in alles wat we bouwen</h2>
            <p className="max-w-3xl text-sm text-slate-200 md:text-base">
              Alles wat je ziet — van spoedaanvraag tot kennisbank — is gebouwd vanuit dezelfde gedachte: we verbeteren de sector samen, stap
              voor stap.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Transparante afspraken zonder verborgen marges",
              "Volledige autonomie voor zelfstandige brandwachten",
              "DBA-proof samenwerking voor opdrachtgevers",
              "Geschikt voor bureaus die modern willen meebewegen",
              "Fundament voor de volgende stap: ProSafetyMatch",
              "Respect voor vakmanschap en duidelijke rollen",
            ].map(item => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.6)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
