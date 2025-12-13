import Link from 'next/link'

const LINKS = [
  { href: '/belangen', label: 'Belangen & standpunten' },
  { href: '/blog', label: 'Blog / Kennisbank' },
  { href: '/voor-brandwachten', label: 'Voor brandwachten' },
  { href: '/opdrachtgevers', label: 'Voor opdrachtgevers' },
  { href: '/over-ons', label: 'Over ons' },
]

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-1">
          <p className="text-sm font-semibold">ProBrandwacht.nl</p>
          <p className="text-xs text-slate-400">Handvatten voor zelfstandige brandwachten — transparant, DBA-proof, zonder verborgen marges.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-1 text-slate-200 transition hover:text-white hover:bg-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
