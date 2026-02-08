import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata = getRouteMetadata('/waarom-wij-soms-nee-zeggen')

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-slate-300/80">
              Uitvoerbaarheid en grensbewaking
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Wanneer randvoorwaarden eerst helder moeten zijn
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-200/90">
              Nee is hier geen oordeel over mensen of intenties. Het is een signaal dat
              randvoorwaarden nog niet compleet zijn voor professioneel, veilig en uitlegbaar werk.
              Als scope, rol en beslislijnen niet kloppen, ontstaan discussies tijdens uitvoering.
              Dat verkleint voorspelbaarheid.
            </p>

            <div className="panel mt-7 p-5">
              <p className="text-sm text-slate-200/90">
                <span className="font-semibold">Afbakening:</span> ProBrandwacht biedt context en herkenning
                bij patronen die in de praktijk voor problemen zorgen, zodat ze vooraf zichtbaar worden.
              </p>
            </div>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4">
          <Reason
            title="1) Scope is te vaag"
            text="Als niemand precies kan zeggen wat bewaakt moet worden en waar de grenzen liggen, wordt veiligheid interpretatie. Vooraf vastleggen wanneer opschaling nodig is, maakt uitvoering toetsbaar."
          />
          <Reason
            title="2) Beslislijnen ontbreken"
            text="Als onduidelijk is wie beslist bij wijziging, stop of escalatie, ontstaat er druk op locatie. Dat werkt onrust in de hand."
          />
          <Reason
            title="3) Randvoorwaarden ontbreken"
            text="Toegang, contactpunt, middelen en overdracht moeten vooraf geregeld zijn; anders wordt uitvoering improvisatie. Dat helpt niemand."
          />
          <Reason
            title="4) Tempo wint van veiligheid"
            text="Als doorwerken belangrijker wordt dan risico's beheersen, hoort de opdracht terug naar de tekentafel."
          />
          <Reason
            title="5) Afspraken zijn niet uitlegbaar"
            text="Als achteraf niet uit te leggen is wat er is afgesproken en waarom, is dat een teken dat vooraf te weinig is afgebakend."
          />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Link href="/opdrachtgevers" className="route-link">
            Checklist voor opdrachtgevers
          </Link>
          <Link href="/voor-brandwachten" className="route-link">
            Voor brandwachten
          </Link>
        </div>
      </section>
    </main>
  )
}

function Reason({ title, text }: { title: string; text: string }) {
  return (
    <div className="panel p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-200/90">{text}</p>
    </div>
  )
}
