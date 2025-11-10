import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const { request_id, message, sender_name, sender_type } = body;

  if (!request_id || !message)
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });

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

