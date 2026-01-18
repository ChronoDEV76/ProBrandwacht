import { Cta } from '@/components/Cta'

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })
  } catch {
    return d
  }
}

export default function BlogTrustHeader({
  lastUpdatedISO,
}: {
  lastUpdatedISO?: string
}) {
  return (
    <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
          Kennisbank
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Blog: brandwacht-inzet, DBA-bewust samenwerken en praktische afspraken
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          Praktijk-gedreven kennisbank voor brandwachten en opdrachtgevers.
        </p>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
          We schrijven vanuit de praktijk: situaties op de vloer, veelgemaakte
          misverstanden, en afspraken die in de regel het verschil maken.
        </p>

        <p className="text-xs text-slate-400">Kennisbank · praktijknotities</p>

        <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Door wie
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Redactie & praktijkteam — vakinhoudelijk, operationeel en DBA-bewust
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Waarom
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Omdat vertrouwen niet uit beloftes komt, maar uit toetsbare
              afspraken en gedrag.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Laatst bijgewerkt
            </p>
            <p className="mt-2 text-sm text-slate-200">
              {formatDate(lastUpdatedISO)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Cta id="brandwacht_interest_waitlist" className="rounded-full px-4 py-2" />
          <Cta id="secondary_why_no" className="rounded-full px-4 py-2" />
          <Cta id="about_kaders_intentie" className="rounded-full px-4 py-2 border-slate-600 text-slate-100" />
        </div>
      </div>
    </section>
  )
}
