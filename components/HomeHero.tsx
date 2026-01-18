import clsx from "clsx"

import { Cta } from "@/components/Cta"

type HomeHeroProps = {
  className?: string
}

const HERO_SUBTITLE =
  "Je werkt als zelfstandig professional met maximale ruimte om je eigen keuzes te maken, zonder onnodige tussenlagen of onduidelijke kostenstructuren."

const HERO_BADGES = [
  "DBA-bewust samenwerken",
  "Transparant over platformkosten",
  "Directe afstemming tussen opdrachtgever en professional",
]

export default function HomeHero({ className }: HomeHeroProps) {
  return (
    <section className={clsx("relative text-slate-50", className)}>
      {/* Container die hero op de grill laat landen */}
      <div className="mx-auto flex min-h-[44vh] max-w-5xl flex-col justify-end px-4 pb-4 sm:pb-5 md:min-h-[55vh]">
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/12 bg-slate-950/88 p-5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)] backdrop-blur-lg md:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E5ECFF] drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            Voor brandwachten die bewust kiezen.
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:text-3xl">
            ProBrandwacht
          </h1>

          <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
            {HERO_BADGES.map(badge => (
              <span key={badge} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
                {badge}
              </span>
            ))}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-[#E5ECFF] drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
            {HERO_SUBTITLE} Gebruik de kennisbank en toolkit om DBA-bewust te werken.
          </p>

          {/* CTA buttons */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Cta
              id="primary_select"
              className="flex-1 rounded-2xl border-white/25 bg-white/5 px-4 py-2.5 text-white shadow-lg shadow-slate-950/20 focus-visible:ring-2 focus-visible:ring-white/40"
            />
            <Cta
              id="about_kaders_intentie"
              className="flex-1 rounded-2xl border-white/25 bg-white/5 px-4 py-2.5 text-slate-50 focus-visible:ring-2 focus-visible:ring-white/40"
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Je werkt zelfstandig, met ruimte voor eigen keuzes én met verantwoordelijkheid voor hoe die keuzes op de werkvloer worden ingevuld.
          </p>

          <p className="mt-3 text-[11px] text-slate-400">
            ProBrandwacht werkt anders dan klassieke bureauconstructies: transparant, zonder ketensturing en met heldere afspraken vooraf.
          </p>
        </div>
      </div>
    </section>
  )
}
