import Link from 'next/link'
import { headers } from 'next/headers'

import { SPOED_UI_ENABLED } from '@/lib/featureFlags'
import { Cta } from '@/components/Cta'

const LINKS = [
  { href: '/voor-brandwachten', label: 'Voor brandwachten (selectief)' },
  { href: '/opdrachtgevers', label: 'Voor opdrachtgevers (uitvoerbaar)' },
  { href: '/waarom-wij-soms-nee-zeggen', label: 'Waarom wij soms nee zeggen' },
  { href: '/blog', label: 'Blog / Kennisbank' },
  { href: '/over-ons', label: 'Over ons' },
]

export default function SiteHeader() {
  const headerList = headers()
  const currentPath = headerList.get('next-url') ?? '/'
  const isActive = (href: string) => currentPath === href || (href !== '/' && currentPath.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-brand-900/20 bg-brand-700 text-white shadow-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" prefetch={false} className="text-[15px] font-semibold tracking-tight">
          ProBrandwacht
        </Link>

        <nav className="hidden items-center gap-1 text-sm lg:flex">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`relative rounded-md px-3 py-1.5 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                isActive(link.href)
                  ? 'bg-white/10 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-white/80'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {SPOED_UI_ENABLED ? (
            <Link
              href="/probrandwacht-direct-spoed"
              prefetch={false}
              title="Spoed & directe inzet via Slack"
              aria-current={currentPath.startsWith('/probrandwacht-direct-spoed') ? 'page' : undefined}
              className={`inline-flex flex-col items-center justify-center rounded-xl border border-white/35 px-3 py-1.5 text-[11px] leading-tight shadow-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                currentPath.startsWith('/probrandwacht-direct-spoed') ? 'bg-white/10 ring-1 ring-white/40' : ''
              }`}
            >
              <span className="font-semibold flex items-center gap-1">⚡ ProBrandwacht Direct spoed</span>
              <span className="opacity-85">Spoedinzet op basis van beschikbaarheid</span>
            </Link>
          ) : null}
        </div>

        <MobileMenu currentPath={currentPath} />
      </div>
    </header>
  )
}

function MobileMenu({ currentPath }: { currentPath: string }) {
  return (
    <details className="relative ml-auto flex-shrink-0 lg:hidden group">
      <summary className="inline-flex items-center rounded-md border border-white/30 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Open navigatie</span>
        <span aria-hidden className="group-open:hidden">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </span>
        <span aria-hidden className="hidden group-open:inline">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
      </summary>

      <div className="absolute right-0 top-full z-40 mt-3 w-[min(20rem,90vw)] overflow-hidden rounded-2xl border border-white/15 bg-brand-900 text-sm shadow-xl">
        <div className="flex flex-col gap-1 px-4 py-4">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              aria-current={currentPath.startsWith(link.href) ? 'page' : undefined}
              className={`rounded-md px-3 py-2 font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                currentPath.startsWith(link.href) ? 'bg-white/10' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {SPOED_UI_ENABLED ? (
          <div className="grid gap-2 border-t border-white/15 px-4 py-3">
            <Link
              href="/probrandwacht-direct-spoed"
              prefetch={false}
              aria-current={currentPath.startsWith('/probrandwacht-direct-spoed') ? 'page' : undefined}
              className={`rounded-md border border-white/35 px-3 py-2 text-center text-[12px] font-semibold hover:bg-white/10 ${
                currentPath.startsWith('/probrandwacht-direct-spoed') ? 'bg-white/10 ring-1 ring-white/40' : ''
              }`}
            >
              ⚡ ProBrandwacht Direct spoed
            </Link>
          </div>
        ) : null}

      </div>
    </details>
  )
}
