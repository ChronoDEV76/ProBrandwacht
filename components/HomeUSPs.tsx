import clsx from "clsx"

type HomeUSPsProps = {
  className?: string
}

export default function HomeUSPs({ className }: HomeUSPsProps) {
  return (
    <section
      className={clsx(
        "relative px-4",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl">
        {/* Mobiel: horizontale scroll, Desktop: grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {/* Vandaag */}
          <article className="min-w-[260px] flex-1 rounded-3xl bg-slate-950/60 p-4 text-slate-50 shadow-lg backdrop-blur transition hover:bg-slate-900/70 md:min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Vandaag
            </p>
            <h2 className="mt-1 text-sm font-semibold">Directer samenwerken</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-200">
              Zichtbaarheid voor zzp-brandwachten, direct contact met opdrachtgevers en
              praktische DBA-handvatten. Geen bemiddelingsbureau, geen verborgen marge.
            </p>
          </article>

          {/* Morgen */}
          <article className="min-w-[260px] flex-1 rounded-3xl bg-slate-950/60 p-4 text-slate-50 shadow-lg backdrop-blur transition hover:bg-slate-900/70 md:min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Morgen
            </p>
            <h2 className="mt-1 text-sm font-semibold">ProSafetyMatch</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-200">
              Digitale omgeving (streefdatum Q1 2026) waar vraag en aanbod elkaar
              rechtstreeks vinden — DBA-proof, transparant en zonder marge op het
              uurtarief. 10% platformfee, optioneel escrow 1–2%.
            </p>
          </article>

          {/* Voor wie */}
          <article className="min-w-[260px] flex-1 rounded-3xl bg-slate-950/60 p-4 text-slate-50 shadow-lg backdrop-blur transition hover:bg-slate-900/70 md:min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Voor wie
            </p>
            <h2 className="mt-1 text-sm font-semibold">
              Brandwachten &amp; opdrachtgevers
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-200">
              Voor professionals die bewust kiezen voor eerlijk, transparant en
              DBA-proof samenwerken — zonder ruis, onduidelijke constructies of
              uurtarieven die uitgehold worden door marges.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
