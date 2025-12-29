import Link from 'next/link'

export default function BlogNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="max-w-2xl space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <span className="inline-flex w-fit rounded-full border border-orange-300/30 bg-orange-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-200">
            Niet gevonden
          </span>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Dit artikel bestaat niet (meer).
          </h1>

          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            De snelste route terug: ga naar het overzicht en kies een artikel dat je direct helpt in de praktijk.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Terug naar kennisbank
            </Link>
            <Link
              href="/voor-brandwachten"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Route voor brandwachten
            </Link>
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Route voor opdrachtgevers
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
