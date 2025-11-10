// app/api/slack/interactions/route.ts
import { NextResponse } from 'next/server';
import { verifySlack, setClaimed, setInProgress, redrawSlackMessage } from '@/lib/slackHelpers';

export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifySlack(req, raw)) {
    return NextResponse.json({ ok: false, error: 'bad_signature' }, { status: 401 });
  }

  const payload = JSON.parse(new URLSearchParams(raw).get('payload') || '{}');
  const action = payload?.actions?.[0];
  const requestId: string | undefined = action?.value;
  const responseUrl: string | undefined = payload?.response_url;

  if (!action || !requestId || !responseUrl) {
    return NextResponse.json({ ok: false, error: 'bad_payload' }, { status: 400 });
  }

  try {
    if (action.action_id === 'claim_request') {
      const row = await setClaimed(requestId, payload.user);
      await redrawSlackMessage(row, responseUrl);
      return NextResponse.json({ ok: true });
    }

    if (action.action_id === 'set_status_progress') {
      const row = await setInProgress(requestId, payload.user);
      await redrawSlackMessage(row, responseUrl);
      return NextResponse.json({ ok: true });
    }

    // onbekende actie
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'server_error' }, { status: 500 });
  }
}

