import type { Metadata } from 'next'

import { Cta } from '@/components/Cta'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/platform')

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Platform uitleg
            </span>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Hoe werkt ProBrandwacht als platform?
            </h1>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht faciliteert transparante, zelfstandige samenwerking tussen opdrachtgever en brandwacht
              - geen bureau, geen werkgeversrol, geen matching-engine. Wij zijn geen klassiek bemiddelingsbureau en
              geen uitzendmodel. De nadruk ligt op uitvoerbaarheid, rolhelderheid en professionele verantwoordelijkheid.
            </p>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Dat betekent ook: we werken niet met automatische koppelingen of standaardinschrijvingen.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-4 py-12 md:py-16">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Wat wij doen</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht ondersteunt samenwerking door vooraf helderheid te creeren over:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
            <li>de rol van de brandwacht</li>
            <li>de verantwoordelijkheidsverdeling</li>
            <li>de uitvoerbaarheid van de inzet in de praktijk</li>
            <li>de context waarin gewerkt wordt (vergunning, locatie, risico&apos;s)</li>
          </ul>
          <p className="mt-4 text-sm text-slate-200 md:text-base">
            Alleen als dat klopt, brengen we partijen met elkaar in contact. Soms zeggen we daarom ook nee.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Wat wij niet doen</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
            <li>Wij leveren geen “uren” of volumes.</li>
            <li>Wij geven geen garanties die in de praktijk niet houdbaar zijn.</li>
            <li>Wij schuiven geen risico’s door naar de uitvoerende professional.</li>
            <li>Wij dwingen geen samenwerking af als deze niet past.</li>
          </ul>
          <p className="mt-4 text-sm text-slate-200 md:text-base">
            Dat maakt onze aanpak selectief - en bewust.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Transparantie over kosten</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            Zoals ieder platform brengt ProBrandwacht kosten met zich mee. De zon gaat gratis op. Het
            platform niet.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            Afhankelijk van de samenwerking kan sprake zijn van:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
            <li>een platform- of servicefee, of</li>
            <li>een vooraf afgesproken vergoeding als onderdeel van het tarief</li>
          </ul>
          <p className="mt-4 text-sm text-slate-200 md:text-base">
            Wij werken niet met verborgen opslagen. Hoe kosten zijn opgebouwd en waarvoor ze dienen, maken
            we vooraf inzichtelijk.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Voor wie dit platform past</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
            <li>veiligheid inhoudelijk benaderen</li>
            <li>verantwoordelijkheid serieus nemen</li>
            <li>liever vooraf helderheid hebben dan achteraf discussie</li>
            <li>begrijpen dat niet elke samenwerking automatisch klopt</li>
          </ul>
          <p className="mt-4 text-sm text-slate-200 md:text-base">
            Wie snelle inzet zonder verkenning zoekt, past meestal minder goed bij onze werkwijze.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Hoe start je een samenwerking?</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            Samenwerken begint niet met inschrijven, maar met verkennen.
          </p>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <p className="text-sm font-semibold text-white">Voor zelfstandige brandwachten</p>
              <p className="mt-2 text-sm text-slate-200">
                Je start met een verkennende intake. Geen verplichtingen, geen automatische plaatsing.
              </p>
              <div className="mt-4">
                <Cta id="brandwacht_interest_waitlist" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <p className="text-sm font-semibold text-white">Voor opdrachtgevers</p>
              <p className="mt-2 text-sm text-slate-200">
                Je legt eerst je situatie voor. We kijken of de vraag uitvoerbaar is binnen onze werkwijze.
              </p>
              <div className="mt-4">
                <Cta id="opdrachtgever_explore" />
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-200 md:text-base">
            Professionele samenwerking begint bij eerlijkheid - over rollen, risico&apos;s en ook over geld.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Bronnen & verantwoording</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            We bouwen op praktijkervaring en controleerbare bronnen. Bekijk onze bronverzameling, FAQ en
            achtergrond om de context te zien.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Cta id="secondary_seo_resources" />
            <Cta id="secondary_faq" />
            <Cta id="secondary_over_ons" />
          </div>
        </div>
      </section>
    </main>
  )
}
