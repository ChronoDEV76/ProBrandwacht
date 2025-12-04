import clsx from "clsx"
import Link from "next/link"

type HomeHeroProps = {
  className?: string
}

export default function HomeHero({ className }: HomeHeroProps) {
  return (
    <section className={clsx("relative text-slate-50", className)}>
      {/* Container die hero op de grill laat landen */}
      <div className="mx-auto flex min-h-[50vh] max-w-5xl flex-col justify-end px-4 pb-2 sm:pb-3 md:min-h-[55vh]">
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/12 bg-slate-950/88 p-5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)] backdrop-blur-lg md:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            Voor brandweermensen · Door brandweermensen
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:text-3xl">
            ProBrandwacht
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
            DBA-proof samenwerken zonder marge op het uurtarief. Vandaag zichtbaarheid en duidelijke afspraken; morgen{" "}
            <span className="font-semibold text-white">ProSafetyMatch</span> — digitaal en transparant.
          </p>

          {/* CTA buttons */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand-700 px-4 py-2.75 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition hover:bg-brand-600 focus-visible:ring-2 focus-visible:ring-brand-300"
            >
              Ik ben brandwacht — start gratis
            </Link>
            <Link
              href="/opdrachtgevers"
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/25 bg-slate-900/60 px-4 py-2.75 text-sm font-semibold text-slate-50 transition hover:border-white/40 focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Ik ben opdrachtgever — op de wachtlijst
            </Link>
          </div>

          <p className="mt-3 text-[11px] text-slate-400">
            Profiel aanmaken of wachtlijst: gratis · Altijd DBA-proof · Geen
            bemiddelingsbureau.
          </p>
        </div>
      </div>
    </section>
  )
}
