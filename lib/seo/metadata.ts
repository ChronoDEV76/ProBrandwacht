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
    title: 'ProBrandwacht — Duidelijkheid in de brandwachtenmarkt',
    description:
      'Onafhankelijk kennis- en duidingsplatform met veiligheidskundige context over rolafbakening, verantwoordelijkheden en samenwerking in de brandwachtenmarkt.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'brandwacht platform',
      'kennisplatform brandwacht',
      'brandwacht kennisbank',
    ],
    robots: { index: true, follow: true },
  },

  // --------------------------------------------------
  // (SITE) – MARKETINGPAGINA’S
  // --------------------------------------------------


  '/opdrachtgevers': {
    title: 'Voor opdrachtgevers — uitvoerbaar en uitlegbaar | ProBrandwacht',
    description:
      'Context en aandachtspunten voor samenwerking met zelfstandige brandwachten: rolverdeling, beslislijnen en afspraken vooraf.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'brandwacht platform',
      'kennisplatform brandwacht',
    ],
  },


  '/platform': {
    title: 'Wat is ProBrandwacht? — kennis en duiding | ProBrandwacht',
    description:
      'Uitleg over ProBrandwacht als onafhankelijk kennis- en duidingsinitiatief: rolafbakening, context en afbakening.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'probrandwacht initiatief',
      'hoe werkt probrandwacht',
      'brandwacht initiatief uitleg',
      'brandwacht platform',
      'kennisplatform brandwacht',
      'brandwacht kennisbank',
    ],
  },

  '/over-ons': {
    title: 'Over ProBrandwacht — rol en afbakening | ProBrandwacht',
    description:
      'Waarom ProBrandwacht bestaat: een onafhankelijke rol die het speelveld beschrijft en context en duiding zichtbaar maakt.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'over probrandwacht',
      'brandwacht manifest',
      'brandwacht platform',
    ],
  },


  '/contact': {
    title: 'Contact | ProBrandwacht',
    description:
      'Verkennend contact over rolverdeling, verantwoordelijkheden en uitvoerbaarheid in brandwacht-inzet.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'contact probrandwacht',
      'brandwacht contact',
    ],
  },

  '/belangen': {
    title: 'Intentie & afbakening | ProBrandwacht',
    description:
      'Uitgangspunten voor rolhelderheid, verantwoordelijkheid en uitvoerbaarheid in samenwerking.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'belangen zelfstandige brandwacht',
      'wet dba brandwacht',
    ],
  },

  '/veiligheidskundig-kader': {
    title: 'Veiligheidskundig kader — rol, mandaat en systeemwerking | ProBrandwacht',
    description:
      'Veiligheidskundige context over rol, mandaat en systeemwerking binnen brandveiligheid. Kader voor reflectie en uitlegbaarheid.',
    keywords: [
      ...seoKeywordClusters.core,
      'veiligheidskundig kader',
      'systeemveiligheid',
      'veiligheidsprincipes',
      'rolzuiverheid',
      'brandwacht kennisbank',
    ],
  },

  '/waarom-wij-soms-nee-zeggen': {
    title: 'Waarom er soms nee wordt gezegd — ProBrandwacht',
    description:
      "Context voor grensbewaking in brandveiligheidsinzet: wanneer uitvoerbaarheid, veiligheid en rolhelderheid vragen om een 'nee'.",
    keywords: [
      ...seoKeywordClusters.core,
      'brandwacht-inzet uitleg',
      'brandwacht verantwoordelijkheden',
      'uitvoerbaarheid',
      'rolhelderheid',
    ],
  },

  '/faq': {
    title: 'FAQ | ProBrandwacht',
    description:
      'Antwoorden op veelgestelde vragen over rolafbakening, verantwoordelijkheden en afspraken in brandwacht-inzet.',
    keywords: [
      ...seoKeywordClusters.core,
      'brandwacht platform',
    ],
  },

  '/voorwaarden': {
    title: 'Algemene voorwaarden | ProBrandwacht',
    description:
      'Voorwaarden en afbakening van de rol van ProBrandwacht; samenwerking blijft tussen opdrachtgever en professional.',
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
      'Uitleg over context, voorbeelden en beperkingen: indicatief en contextafhankelijk.',
    keywords: [
      'disclaimer',
      'aansprakelijkheid',
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
    ],
  },

  '/steden': {
    title: 'Brandwacht-inzet per stad — lokale context | ProBrandwacht',
    description:
      "Overzicht van stedenpagina's met lokale context, rolverdeling en aandachtspunten rond brandwacht-inzet.",
    keywords: [
      ...seoKeywordClusters.core,
      'brandwacht-inzet per stad',
      'brandwacht regio uitleg',
      'brandwacht platform',
    ],
  },

  '/steden/[city]': {
    title: 'Brandwacht-inzet in de stad: context en rolverdeling | ProBrandwacht',
    description:
      'Onafhankelijke beschrijving van brandwacht-inzet in de stad met context over rolverdeling, verantwoordelijkheden en uitvoerbaarheid.',
    keywords: [
      ...seoKeywordClusters.core,
      'brandwacht-inzet uitleg',
      'verantwoordelijkheden brandwacht',
      'brandwachtenmarkt',
      'brandwacht platform',
    ],
  },


  // --------------------------------------------------
  // ZZP-BRANDWACHTEN
  // --------------------------------------------------



  '/voor-brandwachten': {
    title: 'Voor brandwachten — duidelijke afspraken | ProBrandwacht',
    description:
      'Context voor zelfstandig werken: rol, scope, beslislijnen en professionele ruimte met focus op uitvoerbaarheid.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.platform,
      'zelfstandige brandwacht',
      ...seoKeywordClusters.positioning,
      'brandwacht platform',
      'kennisplatform brandwacht',
    ],
  },
  // --------------------------------------------------
  // BLOG
  // --------------------------------------------------

  '/blog': {
    title: 'Kennisbank brandwacht-inzet & marktinzicht | ProBrandwacht',
    description:
      'Onafhankelijke beschrijving met veiligheidskundige context en analyse over brandwacht-inzet, verantwoordelijkheden en regelgeving.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.positioning,
      'brandwacht kennisbank',
    ],
  },

  '/blog/[slug]': {
    title: 'Kennisbank | ProBrandwacht',
    description:
      'Beschrijvende kennis over brandwacht-inzet, rolverdeling en uitvoerbaarheid in de praktijk.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.positioning,
      'brandwacht kennisbank',
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
      title: 'ProBrandwacht — Duidelijkheid in de brandwachtenmarkt',
      description:
        'Onafhankelijk kennis- en duidingsplatform met context over rolverdeling, verantwoordelijkheid en samenwerking in de brandwachtenmarkt.',
      keywords: defaultKeywords,
      robots: { index: true, follow: true },
      alternates: { canonical, languages: { 'nl-NL': canonical } },
      openGraph: {
        title: 'ProBrandwacht — Duidelijkheid in de brandwachtenmarkt',
        description:
          'Onafhankelijk kennis- en duidingsplatform met context over rolverdeling, verantwoordelijkheid en samenwerking in de brandwachtenmarkt.',
        url: canonical,
        images: [
          {
            url: DEFAULT_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: 'ProBrandwacht',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'ProBrandwacht — Duidelijkheid in de brandwachtenmarkt',
        description:
          'Onafhankelijk kennis- en duidingsplatform met context over rolverdeling, verantwoordelijkheid en samenwerking in de brandwachtenmarkt.',
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
