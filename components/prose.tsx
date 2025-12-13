import React from 'react'

export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="prose max-w-none prose-invert text-slate-200 prose-headings:text-slate-50 prose-strong:text-slate-50 prose-a:text-emerald-200 prose-a:underline prose-blockquote:border-slate-700 prose-hr:border-slate-800"
    >
      {children}
    </div>
  )
}
