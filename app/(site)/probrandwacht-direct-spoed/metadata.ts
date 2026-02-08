import type { Metadata } from 'next'

import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags'

export const metadata: Metadata = SPOED_ROUTE_ENABLED
  ? {
      title: 'Spoed - ProBrandwacht Direct | ProBrandwacht',
      description:
        'Spoed vraagt heldere rollen, risico-inschatting en afspraken. ProBrandwacht beschrijft de randvoorwaarden.',
    }
  : {
      title: 'Pagina niet beschikbaar | ProBrandwacht',
      robots: {
        index: false,
        follow: false,
      },
    }
