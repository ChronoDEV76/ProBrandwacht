import type { ReactNode } from 'react'

type InfoCard = {
  eyebrow: string
  title: string
  body: ReactNode
}

type InfoCardsRowProps = {
  items: InfoCard[]
}

export function InfoCardsRow({ items }: InfoCardsRowProps) {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(item => (
          <article
            key={item.title}
            className="
              rounded-2xl
              bg-slate-900/90
              border border-slate-800
              shadow-lg shadow-black/20
              p-6
              transition-all
              duration-200
              hover:shadow-xl hover:shadow-black/30
            "
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] text-slate-400 uppercase">
              {item.eyebrow}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>

            <div className="mt-3 text-sm leading-relaxed text-slate-300">{item.body}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
