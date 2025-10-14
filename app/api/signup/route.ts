// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

export const runtime = 'nodejs'         // Node runtime (verplicht voor 'pg' in Vercel)
export const dynamic = 'force-dynamic'  // voorkom caching van GET

// --- PG Pool (singleton) ---
declare global {
  // eslint-disable-next-line no-var
  var __pgPool__: Pool | undefined
}

function getPool(): Pool {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Missing POSTGRES_URL environment variable')
  }
  if (!global.__pgPool__) {
    global.__pgPool__ = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false }, // Supabase
      // optioneel: goede defaults voor serverless
      max: 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
    })
  }
  return global.__pgPool__
}

// --- Types ---
type Payload = {
  type?: string
  submittedAt?: string
  userAgent?: string
  email?: string
  data?: Record<string, unknown>
}

// --- Helpers ---
const clamp = (s: string, n: number) => s.slice(0, n)

const extractEmail = (body: Payload): string | null => {
  if (typeof body.email === 'string' && body.email) return clamp(body.email, 254)
  const maybe = body.data && typeof body.data === 'object' ? (body.data as any).email : undefined
  return typeof maybe === 'string' && maybe ? clamp(maybe, 254) : null
}

// --- POST /api/signup ---
export async function POST(req: NextRequest) {
  try {
    const pool = getPool()
    const body = (await req.json()) as Payload

    const type = clamp(body?.type || 'unknown', 64)
    const ua = clamp(body?.userAgent || req.headers.get('user-agent') || '', 512)
    const email = extractEmail(body)

    // client IP (best effort)
    const ipHeader = req.headers.get('x-forwarded-for') || ''
    const clientIp = ipHeader.split(',')[0]?.trim() || null

    // insert (id en created_at hebben defaults in DB)
    const sql = `
      insert into public.signups (type, email, payload, ip, user_agent)
      values ($1, $2, $3::jsonb, $4::inet, $5)
      returning id, created_at
    `
    const params = [type, email, JSON.stringify(body), clientIp, ua]

    const { rows } = await pool.query(sql, params)
    return NextResponse.json({ ok: true, id: rows[0]?.id, createdAt: rows[0]?.created_at })
  } catch (err) {
    console.error('[SIGNUP:POST] error', err)
    const message =
      err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: `Database insert failed: ${message}` }, { status: 500 })
  }
}

// --- GET /api/signup (laatste 10 items) ---
export async function GET() {
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `select id, type, email, created_at
         from public.signups
        order by created_at desc
        limit 10`
    )
    return NextResponse.json({ ok: true, items: rows })
  } catch (err) {
    console.error('[SIGNUP:GET] error', err)
    const message =
      err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: `Database select failed: ${message}` }, { status: 500 })
  }
}

// --- HEAD /api/signup (health check via uptime monitor of Vercel) ---
export async function HEAD() {
  try {
    const pool = getPool()
    await pool.query('select 1')
    return new NextResponse(null, { status: 204 })
  } catch {
    return new NextResponse(null, { status: 500 })
  }
}

