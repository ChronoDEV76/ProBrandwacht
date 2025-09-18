'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SiteHeader() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-700/80 text-white backdrop-blur supports-[backdrop-filter]:bg-brand-700/60 shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold">
          ProBrandwacht.nl
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex gap-2 sm:gap-3 text-sm flex-wrap">
            <Link
              href="/manifest"
              aria-current={isActive('/manifest') ? 'page' : undefined}
              className={`relative rounded-md px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition ${
                isActive('/manifest') ? 'bg-white/15' : 'hover:bg-white/10'
              } after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white/80 ${
                isActive('/manifest') ? 'after:scale-x-100' : 'hover:after:scale-x-100'
              }`}
            >
              Missie
            </Link>
            <Link
              href="/opdrachtgevers"
              aria-current={isActive('/opdrachtgevers') ? 'page' : undefined}
              className={`relative rounded-md px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition ${
                isActive('/opdrachtgevers') ? 'bg-white/15' : 'hover:bg-white/10'
              } after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white/80 ${
                isActive('/opdrachtgevers') ? 'after:scale-x-100' : 'hover:after:scale-x-100'
              }`}
            >
              Opdrachtgevers
            </Link>
            <Link
              href="/faq"
              aria-current={isActive('/faq') ? 'page' : undefined}
              className={`relative rounded-md px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition ${
                isActive('/faq') ? 'bg-white/15' : 'hover:bg-white/10'
              } after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white/80 ${
                isActive('/faq') ? 'after:scale-x-100' : 'hover:after:scale-x-100'
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              aria-current={isActive('/blog') ? 'page' : undefined}
              className={`relative rounded-md px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition ${
                isActive('/blog') ? 'bg-white/15' : 'hover:bg-white/10'
              } after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white/80 ${
                isActive('/blog') ? 'after:scale-x-100' : 'hover:after:scale-x-100'
              }`}
            >
              Blog
            </Link>
          </nav>
          <a
            href="https://forms.gle/pWCs2Dwuk4uZGw2K7"
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
