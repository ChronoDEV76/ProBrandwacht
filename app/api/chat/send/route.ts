import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  const body = await req.json();

  const { request_id, message, sender_name, sender_type } = body;

  if (!request_id || !message)
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('direct_messages').insert([
    {
      request_id,
      message,
      sender_name,
      sender_type,
    },
  ]);

  if (error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
