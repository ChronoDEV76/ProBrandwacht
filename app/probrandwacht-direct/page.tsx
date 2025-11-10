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
  robots: { index: false, follow: false },
}

export default function ProbrandwachtDirectPage() {
  const canonical = 'https://www.probrandwacht.nl/probrandwacht-direct'

  return (
    <main className="mx-auto w-full max-w-3xl space-y-10 px-4 py-10">
      <StructuredBreadcrumbs
        items={[
          { name: 'Home', url: 'https://www.probrandwacht.nl/' },
          { name: 'ProBrandwacht Direct', url: canonical },
        ]}
      />

      {/* HERO – identiek aan spoedstijl */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            ProBrandwacht Direct — geplande inzet
          </h1>

          <p className="mt-3 max-w-2xl text-slate-700">
            <strong>Reguliere aanvragen</strong> lopen via ProBrandwacht Direct. Je aanvraag
            wordt opgevolgd door <strong>Chrono4Solutions</strong>; DBA-proof afspraken,
            gecertificeerde professionals en betrouwbare uitvoering. Liever spoed?
            Ga dan naar{' '}
            <a href="/probrandwacht-direct-spoed" className="underline">
              ProBrandwacht Direct spoed
            </a>
            .
          </p>

          {/* badges/pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Directe opvolging
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              DBA-proof afspraken
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Gecertificeerde professionals
            </span>
          </div>

          {/* mini-uitleg onder de vouw op mobiel – zelfde patroon als spoed */}
          <p className="mt-3 text-xs text-slate-600 sm:text-sm">
            <span className="font-medium">ProBrandwacht Direct</span> = geplande inzet via formulier en snelle opvolging.{' '}
            <span className="font-medium">ProBrandwacht Direct spoed</span> = via Slack, directe matching en bevestiging.
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
