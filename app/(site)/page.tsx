import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold">Brandwacht inhuren in 2025</h1>
      <p>
        Huur gecertificeerde brandwachten transparant en snel. Eerlijke tarieven, escrow-betaling en
        directe inzage in certificaten.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/brandwacht-inhuren/amsterdam"
          className="rounded-xl border p-4 hover:bg-slate-50"
        >
          Brandwacht Amsterdam →
        </Link>
        <Link
          href="/blog/wat-kost-een-brandwacht-in-2025"
          className="rounded-xl border p-4 hover:bg-slate-50"
        >
          Wat kost een brandwacht in 2025? →
        </Link>
      </div>
    </section>
  )
}
