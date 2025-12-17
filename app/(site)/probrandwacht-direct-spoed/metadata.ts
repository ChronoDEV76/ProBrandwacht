import type { Metadata } from 'next'

import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags'

export const metadata: Metadata = SPOED_ROUTE_ENABLED
  ? {
      title: 'SPOED - direct een zelfstandige brandwacht aanvragen (24/7) | ProBrandwacht',
      description:
        'Snel een gecertificeerde zelfstandige brandwacht aanvragen, 24/7. Transparant, DBA-bewust en zonder marge of tussenbureau. Concept van ProSafetyMatch (in ontwikkeling).',
    }
  : {
      title: 'Pagina niet beschikbaar | ProBrandwacht',
      robots: {
        index: false,
        follow: false,
      },
    }
