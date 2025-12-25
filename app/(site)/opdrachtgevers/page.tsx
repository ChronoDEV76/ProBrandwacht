// app/(site)/opdrachtgevers/page.tsx
import Link from 'next/link'
import { SPOED_UI_ENABLED } from '@/lib/featureFlags'
import SeoStructuredData from '@/components/SeoStructuredData'
import { opdrachtgeverFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata = getRouteMetadata('/opdrachtgevers')

export default function OpdrachtgeversPage() {
  const showSpoed = SPOED_UI_ENABLED

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={opdrachtgeverFaq.slice(0, 4)} />

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
              Voor opdrachtgevers die het goed willen regelen
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Samenwerken met <span className="text-emerald-300">zelfstandige brandwachten</span> — helder, professioneel en uitlegbaar
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Goede brandveiligheid vraagt om duidelijke afspraken, directe afstemming en samenwerking binnen wet- en regelgeving.
              ProBrandwacht helpt opdrachtgevers en zelfstandige brandwachten rechtstreeks samenwerken, zonder onnodige tussenlagen of
              onduidelijke constructies.
            </p>

            <ul className="mt-1 max-w-3xl space-y-2 text-sm text-slate-200">
              <li>- Direct contact met zelfstandige professionals</li>
              <li>- Heldere afspraken over tarief, rol en verantwoordelijkheid</li>
              <li>
                - Samenwerken binnen <strong className="font-semibold text-slate-100">DBA-bewuste</strong> kaders
              </li>
            </ul>

            <p className="text-xs text-slate-400">
              Tariefvoorstellen zijn indicatief en afhankelijk van inzet, locatie en certificering. Afspraken maak je altijd in overleg.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Vrijblijvend aanmelden als opdrachtgever
              </Link>

              <Link
                href="/voor-brandwachten"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Bekijk de route voor brandwachten
              </Link>

              {showSpoed && (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
                >
                  Snelle inzet regelen? ProBrandwacht Direct
                </Link>
              )}
            </div>

            <Link href="/belangen" className="text-xs font-medium text-emerald-200 hover:text-emerald-100">
              Bekijk de kaders voor DBA-bewuste samenwerking →
            </Link>
          </div>
        </div>
      </section>

      {/* POSITIONERING + VOORDELEN */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/90">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold md:text-3xl">Wat ProBrandwacht voor opdrachtgevers betekent</h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is een onafhankelijk platform waar opdrachtgevers en zelfstandige brandwachten elkaar vinden op basis van
              duidelijke informatie en afspraken. Je werkt rechtstreeks samen met professionals die hun tarief, inzet en verantwoordelijkheid
              bewaken.
            </p>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Vanuit deze inhoudelijke basis wordt ProSafetyMatch ontwikkeld (in ontwikkeling): de technische laag die afspraken, documentatie
              en samenwerking digitaal kan ondersteunen — zonder extra schakels toe te voegen.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-emerald-300">Heldere informatie</h3>
              <p className="text-sm text-slate-200">
                Inzichtelijke en toetsbare informatie over ervaring en kwalificaties, zonder anonieme dossiers.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-sky-300">Duidelijke afspraken</h3>
              <p className="text-sm text-slate-200">
                Tarief, duur en verantwoordelijkheden worden vooraf afgestemd en vastgelegd. Geen ruis, wel volwassen samenwerking.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-violet-300">DBA-bewuste samenwerking</h3>
              <p className="text-sm text-slate-200">
                Praktische ondersteuning richting uitlegbare samenwerking, zonder je organisatie onnodig complex te maken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAT WE NIET ZIJN */}
      <section className="border-b border-slate-900/60 bg-slate-900/80">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Duidelijke rol, geen ruis</p>
            <h2 className="text-2xl font-semibold md:text-3xl">Wat ProBrandwacht nadrukkelijk niet is</h2>
            <p className="text-sm text-slate-200 md:text-base">
              ProBrandwacht is geen klassiek bemiddelingsbureau en geen klachtenplatform. We nemen geen positie in tussen opdrachtgever en zzp’er,
              en beoordelen geen individuele partijen.
            </p>
            <p className="text-sm text-slate-200 md:text-base">
              Onze rol is het faciliteren van duidelijke afspraken en toetsbare informatie, zodat samenwerking professioneel, controleerbaar en
              uitlegbaar blijft — ook richting HR, OR of toezichthouders.
            </p>
          </div>
        </div>
      </section>

      {/* BRUG */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Brug tussen opdrachtgever en zelfstandige
            </p>
            <h2 className="text-2xl font-semibold md:text-3xl">Samen beslissen, samen vastleggen</h2>
            <p className="text-sm text-slate-200 md:text-base">
              Je bespreekt samen met de zelfstandige brandwacht de context van de inzet: locatie, risico’s, duur en verwachtingen. De zzp’er
              levert profiel, certificaten en tarief; jij vult aan met organisatorische randvoorwaarden. Alles wat wordt afgesproken is voor beide
              partijen inzichtelijk en toetsbaar.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-emerald-300">Direct en duidelijk</h3>
              <p className="text-sm text-slate-200">
                Geen extra lagen om te “vertalen”. Je spreekt met de professional die ook op locatie verantwoordelijkheid neemt.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-sky-300">Toetsbaar en uitlegbaar</h3>
              <p className="text-sm text-slate-200">
                Afspraken, rolverdeling en verwachtingen zijn helder, waardoor samenwerking beter verdedigbaar en controleerbaar wordt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOE HET WERKT */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl font-semibold md:text-3xl">Zo werkt het voor jouw organisatie</h2>
            <p className="text-sm text-slate-200 md:text-base">
              Van eerste afstemming tot inzet op locatie: een overzichtelijk proces zonder onnodige schakels.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-2">
            {[
              {
                step: 'Stap 1',
                title: 'Organisatie aanmelden',
                text: 'Je registreert je als opdrachtgever en geeft aan in welke context je brandwachten inzet.'
              },
              {
                step: 'Stap 2',
                title: 'Inzet afstemmen',
                text: 'Je bespreekt locatie, risico’s, duur en verwachtingen rechtstreeks met zelfstandige professionals.'
              },
              {
                step: 'Stap 3',
                title: 'Direct samenwerken',
                text: 'Je werkt rechtstreeks samen met de brandwacht op basis van heldere afspraken.'
              },
              {
                step: 'Stap 4',
                title: 'Doorontwikkelen met ProSafetyMatch',
                text: 'ProSafetyMatch (in ontwikkeling) kan afspraken en documentatie verder digitaliseren, zonder extra lagen.'
              }
            ].map(({ step, title, text }) => (
              <li key={step} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{step}</div>
                <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
                <p className="text-sm text-slate-200">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Veiligheid op niveau, samenwerking in balans</h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Met ProBrandwacht kies je voor transparantie en vakmanschap, met een samenwerkingsmodel dat goed uitlegbaar is richting HR, OR
              en toezichthouders — zonder bestaande partijen onnodig buitenspel te zetten.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Aanmelden als opdrachtgever
              </Link>

              {showSpoed && (
                <Link
                  href="/probrandwacht-direct-spoed"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-400/10"
                >
                  Snelle inzet nodig? ProBrandwacht Direct
                </Link>
              )}

              <Link
                href="/voor-brandwachten"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
              >
                Lees wat dit betekent voor brandwachten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
