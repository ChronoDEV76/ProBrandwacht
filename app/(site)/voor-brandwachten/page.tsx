import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/voor-brandwachten')

export default function VoorBrandwachtenPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-14">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-slate-300/80">Voor brandwachten</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Zelfstandig werken, met duidelijke grenzen
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht helpt je aan taal en kaders om professioneel samen te werken: helderheid over rol,
              scope, beslislijnen en stopcriteria -- zodat je inzet uitvoerbaar blijft en je achteraf kunt
              uitleggen wat er is afgesproken.
            </p>

            <div className="panel mt-7 p-5">
              <p className="text-sm text-slate-200/90">
                <span className="font-semibold">Afbakening:</span> ProBrandwacht opereert onafhankelijk van
                uitvoering en planning. We bieden context en voorbeelden om 1-op-1 afspraken scherper te
                maken. Tariefafspraken blijven onderdeel van die samenwerking.
              </p>
            </div>

            <div className="panel mt-4 p-5">
              <p className="text-sm text-slate-200/90">
                <span className="font-semibold">Facilitering:</span> faciliterende modellen voor compliance
                of administratieve ondersteuning vallen buiten dit platform. ProBrandwacht blijft de kennis-
                en kaderlaag, met focus op duiding en rolhelderheid.
              </p>
            </div>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            title="1) Start met scope in gewone taal"
            bullets={[
              'Wat bewaak je precies (werkzaamheden, zones, risicomomenten)?',
              'Welke signalen betekenen: pauzeren, stoppen, opschalen?',
              'Welke rol past bij jouw inzet en hoe leg je die uit?',
            ]}
          />
          <Card
            title="2) Maak beslislijnen zichtbaar"
            bullets={[
              'Wie is jouw aanspreekpunt op locatie?',
              'Wie hakt knopen door bij wijziging of twijfel?',
              'Hoe wordt een stop of opschaling vastgelegd?',
            ]}
          />
          <Card
            title="3) Houd zelfstandigheid professioneel"
            bullets={[
              "Werk vanuit afspraken en output, niet vanuit 'meedraaien in het team'",
              'Zorg dat grenzen benoembaar zijn (veiligheid > tempo)',
              'Documenteer uitzonderingen: wat week af en waarom',
            ]}
          />
          <Card
            title="4) Durf nee te zeggen wanneer het niet klopt"
            bullets={[
              'Niet elke vraag is uitvoerbaar of verantwoord',
              'Nee is soms de professionele keuze',
              'Leg kort vast: welke randvoorwaarde ontbrak',
            ]}
          />
        </div>

        <div className="panel mt-10 grid gap-4 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="section-title">Lees het nee-kader</h2>
            <p className="mt-2 text-slate-200/90">
              Handig als je twijfel hebt over scope, rolverwarring of onduidelijke uitvoering. Het is een
              praktische grens voor professionaliteit, met respect voor alle partijen.
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
