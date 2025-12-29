type PlatformPricingNoteProps = {
  /**
   * compact = korte éénregelige variant (voor onderaan blokken / in FAQ)
   * default (compact = false) = volledig blok met titel + bullets + disclaimer
   */
  compact?: boolean
}

export default function PlatformPricingNote({ compact }: PlatformPricingNoteProps) {
  if (compact) {
    return (
      <p className="text-xs text-slate-500">
        Het toekomstige platformmodel van ProSafetyMatch (verwacht Q1 2026) gaat uit van{' '}
        <span className="font-semibold">10% platformfee</span> en{' '}
        <span className="font-semibold">1–2% optionele escrowkosten</span>. Geen marge op uurtarieven;
        afspraken over tarief maak je in de regel rechtstreeks tussen opdrachtgever en zzp’er.
      </p>
    )
  }

  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      <h3 className="text-sm font-semibold text-slate-900">Toekomstig prijsmodel ProSafetyMatch (in ontwikkeling)</h3>
      <p className="mt-2">
        ProSafetyMatch zet in op eerlijke tarieven zonder marge op het uurtarief van brandwachten. Het geplande platformmodel (verwacht
        Q1 2026) is bewust zo eenvoudig mogelijk gehouden:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>
          <span className="font-semibold">10% platformfee</span> voor het gebruik van het platform en de tooling.
        </li>
        <li>
          <span className="font-semibold">1–2% escrowkosten</span> wanneer jullie kiezen voor vooraf geborgde betaling.
        </li>
        <li>
          <span className="font-semibold">Geen marge op uurtarieven</span> en geen directe platform-match: tarief, rol en planning spreek je
          rechtstreeks af tussen opdrachtgever en zzp’er.
        </li>
      </ul>
      <p className="mt-2 text-sm text-slate-700">
        Platformfee en escrowkosten blijven zichtbaar voor zowel opdrachtgever als zzp’er, zodat jullie gezamenlijk beoordelen of de kosten passen bij de inzet en de afspraken die jullie samen verantwoordelijk maken.
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Functionaliteit en planning kunnen wijzigen op basis van feedback, wetgeving en praktijkervaring. Zie dit als richting, geen
        harde productbelofte.
      </p>
    </section>
  )
}
