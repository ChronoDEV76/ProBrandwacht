import type { NextWebVitalsMetric } from 'next/app'

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
  gtag?: (...args: unknown[]) => void
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (typeof window === 'undefined') return

  const analyticsWindow = window as AnalyticsWindow
  const { id, name, label, value } = metric
  const metricId = `${label}-${name}-${id}`
  const roundedValue = name === 'CLS' ? Math.round(value * 1000) / 1000 : Math.round(value * 100) / 100

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
  analyticsWindow.dataLayer.push({
    event: 'web_vitals',
    metric_name: name,
    metric_label: label,
    metric_id: metricId,
    value: roundedValue,
  })

  analyticsWindow.gtag?.('event', name, {
    value,
    metric_id: metricId,
    metric_label: label,
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('[WebVitals]', name, value)
  }
}
