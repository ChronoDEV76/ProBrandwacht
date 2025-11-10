// lib/pbDirectSlack.ts
// Post spoedaanvragen naar Slack met Claim + In behandeling + Dashboard-knop.

// lib/pbDirectSlack.ts (relevante helper)
export function dashboardUrlForRequest(id: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  // Agent-flow vanuit Slack
  return `${base}/dashboard/requests/${id}?role=agent`;
}

type SlackOK = { ok: true; ts: string; channel: string; [k: string]: unknown };
type SlackErr = { ok: false; error: string; [k: string]: unknown };
type SlackRes = SlackOK | SlackErr;

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

function invariant(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`[pbDirectSlack] ${msg}`);
}

export async function postPbDirectToSlack(data: any) {
  invariant(SLACK_BOT_TOKEN, 'SLACK_BOT_TOKEN is missing');
  invariant(SLACK_CHANNEL_ID, 'SLACK_CHANNEL_ID is missing');

  const {
    id,
    company,
    contact,
    email,
    phone,
    city,
    when,
    people,
    hours_estimate,
    message,
  } = data ?? {};

  const safe = (v: any, fb = '—') =>
    v === null || v === undefined || v === '' ? fb : String(v);

  const dashboardUrl = id ? dashboardUrlForRequest(String(id)) : undefined;

  const payload = {
    channel: SLACK_CHANNEL_ID,
    text: `ProBrandwacht Direct — ${safe(company)} (${safe(city)})`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '🚨 ProBrandwacht Direct — spoed' },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Bedrijf:*\n${safe(company)}` },
          { type: 'mrkdwn', text: `*Contact:*\n${safe(contact)}` },
          { type: 'mrkdwn', text: `*E-mail:*\n${safe(email)}` },
          { type: 'mrkdwn', text: `*Telefoon:*\n${safe(phone)}` },
          { type: 'mrkdwn', text: `*Locatie:*\n${safe(city)}` },
          { type: 'mrkdwn', text: `*Wanneer:*\n${safe(when, 'ASAP')}` },
        ],
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Aantal brandwachten:*\n${safe(people)}` },
          { type: 'mrkdwn', text: `*Uren (indicatie):*\n${safe(hours_estimate)}` },
        ],
      },
      ...(message
        ? [
            {
              type: 'section',
              text: { type: 'mrkdwn', text: `*Toelichting:*\n${safe(message)}` },
            },
          ]
        : []),
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            style: 'primary',
            action_id: 'claim_request',
            text: { type: 'plain_text', text: '✅ Claim inzet' },
            value: String(id ?? ''),
          },
          {
            type: 'button',
            action_id: 'set_status_progress',
            text: { type: 'plain_text', text: 'In behandeling' },
            value: String(id ?? ''),
          },
          ...(dashboardUrl
            ? [
                {
                  type: 'button' as const,
                  text: { type: 'plain_text', text: 'Bekijk in dashboard' },
                  url: dashboardUrl,
                },
              ]
            : []),
        ],
      },
      {
        type: 'context',
        elements: [{ type: 'mrkdwn', text: `Status: *open* • ID: \`${safe(id)}\`` }],
      },
    ],
  };

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  const bodyText = await res.text();
  let json: SlackRes | undefined;
  try {
    json = JSON.parse(bodyText);
  } catch {
    // Slack kan in zeldzame gevallen HTML/tekst teruggeven bij fouten
  }

  if (!res.ok) {
    throw new Error(`[Slack HTTP ${res.status}] ${bodyText}`);
  }
  if (!json) {
    throw new Error(`[Slack] Non-JSON response: ${bodyText}`);
  }
  if (!json.ok) {
    throw new Error(`[Slack] ${json.error}`);
  }
  return json;
}

