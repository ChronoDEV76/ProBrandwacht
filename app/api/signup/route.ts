// app/api/signup/route.ts
import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres' // ⬅️ dit is de import

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const id = crypto.randomUUID()
  const {
    type = 'unknown',
    firstName, lastName, email, kvk, btw, skills, certificateRef, notes,
  } = body as any

  await sql/* sql */`
    INSERT INTO signups (id, type, first_name, last_name, email, kvk, btw, skills, certificate_ref, notes)
    VALUES (${id}, ${type}, ${firstName}, ${lastName}, ${email}, ${kvk}, ${btw}, ${skills}, ${certificateRef}, ${notes});
  `
  console.log('[SIGNUP:PG] stored', id, email)
  return NextResponse.json({ ok: true, id })
}

export async function GET() {
  const { rows } = await sql/* sql */`
    SELECT id, created_at, type, first_name, last_name, email
    FROM signups
    ORDER BY created_at DESC
    LIMIT 10;
  `
  return NextResponse.json({ ok: true, count: rows.length, items: rows })
}
