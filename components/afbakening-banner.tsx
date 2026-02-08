import Link from 'next/link'

export default function AfbakeningBanner({ className }: { className?: string }) {
  return (
    <section className={['mx-auto w-full max-w-5xl px-4', className].filter(Boolean).join(' ')}>
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-200 shadow-[0_18px_45px_-20px_rgba(15,23,42,0.6)]">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
          Afbakening
          <span className="rounded-full border border-amber-200/30 px-2 py-0.5 text-[10px] text-amber-100/90">
            informatieve context
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">
          Dit platform biedt context bij rol, mandaat en afspraken. Afspraken worden 1-op-1 gemaakt tussen
          opdrachtgever en professional, binnen hun eigen juridische en organisatorische kaders.
        </p>
        <details className="group mt-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
          <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
            Lees de afbakening
          </summary>
          <div className="mt-3 space-y-2 text-xs text-slate-300">
            <ul className="list-disc space-y-1 pl-4">
              <li>Samenwerking gebeurt rechtstreeks, met eigen tarief- en inzetafspraken.</li>
              <li>Deze beschrijving ondersteunt inzicht en rolhelderheid, zodat besluitvorming beter voorbereid is.</li>
              <li>Rolafbakening en keuzes worden gemaakt door opdrachtgever en professional.</li>
            </ul>
            <Link href="/waarom-wij-soms-nee-zeggen" className="text-amber-200 underline underline-offset-4">
              Lees de volledige afbakening
            </Link>
          </div>
        </details>
        <p className="mt-3 text-xs text-slate-400">
          Compacte afbakening: context en uitleg naast de praktijk.
        </p>
      </div>
    </section>
  )
}
