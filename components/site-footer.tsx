import Link from "next/link"
import Image from "next/image"

const LINKS = [
  { href: "/blog", label: "Blog / Kennisbank" },
  { href: "/platform", label: "Hoe werkt het initiatief?" },
  { href: "/voor-brandwachten", label: "Voor brandwachten" },
  { href: "/opdrachtgevers", label: "Voor opdrachtgevers" },
  { href: "/waarom-wij-soms-nee-zeggen", label: "Waarom wij soms nee zeggen" },
  { href: "/over-ons", label: "Over ons" },
]

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Bovenste rij */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Merk + tagline + badge */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex text-sm font-semibold underline-offset-4 hover:underline"
            >
              ProBrandwacht
            </Link>
            <p className="max-w-md text-xs text-slate-400">
              Onafhankelijk kennis- en platforminitiatief voor de brandwachtenmarkt.
            </p>

            <a
              href="https://www.zzp-nederland.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-900"
            >
              <Image
                src="/logo-20-years.svg"
                alt="ZZP Nederland – 20 jaar"
                width={84}
                height={20}
                className="h-5 w-auto"
              />
              <span className="text-slate-300">Lid van ZZP Nederland</span>
            </a>
          </div>

          {/* Hoofdlinks */}
          <nav className="flex flex-wrap gap-3 text-sm sm:justify-end">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-1 text-slate-200 transition hover:bg-slate-900 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Juridische links */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <Link
            href="/privacy"
            className="underline-offset-4 hover:text-slate-200 hover:underline"
          >
            Privacy
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/voorwaarden"
            className="underline-offset-4 hover:text-slate-200 hover:underline"
          >
            Voorwaarden
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/disclaimer"
            className="underline-offset-4 hover:text-slate-200 hover:underline"
          >
            Disclaimer
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="text-slate-500">Verkennende intake:</span>
          <Link
            href="/voor-brandwachten/aanmelden"
            className="underline-offset-4 hover:text-slate-200 hover:underline"
          >
            Voor brandwachten
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/opdrachtgevers/aanmelden"
            className="underline-offset-4 hover:text-slate-200 hover:underline"
          >
            Voor opdrachtgevers
          </Link>
        </div>

        <section className="panel p-5 text-xs text-slate-300">
          <div className="grid gap-4 md:grid-cols-[180px_1fr]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200">
              Slotverklaring
            </div>
            <div className="space-y-3">
              <p>
                ProBrandwacht is een onafhankelijk kennis- en platforminitiatief. We bieden geen bemiddeling,
                doen geen toezeggingen en sturen niet op prijs of inzet.
              </p>
              <p>
                Samenwerking vindt in de regel rechtstreeks plaats tussen opdrachtgever en zelfstandig professional.
                Wij leggen uit, kaderen en signaleren waar afspraken werkbaar blijven.
              </p>
              <p>
                Inhoud en inzichten zijn gebaseerd op praktijkervaring in industriele,
                repressieve en evenementenomgevingen, aangevuld met actuele context.
              </p>
              <p>
                Contact:{' '}
                <a href="mailto:info@probrandwacht.nl" className="underline">
                  info@probrandwacht.nl
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
