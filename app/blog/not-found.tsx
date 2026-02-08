import { Cta } from '@/components/Cta'

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
            De snelste route terug: terug naar het overzicht en een artikel kiezen dat direct helpt in de praktijk.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Cta id="secondary_blog_index" />
            <Cta id="brandwacht_interest_waitlist" className="rounded-2xl px-5 py-2.5" />
            <Cta id="opdrachtgever_explore" className="rounded-2xl px-5 py-2.5" />
          </div>
        </div>
      </section>
    </main>
  )
}
