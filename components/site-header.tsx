'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = { href: string; label: string }

const LINKS: NavLink[] = [
  { href: '/missie', label: 'Missie' },
  { href: '/opdrachtgevers', label: 'Opdrachtgevers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = useMemo(
    () => (href: string) => pathname === href || (href !== '/' && pathname?.startsWith(href)),
    [pathname],
  )

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-700/80 text-white backdrop-blur supports-[backdrop-filter]:bg-brand-700/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
        {/* Logo */}
        <Link href="/" prefetch={false} className="text-[15px] font-semibold tracking-tight">
          ProBrandwacht.nl
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm lg:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                prefetch={false}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-md px-3 py-1.5 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  active ? 'bg-white/10 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-white/80' : ''
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side actions (compact pills) */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* ProBrandwacht Direct – geplande inzet */}
          <Link
            href="/probrandwacht-direct"
            prefetch={false}
            title="Geplande inzet — powered by Chrono4Solutions"
            className={`inline-flex flex-col items-center justify-center rounded-xl border border-white/35 px-3 py-1.5 text-[11px] leading-tight shadow-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              pathname?.startsWith('/probrandwacht-direct') ? 'bg-white/10 ring-1 ring-white/40' : ''
            }`}
          >
            <span className="font-semibold flex items-center gap-1">
              ⏱️ ProBrandwacht Direct
            </span>
            <span className="opacity-85">geplande inzet</span>
          </Link>

          {/* ProBrandwacht Direct spoed */}
          <Link
            href="/probrandwacht-direct-spoed"
            prefetch={false}
            title="Spoed & 24/7 — directe inzet via Slack"
            className={`inline-flex flex-col items-center justify-center rounded-xl border border-white/35 px-3 py-1.5 text-[11px] leading-tight shadow-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              pathname?.startsWith('/probrandwacht-direct-spoed') ? 'bg-white/10 ring-1 ring-white/40' : ''
            }`}
          >
            <span className="font-semibold flex items-center gap-1">
              ⚡ ProBrandwacht Direct spoed
            </span>
            <span className="opacity-85">spoed & 24/7</span>
          </Link>

          {/* Aanmeld CTA */}
          <a
            href="/zzp/aanmelden"
            className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-xs font-semibold tracking-tight text-brand-700 shadow transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="xl:hidden">Meld je aan (gratis)</span>
            <span className="hidden xl:inline">
              Meld je aan (gratis) en kom straks met je profiel op ProSafetyMatch
            </span>
          </a>
        </div>

        {/* Mobile: burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Sluit navigatie' : 'Open navigatie'}
          className="inline-flex items-center rounded-md border border-white/30 px-3 py-2 text-sm lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
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
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden border-t border-white/10 bg-brand-700/95 text-sm transition-[max-height,opacity] duration-200 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                    active ? 'bg-white/10' : ''
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* Compact actions on mobile */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link
              href="/probrandwacht-direct"
              prefetch={false}
              onClick={() => setOpen(false)}
              className={`rounded-md border border-white/35 px-3 py-2 text-center text-[12px] font-semibold hover:bg-white/10 ${
                pathname?.startsWith('/probrandwacht-direct') ? 'bg-white/10 ring-1 ring-white/40' : ''
              }`}
            >
              ⏱️ ProBrandwacht Direct
            </Link>
            <Link
              href="/probrandwacht-direct-spoed"
              prefetch={false}
              onClick={() => setOpen(false)}
              className={`rounded-md border border-white/35 px-3 py-2 text-center text-[12px] font-semibold hover:bg-white/10 ${
                pathname?.startsWith('/probrandwacht-direct-spoed') ? 'bg-white/10 ring-1 ring-white/40' : ''
              }`}
            >
              ⚡ ProBrandwacht Direct spoed
            </Link>
          </div>

          <a
            href="/zzp/aanmelden"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-brand-700 shadow transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
