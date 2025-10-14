// app/api/signup/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { Pool } from 'pg'

// 1 pool voor alle invocations
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }, // voor Supabase
})

type Payload = {
  type?: string
  submittedAt?: string
  userAgent?: string
  data?: Record<string, unknown>
  email?: string // optioneel: halen we ook uit data
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload

    // simpele validatie
    const type = (body.type || 'unknown').slice(0, 64)
    const ua = (body.userAgent || req.headers.get('user-agent') || '').slice(0, 512)

    // probeer een e-mail te pakken uit top-level of uit data.{email}
    const email =
      (body.email as string) ||
      (body.data && typeof body.data === 'object' ? (body.data as any).email : undefined) ||
      null

    // client ip (best effort)
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.ip ||
      null

    // insert
    const q = `
      insert into signups (id, type, email, payload, ip, user_agent)
      values (gen_random_uuid(), $1, $2, $3::jsonb, $4::inet, $5)
      returning id, created_at
    `
    const vals = [type, email, JSON.stringify(body), ip, ua]
    const { rows } = await pool.query(q, vals)

    return NextResponse.json({ ok: true, id: rows[0]?.id, createdAt: rows[0]?.created_at })
  } catch (err: any) {
    console.error('[SIGNUP:POST] error', err)
    return NextResponse.json({ ok: false, error: 'Database insert failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { rows } = await pool.query(
      `select id, type, email, created_at from signups order by created_at desc limit 10`
    )
    return NextResponse.json({ ok: true, items: rows })
  } catch (err: any) {
    console.error('[SIGNUP:GET] error', err)
    return NextResponse.json({ ok: false, error: 'Database select failed' }, { status: 500 })
  }
}

