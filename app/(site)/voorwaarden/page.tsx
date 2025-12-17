import StructuredBreadcrumbs from "@/components/structured-breadcrumbs"
import SeoStructuredData from "@/components/SeoStructuredData"
import type { Metadata } from "next"
import { getRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = getRouteMetadata("/voorwaarden")

export default function VoorwaardenPage() {
  const canonicalUrl = "https://www.probrandwacht.nl/voorwaarden"
  const title = "Algemene voorwaarden | ProBrandwacht"
  const description =
    "De spelregels van ProBrandwacht: wat je van het platform mag verwachten, welke afspraken indicatief zijn en wat de verantwoordelijkheid is van brandwachten en opdrachtgevers."

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

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 md:p-10">
          <div className="space-y-5 text-sm text-gray-800">
            <h1 className="text-3xl font-semibold text-slate-900">
              Algemene voorwaarden
            </h1>

            <p className="max-w-3xl text-slate-700">
              Deze voorwaarden beschrijven hoe ProBrandwacht werkt, wat je van
              ons mag verwachten en wat niet. We houden ze bewust helder,
              praktisch en zonder juridische ruis.
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              1. Wat ProBrandwacht is (en niet)
            </h2>
            <p>
              ProBrandwacht is een informatie- en wervingsplatform voor
              zelfstandige brandwachten en opdrachtgevers. Wij zijn geen
              bemiddelaar, detacheerder of werkgever.
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              2. Geen garanties
            </h2>
            <p>
              ProBrandwacht geeft geen garanties op opdrachten, volumes, tarieven
              of inkomsten. Alle voorbeelden, tarieven en berekeningen zijn
              indicatief en contextafhankelijk.
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              3. Eigen verantwoordelijkheid
            </h2>
            <p>
              Zelfstandigen en opdrachtgevers maken onderling afspraken over
              tarief, inzet, verantwoordelijkheden en voorwaarden. Zij blijven
              zelf verantwoordelijk voor naleving van wet- en regelgeving,
              waaronder de Wet DBA.
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              4. Informatie & tools
            </h2>
            <p>
              Informatie, blogs, calculators en tools zijn bedoeld als
              ondersteuning en bewustwording. Er kunnen geen rechten aan worden
              ontleend.
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              5. Aansprakelijkheid
            </h2>
            <p>
              ProBrandwacht is niet aansprakelijk voor directe of indirecte
              schade voortvloeiend uit gebruik van het platform, informatie of
              tools, tenzij wettelijk anders bepaald.
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              6. Wijzigingen
            </h2>
            <p>
              Deze voorwaarden kunnen worden aangepast wanneer wetgeving of de
              werking van het platform daarom vraagt. De meest actuele versie
              is altijd leidend.
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              Contact
            </h2>
            <p>
              Vragen over deze voorwaarden? Mail ons via{" "}
              <a
                href="mailto:info@prosafetymatch.nl"
                className="underline"
              >
                info@prosafetymatch.nl
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
