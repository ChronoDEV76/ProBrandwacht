import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'ProBrandwacht — Kennis en duiding',
  description:
    'ProBrandwacht is een onafhankelijk kennis- en duidingsinitiatief. We leggen uit hoe je veilig en uitlegbaar samenwerkt, zonder bureauframing, prijssturing of beloftes.',
  keywords: [
    'brandwacht',
    'zelfstandig samenwerken',
    'brandveiligheid uitvoering',
    'uitlegbaar samenwerken',
    'rolafbakening brandwacht',
  ],
}

const primaryCtaClassName =
  'inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300'
const secondaryCtaClassName =
  'inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10'
const ghostCtaClassName =
  'inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10'

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-slate-300/80">
              Onafhankelijk kennis- en duidingsinitiatief
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Duidelijkheid in de brandwachtenmarkt.
              <span className="block text-slate-200/90">
                Zodat samenwerking veilig en uitlegbaar blijft.
              </span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht legt uit hoe opdrachtgevers en zelfstandige professionals
              praktisch kunnen samenwerken. We helpen afbakenen wat je vooraf
              bespreekt, welke vragen je stelt, welke risico&apos;s je herkent en waar je
              grenzen trekt.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200/90">
              ProBrandwacht duidt de markt en kaders voor zelfstandige samenwerking — het initiatief zelf
              bemiddelt niet en stuurt niet.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/opdrachtgevers" className={primaryCtaClassName}>
                Voor opdrachtgevers
              </Link>
              <Link href="/voor-brandwachten" className={secondaryCtaClassName}>
                Voor brandwachten
              </Link>
              <Link href="/waarom-wij-soms-nee-zeggen" className={ghostCtaClassName}>
                Waarom we soms nee zeggen
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-5">
              <p className="text-sm text-slate-200/90">
                <span className="font-semibold">Afbakening:</span> ProBrandwacht is{' '}
                <span className="font-semibold">geen bureau</span>,{' '}
                <span className="font-semibold">geen werkgever</span>,{' '}
                <span className="font-semibold">geen matching-engine</span> en{' '}
                <span className="font-semibold">geen prijssturing</span>. We duiden en kaderen.
                De afspraken maak je 1-op-1.
              </p>
            </div>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Waarom dit initiatief bestaat</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              De inzet van zelfstandige brandwachten groeit, terwijl regels, verwachtingen en
              verantwoordelijkheden steeds minder duidelijk worden.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              In die onduidelijkheid ontstaan risico&apos;s: voor opdrachtgevers, voor professionals en uiteindelijk
              voor veiligheid op locatie.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold text-white">Wat ProBrandwacht wel doet</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
                <li>Uitleggen hoe zelfstandige samenwerking is bedoeld.</li>
                <li>Benoemen waar rollen en verantwoordelijkheden vervagen.</li>
                <li>Waarschuwen voor schijnconstructies en onduidelijke afspraken.</li>
                <li>Marktontwikkelingen duiden zonder belang of sturing.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold text-white">Wat ProBrandwacht niet doet</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
                <li>Geen bemiddeling of planning.</li>
                <li>Geen tariefadvies of prijsvergelijkingen.</li>
                <li>Geen garanties of zekerheden.</li>
                <li>Geen compliance- of juridische oplossingen.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Voor wie is dit bedoeld?</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200 md:text-base">
              <li>
                Opdrachtgevers die zelfstandige brandwachten inschakelen en hun verantwoordelijkheid serieus
                nemen.
              </li>
              <li>Professionals die bewust zelfstandig willen werken en hun rol scherp willen houden.</li>
              <li>Iedereen die wil begrijpen hoe de brandwachtenmarkt echt functioneert.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht biedt publieke informatie en marktduiding. Samenwerking, afspraken en uitvoering
              blijven in de regel de verantwoordelijkheid van opdrachtgever en professional zelf.
            </p>
            <p className="mt-3 text-sm text-slate-400">Duiden. Waarschuwen. Kaderen. Niet oplossen.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
