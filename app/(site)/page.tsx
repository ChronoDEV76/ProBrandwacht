import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import AfbakeningNote from '@/components/afbakening-note'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata = getRouteMetadata('/')

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
                ProBrandwacht biedt veiligheidskundige context en duiding bij brandwacht-inzet.
                Rolafbakening, systeemwerking en praktische uitleg — met focus op overzicht en werkbaarheid.
              </p>
            </div>

            <p className="text-lg leading-relaxed text-slate-200/90">
              Dit initiatief helpt opdrachtgevers en zelfstandige brandwachten om samenwerking vooraf scherp
              te krijgen. Het maakt zichtbaar wat vooraf besproken moet worden, waar risico&apos;s ontstaan en
              hoe verantwoordelijkheden in de praktijk verdeeld zijn.
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <Link href="/opdrachtgevers" className="route-link">
                Voor opdrachtgevers
              </Link>
              <Link href="/voor-brandwachten" className="route-link">
                Voor brandwachten
              </Link>
              <Link href="/waarom-wij-soms-nee-zeggen" className="route-link">
                Waarom er soms nee wordt gezegd
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/over-ons" className="route-link">
                Over ProBrandwacht
              </Link>
              <Link href="/platform" className="route-link">
                Platform
              </Link>
              <Link href="/veiligheidskundig-kader" className="route-link">
                Veiligheidskundig kader
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
                De inzet van zelfstandige brandwachten groeit. Juist dan helpt het om regels, verwachtingen
                en verantwoordelijkheden vooraf helder te maken.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
                Dat geeft rust en voorspelbaarheid: voor opdrachtgevers, voor professionals en uiteindelijk
                voor veiligheid op locatie.
              </p>
            </div>
            <div className="panel p-6">
              <h3 className="text-lg font-semibold text-white">Waar onduidelijkheid kan ontstaan</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
                <li>Scope die niet concreet is vastgelegd</li>
                <li>Beslislijnen die pas tijdens uitvoering blijken</li>
                <li>Rollen die in de keten verschuiven zonder heldere afbakening</li>
                <li>Afspraken die achteraf lastig uitlegbaar zijn</li>
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
                    'Kader vooraf rol, scope en randvoorwaarden zodat iedereen weet wat er bij de inzet hoort.',
                },
                {
                  title: '2) Verantwoordelijkheid tijdens uitvoering',
                  body:
                    'Leg vast wie beslist bij wijzigingen, escalatie en stop, zodat veiligheid op feiten draait.',
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
                <li>In kaart brengen hoe zelfstandige samenwerking is bedoeld.</li>
                <li>Benoemen waar rollen en verantwoordelijkheden vervagen.</li>
                <li>Signaleren waar rol- en constructierisico&apos;s ontstaan.</li>
                <li>Marktontwikkelingen beschrijven zonder belang of sturing.</li>
              </ul>
            </div>

            <div className="panel p-6">
              <h3 className="text-xl font-semibold text-white">Afbakening</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base">
                ProBrandwacht biedt veiligheidskundige context en praktische handvatten. Het maakt zichtbaar
                hoe rollen, verantwoordelijkheden en kaders zich in de praktijk tot elkaar verhouden, zodat
                afspraken beter voorbereid kunnen worden.
              </p>
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
            <h2 className="section-title">Juridische context</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Deze informatie is bedoeld als context en overzicht. Afspraken over inzet worden in de regel
              1-op-1 gemaakt tussen opdrachtgever en professional, binnen hun eigen juridische en
              organisatorische kaders.
            </p>
            <p className="mt-3 text-sm text-slate-400">Uitleg. Waarschuwing. Context. Praktijk.</p>
          </div>

          <div className="panel p-6">
            <h2 className="section-title">Faciliterende modellen & ondersteuning</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht blijft de publieke kennislaag. Eventuele faciliterende modellen die
              samenwerking juridisch of administratief ondersteunen, opereren buiten dit platform en hebben
              een eigen rol en verantwoordelijkheid.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Ondersteuning kan bestaan, maar staat los van ProBrandwacht; tariefafspraken blijven bij de
              betrokken partijen.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
