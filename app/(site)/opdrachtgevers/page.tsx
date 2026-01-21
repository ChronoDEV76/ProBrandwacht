import type { Metadata } from 'next'

import HeroBackground from '@/components/HeroBackground'
import { Cta } from '@/components/Cta'
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
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-14 pt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Voor opdrachtgevers • Zekerheid door uitvoerbaarheid
          </span>

          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            Zekerheid ontstaat vooraf,
            <br />
            <span className="text-emerald-300">niet bij toezicht.</span>
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            ProBrandwacht levert geen papieren brandveiligheid. Wij helpen u de inzet zo te organiseren
            dat rollen helder zijn, verwachtingen kloppen en uitvoering aansluit op vergunning en realiteit.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Cta id="tertiary_contact_exploratory" />
            <Cta
              id="secondary_why_no"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5"
            />
          </div>
        </div>
      </HeroBackground>

      <section className="border-t border-slate-900/60 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-12 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Wat u van ons mag verwachten</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
              <li>
                <strong>Heldere rolverdeling</strong> (geen aannames, geen grijze zones).
              </li>
              <li>
                <strong>Uitvoerbare afspraken</strong>: wat u vraagt moet ook daadwerkelijk kunnen.
              </li>
              <li>
                <strong>Professionals met verantwoordelijkheid</strong> die kunnen ingrijpen en alarmeren.
              </li>
              <li>
                <strong>Minder verrassingen achteraf</strong> door vooraf beter te organiseren.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Samenwerking &amp; tarieven</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Samenwerking</h3>
                <p className="mt-2 text-sm text-slate-200">
                  ProBrandwacht faciliteert de inzet van zelfstandig professionals binnen duidelijke
                  veiligheidskaders. De professional voert de opdracht uit vanuit eigen ondernemerschap. Het
                  platform bewaakt dat rollen en verantwoordelijkheden vooraf helder zijn.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Tarieven</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Tarieven worden vastgesteld door de zelfstandig professional zelf. ProBrandwacht stuurt niet op
                  prijs en bepaalt geen tarieven. Dit voorkomt tariefsturing en draagt bij aan een zuivere
                  samenwerkingsvorm.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Waarom dit belangrijk is</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              In een markt met toenemende bureaucratie ontstaat risico vaak in de ruimte tussen papier en
              praktijk. Als rollen niet expliciet zijn, ontstaat discussie - soms pas bij controle.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Wij helpen u dat voor te zijn: niet door extra regels, maar door{' '}
              <strong>duidelijkheid</strong>.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Onze toets: werkt het in het echt?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Rolzuiverheid</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Is de brandwachtrol expliciet? Is zichtbaar wie toezicht houdt en wie mag ingrijpen?
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Uitvoering & bezetting</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Past de bezetting bij de risico&apos;s? Of is de inzet gebaseerd op aannames die niet
                  houdbaar zijn?
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Vergunning / voorschriften</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Sluit de uitvoering aan op wat is voorgeschreven? Zo voorkomt u discussie bij toezicht.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <h3 className="text-lg font-semibold text-white">Communicatie & verantwoordelijkheid</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Is duidelijk wie beslist bij escalatie? Duidelijkheid voorkomt vertraging als het
                  spannend wordt.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Waarom wij soms nee zeggen</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Soms is een vraag formeel mogelijk, maar praktisch niet uitvoerbaar. Dan zeggen we nee -
              liever vooraf dan achteraf. Dat beschermt niet alleen de brandwacht, maar ook uw organisatie.
            </p>
            <div className="mt-5">
              <Cta id="secondary_how_we_work" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Leg uw situatie voor</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              We kijken graag verkennend mee: wat is vereist, wat is uitvoerbaar, en hoe organiseren we
              dit zo dat het klopt.
            </p>
            <p className="mt-3 text-sm text-slate-200">
              Geen offerte en geen snelle plaatsing - wel een verkennende intake.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Cta id="opdrachtgever_explore" />
              <Cta id="tertiary_contact_exploratory" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
