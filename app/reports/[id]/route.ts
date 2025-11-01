// app/reports/[id]/route.ts
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BUCKET = 'reports'
// optioneel: zet downloadbare bestandsnaam netjes
function filenameFor(id: string) {
  return `persoonlijk-rapport-${id}.pdf`
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  // Optioneel: stricte check op jouw id-vorm
  if (!id || !/^lead-[0-9a-f-]+$/i.test(id)) {
    return new Response('Bad Request', { status: 400 })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // let op: server-side ONLY
  )

  // Als je bestandsnaam vast is:
  const objectPath = `${BUCKET}/${id}.pdf`
  // Of jouw huidige naam: `reports/lead-<uuid>.pdf`
  // const objectPath = `${BUCKET}/lead-${id}.pdf`

  // 1) Signed URL met korte TTL (bijv. 60s)
  const { data: signed, error: signErr } = await supabase
    .storage.from(BUCKET)
    .createSignedUrl(objectPath.replace(`${BUCKET}/`, ''), 60)

  if (signErr || !signed?.signedUrl) {
    return new Response('Not found', { status: 404 })
  }

  // 2) PDF ophalen en terugstreamen (verbergt Supabase-domein)
  const upstream = await fetch(signed.signedUrl)
  if (!upstream.ok) return new Response('Not found', { status: 404 })

  // headers netjes zetten
  const headers = new Headers(upstream.headers)
  headers.set('content-type', 'application/pdf')
  headers.set('content-disposition', `inline; filename="${filenameFor(id)}"`)
  headers.set('cache-control', 'private, max-age=0, must-revalidate')
  // Zorg dat Google deze niet indexeert:
  headers.set('x-robots-tag', 'noindex, nofollow')

  return new Response(upstream.body, { status: 200, headers })
}

