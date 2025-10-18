// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// --- Zod schema's ---
const DataSchema = z
  .object({
    // jouw formvelden; pas gerust aan/uitbreid
    email: z.string().email().max(254),
    firstName: z.string().min(1).max(100),
    lastName: z.string().optional(),
    kvk: z.string().min(8).max(12).optional(),
    btw: z.string().optional(),
    skills: z.string().optional(),
    certificateRef: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough() // laat extra velden toe i.p.v. hard fail

const PayloadSchema = z.object({
  type: z.string().min(1).max(64).default('zzp_signup'),
  submittedAt: z.string().datetime().optional(),
  userAgent: z.string().optional(),
  email: z.string().email().max(254).optional(), // los email veld (mag)
  data: DataSchema,
})

const clamp = (s: string, n: number) => s.slice(0, n)

function extractEmail(body: z.infer<typeof PayloadSchema>): string {
  return clamp(body.email ?? body.data.email, 254)
}

// --- Slack helper ---
async function notifySlack(payload: {
  id: string
  type: string
  email: string
  firstName?: string
  kvk?: string
  createdAt?: string
}) {
  const url = process.env.SLACK_WEBHOOK_URL
  if (!url) return // geen webhook geconfigureerd = stil overslaan

  const text =
    `*Nieuwe signup* :rocket:\n` +
    `• *Type*: ${payload.type}\n` +
    `• *Naam*: ${payload.firstName ?? '-'}\n` +
    `• *Email*: ${payload.email}\n` +
    `• *KvK*: ${payload.kvk ?? '-'}\n` +
    `• *Created*: ${payload.createdAt ?? ''}\n` +
    `• *ID*: \`${payload.id}\``

  // Slack expects { text } as JSON for incoming webhook
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
    // geen credentials / no-cors nodig; Slack accepteert dit
  })
}

// ---------- POST /api/signup ----------
export async function POST(req: NextRequest) {
  try {
    // 1) Validatie
    const json = await req.json()
    const parsed = PayloadSchema.safeParse(json)
    if (!parsed.success) {
      const issues = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`)
      return NextResponse.json(
        { ok: false, error: 'Invalid payload', details: issues },
        { status: 400 },
      )
    }
    const body = parsed.data

    // 2) Normalisatie
    const type = clamp(body.type, 64)
    const ua = clamp(body.userAgent || req.headers.get('user-agent') || '', 512)
    const email = extractEmail(body)
    const submittedAtIso = body.submittedAt
      ? new Date(body.submittedAt).toISOString()
      : new Date().toISOString()

    const ipHeader = req.headers.get('x-forwarded-for') || ''
    const clientIp = ipHeader.split(',')[0]?.trim() || null

    // 3) Insert
    const supabase = supabaseServer()
    const { data, error } = await supabase
      .from('intake_signups')
      .insert({
        type,
        email,
        submitted_at: submittedAtIso,
        user_agent: ua,
        ip: clientIp,
        data: body.data,
        source: 'probrandwacht',
      })
      .select('id, created_at')
      .single()

    if (error) {
      console.error('[SIGNUP:POST] supabase error', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
    }

    // 4) Slack melding (best-effort; fout hier mag response niet blokkeren)
    notifySlack({
      id: data!.id,
      type,
      email,
      firstName: (body.data as any).firstName,
      kvk: (body.data as any).kvk,
      createdAt: data!.created_at,
    }).catch(e => console.warn('Slack notify failed:', e?.message ?? e))

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
