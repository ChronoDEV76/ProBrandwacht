import clsx from "clsx"

type HomeUSPsProps = {
  className?: string
}

export default function HomeUSPs({ className }: HomeUSPsProps) {
  return (
    <section className={clsx("relative px-4", className)}>
      <div className="mx-auto max-w-5xl">
        {/* Mobiel: horizontale scroll, Desktop: grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 md:grid md:grid-cols-3 md:overflow-visible md:pt-0">
          {/* Vandaag */}
          <article className="min-w-[260px] flex-1 rounded-3xl border border-white/12 bg-slate-950/60 p-4 text-[#E5ECFF] shadow-lg backdrop-blur transition hover:bg-slate-900/70 md:min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E5ECFF]">
              Vandaag
            </p>
            <h2 className="mt-1 text-sm font-semibold">1-op-1 samenwerken</h2>
            <p className="mt-1 text-xs leading-relaxed text-[#E5ECFF]">
              Praktische uitleg voor zzp-brandwachten en opdrachtgevers met DBA-handvatten.
              Heldere, toetsbare afspraken en duidelijke rolverdeling.
            </p>
          </article>

          {/* Kaders */}
          <article className="min-w-[260px] flex-1 rounded-3xl border border-white/12 bg-slate-950/60 p-4 text-[#E5ECFF] shadow-lg backdrop-blur transition hover:bg-slate-900/70 md:min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E5ECFF]">
              Kaders
            </p>
            <h2 className="mt-1 text-sm font-semibold">Uitlegbare samenwerking</h2>
            <p className="mt-1 text-xs leading-relaxed text-[#E5ECFF]">
              Inzicht in verantwoordelijkheid, communicatie en uitvoering. Zo blijft de samenwerking
              zelfstandig, toetsbaar en duidelijk voor iedereen.
            </p>
          </article>

          {/* Voor wie */}
          <article className="min-w-[260px] flex-1 rounded-3xl border border-white/12 bg-slate-950/60 p-4 text-[#E5ECFF] shadow-lg backdrop-blur transition hover:bg-slate-900/70 md:min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E5ECFF]">
              Voor wie
            </p>
            <h2 className="mt-1 text-sm font-semibold">
              Brandwachten &amp; opdrachtgevers
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#E5ECFF]">
              Voor professionals die bewust kiezen voor autonomie, duidelijke afspraken en
              verantwoordelijkheid in de uitvoering — DBA-bewust en uitlegbaar.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#E5ECFF]">
              ProBrandwacht biedt context en kaders; afspraken worden 1-op-1 gemaakt tussen opdrachtgever
              en zelfstandig professional.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
