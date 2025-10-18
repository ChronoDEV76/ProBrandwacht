// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Payload uit je formulier */
type Payload = {
  type?: string
  submittedAt?: string // ISO string
  userAgent?: string
  email?: string // optioneel los veld
  data?: Record<string, unknown> // alle form fields
}

const clamp = (s: string, n: number) => s.slice(0, n)
const extractEmail = (body: Payload): string | null => {
  if (typeof body.email === 'string' && body.email) return clamp(body.email, 254)
  const maybe = body.data && (body.data as any).email
  return typeof maybe === 'string' && maybe ? clamp(maybe, 254) : null
}

// ---------- POST /api/signup ----------
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload

    const type = clamp(body?.type || 'zzp_signup', 64)
    const ua = clamp(body?.userAgent || req.headers.get('user-agent') || '', 512)
    const email = extractEmail(body)

    // client IP (best effort via proxy header)
    const ipHeader = req.headers.get('x-forwarded-for') || ''
    const clientIp = ipHeader.split(',')[0]?.trim() || null

    const supabase = supabaseServer()

    // Insert en direct id/created_at teruggeven
    const { data, error } = await supabase
      .from('intake_signups')
      .insert({
        type,
        email,
        submitted_at: body?.submittedAt
          ? new Date(body.submittedAt).toISOString()
          : new Date().toISOString(),
        user_agent: ua,
        ip: clientIp, // kolomtype inet in je tabel
        data: body?.data ?? {},
        source: 'probrandwacht',
      })
      .select('id, created_at')
      .single()

    if (error) {
      console.error('[SIGNUP:POST] supabase error', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { ok: true, id: data?.id, createdAt: data?.created_at },
      { status: 200 },
    )
  } catch (err) {
    console.error('[SIGNUP:POST] error', err)
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}

// ---------- GET /api/signup (laatste 10) ----------
export async function GET() {
  try {
    const supabase = supabaseServer()
    const { data, error } = await supabase
      .from('intake_signups')
      .select('id, type, email, submitted_at, created_at, source')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('[SIGNUP:GET] supabase error', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ ok: true, items: data ?? [] }, { status: 200 })
  } catch (err) {
    console.error('[SIGNUP:GET] error', err)
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}

// ---------- HEAD /api/signup (health) ----------
export async function HEAD() {
  try {
    const supabase = supabaseServer()
    const { error } = await supabase.from('intake_signups').select('id').limit(1)
    if (error) throw error
    return new Response(null, { status: 204 })
  } catch {
    return new Response(null, { status: 500 })
  }
}
