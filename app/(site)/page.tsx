import Link from 'next/link'

import WhyProBrandwachtSection from '@/components/why-probrandwacht-section'
import SeoStructuredData from '@/components/SeoStructuredData'
import { generalPlatformFaq } from '@/lib/seo/commonFaqs'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const metadata = getRouteMetadata('/')

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <SeoStructuredData faqs={generalPlatformFaq.slice(0, 3)} />
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24">
          <div className="relative z-10 max-w-xl space-y-6">
            <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              Nieuwe route voor brandwachten en opdrachtgevers
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              ProBrandwacht
            </h1>
            <h2 className="max-w-2xl text-lg font-medium leading-snug text-slate-100 md:text-xl">
              Een plek waar brandwachten en opdrachtgevers elkaar écht leren kennen
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              ProBrandwacht is het platform waar zelfstandige brandwachten en opdrachtgevers elkaar
              vinden in eerlijke, DBA-bewust samenwerking — zonder klassieke bemiddelingslagen of andere
              onnodige schakels.
            </p>

            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              We begonnen als gesprek aan de keukentafel: hoe kan een brandwacht zijn vakmanschap
              tonen zonder in een doolhof van tussenpartijen te belanden? ProBrandwacht groeide uit
              tot een ontmoetingsplek waar verhalen, certificaten en verwachtingen open op tafel
              liggen. Met elke aanmelding bouwen we samen aan ProSafetyMatch, de technische,
              schaalbare laag die deze menselijke aanpak ondersteunt.
            </p>
            <p className="text-base leading-relaxed text-slate-200 md:text-lg">
              Je deelt alleen wat nodig is, kiest je tarief en bewaakt je agenda. Aan de andere
              kant van de tafel zit een opdrachtgever die weet wie je bent, wat je kunt en hoe jullie
              samen veilig kunnen werken. Jouw kennis en zelfstandigheid staan voorop; die vormen de basis
              van ProSafetyMatch samen met de ervaringen van brandwachten en opdrachtgevers.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/zzp/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Meld je gratis aan voor ProSafetyMatch
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              ProBrandwacht is de vakinhoudelijke basis voor een nieuw initiatief in ontwikkeling - het
              bredere platform voor brand- en safetyprofessionals.
            </p>
            <p className="text-xs text-slate-400">
              ProBrandwacht groeit bewust en zorgvuldig, omdat opdrachtgevers moeten kunnen
              vertrouwen op mensen die ook in de praktijk verantwoordelijkheid nemen.
            </p>
          </div>

          <div className="relative ml-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-black/50 md:w-1/2">
            <h2 className="text-sm font-semibold text-slate-100">
              Wat neem je mee in je verhaal?
            </h2>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>- Je certificaten en ervaring als zelfstandige brandwacht.</li>
              <li>- Je eigen uurtarief en beschikbaarheid.</li>
              <li>- Voorkeuren qua projecten, sector en werktijden.</li>
              <li>- Afspraken die voor iedereen helder en DBA-bewust zijn.</li>
            </ul>
            <p className="text-xs text-slate-400">
              Vandaag beginnen we in de niche van brandwachten. Morgen is dit jouw
              toegangspoort tot een breder safety-netwerk.
            </p>
          </div>
        </div>

        {/* MOBILE CTA BAR */}
        <div className="fixed bottom-4 left-4 right-4 z-20 md:hidden">
          <Link
            href="/zzp/aanmelden"
            className="flex items-center justify-center rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/50 transition hover:bg-emerald-300"
          >
            Start direct: meld je gratis aan
          </Link>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/90">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:py-14">
          <div className="flex-1 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Waarom we begonnen
            </p>
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
              Een moment waarop duidelijk werd wat ontbrak
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            Tijdens de voorbereiding van een groot Dance Event zagen we hoe snel verantwoordelijkheid
            versnipperde zodra er meerdere lagen tussen zaten. Iedereen wilde betere informatie,
            maar niemand wist precies wie waarover kon besluiten. Heldere, transparante informatie en directe lijnen
            bleken het ontbrekende stuk.
            </p>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Dat inzicht is de basis voor dit platform: afspraken, tarieven en rollen worden meteen
              zichtbaar gemaakt, zodat duidelijk is wie waarvoor aan zet is en wanneer er moet worden
              gehandeld.
            </p>
          </div>
          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Uit het veld
            </p>
            <p className="mt-3 text-sm italic text-slate-100">
              ProBrandwacht ontstond toen we merkten hoe snel vertrouwen weglekt zodra er extra
              lagen tussen brandwacht en opdrachtgever komen.
            </p>
            <p className="mt-4 text-xs font-medium text-emerald-300">
              Case: veiligheidsrisico’s beperken bij een groot dance event door directe afstemming tussen
              brandwacht en organisatie
            </p>
          </div>
        </div>
      </section>

      {/* POSITIONERING */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-10 md:py-12">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">Hybride, praktijkgedreven platform</h2>
            <p className="text-sm text-slate-200 md:text-base">
              ProBrandwacht is de inhoudelijke, menselijke laag; ProSafetyMatch wordt de technische,
              schaalbare laag die deze verhalen digitaal maakt. Samen vormen ze een hybride platform
              dat meebeweegt met wetgeving, markt en praktijk. Geen roadmap-retoriek, wel directe
              samenwerking, eerlijke en zelfstandigheid als uitgangspunt.
            </p>
            <p className="text-sm text-slate-200 md:text-base">
              We bouwen, toetsen en schaven bij op basis van wat brandwachten en opdrachtgevers ervaren. Geen absolute claims, geen
              feature-drop, wel duidelijke afspraken en DBA-bewust werken. Tarief en fee-inzicht zijn scenario’s en vaak afhankelijk van
              context; gebruik ze als indicatieve vertrekpunten voor je eigen bespreking.
            </p>
        </div>
      </section>

      {/* VOOR WIE */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/80">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
              Voor zelfstandige professionals en opdrachtgevers die het goed willen regelen
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is er in de eerste plaats voor de{' '}
              <strong className="font-semibold text-emerald-300">zelfstandige brandwacht</strong>{' '}
              die eigen tarief, agenda en voorwaarden wil bewaken en mee wil bouwen aan ProSafetyMatch.
              Opdrachtgevers in industrie, events en infra krijgen een duidelijk beeld van wie ze inhuren
              en helpen tegelijk het platform vormgeven dat zij gebruiken voor eerlijke inzet.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                Voor zelfstandige brandwachten
              </h3>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>- Je bepaalt zelf je tarief en beschikbaarheid.</li>
                <li>
                  - Je behoudt je zelfstandigheid en eigen naam - geen verborgen
                  werkgeverschap.
                </li>
                <li>
                  - Je profiel helpt ProSafetyMatch vullen met betrouwbare data voor bredere
                  safety-opdrachten.
                </li>
                <li>- Je vakkennis en certificaten vormen de basis; geen inhuur zonder jouw verhaal.</li>
              </ul>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                Voor opdrachtgevers
              </h3>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>
                  - Relevante info over ervaring en kwalificaties zonder tussenlagen.
                </li>
                <li>
                  - Heldere, toetsbare afspraken en DBA-bewust samenwerking - zonder
                  ingewikkelde constructies.
                </li>
                <li>
                  - Je helpt ProSafetyMatch ontwikkelen terwijl je DBA-bewust brandwachten inhuurt voor
                  industrie, events of infra.
                </li>
                <li>- Je schakelt rechtstreeks met vakmensen die hun eigen inzet en kennis bewaken.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WAAROM ANDERS DAN EEN BUREAU */}
      <WhyProBrandwachtSection />

      {/* PLATFORM RECRUITMENT */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-12 md:flex-row md:items-center md:py-14">
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
              Blijf op de hoogte van ProSafetyMatch
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              ProBrandwacht is de vakinhoudelijke laag, ProSafetyMatch de technische laag. We zoeken
              zelfstandige brandwachten én opdrachtgevers die samen een eerlijk platform
              vormgeven: direct contact, DBA-bewust en met transparantie over kosten en eventuele marges. Brandwachten houden
              zelf zicht en regie; opdrachtgevers krijgen dezelfde helderheid.
            </p>
            <p className="text-sm text-slate-200 md:text-base">
              Aanmelden = invloed op hoe het platform werkt en hoe profielen, certificaten en
              afspraken zichtbaar blijven; heldere afspraken, eerlijk
              vastgelegd.
            </p>
          </div>
          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Sluit je aan
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Link
                href="/zzp/aanmelden"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Aanmelden als brandwacht
              </Link>
              <Link
                href="/opdrachtgevers/aanmelden"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Aanmelden als opdrachtgever
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Focus op platform: eerlijke, zelfstandigheid en gelijkwaardige samenwerking.
            </p>
          </div>
        </div>
      </section>

      {/* HOE WERKT HET */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
              Zo kan samenwerking via ProSafetyMatch eruitzien (concept in ontwikkeling)
            </h2>
            <p className="text-sm text-slate-200 md:text-base">
              Geen ingewikkelde constructies. Wel een route die voelt alsof je elkaar
              persoonlijk spreekt en die we samen met brandwachten én opdrachtgevers blijven verbeteren.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-2">
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 1
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Je maakt je profiel als brandwacht aan
              </h3>
              <p className="text-sm text-slate-200">
                Je vult ervaring, certificaten, voorkeuren en uurtarief in. Het is een visitekaartje
                én een verhaal: jouw vakkennis en zelfstandigheid bepalen welke opdrachten bij je passen.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 2
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Opdrachtgevers plaatsen eerlijke opdrachten
              </h3>
              <p className="text-sm text-slate-200">
                Locatie, risico&apos;s, duur en gewenste expertise worden helder omschreven. Geen vage
                calls, maar concrete informatie waarmee jij direct kunt inschatten of het past.
              </p>
            </li>
            <li className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stap 3
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                Directe match en afspraken op eigen voorwaarden
              </h3>
              <p className="text-sm text-slate-200">
                Via ProSafetyMatch kun je straks rechtstreeks met elkaar in contact komen (concept in ontwikkeling). Je spreekt voorwaarden af
                binnen duidelijke, DBA-bewust kaders en houdt de lijn kort.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* VAKBOND-STYLE SLOT */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              Wij kiezen geen kamp, we kiezen voor duidelijke afspraken
            </h2>
            <p className="text-sm text-slate-200 md:text-base">
              ProBrandwacht is geen klassieke vakbond, maar wel een plek waar de positie van de
              zelfstandig professional serieus wordt genomen. Geen wij-zij, wel samen helder krijgen
              wat nodig is: duidelijke contracten, kostendekkende tarieven en een rolverdeling die klopt.
            </p>
            <p className="text-sm text-slate-200 md:text-base">
              Zo maken we samen het werkveld veiliger, professioneler en eerlijker -
              zonder de samenwerking met goede opdrachtgevers of bestaande partijen in
              de weg te zitten.
            </p>
            <div>
              <Link
                href="/over-ons"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-400/10"
              >
                Lees onze missie en achtergrond
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
