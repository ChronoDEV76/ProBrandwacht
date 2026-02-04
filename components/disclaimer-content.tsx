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
          ProBrandwacht is een onafhankelijk kennis- en platforminitiatief. De informatie is bedoeld voor
          context en duiding en is geen juridisch, operationeel of compliance-advies. We bemiddelen niet,
          sturen niet op inzet of tarief en geven geen garanties.
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
        De informatie op dit platform is bedoeld om context, duiding en inzicht te geven in de werking van de
        markt, de rol van de brandwacht en de veiligheidskundige kaders waarbinnen brandwacht-inzet
        plaatsvindt. De inhoud is gebaseerd op praktijkervaring, bestaande wet- en regelgeving en
        veiligheidskundige uitgangspunten.
      </p>

      <h2 className="mt-6 text-base font-semibold text-slate-50">Wat ProBrandwacht wel doet</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
        <li>Marktduiding en uitleg bieden</li>
        <li>Veiligheidskundige principes beschrijven</li>
        <li>Spanningen en rolafbakening inzichtelijk maken</li>
        <li>Context geven bij regelgeving, vergunningen en praktijk</li>
      </ul>

      <h2 className="mt-6 text-base font-semibold text-slate-50">Wat ProBrandwacht niet doet</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
        <li>Geen bureau, geen werkgever, geen contractpartij</li>
        <li>Geen bemiddeling of matching van professionals</li>
        <li>Geen sturing op inzet, tarief, planning of uitkomst</li>
        <li>Geen garanties over beschikbaarheid, veiligheid of naleving</li>
        <li>Geen juridisch, operationeel of handhavend advies</li>
        <li>Geen compliance- of nalevingsoplossing aanbieden</li>
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
        De publicaties op ProBrandwacht zijn beschrijvend en reflectief van aard. Ze zijn niet bedoeld als
        vervanging van professioneel advies, instructies of formele besluitvorming, en kunnen niet worden
        opgevat als bindend of richtinggevend voor concrete situaties.
      </p>
    </div>
  )
}
