import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getRouteMetadata } from '@/lib/seo/metadata'
export const metadata: Metadata = getRouteMetadata('/admin/requests/[id]');


export default async function AdminRequestPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('direct_requests')
    .select('*')
    .eq('id', params.id)
    .maybeSingle()

  if (error) {
    console.error('[admin/requests] fetch error', error)
  }

  if (!data) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Aanvraag #{params.id}</h1>
      <pre className="overflow-x-auto rounded-xl bg-slate-50 p-4 text-sm text-slate-800">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  )
}
