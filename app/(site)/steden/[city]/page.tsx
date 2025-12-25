// app/(site)/steden/[city]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import HeroBackground from "@/components/HeroBackground";
import { HeroShell } from "@/components/layout/hero-shell";
import { InfoCardsRow } from "@/components/layout/info-cards-row";
import StructuredBreadcrumbs from "@/components/structured-breadcrumbs";
import {
  CITY_RECORD_MAP,
  CITY_SLUGS,
  type CityRecordShape,
  type CitySlug,
} from "@/lib/city-data";
import { opdrachtgeverFaq } from "@/lib/seo/commonFaqs";
import { getRouteMetadata } from "@/lib/seo/metadata";
import { SPOED_UI_ENABLED } from "@/lib/featureFlags";

// ✅ SEO/snelheid: ISR (aanrader)
// Zet bv 1 dag; kies 3600 (1 uur) als je city-data vaak wijzigt.
export const revalidate = 86400;

// Laat dynamic weg als je ISR wil.
// export const dynamic = "force-dynamic";

const BASE_URL = "https://www.probrandwacht.nl";

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

const isCitySlug = (value: string): value is (typeof CITY_SLUGS)[number] =>
  CITY_SLUGS.includes(value as (typeof CITY_SLUGS)[number]);

const resolveLabel = (city: CitySlug) =>
  CITY_RECORD_MAP[city]?.name ?? city.replace(/-/g, " ");

// helper om lijsten netjes/compact te houden
function listToSentence(items: string[], max = 4) {
  const cleaned = (items ?? []).map((s) => s.trim()).filter(Boolean);
  const head = cleaned.slice(0, max);
  const tail = cleaned.length > max ? " e.a." : "";
  return head.join(", ") + tail;
}

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const rawCity = params.city;

  if (!isCitySlug(rawCity)) {
    return {
      title: "Pagina niet gevonden | ProBrandwacht",
      robots: { index: false, follow: false },
    };
  }

  const label = resolveLabel(rawCity);
  const canonical = `${BASE_URL}/steden/${rawCity}`;
  const base = getRouteMetadata("/steden/[city]");
  const title = `Zelfstandige brandwacht in ${label} | ProBrandwacht`;

  const cityData = CITY_RECORD_MAP[rawCity] as CityRecordShape;
  const sectorNotes = cityData?.sectorNotes;

  const description = sectorNotes
    ? `Zelfstandige brandwacht in ${label}? ${sectorNotes} ProBrandwacht helpt met duidelijke afspraken, directe afstemming en DBA-bewuste samenwerking.`
    : `Zelfstandige brandwacht in ${label}? ProBrandwacht helpt met duidelijke afspraken, directe afstemming en DBA-bewuste samenwerking.`;

  return {
    ...base,
    title,
    description,
    alternates: { canonical, languages: { "nl-NL": canonical } },
    openGraph: { ...(base.openGraph ?? {}), title, description, url: canonical },
    twitter: { ...(base.twitter ?? {}), title, description },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const rawCity = params.city;
  if (!isCitySlug(rawCity)) return notFound();

  const label = resolveLabel(rawCity);
  const cityData = CITY_RECORD_MAP[rawCity] as CityRecordShape;

  const venues = cityData?.venues ?? [];
  const industrialAreas = cityData?.industrialAreas ?? [];
  const sectorNotes = cityData?.sectorNotes;

  const venueNames = listToSentence(venues, 4);
  const industrialNames = listToSentence(industrialAreas, 4);

  const venueLine = venues.length
    ? `Evenementlocaties zoals ${venueNames} en vergelijkbare plekken zorgen geregeld voor tijdelijke installaties en publieksrisico’s.`
    : `Evenementen, utiliteitsbouw en tijdelijke installaties zorgen regelmatig voor extra toezicht en duidelijke rolverdeling.`;

  const industrialLine = industrialAreas.length
    ? `Rond ${industrialNames} ligt de nadruk vaak op industriële stops, heetwerk en logistieke omgevingen.`
    : `In industriële en logistieke omgevingen draait het vaak om toezicht bij onderhoud, heetwerk en besloten ruimten.`;

  const sectorLine =
    sectorNotes ??
    "De inzet wisselt tussen preventief toezicht, brandmeldinstallaties en ondersteuning bij projecten met verhoogd risico.";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: opdrachtgeverFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://www.probrandwacht.nl/" },
    { name: `Steden`, url: "https://www.probrandwacht.nl/steden" },
    {
      name: `Zelfstandige brandwacht in ${label}`,
      url: `https://www.probrandwacht.nl/steden/${rawCity}`,
    },
  ];

  const cards = [
    {
      eyebrow: "Voor professionals",
      title: `Werken als zelfstandige brandwacht in ${label}`,
      body: (
        <>
          Praktische uitleg over rollen (bijv. industrieel, event, mangat/buitenwacht),
          verantwoordelijkheden en hoe je jezelf professioneel positioneert in en rond{" "}
          {label}. Gericht op zelfstandig ondernemen — zonder ruis of tussenlagen.
        </>
      ),
    },
    {
      eyebrow: "Samenwerking & kaders",
      title: "Duidelijke afspraken (DBA-bewust) zonder gedoe",
      body: (
        <>
          Hoe je in {label} vooraf helder afspreekt wie waarvoor verantwoordelijk is,
          welke verwachtingen er zijn, en hoe je dit uitlegbaar vastlegt tussen
          opdrachtgever en zelfstandige brandwacht.
        </>
      ),
    },
    {
      eyebrow: "Tarief & afspraken",
      title: "Eerlijk afstemmen over inzet, tarief en randvoorwaarden",
      body: (
        <>
          Voorbeelden van dag-, nacht- en weekendinzet, verschil tussen preventieve en
          repressieve inzet, en hoe je helder communiceert over tarief, reistijd en
          wachtdiensten — zodat verwachtingen aan beide kanten kloppen.
        </>
      ),
    },
  ];

  const secondaryCta = SPOED_UI_ENABLED
    ? { href: "/probrandwacht-direct-spoed", label: "Spoed? ProBrandwacht Direct" }
    : undefined;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-14 pt-8">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            Zelfstandige brandwacht in {label}
          </h1>

          <HeroShell
            eyebrow={`Voor zelfstandige brandwachten & opdrachtgevers in ${label}`}
            title={
              <>
                Duidelijke afspraken. Directe afstemming.
                <br />
                Professioneel samenwerken in {label}.
              </>
            }
            headingLevel="h2"
            body={
              <>
                ProBrandwacht helpt zelfstandige brandwachten en opdrachtgevers elkaar vinden op basis van
                vakmanschap, rolverdeling en afspraken die toetsbaar blijven. Geen klachtenplatform en geen
                klassieke bemiddeling: je spreekt samen tarief, inzet en verantwoordelijkheid af — DBA-bewust en
                uitlegbaar.
              </>
            }
            primaryCta={{ href: "/voor-brandwachten", label: "Route voor brandwachten" }}
            secondaryCta={secondaryCta}
            footer={
              <>
                ProSafetyMatch is in ontwikkeling als technische laag om afspraken en samenwerking stap voor stap
                digitaal te ondersteunen — zonder extra schakels toe te voegen.
              </>
            }
          />
        </div>
      </HeroBackground>

      {/* MOBILE CTA BAR */}
      <div className="fixed bottom-4 left-4 right-4 z-20 md:hidden">
        <Link
          href="/opdrachtgevers/aanmelden"
          className="flex items-center justify-center rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-300"
        >
          Brandwacht inhuren in {label}
        </Link>
      </div>

      {/* MID CTA / UITLEG */}
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-10 pt-6 md:flex-row md:items-center">
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Meebouwen aan een werkbare route in {label}
          </h2>

          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            We zoeken zelfstandige brandwachten en opdrachtgevers in {label} die professioneel willen samenwerken:
            met heldere profielen (certificaten/ervaring), directe afstemming en afspraken die vooraf kloppen.
          </p>

          <p className="text-sm text-slate-200 md:text-base">
            ProBrandwacht is de vakinhoudelijke basis. ProSafetyMatch is in ontwikkeling als technische laag (o.a. planning/documentatie),
            zodat samenwerking later makkelijker kan worden — zonder dat je autonomie verdwijnt.
          </p>

          <p className="text-xs text-slate-400">
            We doen geen tarief-dwang en geen grote claims: afspraken maak je altijd in overleg. Voorbeelden zijn indicatief en afhankelijk van context.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
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
        </div>

        <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.6)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Voor opdrachtgevers
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>- Direct zicht op certificaten, ervaring en rolprofielen in {label}.</li>
            <li>- Duidelijke afspraken over tarief, inzet en verantwoordelijkheid.</li>
            <li>- DBA-bewust samenwerken zonder onnodige tussenlagen.</li>
          </ul>

          <div className="mt-4">
            <Link href="/opdrachtgevers" className="text-sm font-semibold text-emerald-200 hover:text-emerald-100">
              Lees de opdrachtgever-route →
            </Link>
          </div>
        </div>
      </section>

      <div className="pt-2">
        <InfoCardsRow items={cards} />
      </div>

      {/* LOKALE CONTEXT */}
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-10">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Lokale context in {label}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 md:text-3xl">
            Waar kom je dit type inzet vaak tegen in {label}?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            In {label} zie je brandwacht-inzet terug bij projecten waar tijdelijke installaties, publieksveiligheid
            of verhoogd brandrisico samenkomen. {venueLine} {industrialLine}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">{sectorLine}</p>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-100">
              Praktische afspraken die in {label} vaak terugkomen
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>- Afspraken over aanrijtijd en reistijd, zeker bij piekmomenten of nachtwerk.</li>
              <li>- Parkeren, toegang en meldpunten: vooraf helder vastleggen om vertraging te voorkomen.</li>
              <li>- Duidelijke rolverdeling bij tijdelijke installaties of bouw- en onderhoudswerk.</li>
              <li>- Contactlijnen voor escalatie: wie beslist wanneer er wordt opgeschaald.</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/voor-brandwachten"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Route voor brandwachten
            </Link>
            <Link
              href="/opdrachtgevers"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
            >
              Route voor opdrachtgevers
            </Link>
            <Link
              href="/belangen"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
            >
              Bekijk de kaders
            </Link>
            <Link
              href="/steden"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-300 hover:text-emerald-200"
            >
              Terug naar stedenoverzicht
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-6">
        <section className="rounded-[26px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold text-slate-50">Veelgestelde vragen</h2>
          <ul className="mt-3 space-y-3">
            {opdrachtgeverFaq.map((f) => (
              <li key={f.question}>
                <p className="text-sm font-semibold text-slate-50">{f.question}</p>
                <p className="mt-1 text-sm text-slate-200">{f.answer}</p>
              </li>
            ))}
          </ul>
        </section>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
