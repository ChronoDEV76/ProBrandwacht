import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ProBrandwacht.nl | Veiligheid, maar dan eerlijk geregeld',
  description:
    'ProBrandwacht is het onafhankelijke informatieplatform voor brandwachten en opdrachtgevers. Ontdek hoe tarieven, DBA-regels en ProSafetyMatch samenwerken voor eerlijke, transparante opdrachten.',
  keywords: [
    'probrandwacht',
    'prosafetymatch',
    'brandwacht platform',
    'brandwacht inhuren',
    'zzp brandwacht',
    'dba proof brandwacht',
    'escrow brandwacht',
    'brandveiligheid zzp',
  ],
  alternates: { canonical: '/', languages: { 'nl-NL': '/' } },
  other: { hreflang: 'nl-NL' },
  openGraph: {
    title: 'ProBrandwacht.nl | Veiligheid, maar dan eerlijk geregeld',
    description:
      'Bewustwording, transparantie en digitale onafhankelijkheid voor brandwachten en opdrachtgevers. Powered by ProSafetyMatch.',
    url: 'https://www.probrandwacht.nl/',
    images: [{ url: '/og-home.jpg', width: 1200, height: 630, alt: 'ProBrandwacht platform overzicht' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProBrandwacht',
    creator: '@ProBrandwacht',
    images: ['/og-home.jpg'],
  },
}

const whyHighlights = [
  {
    title: 'Tariefopbouw ontleed',
    description: 'Begrijp hoe uurprijzen in elkaar zitten volgens cao-logica, marktcijfers en kostprijsmodellen voor zelfstandigen.',
  },
  {
    title: 'DBA helder gemaakt',
    description: "Leer welke afspraken opdrachtgevers en zzp'ers moeten vastleggen om aantoonbaar DBA-proof te werken.",
  },
  {
    title: 'Digitale alternatieven',
    description: 'Ontdek hoe ProSafetyMatch matching, verificatie en overeenkomsten faciliteert zonder verborgen marges.',
  },
]

const transparencyPillars = [
  'Overeenkomst altijd rechtstreeks tussen opdrachtgever en professional.',
  'Veilige ID-verificatie (iDIN) en certificaatcontrole voor inzet.',
  'Realtime inzicht in tariefverdeling, platformfee en netto-opbrengst.',
  'Rolvast en DBA-proof doordat iedereen zijn eigen verplichtingen houdt.',
]

const knowledgeResources = [
  {
    label: 'Tariefcalculator',
    description: 'Reken direct uit hoe tarief, platformfee en escrow samenkomen per stad en inzet.',
    href: '/steden/amsterdam#tarief-calculator',
  },
  {
    label: 'DBA, aansprakelijkheid & escrow',
    description: 'Lees hoe escrow-betalingen en heldere contracten zorgen voor zekerheid aan beide kanten.',
    href: '/faq',
  },
  {
    label: 'Tools en checklists',
    description: 'Gebruik hulpmiddelen voor kostprijsberekening, certificaatbeheer en communicatie met opdrachtgevers.',
    href: '/manifest',
  },
]

export default function HomePage() {
  return (
    <div className="relative w-full bg-gradient-to-r from-brand-50 to-white">
      <div className="relative text-slate-900">
        <div className="relative mx-auto max-w-5xl space-y-16 px-4 pb-16 pt-10 sm:px-6 md:px-8 md:pb-20 md:pt-16">
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-xs font-medium text-brand-700 shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Platform, geen bemiddelaar — overeenkomst direct met opdrachtgever of professional.
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-wide text-brand-700">Bewustwording voor brandwachten en opdrachtgevers</p>
              <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Veiligheid, maar dan eerlijk geregeld.</h1>
              <p className="max-w-3xl text-lg text-slate-700">
                ProBrandwacht is het onafhankelijke informatie- en aanmeldplatform voor professionals in de industriële en
                brandveiligheidssector. We laten zien hoe de markt echt werkt: transparant, eerlijk en volgens de regels.
              </p>
              <p className="max-w-3xl text-slate-700">
                Of je nu als brandwacht, mangatwacht, buitenwacht of securityspecialist werkt, of als opdrachtgever verantwoordelijk bent
                voor veiligheid op locatie - wij helpen beide kanten om op een moderne, rechtvaardige manier samen te werken.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/steden/amsterdam#tarief-calculator"
                className="inline-flex items-center rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
              >
                Bekijk tariefcalculator
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-brand-100 bg-white/80 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Waarom ProBrandwacht?</h2>
            <p className="mt-3 text-slate-700">
              De veiligheidsbranche is cruciaal, maar vaak ondoorzichtig. Tarieven, marges en schakels van tussenpartijen maken het lastig
              om te zien wie waarvoor verantwoordelijk is. Wij brengen orde in die marktstructuur.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {whyHighlights.map(item => (
                <li key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-700">
                  <p className="text-base font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6 rounded-3xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm sm:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-amber-900">Wij zijn geen bureau</h2>
              <p className="text-slate-800">
                ProBrandwacht bemiddelt niet en sluit geen overeenkomsten namens opdrachtgevers. We bieden bewustwording, documentatie en
                digitale tools. Het daadwerkelijke contract komt tot stand via ProSafetyMatch - het platform dat matching, verificaties en
                escrow-betalingen faciliteert zonder de rol van werkgever over te nemen.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-300 bg-white/80 p-4 text-xs font-medium text-amber-900">
              Platform, geen bemiddelaar — iedere overeenkomst wordt rechtstreeks gesloten tussen opdrachtgever en professional.
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Transparantie & vertrouwen via ProSafetyMatch</h2>
            <p className="mt-3 text-slate-700">
              Iedere samenwerking op ProSafetyMatch is ingericht op transparantie, zelfstandigheid en zekerheid.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {transparencyPillars.map(item => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <span className="mt-1 text-lg" aria-hidden="true">
                    🔐
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6 rounded-3xl border border-brand-100 bg-brand-50/70 p-6 shadow-sm sm:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-brand-800">Kennis en hulpmiddelen</h2>
              <p className="text-slate-700">
                We verzamelen bronnen, rekenmodellen en praktische tips zodat jij gefundeerde keuzes kunt maken voor jouw organisatie of
                praktijk.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {knowledgeResources.map(resource => (
                <li key={resource.label} className="flex h-full flex-col justify-between rounded-2xl border border-brand-100 bg-white/90 p-4">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{resource.label}</p>
                    <p className="mt-2 text-sm text-slate-700">{resource.description}</p>
                  </div>
                  <Link
                    href={resource.href}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
                  >
                    Lees meer
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-slate-800 shadow-sm sm:p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">De toekomst van brandveilig werken</h2>
              <p>
                Onze missie: een branche waarin professionals zelf de regie houden, opdrachtgevers verantwoord inkopen en veiligheid nooit
                ten koste gaat van transparantie. We luisteren continu naar feedback van zowel zzp&apos;ers als opdrachtgevers om taal, tools en
                processen te blijven aanscherpen.
              </p>
              <p>
                ProBrandwacht - bewustwording, transparantie en digitale onafhankelijkheid.{' '}
                <span className="font-semibold text-brand-700">Powered by ProSafetyMatch.nl</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
