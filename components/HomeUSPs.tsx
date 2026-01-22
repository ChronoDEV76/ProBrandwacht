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
              Zichtbaarheid voor zzp-brandwachten, rechtstreeks contact met opdrachtgevers en
              praktische DBA-handvatten. Heldere, toetsbare afspraken en zichtbare tariefopbouw.
            </p>
          </article>

          {/* Straks */}
          <article className="min-w-[260px] flex-1 rounded-3xl border border-white/12 bg-slate-950/60 p-4 text-[#E5ECFF] shadow-lg backdrop-blur transition hover:bg-slate-900/70 md:min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E5ECFF]">
              Straks
            </p>
            <h2 className="mt-1 text-sm font-semibold">ProSafetyMatch</h2>
            <p className="mt-1 text-xs leading-relaxed text-[#E5ECFF]">
              Digitale omgeving (streefdatum Q1 2026) die afspraken, planning en
              documentatie ondersteunt — werken binnen Wet DBA, eerlijk en zonder marge op
              de vergoeding van de professional. Transparante platformkosten (alleen waar
              van toepassing).
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
              Voor professionals die bewust kiezen voor autonomie, duidelijke
              afspraken en verantwoordelijkheid in de uitvoering — DBA-bewust en
              transparant over kosten.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#E5ECFF]">
              ProBrandwacht is geen uitzendbureau en geen werkgever. Het platform
              verbindt opdrachtgevers met zelfstandig professionals die opereren
              vanuit hun eigen ondernemerschap.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
