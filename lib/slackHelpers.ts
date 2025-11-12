// lib/slackHelpers.ts
import crypto from 'crypto';
import { getSupabaseAdmin } from './supabase-admin';
import { renderRequestBlocks } from '@/lib/slackBlocks';

/** Verify Slack signature for webhooks (raw body required). */
export function verifySlack(req: Request, rawBody: string) {
  const ts = req.headers.get('x-slack-request-timestamp') || '';
  const sig = req.headers.get('x-slack-signature') || '';
  if (!ts || !sig) return false;

  const base = `v0:${ts}:${rawBody}`;
  const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET!);
  const mySig = `v0=${hmac.update(base).digest('hex')}`;

  try {
    return crypto.timingSafeEqual(Buffer.from(mySig), Buffer.from(sig));
  } catch {
    return false;
  }
}

/** Best mogelijke Slack display name, met Web API fallback. */
export async function getSlackDisplayName(user: any): Promise<string> {
  const userId = user?.id;
  if (!userId) {
    return (
      user?.profile?.display_name ||
      user?.real_name ||
      user?.name ||
      user?.username ||
      'onbekend'
    );
  }

  // 1) Probeer users.info
  try {
    const resp = await fetch(
      `https://slack.com/api/users.info?user=${encodeURIComponent(userId)}`,
      { headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` } }
    );
    const json = await resp.json();
    if (json?.ok) {
      const u = json.user ?? {};
      const p = u.profile ?? {};
      return p.display_name || u.real_name || p.real_name || u.name || userId;
    }
  } catch {
    // negeren; we vallen terug
  }

  // 2) payload fallback
  return (
    user?.profile?.display_name ||
    user?.real_name ||
    user?.name ||
    user?.username ||
    userId
  );
}

/** Helper: herteken het Slack bericht na DB-update. */
export async function redrawSlackMessage(row: any, responseUrl: string) {
  await fetch(responseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      replace_original: true,
      blocks: renderRequestBlocks(row),
      text: `Inzet ${row.id}`,
    }),
  });
}

/** DB updates */
export async function setClaimed(requestId: string, user: any) {
  const name = await getSlackDisplayName(user);
  const supabaseAdmin = getSupabaseAdmin()
  const { data, error } = await supabaseAdmin
    .from('direct_requests')
    .update({
      claim_status: 'claimed',
      claimed_at: new Date().toISOString(),
      claimed_by_id: user?.id ?? null,
      claimed_name: name,
    })
    .eq('id', requestId)
    .select('*')
    .maybeSingle();

  if (error || !data) throw new Error(error?.message || 'update_failed');
  return data;
}

export async function setInProgress(requestId: string, user: any) {
  const supabaseAdmin = getSupabaseAdmin()
  // Als nog niet geclaimd → claim meteen
  const { data: current } = await supabaseAdmin
    .from('direct_requests')
    .select('*')
    .eq('id', requestId)
    .maybeSingle();

  const patch: any = { claim_status: 'in_progress' };

  if (!current?.claimed_by_id) {
    patch.claimed_by_id = user?.id ?? null;
    patch.claimed_name = await getSlackDisplayName(user);
    patch.claimed_at = new Date().toISOString();
  }

  const { data, error } = await supabaseAdmin
    .from('direct_requests')
    .update(patch)
    .eq('id', requestId)
    .select('*')
    .maybeSingle();

  if (error || !data) throw new Error(error?.message || 'update_failed');
  return data;
}
