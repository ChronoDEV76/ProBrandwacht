'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type SiteMainProps = {
  children: ReactNode
}

export default function SiteMain({ children }: SiteMainProps) {
  const pathname = usePathname() || '/'
  const fullWidthPrefixes = ['/steden', '/missie', '/opdrachtgevers']
  const isFullWidth = pathname === '/' || fullWidthPrefixes.some(prefix => pathname.startsWith(prefix))

  const className = isFullWidth
    ? 'w-full flex-1 max-w-none px-0 py-0'
    : 'mx-auto w-full flex-1 max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8'

  return <main className={className}>{children}</main>
}
