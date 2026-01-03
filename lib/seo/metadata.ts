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
    title: 'ProBrandwacht – Het platform voor gecertificeerde brandwachten',
    description:
      'Voor brandwachten die écht ondernemen. Werk zelfstandig, bepaal je tarief en kies opdrachten die passen bij jouw vak. Heldere, toetsbare afspraken en DBA-bewuste samenwerking, zonder verborgen marges.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.tariefInzicht,
    ],
    robots: { index: true, follow: true },
  },

  // --------------------------------------------------
  // (SITE) – MARKETINGPAGINA’S
  // --------------------------------------------------

  '/opdrachtgevers': {
    title: 'Professionele brandwachten, eenvoudig en betrouwbaar geregeld | ProBrandwacht',
    description:
      'Ervaren brandwachten zonder gedoe, tussenlagen of ruis. Gecertificeerde professionals, eerlijke tarieven en samenwerking binnen Wet DBA via ProBrandwacht.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.processSpeed,
    ],
  },

  '/opdrachtgevers/aanmelden': {
    title: 'Aanmelden als opdrachtgever – direct toegang tot brandwachten | ProBrandwacht',
    description:
      'Meld je aan als opdrachtgever en plaats direct aanvragen voor brandwachten. Snel gekoppeld, afhankelijk van beschikbaarheid, aan professionals met eerlijke tarieven.',
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
    keywords: [...seoKeywordClusters.platform, 'over probrandwacht', 'brandwacht manifest'],
  },

  '/belangen': {
    title: 'Belangen van zelfstandige brandwachten | ProBrandwacht',
    description:
      'Standpunten en context rond zelfstandig werken in brandveiligheid: heldere afspraken, eigen regie en samenwerken binnen Wet DBA. Voor brandwachten en opdrachtgevers.',
    keywords: [...seoKeywordClusters.platform, 'belangen zelfstandige brandwacht', 'wet dba brandwacht'],
  },

  '/faq': {
    title: 'Veelgestelde vragen over brandwachten & platform | ProBrandwacht',
    description:
      'Antwoorden op veelgestelde vragen van opdrachtgevers en zzp-brandwachten over tarieven, platformmatching, contracten, wet DBA en veiligheid.',
    keywords: [...seoKeywordClusters.core],
  },

  '/voorwaarden': {
    title: 'Algemene voorwaarden | ProBrandwacht',
    description:
      'De spelregels van ProBrandwacht: wat je van het platform mag verwachten, welke afspraken indicatief zijn en wat de verantwoordelijkheid is van brandwachten en opdrachtgevers.',
    keywords: ['algemene voorwaarden', 'voorwaarden probrandwacht', ...seoKeywordClusters.platform],
  },

  '/disclaimer': {
    title: 'Disclaimer | ProBrandwacht',
    description:
      'Lees hoe informatie en rekenvoorbeelden op ProBrandwacht.nl bedoeld zijn: indicatief, ter bewustwording en zonder garanties.',
    keywords: ['disclaimer', 'aansprakelijkheid', ...seoKeywordClusters.platform],
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
      'Overzicht van betrouwbare bronnen, cijfers en richtlijnen rondom brandwachten, tarieven en veiligheid in Nederland. Gebaseerd op o.a. CBS, cao en sectorrapporten.',
    keywords: ['brandwacht bronnen', 'brandwacht data', 'veiligheid bronnen', 'cbs brandwacht'],
  },

  '/steden': {
    title: 'Brandwacht per stad | ProBrandwacht',
    description:
      'Overzicht van stedenpagina’s voor zelfstandige brandwachten en opdrachtgevers. Lokale context, inzettypes en afspraken per stad, met heldere routes om samen te werken.',
    keywords: [...seoKeywordClusters.core, 'brandwacht per stad', 'brandwacht regio'],
  },

  '/steden/[city]': {
    title: 'Brandwacht nodig in jouw stad – direct geregeld | ProBrandwacht',
    description:
      'Huur direct een brandwacht in jouw stad. ProBrandwacht koppelt je aan beschikbare professionals met eerlijke tarieven en directe communicatie.',
    keywords: [...seoKeywordClusters.core, 'brandwacht stad', 'brandwacht regio'],
  },

  // --------------------------------------------------
  // ZZP-BRANDWACHTEN
  // --------------------------------------------------

  '/zzp/aanmelden': {
    title: 'Aanmelden als zzp-brandwacht – direct opdrachten ontvangen | ProBrandwacht',
    description:
      'Werk als een professional. Ondernemend en vrij. Meld je aan als zzp-brandwacht, bepaal je tarief en kies opdrachten die bij je passen — DBA-bewust en zonder verborgen marges.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.tariefInzicht,
      ...seoKeywordClusters.platform,
    ],
  },

  '/voor-brandwachten/aanmelden': {
    title: 'Aanmelden als zelfstandige brandwacht | ProBrandwacht',
    description:
      'Geef je interesse door als zelfstandige brandwacht. Je verkent directe samenwerking zonder bureau; geen garantie op inzet en selectie op basis van passendheid.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.platform,
      'zelfstandige brandwacht aanmelden',
    ],
  },

  '/voor-brandwachten': {
    title: 'Voor brandwachten – professionaliteit, vrijheid en eerlijkheid | ProBrandwacht',
    description:
      'Een platform voor brandwachten die ondernemen. Kies je opdrachten, bepaal je tarief en werk eerlijk en DBA-bewust met toegang tot ProSafetyMatch.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.platform,
      'brandwacht aanmelden',
      'zzp brandwacht opdrachten',
    ],
  },

  '/tarief-berekenen': {
    title: 'Tarief berekenen als brandwacht (incl. platformfee) | ProBrandwacht',
    description:
      'Bereken een indicatief uurtarief als zelfstandige brandwacht. Inclusief platformfee, btw en scenario’s zodat je DBA-bewust en uitlegbaar kunt samenwerken.',
    keywords: [...seoKeywordClusters.tariefInzicht, ...seoKeywordClusters.platform],
  },

  '/tone-of-voice': {
    title: 'Communicatiestijl | ProBrandwacht',
    description:
      'Tone of voice en richtlijnen voor communicatie: ondernemend, eerlijk, respectvol, toekomstgericht en menselijk.',
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
