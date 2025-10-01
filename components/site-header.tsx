import Link from 'next/link'

const links = [
  { href: '/manifest', label: 'Missie' },
  { href: '/opdrachtgevers', label: 'Opdrachtgevers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-700/80 text-white backdrop-blur supports-[backdrop-filter]:bg-brand-700/60 shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold">
          ProBrandwacht.nl
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex gap-2 sm:gap-3 text-sm flex-wrap">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-md px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition hover:bg-white/10 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white/80 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://forms.gle/fAChpLDNSJWRBHDC7"
            className="inline-flex items-center rounded-md bg-white text-brand-700 px-3 py-1.5 text-sm font-medium hover:bg-white/90 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="sm:hidden">Meld je aan (gratis)</span>
            <span className="hidden sm:inline">
              Meld je aan (gratis) en kom straks met je profiel op ProSafetyMatch
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
