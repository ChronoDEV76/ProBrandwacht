// app/opdrachtgevers/thank-you/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bedankt — aanvraag ontvangen | ProBrandwacht",
  description:
    "We hebben je aanvraag ontvangen. We nemen snel contact met je op.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 space-y-6">
      <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold tracking-tight">Bedankt!</h1>
        <p className="mt-2 text-slate-700">
          We hebben je aanvraag ontvangen en nemen{" "}
          <strong>snel contact</strong> met je op om de inzet af te stemmen.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            vakmanschap & duidelijke kostenopbouw
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Transparant & DBA-proof
          </span>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/opdrachtgevers"
          className="rounded-2xl bg-brand-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-600"
        >
          Terug naar informatie voor opdrachtgevers
        </Link>
        <Link
          href="/"
          className="rounded-2xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-white"
        >
          Naar de homepage
        </Link>
      </section>

      {/* Sticky CTA mobiel */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-6px_18px_rgba(0,0,0,0.06)] p-3 sm:hidden">
        <div className="mx-auto max-w-3xl flex items-center gap-2">
          <Link
            href="/opdrachtgevers"
            className="flex-1 rounded-md bg-brand-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-600"
          >
            Meer voordelen voor opdrachtgevers
          </Link>
          <Link
            href="/zzp/aanmelden"
            className="rounded-md border border-slate-200 px-3 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-white"
          >
            Meld je aan (zzp)
          </Link>
        </div>
      </div>
    </main>
  );
}

