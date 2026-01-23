import clsx from 'clsx'

type AfbakeningNoteProps = {
  className?: string
}

export default function AfbakeningNote({ className }: AfbakeningNoteProps) {
  return (
    <aside
      className={clsx(
        'rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200',
        className
      )}
    >
      <p>
        <span className="font-semibold">Afbakening:</span> ProBrandwacht is geen bureau, geen werkgever en
        geen matching-engine. We geven geen tariefadvies en geen garanties. Afspraken worden 1-op-1 gemaakt
        tussen opdrachtgever en professional.
      </p>
    </aside>
  )
}
