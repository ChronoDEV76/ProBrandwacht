import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import SeoStructuredData from '@/components/SeoStructuredData'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/opdrachtgevers')

export default function OpdrachtgeversPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Opdrachtgevers', url: 'https://www.probrandwacht.nl/opdrachtgevers' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 4)} />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Voor opdrachtgevers
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Geen garantie, wel{" "}
            <span className="text-emerald-300">rolvaste uitvoering</span>
            die uitlegbaar blijft.
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Veel gedoe ontstaat niet door de uitvoering, maar door onduidelijke rolverdeling, tariefafspraken en
            verwachtingen. Opdrachtgevers werken direct samen met zelfstandige professionals, met vooraf
            vastgelegde afspraken over rol, inzet en verantwoordelijkheid. Matching en beschikbaarheid blijven
            contextafhankelijk.
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Of het nu gaat om industrie, evenementen, utiliteit of bouw: de lat blijft gelijk en de uitvoering
            moet uitlegbaar zijn richting audit, OR en de mensen op locatie.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/opdrachtgevers/aanmelden"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Ik wil verkennen als opdrachtgever
            </Link>
            <Link
              href="/disclaimer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kaders / disclaimer
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Lees de kennisbank
            </Link>
          </div>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Wat dit wél is
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Directe afstemming met de uitvoerder (in de regel 1-op-1).</li>
              <li>• Duidelijke rolverdeling en randvoorwaarden vóór start.</li>
              <li>• Transparantie over kosten/fee en afspraken (scenario-afhankelijk).</li>
              <li>• Spoed-flow mogelijk voor korte inzet met weinig binding.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Wat dit níet is
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Geen bezettingsgarantie of vaste bezetting.</li>
              <li>• Geen klassiek bureau dat roosters dicteert.</li>
              <li>• Geen one-size-fits-all: uitvoering blijft contextafhankelijk.</li>
              <li>• Geen vervanging voor je eigen veiligheidsorganisatie — wél een werkbare schakel.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Dit past bij je als
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Je vooraf kunt uitleggen wie beslist en wie uitvoert.</li>
              <li>• Je rolafbakening belangrijker vindt dan snelle bezetting.</li>
              <li>• Je verantwoordelijkheden wilt kunnen verantwoorden richting audit/OR.</li>
              <li>• Je samenwerking beoordeelt op gedrag en uitvoering, niet op beloftes.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Dit past waarschijnlijk niet als
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Je volledige bezettingsgarantie of vaste roosters eist.</li>
              <li>• Je inzet wilt afdekken met een bureau dat alle verantwoordelijkheid overneemt.</li>
              <li>• Je afspraken pas na de start wilt uitwerken.</li>
              <li>• Je liever snelheid boven uitlegbaarheid zet.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:col-span-2">
            <p className="text-sm font-semibold text-white">Herkenbare scenario&apos;s</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Complex risico, weinig tijd</p>
                <p className="mt-2 text-sm text-slate-200">
                  Je hebt snel inzet nodig, maar alleen als rol, gezag en rapportage vooraf kloppen.
                  Dat is hier het eerste filter.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Rolverdeling vervaagt op uitvoering</p>
                <p className="mt-2 text-sm text-slate-200">
                  Afspraken zijn gemaakt, maar op locatie is niet helder wie beslist.
                  Directe afstemming voorkomt dit gat.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Uitleg aan audit of OR</p>
                <p className="mt-2 text-sm text-slate-200">
                  Je moet kunnen laten zien wie wat deed en waarom.
                  Dossierdiscipline maakt de keuze verdedigbaar.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:col-span-2">
            <p className="text-sm font-semibold text-white">Waarom opdrachtgevers toch vaak bij “één partij” blijven</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              Het echte risico is vaak operationeel en politiek: “wie is aanspreekbaar als het spannend wordt?”
              ProBrandwacht adresseert dat met vooraf afgesproken rolverdeling en communicatie-kaders. Dat werkt
              alleen als beide kanten volwassen organiseren — daarom is selectie en instroom onderdeel
              van de aanpak.
            </p>
            <p className="mt-3 text-sm text-slate-200">
              Wil je sparren over jouw scenario? Mail{' '}
              <a className="underline hover:text-white" href="mailto:info@prosafetymatch.nl">
                info@prosafetymatch.nl
              </a>{' '}
              (reactiesnelheid is afhankelijk van drukte).
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
