import type { Metadata } from 'next'

import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags'

export const metadata: Metadata = SPOED_ROUTE_ENABLED
  ? {
      title: 'SPOED - ProBrandwacht Direct | ProBrandwacht',
      description:
        'Een gecertificeerde zelfstandige brandwacht aanvragen bij spoed. Transparant, DBA-bewust en zonder marge of tussenbureau. Concept van ProSafetyMatch (in ontwikkeling).',
    }
  : {
      title: 'Pagina niet beschikbaar | ProBrandwacht',
      robots: {
        index: false,
        follow: false,
      },
    }
