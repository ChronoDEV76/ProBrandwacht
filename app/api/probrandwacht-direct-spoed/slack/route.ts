// app/api/probrandwacht-direct/slack/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { renderRequestBlocks } from '@/lib/slackBlocks';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

function verifySlack(req: Request, rawBody: string) {
  const ts = req.headers.get('x-slack-request-timestamp') || '';
  const sig = req.headers.get('x-slack-signature') || '';
  const base = `v0:${ts}:${rawBody}`;
  const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET!);
  const mySig = `v0=${hmac.update(base).digest('hex')}`;
  return sig && crypto.timingSafeEqual(Buffer.from(mySig), Buffer.from(sig));
}

// Helper – haal beste weergavenaam op via Slack Web API
async function getSlackDisplayName(user: any): Promise<string> {
  const userId = user?.id;
  if (!userId) {
    // Fallbacks als er geen id is (komt zelden voor)
    return (
      user?.profile?.display_name ||
      user?.real_name ||
      user?.name ||
      user?.username ||
      'onbekend'
    );
  }

  // 1) Probeer via Web API (betrouwbaarst)
  try {
    const resp = await fetch(
      `https://slack.com/api/users.info?user=${encodeURIComponent(userId)}`,
      {
        headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
      }
    );
    const json = await resp.json();
    if (json?.ok) {
      const u = json.user || {};
      const p = u.profile || {};
      return (
        p.display_name ||
        u.real_name ||
        p.real_name ||
        u.name ||
        userId
      );
    }
  } catch {
    // negeer, val terug op lokale payload
  }

  // 2) Fallback op wat wél in payload zit
  return (
    user?.profile?.display_name ||
    user?.real_name ||
    user?.name ||
    user?.username ||
    userId
  );
}

export async function POST(req: Request) {
  const raw = await req.text();

  if (!verifySlack(req, raw)) {
    return NextResponse.json({ ok: false, error: 'bad_signature' }, { status: 401 });
  }

  const payload = JSON.parse(new URLSearchParams(raw).get('payload') || '{}');
  const action = payload?.actions?.[0];
  const requestId: string | undefined = action?.value;
  const responseUrl: string | undefined = payload?.response_url;
  const supabase = getSupabaseAdmin()

  if (!action || !requestId || !responseUrl) {
    return NextResponse.json({ ok: false, error: 'bad_payload' }, { status: 400 });
  }

  try {
    if (action.action_id === 'claim_request') {
      const name = await getSlackDisplayName(payload.user);

      const { data: row, error } = await supabase
        .from('direct_requests')
        .update({
          claim_status: 'claimed',
          claimed_at: new Date().toISOString(),
          claimed_by_id: payload.user?.id ?? null,
          claimed_name: name, // altijd nette naam
        })
        .eq('id', requestId)
        .select('*')
        .maybeSingle();

      if (error || !row) {
        throw new Error(error?.message || 'update_failed');
      }

      await fetch(responseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          replace_original: true,
          blocks: renderRequestBlocks(row),
          text: `Inzet ${requestId}`, // fallback
        }),
      });

      return NextResponse.json({ ok: true });
    }

    if (action.action_id === 'set_status_progress') {
      // Optioneel: als nog niet geclaimd, claim nu door de klikker
      const name = await getSlackDisplayName(payload.user);

      const { data: current } = await supabase
        .from('direct_requests')
        .select('*')
        .eq('id', requestId)
        .maybeSingle();

      const patch: any = { claim_status: 'in_progress' };
      if (!current?.claimed_by_id) {
        patch.claimed_by_id = payload.user?.id ?? null;
        patch.claimed_name = name;
        patch.claimed_at = new Date().toISOString();
      }

      const { data: row, error } = await supabase
        .from('direct_requests')
        .update(patch)
        .eq('id', requestId)
        .select('*')
        .maybeSingle();

      if (error || !row) {
        throw new Error(error?.message || 'update_failed');
      }

      await fetch(responseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          replace_original: true,
          blocks: renderRequestBlocks(row),
          text: `Inzet ${requestId}`,
        }),
      });

      return NextResponse.json({ ok: true });
    }

    // Onbekende actie
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'server_error' }, { status: 500 });
  }
}
