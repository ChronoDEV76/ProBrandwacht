import { App, BlockAction, Middleware, SlackActionMiddlewareArgs, ViewSubmitAction } from '@slack/bolt';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  token: process.env.SLACK_BOT_TOKEN!,
  socketMode: false, // of true als je dat gebruikt
  appToken: process.env.SLACK_APP_TOKEN, // alleen bij socket mode
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-side only
);

// -------- helpers --------

type SlackUserInfo = {
  ok: boolean
  user?: {
    name?: string
    real_name?: string
    profile?: {
      display_name?: string
      real_name?: string
    }
  }
}

async function getSlackDisplayName(userId: string): Promise<string> {
  try {
    const resp = await fetch(`https://slack.com/api/users.info?user=${encodeURIComponent(userId)}`, {
      headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
    })
    const json = (await resp.json()) as SlackUserInfo
    if (json?.ok) {
      const u = json.user || {}
      const p = u.profile || {}
      return p.display_name || u.real_name || p.real_name || u.name || userId
    }
  } catch (err) {
    console.error('[bolt] users.info failed', err)
  }
  return userId
}

async function renderAndReplaceMessage(responseUrl: string, row: any) {
  // jouw bestaande Slack block renderer
  const blocks = require('../lib/slackBlocks').renderRequestBlocks(row); // pas pad aan
  await fetch(responseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ replace_original: true, blocks }),
  });
}

async function insertDirectMessageAsAgent(opts: {
  requestId: string;
  agentSlackId: string;
  agentName: string;
  content: string;
}) {
  const { data, error } = await supabase
    .from('direct_messages')
    .insert([{
      request_id: opts.requestId,
      content: opts.content,
      sender_role: 'agent',
      sender_id: `agent:${opts.agentSlackId}`,
      sender_name: opts.agentName,
    }])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

// -------- claim / status actions --------

// "Claim inzet" knop
app.action<BlockAction>('claim_request', (async ({ ack, action, body, respond }) => {
  await ack();
  const requestId = (action as any)?.value as string | undefined;
  const responseUrl = (body as any)?.response_url as string | undefined;
  if (!requestId || !responseUrl) return;

  const slackUserId = (body as any)?.user?.id as string;
  const agentName = await getSlackDisplayName(slackUserId);

  const { data: row, error } = await supabase
    .from('direct_requests')
    .update({
      claim_status: 'claimed',
      claimed_at: new Date().toISOString(),
      claimed_by_id: slackUserId,
      claimed_name: agentName,
    })
    .eq('id', requestId)
    .select('*')
    .maybeSingle();

  if (error || !row) {
    await respond({ text: `Claimen mislukt: ${error?.message ?? 'onbekend'}`, response_type: 'ephemeral', replace_original: false });
    return;
  }

  await renderAndReplaceMessage(responseUrl, row);
}) as Middleware<SlackActionMiddlewareArgs>);

// "In behandeling" knop
app.action<BlockAction>('set_status_progress', (async ({ ack, action, body, respond }) => {
  await ack();
  const requestId = (action as any)?.value as string | undefined;
  const responseUrl = (body as any)?.response_url as string | undefined;
  if (!requestId || !responseUrl) return;

  const slackUserId = (body as any)?.user?.id as string;
  const agentName = await getSlackDisplayName(slackUserId);

  // Als nog niet geclaimd: claim meteen op klikker
  const { data: current } = await supabase
    .from('direct_requests')
    .select('*')
    .eq('id', requestId)
    .maybeSingle();

  const patch: any = { claim_status: 'in_progress' };
  if (!current?.claimed_by_id) {
    patch.claimed_by_id = slackUserId;
    patch.claimed_name = agentName;
    patch.claimed_at = new Date().toISOString();
  }

  const { data: row, error } = await supabase
    .from('direct_requests')
    .update(patch)
    .eq('id', requestId)
    .select('*')
    .maybeSingle();

  if (error || !row) {
    await respond({ text: `Bijwerken mislukt: ${error?.message ?? 'onbekend'}`, response_type: 'ephemeral', replace_original: false });
    return;
  }

  await renderAndReplaceMessage(responseUrl, row);
}) as Middleware<SlackActionMiddlewareArgs>);

// -------- reageren vanuit Slack: knop + modal + submit --------

// Voeg aan je blocks een extra knop toe met action_id 'reply_to_customer' en value = requestId
app.action<BlockAction>('reply_to_customer', (async ({ ack, body, action, client }) => {
  await ack();
  const requestId = (action as any)?.value as string;
  await client.views.open({
    trigger_id: (body as any).trigger_id,
    view: {
      type: 'modal',
      callback_id: 'reply_to_customer_submit',
      private_metadata: JSON.stringify({ requestId }),
      title: { type: 'plain_text', text: 'Bericht aan opdrachtgever' },
      submit: { type: 'plain_text', text: 'Verstuur' },
      close: { type: 'plain_text', text: 'Annuleren' },
      blocks: [
        {
          type: 'input',
          block_id: 'msg',
          label: { type: 'plain_text', text: 'Bericht' },
          element: {
            type: 'plain_text_input',
            action_id: 'content',
            multiline: true,
            placeholder: { type: 'plain_text', text: 'Typ je bericht…' }
          }
        }
      ]
    }
  });
}) as Middleware<SlackActionMiddlewareArgs>);

// Verwerking van de modal
app.view<ViewSubmitAction>('reply_to_customer_submit', async ({ ack, body, view, client }) => {
  await ack();

  const meta = JSON.parse(view.private_metadata || '{}');
  const requestId = meta.requestId as string;
  const content = (view.state.values?.msg?.content?.value || '').trim();

  const agentSlackId = (body as any)?.user?.id as string;
  const agentName = await getSlackDisplayName(agentSlackId);

  if (!content) return;

  await insertDirectMessageAsAgent({
    requestId,
    agentSlackId,
    agentName,
    content,
  });

  // Eventueel: ok-toast naar gebruiker
  try {
    await client.chat.postEphemeral({
      channel: (body as any).view?.team_id ?? '',
      user: agentSlackId,
      text: 'Bericht verzonden naar de opdrachtgever.',
    });
  } catch {}
});

export async function startBolt() {
  await app.start(process.env.PORT ? Number(process.env.PORT) : 3001);
  console.log('⚡️ Bolt app is running');
}
