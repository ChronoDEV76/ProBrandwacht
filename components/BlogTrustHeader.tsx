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
    <section className="border-b border-slate-800 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_55%)]">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200">
          Duiding & context
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
          Rol, mandaat en uitvoering
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
          Dit is kaderende analyse: het gaat over systeemprikkels en rolzuiverheid, met focus op begrip,
          werkbaarheid en verantwoordelijkheid.
        </p>

        <p className="mt-4 text-xs text-slate-400">
          Laatst bijgewerkt: {formatDate(lastUpdatedISO)} · veiligheidskundige context
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Cta id="secondary_kader_overview" className="rounded-full px-4 py-2" />
          <Cta id="secondary_afbakening" className="rounded-full px-4 py-2" />
          <Cta id="secondary_checklist_info" className="rounded-full px-4 py-2 border-slate-600 text-slate-100" />
        </div>
      </div>
    </section>
  )
}
