import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import AfbakeningNote from '@/components/afbakening-note'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/contact')

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-5xl px-4 pb-10 pt-14">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Contact
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Contact</h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is een onafhankelijk initiatief dat uitlegt hoe samenwerking met zelfstandige
              brandwachten werkt. Het biedt context en praktische aandachtspunten zodat afspraken beter
              voorbereid kunnen worden.
            </p>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Vragen over werkwijze of sparren over rolafbakening en uitvoerbaarheid? Contact opnemen kan via
              dit kanaal. Afspraken over inzet en voorwaarden worden 1-op-1 afgestemd tussen opdrachtgever en
              professional.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/opdrachtgevers" className="route-link">
                Voor opdrachtgevers
              </Link>
              <Link href="/voor-brandwachten" className="route-link">
                Voor brandwachten
              </Link>
              <Link href="/faq" className="route-link">
                Bekijk de FAQ
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Contact opnemen betekent dat ProBrandwacht meedenkt over context en rolafbakening, zodat
              afspraken beter voorbereid kunnen worden.
            </p>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Onderwerpen om te sparren</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>– Rolverdeling en verantwoordelijkheden</li>
              <li>– Uitvoerbaarheid op locatie</li>
              <li>– Welke afspraken vooraf duidelijk moeten zijn</li>
              <li>– Praktische signalen die om extra aandacht vragen</li>
            </ul>
          </div>

          <div className="panel p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Contactkanaal</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              In het bericht kan worden toegevoegd: context (event/industrie/bouw), locatie, rol, en wat er
              onduidelijk is. Dat helpt om knelpunten beter te benoemen.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="panel p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Verkennend contact</h2>
          <p className="mt-3 text-sm text-slate-200">
            Eerst scherp krijgen of de vraag in vorm en rol klopt.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link href="/opdrachtgevers" className="route-link">
              Start bij opdrachtgevers
            </Link>
            <Link href="/voor-brandwachten" className="route-link">
              Start bij brandwachten
            </Link>
            <a href="mailto:info@probrandwacht.nl" className="route-link">
              Contact via e-mail
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <AfbakeningNote />
      </section>
    </main>
  )
}
