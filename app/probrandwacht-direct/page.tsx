import ProbrandwachtDirectForm from '@/components/probrandwacht-direct-form'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Directe inzet aanvragen | ProBrandwacht',
  description:
    'Snel gecertificeerde brandwachten via Chrono4Solutions. Vul je project in en we nemen direct contact op.',
  keywords: [
    'brandwacht',
    'brandwacht inhuren',
    'brandwacht huren',
    'DBA-proof brandwacht',
    'brandwacht tarieven',
  ],
  robots: { index: true, follow: true },
}

export default function ProbrandwachtDirectPage() {
  const canonical = 'https://www.probrandwacht.nl/probrandwacht-direct'

  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10 sm:space-y-12 sm:px-6">
      <StructuredBreadcrumbs
        items={[
          { name: 'Home', url: 'https://www.probrandwacht.nl/' },
          { name: 'ProBrandwacht Direct', url: canonical },
        ]}
      />

      {/* HERO – identiek aan spoedstijl */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:p-8 md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            ProBrandwacht Direct — geplande inzet
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">
            <strong>Reguliere aanvragen</strong> lopen via ProBrandwacht Direct. Je aanvraag wordt opgevolgd
            door de beschikbare poule van <strong>ProBrandwacht</strong>; duidelijke afspraken,
            gecertificeerde professionals en betrouwbare uitvoering.
          </p>

          {/* mini-uitleg onder de vouw op mobiel – zelfde patroon als spoed */}
          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            <span className="font-medium">ProBrandwacht Direct</span> = geplande inzet en snelle opvolging.
          </p>
        </div>

        {/* decoratief accent (zelfde als spoed) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-brand-100 blur-2xl sm:block"
        />
      </section>

      {/* FORMULIER */}
      <ProbrandwachtDirectForm />
    </main>
  )
}
