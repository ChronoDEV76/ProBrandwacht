// app/direct/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import DirectRequestForm from "@/components/direct-request-form";
import { SPOED_ROUTE_ENABLED } from "@/lib/featureFlags";
import type { Metadata } from 'next'
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
          24/7 spoedlijn voor inzet van gecertificeerde brandwachten. Snel, transparant en DBA-proof.
          Uitvoering via <strong>Chrono4Solutions</strong>. Voorbeeld spoedtarief: <strong>€50/uur</strong>.
          Bij akkoord betaal je <strong>50% aan</strong> (facilitatiefee 10% inbegrepen).
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Transparante tarieven
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            DBA-proof samenwerking
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            24/7 inzet bij spoed
          </span>
        </div>
      </header>

      {/* Keuze: formulier of live-chat */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Aanvraagformulier</h2>
          <p className="mt-1 text-slate-700 text-sm">
            Dien je project in binnen een paar minuten. We posten je aanvraag direct in het operationele Slack-kanaal zodat beschikbare brandwachten kunnen reageren.
          </p>
          <div className="mt-4">
            <DirectRequestForm />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Spoedchat (live)</h2>
          <p className="mt-1 text-slate-700 text-sm">
            Start direct een live-chat met de pool. Handig bij acute inzet buiten kantoortijden.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">
            <li>Je bedrijf en contact worden ter verificatie vastgelegd.</li>
            <li>Aanvragen worden gemodereerd door Chrono4Solutions.</li>
          </ul>
          <a
            href="/api/direct/spoedchat"
            className="mt-4 inline-flex items-center rounded-md bg-brand-700 px-4 py-2 text-white text-sm font-semibold hover:bg-brand-600"
          >
            Start spoedchat →
          </a>
          <p className="mt-2 text-xs text-slate-500">
            Nog geen toegang? Je ontvangt automatisch een uitnodiging.
          </p>
          <hr className="my-4" />
          <h3 className="text-sm font-semibold text-slate-900">Beschikbaar als brandwacht?</h3>
          <p className="text-sm text-slate-700">Zet jezelf op beschikbaar en reageer op aanvragen.</p>
          <Link
            href="/zzp/aanmelden"
            className="mt-2 inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
          >
            Meld je aan
          </Link>
        </div>
      </section>
    </main>
  );
}
