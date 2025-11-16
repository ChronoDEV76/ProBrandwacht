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

// centrale map van route → metadata
export const routeMeta: Record<string, RouteMeta> = {
  // --------------------------------------------------
  // HOMEPAGE
  // --------------------------------------------------
  '/': {
    title: 'ProBrandwacht – Slimmer werken. Eerlijk verdienen. Samen vooruit.',
    description:
      'Bereken jouw echte waarde als professional. Eerlijke tarieven zonder intermediair. Samen bouwen we aan een gezonde veiligheidsmarkt.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.tariefTransparantie,
    ],
    robots: { index: true, follow: true },
  },

  // --------------------------------------------------
  // (SITE) – MARKETINGPAGINA’S
  // --------------------------------------------------

  '/opdrachtgevers': {
    title: 'Brandwacht aanvragen voor jouw organisatie – direct geregeld',
    description:
      'Vind snel een gecertificeerde brandwacht voor jouw organisatie. Directe matching, heldere tarieven en volledig DBA-proof samenwerken via ProBrandwacht.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.processSpeed,
    ],
  },

  '/opdrachtgevers/aanmelden': {
    title: 'Aanmelden als opdrachtgever – direct toegang tot brandwachten',
    description:
      'Meld je aan als opdrachtgever en plaats direct aanvragen voor brandwachten. Binnen enkele minuten gekoppeld aan beschikbare professionals met transparante tarieven.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.processSpeed,
    ],
  },

  '/brandwacht-inhuren': {
    title: 'Brandwacht inhuren – transparante tarieven & directe planning',
    description:
      'Huur een gecertificeerde brandwacht in zonder traditionele intermediair. Direct contact, snelle beschikbaarheid en heldere, transparante tarieven via ProBrandwacht.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.platform,
      ...seoKeywordClusters.processSpeed,
    ],
  },

  // dynamische steden onder (site)/brandwacht-inhuren/[city]
  '/brandwacht-inhuren/[city]': {
    title: 'Brandwacht inhuren in jouw regio – direct & transparant',
    description:
      'Huur direct een brandwacht in jouw regio via ProBrandwacht. Transparante prijzen, directe matching en gecertificeerde professionals zonder klassiek bureau.',
    keywords: [
      ...seoKeywordClusters.core,
      ...seoKeywordClusters.processSpeed,
      ...seoKeywordClusters.platform,
    ],
  },

  '/missie': {
    title: 'Missie van ProBrandwacht – een eerlijke markt voor professionals',
    description:
      'ProBrandwacht bouwt aan een markt waarin brandwachten eerlijk verdienen, direct samenwerken met opdrachtgevers en veilig kunnen werken zonder onnodige marges.',
    keywords: [...seoKeywordClusters.platform, ...seoKeywordClusters.tariefTransparantie],
  },

  '/faq': {
    title: 'Veelgestelde vragen over brandwachten & platform | ProBrandwacht',
    description:
      'Antwoorden op veelgestelde vragen van opdrachtgevers en zzp-brandwachten over tarieven, platformmatching, contracten, wet DBA en veiligheid.',
    keywords: [...seoKeywordClusters.core],
  },

  '/privacy': {
    title: 'Privacyverklaring ProBrandwacht',
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
    title: 'Brandwacht nodig in jouw stad? Alle regio’s op een rij.',
    description:
      'Bekijk in één overzicht in welke steden en regio’s je via ProBrandwacht direct een brandwacht kunt aanvragen. Snel, transparant en zonder verborgen marges.',
    keywords: ['brandwacht steden', 'brandwacht regio', ...seoKeywordClusters.core],
  },

  '/steden/[city]': {
    title: 'Brandwacht nodig in jouw stad – direct via ProBrandwacht',
    description:
      'Huur direct een brandwacht in jouw stad. ProBrandwacht koppelt je aan beschikbare professionals met transparante tarieven en directe communicatie.',
    keywords: [...seoKeywordClusters.core, 'brandwacht stad', 'brandwacht regio'],
  },

  // --------------------------------------------------
  // BRANCHES / SPECIALISATIES
  // --------------------------------------------------

  '/brandwacht/haven-industrie': {
    title: 'Brandwacht haven & industrie – direct inzetbaar | ProBrandwacht',
    description:
      'Brandwachten voor haventerreinen en industriële omgevingen. Gecertificeerde professionals met ervaring in hoog-risico werk en shutdowns.',
    keywords: [...seoKeywordClusters.niches, 'haven brandwacht', 'industriële brandwacht'],
  },

  '/brandwacht/mangatwacht': {
    title: 'Mangatwacht / buitenwacht direct boeken | ProBrandwacht',
    description:
      'Specialisten in mangatwacht en buitenwacht voor besloten ruimtes. Ervaren professionals, transparante tarieven en directe planning via het platform.',
    keywords: [...seoKeywordClusters.niches, 'mangatwacht', 'buitenwacht'],
  },

  '/brandwacht/turnaround-stop': {
    title: 'Turnaround- en stop-brandwachten – ervaren professionals',
    description:
      'Gecertificeerde brandwachten voor turnarounds en stops. Direct inzetbaar via ProBrandwacht met heldere afspraken en transparante tarieven.',
    keywords: [...seoKeywordClusters.niches, 'turnaround brandwacht', 'shutdown brandwacht'],
  },

  // oudere / alternatieve locatie-URL: /brandwacht-huren/[city]
  '/brandwacht-huren/[city]': {
    title: 'Brandwacht huren in jouw stad – snel geregeld',
    description:
      'Via ProBrandwacht huur je direct een brandwacht in jouw stad. Transparante tarieven en directe match met zzp-brandwachten.',
    keywords: [...seoKeywordClusters.core, ...seoKeywordClusters.processSpeed],
  },

  // --------------------------------------------------
  // ZZP-BRANDWACHTEN
  // --------------------------------------------------

  '/zzp/aanmelden': {
    title: 'Aanmelden als zzp-brandwacht – direct opdrachten ontvangen',
    description:
      'Meld je aan als zzp-brandwacht en ontvang opdrachten direct via ProBrandwacht. Meer regie over je planning, transparante tarieven en geen verborgen marges.',
    keywords: [
      ...seoKeywordClusters.zzpFreelance,
      ...seoKeywordClusters.tariefTransparantie,
      ...seoKeywordClusters.platform,
    ],
  },

  // --------------------------------------------------
  // PROBRANDWACHT DIRECT / SPOED
  // --------------------------------------------------

  '/probrandwacht-direct': {
    title: 'Brandwacht direct regelen via ProBrandwacht Direct',
    description:
      'In spoed een brandwacht nodig? ProBrandwacht Direct koppelt je binnen minuten aan beschikbare professionals met de juiste certificaten.',
    keywords: [...seoKeywordClusters.processSpeed, ...seoKeywordClusters.platform],
  },

  // (site)-variant van ProBrandwacht Direct
  '/probrandwacht-direct/site': {
    title: 'ProBrandwacht Direct – spoedaanvragen voor brandwachten',
    description:
      'Spoedaanvraag voor een brandwacht? Via ProBrandwacht Direct regel je snel en transparant een professional, zonder tussenbureau.',
    keywords: [...seoKeywordClusters.processSpeed],
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
      ...seoKeywordClusters.tariefTransparantie,
      ...seoKeywordClusters.zzpFreelance,
    ],
  },

  // blog/[slug] gebruikt dynamic metadata uit MDX frontmatter → geen vaste entry nodig
}

// Helper om metadata per route op te halen
export function getRouteMetadata(pathname: string): Metadata {
  const meta = routeMeta[pathname]

  if (!meta) {
    return {
      title: 'ProBrandwacht – Platform voor brandwachten',
      description:
        'ProBrandwacht is het onafhankelijke platform dat brandwachten en opdrachtgevers direct verbindt, met transparante tarieven en directe planning.',
      keywords: defaultKeywords,
      robots: { index: true, follow: true },
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords ?? defaultKeywords,
    robots: meta.robots ?? { index: true, follow: true },
  }
}
