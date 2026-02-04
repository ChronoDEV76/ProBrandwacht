import Link from 'next/link'

import DisclaimerContent from '@/components/disclaimer-content'

type DisclaimerNoteProps = {
  className?: string
}

export default function DisclaimerNote({ className }: DisclaimerNoteProps) {
  return (
    <section
      aria-label="Juridische disclaimer"
      className={
        'border-t border-slate-800/80 bg-slate-950/80 text-slate-200 ' +
        (className ?? '')
      }
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <DisclaimerContent variant="compact" className="text-sm" />
        <p className="mt-2 text-xs text-slate-400">
          Lees ook de{' '}
          <Link href="/disclaimer" className="font-medium text-emerald-300 hover:text-emerald-200">
            disclaimer
          </Link>{' '}
          en{' '}
          <Link href="/voorwaarden" className="font-medium text-emerald-300 hover:text-emerald-200">
            voorwaarden
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
