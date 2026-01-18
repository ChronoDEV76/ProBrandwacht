import { Cta } from '@/components/Cta'

export default function BewustZelfstandigWerkenPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Intro */}
        <header className="mb-12 space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Zelfstandig werken in veiligheid
          </h1>
          <p className="text-slate-300">
            Werken als zelfstandige brandwacht betekent meer dan vakkennis en
            certificaten. Het vraagt professioneel oordeel, rolvastheid en
            weten waar jouw verantwoordelijkheid begint - en waar die eindigt.
          </p>
          <p className="text-sm text-slate-400">
            ProBrandwacht is een selectief platform, geen bureau. We bewaken
            uitvoerbaarheid en rolhelderheid. Deze pagina helpt duiden wat
            zelfstandig werken in de praktijk vraagt.
          </p>
        </header>

        {/* Content blocks */}
        <div className="space-y-10 text-sm leading-relaxed text-slate-200">
          <Block
            title="1. Je werkt als zelfstandig professional"
            body="Je levert diensten als zelfstandig ondernemer. Dat betekent: geen hierarchisch gezag, geen operationele aansturing vanuit een bureau en geen leiding vanuit ProBrandwacht. Je handelt op basis van je vakmanschap en ervaring."
          />

          <Block
            title="2. Jij bepaalt hoe je je inzet uitvoert"
            body="Binnen de afgesproken inzet en geldende veiligheidskaders bepaal jij zelf je werkwijze, de volgorde van handelingen en je professionele afwegingen. Dit is essentieel voor zelfstandig werken en voor DBA-bewuste samenwerking."
          />

          <Block
            title="3. ProBrandwacht stuurt niet op de werkvloer"
            body="ProBrandwacht faciliteert matching en transparante afspraken, maar is geen operationele partij. Er is geen planner, geen voorman en geen centrale sturing tijdens de inzet."
          />

          <Block
            title="4. De opdrachtgever blijft eindverantwoordelijk"
            body="De opdrachtgever blijft verantwoordelijk voor vergunningen, organisatie en besluitvorming buiten jouw professionele rol. Jij neemt geen organisatorische verantwoordelijkheid over die niet bij jouw rol als zelfstandige hoort."
          />

          <Block
            title="5. Jij bewaakt je professionele grenzen"
            body="Als omstandigheden afwijken van wat veilig, verantwoord of professioneel is, benoem je dit en maak je het bespreekbaar. Dat is geen tegenwerking, maar professioneel handelen."
          />

          <Block
            title="6. Aanspreekbaarheid op eigen handelen"
            body="Je bent aanspreekbaar op je vakinhoudelijke keuzes en professionele oordeel. Niet op basis van instructies, maar op basis van expertise."
          />

          <Block
            title="7. Geen exclusiviteit of afhankelijkheid"
            body="Je werkt zonder exclusiviteitsverplichting, voor meerdere opdrachtgevers en zonder afhankelijkheid van het platform. Dat is een kernvoorwaarde voor zelfstandig ondernemerschap."
          />

          <Block
            title="8. Afspraken vooraf en transparant"
            body="Afspraken over tarief, duur, inzet en verantwoordelijkheden worden vooraf afgestemd tussen opdrachtgever en zelfstandige. Deze zijn indicatief en contextafhankelijk vastgelegd."
          />

          <Block
            title="9. Dit past niet bij iedereen"
            body="Niet iedere professional wil of hoeft zo te werken. ProBrandwacht is er voor zelfstandigen die bewust kiezen voor deze rol en de bijbehorende verantwoordelijkheid."
          />
        </div>

        {/* Outro */}
        <div className="mt-14 rounded-lg border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
          <p>
            We benoemen dit expliciet omdat duidelijkheid vooraf betere
            samenwerking oplevert en schijnveiligheid voorkomt - voor
            zelfstandigen en opdrachtgevers.
          </p>
          <p className="mt-3 text-slate-400">
            Twijfel je of dit bij je past? Dan gaan we daar graag open over in
            gesprek. Liever helder vooraf, dan ruis achteraf.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Cta id="brandwacht_interest_waitlist" />
            <Cta id="secondary_why_no" className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5" />
          </div>
        </div>
      </section>
    </main>
  )
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-base font-medium text-slate-100">{title}</h2>
      <p className="text-slate-300">{body}</p>
    </div>
  )
}
