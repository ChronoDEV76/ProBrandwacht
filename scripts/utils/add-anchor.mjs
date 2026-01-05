#!/usr/bin/env node
// scripts/utils/add-anchor.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const CWD = process.cwd();
const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.findIndex(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (idx === -1) return undefined;
  const eq = args[idx].indexOf('=');
  if (eq !== -1) return args[idx].slice(eq + 1);
  return args[idx + 1];
}

const explicitFile = getArg('file');

const rel = p => path.relative(CWD, p);
const log = (...m) => console.log(...m);
const warn = (...m) => console.warn(...m);
const die = (msg, code = 1) => { console.error(msg); process.exit(code); };

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function walk(dir, matcher) {
  const out = [];
  async function _walk(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) {
        await _walk(p);
      } else if (matcher(p)) {
        out.push(p);
      }
    }
  }
  await _walk(dir);
  return out;
}

function hasAnchorAlready(source) {
  // either previously injected marker or id="bereken"
  return /\bid\s*=\s*["']bereken["']/.test(source) || /\bdata-anchor-injected\b/.test(source);
}

function injectIntoH1(source) {
  // Primary: H1 containing "Bereken" and "waard"
  const reTarget =
    /<h1([^>]*)>([\s\S]*?bereken[\s\S]*?waard[\s\S]*?)<\/h1>/i;
  const reAnyH1 = /<h1([^>]*)>([\s\S]*?)<\/h1>/i;

  // helper to merge attributes on opening <h1 ...>
  function addAttrs(openingTag, idValue = 'bereken') {
    // openingTag like "<h1 ...>"
    // if already has id, keep it (don't override)
    const hasId = /\bid\s*=/.test(openingTag);
    const marker = ' data-anchor-injected';
    if (hasId) {
      if (!/data-anchor-injected/.test(openingTag)) {
        return openingTag.replace(/<h1\b/, `<h1${marker}`);
      }
      return openingTag; // already marked
    }
    // insert id + marker right after <h1
    return openingTag.replace(/<h1\b/, `<h1 id="${idValue}"${marker}`);
  }

  const mTarget = source.match(reTarget);
  if (mTarget) {
    const full = mTarget[0];
    const open = full.match(/^<h1[^>]*>/i)?.[0] ?? '<h1>';
    const openInjected = addAttrs(open);
    return source.replace(open, openInjected);
  }

  // fallback: first H1
  const mAny = source.match(reAnyH1);
  if (mAny) {
    const full = mAny[0];
    const open = full.match(/^<h1[^>]*>/i)?.[0] ?? '<h1>';
    const openInjected = addAttrs(open);
    return source.replace(open, openInjected);
  }

  return null; // no h1 found
}

async function main() {
  let targetFile;

  if (explicitFile) {
    const f = path.resolve(CWD, explicitFile);
    if (!(await exists(f))) {
      die(`❌ Opgegeven bestand bestaat niet: ${explicitFile}`);
    }
    targetFile = f;
  } else {
    // auto-discover any app/**/page.tsx
    const appDir = path.join(CWD, 'app');
    if (!(await exists(appDir))) {
      die('❌ Geen app/ directory gevonden.');
    }
    const candidates = await walk(appDir, p =>
      p.endsWith(`${path.sep}page.tsx`) || p.endsWith(`${path.sep}page.jsx`)
    );

    if (candidates.length === 0) {
      die('❌ Geen page.tsx gevonden onder app/**');
    }

    // Prefer ones that look like "home" by checking for Bereken-h1 text
    let best = null;
    for (const p of candidates) {
      const src = await fs.readFile(p, 'utf8');
      if (/Bereken[\s\S]*waard/i.test(src)) {
        best = p;
        break;
      }
    }
    targetFile = best ?? candidates[0];
    if (!best) {
      warn(`▲ Geen H1 met "Bereken … waard" gevonden. Gebruik eerste page.tsx: ${rel(targetFile)}`);
    }
  }

  const src = await fs.readFile(targetFile, 'utf8');

  if (hasAnchorAlready(src)) {
    log(`✔ Anchor al aanwezig in ${rel(targetFile)} (id="bereken"). Niets te doen.`);
    process.exit(0);
  }

  const updated = injectIntoH1(src);
  if (updated == null) {
    die(`❌ Geen <h1> gevonden in ${rel(targetFile)}. Kan geen anchor injecteren.`);
  }

  await fs.writeFile(targetFile, updated, 'utf8');
  log(`✔ Anchor id="bereken" geïnjecteerd in ${rel(targetFile)}.`);
  log(`   Tip: link ernaartoe met <Link href="/#bereken">Bereken wat je waard bent</Link>`);
}

main().catch(err => {
  console.error('❌ Fout:', err?.message || err);
  process.exit(1);
});

