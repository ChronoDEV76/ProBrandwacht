import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getSignupUrl } from '@/lib/config'

// --- Metadata ---------------------------------------------------------------
// Fixes:
// 1) Provide a fully valid Next.js Metadata object.
// 2) Add metadataBase so canonical can be relative.
// 3) Structure `alternates` with a languages map.
// 4) Ensure no trailing comma after openGraph.
export const metadata: Metadata = {
  metadataBase: new URL('https://www.probrandwacht.nl'),
  title: {
    default: 'Voor opdrachtgevers | Eerlijk brandwachten inhuren – ProSafetyMatch',
    template: '%s | ProSafetyMatch'
  },
  description:
    'Huur brandwachten in zonder verborgen marges. Eerlijk, DBA‑proof en met zekerheid van betaling via escrow. Geef je wensen door en bouw mee aan het platform.',
  alternates: {
    canonical: '/opdrachtgevers',
    languages: {
      'nl-NL': '/opdrachtgevers'
    }
  },
  openGraph: {
    url: 'https://www.probrandwacht.nl/opdrachtgevers',
    type: 'website',
    siteName: 'ProBrandwacht.nl',
    title: 'Voor opdrachtgevers | Eerlijk brandwachten inhuren – ProSafetyMatch',
    description:
      'ProSafetyMatch laat je eerlijk brandwachten inhuren: duidelijk tarief, certificaten-inzicht en escrow-betaling. Minder risico, meer motivatie en controle.'
  }
}

export default function OpdrachtgeversPage() {
  const signupUrl = getSignupUrl()
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="mb-12">
        <div className="rounded-3xl bg-slate-50 p-8 md:p-12">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Huur brandwachten in zonder verborgen marges
          </h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            Met ProSafetyMatch weet je vooraf wat je betaalt én dat de brandwacht eerlijk beloond wordt. Eerlijk,
            DBA‑proof en met zekerheid van betaling via <span className="font-medium">escrow</span>.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            We leggen geen tarieven op. Jullie bepalen het tarief dat past bij de opdracht, terwijl wij fee, escrow en de
            benodigde documenten inzichtelijk maken. Zo voorkom je verrassingen in de tariefverdeling en hou je
            gemotiveerde professionals op de werkvloer.
          </p>
        </div>
      </section>

      {/* Pijnpunten */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Jullie uitdaging</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card title="Onduidelijke tarieven" text="Wat gaat er nu echt naar de brandwacht? Bij ons zie je de volledige kostenopbouw en versnelde planning." />
          <Card title="Wisselende motivatie" text="Eerlijke beloning en snelle planning zorgen voor betrokken professionals op de werkvloer." />
          <Card title="Risico & compliance" text="DBA‑proof afspraken, certificaten‑inzicht en escrow verkleinen je operationeel risico." />
        </div>
      </section>

      {/* Oplossing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Onze oplossing</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ListItem title="Eerlijke tarieven">
            Jij ziet exact wat de professional ontvangt en wat de platformfee is. We werken met een vaste 10%
            platformfee en 1–2% escrowkosten voor rekening van de opdrachtgever. Geen verborgen marges.
          </ListItem>
          <ListItem title="DBA‑proof overeenkomsten">
            Heldere rol‑ en resultaatafspraken. De overeenkomst is altijd tussen opdrachtgever en professional.
          </ListItem>
          <ListItem title="Escrow‑betaling & snelheid">
            Jij betaalt vooraf, uitbetaling volgt na correcte uitvoering. Zekerheid én tempo voor beide kanten.
          </ListItem>
          <ListItem title="Gecertificeerd netwerk">
            Inzicht in certificaten, reviews en beschikbaarheid. Vraag gericht de juiste expertise uit.
          </ListItem>
        </div>
      </section>

      {/* Wat levert het op */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Wat dit jou oplevert</h2>
        <ul className="mt-5 grid list-outside gap-3 md:grid-cols-2">
          <Bullet> Minder risico door aantoonbare certificaten en escrow‑betalingen. </Bullet>
          <Bullet> Meer motivatie op de werkvloer dankzij eerlijke beloning. </Bullet>
          <Bullet> Tijdwinst: direct contact en inzicht, zonder tussenlaag. </Bullet>
          <Bullet> Controle via dashboards voor opdrachten en kosten. </Bullet>
        </ul>
      </section>

      <section className="mb-12 rounded-2xl border bg-amber-50 p-6 text-sm text-amber-900">
        <h3 className="text-lg font-semibold text-amber-900">Waarom €30/u vaak tegenvalt</h3>
        <p className="mt-2">
          Een tarief van €30/u lijkt scherp, maar leidt regelmatig tot minder motivatie, meer verloop en hogere risico’s
          bij specialistische taken. ProSafetyMatch laat opdrachtgever en professional samen een passend tarief kiezen en
          maakt de volledige kostenopbouw zichtbaar. Zo blijft kwaliteit behouden en weet iedereen waarvoor hij tekent.
        </p>
      </section>

      {/* Samen bouwen */}
      <section className="mb-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold">Bouw met ons mee</h2>
        <p className="mt-2 max-w-3xl text-slate-700">
          Het platform is modulair. Geef in je aanmelding aan welke certificaten, rapportages en helder inzicht je wilt
          zien. Zo maken we samen de norm voor eerlijk en veilig samenwerken.
        </p>
        <div className="mt-5">
          <PrimaryCTA href={signupUrl}>Meld je bedrijf aan</PrimaryCTA>
        </div>
      </section>

      {/* Disclaimer / trust */}
      <section className="mt-4 text-sm text-slate-600">
        <p>
          <strong>Let op:</strong> ProSafetyMatch is <span className="font-semibold">geen bemiddelingsbureau</span> maar
          een onafhankelijk platform. De overeenkomst wordt altijd rechtstreeks gesloten tussen opdrachtgever en
          professional.
        </p>
      </section>
    </main>
  )
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-slate-700">{text}</p>
    </div>
  )
}

function ListItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-slate-700">{children}</div>
    </div>
  )
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-6">
      <span className="absolute left-0 top-1.5 inline-block h-2 w-2 rounded-full bg-brand-600" />
      <span className="text-slate-700">{children}</span>
    </li>
  )
}

function PrimaryCTA({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500"
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className="rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500">
      {children}
    </Link>
  )
}

// SecondaryCTA verwijderd; primaire CTA volstaat als enkele oproep.
