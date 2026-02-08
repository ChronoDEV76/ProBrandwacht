import Link from 'next/link'
import { headers } from 'next/headers'

import { Cta } from '@/components/Cta'

const LINKS = [
  { href: '/blog', label: 'Kennisbank' },
  { href: '/veiligheidskundig-kader', label: 'Veiligheidskundig kader' },
  { href: '/voor-brandwachten', label: 'Voor professionals' },
  { href: '/opdrachtgevers', label: 'Voor opdrachtgevers' },
  { href: '/waarom-wij-soms-nee-zeggen', label: 'Afbakening' },
  { href: '/belangen', label: 'Intentie' },
  { href: '/over-ons', label: 'Over ProBrandwacht' },
]

export default function SiteHeader() {
  const headerList = headers()
  const currentPath = headerList.get('next-url') ?? '/'
  const isActive = (href: string) => currentPath === href || (href !== '/' && currentPath.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col leading-tight">
          <Link href="/" prefetch={false} className="text-[15px] font-semibold tracking-tight text-amber-100">
            ProBrandwacht
          </Link>
          {currentPath !== '/' ? (
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">
              Analyse en context bij samenwerking
            </span>
          ) : null}
        </div>

        <nav className="hidden items-center gap-1 text-sm lg:flex">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`relative rounded-md px-3 py-1.5 transition hover:bg-white/10 hover:text-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                isActive(link.href)
                  ? 'bg-white/10 text-amber-100 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-amber-200/90'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex" />

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

      <div className="absolute right-0 top-full z-40 mt-3 w-[min(20rem,90vw)] overflow-hidden rounded-2xl border border-white/15 bg-slate-950 text-sm shadow-xl">
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

        <div className="border-t border-white/15 px-4 py-3 text-xs text-white/80">
          Het initiatief legt uit hoe de markt werkt en waar kaders liggen. Uitvoering en keuzes blijven
          bij de betrokken partijen.
        </div>


      </div>
    </details>
  )
}
