import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const type =
    typeof body === 'object' && body !== null && 'type' in body && typeof (body as { type?: unknown }).type === 'string'
      ? ((body as { type: string }).type || 'unknown')
      : 'unknown';
  console.log(`[SIGNUP] ${type}`, body);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
