
import Link from "next/link"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getSignupUrl } from "@/lib/config"
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/opdrachtgevers');



export default function OpdrachtgeversPage() {
  const signupUrl = getSignupUrl()
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Voor opdrachtgevers', url: 'https://www.probrandwacht.nl/opdrachtgevers' },
  ]
  const extraFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opdrachtgeverFaq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
  return (
    <main className="mx-auto w-full min-h-full max-w-6xl space-y-12 px-4 py-10">
      <StructuredBreadcrumbs items={breadcrumbItems} />
      {/* Hero */}
      <section className="space-y-6 rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
        <div className="rounded-3xl bg-slate-50 p-8 md:p-12 ring-1 ring-slate-200">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Huur veiligheids professionals in zonder verborgen marges – snel, eerlijk en
            DBA-proof
          </h1>
          {/* __seo-badges */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Samen zetten we de nieuwe standaard voor veiligheids professionals
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Aangescherpt met feedback uit de sector (200+ professionals)
            </span>
          </div>
{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/probrandwacht-direct" className="underline">ProBrandwacht Direct</a>.
</div>
{/* SEO-UPGRADE END */}
          <p className="mt-3 max-w-3xl text-slate-700">
            ProBrandwacht werft zzp-brandwachten en opdrachtgevers voor <strong>ProSafetyMatch</strong>, het platform in ontwikkeling waar safety professionals en opdrachtgevers elkaar straks ontmoeten.
            Tot de lancering kan je een directe inzet wens afhandelen via het actuele ProBrandwacht-netwerk: jullie bepalen budget en certificeringseisen, wij regelen het binnen ons actuele netwerk.
            Eerlijke beloning, duidelijke betaalafspraken en aantoonbare certificaten geven nu al grip zonder extra ketenpartijen; zodra ProSafetyMatch live staat, schuiven dezelfde dossiers door met escrow-ready betalingen en Wet DBA-modelclausules.
          </p>
          <div className="mt-6">
            <PrimaryCTA href={signupUrl}>Meld je bedrijf aan</PrimaryCTA>
          </div>
        </div>
      </section>


      {/* Uitdaging */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Jullie uitdaging</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card
            title="Onduidelijke tarieven"
            text="Bureaus houden vaak €15–25 per uur marge over; bij ons zie je de volledige kostenopbouw inclusief 15% platformfee en nettobedrag."
          />
          <Card
            title="Wisselende motivatie"
            text="Eerlijke beloning en voorspelbare afspraken houden mensen gemotiveerd."
          />
          <Card
            title="Risico & compliance"
            text="Checklist voor Wet DBA, Arbowet en BGBOP-eisen in één dossier verlaagt je risico."
          />
        </div>
      </section>

      {/* Oplossing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Onze oplossing (straks in ProSafetyMatch)</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ListItem title="Eerlijke tarieven">
            Vaste 15% platformfee plus 1,5–2% escrowkosten en een duidelijk netto tarief. Geen verborgen marges,
            volledig inzicht in de verdeling.
          </ListItem>
          <ListItem title="Heldere afspraken">
            We leggen rol en resultaat contractueel vast voor maximale duidelijkheid.
          </ListItem>
          <ListItem title="Snel schakelen">
            Directe inzetten handel je nu af via het ProBrandwacht-netwerk; straks automatiseert ProSafetyMatch dezelfde betaalafspraken met escrow.
          </ListItem>
          <ListItem title="Gecertificeerd netwerk">
            Inzicht in certificaten, en beschikbaarheid.
          </ListItem>
        </div>
      </section>

      {/* 3 stappen */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Veelgestelde vragen</h2>
        <div className="mt-4 space-y-3">
          {opdrachtgeverFaq.map(item => (
            <details key={item.question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900 group-open:text-brand-700">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold">Zo werkt het in 3 stappen</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Step n={1} title="Budget & eisen">
            Stel je budgetrange en certificaat-eisen vast. ProSafetyMatch toont
            direct passende profielen uit het netwerk.
          </Step>
          <Step n={2} title="Selectie & bevestiging">
            Vergelijk profielen op tarief en kwaliteit. Bevestig direct de inzet
            met de professional in de chatomgeving van het dashboard; iedere sessie krijgt een uniek ID en is opvraagbaar bij een dispuut.
          </Step>
          <Step n={3} title="Betaling & uitvoering">
            Vooraf gemaakte afspraken met de professional of grotere projecten leggen we vast in escrow. Dat geeft beide partijen zekerheid, versnelt
            de uitbetaling voor de professional en ontlast jullie financiële afdeling. Tot de lancering kan je een directe inzet wens afhandelen via het
            actuele ProBrandwacht-netwerk; daarna verzorgt ProSafetyMatch de escrow-uitbetaling zodra het urenoverzicht op je dashboard is bevestigd.
          </Step>
        </div>
      </section>

      {/* Kosten & helder inzicht */}
      <section className="mb-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Kosten & helder inzicht</h3>
          <ul className="mt-3 space-y-2 text-slate-700 text-sm">
            <li>
              <strong>15% platformfee</strong> – standaard opgenomen in de
              kostenopbouw.
            </li>
            <li>
              <strong>Tariefverdeling</strong> – het dossier laat zien welk deel
              rechtstreeks naar de professional gaat.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Budget gestuurd selecteren</h3>
          <p className="mt-2 text-slate-700 text-sm">
            Stel een bandbreedte in (bijv. €40–50/u). Alleen profielen binnen
            budget worden getoond. Je kunt kiezen voor een mix van basis en
            specialisten.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Administratie op orde</h3>
          <p className="mt-2 text-slate-700 text-sm">
            DBA-proof documentatie en volledige urenregistratie. Facturatie
            verloopt rechtstreeks tussen opdrachtgever en zzp’er; het platform
            faciliteert, maar bemiddelt niet.
          </p>
        </div>
      </section>

      {/* Visie */}
      <section className="mb-12 rounded-2xl border bg-amber-50 p-6 text-sm text-amber-900">
        <h3 className="text-lg font-semibold text-amber-900">
          Waarom een tarief van rond de €45/u nu vaak tegenvalt op de werkvloer
        </h3>
        <p className="mt-2">
          €45/u lijkt een prima tarief, maar na bureau-marges, reistijd en kosten blijft er voor de professional schrikbarend weinig over. Dat zie je direct
          terug in minder motivatie, hogere uitval en lagere kwaliteit op de werkvloer.
        </p>
        <p className="mt-2">
          Met ProSafetyMatch krijgt de professional wél wat hij verdient en krijgt de opdrachtgever maximale inzet, hogere betrouwbaarheid en betere resultaten.
          Transparant, eerlijk en efficiënt.
        </p>
      </section>

      {/* Samen bouwen */}
      <section className="mb-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold">Bouw met ons mee</h2>
        <p className="mt-2 max-w-3xl text-slate-700">
          Sluit je aan en help ons de nieuwe standaard voor eerlijk, veilig en efficiënt samenwerken te realiseren. Hoe eerder je meedoet, hoe groter jouw invloed
          op het platform dat de markt straks eerlijker maakt. Meld je vandaag nog aan.
        </p>
        <div className="mt-5">
          <PrimaryCTA href={signupUrl}>Meld je bedrijf aan</PrimaryCTA>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-4 text-sm text-slate-600 space-y-2">
        <p>
          <strong>Let op:</strong> ProSafetyMatch wordt gelanceerd als onafhankelijk platform, niet als traditioneel bemiddelingsbureau. Tot die tijd faciliteert ProBrandwacht dezelfde werkwijze via het bestaande netwerk. Wij zorgen voor volledige transparantie in matching en tariefopbouw, terwijl opdrachtgever en professional zelf de overeenkomst sluiten.
        </p>
        <p>
          Wij adviseren altijd om dit door jullie juridische team te laten toetsen binnen de geldende compliance- en DBA-kaders. In de praktijk kiezen veel partijen echter al voor samenwerking op basis van vertrouwen, zonder formele contracten vooraf.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Direct verder lezen</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
          <li>
            <Link href="/opdrachtgevers/brandwacht-inhuren" className="underline">
              Brandwacht inhuren – eerlijk & DBA-proof
            </Link>
          </li>
          <li>
            <Link href="/blog" className="underline">
              Bekijk de nieuwste kennisartikelen
            </Link>
          </li>
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(extraFaqJsonLd) }} />
    </main>
  )
}

/* -------------------------- Kleine componenten -------------------------- */

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

function USP({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-600"
          aria-hidden
        />
        <div>
          <div className="font-semibold">{title}</div>
          <p className="mt-1 text-sm text-slate-700">{desc}</p>
        </div>
      </div>
    </div>
  )
}

function PrimaryCTA({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:")
  const cls =
    "rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500"
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {children}
      </a>
    )
  }
  return <Link href={href} className={cls}>{children}</Link>
}

function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-800 text-sm font-semibold">
          {n}
        </span>
        <div>
          <div className="font-semibold">{title}</div>
          <p className="mt-1 text-sm text-slate-700">{children}</p>
        </div>
      </div>
    </div>
  )
}
      {/* USP’s */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Waarom ProSafetyMatch (in ontwikkeling)</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          We bouwen ProSafetyMatch als centrale werkplek voor safety professionals en opdrachtgevers. De pijlers hieronder zie je nu al terug in
          het bestaande ProBrandwacht-netwerk, zodat huidige inzetten soepel verlopen en straks automatisch worden overgenomen door het platform.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <USP
            title="Volledig tariefinzicht"
            desc="Je ziet exact wat naar de brandwacht gaat en wat de platformfee is."
          />
          <USP
            title="Betaalgarantie"
            desc="Vooraf gemaakte afspraken leggen we vast en uitbetaling volgt na bevestigde uitvoering."
          />
          <USP
            title="DBA-proof contracten"
            desc="Contracten lopen rechtstreeks tussen opdrachtgever en professional."
          />
          <USP
            title="Kwaliteit zichtbaar"
            desc="Certificaten, reviews en badges in één oogopslag."
          />
          <USP
            title="Budgetcontrole"
            desc="Filter op tariefbandbreedtes en stel je eigen mix samen."
          />
          <USP
            title="Sneller inhuren"
            desc="Geen tussenlagen, direct contact en bevestiging."
          />
        </div>
      </section>
