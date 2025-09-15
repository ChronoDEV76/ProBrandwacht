import React from 'react'

export default function Prose({ children }: { children: React.ReactNode }) {
  return <div className="prose prose-slate max-w-none">{children}</div>
}
