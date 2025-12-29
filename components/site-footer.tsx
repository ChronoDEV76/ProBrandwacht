import Link from "next/link"
import Image from "next/image"

const LINKS = [
  { href: "/belangen", label: "Belangen & standpunten" },
  { href: "/blog", label: "Blog / Kennisbank" },
  { href: "/voor-brandwachten", label: "Voor brandwachten" },
  { href: "/opdrachtgevers", label: "Voor opdrachtgevers" },
  { href: "/over-ons", label: "Over ons" },
]

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Bovenste rij */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Merk + tagline + badge */}
          <div className="space-y-2">
            <Link
              href="/"
              className="inline-flex text-sm font-semibold underline-offset-4 hover:underline"
            >
              ProBrandwacht
            </Link>
            <p className="max-w-md text-xs text-slate-400">
              Inzicht, context en ondersteuning voor bewust zelfstandig werken.
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

        <section className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-400">
          <p>
            ProBrandwacht is een onafhankelijk kennis- en platforminitiatief voor
            bewust zelfstandig werken in brandveiligheid.
          </p>
          <p className="mt-1">
            Inhoud en inzichten zijn gebaseerd op praktijkervaring in industriele,
            repressieve en evenementenomgevingen, aangevuld met actuele wet- en
            regelgeving (o.a. Wet DBA).
          </p>
          <p className="mt-1">
            Contact:{" "}
            <a href="mailto:info@prosafetymatch.nl" className="underline">
              info@prosafetymatch.nl
            </a>
          </p>
        </section>
      </div>
    </footer>
  )
}
