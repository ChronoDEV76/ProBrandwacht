// app/opdrachtgevers/thank-you/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bedankt — aanvraag ontvangen | ProBrandwacht",
  description:
    "We hebben je aanvraag ontvangen. We nemen snel contact met je op.",
  keywords: ["brandwacht","brandwacht inhuren","brandwacht huren","DBA-proof brandwacht","brandwacht tarieven"],
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 space-y-6">
      <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold tracking-tight">Bedankt!</h1>
{/* SEO-UPGRADE START */}
<div className="mt-2 text-slate-600 text-sm">
  <strong>Brandwacht inhuren of huren?</strong> Bij ProBrandwacht vind je eerlijke tarieven en DBA-proof afspraken.
  Lees meer over <a href="/opdrachtgevers/brandwacht-inhuren" className="underline">brandwacht inhuren</a> of vraag direct aan via <a href="/chrono-direct" className="underline">Chrono Direct</a>.
</div>
{/* SEO-UPGRADE END */}
        <p className="mt-2 text-slate-700">
          We hebben je aanvraag ontvangen en nemen{" "}
          <strong>snel contact</strong> met je op om de inzet af te stemmen.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            vakmanschap & duidelijke kostenopbouw
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Eerlijk & DBA-proof
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
      <div className="fixed inset-x-0 bottom-0 z-40 h-16 border-t border-slate-200 bg-white/95 backdrop-blur-[2px] shadow-[0_-2px_8px_rgba(0,0,0,0.05)] sm:hidden">
        <div
          className="mx-auto flex h-full max-w-3xl items-center gap-2 px-4"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <Link
            href="/opdrachtgevers"
            prefetch={false}
            className="flex h-10 flex-1 items-center justify-center rounded-md bg-brand-700 px-4 text-center text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Meer voordelen voor opdrachtgevers
          </Link>
          <Link
            href="/zzp/aanmelden"
            prefetch={false}
            className="flex h-10 items-center justify-center rounded-md border border-slate-200 px-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-white"
          >
            Meld je aan (zzp)
          </Link>
        </div>
      </div>
    </main>
  );
}
