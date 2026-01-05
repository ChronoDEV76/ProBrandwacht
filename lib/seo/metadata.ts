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
    title: 'ProBrandwacht | Platform voor brandwachten',
    description:
      'Platform voor zelfstandige brandwachten en opdrachtgevers. Heldere afspraken, directe samenwerking en DBA-bewuste keuzes zonder bureau.',
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
    title: 'Aanmelden verkenningsfase | ProBrandwacht',
    description:
      'Interesse in de verkenningsfase voor zelfstandigen. Geen bureau en geen garantie op inzet, wel updates over pilots en uitgangspunten.',
    keywords: [...seoKeywordClusters.zzpFreelance, ...seoKeywordClusters.platform],
  },

  '/opdrachtgevers': {
    title: 'Brandwachten inhuren zonder ruis | ProBrandwacht',
    description:
      'Ervaren brandwachten zonder gedoe, tussenlagen of ruis. Gecertificeerde professionals, eerlijke tarieven en samenwerking binnen Wet DBA via ProBrandwacht.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.processSpeed,
      ...seoKeywordClusters.positioning,
    ],
  },

  '/opdrachtgevers/aanmelden': {
    title: 'Opdrachtgever aanmelden | ProBrandwacht',
    description:
      'Meld je aan als opdrachtgever en plaats aanvragen voor brandwachten. Heldere afspraken, directe communicatie en DBA-bewuste inzet.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.processSpeed,
    ],
  },

  '/over-ons': {
    title: 'Over ons – veiligheid én ondernemerschap | ProBrandwacht',
    description:
      'Lees waarom ProBrandwacht is opgericht, onze missie en visie, kernwaarden en manifest. Voor een moderne, eerlijke en toekomstbestendige brandwachtsector.',
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
      'Waarom ProBrandwacht bestaat: samenwerking vooraf helder maken zodat uitvoering rustig, toetsbaar en DBA-bewust blijft in de praktijk.',
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
      'Stel je vraag over rolverdeling, afspraken of inzet. We helpen je de juiste context te kiezen en helderheid te krijgen voor samenwerking.',
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
      'Antwoorden op veelgestelde vragen van opdrachtgevers en zzp-brandwachten over tarieven, platformmatching, contracten, wet DBA en veiligheid.',
    keywords: [...seoKeywordClusters.core],
  },

  '/voorwaarden': {
    title: 'Algemene voorwaarden | ProBrandwacht',
    description:
      'De voorwaarden van ProBrandwacht: wat het platform wel en niet doet, en hoe verantwoordelijkheid bij samenwerking ligt. Lees de spelregels en beperkingen.',
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
      'Lees hoe informatie en rekenvoorbeelden op ProBrandwacht.nl bedoeld zijn: indicatief, ter bewustwording en zonder garanties.',
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
      "Overzicht van stedenpagina's voor brandwachten en opdrachtgevers, met lokale context, inzettypes en heldere routes om samen te werken.",
    keywords: [...seoKeywordClusters.core, 'brandwacht per stad', 'brandwacht regio'],
  },

  '/steden/[city]': {
    title: 'Brandwacht inhuren in jouw stad | ProBrandwacht',
    description:
      'Huur direct een brandwacht in jouw stad. ProBrandwacht koppelt je aan beschikbare professionals met eerlijke tarieven en directe communicatie.',
    keywords: [...seoKeywordClusters.core, 'brandwacht stad', 'brandwacht regio'],
  },

  '/brandwacht-inhuren': {
    title: 'Brandwacht inhuren | ProBrandwacht',
    description:
      'Kaders voor het inhuren van zelfstandige brandwachten: rol, afspraken en verantwoordelijkheid vooraf duidelijk, zonder tussenlagen.',
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
      'Lokale pagina met context en inzetafspraken voor het inhuren van brandwachten. Beschikbaarheid en afspraken blijven leidend.',
    keywords: [...seoKeywordClusters.core, 'brandwacht inhuren', 'brandwacht stad'],
  },

  // --------------------------------------------------
  // ZZP-BRANDWACHTEN
  // --------------------------------------------------

  '/zzp/aanmelden': {
    title: 'Aanmelden als zzp-brandwacht | ProBrandwacht',
    description:
      'Meld je aan als zzp-brandwacht en verken opdrachten die passen bij jouw vak. Heldere afspraken en DBA-bewuste samenwerking.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.tariefInzicht,
      ...seoKeywordClusters.platform,
    ],
  },

  '/voor-brandwachten/aanmelden': {
    title: 'Aanmelden als zelfstandige brandwacht | ProBrandwacht',
    description:
      'Geef je interesse door als zelfstandige brandwacht. Je verkent directe samenwerking zonder bureau, op basis van passendheid.',
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
      'Een platform voor brandwachten die ondernemen. Kies je opdrachten, bepaal je tarief en werk eerlijk en DBA-bewust met toegang tot ProSafetyMatch.',
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
      'Dien een spoedaanvraag in voor een gecertificeerde brandwacht. Snelle matching, duidelijke afspraken en DBA-bewust samenwerken.',
    keywords: [...seoKeywordClusters.processSpeed, 'spoed brandwacht', 'brandwacht 24/7'],
  },

  '/probrandwacht-direct': {
    title: 'Brandwacht direct regelen (spoed) | ProBrandwacht',
    description:
      'In spoed een brandwacht nodig? ProBrandwacht Direct koppelt je binnen minuten aan beschikbare professionals met de juiste certificaten.',
    keywords: [...seoKeywordClusters.processSpeed, ...seoKeywordClusters.platform],
  },

  '/probrandwacht-direct-spoed': {
    title: 'Spoed brandwacht route | ProBrandwacht',
    description:
      'Spoedroute voor een snelle aanvraag met minimale parameters. Matching hangt af van beschikbaarheid, locatie, context en risicoprofiel.',
    keywords: [...seoKeywordClusters.processSpeed, 'spoed brandwacht', 'brandwacht spoedroute'],
  },

  // --------------------------------------------------
  // BLOG
  // --------------------------------------------------

  '/blog': {
    title: 'Blog over brandwachten, tarieven & praktijk | ProBrandwacht',
    description:
      'Lees artikelen over inhuur, zzp-schap, tarieven, wetgeving en praktijkcases. Voor zowel opdrachtgevers als zzp-brandwachten.',
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
        'ProBrandwacht is het onafhankelijke platform dat brandwachten en opdrachtgevers direct verbindt, met eerlijke tarieven en directe planning.',
      keywords: defaultKeywords,
      robots: { index: true, follow: true },
      alternates: { canonical, languages: { 'nl-NL': canonical } },
      openGraph: {
        title: 'Brandwacht platform | ProBrandwacht',
        description:
          'ProBrandwacht is het onafhankelijke platform dat brandwachten en opdrachtgevers direct verbindt, met eerlijke tarieven en directe planning.',
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
          'ProBrandwacht is het onafhankelijke platform dat brandwachten en opdrachtgevers direct verbindt, met eerlijke tarieven en directe planning.',
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
