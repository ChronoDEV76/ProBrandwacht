import type { ReactNode } from 'react'

type Source = {
  label: string
  href?: string
  note?: ReactNode
}

export default function Bronnen({ items }: { items: Source[] }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
      <div className="mb-1 font-semibold text-slate-800">Bronnen</div>
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <a className="underline hover:no-underline" href={item.href}>
                {item.label}
              </a>
            ) : (
              item.label
            )}
            {item.note ? <span> — {item.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
