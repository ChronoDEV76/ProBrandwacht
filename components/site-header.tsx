'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = { href: string; label: string }

// 👇 Add/adjust links here
const LINKS: NavLink[] = [
  { href: '/missie', label: 'Missie' },
  { href: '/opdrachtgevers', label: 'Opdrachtgevers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = useMemo(
    () => (href: string) =>
      pathname === href || (href !== '/' && pathname?.startsWith(href)),
    [pathname]
  )

  function toggleMenu() {
    setMenuOpen(prev => !prev)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-white/10 bg-brand-700/80 text-white shadow-sm backdrop-blur supports-[backdrop-filter]:bg-brand-700/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-base font-semibold tracking-tight">
          ProBrandwacht.nl
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-white/30 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Sluit navigatie' : 'Open navigatie'}
            aria-expanded={menuOpen}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 text-sm lg:flex">
            {LINKS.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-md px-3 py-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:bg-white/10
                    after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-white/80 hover:after:scale-x-100
                    ${active ? 'bg-white/10 after:scale-x-100' : ''}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Primary CTA (desktop) */}
          <a
            href="/chrono-direct"
            className="hidden items-center rounded-md border border-white/40 px-3 py-1.5 text-xs font-semibold tracking-tight text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:inline-flex xl:text-sm"
          >
            Direct inzet (Chrono4Solutions)
          </a>
          <a
            href="/zzp/aanmelden"
            className="hidden items-center rounded-md bg-white px-3 py-1.5 text-xs font-semibold tracking-tight text-brand-700 shadow transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:inline-flex xl:text-sm"
          >
            <span className="xl:hidden">Meld je aan (gratis)</span>
            <span className="hidden xl:inline">
              Meld je aan (gratis) en kom straks met je profiel op ProSafetyMatch
            </span>
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden border-t border-white/10 bg-brand-700/95 text-sm text-white transition-[max-height,opacity] duration-200 ease-in-out ${
          menuOpen ? 'max-h-72 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {LINKS.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                    active ? 'bg-white/10' : ''
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Primary CTA (mobile) */}
          <a
            href="/chrono-direct"
            onClick={closeMenu}
            className="inline-flex items-center justify-center rounded-md border border-white/40 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Direct inzet (Chrono4Solutions)
          </a>
          <a
            href="/zzp/aanmelden"
            onClick={closeMenu}
            className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-brand-700 shadow transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="max-w-[18ch] text-center leading-snug">
              Meld je aan (gratis) en kom straks met je profiel op ProSafetyMatch
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
