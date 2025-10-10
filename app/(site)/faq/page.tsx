import type { Metadata } from 'next'
import Link from 'next/link'

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
    q: 'Hoe wordt het tarief verdeeld bij een traditioneel bureau?',
    a: 'In de praktijk houden tussenpersonen vaak €15–€25 per uur over bij klanttarieven van €45–€60. Voorbeeld: opdrachtgever betaalt €50 per uur, er gaat €20 naar tussenpartij/overhead en de brandwacht ontvangt €30. In industrie, nacht of weekend ligt het klanttarief hoger, maar de verdeling blijft zelden volledig zichtbaar.',
    more: {
      href: '/blog/wat-kost-een-brandwacht-in-2025',
      label: 'Lees: Wat kost een brandwacht in 2025?',
    },
  },
  {
    q: 'Welke officiële bronnen gebruiken jullie voor tarieven en regelgeving?',
    a: 'We leunen op cijfers van CBS (cao-lonen en loonkosten), KVK (uurtarief berekenen als zzp’er), Belastingdienst (Wet DBA) en FNV (cao Veiligheidsregio’s & ORT). Door die bronnen te koppelen aan onze escrow- en tariefberekeningen kun jij opdrachtgevers onderbouwen waarom een transparant tarief nodig is.',
    more: {
      href: '/seo-resources',
      label: 'Bekijk alle autoritaire bronnen',
    },
  },
  {
    q: 'Waarom lijkt €30 per uur goedkoop maar pakt het duur uit?',
    a: 'Een tarief van €30/u klinkt als slimme inkoop, maar de praktijk laat het tegendeel zien: minder motivatie, hogere uitval en extra risico op de werkvloer. Via ProSafetyMatch bepaal je samen een passend tarief, met eerlijke inzichten in fee en escrow, zodat kwaliteit beloond blijft.',
  },
  {
    q: 'Welke typen brandwachten zijn er?',
    a: 'We zien grofweg drie groepen: repressieve brandwachten uit korpsen/veiligheidsregio’s die af en toe bijverdienen; volledig zzp-brandwachten met rijksdiploma’s en vaak ademlucht; en industriële brandwachten met petrochemische certificaten. ProSafetyMatch brengt ze bij elkaar zonder tarieven op te leggen, maar met volledig inzicht in fee, escrow en certificaten.',
  },
  {
    q: 'Wat houdt de community rond ProSafetyMatch in?',
    a: 'We bouwen een digitaal collectief voor zelfstandige brandwachten: nieuws over wetgeving en tarieven, kennisdeling, feedback op nieuwe features en toegang tot scholing. Zo ontstaat er een alternatief voor losse groepen en houden we samen de tariefverdeling eerlijk.',
  },
  {
    q: 'Wat verdien ik als zzp’er via ProBrandwacht straks?',
    a: 'Het tarief spreek je zelf af met de opdrachtgever. Veel afspraken liggen tussen €38–€45 per uur bij dagdiensten; nacht, weekend, industrie of ademlucht liggen hoger. Wij laten alleen zien wat er met de 10% platformfee en 1–2% escrow gebeurt, zodat je netto direct zichtbaar is en je ondernemersvrijheid behoudt.',
  },
  {
    q: 'Hoe werkt escrow‑betaling?',
    a: 'De opdrachtgever betaalt vooraf op een tussenrekening (escrow). Na bevestigde uitvoering wordt automatisch uitbetaald aan de brandwacht. Bij een terechte klacht wordt de betaling tijdelijk gepauzeerd totdat er een oplossing is. Zo voorkom je late betalingen en discussies achteraf. ProSafetyMatch treedt niet op als bemiddelaar. Wij zijn een onafhankelijk platform dat uitsluitend de escrow-betaling en de eerlijke afhandeling faciliteert. Daarmee blijft elke euro inzichtelijk, behoud jij je ondernemerspositie en worden afspraken direct nagekomen, zonder tussenkomst of marge van een bureau.',
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
    a: 'Veel opdrachten worden gesloten tussen €40 en €60 per uur. Het precieze tarief hangt af van certificaten (VCA/BHV/EHBO/Manschap), type inzet, duur, tijdstip en regio. Gebruik onze calculator om te laten zien hoe fee en escrow worden verdeeld, maar bepaal het tarief altijd samen met de professional.',
    more: {
      href: '/blog/wat-kost-een-brandwacht-in-2025',
      label: 'Lees: Wat kost een brandwacht in 2025?',
    },
  },
  {
    q: 'Welke certificaten zijn relevant?',
    a: 'Veelvoorkomend: VCA, BHV, EHBO en Manschap A/B. In de industrie zijn aanvullingen nodig (hete werkvergunning, toezicht besloten ruimte). We verifiëren certificaten minimaal iedere 12 maanden en eerder bij verlopen documenten. Actuele geldigheid en aantoonbare ervaring verhogen je inzetbaarheid en tarief.',
  },
  {
    q: 'Hoe lever ik certificaten aan?',
    a: 'Upload certificaten bij voorkeur als PDF zodat we ze automatisch kunnen valideren. Lever je PNG/JPG aan, dan koppelen we die aan je iDIN-verificatie en checken we ze handmatig tegen bronnen zoals het Centraal Diploma Register VCA. Alleen jij en uitgenodigde opdrachtgevers krijgen inzage.',
  },
  {
    q: 'Mag een zzp‑brandwacht op een bouwplaats werken?',
    a: 'Ja, mits de vereiste certificaten aanwezig zijn (minimaal VCA, vaak BHV/EHBO) en de opdrachtvoorwaarden dit toestaan. Duidelijke taakafspraken en risico‑instructie op locatie zijn essentieel.',
  },
]

export default function FAQPage() {
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
          href="https://www.probrandwacht.nl/zzp/aanmelden"
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
