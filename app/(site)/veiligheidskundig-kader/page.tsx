import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import Prose from '@/components/prose'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/veiligheidskundig-kader')

export default function VeiligheidskundigKaderPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.probrandwacht.nl/' },
    { name: 'Veiligheidskundig kader', url: 'https://www.probrandwacht.nl/veiligheidskundig-kader' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-10 pt-8 md:flex-row md:items-center">
          <div className="flex-1 space-y-4">
            <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Kenniscluster
            </span>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">Veiligheidskundig kader</h1>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Dit cluster legt principes uit die helpen om brandveiligheid systemisch te begrijpen. Het gaat
              niet om oplossingen, maar om rolhelderheid, mandaat en samenhang in het veiligheidsmodel.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-[0_18px_45px_-25px_rgba(0,0,0,0.7)] md:h-56 md:w-64">
            <Image
              src="/brandvergrootglas.webp"
              alt="Vergrootglas op brandveiligheidsmaatregelen als symbool voor duiding en rol"
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover"
              style={{ objectPosition: 'center 60%' }}
            />
          </div>
        </div>
      </HeroBackground>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <article className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)] md:p-8">
          <Prose>
            <h2>Doel en afbakening</h2>
            <p>
              Het veiligheidskundig kader is bedoeld om spanningen in de praktijk te duiden zonder oordeel
              of handelingsadvies. De teksten beschrijven hoe veiligheid systemisch werkt en waar rollen
              en bevoegdheden uit balans raken.
            </p>

            <h2>Afbakening & kader</h2>
            <p>
              ProBrandwacht duidt de brandwachtenmarkt vanuit een veiligheidskundig perspectief.
              Deze artikelen beschrijven principes, systeemwerking en rolverdeling binnen
              brandveiligheid. Ze bieden context en reflectie — geen advies, geen oplossingen,
              geen garanties.
            </p>
            <ul>
              <li>Geen rol in uitvoering, planning of bemiddeling</li>
              <li>Geen toezichthoudende of handhavende positie</li>
              <li>Geen garanties over uitkomsten of naleving</li>
              <li>Bevoegdheden liggen bij opdrachtgever, vergunningverlener en toezichthouder</li>
            </ul>

            <h2>Hoe we dit onderwerp benaderen</h2>
            <ul>
              <li>We beschrijven principes zoals mandaat, rolzuiverheid en beslisruimte.</li>
              <li>We benoemen waar systemen zichzelf geruststellen in plaats van risico te verminderen.</li>
              <li>We houden de taal beschrijvend en neutraal.</li>
            </ul>

            <h2>Onderwerpen in dit cluster</h2>
            <ul>
              <li>
                <Link href="/blog/aanwezigheid-is-geen-veiligheid">Aanwezigheid is geen veiligheid</Link>
              </li>
              <li>
                <Link href="/blog/waarnemen-zonder-mandaat">Waarnemen zonder mandaat</Link>
              </li>
              <li>
                <Link href="/blog/onbedoelde-veiligheidsillusie-als-systeemfout">
                  Onbedoelde veiligheidsillusie is een systeemfout
                </Link>
              </li>
              <li>
                <Link href="/blog/compliance-is-niet-veiligheid">Compliance is niet hetzelfde als veiligheid</Link>
              </li>
              <li>
                <Link href="/blog/brandwacht-als-signaaldrager">
                  De brandwacht als signaaldrager, niet als risicodrager
                </Link>
              </li>
              <li>
                <Link href="/blog/marktdruk-en-veiligheidskwaliteit">
                  Marktdruk en veiligheidskwaliteit
                </Link>
              </li>
              <li>
                <Link href="/blog/verantwoordelijkheid-in-de-veiligheidsketen">
                  Verantwoordelijkheid in de veiligheidsketen
                </Link>
              </li>
              <li>
                <Link href="/blog/vakmanschap-onder-druk-in-onvolwassen-markt">
                  Vakmanschap onder druk in een onvolwassen markt
                </Link>
              </li>
              <li>
                <Link href="/blog/systeem-botst-met-vakmanschap">
                  Wanneer het systeem botst met het vakmanschap
                </Link>
              </li>
            </ul>

            <h2>Leeswijzer</h2>
            <p>
              De artikelen zijn bedoeld voor toezichthouders, beleidsmakers en professionals die willen
              begrijpen hoe veiligheidssystemen in de praktijk functioneren. De focus ligt op duiding,
              niet op actie.
            </p>
          </Prose>
        </article>
      </section>
    </main>
  )
}
