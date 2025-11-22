'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
  gtag?: (...args: unknown[]) => void
}

type Props = {
  gaId?: string
}

export default function AnalyticsTracker({ gaId }: Props) {
  const pathname = usePathname() || ''
  const searchParams = useSearchParams()
  const search = searchParams?.toString() || ''
  const query = search ? `?${search}` : ''

  useEffect(() => {
    if (typeof window === 'undefined') return
    const pagePath = `${pathname}${query}` || '/'
    const analyticsWindow = window as AnalyticsWindow
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
    analyticsWindow.dataLayer.push({ event: 'pageview', page_path: pagePath })
    if (gaId) {
      analyticsWindow.gtag?.('config', gaId, { page_path: pagePath })
    }
  }, [gaId, pathname, query])

  return null
}
