import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          ProBrandwacht.nl
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/blog">Blog</Link>
          <Link href="/brandwacht-inhuren/amsterdam">Brandwacht Amsterdam</Link>
        </nav>
      </div>
    </header>
  )
}
