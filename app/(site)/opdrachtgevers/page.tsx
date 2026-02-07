import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/opdrachtgevers')

export default function OpdrachtgeversPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-14">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-slate-300/80">Voor opdrachtgevers</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Zo houd je brandveiligheidsinzet uitvoerbaar en uitlegbaar
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-200/90">
              Dit initiatief is onafhankelijk. We bieden context en aandachtspunten: welke vragen je vooraf
              stelt, wat je afbakent en welke signalen in de praktijk extra aandacht vragen.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200/90">
              Het platform licht de markt en kaders voor zelfstandige samenwerking toe — uitvoering en keuzes
              blijven bij de betrokken partijen.
            </p>

            <div className="panel mt-7 p-5">
              <p className="text-sm text-slate-200/90">
                <span className="font-semibold">Afbakening:</span> ProBrandwacht opereert onafhankelijk van
                uitvoering en contractering. Jij en de professional maken 1-op-1 afspraken over rol,
                verantwoordelijkheden en uitvoering. Tarief wordt onderling bepaald.
              </p>
            </div>

            <div className="panel mt-4 p-5">
              <p className="text-sm text-slate-200/90">
                <span className="font-semibold">Facilitering:</span> faciliterende modellen voor compliance
                of administratieve ondersteuning vallen buiten dit platform. ProBrandwacht blijft de
                duidende laag, met focus op rolhelderheid en uitlegbaarheid.
              </p>
            </div>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            title="1) Scope en taakgrenzen"
            bullets={[
              'Wat moet er bewaakt worden (werkzaamheden, locatie, risicomomenten)?',
              'Wat valt expliciet buiten scope?',
              'Welke voorwaarden gelden voor stop of opschaling?',
            ]}
          />
          <Card
            title="2) Rollen en beslislijnen"
            bullets={[
              'Wie neemt beslissingen op locatie (operationeel, veiligheid, escalatie)?',
              'Hoe worden wijzigingen doorgevoerd (werkvergunning, LMRA, toolbox)?',
              'Wanneer is "nee" professioneel de juiste keuze?',
            ]}
          />
          <Card
            title="3) Randvoorwaarden voor uitvoering"
            bullets={[
              'Toegang, contactpunten, middelen en rapportage-afspraken',
              'Werktempo, nacht of weekend, overdracht en opvolging',
              "Wat moet vooraf op papier staan zodat uitvoering niet 'op gevoel' gebeurt?",
            ]}
          />
          <Card
            title="4) Documenteerbaar samenwerken"
            bullets={[
              'Leg afspraken vast in duidelijke taal: wat, wie, wanneer, waarom',
              'Maak uitzonderingen zichtbaar (tijdelijke situaties, afwijkingen)',
              "Zorg dat uitleg achteraf mogelijk is: 'zo hebben we het gedaan en daarom'",
            ]}
          />
        </div>

        <div className="panel mt-10 grid gap-4 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="section-title">Wil je een compacte checklist?</h2>
            <p className="mt-2 text-slate-200/90">
              Start bij &quot;Waarom we soms nee zeggen&quot; -- dat geeft je een praktisch kader voor uitvoerbaarheid
              en grensbewaking.
            </p>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <Link href="/waarom-wij-soms-nee-zeggen" className="route-link">
              Bekijk het kader
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function Card({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="panel p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-200/90">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  )
}
