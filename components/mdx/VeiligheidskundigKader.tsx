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
        <strong>Afbakening:</strong> Deze publicatie duidt veiligheidskundige kaders en vervangt geen
        afspraken, vergunningseisen of verantwoordelijkheden op locatie.
      </div>
    )
  }

  const kaderSection = (
    <>
      <p className="mt-2 text-sm leading-relaxed">
        Brandwacht-inzet staat nooit op zichzelf. De rol, verantwoordelijkheid en bevoegdheden worden
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
      <p className="mt-2 text-sm leading-relaxed">
        Deze publicatie biedt <strong>duiding en context</strong> op basis van wet- en regelgeving,
        praktijkervaring en veiligheidskundige uitgangspunten.
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        Dit platform beschrijft de markt vanuit praktijkervaring en bestaande wet- en regelgeving, niet vanuit
        een toezichthoudend of handhavend perspectief.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        <li>ProBrandwacht is geen bureau</li>
        <li>ProBrandwacht is geen werkgever</li>
        <li>ProBrandwacht is geen contractpartij</li>
        <li>ProBrandwacht stuurt niet op inzet, tarief of uitkomst</li>
        <li>ProBrandwacht biedt geen garantie of nalevingsinstrument</li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed">
        Bevoegdheden, aanwijzingen en handhaving liggen in de regel bij opdrachtgever, vergunningverlener en
        toezichthouder — nooit bij dit platform.
      </p>
      <p className="mt-3 text-sm leading-relaxed">
        De uiteindelijke verantwoordelijkheid ligt in de regel bij de betrokken partijen binnen de feitelijke
        uitvoering en afspraken op locatie.
      </p>
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
