import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "ProBrandwacht — Slimmer werken. Eerlijk verdienen. Samen vooruit.",
  description:
    'Bereken jouw echte waarde als professional. Eerlijke tarieven zonder strijkstok. Samen bouwen we aan een gezonde veiligheidsmarkt.',
  keywords: [
    'brandwacht',
    'brandwacht inhuren',
    'brandwacht huren',
    'DBA-proof brandwacht',
    'brandwacht tarieven',
  ],
};

// Dynamische client import
const LeadCalculator = dynamic(() => import("@/components/lead-calculator"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-4xl rounded-xl bg-slate-100 p-10 text-center text-slate-400">
      Laden...
    </div>
  ),
});

export default function HomePage() {
  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-brand-50 via-white to-white text-slate-900">
      <div className="mx-auto max-w-4xl space-y-12 px-4 pb-20 pt-16 sm:px-6 md:px-8">
        {/* HERO */}
        <section className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-[13px] font-medium text-emerald-700">
            Geen bureau. Geen marge. Wel regie.
          </div>
          <h1 id="bereken" data-anchor-injected className="text-3xl font-bold sm:text-4xl">
            Slimmer samenwerken.
          </h1>
{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/chrono-direct" className="underline">Chrono Direct</a>.
</div>
{/* SEO-UPGRADE END */}
          <p className="mx-auto max-w-2xl text-slate-700">
            Prosafetymatch verbindt professionals en opdrachtgevers via eerlijke tarieven en directe samenwerking. Minder ruis, meer waarde, en afspraken die standhouden.
          </p>
        </section>

        {/* LEAD CALCULATOR */}
        <LeadCalculator />

        {/* WHY */}
        <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Waarom dit werkt
          </h2>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Professionals</p>
              <p>Eerlijk tarief, directe afspraken, meer waardering.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Opdrachtgevers</p>
              <p>Meer kwaliteit, minder verloop, helder tarief.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Veiligheid</p>
              <p>Stabiel, betrouwbaar en aantoonbaar beter.</p>
            </div>
          </div>
          <p className="text-center text-sm text-slate-600 pt-3 border-t border-slate-200">
            Samen maken we de veiligheidssector gezonder. Vandaag eerlijk, morgen sterker.
          </p>
        </section>
      </div>
    </main>
  );
}
