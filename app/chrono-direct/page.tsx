import ChronoDirectForm from '@/components/chrono-direct-form'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Directe inzet aanvragen | ProBrandwacht',
  description:
    'Snel gecertificeerde brandwachten via Chrono4Solutions. Vul je project in en we nemen direct contact op.',
  robots: { index: false, follow: false },
}

export default function ChronoDirectPage() {
  const canonical = 'https://www.probrandwacht.nl/chrono-direct'

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 space-y-10">
      <StructuredBreadcrumbs
        items={[
          { name: 'Home', url: 'https://www.probrandwacht.nl/' },
          { name: 'Chrono Direct', url: canonical },
        ]}
      />

      {/* HERO */}
      <section className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold tracking-tight">Directe inzet aanvragen</h1>
        <p className="mt-2 text-slate-700">
          <strong>Chrono Direct</strong> verzorgt directe inzetaanvragen voor brandwachten.
          De uitvoering verloopt via <strong>Chrono4Solutions</strong>, waar
          <strong> ProBrandwacht.nl</strong> en <strong>ProSafetyMatch</strong> onderdeel van zijn.
        </p>

        {/* badges */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Transparante tarieven
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            DBA-proof samenwerking
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            24/7 inzet bij spoed
          </span>
        </div>
      </section>

      {/* MERKEN */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Zo werken de drie merken samen</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-brand-700">ProBrandwacht.nl</h3>
            <p className="mt-1 text-sm text-slate-600">
              Neutrale voorlichtingssite voor opdrachtgevers en professionals, zonder commerciële druk.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-brand-700">ProSafetyMatch</h3>
            <p className="mt-1 text-sm text-slate-600">
              In ontwikkeling: een platform dat de markt verbetert en toekomstbestendig maakt.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-brand-700">Chrono4Solutions</h3>
            <p className="mt-1 text-sm text-slate-600">
              Verzorgt directe inzet en coördinatie bij aanvragen — jouw aanspreekpunt voor snelle en betrouwbare uitvoering.
            </p>
          </div>
        </div>
      </section>

      {/* FORMULIER */}
      <ChronoDirectForm />
    </main>
  )
}

