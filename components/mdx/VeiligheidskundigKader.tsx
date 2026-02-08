import DisclaimerContent from '@/components/disclaimer-content'

type Variant = 'full' | 'kader' | 'afbakening' | 'compact'

export default function VeiligheidskundigKader({
  compact,
  variant = 'full',
}: {
  compact?: boolean
  variant?: Variant
}) {
  if (compact || variant === 'compact') {
    return (
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200">
        <strong>Afbakening:</strong>
        <div className="mt-2">
          <DisclaimerContent variant="compact" className="text-sm text-slate-200" />
        </div>
      </div>
    )
  }

  const kaderSection = (
    <>
      <p className="mt-2 text-sm leading-relaxed">
        Brandwacht-inzet staat niet op zichzelf. De rol, verantwoordelijkheid en bevoegdheden worden
        bepaald door context, vergunning, risicoanalyse en gemaakte afspraken tussen opdrachtgever en
        uitvoerend professional.
      </p>
      <p className="mt-3 text-sm leading-relaxed">
        Aanwezigheid alleen is geen maatstaf voor veiligheid. Effectieve brandveiligheid vraagt om:
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        <li>duidelijke rolafbakening</li>
        <li>herkenbare bevoegdheden</li>
        <li>escalatielijnen</li>
        <li>aansluiting op het veiligheidsplan en vergunningseisen</li>
      </ul>
    </>
  )

  const afbakeningSection = (
    <>
      <DisclaimerContent />
    </>
  )

  if (variant === 'kader') {
    return <section className="mt-4 text-slate-200">{kaderSection}</section>
  }

  if (variant === 'afbakening') {
    return <section className="mt-4 text-slate-200">{afbakeningSection}</section>
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-slate-200">
      <h2 className="text-lg font-semibold text-slate-50">Veiligheidskundig kader</h2>
      {kaderSection}
      <h3 className="mt-6 text-base font-semibold text-slate-50">Afbakening</h3>
      {afbakeningSection}
    </section>
  )
}
