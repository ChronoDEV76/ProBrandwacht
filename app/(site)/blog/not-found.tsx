import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Artikel niet gevonden</h1>
      <p className="text-slate-600">Het blogartikel dat u zoekt bestaat niet (meer).</p>
      <div className="space-x-4">
        <Link href="/blog" className="underline">
          Naar blogoverzicht
        </Link>
        <Link href="/" className="underline">
          Naar home
        </Link>
      </div>
    </section>
  )
}

