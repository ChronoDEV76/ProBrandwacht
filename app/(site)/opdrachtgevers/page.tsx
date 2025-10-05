
import Link from "next/link"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getSignupUrl } from "@/lib/config"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.probrandwacht.nl"),
  title: {
    default: "Voor opdrachtgevers | Eerlijk brandwachten inhuren – ProSafetyMatch",
    template: "%s | ProSafetyMatch",
  },
  description:
    "Huur brandwachten in zonder verborgen marges. Eerlijk, DBA-proof en met zekerheid van betaling via escrow. Geef je wensen door en bouw mee aan het platform.",
  alternates: {
    canonical: "/opdrachtgevers",
    languages: {
      "nl-NL": "/opdrachtgevers",
    },
  },
  openGraph: {
    url: "https://www.probrandwacht.nl/opdrachtgevers",
    type: "website",
    siteName: "ProBrandwacht.nl",
    title:
      "Voor opdrachtgevers | Eerlijk brandwachten inhuren – ProSafetyMatch",
    description:
      "ProSafetyMatch laat je eerlijk brandwachten inhuren: duidelijk tarief, certificaten-inzicht en escrow-betaling. Minder risico, meer motivatie en controle.",
  },
}

export default function OpdrachtgeversPage() {
  const signupUrl = getSignupUrl()
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="mb-12">
        <div className="rounded-3xl bg-slate-50 p-8 md:p-12 ring-1 ring-slate-200">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Huur brandwachten in zonder verborgen marges – snel, eerlijk en
            DBA-proof
          </h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            Met ProSafetyMatch vind je binnen minuten de juiste brandwachten.
            Jij stelt budget en eisen vast, wij tonen direct wie beschikbaar is.
            Eerlijke beloning, escrow-betaling en altijd aantoonbare
            certificaten. Minder gedoe, meer grip.
          </p>
          <div className="mt-6">
            <PrimaryCTA href={signupUrl}>Meld je bedrijf aan</PrimaryCTA>
          </div>
        </div>
      </section>

      {/* USP’s */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Waarom ProSafetyMatch</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <USP
            title="Volledige tarieftransparantie"
            desc="Je ziet exact wat naar de brandwacht gaat en wat de platformfee is."
          />
          <USP
            title="Escrow-zekerheid"
            desc="Vooraf betalen, automatisch uitbetalen na bevestigde uitvoering."
          />
          <USP
            title="DBA-proof contracten"
            desc="Altijd rechtstreeks tussen opdrachtgever en professional."
          />
          <USP
            title="Kwaliteit zichtbaar"
            desc="Certificaten, reviews en badges in één oogopslag."
          />
          <USP
            title="Budgetcontrole"
            desc="Filter op tariefbandbreedtes en stel je eigen mix samen."
          />
          <USP
            title="Sneller inhuren"
            desc="Geen tussenlagen, direct contact en bevestiging."
          />
        </div>
      </section>

      {/* Uitdaging */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Jullie uitdaging</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card
            title="Onduidelijke tarieven"
            text="Wat gaat er nu echt naar de brandwacht? Bij ons zie je de volledige kostenopbouw."
          />
          <Card
            title="Wisselende motivatie"
            text="Eerlijke beloning en voorspelbare afspraken houden mensen gemotiveerd."
          />
          <Card
            title="Risico & compliance"
            text="DBA-proof afspraken, certificaten-inzicht en escrow verkleinen je risico."
          />
        </div>
      </section>

      {/* Oplossing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Onze oplossing</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ListItem title="Eerlijke tarieven">
            Vaste 10% platformfee en 1–2% escrowkosten. Geen verborgen marges,
            volledige transparantie.
          </ListItem>
          <ListItem title="Heldere afspraken">
            Rol en resultaat zijn contractueel vastgelegd. Altijd duidelijk.
          </ListItem>
          <ListItem title="Snel schakelen">
            Escrow maakt directe inzet en zekerheid mogelijk.
          </ListItem>
          <ListItem title="Gecertificeerd netwerk">
            Inzicht in certificaten, reviews en beschikbaarheid.
          </ListItem>
        </div>
      </section>

      {/* 3 stappen */}
      <section className="mb-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold">Zo werkt het in 3 stappen</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Step n={1} title="Budget & eisen">
            Stel je budgetrange en certificaat-eisen vast. Het platform laat
            alleen passende profielen zien.
          </Step>
          <Step n={2} title="Selectie & bevestiging">
            Vergelijk profielen op tarief en kwaliteit. Bevestig direct de inzet
            met de professional.
          </Step>
          <Step n={3} title="Escrow & uitvoering">
            Betaal vooraf via escrow. Na bevestigde uitvoering volgt automatische
            uitbetaling.
          </Step>
        </div>
      </section>

      {/* Kosten & transparantie */}
      <section className="mb-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Kosten & transparantie</h3>
          <ul className="mt-3 space-y-2 text-slate-700 text-sm">
            <li>
              <strong>10% platformfee</strong> – altijd zichtbaar in de
              kostenopbouw.
            </li>
            <li>
              <strong>1–2% escrowkosten</strong> – zekerheid voor beide kanten.
            </li>
            <li>
              <strong>0% verborgen marges</strong> – tarief gaat direct naar de
              professional.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Budget gestuurd selecteren</h3>
          <p className="mt-2 text-slate-700 text-sm">
            Stel een bandbreedte in (bijv. €38–45/u). Alleen profielen binnen
            budget worden getoond. Je kunt kiezen voor een mix van basis en
            specialisten.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Administratie op orde</h3>
          <p className="mt-2 text-slate-700 text-sm">
            DBA-proof documentatie, urenregistratie en escrow-bewijs. Factuur
            komt altijd rechtstreeks van de zzp’er; het platform faciliteert,
            maar bemiddelt niet.
          </p>
        </div>
      </section>

      {/* Visie */}
      <section className="mb-12 rounded-2xl border bg-amber-50 p-6 text-sm text-amber-900">
        <h3 className="text-lg font-semibold text-amber-900">
          Waarom €30/u vaak tegenvalt
        </h3>
        <p className="mt-2">
          Een tarief van €30/u lijkt scherp, maar leidt vaak tot minder
          motivatie, hoger verloop en meer risico bij specialistische taken. Met
          ProSafetyMatch kies je samen een passend tarief, volledig inzichtelijk
          en duurzaam.
        </p>
      </section>

      {/* Samen bouwen */}
      <section className="mb-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold">Bouw met ons mee</h2>
        <p className="mt-2 max-w-3xl text-slate-700">
          Geef in je aanmelding aan welke certificaten, rapportages en inzichten
          je belangrijk vindt. Zo bouwen we samen aan de nieuwe norm voor eerlijk
          en veilig samenwerken.
        </p>
        <div className="mt-5">
          <PrimaryCTA href={signupUrl}>Meld je bedrijf aan</PrimaryCTA>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-4 text-sm text-slate-600">
        <p>
          <strong>Let op:</strong> ProSafetyMatch is{" "}
          <span className="font-semibold">geen bemiddelingsbureau</span> maar
          een onafhankelijk platform. De overeenkomst wordt altijd rechtstreeks
          gesloten tussen opdrachtgever en professional.
        </p>
      </section>
    </main>
  )
}

/* -------------------------- Kleine componenten -------------------------- */

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-slate-700">{text}</p>
    </div>
  )
}

function ListItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-slate-700">{children}</div>
    </div>
  )
}

function PrimaryCTA({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:")
  const cls =
    "rounded-2xl bg-brand-700 px-5 py-3 text-white hover:bg-brand-500"
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {children}
      </a>
    )
  }
  return <Link href={href} className={cls}>{children}</Link>
}

function USP({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-600"
          aria-hidden
        />
        <div>
          <div className="font-semibold">{title}</div>
          <p className="mt-1 text-sm text-slate-700">{desc}</p>
        </div>
      </div>
    </div>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-800 text-sm font-semibold">
          {n}
        </span>
        <div>
          <div className="font-semibold">{title}</div>
          <p className="mt-1 text-sm text-slate-700">{children}</p>
        </div>
      </div>
    </div>
  )
}

