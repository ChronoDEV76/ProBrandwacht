export default function WhyProBrandwachtSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-8 max-w-3xl space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Geen klassiek bureau, maar een onafhankelijk platform
          </h2>
          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            Veel brandwachten kennen het klassieke model: diensten worden voor je doorgestuurd,
            er wordt namens jou onderhandeld en er verdwijnt marge in de keten. ProBrandwacht werkt
            anders. Wij zijn geen klassieke capaciteitsleverancier, maar een{' '}
            <span className="font-semibold text-emerald-300">onafhankelijk platform</span>{' '}
            voor zelfstandige professionals.
          </p>
        </div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-emerald-300">
                Jij houdt de regie
              </h3>
              <p className="text-sm text-slate-200">
              Je kiest zelf welke opdrachten je aanneemt, welk tarief je hanteert en
              met wie je samenwerkt. Geen planning die over jouw agenda beslist.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-slate-300">
                Brug tussen opdrachtgevers en zzp’ers
              </h3>
              <p className="text-sm text-slate-200">
                Het platform houdt gesprekken, planning en resultaten gedeeld en gezamenlijk goedgekeurd zodat beide partijen dezelfde geschiedenis zien
                en samen verantwoordelijk blijven.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-sm font-semibold text-sky-300">
              Heldere afspraken
            </h3>
            <p className="text-sm text-slate-200">
              Tarieven, rolverdeling en verantwoordelijkheden zijn helder en toetsbaar. Dat is
              beter voor de zelfstandige brandwacht, de opdrachtgever en de kwaliteit van de
              brandveiligheid.
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-sm font-semibold text-violet-300">
              Geen marge op jouw uurtarief
            </h3>
            <p className="text-sm text-slate-200">
              We bouwen aan een model waarin de zelfstandige professional eerlijk
              wordt beloond. Geen onzichtbare opslagen op jouw uurtarief.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
