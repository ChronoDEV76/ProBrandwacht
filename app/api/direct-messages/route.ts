// app/api/direct-messages/route.ts
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

type Viewer = 'agent' | 'customer'
type SenderRole = 'agent' | 'customer' | 'brandwacht' | 'opdrachtgever'

// ---- helpers ----
const s = (v: unknown) => (v === undefined || v === null ? '' : String(v).trim())

const slugify = (value?: string | null) => {
  if (!value) return null
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const normalizeMessage = (row: any) => {
  const body = row?.text ?? row?.message ?? row?.content ?? ''
  return {
    ...row,
    text: row?.text ?? body,
    message: row?.message ?? body,
    content: row?.content ?? body,
    body,
  }
}

async function ensureRequest(requestId: string) {
  const supabaseAdmin = getSupabaseAdmin()
  const { data, error } = await supabaseAdmin
    .from('direct_requests')
    .select('id, contact, email, claimed_name, claimed_by_id')
    .eq('id', requestId)
    .maybeSingle()

  if (error || !data) {
    return { error: error?.message || 'request_not_found' } as const
  }
  return { data } as const
}

// ---- POST: nieuw chatbericht ----
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any))
    const request_id = s(body.request_id ?? body.requestId ?? body.id)
    const textValue = s(body.text ?? body.message ?? body.content)

    if (!request_id || !textValue) {
      const details = {
        request_id,
        raw_request_id: body.request_id ?? body.requestId ?? body.id,
        textLength: textValue.length,
      }
      console.warn('[direct-messages POST] missing fields', details, body)
      return NextResponse.json(
        { ok: false, error: 'missing_fields', details },
        { status: 400 }
      )
    }

    // bepaal rol
    const explicitRole = (s(body.sender_role ?? body.senderRole) as SenderRole | '') || null
    const role: Viewer = body.viewer === 'agent' || body.role === 'agent' ? 'agent' : 'customer'
    let sender_role: SenderRole | null = explicitRole || role
    let sender_name = s(body.sender_name ?? body.senderName)
    let sender_id = s(body.sender_id ?? body.senderId ?? body.slackUserId)
    const source = s(body.source) || (body.viewer ? 'dashboard' : '')

    // vul info aan vanuit de inzet
    const ensured = await ensureRequest(request_id)
    if ('error' in ensured) {
      return NextResponse.json({ ok: false, error: ensured.error }, { status: 404 })
    }
    const request = ensured.data

    if (sender_role === 'agent') {
      sender_id = sender_id || request.claimed_by_id || 'agent'
      sender_name = sender_name || request.claimed_name || 'Brandwacht'
    } else {
      sender_id = sender_id || 'customer'
      sender_name = sender_name || request.contact || request.email || 'Opdrachtgever'
    }

    sender_role = sender_role === 'brandwacht' ? 'agent' : sender_role === 'opdrachtgever' ? 'customer' : sender_role
    if (sender_role !== 'agent' && sender_role !== 'customer') {
      sender_role = role // fallback
    }

    // bouw insert payload
    const insertPayload = {
      request_id,
      sender_id,
      sender_name,
      sender_role,
      source: source || 'dashboard',
      text: textValue,
      content: textValue,
    }

    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('direct_messages')
      .insert([insertPayload])
      .select('*')
      .maybeSingle()

    if (error || !data) {
      console.error('[direct-messages POST] insert error', error)
      return NextResponse.json(
        { ok: false, error: error?.message || 'insert_failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, message: normalizeMessage(data) })
  } catch (e: any) {
    console.error('[direct-messages POST] exception', e)
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'server_error' },
      { status: 500 }
    )
  }
}

// ---- GET: chatgeschiedenis ----
export async function GET(req: Request) {
  const url = new URL(req.url)
  const requestIdRaw =
    url.searchParams.get('request_id') ?? url.searchParams.get('requestId')
  const requestId = s(requestIdRaw)
  if (!requestId) {
    const details = { requestIdRaw, parsed: requestId }
    console.warn('[direct-messages GET] missing request id', details)
    return NextResponse.json(
      { ok: false, error: 'missing_request_id', details },
      { status: 400 }
    )
  }

  const supabaseAdmin = getSupabaseAdmin()
  const { data, error } = await supabaseAdmin
    .from('direct_messages')
    .select('*')
    .eq('request_id', requestId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[direct-messages GET] supabase error', error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }

  const normalized = (data ?? []).map(normalizeMessage)
  return NextResponse.json({ ok: true, messages: normalized, items: normalized })
}
