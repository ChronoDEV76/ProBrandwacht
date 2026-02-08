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
        <p className="text-slate-300">
          ProBrandwacht biedt veiligheidskundige context en praktische handvatten om samenwerking scherp
          te krijgen. Het laat zien hoe rollen, verantwoordelijkheden en kaders zich in de praktijk tot
          elkaar verhouden.
        </p>
        <p className="text-slate-300">
          Afspraken worden 1-op-1 gemaakt tussen opdrachtgever en zelfstandig professional, binnen hun eigen
          juridische en organisatorische kaders. Zo blijven verantwoordelijkheden helder en blijft de
          samenwerking uitlegbaar.
        </p>
      </div>
    </aside>
  )
}
