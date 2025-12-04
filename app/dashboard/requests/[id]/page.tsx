// app/dashboard/requests/[id]/page.tsx
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import Link from 'next/link';
import ChatBox from './ChatBox';
import type { Metadata } from 'next'
import { getRouteMetadata } from '@/lib/seo/metadata'

export const dynamic = 'force-dynamic';

function fmt(v?: string | number | null) {
  if (v === null || v === undefined || v === '') return '—';
  return String(v);
}
export const metadata: Metadata = getRouteMetadata('/dashboard/requests/[id]');


export default async function RequestDashboardPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseAdmin()
  const { data: request, error } = await supabase
    .from('direct_requests')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (error || !request) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Aanvraag niet gevonden</h1>
        <p className="mt-2 text-slate-600">{error?.message ?? 'Onbekende fout.'}</p>
        <div className="mt-4">
          <Link href="/" className="underline">Terug naar home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">
          Inzet: {fmt(request.company)} {request.city ? `(${request.city})` : ''}
        </h1>

        <div className="grid gap-4 rounded-xl bg-white p-4 shadow md:grid-cols-2">
          <div>
            <p><strong>Contact:</strong> {fmt(request.contact)}</p>
            <p><strong>E-mail:</strong> {fmt(request.email)}</p>
            <p><strong>Telefoon:</strong> {fmt(request.phone)}</p>
            <p><strong>Wanneer:</strong> {fmt(request.when)}</p>
          </div>
          <div>
            <p><strong>Aantal brandwachten:</strong> {fmt(request.people)}</p>
            <p><strong>Uren (indicatie):</strong> {fmt(request.hours_estimate)}</p>
            <p><strong>Status:</strong> {fmt(request.claim_status)}</p>
            {request.claimed_name && (
              <p><strong>Geclaimd door:</strong> {fmt(request.claimed_name)}</p>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <h2 className="mb-2 font-medium">Toelichting</h2>
          <p className="whitespace-pre-wrap">{fmt(request.message)}</p>
        </div>

        {/* Chat: rol wordt via URL (?role=agent|customer) bepaald in ChatBox */}
        <ChatBox requestId={params.id} />

        <Link
          href="/"
          className="inline-flex w-fit rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
        >
          Terug
        </Link>
      </div>
    </main>
  );
}
