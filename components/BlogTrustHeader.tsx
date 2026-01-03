import Link from 'next/link'

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
          Artikelen door ProBrandwacht (praktijk-gedreven kennisbank).
        </p>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
          We schrijven vanuit de praktijk: situaties op de vloer, veelgemaakte
          misverstanden, en afspraken die in de regel het verschil maken.
          Voorbeelden zijn indicatief en contextafhankelijk.
        </p>

        <p className="text-xs text-slate-400">Door ProBrandwacht · Kennisbank</p>

        <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Door wie
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Door ProBrandwacht (team) — vakinhoudelijk, operationeel en DBA-bewust
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
          <Link
            href="/opdrachtgevers"
            className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
          >
            Route voor opdrachtgevers
          </Link>
          <Link
            href="/voor-brandwachten"
            className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
          >
            Route voor brandwachten
          </Link>
          <Link
            href="/belangen"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
          >
            Bekijk de kaders
          </Link>
        </div>
      </div>
    </section>
  )
}
