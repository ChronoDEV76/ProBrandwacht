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
    title: 'ProBrandwacht — Uitvoerbare brandveiligheid',
    description:
      'ProBrandwacht is geen klassiek bureau. Wij bewaken uitvoerbaarheid, rolhelderheid en afspraken die in de praktijk kloppen. Soms zeggen we ja. Soms zeggen we nee.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.tariefInzicht,
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
      'Verkennende intake voor zelfstandigen. Geen klassiek bureau en geen garantie op inzet, wel duidelijkheid over uitgangspunten en selectie.',
    keywords: [...seoKeywordClusters.zzpFreelance, ...seoKeywordClusters.platform],
  },

  '/opdrachtgevers': {
    title: 'Opdrachtgevers | Uitvoerbare inzet | ProBrandwacht',
    description:
      'Geen klassiek bureau. Wij bewaken uitvoerbaarheid en rolhelderheid, zodat inzet vooraf klopt en achteraf uitlegbaar blijft. Soms zeggen we nee.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.processSpeed,
      ...seoKeywordClusters.positioning,
    ],
  },

  '/opdrachtgevers/aanmelden': {
    title: 'Verkennende intake voor opdrachtgevers | ProBrandwacht',
    description:
      'Verkennende intake voor opdrachtgevers. Geen offerte of snelle plaatsing; we toetsen rol, risico en afspraken vooraf zodat inzet uitvoerbaar blijft.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.processSpeed,
    ],
  },

  '/platform': {
    title: 'Hoe werkt het platform? | ProBrandwacht',
    description:
      'Uitleg over ProBrandwacht als platform: selectie op uitvoerbaarheid, geen klassiek bemiddelingsbureau en transparantie over afspraken en kosten.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'probrandwacht platform',
      'hoe werkt probrandwacht',
      'brandwacht platform uitleg',
    ],
  },

  '/over-ons': {
    title: 'Over ons – veiligheid én ondernemerschap | ProBrandwacht',
    description:
      'Lees waarom ProBrandwacht is opgericht en waarom we kiezen voor uitvoerbaarheid, selectie en soms nee.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'over probrandwacht',
      'brandwacht manifest',
    ],
  },

  '/missie': {
    title: 'Missie | ProBrandwacht',
    description:
      'Waarom ProBrandwacht bestaat: rol, afspraken en verantwoordelijkheid vooraf helder maken zodat uitvoering toetsbaar blijft.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'missie probrandwacht',
      'brandwacht visie',
    ],
  },

  '/contact': {
    title: 'Contact | ProBrandwacht',
    description:
      'Verkennend contact over rolverdeling, afspraken en uitvoerbaarheid. Geen klassiek bureau, wel duidelijke kaders.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'contact probrandwacht',
      'brandwacht contact',
    ],
  },

  '/belangen': {
    title: 'Belangen van zelfstandige brandwachten | ProBrandwacht',
    description:
      'Context en standpunten over zelfstandig werken in brandveiligheid, met focus op rolverdeling, afspraken en Wet DBA. Voor brandwachten en opdrachtgevers.',
    keywords: [
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.positioning,
      'belangen zelfstandige brandwacht',
      'wet dba brandwacht',
    ],
  },

  '/faq': {
    title: 'FAQ brandwachten & platform | ProBrandwacht',
    description:
      'Antwoorden op veelgestelde vragen over rolhelderheid, uitvoerbaarheid en samenwerken zonder tussenlaag.',
    keywords: [...seoKeywordClusters.core],
  },

  '/voorwaarden': {
    title: 'Algemene voorwaarden | ProBrandwacht',
    description:
      'Voorwaarden van ProBrandwacht: wat het platform wel en niet doet, en hoe verantwoordelijkheid bij samenwerking ligt.',
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
      'Lees hoe informatie en voorbeelden bedoeld zijn: indicatief, ter bewustwording en zonder garanties.',
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
      'Lees hoe ProBrandwacht omgaat met jouw persoonsgegevens en welke maatregelen wij nemen om data van opdrachtgevers en brandwachten te beschermen.',
    keywords: ['privacy brandwacht', 'privacyverklaring', 'gegevensbescherming brandwacht'],
    robots: { index: true, follow: true },
  },

  '/seo-resources': {
    title: 'Bronnen & sectorinformatie over brandwachten | ProBrandwacht',
    description:
      'Betrouwbare bronnen, cijfers en richtlijnen over brandwachten, tarieven en veiligheid in Nederland. Voor opdrachtgevers en professionals.',
    keywords: ['brandwacht bronnen', 'brandwacht data', 'veiligheid bronnen', 'cbs brandwacht'],
  },

  '/steden': {
    title: 'Brandwacht per stad | ProBrandwacht',
    description:
      "Overzicht van stedenpagina's met lokale context en werkbare afspraken. Geen klassiek bureau; uitvoerbaarheid staat voorop.",
    keywords: [...seoKeywordClusters.core, 'brandwacht per stad', 'brandwacht regio'],
  },

  '/steden/[city]': {
    title: 'Zelfstandige brandwacht in jouw stad | ProBrandwacht',
    description:
      'Geen klassiek bureau. Wij bewaken uitvoerbaarheid en rolhelderheid bij inzet in jouw stad. Afspraken blijven contextafhankelijk.',
    keywords: [...seoKeywordClusters.core, 'brandwacht stad', 'brandwacht regio'],
  },

  '/brandwacht-inhuren': {
    title: 'Brandwacht inhuren | ProBrandwacht',
    description:
      'Kaders voor het inhuren van zelfstandige brandwachten: rol, afspraken en verantwoordelijkheid vooraf duidelijk, zonder tussenlaag.',
    keywords: [
      ...seoKeywordClusters.core,
      'brandwacht inhuren',
      'zelfstandige brandwacht',
      ...seoKeywordClusters.positioning,
    ],
  },

  '/brandwacht-inhuren/[city]': {
    title: 'Brandwacht inhuren per stad | ProBrandwacht',
    description:
      'Lokale context en inzetafspraken voor het inhuren van brandwachten. Beschikbaarheid en uitvoerbaarheid blijven leidend.',
    keywords: [...seoKeywordClusters.core, 'brandwacht inhuren', 'brandwacht stad'],
  },

  // --------------------------------------------------
  // ZZP-BRANDWACHTEN
  // --------------------------------------------------

  '/zzp/aanmelden': {
    title: 'Verkennende intake voor zelfstandige brandwachten | ProBrandwacht',
    description:
      'Verkennende intake voor zelfstandige brandwachten. We selecteren op uitvoerbaarheid en rolhelderheid, zonder garantie op inzet.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.tariefInzicht,
      ...seoKeywordClusters.platform,
    ],
  },

  '/voor-brandwachten/aanmelden': {
    title: 'Verkennende intake voor zelfstandige brandwachten | ProBrandwacht',
    description:
      'Verkennende intake voor zelfstandige brandwachten. Je verkent directe samenwerking zonder klassiek bureau, op basis van passendheid.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.platform,
      'zelfstandige brandwacht aanmelden',
      ...seoKeywordClusters.positioning,
    ],
  },

  '/voor-brandwachten': {
    title: 'Voor brandwachten | ProBrandwacht',
    description:
      'Werk als professional, niet als sluitstuk. Wij selecteren op uitvoerbaarheid, rolzuiverheid en professionele ruimte.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.platform,
      'brandwacht aanmelden',
      'zzp brandwacht opdrachten',
      ...seoKeywordClusters.positioning,
    ],
  },

  '/tarief-berekenen': {
    title: 'Tarief berekenen als brandwacht | ProBrandwacht',
    description:
      'Bereken een indicatief uurtarief als zelfstandige brandwacht. Inclusief platformfee, btw en scenario’s zodat je DBA-bewust en uitlegbaar kunt samenwerken.',
    keywords: [...seoKeywordClusters.tariefInzicht, ...seoKeywordClusters.platform],
  },

  '/tone-of-voice': {
    title: 'Communicatiestijl | ProBrandwacht',
    description:
      'Richtlijnen voor de ProBrandwacht toon: ondernemend, eerlijk en menselijk, met aandacht voor context en verantwoordelijkheid.',
    keywords: ['tone of voice', 'communicatiestijl', 'brandwacht communicatie'],
  },

  // --------------------------------------------------
  // PROBRANDWACHT DIRECT / SPOED
  // --------------------------------------------------

  '/direct': {
    title: 'Spoed brandwacht aanvragen (24/7) | ProBrandwacht',
    description:
      'Spoedaanvraag met duidelijke kaders: rol, risico en beslislijnen eerst. Beschikbaarheid blijft contextafhankelijk.',
    keywords: [...seoKeywordClusters.processSpeed, 'spoed brandwacht', 'brandwacht 24/7'],
  },

  '/probrandwacht-direct': {
    title: 'Brandwacht direct regelen (spoed) | ProBrandwacht',
    description:
      'Snel inzetten kan, mits rol, risico en beslislijnen kloppen. Geen klassiek bureau; uitvoerbaarheid staat voorop.',
    keywords: [...seoKeywordClusters.processSpeed, ...seoKeywordClusters.platform],
  },

  '/probrandwacht-direct-spoed': {
    title: 'Spoed brandwacht route | ProBrandwacht',
    description:
      'Spoedroute met minimale, noodzakelijke parameters. Matching hangt af van beschikbaarheid, locatie en risicoprofiel.',
    keywords: [...seoKeywordClusters.processSpeed, 'spoed brandwacht', 'brandwacht spoedroute'],
  },

  // --------------------------------------------------
  // BLOG
  // --------------------------------------------------

  '/blog': {
    title: 'Blog over brandwachten, tarieven & praktijk | ProBrandwacht',
    description:
      'Lees artikelen over rolverdeling, uitvoerbaarheid, tarieven en praktijkcases. Voor opdrachtgevers en zzp-brandwachten.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.tariefInzicht,
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
      title: 'Brandwacht platform | ProBrandwacht',
      description:
        'ProBrandwacht is geen klassiek bureau. We bewaken uitvoerbaarheid, rolhelderheid en afspraken die in de praktijk kloppen.',
      keywords: defaultKeywords,
      robots: { index: true, follow: true },
      alternates: { canonical, languages: { 'nl-NL': canonical } },
      openGraph: {
        title: 'Brandwacht platform | ProBrandwacht',
        description:
          'ProBrandwacht is geen klassiek bureau. We bewaken uitvoerbaarheid, rolhelderheid en afspraken die in de praktijk kloppen.',
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
        title: 'Brandwacht platform | ProBrandwacht',
        description:
          'ProBrandwacht is geen klassiek bureau. We bewaken uitvoerbaarheid, rolhelderheid en afspraken die in de praktijk kloppen.',
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
