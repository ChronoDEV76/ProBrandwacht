type DisclaimerContentProps = {
  variant?: 'full' | 'compact'
  className?: string
}

export default function DisclaimerContent({
  variant = 'full',
  className,
}: DisclaimerContentProps) {
  if (variant === 'compact') {
    return (
      <div className={className}>
        <p className="leading-relaxed">
          ProBrandwacht is een onafhankelijk kennis- en platforminitiatief. De informatie biedt context,
          uitleg en praktische aandachtspunten. Juridische, operationele en compliance-keuzes worden
          gemaakt door de betrokken partijen; samenwerking en afspraken gebeuren rechtstreeks tussen hen.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <p className="text-sm leading-relaxed text-slate-200">
        ProBrandwacht is een onafhankelijk kennis- en platforminitiatief voor de brandwachtenmarkt.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        ProBrandwacht is een onafhankelijk kennis- en analyseplatform, geïnformeerd door praktijkervaring
        maar zonder belang bij inzet, tarieven of marktuitkomsten.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        De informatie op dit platform is bedoeld om context, beschrijving en inzicht te geven in de werking van de
        markt, de rol van de brandwacht en de veiligheidskundige kaders waarbinnen brandwacht-inzet
        plaatsvindt. De inhoud is gebaseerd op praktijkervaring, bestaande wet- en regelgeving en
        veiligheidskundige uitgangspunten.
      </p>

      <h2 className="mt-6 text-base font-semibold text-slate-50">Wat ProBrandwacht wel doet</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
        <li>Marktbeschrijving en uitleg bieden</li>
        <li>Veiligheidskundige principes beschrijven</li>
        <li>Spanningen en rolafbakening inzichtelijk maken</li>
        <li>Context geven bij regelgeving, vergunningen en praktijk</li>
      </ul>

      <h2 className="mt-6 text-base font-semibold text-slate-50">Afbakening</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
        <li>ProBrandwacht biedt een neutrale kennislaag naast de praktijk</li>
        <li>Samenwerking ontstaat rechtstreeks tussen opdrachtgever en professional</li>
        <li>Financiële afspraken en keuzes over inzet en planning worden samen gemaakt</li>
        <li>ProBrandwacht is geen werkgever, geen uitzendbureau en geen contractpartij</li>
        <li>Financiële afspraken worden zelf bepaald tussen opdrachtgever en professional</li>
        <li>Uitkomsten blijven contextafhankelijk</li>
        <li>Juridische, operationele en handhavende kaders liggen bij de bevoegde partijen</li>
        <li>Het platform ondersteunt inzicht en onderbouwing, niet de besluitvorming zelf</li>
      </ul>

      <h2 className="mt-6 text-base font-semibold text-slate-50">Rol en verantwoordelijkheid</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">
        Brandveiligheid is in de regel contextafhankelijk en wordt bepaald door:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
        <li>de geldende wet- en regelgeving</li>
        <li>vergunningseisen en veiligheidsplannen</li>
        <li>afspraken tussen opdrachtgever en uitvoerend professional</li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        De uiteindelijke verantwoordelijkheid voor besluitvorming en risicoacceptatie ligt bij de daarvoor
        aangewezen partijen binnen de veiligheidsketen.
      </p>

      <h2 className="mt-6 text-base font-semibold text-slate-50">Afbakening</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">
        De publicaties op ProBrandwacht zijn beschrijvend en reflectief van aard. Ze ondersteunen inzicht en
        afwegingen, zodat professionals en opdrachtgevers beter voorbereid besluiten kunnen nemen in hun
        eigen context.
      </p>
    </div>
  )
}
