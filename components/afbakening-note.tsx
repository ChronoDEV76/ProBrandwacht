import clsx from 'clsx'

type AfbakeningNoteProps = {
  className?: string
}

export default function AfbakeningNote({ className }: AfbakeningNoteProps) {
  return (
    <aside
      className={clsx(
        'panel grid gap-4 p-5 text-sm text-slate-200 md:grid-cols-[160px_1fr]',
        className
      )}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
        Afbakening
      </div>
      <div className="space-y-3">
        <ul className="list-disc space-y-1 pl-4">
          <li>Geen bureau</li>
          <li>Geen werkgever</li>
          <li>Geen matching-engine</li>
          <li>Geen prijssturende partij</li>
        </ul>
        <p className="text-slate-300">
          We leggen uit en kaderen. Afspraken maak je 1-op-1 tussen opdrachtgever en
          zelfstandig professional.
        </p>
      </div>
    </aside>
  )
}
