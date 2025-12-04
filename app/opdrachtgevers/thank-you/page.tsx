// app/opdrachtgevers/thank-you/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/opdrachtgevers/thank-you');


export default function ThankYouPage({
  searchParams,
}: { searchParams?: { id?: string } }) {
  const qsId = searchParams?.id
  const cookieId = cookies().get('pb_last_request_id')?.value
  const requestId = qsId || cookieId || ''

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 space-y-6">
      <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold tracking-tight">Bedankt voor uw spoedaanvraag!</h1>
        <p className="mt-2 text-slate-700">
          We hebben je aanvraag ontvangen en nemen <strong>snel contact</strong> met je op om de inzet af te stemmen.
          Gaat de inzet langer dan 48 uur duren, dan plannen we alvast een reguliere vervolgstap in via{' '}
          <a className="underline" href="/probrandwacht-direct">ProBrandwacht Direct</a>.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            vakmanschap &amp; duidelijke kostenopbouw
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            eerlijk &amp; DBA-proof
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

      {requestId ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm text-emerald-900">
            Je aanvraag is geregistreerd. Je kunt nu verder afstemmen in het inzet-dashboard.
            <br />
            <span className="opacity-70">Aanvraag-ID: {requestId}</span>
          </p>
          <div className="mt-3">
            <Link
              href={`/dashboard/requests/${requestId}?role=customer`}
              className="inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Ga naar inzet-dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Geen aanvraag-ID gevonden in de URL of cookie. Heb je zojuist ingestuurd? Verstuur opnieuw of zorg dat je wordt
          doorgestuurd naar <code>?id=&lt;aanvraag-id&gt;</code>.
        </div>
      )}
    </main>
  )
}
