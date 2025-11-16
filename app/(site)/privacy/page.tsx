import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'

const canonicalUrl = 'https://www.probrandwacht.nl/privacy'

Zo gaat ProBrandwacht.nl om met persoonsgegevens, cookies en spoedaanvragen via Chrono4Solutions.',
  },
}
export const metadata: Metadata = getRouteMetadata('/privacy');



export default function PrivacyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Privacy & cookies', url: canonicalUrl },
  ]

  return (
    <main className='mx-auto w-full max-w-3xl space-y-8 px-4 py-10'>
      <StructuredBreadcrumbs items={breadcrumbItems} />

      <section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='text-sm text-gray-800'>
          <h1 className='text-3xl font-semibold text-slate-900'>Privacyverklaring</h1>
          <p className='mt-4'>
            Deze privacyverklaring is van toepassing op het platform ProBrandwacht, een handelsnaam van Chrono4solutions. ProBrandwacht respecteert de privacy
            van alle gebruikers van haar platform en draagt er zorg voor dat de persoonlijke informatie die je ons verschaft, vertrouwelijk en volgens de
            geldende wetgeving wordt behandeld.
          </p>

          <h2 className='text-lg font-semibold mt-8 mb-2'>Welke gegevens we ontvangen</h2>
          <p className='mb-4'>We verzamelen persoonsgegevens die je zelf invult op ProBrandwacht.nl, waaronder:</p>
          <ul className='list-disc list-inside mb-4 space-y-1'>
            <li>Contact- en bedrijfsgegevens via formulieren zoals /opdrachtgevers/aanmelden.</li>
            <li>Projectdetails, budgetindicaties en spoedstatus via /probrandwacht-direct.</li>
            <li>Anonieme gebruiksstatistieken via privacyvriendelijke analytics om de site te verbeteren.</li>
          </ul>
          <p className='mb-4'>We vragen nooit om BSN, kopieën van identiteitsbewijzen of andere bijzondere persoonsgegevens via deze site.</p>

          <h2 className='text-lg font-semibold mt-8 mb-2'>Wanneer we gegevens delen</h2>
          <p className='mb-4'>
            ProBrandwacht.nl gebruikt de gegevens primair om je onboarding bij ProSafetyMatch voor te bereiden. Bij spoed- of directe inzetaanvragen kunnen we
            jouw contact- en projectgegevens veilig doorzetten naar onze operationele tak binnen Chrono4Solutions. Hiervoor geldt:
          </p>
          <ul className='list-disc list-inside mb-4 space-y-1'>
            <li>We delen alleen de informatie die nodig is om jouw aanvraag uit te voeren.</li>
            <li>Chrono4Solutions verwerkt de gegevens enkel voor de betreffende aanvraag en hanteert eigen verwerkersovereenkomsten.</li>
            <li>Je ontvangt een bevestiging zodra jouw aanvraag is doorgestuurd of opgepakt.</li>
          </ul>
          <p className='mb-4'>Andere derden krijgen jouw gegevens niet, tenzij dit wettelijk verplicht is of je hier vooraf toestemming voor hebt gegeven.</p>

          <h2 className='text-lg font-semibold mt-8 mb-2'>Cookies en analytics</h2>
          <p className='mb-4'>We beperken cookies tot wat noodzakelijk is voor het functioneren van de site en privacyvriendelijke statistieken. Dat betekent:</p>
          <ul className='list-disc list-inside mb-4 space-y-1'>
            <li>Functionele cookies om formulieren en beveiligingsmaatregelen goed te laten werken.</li>
            <li>Geanonimiseerde analytics (zonder advertentiecookies) om te meten welke pagina&apos;s het best presteren.</li>
            <li>Geen tracking-cookies van derden en geen heridentificatie buiten ProBrandwacht of ProSafetyMatch.</li>
          </ul>
          <p className='mb-4'>Als we in de toekomst aanvullende cookies willen plaatsen, vragen we hier vooraf expliciet toestemming voor.</p>

          <h2 className='text-lg font-semibold mt-8 mb-2'>Bewaartermijnen & jouw rechten</h2>
          <p className='mb-4'>
            Gegevens die leiden tot onboarding bij ProSafetyMatch bewaren we zolang de samenwerking loopt of zolang de wet dit vereist. Aanvragen zonder
            vervolg verwijderen we maximaal 12 maanden na ontvangst. Je mag altijd inzage, correctie of verwijdering vragen via onderstaande contactgegevens.
          </p>

          <h2 className='text-lg font-semibold mt-8 mb-2'>Contact</h2>
          <p className='mb-4'>
            Vragen over privacy of cookies? Mail ons op <a className='underline' href='mailto:privacy@prosafetymatch.nl'>privacy@prosafetymatch.nl</a>. Voor
            algemene vragen kun je contact opnemen via <a className='underline' href='mailto:info@prosafetymatch.nl'>info@prosafetymatch.nl</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
