// lib/slackBlocks.ts
type DirectRequest = {
  id: string;
  company: string | null;
  contact: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  when: string | null;
  message: string | null;
  people: number | null;
  hours_estimate: number | null;
  claim_status: 'open' | 'claimed' | 'in_progress' | 'closed' | null;
  claimed_name?: string | null;
};

const DASHBOARD_BASE =
  process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function dashboardUrlForRequest(id: string) {
  return `${DASHBOARD_BASE}/dashboard/requests/${id}?role=agent`;
}

export function renderRequestBlocks(row: DirectRequest) {
  const status = row.claim_status || 'open';
  const claimedBy = row.claimed_name || '—';

  const header = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*:rotating_light: ProBrandwacht Direct — spoed*\n*Bedrijf:* ${row.company ?? '—'}\n*Contact:* ${row.contact ?? '—'}\n*E-mail:* ${row.email ?? '—'}\n*Telefoon:* ${row.phone ?? '—'}\n*Locatie:* ${row.city ?? '—'}\n*Wanneer:* ${row.when ?? '—'}\n*Aantal brandwachten:* ${row.people ?? '—'}\n*Uren (indicatie):* ${row.hours_estimate ?? '—'}`,
    },
  };

  const context = {
    type: 'context',
    elements: [
      { type: 'mrkdwn', text: `*Status:* ${status}${status !== 'open' ? ` • *Geclaimd door:* ${claimedBy}` : ''}` },
    ],
  };

  // Actie-knoppen:
  // - Bij 'open': laat alleen "Claim inzet" + "Bekijk in dashboard" zien
  // - Bij geclaimd / in_progress / closed: verberg actieknoppen, laat alleen "Bekijk in dashboard" zien
  const actionsOpen = {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: { type: 'plain_text', text: '✅ Claim inzet' },
        style: 'primary',
        action_id: 'claim_request',          // <- BELANGRIJK
        value: row.id,                       // <- requestId meegeven
      },
      {
        type: 'button',
        text: { type: 'plain_text', text: 'Bekijk in dashboard' },
        url: dashboardUrlForRequest(row.id),
        action_id: 'open_dashboard',
        value: row.id,
      },
    ],
  };

  const actionsClaimedOnlyDashboard = {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: { type: 'plain_text', text: 'Bekijk in dashboard' },
        url: dashboardUrlForRequest(row.id),
        action_id: 'open_dashboard',
        value: row.id,
      },
    ],
  };

  const blocks: any[] = [header, { type: 'divider' }];

  if (row.message) {
    blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `*Toelichting*\n${row.message}` },
    });
  }

  blocks.push({ type: 'divider' }, context);

  if (status === 'open') {
    blocks.push(actionsOpen);
  } else {
    // claimed / in_progress / closed
    blocks.push(actionsClaimedOnlyDashboard);
  }

  // Ter debugging (optioneel, kan eruit):
  blocks.push({
    type: 'context',
    elements: [{ type: 'mrkdwn', text: `ID: \`${row.id}\`` }],
  });

  return blocks;
}
