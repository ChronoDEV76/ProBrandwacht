import type { Metadata } from 'next'
import Link from 'next/link'

import HeroBackground from '@/components/HeroBackground'
import AfbakeningNote from '@/components/afbakening-note'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = getRouteMetadata('/privacy')

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <HeroBackground>
        <section className="mx-auto max-w-5xl px-4 pb-10 pt-14">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
              Privacy
            </span>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Alleen data die nodig is om samenwerking helder te maken.
            </h1>

            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is niet gebouwd om zoveel mogelijk data te verzamelen. Het is gebouwd om rollen,
              afspraken en verantwoordelijkheden zichtbaar te maken -- met minimale gegevens en maximale
              controle voor de gebruiker.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/belangen" className="route-link">
                Kaders en intentie
              </Link>
              <Link href="/contact" className="route-link">
                Verkennend contact
              </Link>
            </div>
          </div>
        </section>
      </HeroBackground>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="panel p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Principes</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>– Dataminimalisatie: alleen wat nodig is voor verkennend contact en afspraken.</li>
            <li>– Transparantie: zichtbaar is wat er wordt opgeslagen en waarom.</li>
            <li>– Controle: beheer van profiel en zichtbaarheid blijft bij de gebruiker.</li>
            <li>– Delen alleen wanneer nodig voor verkennend contact en samenwerking.</li>
            <li>– Geen verkoop van persoonsgegevens.</li>
          </ul>

          <p className="mt-6 text-xs text-slate-500">
            In de praktijk geldt dataminimalisatie: alleen gegevens die nodig zijn voor verkennend contact,
            communicatie en wettelijke verplichtingen. De exacte verwerking kan per situatie contextafhankelijk zijn.
          </p>

        </div>

        <div className="panel mt-6 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Verwerkingsverantwoordelijke</h2>
          <p className="mt-3 text-sm text-slate-200">
            ProBrandwacht is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze
            privacyverklaring.
          </p>
          <p className="mt-3 text-sm text-slate-200">
            <strong>Contactgegevens:</strong>
            <br />
            E: info@probrandwacht.nl
            <br />
            Adres: op verzoek beschikbaar
          </p>
        </div>

        <div className="panel mt-6 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Doeleinden van gegevensverwerking</h2>
          <p className="mt-3 text-sm text-slate-200">
            ProBrandwacht verwerkt persoonsgegevens voor de volgende doeleinden:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>
              <strong>Verkennend contact:</strong> om intakeformulieren te verwerken en vragen te beantwoorden.
            </li>
            <li>
              <strong>Contact en communicatie:</strong> om vragen, reacties en verzoeken te beantwoorden.
            </li>
            <li>
              <strong>Website analytics:</strong> om de functionaliteit van de site te verbeteren met behulp van
              geanonimiseerde gegevens.
            </li>
          </ul>
        </div>

        <div className="panel mt-6 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Rechtsgrond voor verwerking</h2>
          <p className="mt-3 text-sm text-slate-200">
            ProBrandwacht verwerkt persoonsgegevens op basis van de volgende wettelijke grondslagen:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li><strong>Toestemming:</strong> voor intakeformulieren en contact.</li>
            <li><strong>Uitvoering van overeenkomst:</strong> voor het verkennend contact.</li>
            <li><strong>Gerechtvaardigd belang:</strong> voor websiteoptimalisatie en veiligheid.</li>
          </ul>
        </div>

        <div className="panel mt-6 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Categorieën persoonsgegevens</h2>
          <p className="mt-3 text-sm text-slate-200">
            ProBrandwacht kan de volgende gegevens verwerken:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>Naam, e-mail, telefoonnummer.</li>
            <li>Beroepsgegevens (rol, kwalificaties, contextinformatie).</li>
            <li>Uploadbestanden zoals certificaten (alleen als u die deelt).</li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Verwerkers</h2>
          <p className="mt-3 text-sm text-slate-200">
            Voor dienstverlening kunnen verwerkers worden ingeschakeld, zoals:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>
              <strong>Serverhosting en website-infrastructuur</strong> (EU).
            </li>
            <li>
              <strong>Formulier- en gegevensopslag</strong> voor intake.
            </li>
            <li>
              <strong>Bestandsuploads</strong> via beveiligde uploadkanalen (tijdelijke opslag).
            </li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Bewaartermijnen</h2>
          <p className="mt-3 text-sm text-slate-200">
            Persoonsgegevens worden niet langer bewaard dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld,
            tenzij wettelijke verplichtingen een langere bewaartermijn voorschrijven. Intakegegevens en uploads worden
            verwijderd zodra toetsing en eventuele samenwerking zijn afgerond, tenzij wettelijke verplichtingen anders
            vereisen.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Rechten van betrokkenen</h2>
          <p className="mt-3 text-sm text-slate-200">
            Betrokkenen hebben volgens de AVG de volgende rechten:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>Inzage in gegevens.</li>
            <li>Correctie / verbetering.</li>
            <li>Dataportabiliteit.</li>
            <li>Verwijdering (recht om vergeten te worden).</li>
            <li>Beperking van verwerking.</li>
            <li>Bezwaar tegen verwerking.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-200">
            Uitoefenen van rechten kan door te mailen naar: <strong>privacy@probrandwacht.nl</strong>
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold md:text-2xl">Klachten en toezicht</h2>
          <p className="mt-3 text-sm text-slate-200">
            Bij klachten over de verwerking van persoonsgegevens kan contact worden opgenomen via{' '}
            <strong>privacy@probrandwacht.nl</strong>. Daarnaast bestaat het recht een klacht in te dienen bij
            de Autoriteit Persoonsgegevens.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <AfbakeningNote />
      </section>
    </main>
  )
}
