export default function BlogNeutralNote({ className }: { className?: string }) {
  const rootClassName = [
    'mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClassName}>
      <h2 className="text-xl font-semibold md:text-2xl">Neutrale duiding</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">
        ProBrandwacht biedt context en reflectie. Dit is geen advies, geen beoordeling van individuele
        professionals of organisaties, maar een uitleg van systeemrollen en risico&apos;s.
      </p>
    </div>
  )
}
