// app/direct/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from 'next'

import { Cta } from "@/components/Cta";
import DirectRequestForm from "@/components/direct-request-form";
import { SPOED_ROUTE_ENABLED } from "@/lib/featureFlags";
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/direct');


export default function ProBrandwachtDirectPage() {
  if (!SPOED_ROUTE_ENABLED) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 space-y-10">
      <header className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold tracking-tight">ProBrandwacht Direct</h1>
        <p className="mt-2 text-slate-700">
          Spoedlijn voor inzet van gecertificeerde brandwachten. Bij spoedinzet wordt gezocht naar beschikbare professionals die passen bij de context en het risicoprofiel van de opdracht. Duidelijk en DBA-bewust.
          Uitvoering via de spoedroute van ProBrandwacht. Voorbeeld spoedtarief: <strong>€50/uur</strong>.
          Bij akkoord betaal je <strong>50% aanbetaling</strong> (facilitatiefee 10% inbegrepen).
        </p>
        <p className="mt-1 text-sm text-slate-700">Spoedflow is in beta (technische route); beschikbaarheid blijft contextafhankelijk.</p>
        <p className="mt-1 text-sm text-slate-700">We reageren zo snel als mogelijk - je staat er niet alleen voor.</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li>• Dien je spoedaanvraag in (we delen alleen wat nodig is).</li>
          <li>• We verwerken de aanvraag en stemmen af via e-mail.</li>
          <li>• Je krijgt bevestiging en afspraken per mail.</li>
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Duidelijke tarieven
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Samenwerken binnen Wet DBA
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Spoedinzet op basis van beschikbaarheid
          </span>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm text-slate-700">
        <h2 className="text-base font-semibold text-slate-900">Vertrouwd voor spoedopdrachten</h2>
        <ul className="mt-2 space-y-1">
          <li>• Rijksgediplomeerde brandwachten, certificaten zichtbaar</li>
          <li>• Duidelijke 10% fee en vooraf afgestemde betalingen</li>
          <li>• Alle afspraken en chatlogs beschikbaar bij terugkoppeling</li>
        </ul>
      </div>

      {/* Keuze: formulier of live-chat */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Aanvraagformulier</h2>
          <p className="mt-1 text-slate-700 text-sm">
            Dien je project in. We posten je aanvraag in het operationele Slack-kanaal zodat beschikbare brandwachten kunnen reageren.
          </p>
          <div className="mt-4">
            <DirectRequestForm />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Spoedroute</h2>
          <p className="mt-1 text-slate-700 text-sm">
            Versnelde route voor acute inzet, met bevestiging en afstemming per e-mail.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">
            <li>Je bedrijf en contact worden ter verificatie vastgelegd.</li>
            <li>Aanvragen worden beoordeeld door ons operations-team.</li>
          </ul>
          <Cta
            id="secondary_spoed_direct"
            className="mt-4 inline-flex items-center rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
          />
          <p className="mt-2 text-xs text-slate-500">
            Nog geen toegang? Je ontvangt automatisch een uitnodiging.
          </p>
          <hr className="my-4" />
          <h3 className="text-sm font-semibold text-slate-900">Beschikbaar als brandwacht?</h3>
          <p className="text-sm text-slate-700">Zet jezelf op beschikbaar en reageer op aanvragen.</p>
          <Cta
            id="primary_select_compact"
            className="mt-2 inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
          />
        </div>
      </section>
    </main>
  );
}
