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
        <div className="mx-auto w-full max-w-xl rounded-3xl bg-slate-950/82 p-5 shadow-2xl backdrop-blur-md md:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Voor brandweermensen · Door brandweermensen
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            ProBrandwacht
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            Het digitale platform waar brandwachten en opdrachtgevers elkaar straks
            rechtstreeks vinden —{" "}
            <span className="font-semibold text-sky-300">DBA-proof</span>, zonder ruis
            en zonder marge op je uurtarief.
          </p>

          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            Vandaag: zichtbaarheid en eerlijke afspraken. Morgen:{" "}
            <span className="font-semibold text-white">ProSafetyMatch</span> — de nieuwe
            digitale standaard voor samenwerken in veiligheid.
          </p>

          {/* CTA buttons */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/zzp/aanmelden"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-400"
            >
              Ik ben brandwacht — start gratis
            </Link>
            <Link
              href="/opdrachtgevers"
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-600/70 bg-slate-900/60 px-4 py-2.5 text-sm font-semibold text-slate-50 hover:border-slate-300"
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
