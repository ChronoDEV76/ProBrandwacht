'use client'

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  void _error
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Er ging iets mis</h1>
      <p className="text-slate-600">Probeer het opnieuw of ga terug naar de homepage.</p>
      <div className="flex gap-3 text-sm">
        <button onClick={() => reset()} className="rounded-md border px-3 py-1.5 hover:bg-slate-50">
          Opnieuw proberen
        </button>
        <a href="/" className="underline">
          Naar home
        </a>
      </div>
    </section>
  )
}
