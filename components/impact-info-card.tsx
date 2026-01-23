export default function ImpactInfoCard() {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start gap-3">
        <div aria-hidden className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-blue-700">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l7 3v6c0 5-3.4 9.7-7 11-3.6-1.3-7-6-7-11V5l7-3zM7.5 11.5l2.8 2.8 6.2-6.2 1.2 1.2-7.4 7.4-4-4 1.2-1.2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Waarom duidelijke afspraken er echt toe doen
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            Deze toelichting laat zien wat zelfstandige inzet vraagt in verantwoordelijkheden, communicatie en
            documentatie. Zo blijft samenwerking uitvoerbaar en toetsbaar in de praktijk.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Wat we niet doen</div>
          <p className="mt-1 text-sm text-slate-700">
            ProBrandwacht is geen bemiddelaar en stuurt niet op uitkomsten. We duiden alleen wat nodig is voor
            uitlegbare samenwerking.
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Wat wél helpt</div>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
            <li>Heldere rolverdeling en verantwoordelijkheden.</li>
            <li>Toetsbare afspraken over uitvoering en communicatie.</li>
            <li>Documentatie die controle en overdracht ondersteunt.</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Doel van deze toelichting is inzicht bieden. Duidelijke afspraken zorgen voor gemotiveerde en bekwaam inzetbare
        professionals — en daarmee voor een veiligere werkomgeving.
      </p>
    </div>
  )
}
