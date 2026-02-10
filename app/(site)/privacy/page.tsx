import type { Metadata } from 'next'

import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import SeoStructuredData from '@/components/SeoStructuredData'
import AfbakeningNote from '@/components/afbakening-note'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/privacy')

export default function PrivacyPage() {
  const canonicalUrl = 'https://www.probrandwacht.nl/privacy'
  const title = 'Privacyverklaring | ProBrandwacht'
  const description =
    'Uitleg over persoonsgegevens, bewaartermijnen en contact rondom privacy bij ProBrandwacht.'

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Privacy', url: canonicalUrl },
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

        <section className="panel mt-6 p-6 sm:p-8 md:p-10">
          <div className="space-y-5 text-sm text-slate-200">
            <h1 className="text-3xl font-semibold text-white">Privacyverklaring</h1>

            <p className="max-w-3xl text-slate-200">
              Deze verklaring legt uit welke persoonsgegevens ProBrandwacht verwerkt, waarom dat gebeurt
              en hoe lang gegevens worden bewaard. We houden het bewust praktisch en uitlegbaar.
            </p>

            <h2 className="text-lg font-semibold text-white">1. Wie is ProBrandwacht</h2>
            <p>
              ProBrandwacht is een onafhankelijk kennis- en analyse-initiatief. We bieden context en
              duiding over brandwacht-inzet en rollen, en zijn geen bemiddelaar of uitvoerende partij.
            </p>

            <h2 className="text-lg font-semibold text-white">2. Welke gegevens we verwerken</h2>
            <p>
              We verwerken alleen gegevens die nodig zijn voor contact en inhoudelijke afstemming:
            </p>
            <ul className="list-disc pl-5 text-slate-200">
              <li>Contactgegevens zoals naam, e-mail en telefoonnummer.</li>
              <li>Informatie die je zelf deelt in een bericht.</li>
              <li>Basis technische gegevens (zoals IP-adres en browser) voor beveiliging en statistiek.</li>
            </ul>

            <h2 className="text-lg font-semibold text-white">3. Waarom we gegevens verwerken</h2>
            <p>We gebruiken gegevens uitsluitend om:</p>
            <ul className="list-disc pl-5 text-slate-200">
              <li>Contact te beantwoorden en vragen af te stemmen.</li>
              <li>Context en rolafbakening goed te begrijpen.</li>
              <li>De website veilig en stabiel te houden.</li>
            </ul>
            <p className="text-slate-300">
              De grondslagen zijn toestemming, uitvoering van een verzoek en gerechtvaardigd belang
              (zoals beveiliging en statistiek).
            </p>

            <h2 className="text-lg font-semibold text-white">4. Bewaartermijnen</h2>
            <p>
              We bewaren gegevens niet langer dan nodig:
            </p>
            <ul className="list-disc pl-5 text-slate-200">
              <li>Contactgegevens en correspondentie: maximaal 12 maanden na het laatste contact.</li>
              <li>Gegevens die wettelijk langer moeten worden bewaard, volgen die termijn.</li>
            </ul>

            <h2 className="text-lg font-semibold text-white">5. Delen met derden</h2>
            <p>
              We delen gegevens alleen met partijen die nodig zijn voor hosting, e-mail en beveiliging.
              We verkopen geen data en geven niets door voor marketing van derden.
            </p>

            <h2 className="text-lg font-semibold text-white">6. Beveiliging</h2>
            <p>
              We nemen passende technische en organisatorische maatregelen om gegevens te beschermen tegen
              verlies, scheefgroei en onbevoegde toegang.
            </p>

            <h2 className="text-lg font-semibold text-white">7. Jouw rechten</h2>
            <p>
              Je kunt je gegevens inzien, laten corrigeren of laten verwijderen. Je kunt ook bezwaar
              maken tegen verwerking of je toestemming intrekken.
            </p>

            <h2 className="text-lg font-semibold text-white">8. Contact</h2>
            <p>
              Vragen over privacy? Neem contact op via{' '}
              <a href="mailto:privacy@probrandwacht.nl" className="underline underline-offset-4">
                privacy@probrandwacht.nl
              </a>.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <AfbakeningNote />
        </div>
      </div>
    </main>
  )
}
