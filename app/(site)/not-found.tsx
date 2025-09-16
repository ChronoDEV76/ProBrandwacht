import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Pagina niet gevonden</h1>
      <p className="text-slate-600">De opgevraagde pagina bestaat niet (meer).</p>
      <div className="flex gap-3 text-sm">
        <Link href="/" className="underline">
          Naar home
        </Link>
        <Link href="/blog" className="underline">
          Blog & kennisbank
        </Link>
      </div>
    </section>
  )
}
