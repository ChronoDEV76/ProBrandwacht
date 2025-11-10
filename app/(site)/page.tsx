import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "ProBrandwacht — Slimmer werken. Eerlijk verdienen. Samen vooruit.",
  description:
    "Bereken jouw echte waarde als professional. Eerlijke tarieven zonder strijkstok. Samen bouwen we aan een gezonde veiligheidsmarkt.",
  keywords: [
    "brandwacht",
    "brandwacht inhuren",
    "brandwacht huren",
    "DBA-proof brandwacht",
    "brandwacht tarieven",
    "brandwacht 24/7",
  ],
};

// Dynamische client import
const LeadCalculator = dynamic(() => import("@/components/lead-calculator"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-4xl rounded-xl bg-slate-100 p-10 text-center text-slate-400">
      Laden...
    </div>
  ),
});

const SITE_URL = "https://www.probrandwacht.nl";

export default function HomePage() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const segments = pathname.split("/").filter(Boolean);

  // Dynamische breadcrumb opbouw
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    ...segments.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: seg.charAt(0).toUpperCase() + seg.slice(1).replace("-", " "),
      item: `${SITE_URL}/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  // JSON-LD blokken
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProBrandwacht.nl",
    url: SITE_URL,
    logo: `${SITE_URL}/og.jpg`,
  };

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "ProBrandwacht.nl",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brandwacht inhuren",
    serviceType: "Brandveiligheid",
    areaServed: "Nederland",
    provider: { "@type": "Organization", name: "ProBrandwacht.nl", url: SITE_URL },
    description:
      "Transparant brandwachten inhuren: DBA-proof afspraken, eerlijke tariefopbouw (10% platformfee + 1–2% escrow) en snelle opvolging.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };

  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-brand-50 via-white to-white text-slate-900">
      {/* JSON-LD SCRIPTS */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-4xl space-y-16 px-4 pb-20 pt-16 sm:px-6 md:px-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 md:p-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-[13px] font-medium text-emerald-700">
              Geen bureau. Geen marge. Wel regie.
            </div>

            <h1 id="bereken" className="mt-4 text-3xl font-bold sm:text-4xl">
              Brandwacht inhuren: transparant, DBA-proof en snel geregeld
            </h1>

            {/* SEO-UPGRADE */}
            <div className="mt-3 text-slate-600 text-sm">
              <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
              Lees meer over{" "}
              <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">
                brandwacht inhuren
              </a>{" "}
              of vraag direct aan via{" "}
              <a href="/probrandwacht-direct" className="underline">
                ProBrandwacht Direct
              </a>.
            </div>

            <p className="mt-4 mx-auto max-w-2xl text-slate-700">
              ProBrandwacht.nl is het startpunt voor opdrachtgevers en professionals.
              Kies direct wat je nodig hebt:{" "}
              <span className="font-medium">geplande inzet</span> of{" "}
              <span className="font-medium">spoed</span>.
            </p>

            {/* CTA's */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="/probrandwacht-direct"
                className="inline-flex items-center rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              >
                ProBrandwacht Direct — geplande inzet
              </a>
              <a
                href="/probrandwacht-direct-spoed"
                className="inline-flex items-center rounded-2xl border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
              >
                ProBrandwacht Direct spoed — 24/7
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                Eerlijke tariefopbouw (10% platformfee + 1–2% escrow)
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                DBA-proof afspraken
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                Gecertificeerde professionals
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-600 sm:text-sm">
              <span className="font-medium">ProBrandwacht Direct</span> = regulier aanvraagformulier en snelle opvolging.{" "}
              <span className="font-medium">ProBrandwacht Direct spoed</span> = via Slack-kanaal, directe matching en bevestiging.
            </p>
          </div>

          {/* decoratief accent */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-brand-100 blur-2xl sm:block"
          />
        </section>

        {/* LEAD CALCULATOR */}
        <LeadCalculator />

        {/* WHY SECTION */}
        <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">Waarom dit werkt</h2>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Professionals</p>
              <p>Eerlijk tarief, directe afspraken, meer waardering.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Opdrachtgevers</p>
              <p>Meer kwaliteit, minder verloop, helder tarief.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">Veiligheid</p>
              <p>Stabiel, betrouwbaar en aantoonbaar beter.</p>
            </div>
          </div>
          <p className="text-center text-sm text-slate-600 pt-3 border-t border-slate-200">
            Samen maken we de veiligheidssector gezonder. Vandaag eerlijk, morgen sterker.
          </p>
        </section>
      </div>
    </main>
  );
}
