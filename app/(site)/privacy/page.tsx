import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import SeoStructuredData from '@/components/SeoStructuredData'
import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'

const canonicalUrl = 'https://www.probrandwacht.nl/privacy'

export const metadata: Metadata = getRouteMetadata('/privacy')

export default function PrivacyPage() {
  const title = 'Privacyverklaring | ProBrandwacht'
  const description =
    'Lees hoe ProBrandwacht omgaat met persoonsgegevens en welke maatregelen we nemen om gegevens zorgvuldig en veilig te verwerken.'

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Privacy & cookies', url: canonicalUrl },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData
        article={{
          title,
          description,
          url: canonicalUrl,
        }}
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <StructuredBreadcrumbs items={breadcrumbItems} />

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 md:p-10">
          <div className="space-y-5 text-sm leading-relaxed text-slate-800">
            <header className="space-y-3">
              <h1 className="text-3xl font-semibold text-slate-900">
                Privacyverklaring
              </h1>
              <p className="max-w-2xl text-slate-600">
                Eerlijk werken betekent ook zorgvuldig omgaan met persoonsgegevens.
                ProBrandwacht verwerkt alleen gegevens die nodig zijn om samenwerking
                veilig, uitlegbaar en professioneel te ondersteunen.
              </p>
            </header>

            <p>
              Deze privacyverklaring is van toepassing op ProBrandwacht.nl.
              ProBrandwacht is een initiatief binnen dezelfde onderneming als
              ProSafetyMatch en opereert onder de handelsnaam van Chrono4Solutions.
              Wij respecteren de privacy van bezoekers en verwerken persoonsgegevens
              conform de Algemene Verordening Gegevensbescherming (AVG).
            </p>

            <h2 className="pt-4 text-lg font-semibold text-slate-900">
              Welke gegevens we verwerken
            </h2>
            <p>
              Wij verwerken uitsluitend gegevens die je zelf aan ons verstrekt, zoals:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Naam, e-mailadres en contactgegevens via formulieren.</li>
              <li>Projectinformatie, budgetindicaties en spoedstatus bij aanvragen.</li>
              <li>Technische gegevens (geanonimiseerd) om de website te verbeteren.</li>
            </ul>
            <p>
              Wij vragen nooit om BSN, kopieën van identiteitsbewijzen of andere
              bijzondere persoonsgegevens via deze website.
            </p>

            <h2 className="pt-4 text-lg font-semibold text-slate-900">
              Waarvoor we deze gegevens gebruiken
            </h2>
            <ul className="list-inside list-disc space-y-1">
              <li>Om aanvragen en inschrijvingen correct te verwerken.</li>
              <li>Om inzicht en rapportages te leveren (zoals tariefberekeningen).</li>
              <li>Om contact op te nemen over een lopende aanvraag of samenwerking.</li>
              <li>Om je op de hoogte te houden van relevante ontwikkelingen (optioneel).</li>
            </ul>

            <h2 className="pt-4 text-lg font-semibold text-slate-900">
              E-mail en technische infrastructuur
            </h2>
            <p>
              Voor het verzenden van functionele e-mails (zoals bevestigingen,
              PDF-rapporten en statusupdates) maken wij gebruik van de
              e-mailinfrastructuur van ProSafetyMatch.
            </p>
            <p>
              Dit gebeurt binnen dezelfde organisatie en uitsluitend voor functionele
              communicatie. Je gegevens worden niet gebruikt voor ongevraagde marketing
              en niet gedeeld met externe partijen voor commerciële doeleinden.
            </p>

            <h2 className="pt-4 text-lg font-semibold text-slate-900">
              Delen van gegevens met derden
            </h2>
            <p>
              Gegevens worden alleen gedeeld wanneer dit noodzakelijk is voor de
              uitvoering van een aanvraag, bijvoorbeeld bij directe of spoedinzet.
              In dat geval delen wij uitsluitend de informatie die nodig is.
            </p>
            <p>
              Andere derden ontvangen geen gegevens, tenzij dit wettelijk verplicht is
              of je hier expliciet toestemming voor hebt gegeven.
            </p>

            <h2 className="pt-4 text-lg font-semibold text-slate-900">
              Cookies en analytics
            </h2>
            <ul className="list-inside list-disc space-y-1">
              <li>Functionele cookies voor correcte werking van formulieren.</li>
              <li>Privacyvriendelijke, geanonimiseerde analytics.</li>
              <li>Geen advertentiecookies en geen tracking door derden.</li>
            </ul>
            <p>
              Mocht dit beleid wijzigen, dan vragen wij vooraf expliciet toestemming.
            </p>

            <h2 className="pt-4 text-lg font-semibold text-slate-900">
              Bewaartermijnen
            </h2>
            <p>
              Gegevens die leiden tot een samenwerking bewaren wij zolang dit nodig is
              voor de uitvoering en zolang de wet dit vereist. Aanvragen zonder vervolg
              verwijderen wij uiterlijk binnen 12 maanden.
            </p>

            <h2 className="pt-4 text-lg font-semibold text-slate-900">
              Jouw rechten
            </h2>
            <p>
              Je hebt het recht om je gegevens in te zien, te corrigeren of te laten
              verwijderen. Ook kun je bezwaar maken tegen verwerking of vragen om
              gegevensoverdracht.
            </p>

            <h2 className="pt-4 text-lg font-semibold text-slate-900">
              Contact
            </h2>
            <p>
              Voor vragen over privacy of gegevensverwerking kun je contact opnemen via{' '}
              <a
                href="mailto:privacy@prosafetymatch.nl"
                className="underline underline-offset-4"
              >
                privacy@prosafetymatch.nl
              </a>
              . Voor algemene vragen:{" "}
              <a
                href="mailto:info@prosafetymatch.nl"
                className="underline underline-offset-4"
              >
                info@prosafetymatch.nl
              </a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
