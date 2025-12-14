import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import HeroBackground from "@/components/HeroBackground";
import { HeroShell } from "@/components/layout/hero-shell";
import { InfoCardsRow } from "@/components/layout/info-cards-row";
import StructuredBreadcrumbs from "@/components/structured-breadcrumbs";
import { CITY_RECORD_MAP, CITY_SLUGS, type CitySlug } from "@/lib/city-data";
import { opdrachtgeverFaq } from "@/lib/seo/commonFaqs";
import { getRouteMetadata } from "@/lib/seo/metadata";
import { SPOED_UI_ENABLED } from "@/lib/featureFlags";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

const isCitySlug = (value: string): value is (typeof CITY_SLUGS)[number] =>
  CITY_SLUGS.includes(value as (typeof CITY_SLUGS)[number]);

const resolveLabel = (city: CitySlug) =>
  CITY_RECORD_MAP[city]?.name ?? city.replace(/-/g, " ");

export const metadata: Metadata = getRouteMetadata("/steden/[city]");

export default function CityPage({ params }: { params: { city: string } }) {
  const rawCity = params.city;

  if (!isCitySlug(rawCity)) return notFound();

  const label = resolveLabel(rawCity);

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
          Overzicht van rollen (rijksgediplomeerd, industrieel, mangat), typische
          opdrachten en verantwoordelijkheden in en rond {label}. Praktisch toepasbaar als je als
          zelfstandige brandwacht wilt weten welke kansen er zijn - en hoe je jezelf
          professioneel kunt positioneren.
        </>
      ),
    },
    {
      eyebrow: "Samenwerking & wetgeving",
      title: "DBA-proof samenwerken zonder gedoe",
      body: (
        <>
          Hoe je in {label} duidelijke afspraken maakt over wie waarvoor
          verantwoordelijk is, hoe gezag wordt georganiseerd en welke documenten je
          gebruikt voor een uitlegbare zzp-samenwerking tussen opdrachtgever en
          zelfstandige brandwacht.
        </>
      ),
    },
    {
      eyebrow: "Tarief & scenario's",
      title: "Transparante afspraken over inzet en tarief",
      body: (
        <>
          Voorbeelden van dag-, nacht- en weekendinzet, verschil tussen preventieve
          en repressieve inzet, en hoe je helder communiceert over tarief, reistijd
          en wachtdiensten - zodat verwachtingen aan beide kanten duidelijk zijn.
        </>
      ),
    },
  ];
  const secondaryCta = SPOED_UI_ENABLED
    ? {
        href: "/probrandwacht-direct-spoed",
        label: "Direct een zelfstandige brandwacht nodig (spoed)?",
      }
    : undefined;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />
      </div>

      <HeroBackground>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 pb-14 pt-8">
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
            Zelfstandige brandwacht in {label}
          </h1>

          <HeroShell
            eyebrow={`Zelfstandige brandwacht ${label} - Voor professionals & opdrachtgevers`}
            title={<>Samenwerken met zelfstandige brandwachten in {label}</>}
            headingLevel="h2"
            body={
              <>
                Alle belangrijke informatie op een plek: rollen, certificaten,
                verantwoordelijkheden, DBA-afspraken en tarieftransparantie voor
                brandwachtinzet in{" "}
                <span className="font-semibold">{label}</span>. Geschikt als
                vertrekpunt voor gesprekken tussen zelfstandige brandwachten en
                opdrachtgevers die het goed willen regelen.
              </>
            }
            primaryCta={{
              href: "/belangen",
              label: "Bekijk de belangen & richtlijnen",
            }}
            secondaryCta={secondaryCta}
            footer={
              <>
                Geen klassieke capaciteitsleverancier: je spreekt altijd zelf
                tarief, taken en gezag af in transparante samenwerking tussen
                opdrachtgever en zelfstandige brandwacht.
              </>
            }
          />
        </div>
      </HeroBackground>

      {/* MOBILE CTA BAR */}
      <div className="fixed bottom-4 left-4 right-4 z-20 md:hidden">
        <Link
          href="/brandwacht-huren"
          className="flex items-center justify-center rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-300"
        >
          Brandwacht inhuren in {label}
        </Link>
      </div>

      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-10 pt-6 md:flex-row md:items-center">
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Brandwacht inhuren in {label}
          </h2>
          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            Zoek je straks een rijksgediplomeerde brandwacht in {label}? We tonen profielen met certificaten
            (gasmeting, mangatwacht/buitenwacht, VCA, BHV) en beschikbaarheid. Tarief, taken en gezag spreek je direct
            af binnen DBA-proof kaders; geen detacheringsmarge.
          </p>
          <p className="text-sm text-slate-200 md:text-base">
            Voor spoed schakelen we handmatig. Voor geplande inzet deel je locatie, risico&apos;s en duur
            zodat beschikbare brandwachten gericht kunnen reageren.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/brandwacht-huren"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
            >
              Brandwacht inhuren
            </Link>
          </div>
        </div>
        <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.6)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Voor opdrachtgevers
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>- Direct zicht op certificaten en ervaring in {label}.</li>
            <li>- DBA-proof afspraken zonder tussenlagen of verborgen tarieven.</li>
            <li>- Optioneel handmatige koppeling bij spoed (ProBrandwacht Direct).</li>
          </ul>
        </div>
      </section>

      <div className="pt-2">
        <InfoCardsRow items={cards} />
      </div>

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-6">
        <section className="rounded-[26px] border border-white/10 bg-slate-950/85 p-6 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="text-xl font-semibold text-slate-50">
            Veelgestelde vragen
          </h2>
          <ul className="mt-3 space-y-3">
            {opdrachtgeverFaq.map((f) => (
              <li key={f.question}>
                <p className="text-sm font-semibold text-slate-50">
                  {f.question}
                </p>
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
