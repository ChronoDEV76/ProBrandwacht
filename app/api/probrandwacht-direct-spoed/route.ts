import { NextResponse } from 'next/server';
import { postPbDirectToSlack } from '@/lib/pbDirectSlack';
import { SPOED_ROUTE_ENABLED } from '@/lib/featureFlags';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

const SPOED_FEE_PER_HOUR_EUR = 50;
const PLATFORM_FEE_RATE = 15; // %

function clamp(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function str(v: unknown) {
  return String(v ?? '').trim();
}

function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export async function POST(req: Request) {
  if (!SPOED_ROUTE_ENABLED) {
    return NextResponse.json({ ok: false, error: 'not_available' }, { status: 404 })
  }

  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));

    // Honeypot (bots zetten dit soms vol)
    if (body.website) {
      return NextResponse.json({ ok: false, error: 'Spam' }, { status: 400 });
    }

    // Normalisatie & server-side validatie
    const company = str(body.company);
    const contact = str(body.contact);
    const email   = str(body.email);
    const phone   = str(body.phone) || null;
    const city    = str(body.city) || null;
    const when    = str(body.when) || null;
    const message = str(body.message) || null;

    if (!company || !contact || !email) {
      return NextResponse.json({ ok: false, error: 'missing_required' }, { status: 400 });
    }
    if (!validEmail(email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
    }

    const people = clamp(Number(body.people ?? 1), 1, 20);
    const hours  = clamp(Number(body.hours_estimate ?? 4), 1, 24);

    // Calculaties (in centen)
    const emergencyFeeCents = Math.round(people * hours * SPOED_FEE_PER_HOUR_EUR * 100);
    const depositDueCents   = Math.round(emergencyFeeCents * 0.5);
    const platformFeeCents  = Math.round(emergencyFeeCents * (PLATFORM_FEE_RATE / 100));

    // Opslaan
    const supabase = getSupabaseAdmin()
    const { data: row, error } = await supabase
      .from('direct_requests')
      .insert([{
        company,
        contact,
        email,
        phone,
        city,
        when,
        message,

        source: 'probrandwacht-direct-spoed',
        urgent: true,

        people,
        hours_estimate: hours,

        emergency_fee_per_hour: SPOED_FEE_PER_HOUR_EUR,
        emergency_fee_cents: emergencyFeeCents,
        deposit_due_cents:    depositDueCents,
        platform_fee_rate:    PLATFORM_FEE_RATE,
        platform_fee_cents:   platformFeeCents,

        claim_status: 'open',
      }])
      .select()
      .single();

    if (error || !row) {
      throw new Error(error?.message || 'insert_failed');
    }

    // Slack mag falen zonder de UX te blokkeren
    try {
      await postPbDirectToSlack(row);
    } catch (e) {
      console.error('[Slack post error]', e);
    }

    // Fallback cookie voor thank-you (10 minuten)
    const cookie = [
      `pb_last_request_id=${row.id}`,
      'Path=/',
      'Max-Age=600',
      'SameSite=Lax',
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
    ]
      .filter(Boolean)
      .join('; ');

    return new NextResponse(JSON.stringify({ ok: true, id: row.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    });
  } catch (e: any) {
    console.error('[probrandwacht-direct] error:', e);
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'server_error' },
      { status: 500 }
    );
  }
}
