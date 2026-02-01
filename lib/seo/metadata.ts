// lib/seo/metadata.ts
import type { Metadata } from 'next'
import { seoKeywordClusters } from '@/lib/seo/seo-keywords'

type RouteMeta = {
  title: string
  description: string
  keywords?: string[]
  robots?: Metadata['robots']
}

// basiskeywords als fallback
const defaultKeywords: string[] = [
  ...seoKeywordClusters.core,
  ...seoKeywordClusters.platform,
]

const BASE_URL = 'https://www.probrandwacht.nl'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-home.webp`

function normalizeCanonicalPath(pathname: string) {
  const cleaned = pathname.replace(/\/\[[^\]]+]/g, '')
  if (!cleaned || cleaned === '/') return '/'
  return cleaned.replace(/\/+$/, '') || '/'
}

// centrale map van route → metadata
export const routeMeta: Record<string, RouteMeta> = {
  // --------------------------------------------------
  // HOMEPAGE
  // --------------------------------------------------
  '/': {
    title: 'ProBrandwacht — Onafhankelijk kennis- en duidingsinitiatief',
    description:
      'ProBrandwacht legt uit hoe opdrachtgevers en zelfstandige brandwachten veilig en uitlegbaar samenwerken — zonder tussenconstructies.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
    ],
    robots: { index: true, follow: true },
  },

  // --------------------------------------------------
  // (SITE) – MARKETINGPAGINA’S
  // --------------------------------------------------

  '/aanmelden': {
    title: 'Verkennende intake | ProBrandwacht',
    description:
      'Verkennende intake voor zelfstandigen. ProBrandwacht geeft context over rolafbakening en samenwerking, zonder garanties.',
    keywords: [...seoKeywordClusters.zzpFreelance, ...seoKeywordClusters.platform],
    robots: { index: false, follow: false },
  },

  '/opdrachtgevers': {
    title: 'Opdrachtgevers | Uitlegbare samenwerking | ProBrandwacht',
    description:
      'Onafhankelijk initiatief met context over rolverdeling, verantwoordelijkheden en afspraken zodat samenwerking uitlegbaar blijft.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
    ],
  },

  '/opdrachtgevers/aanmelden': {
    title: 'Verkennende intake voor opdrachtgevers | ProBrandwacht',
    description:
      'Verkennende intake voor opdrachtgevers. We bespreken rol, verantwoordelijkheden en afspraken vooraf zodat samenwerking helder blijft.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
    ],
    robots: { index: false, follow: false },
  },

  '/platform': {
    title: 'Wat is ProBrandwacht? | ProBrandwacht',
    description:
      'Uitleg over ProBrandwacht als onafhankelijk initiatief: rolafbakening, grenzen en wat het initiatief niet is.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'probrandwacht initiatief',
      'hoe werkt probrandwacht',
      'brandwacht initiatief uitleg',
    ],
  },

  '/over-ons': {
    title: 'Over ons — rol, duiding en afbakening | ProBrandwacht',
    description:
      'Waarom ProBrandwacht bestaat: een onafhankelijke rol die kaders zichtbaar maakt vóór samenwerking.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'over probrandwacht',
      'brandwacht manifest',
    ],
  },


  '/contact': {
    title: 'Contact | ProBrandwacht',
    description:
      'Verkennend contact over rolverdeling, verantwoordelijkheden en uitvoerbaarheid.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'contact probrandwacht',
      'brandwacht contact',
    ],
  },

  '/belangen': {
    title: 'Kaders en intentie | ProBrandwacht',
    description:
      'Kaders en uitgangspunten voor rolhelderheid, verantwoordelijkheid en uitvoerbaarheid in samenwerking.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'belangen zelfstandige brandwacht',
      'wet dba brandwacht',
    ],
  },

  '/brandwachtenmarkt': {
    title: 'Brandwachtenmarkt — systeemduiding en context | ProBrandwacht',
    description:
      'Onafhankelijke uitleg over hoe de brandwachtenmarkt werkt: rollen, verantwoordelijkheden en systeemwerking. Duiding zonder advies.',
    keywords: [
      ...seoKeywordClusters.core,
      'brandwachtenmarkt',
      'brandwacht inzet uitleg',
      'rol brandwacht',
      'systeemwerking brandveiligheid',
    ],
  },

  '/veiligheidskundig-kader': {
    title: 'Veiligheidskundig kader — principes en systeemveiligheid | ProBrandwacht',
    description:
      'Veiligheidskundige duiding van rol, mandaat en systeemveiligheid binnen brandveiligheid. Context en principes, geen advies.',
    keywords: [
      ...seoKeywordClusters.core,
      'veiligheidskundig kader',
      'systeemveiligheid',
      'veiligheidsprincipes',
      'rolzuiverheid',
    ],
  },

  '/wetgeving-brandwacht': {
    title: 'Wetgeving brandwacht — duiding zonder advies | ProBrandwacht',
    description:
      'Overzicht en context van wet- en regelgeving rond brandwacht-inzet, verantwoordelijkheid en rolafbakening. Beschrijvend en neutraal.',
    keywords: [
      ...seoKeywordClusters.core,
      'wet dba brandwacht',
      'wtta brandwacht',
      'brandwacht wetgeving',
      'verantwoordelijkheid brandwacht',
    ],
  },

  '/praktijk-brandveiligheid': {
    title: 'Praktijk brandveiligheid — duiding zonder oordeel | ProBrandwacht',
    description:
      'Observaties uit de praktijk van brandveiligheid: waar systemen knellen en rolverdeling onder druk staat. Context, geen oplossingen.',
    keywords: [
      ...seoKeywordClusters.core,
      'brandveiligheid praktijk',
      'brandwacht inzet praktijk',
      'rolverdeling veiligheid',
      'systemen knellen',
    ],
  },

  '/faq': {
    title: 'FAQ | ProBrandwacht',
    description:
      'Antwoorden op veelgestelde vragen over rolafbakening, verantwoordelijkheden en grenzen.',
    keywords: [...seoKeywordClusters.core],
  },

  '/voorwaarden': {
    title: 'Algemene voorwaarden | ProBrandwacht',
    description:
      'Voorwaarden van ProBrandwacht: wat het initiatief wel en niet doet en waar verantwoordelijkheid ligt.',
    keywords: [
      'algemene voorwaarden',
      'voorwaarden probrandwacht',
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
    ],
  },

  '/disclaimer': {
    title: 'Disclaimer | ProBrandwacht',
    description:
      'Lees hoe informatie en voorbeelden bedoeld zijn: indicatief, ter duiding en zonder garanties.',
    keywords: [
      'disclaimer',
      'aansprakelijkheid',
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
    ],
  },

  '/privacy': {
    title: 'Privacyverklaring | ProBrandwacht',
    description:
      'Lees hoe ProBrandwacht omgaat met persoonsgegevens en waarom we alleen noodzakelijke data vragen.',
    keywords: ['privacy brandwacht', 'privacyverklaring', 'gegevensbescherming brandwacht'],
    robots: { index: true, follow: true },
  },

  '/steden': {
    title: 'Brandwacht-inzet per stad: context en verantwoordelijkheden | ProBrandwacht',
    description:
      "Overzicht van stedenpagina's met lokale context, verantwoordelijkheden en aandachtspunten rond brandwacht-inzet.",
    keywords: [
      ...seoKeywordClusters.core,
      'brandwacht-inzet per stad',
      'brandwacht regio uitleg',
    ],
  },

  '/steden/[city]': {
    title: 'Brandwacht-inzet in jouw stad: verantwoordelijkheden | ProBrandwacht',
    description:
      'Onafhankelijke uitleg over brandwacht-inzet in jouw stad. Wat is verplicht, wie is verantwoordelijk en waar gaat het vaak mis?',
    keywords: [
      ...seoKeywordClusters.core,
      'brandwacht-inzet uitleg',
      'verantwoordelijkheden brandwacht',
      'brandwachtenmarkt',
    ],
  },


  // --------------------------------------------------
  // ZZP-BRANDWACHTEN
  // --------------------------------------------------

  '/zzp/aanmelden': {
    title: 'Verkennende intake voor zelfstandige brandwachten | ProBrandwacht',
    description:
      'Verkennende intake voor zelfstandige brandwachten. We bespreken rol, verwachtingen en zelfstandigheid vooraf.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.platform,
    ],
    robots: { index: false, follow: false },
  },

  '/voor-brandwachten/aanmelden': {
    title: 'Verkennende intake voor zelfstandige brandwachten | ProBrandwacht',
    description:
      'Verkennende intake voor zelfstandige brandwachten. Je verkent 1-op-1 samenwerking zonder klassiek bureau, op basis van rolafbakening.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.platform,
      'zelfstandige brandwacht aanmelden',
      ...seoKeywordClusters.positioning,
    ],
    robots: { index: false, follow: false },
  },

  '/voor-brandwachten': {
    title: 'Voor brandwachten | ProBrandwacht',
    description:
      'Context voor zelfstandig werken: rolzuiverheid, verantwoordelijkheden en professionele ruimte.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.platform,
      'brandwacht aanmelden',
      'zelfstandige brandwacht',
      ...seoKeywordClusters.positioning,
    ],
  },


  // --------------------------------------------------
  // PROBRANDWACHT DIRECT / SPOED
  // --------------------------------------------------

  '/probrandwacht-direct': {
    title: 'ProBrandwacht Direct | ProBrandwacht',
    description:
      'Sneller schakelen met duidelijke rolverdeling, risico-inschatting en afspraken.',
    keywords: [...seoKeywordClusters.processSpeed, ...seoKeywordClusters.platform],
  },

  '/probrandwacht-direct-spoed': {
    title: 'ProBrandwacht Direct (spoed) | ProBrandwacht',
    description:
      'Spoedaanvragen vragen duidelijke rollen en afspraken. Context bepaalt wat verantwoord is.',
    keywords: [...seoKeywordClusters.processSpeed, 'spoed brandwacht', 'brandwacht spoedroute'],
  },

  // --------------------------------------------------
  // BLOG
  // --------------------------------------------------

  '/blog': {
    title: 'Blog over brandwachten, rollen & praktijk | ProBrandwacht',
    description:
      'Lees artikelen over rolverdeling, zelfstandigheid en praktijkcases. Voor opdrachtgevers en zzp-brandwachten.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.positioning,
    ],
  },

  // blog/[slug] gebruikt dynamic metadata uit MDX frontmatter → geen vaste entry nodig
}

// Helper om metadata per route op te halen
export function getRouteMetadata(pathname: string): Metadata {
  const meta = routeMeta[pathname]
  const canonicalPath = normalizeCanonicalPath(pathname)
  const canonical = `${BASE_URL}${canonicalPath}`

  if (!meta) {
    return {
      title: 'ProBrandwacht — Kennis en duiding',
      description:
        'ProBrandwacht geeft uitleg over rolverdeling, verantwoordelijkheid en samenwerking in de brandwachtenmarkt.',
      keywords: defaultKeywords,
      robots: { index: true, follow: true },
      alternates: { canonical, languages: { 'nl-NL': canonical } },
      openGraph: {
        title: 'ProBrandwacht — Kennis en duiding',
        description:
          'ProBrandwacht geeft uitleg over rolverdeling, verantwoordelijkheid en samenwerking in de brandwachtenmarkt.',
        url: canonical,
        images: [
          {
            url: DEFAULT_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: 'ProBrandwacht.nl',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'ProBrandwacht — Kennis en duiding',
        description:
          'ProBrandwacht geeft uitleg over rolverdeling, verantwoordelijkheid en samenwerking in de brandwachtenmarkt.',
        images: [DEFAULT_OG_IMAGE],
      },
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords ?? defaultKeywords,
    robots: meta.robots ?? { index: true, follow: true },
    alternates: { canonical, languages: { 'nl-NL': canonical } },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}
