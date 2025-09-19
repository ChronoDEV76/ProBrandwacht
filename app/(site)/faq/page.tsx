import type { Metadata } from 'next'
import Link from 'next/link'
import { getSignupUrl } from '@/lib/config'

export const metadata: Metadata = {
  title: 'FAQ | ProBrandwacht.nl',
  description:
    'Antwoorden op veelgestelde vragen over brandwachten voor evenementen, bouw en industrie.',
  alternates: { canonical: '/faq', languages: { 'nl-NL': '/faq' } },
  other: { hreflang: 'nl-NL' },
}

type FAQItem = {
  q: string
  a: string
  more?: { href: string; label: string }
}

const faqs: FAQItem[] = [
  {
    q: 'Hoeveel pakt een bureau gemiddeld per uur?',
    a: 'In de praktijk houden tussenpersonen vaak €15–€25 per uur over bij klanttarieven van €45–€60. Voorbeeld: opdrachtgever betaalt €50 per uur, het bureau pakt €20 en de brandwacht ontvangt €30. In industrie, nacht of weekend ligt het klanttarief hoger, maar de verdeling blijft zelden volledig duidelijk.',
    more: {
      href: '/blog/wat-kost-een-brandwacht-in-2025',
      label: 'Lees: Wat kost een brandwacht in 2025?',
    },
  },
  {
    q: 'Wat verdien ik als zzp’er via ProBrandwacht straks?',
    a: 'Richtlijn: €38–€45 per uur bij standaardopdrachten overdag, hoger bij nacht, weekend of extra risico. Je ziet altijd de verdeling: opdrachtgeverstarief min platformfee van circa €5 per uur is jouw uitbetaling. Geen verborgen marges, je houdt direct zicht op je inkomsten.',
  },
  {
    q: 'Hoe werkt escrow‑betaling?',
    a: 'De opdrachtgever betaalt vooraf naar een tussenrekening (escrow). Na bevestigde uitvoering volgt automatische uitbetaling naar de brandwacht. Bij een terechte klacht pauzeren we de uitbetaling en bemiddelen; na oplossing wordt uitgekeerd. Dit voorkomt late betalingen en discussie achteraf.',
  },
  {
    q: 'Wat is het verschil tussen ProBrandwacht en ProSafetyMatch?',
    a: 'ProBrandwacht.nl is onze wervingssite met community, kennisbank en voorinschrijving voor professionals. ProSafetyMatch wordt het digitale platform met eerlijke tarieven, escrow-betalingen, reviews en certificaat-checks. Meld je via ProBrandwacht aan voor vroege toegang tot ProSafetyMatch.',
  },
  {
    q: 'Wanneer gaat het platform live?',
    a: 'We werken toe naar de eerste publieke lancering in 2025. Sluit je nu aan voor updates en vroege toegang; we starten gefaseerd met pilots en breiden vervolgens landelijk uit.',
  },
  {
    q: 'Wanneer is een brandwacht verplicht bij evenementen?',
    a: 'Bij vergunningsplichtige evenementen of wanneer de veiligheidsregio dit voorschrijft, bijvoorbeeld bij verhoogd risico, grote publieksstromen of pyrotechniek.',
    more: {
      href: '/blog/wanneer-is-een-brandwacht-verplicht-bij-evenementen',
      label: 'Lees: Wanneer is een brandwacht verplicht bij evenementen?',
    },
  },
  {
    q: 'Wat kost een brandwacht?',
    a: 'Veelvoorkomend is €40–€60 per uur. Factoren: certificaten (VCA/BHV/EHBO/Manschap), type inzet (evenementen/bouw/industrie), duur en doorlooptijd, tijdstip (nacht/weekend/feestdag), regio en reiskosten. Eerlijke uitleg over tariefopbouw voorkomt misverstanden.',
    more: {
      href: '/blog/wat-kost-een-brandwacht-in-2025',
      label: 'Lees: Wat kost een brandwacht in 2025?',
    },
  },
  {
    q: 'Welke certificaten zijn relevant?',
    a: 'Veelvoorkomend: VCA, BHV, EHBO en Manschap A/B. In de industrie zijn aanvullingen nodig (hete werkvergunning, toezicht besloten ruimte). Actuele geldigheid en aantoonbare ervaring verhogen je inzetbaarheid en tarief.',
  },
  {
    q: 'Mag een zzp‑brandwacht op een bouwplaats werken?',
    a: 'Ja, mits de vereiste certificaten aanwezig zijn (minimaal VCA, vaak BHV/EHBO) en de opdrachtvoorwaarden dit toestaan. Duidelijke taakafspraken en risico‑instructie op locatie zijn essentieel.',
  },
]

export default function FAQPage() {
  const signupUrl = getSignupUrl()
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Veelgestelde Vragen</h1>
      <ul className="space-y-4">
        {faqs.map((f, i) => (
          <li key={i}>
            <p className="font-medium">{f.q}</p>
            <p className="text-sm text-slate-600">{f.a}</p>
            {f.more ? (
              <p className="mt-1 text-sm">
                <Link href={f.more.href} className="underline">
                  {f.more.label}
                </Link>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      <div>
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-black"
        >
          Meld je aan (gratis) en kom straks met je profiel op ProSafetyMatch
        </a>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  )
}
