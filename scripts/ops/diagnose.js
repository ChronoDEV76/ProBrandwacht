#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// ──────────────────────────────
// Utilities
// ──────────────────────────────
const ROOT = process.cwd();
const has = (p) => fs.existsSync(p);
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, c) => fs.writeFileSync(p, c, 'utf8');

const cyan = s => `\x1b[36m${s}\x1b[0m`;
const green = s => `\x1b[32m${s}\x1b[0m`;
const yellow = s => `\x1b[33m${s}\x1b[0m`;
const red = s => `\x1b[31m${s}\x1b[0m`;
const ok = m => console.log(`  ✅  ${m}`);
const warn = m => console.log(`  ${yellow('⚠️')}  ${m}`);
const err = m => console.log(`  ${red('❌')}  ${m}`);
const log = (h, m = '') => console.log(`\n${cyan(`[${h}]`)} ${m}`);

// ──────────────────────────────
// ENV Validation
// ──────────────────────────────
function loadEnv() {
  dotenv.config({ path: path.join(ROOT, '.env.local') });
  return process.env;
}

function must(key, value, hint) {
  if (!value) {
    err(`${key} missing${hint ? ` — ${hint}` : ''}`);
    return false;
  }
  ok(`${key} present`);
  return true;
}

// ──────────────────────────────
// File and Route Checks
// ──────────────────────────────
function checkRouteExists(APP_DIR, relPath, description) {
  const filePath = path.join(ROOT, APP_DIR, relPath);
  if (has(filePath)) {
    ok(`${description} (${relPath}) exists`);
    return true;
  } else {
    err(`${description} (${relPath}) missing`);
    return false;
  }
}

// ──────────────────────────────
// Main Diagnostic Runner
// ──────────────────────────────
async function main() {
  log('DIAGNOSE', 'Starting checks...');
  const env = loadEnv();
  let allEnvOK = true;

  // Check ENV vars
  log('ENV', 'Validating required environment variables...');
  const requiredVars = [
    ['SLACK_BOT_TOKEN', 'Create a Slack bot and install to workspace.'],
    ['SLACK_CHANNEL_ID', 'Copy from Slack channel info.'],
    ['SUPABASE_URL'],
    ['SUPABASE_SERVICE_ROLE_KEY'],
    ['NEXT_PUBLIC_SUPABASE_URL'],
    ['NEXT_PUBLIC_SUPABASE_ANON_KEY'],
  ];
  for (const [key, hint] of requiredVars) {
    allEnvOK &= must(key, env[key], hint);
  }
  if (!allEnvOK) return warn('Fix your .env.local before further checks.');

  // Detect Next.js app dir
  const APP_DIR = has(path.join(ROOT, 'app'))
    ? 'app'
    : has(path.join(ROOT, 'src', 'app'))
    ? 'src/app'
    : null;
  if (!APP_DIR) return err('No Next.js app directory found!');

  // File/Route checks
  log('ROUTES', 'Checking API routes and pages...');
  checkRouteExists(APP_DIR, 'api/probrandwacht-direct/route.ts', 'Form submit API');
  checkRouteExists(APP_DIR, 'api/probrandwacht-direct/slack/route.ts', 'Slack interactivity API');
  checkRouteExists(APP_DIR, 'dashboard/requests/[id]/page.tsx', 'Dashboard page');

  // Slack helpers and usage
  log('SLACK', 'Checking Slack integration utility...');
  if (!has(path.join(ROOT, 'lib', 'pbDirectSlack.ts'))) {
    warn('lib/pbDirectSlack.ts missing (no slack helpers found)');
  } else {
    const slackHelperTxt = read(path.join(ROOT, 'lib', 'pbDirectSlack.ts'));
    if (!/dashboardUrlForRequest/.test(slackHelperTxt))
      warn('No dashboardUrlForRequest() in pbDirectSlack.ts');
    else ok('dashboardUrlForRequest() found');

    if (!/action_id['"]?\s*:\s*['"]claim_request['"]/.test(slackHelperTxt))
      warn('No "Claim inzet" button, check interactive blocks');
    else ok('"Claim inzet" button present');
  }

  // Live Slack API check
  if (env.SLACK_BOT_TOKEN) {
    log('SLACK', 'Testing Slack API credentials...');
    try {
      const fetch = global.fetch || (await import('node-fetch')).default;
      const r = await fetch('https://slack.com/api/auth.test', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.SLACK_BOT_TOKEN}` },
      });
      let t = await r.json();
      if (t.ok) ok(`auth.test ok for team ${t.team} as user ${t.user}`);
      else err(`auth.test failed: ${t.error}`);
    } catch (e) {
      err('Slack API test failed: ' + e.message);
    }
  }

  // Supabase schema check
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    log('SUPABASE', 'Checking direct_requests schema...');
    try {
      const { createClient } = require('@supabase/supabase-js');
      const client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
      const { data, error } = await client
        .from('direct_requests')
        .select('id,company,claim_status,claimed_by_id,claimed_name,claimed_at')
        .limit(1);
      if (error) err(`Supabase error: ${error.message}`);
      else ok('direct_requests connected with required columns');
    } catch (e) {
      err('Supabase client check failed: ' + e.message);
    }
  }

  log('DONE', green('All checks complete. Review above logs for any ⚠️ or ❌ .'));
}

main();

