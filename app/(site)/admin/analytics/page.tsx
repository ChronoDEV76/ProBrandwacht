import type { Metadata } from 'next'
import AnalyticsClient from './AnalyticsClient'

export const metadata: Metadata = {
  title: 'Share events debug | ProBrandwacht',
  description: 'Bekijk live welke share_click events tijdens je sessie zijn geregistreerd voor testdoeleinden.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Share events debug | ProBrandwacht',
    description: 'Bekijk live welke share_click events tijdens je sessie zijn geregistreerd voor testdoeleinden.',
  },
  twitter: {
    card: 'summary',
    title: 'Share events debug | ProBrandwacht',
    description: 'Bekijk live welke share_click events tijdens je sessie zijn geregistreerd voor testdoeleinden.',
  },
}

export default function AnalyticsDebugPage() {
  return <AnalyticsClient />
}
