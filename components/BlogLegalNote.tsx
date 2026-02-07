type LegalNoteVariant = 'standard' | 'dba' | 'extended'

const LEGAL_NOTE_COPY: Record<
  LegalNoteVariant,
  { title: string; body: string }
> = {
  standard: {
    title: 'Juridische nuance',
    body:
      'Dit artikel is informatief. ' +
      'Of een samenwerking voldoet aan wet- en regelgeving, zoals de Wet DBA, hangt ' +
      'af van de feitelijke uitvoering in de praktijk. Aan deze tekst kunnen geen ' +
      'rechten worden ontleend.',
  },
  dba: {
    title: 'Belangrijk om te weten',
    body:
      'Directe samenwerking of het gebruik van bepaalde contracten is niet ' +
      'automatisch doorslaggevend voor de kwalificatie van de arbeidsrelatie. ' +
      'Toezichthouders beoordelen de feitelijke gezagsverhouding, mate van ' +
      'zelfstandigheid en wijze van uitvoering. De beoordeling blijft ' +
      'contextafhankelijk.',
  },
  extended: {
    title: 'Context en verantwoordelijkheid',
    body:
      'De inhoud van dit artikel is informatief en gebaseerd op praktijkervaring en ' +
      'publiek beschikbare regelgeving. De uiteindelijke beoordeling van een ' +
      'arbeidsrelatie ligt bij opdrachtgever en uitvoerende en, indien van toepassing, ' +
      'bij toezichthouders. ProBrandwacht biedt duiding en overzicht; juridische ' +
      'en fiscale keuzes blijven bij de betrokken partijen.',
  },
}

const DEFAULT_CLOSING_LINE =
  'Professionele samenwerking vraagt niet om standaardantwoorden, maar om bewuste keuzes in de praktijk.'

export default function BlogLegalNote({
  variant = 'standard',
  showClosingLine = true,
  className,
}: {
  variant?: LegalNoteVariant
  showClosingLine?: boolean
  className?: string
}) {
  const copy = LEGAL_NOTE_COPY[variant]
  const rootClassName = [
    'mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClassName}>
      <h2 className="text-xl font-semibold md:text-2xl">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">{copy.body}</p>
      {showClosingLine ? (
        <p className="mt-3 text-sm font-medium text-slate-100">{DEFAULT_CLOSING_LINE}</p>
      ) : null}
    </div>
  )
}
