import type { ReactNode } from 'react'

type TrustItem = {
  title: string
  body: string
  icon: ReactNode
}

const ITEMS: TrustItem[] = [
  {
    title: 'Onafhankelijk initiatief',
    body: 'Duiding van rol, mandaat en uitvoering met focus op publieke context.',
    icon: (
      <svg className="h-5 w-5 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Directe samenwerking',
    body: 'Afspraken vinden plaats tussen opdrachtgever en professional, met heldere rolafbakening.',
    icon: (
      <svg className="h-5 w-5 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 6h16M4 12h10M4 18h16" />
        <path d="M18 10l2 2-2 2" />
      </svg>
    ),
  },
  {
    title: 'Context & afspraken',
    body: 'Informatief kader dat keuzes en afspraken uitlegbaar maakt.',
    icon: (
      <svg className="h-5 w-5 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5" />
        <path d="M9 14h6M9 18h6M9 10h2" />
      </svg>
    ),
  },
]

export default function TrustBand({ className }: { className?: string }) {
  return (
    <section className={['mx-auto w-full max-w-6xl px-4', className].filter(Boolean).join(' ')}>
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-950 p-5 shadow-[0_18px_45px_-20px_rgba(251,191,36,0.25)] md:grid-cols-3">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-amber-200/40 bg-amber-200/10">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
