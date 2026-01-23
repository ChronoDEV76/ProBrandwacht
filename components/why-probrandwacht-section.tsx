export default function WhyProbrandwachtSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-8 max-w-3xl space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Duiding voor zelfstandige samenwerking
          </h2>
          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            Veel brandwachten kennen onduidelijke ketens met te veel schakels. ProBrandwacht
            werkt anders: we zijn een <span className="font-semibold text-emerald-300">onafhankelijk initiatief</span>
            dat rolverdeling en afspraken uitlegbaar maakt.
          </p>
          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            Geen prijssturing. Geen verkapte loondienst. Wel duidelijke kaders voor professionals en
            opdrachtgevers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-sm font-semibold text-emerald-300">Jij houdt de regie</h3>
            <p className="text-sm text-slate-200">
              Je houdt zelf regie over keuzes en beschikbaarheid. Geen planning die over jouw agenda beslist.
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-sm font-semibold text-slate-300">
              Duidelijke afstemming
            </h3>
            <p className="text-sm text-slate-200">
              We laten zien hoe afspraken over scope, communicatie en resultaat helder beschreven kunnen
              worden, zodat verwachtingen gelijk zijn.
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-sm font-semibold text-sky-300">Heldere afspraken</h3>
            <p className="text-sm text-slate-200">
              Rolverdeling en verantwoordelijkheden blijven helder en uitlegbaar. Dat is beter voor de
              zelfstandige brandwacht, de opdrachtgever en de kwaliteit van de brandveiligheid.
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-sm font-semibold text-violet-300">Geen tussenlaag</h3>
            <p className="text-sm text-slate-200">
              ProBrandwacht is geen bemiddelaar en geen werkgever. Afspraken worden 1-op-1 gemaakt en
              blijven volledig bij de betrokken partijen.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
