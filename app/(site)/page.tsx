import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import AfbakeningNote from '@/components/afbakening-note'

export const metadata: Metadata = {
  title: 'ProBrandwacht — Kennis en uitleg',
  description:
    'ProBrandwacht is een onafhankelijk kennis- en vakplatform. We leggen uit hoe je veilig en uitlegbaar samenwerkt, zonder bureauframing, prijssturing of beloftes.',
  keywords: [
    'brandwacht',
    'zelfstandig samenwerken',
    'brandveiligheid uitvoering',
    'uitlegbaar samenwerken',
    'rolafbakening brandwacht',
  ],
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-16">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">
              Onafhankelijk kennis- en platforminitiatief
            </p>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                Duidelijkheid in de brandwachtenmarkt.
              </h1>
              <p className="text-xl leading-relaxed text-slate-200/90 md:text-2xl">
                Zodat samenwerking veilig, uitlegbaar en zelfstandig blijft.
              </p>
            </div>

            <p className="text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht legt uit hoe opdrachtgevers en zelfstandige brandwachten praktisch
              samenwerken. We maken zichtbaar wat je vooraf bespreekt, waar risico&apos;s
              ontstaan en waar verantwoordelijkheden beginnen en eindigen.
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <Link href="/opdrachtgevers" className="route-link">
                Voor opdrachtgevers
              </Link>
              <Link href="/voor-brandwachten" className="route-link">
                Voor brandwachten
              </Link>
              <Link href="/waarom-wij-soms-nee-zeggen" className="route-link">
                Waarom we soms nee zeggen
              </Link>
            </div>

            <AfbakeningNote className="mt-4" />
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="space-y-10">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="panel p-6">
              <h2 className="section-title">Waarom dit initiatief bestaat</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
                De inzet van zelfstandige brandwachten groeit, terwijl regels, verwachtingen en
                verantwoordelijkheden steeds minder duidelijk worden.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
                In die onduidelijkheid ontstaan risico&apos;s: voor opdrachtgevers, voor professionals en
                uiteindelijk voor veiligheid op locatie.
              </p>
            </div>
            <div className="panel p-6">
              <h3 className="text-lg font-semibold text-white">Wat gaat hier vaak mis?</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
                <li>Scope die niet concreet is vastgelegd</li>
                <li>Beslislijnen die pas tijdens uitvoering blijken</li>
                <li>Onzichtbare tussenlagen die verantwoordelijkheid vervagen</li>
                <li>Afspraken die achteraf niet uitlegbaar zijn</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="section-title">Hoe samenwerking in de praktijk vorm krijgt</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: '1) Afspraken voor inzet',
                  body:
                    'Kader vooraf rol, scope en randvoorwaarden zodat iedereen weet wat wel en niet bij de inzet hoort.',
                },
                {
                  title: '2) Verantwoordelijkheid tijdens uitvoering',
                  body:
                    'Leg vast wie beslist bij wijzigingen, escalatie en stop, zodat veiligheid niet op gevoel draait.',
                },
                {
                  title: '3) Uitlegbaarheid achteraf',
                  body:
                    'Documenteer keuzes en afspraken zodat samenwerking toetsbaar blijft voor opdrachtgever en professional.',
                },
              ].map((item) => (
                <div key={item.title} className="panel p-5">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel p-6">
              <h3 className="text-xl font-semibold text-white">Wat ProBrandwacht wel doet</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
                <li>Uitleggen hoe zelfstandige samenwerking is bedoeld.</li>
                <li>Benoemen waar rollen en verantwoordelijkheden vervagen.</li>
                <li>Waarschuwen voor schijnconstructies en onduidelijke afspraken.</li>
                <li>Marktontwikkelingen uitleggen zonder belang of sturing.</li>
              </ul>
            </div>

            <div className="panel p-6">
              <h3 className="text-xl font-semibold text-white">Wat ProBrandwacht niet doet</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
                <li>Geen bemiddeling of planning.</li>
                <li>Geen tariefadvies of prijsvergelijkingen.</li>
                <li>Geen garanties of zekerheden.</li>
                <li>Geen compliance- of juridische oplossingen.</li>
              </ul>
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="section-title">Voor wie is dit bedoeld?</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
              <li>
                Opdrachtgevers die zelfstandige brandwachten inschakelen en hun verantwoordelijkheid serieus
                nemen.
              </li>
              <li>Professionals die bewust zelfstandig willen werken en hun rol scherp willen houden.</li>
              <li>Iedereen die wil begrijpen hoe de brandwachtenmarkt echt functioneert.</li>
            </ul>
          </div>

          <div className="panel p-6">
            <h2 className="section-title">Juridische disclaimer</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Deze informatie is informatief. ProBrandwacht geeft geen juridisch, fiscaal of
              compliance-advies, bemiddelt niet en biedt geen garanties. Afspraken en tarieven worden
              in de regel 1-op-1 gemaakt tussen opdrachtgever en professional.
            </p>
            <p className="mt-3 text-sm text-slate-400">Uitleg. Waarschuwing. Kader. Niet oplossen.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
