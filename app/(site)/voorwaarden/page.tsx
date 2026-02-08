import StructuredBreadcrumbs from "@/components/structured-breadcrumbs"
import SeoStructuredData from "@/components/SeoStructuredData"
import type { Metadata } from "next"
import { getRouteMetadata } from "@/lib/seo/metadata"
import AfbakeningNote from '@/components/afbakening-note'

export const metadata: Metadata = getRouteMetadata("/voorwaarden")

export default function VoorwaardenPage() {
  const canonicalUrl = "https://www.probrandwacht.nl/voorwaarden"
  const title = "Algemene voorwaarden | ProBrandwacht"
  const description =
    "De spelregels van ProBrandwacht: wat van het initiatief mag worden verwacht en waar verantwoordelijkheid ligt bij opdrachtgevers en professionals."

  const breadcrumbItems = [
    { name: "Home", url: "https://www.probrandwacht.nl/" },
    { name: "Voorwaarden", url: canonicalUrl },
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
            <h1 className="text-3xl font-semibold text-white">Algemene voorwaarden</h1>

            <p className="max-w-3xl text-slate-200">
              Deze voorwaarden beschrijven hoe ProBrandwacht werkt, wat van het initiatief mag worden
              verwacht en hoe de rolverdeling werkt. De tekst blijft bewust helder, praktisch en zonder
              juridisch jargon.
            </p>

            <h2 className="text-lg font-semibold text-white">1. Wat ProBrandwacht is</h2>
            <p>
              ProBrandwacht is een informatie- en kennisinitiatief voor zelfstandige brandwachten en
              opdrachtgevers. Er wordt geanalyseerd en in context geplaatst, zodat samenwerking uitlegbaar blijft.
            </p>

            <h2 className="text-lg font-semibold text-white">2. Rol en contractpositie</h2>
            <p>
              ProBrandwacht opereert onafhankelijk van uitvoering en contractering. Afspraken worden
              rechtstreeks gemaakt tussen opdrachtgever en zelfstandige professional.
            </p>

            <h2 className="text-lg font-semibold text-white">3. Juridische disclaimer</h2>
            <p>
              De informatie op ProBrandwacht is informatief en algemeen van aard. Juridische,
              fiscale, compliance- en tariefkeuzes blijven bij de betrokken partijen. Aan de inhoud kunnen
              geen rechten worden ontleend.
            </p>

            <h2 className="text-lg font-semibold text-white">4. Eigen verantwoordelijkheid</h2>
            <p>
              Zelfstandigen en opdrachtgevers maken onderling afspraken over inzet, verantwoordelijkheden
              en voorwaarden. Zij blijven zelf verantwoordelijk voor naleving van wet- en regelgeving,
              verzekeringen en aansprakelijkheid.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              In de praktijk betekent dit: partijen leggen vooraf rolverdeling, communicatie-afspraken en
              verantwoordelijkheden vast, zodat de uitvoering op locatie helder en toetsbaar blijft.
            </p>

            <h2 className="text-lg font-semibold text-white">5. Informatie</h2>
            <p>
              Informatie en voorbeelden zijn bedoeld als ondersteuning en bewustwording. Er kunnen geen
              rechten aan worden ontleend.
            </p>
            <p className="text-slate-300">
              Afspraken over inzet en verantwoordelijkheden liggen in de regel rechtstreeks tussen opdrachtgever
              en professional.
            </p>

            <h2 className="text-lg font-semibold text-white">6. Aansprakelijkheid</h2>
            <p>
              ProBrandwacht is niet aansprakelijk voor directe of indirecte
              schade voortvloeiend uit gebruik van het initiatief, informatie of
              tools, tenzij wettelijk anders bepaald. ProBrandwacht is geen partij
              bij de uitvoering van opdrachten en draagt geen aansprakelijkheid
              voor uitvoering of schade op locatie.
            </p>

            <h2 className="text-lg font-semibold text-white">7. Wijzigingen</h2>
            <p>
              Deze voorwaarden kunnen worden aangepast wanneer wetgeving of de
              werking van het initiatief daarom vraagt. De meest actuele versie
              is leidend.
            </p>

            <h2 className="text-lg font-semibold text-white">8. Toepasselijk recht</h2>
            <p>
              Op deze voorwaarden is Nederlands recht van toepassing. Geschillen
              worden voorgelegd aan de bevoegde rechter in Nederland.
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
