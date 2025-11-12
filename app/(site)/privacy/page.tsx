import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import type { Metadata } from 'next'

const canonicalUrl = 'https://www.probrandwacht.nl/privacy'

export const metadata: Metadata = {
  title: 'Privacy & cookies | ProBrandwacht.nl',
  description:
    'Lees hoe ProBrandwacht.nl met persoonsgegevens en cookies omgaat, inclusief de samenwerking met Chrono4Solutions voor spoedinzet.',
  keywords: [
    'brandwacht',
    'brandwacht inhuren',
    'brandwacht huren',
    'DBA-proof brandwacht',
    'brandwacht tarieven',
  ],
  alternates: { canonical: canonicalUrl, languages: { 'nl-NL': canonicalUrl } },
  openGraph: {
    url: canonicalUrl,
    title: 'Privacy & cookies | ProBrandwacht.nl',
    description:
      'Heldere uitleg over gegevensverwerking, cookiegebruik en het delen van gegevens met Chrono4Solutions voor directe inzet.',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy & cookies | ProBrandwacht.nl',
    description:
      'Zo gaat ProBrandwacht.nl om met persoonsgegevens, cookies en spoedaanvragen via Chrono4Solutions.',
  },
}

export default function PrivacyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Privacy & cookies', url: canonicalUrl },
  ]

  return (
    <main className='mx-auto w-full max-w-3xl space-y-8 px-4 py-10'>
      <StructuredBreadcrumbs items={breadcrumbItems} />

      <header className='space-y-3'>
        <h1 className='text-3xl font-semibold text-slate-900'>Privacy & cookies</h1>
{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/probrandwacht-direct" className="underline">ProBrandwacht Direct</a>.
</div>
{/* SEO-UPGRADE END */}
        <p className='text-sm text-slate-600'>
          ProBrandwacht.nl is een initiatief van ProBrandwacht B.V. en ondersteunt de community rondom ProSafetyMatch. Onderstaand lees je hoe we gegevens
          verwerken, wanneer we gegevens delen met Chrono4Solutions en welke cookies we inzetten.
        </p>
      </header>

      <section className='space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-semibold text-slate-900'>Welke gegevens we ontvangen</h2>
        <p className='text-sm text-slate-700'>
          We verzamelen persoonsgegevens die je zelf invult op ProBrandwacht.nl, waaronder:
        </p>
        <ul className='list-disc space-y-2 pl-5 text-sm text-slate-700'>
          <li>Contact- en bedrijfsgegevens via formulieren zoals <code>/opdrachtgevers/aanmelden</code>.</li>
          <li>Projectdetails, budgetindicaties en spoedstatus via <code>/probrandwacht-direct</code>.</li>
          <li>Anonieme gebruiksstatistieken via privacyvriendelijke analytics om de site te verbeteren.</li>
        </ul>
        <p className='text-sm text-slate-700'>
          We vragen nooit om BSN, kopieën van identiteitsbewijzen of andere bijzondere persoonsgegevens via deze site.
        </p>
      </section>

      <section className='space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-semibold text-slate-900'>Wanneer we gegevens delen</h2>
        <p className='text-sm text-slate-700'>
          ProBrandwacht.nl gebruikt de gegevens primair om je onboarding bij ProSafetyMatch voor te bereiden. Bij spoed- of directe inzetaanvragen kunnen we
          jouw contact- en projectgegevens veilig doorzetten naar onze operationele partner <strong>Chrono4Solutions</strong>. Zij leveren gecertificeerde
          brandwachten wanneer een onmiddellijke inzet gewenst is. Hiervoor geldt:
        </p>
        <ul className='list-disc space-y-2 pl-5 text-sm text-slate-700'>
          <li>We delen alleen de informatie die nodig is om jouw aanvraag uit te voeren.</li>
          <li>Chrono4Solutions verwerkt de gegevens enkel voor de betreffende aanvraag en hanteert eigen verwerkersovereenkomsten.</li>
          <li>Je ontvangt een bevestiging zodra jouw aanvraag is doorgestuurd of opgepakt.</li>
        </ul>
        <p className='text-sm text-slate-700'>
          Andere derden krijgen jouw gegevens niet, tenzij dit wettelijk verplicht is of je hier vooraf toestemming voor hebt gegeven.
        </p>
      </section>

      <section className='space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-semibold text-slate-900'>Cookies en analytics</h2>
        <p className='text-sm text-slate-700'>
          We beperken cookies tot wat noodzakelijk is voor het functioneren van de site en privacyvriendelijke statistieken. Dat betekent:
        </p>
        <ul className='list-disc space-y-2 pl-5 text-sm text-slate-700'>
          <li>Functionele cookies om formulieren en beveiligingsmaatregelen goed te laten werken.</li>
          <li>Geanonimiseerde analytics (zonder advertentiecookies) om te meten welke pagina&apos;s het best presteren.</li>
          <li>Geen tracking-cookies van derden en geen heridentificatie buiten ProBrandwacht, ProSafetyMatch of Chrono4Solutions.</li>
        </ul>
        <p className='text-sm text-slate-700'>
          Als we in de toekomst aanvullende cookies willen plaatsen, vragen we hier vooraf expliciet toestemming voor.
        </p>
      </section>

      <section className='space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-semibold text-slate-900'>Bewaartermijnen & jouw rechten</h2>
        <p className='text-sm text-slate-700'>
          Gegevens die leiden tot onboarding bij ProSafetyMatch bewaren we zolang de samenwerking loopt of zolang de wet dit vereist. Aanvragen zonder
          vervolg verwijderen we maximaal 12 maanden na ontvangst. Je mag altijd inzage, correctie of verwijdering vragen via onderstaande contactgegevens.
        </p>
      </section>

      <section className='space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-semibold text-slate-900'>Contact</h2>
        <p className='text-sm text-slate-700'>
          Vragen over privacy of cookies? Mail ons op <a className='underline' href='mailto:privacy@prosafetymatch.nl'>privacy@prosafetymatch.nl</a>. Voor
          aanvragen die via Chrono4Solutions lopen kun je ook rechtstreeks contact opnemen via <a className='underline' href='mailto:info@chronosolutions.nl'>info@chronosolutions.nl</a>.
        </p>
      </section>
    </main>
  )
}
