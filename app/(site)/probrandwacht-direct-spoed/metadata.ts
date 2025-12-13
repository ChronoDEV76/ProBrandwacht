import type { Metadata } from 'next'

import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags'

export const metadata: Metadata = SPOED_ROUTE_ENABLED
  ? {
      title: 'SPOED - direct een zelfstandige brandwacht claimen (24/7) | ProBrandwacht.nl',
      description:
        'Binnen minuten een gecertificeerde zelfstandige brandwacht claimen, 24/7. Transparant, DBA-proof en zonder marge of tussenbureau. Voorproef van ProSafetyMatch.',
    }
  : {
      title: 'Pagina niet beschikbaar | ProBrandwacht.nl',
      robots: {
        index: false,
        follow: false,
      },
    }
