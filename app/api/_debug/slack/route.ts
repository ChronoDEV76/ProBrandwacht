// app/api/_debug/slack/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL_ID;

  if (!token || !channel) {
    return NextResponse.json(
      { ok: false, error: 'Missing SLACK_BOT_TOKEN or SLACK_CHANNEL_ID' },
      { status: 400 }
    );
  }

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      channel,
      text: '✅ Ping from /api/_debug/slack (App Router)',
    }),
  });

  const text = await res.text();
  try {
    return NextResponse.json({ status: res.status, body: JSON.parse(text) });
  } catch {
    return NextResponse.json({ status: res.status, body: text });
  }
}

