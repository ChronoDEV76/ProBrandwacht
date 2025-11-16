// app/admin/requests/[id]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StructuredBreadcrumbs from '@/components/structured-breadcrumbs'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

// Server-side Supabase client (safe: this file is a server component)
async function getDirectRequest(id: string) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('direct_requests')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[admin/direct-requests] fetch error', error)
    return null
  }
  return data
}

function formatDate(value?: string | null) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('nl-NL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const request = await getDirectRequest(params.id)
  if (!request) {
    return { title: 'Aanvraag niet gevonden | ProBrandwacht admin' }
  }
  return {
    title: `Spoedaanvraag ${request.company ?? params.id} | ProBrandwacht admin`,
    description: 'Detailoverzicht van een ProBrandwacht Direct-aanvraag.',
  }
}



export default async function DirectRequestDetailPage({
  params,
}: { params: { id: string } }) {
  const request = await getDirectRequest(params.id)
  if (!request) notFound()

  const breadcrumbItems = [
    { name: 'Admin', url: 'https://www.probrandwacht.nl/admin' },
    { name: 'Direct requests', url: 'https://www.probrandwacht.nl/admin/direct-requests' },
    { name: request.company ?? params.id, url: `https://www.probrandwacht.nl/admin/direct-requests/${params.id}` },
  ]

  const claimed = Boolean(request.claimed_at)
  const statusLabel = claimed
    ? `Geclaimd door ${request.claimed_name ?? request.claimed_by ?? 'onbekend'} (${formatDate(request.claimed_at)})`
    : 'Nog niet geclaimd'

  return (
    <div className="min-h-full bg-slate-50 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-8 px-4 sm:px-6">
        <StructuredBreadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">
            {request.company ?? 'Onbekend bedrijf'}{request.city ? ` — ${request.city}` : ''}
          </h1>
          <p className="text-sm text-slate-600">Aanvraag-ID: {params.id}</p>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              claimed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {statusLabel}
          </span>
        </header>

        {/* Compact top summary (dashboard feel) */}
        <section className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-slate-900">Contact:</span> {request.contact ?? '—'}</p>
            <p>
              <span className="font-medium text-slate-900">Email:</span>{' '}
              {request.email ? <Link href={`mailto:${request.email}`} className="underline">{request.email}</Link> : '—'}
            </p>
            <p>
              <span className="font-medium text-slate-900">Telefoon:</span>{' '}
              {request.phone ? <Link href={`tel:${request.phone}`} className="underline">{request.phone}</Link> : '—'}
            </p>
            <p><span className="font-medium text-slate-900">Wanneer:</span> {request.when ?? '—'}</p>
          </div>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-slate-900">Aantal brandwachten:</span> {request.people ?? '—'}</p>
            <p><span className="font-medium text-slate-900">Uren (indicatie):</span> {request.hours_estimate ?? '—'}</p>
            <p><span className="font-medium text-slate-900">Status:</span> {request.claim_status ?? (claimed ? 'claimed' : 'open')}</p>
            {request.claimed_name && (
              <p><span className="font-medium text-slate-900">Geclaimd door:</span> {request.claimed_name}</p>
            )}
          </div>
        </section>

        {/* Detail cards */}
        <section className="grid gap-6 md:grid-cols-2">
          <DetailCard title="Contact">
            <DetailRow label="Contactpersoon" value={request.contact} />
            <DetailRow label="E-mail" value={request.email} isLink={request.email ? `mailto:${request.email}` : undefined} />
            <DetailRow label="Telefoon" value={request.phone} isLink={request.phone ? `tel:${request.phone}` : undefined} />
            <DetailRow label="Locatie" value={request.city} />
          </DetailCard>

          <DetailCard title="Inzet">
            <DetailRow label="Wanneer" value={request.when} />
            <DetailRow label="Aantal brandwachten" value={String(request.people ?? '')} />
            <DetailRow label="Uren (indicatie)" value={request.hours_estimate ? String(request.hours_estimate) : '—'} />
            <DetailRow label="Gevraagde certificaten" value={request.requirements} />
            {/* Alleen als je nog een vrij tekst budgetveld toont */}
            {request.budget && <DetailRow label="Budget" value={request.budget} />}
            <DetailRow label="Urgent" value={request.urgent ? 'Ja' : 'Nee'} />
          </DetailCard>
        </section>

        {/* Toelichting */}
        <section className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Toelichting</h2>
          <p className="whitespace-pre-wrap text-sm text-slate-700">
            {request.message || '—'}
          </p>
        </section>

        {/* Status / Audit */}
        <section className="grid gap-6 md:grid-cols-2">
          <DetailCard title="Status">
            <DetailRow label="Geclaimd door" value={request.claimed_name ?? request.claimed_by ?? '—'} />
            <DetailRow label="Claim Slack ID" value={request.claimed_by_id ?? '—'} />
            <DetailRow label="Geclaimd op" value={formatDate(request.claimed_at)} />
            <DetailRow label="Bron" value={request.source ?? 'probrandwacht-direct'} />
          </DetailCard>

          <DetailCard title="Audit">
            <DetailRow label="Aangemaakt op" value={formatDate(request.created_at)} />
            <DetailRow label="Laatst bijgewerkt" value={formatDate(request.updated_at)} />
          </DetailCard>
        </section>

        {/* Chat placeholder (replace later with realtime component) */}
        <section className="rounded-2xl bg-gray-100 p-6">
          <h2 className="mb-3 font-medium">Chat met opdrachtgever</h2>
          <p className="text-sm text-gray-500">[Chatfunctie komt hier — Supabase Realtime of Slack-thread integratie]</p>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="mailto:info@probrandwacht.nl"
            className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
          >
            Escaleren naar support
          </Link>
          <Link
            href="/admin/direct-requests"
            className="inline-flex items-center rounded-md border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
          >
            Terug naar overzicht
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Components ───────────────────────── */

function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-slate-700">{children}</div>
    </div>
  )
}

function DetailRow({
  label,
  value,
  isLink,
}: {
  label: string
  value?: string | null
  isLink?: string
}) {
  const display = value && String(value).trim() ? String(value) : '—'
  if (isLink && display !== '—') {
    return (
      <p>
        <span className="font-medium text-slate-900">{label}: </span>
        <Link href={isLink} className="underline">{display}</Link>
      </p>
    )
  }
  return (
    <p>
      <span className="font-medium text-slate-900">{label}: </span>
      {display}
    </p>
  )
}
