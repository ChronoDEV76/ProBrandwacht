#!/usr/bin/env node
/**
 * Runway ML project scaffolder + VO & Marker exports
 * Usage:
 *   node runway-setup.js --brand "ProSafetyMatch" --url "https://www.prosafetymatch.nl" --lang nl --fps 25
 *
 * Flags:
 *   --brand   : merknaam (default: ProSafetyMatch)
 *   --url     : website/CTA URL (default: https://www.prosafetymatch.nl)
 *   --lang    : nl | en (default: nl)
 *   --out     : output map (default: ./runway-video-project)
 *   --ar      : aspect ratio (default: 16:9)
 *   --quality : Runway quality hint (default: Maximum)
 *   --motion  : camera motion hint (default: Subtle)
 *   --fps     : timecode FPS (default: 25)
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function getArg(name, def) {
  const idx = args.findIndex(a => a === `--${name}`);
  if (idx > -1 && args[idx + 1] && !args[idx + 1].startsWith('--')) return args[idx + 1];
  const kv = args.find(a => a.startsWith(`--${name}=`));
  if (kv) return kv.split('=')[1];
  return def;
}

const BRAND = getArg('brand', 'ProSafetyMatch');
const SITE  = getArg('url', 'https://www.prosafetymatch.nl');
const LANG  = (getArg('lang', 'nl') || 'nl').toLowerCase();
const OUT   = getArg('out', './runway-video-project');
const AR    = getArg('ar', '16:9');
const QUALITY = getArg('quality', 'Maximum');
const MOTION  = getArg('motion', 'Subtle');
const FPS     = Number(getArg('fps', 25));

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const copy = {
  nl: {
    openingOverlay: 'BRANDWACHT NODIG?\nDirect beschikbaar',
    openingVO: 'Wanneer je snel een brandwacht nodig hebt...',
    problemOverlay: 'Geen eindeloos bellen meer',
    problemVO: 'Traditionele bedrijven laten je wachten met indirecte planning.',
    solutionOverlay: '24/7 Digitale Toegang\n✓ Real-time beschikbaarheid\n✓ Direct chat\n✓ Slimme planning',
    solutionVO: 'Met onze slimme digitale tools zie je direct wie beschikbaar is.',
    chatOverlay: 'Direct Antwoord\nBinnen 2 minuten reactie',
    chatVO: 'Chat direct met onze gecertificeerde brandwachten. Antwoord binnen minuten.',
    actionOverlay: 'Rijksgediplomeerd\nAltijd Inzetbaar',
    actionVO: 'Onze professionals staan 24/7 voor je klaar.',
    ctaOverlay: `VRAAG NU AAN\n✓ Geen telefoontjes\n✓ Direct inzicht\n✓ 24/7 bereikbaar\n\n${SITE}`,
    ctaVO: 'Vraag vandaag nog je brandwacht aan. Simpel, snel, direct.',
    checklistTitle: `${BRAND} – Brandwacht Promo`,
    runNext: [
      'Open runway-prompts.txt',
      'Copy/paste elke prompt in Runway ML',
      'Download shots naar raw-footage/',
      'Volg production-checklist.md'
    ],
    csvHeaders: ['id','name','duration_s','filename','overlay_text','voiceover'],
  },
  en: {
    openingOverlay: 'NEED A FIRE WATCH?\nAvailable instantly',
    openingVO: 'When you need a fire watch, fast...',
    problemOverlay: 'No more endless phone calls',
    problemVO: 'Traditional providers keep you waiting with indirect scheduling.',
    solutionOverlay: '24/7 Digital Access\n✓ Real-time availability\n✓ Direct chat\n✓ Smart scheduling',
    solutionVO: 'With our smart digital tools you instantly see who is available.',
    chatOverlay: 'Instant Reply\nResponse within 2 minutes',
    chatVO: 'Chat directly with our certified fire safety guards. Replies in minutes.',
    actionOverlay: 'Government Certified\nAlways Deployable',
    actionVO: 'Our professionals are ready 24/7.',
    ctaOverlay: `BOOK NOW\n✓ No phone calls\n✓ Instant insight\n✓ 24/7 reachable\n\n${SITE}`,
    ctaVO: 'Request your fire watch today. Simple, fast, direct.',
    checklistTitle: `${BRAND} – Fire Watch Promo`,
    runNext: [
      'Open runway-prompts.txt',
      'Copy/paste each prompt into Runway ML',
      'Download shots to raw-footage/',
      'Follow production-checklist.md'
    ],
    csvHeaders: ['id','name','duration_s','filename','overlay_text','voiceover'],
  }
}[LANG];

/** --- Shots --- */
const videoShots = [
  {
    id: 1,
    name: 'Opening - Professional Guard',
    duration: 5,
    prompt: `Professional fire safety guard in uniform standing confidently in front of modern office building, golden hour lighting, cinematic quality, 4K, shallow depth of field, professional photography style, confident pose, Dutch architecture, branded patch reading "${BRAND}" on sleeve`,
    overlay_text: copy.openingOverlay,
    voiceover: copy.openingVO,
    notes: 'Confidence, professionalism, light lens flare; center composition'
  },
  {
    id: 2,
    name: 'Problem - Traditional Methods',
    duration: 8,
    prompt: `Split screen: left shows person frustrated making multiple phone calls with crossed-out phone icon overlay; right shows modern smartphone with glowing chat interface from "${BRAND}", professional lighting, high contrast, cinematic quality, smooth swipe transition`,
    overlay_text: copy.problemOverlay,
    voiceover: copy.problemVO,
    notes: 'Clear old-vs-new contrast; keep icons subtle'
  },
  {
    id: 3,
    name: 'Solution - Digital Dashboard',
    duration: 12,
    prompt: `Close-up of modern tablet displaying real-time "${BRAND}" fire guard availability dashboard with interactive map, clean minimal UI, professional hands interacting, blue/white UI theme, high-tech atmosphere, shallow depth of field, 4K`,
    overlay_text: copy.solutionOverlay,
    voiceover: copy.solutionVO,
    notes: 'Hero UX moment; ensure UI elements are legible'
  },
  {
    id: 4,
    name: 'Response - Chat Interaction',
    duration: 10,
    prompt: `Professional fire safety guard in orange vest receiving smartphone notification from "${BRAND}", focused expression then confident nod, construction site background softly blurred, natural daylight, cinematic portrait, 4K`,
    overlay_text: copy.chatOverlay,
    voiceover: copy.chatVO,
    notes: 'Emphasize snappiness; show subtle haptic feedback'
  },
  {
    id: 5,
    name: 'Action - Professionals Working',
    duration: 10,
    prompt: `Dynamic montage: "${BRAND}" fire safety guards arriving at event venue, checking equipment; cut to construction site inspecting extinguishers; smooth gimbal moves; golden hour; cinematic 4K; safety-first posture`,
    overlay_text: copy.actionOverlay,
    voiceover: copy.actionVO,
    notes: 'Variety of contexts; keep branding tasteful'
  },
  {
    id: 6,
    name: 'CTA - Website Booking',
    duration: 12,
    prompt: `Clean modern website interface on laptop showing "${BRAND}" booking form with "Aanvragen/Request" primary button; cursor hover then click micro-interaction; minimalist desk; soft window light; shallow focus; 4K; corporate photography style`,
    overlay_text: copy.ctaOverlay,
    voiceover: copy.ctaVO,
    notes: `Strong CTA with ${SITE} visible; add end-card`
  }
];

/** --- Helpers --- */
const totalDuration = videoShots.reduce((s, v) => s + v.duration, 0);
const nowISO = new Date().toISOString();

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function write(p, data) { fs.writeFileSync(p, data); }

function srtTime(sec) {
  const ms = Math.floor(sec * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const s2 = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const ms3 = String(ms % 1000).padStart(3, '0');
  return `${h}:${m}:${s2},${ms3}`;
}

function ms(sec) {
  const ms = Math.floor(sec * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const s2 = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const ms3 = String(ms % 1000).padStart(3, '0');
  return `${h}:${m}:${s2}.${ms3}`;
}

function tc(sec, fps = FPS) {
  const framesTotal = Math.round(sec * fps);
  const frames = framesTotal % fps;
  const totalSeconds = Math.floor(framesTotal / fps);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  const f = String(frames).padStart(2, '0');
  return `${h}:${m}:${s}:${f}`;
}

/** --- Generators --- */
function generateChecklist(outDir, ar, quality, motion) {
  let md = `# 🎬 Runway ML Video Production Checklist\n\n`;
  md += `## ${BRAND} – ${LANG === 'nl' ? 'Brandwacht Promo' : 'Fire Watch Promo'}\n\n`;
  md += `**Project:** ${BRAND} Promotional Video\n\n`;
  md += `**Total Duration:** ${totalDuration} seconds\n\n`;
  md += `**Generated:** ${nowISO}\n\n`;
  md += `**Defaults:** AR ${ar} • Quality ${quality} • Camera Motion ${motion}\n\n`;
  md += `---\n\n`;

  videoShots.forEach(shot => {
    const filename = `shot-${String(shot.id).padStart(2, '0')}-${slugify(shot.name)}.mp4`;
    md += `## Shot ${shot.id}: ${shot.name}\n\n`;
    md += `**Duration:** ${shot.duration} seconds\n\n`;
    md += `### Runway Prompt:\n\`\`\`\n${shot.prompt}\n\`\`\`\n\n`;
    md += `### Settings:\n- Duration: ${shot.duration}s\n- Aspect Ratio: ${ar}\n- Quality: ${quality}\n- Camera Motion: ${motion}\n\n`;
    md += `### Text Overlay:\n\`\`\`\n${shot.overlay_text}\n\`\`\`\n\n`;
    md += `### Voiceover:\n> "${shot.voiceover}"\n\n`;
    md += `### Production Notes:\n${shot.notes}\n\n`;
    md += `### Checklist:\n- [ ] Generated in Runway ML\n- [ ] Downloaded (highest quality)\n- [ ] Renamed to: ${filename}\n- [ ] Added to project folder\n\n---\n\n`;
  });

  md += `### 🚀 Next Steps\n`;
  copy.runNext.forEach((step, i) => (md += `${i + 1}. ${step}\n`));
  md += `\n`;
  return md;
}

function generatePromptsFile() {
  let txt = `# RUNWAY ML PROMPTS — COPY & PASTE (${LANG.toUpperCase()})\n\n`;
  videoShots.forEach(shot => {
    txt += `## SHOT ${shot.id} (${shot.duration}s)\n${shot.prompt}\n\n---\n\n`;
  });
  return txt;
}

function generateProjectOverview(ar, quality, motion) {
  const overview = {
    project: `${BRAND} Promotional Video`,
    brand: BRAND,
    url: SITE,
    totalShots: videoShots.length,
    totalDuration,
    defaults: { aspectRatio: ar, quality, cameraMotion: motion, fps: FPS },
    shots: videoShots.map(shot => ({
      id: shot.id,
      name: shot.name,
      duration: shot.duration,
      filename: `shot-${String(shot.id).padStart(2, '0')}-${slugify(shot.name)}.mp4`,
      overlay_text: shot.overlay_text,
      voiceover: shot.voiceover
    })),
    generatedAt: nowISO
  };
  return JSON.stringify(overview, null, 2);
}

function generateJSONL(ar, quality, motion) {
  return (
    videoShots
      .map(shot =>
        JSON.stringify({
          id: shot.id,
          prompt: shot.prompt,
          duration: shot.duration,
          ar,
          quality,
          motion,
          overlay_text: shot.overlay_text,
          voiceover: shot.voiceover
        })
      )
      .join('\n') + '\n'
  );
}

function generateCSV() {
  const headers = copy.csvHeaders.join(',');
  const rows = videoShots.map(shot => {
    const filename = `shot-${String(shot.id).padStart(2, '0')}-${slugify(shot.name)}.mp4`;
    const esc = s => `"${String(s).replace(/"/g, '""')}"`;
    return [
      shot.id,
      esc(shot.name),
      shot.duration,
      esc(filename),
      esc(shot.overlay_text),
      esc(shot.voiceover)
    ].join(',');
  });
  return [headers, ...rows].join('\n') + '\n';
}

function generateSRTs(outDir) {
  let t = 0;
  let master = '';
  videoShots.forEach(shot => {
    const start = srtTime(t);
    const end = srtTime(t + shot.duration);
    const perShot = `1\n00:00:00,000 --> ${srtTime(shot.duration)}\n${shot.voiceover}\n`;
    fs.writeFileSync(path.join(outDir, `sub-shot-${String(shot.id).padStart(2, '0')}.srt`), perShot);
    master += `${shot.id}\n${start} --> ${end}\n${shot.voiceover}\n\n`;
    t += shot.duration;
  });
  fs.writeFileSync(path.join(outDir, 'master.srt'), master);
}

/** NEW: Voice-over bundle (1 file + per shot) */
function generateVoiceoverBundle(outDir) {
  const voiceDir = path.join(outDir, 'voiceover');
  ensureDir(voiceDir);
  // Master VO
  let combined = `# ${BRAND} – Voice-over Script (${LANG.toUpperCase()})\n\n`;
  videoShots.forEach(shot => {
    combined += `## Shot ${shot.id}: ${shot.name}\n${shot.voiceover}\n\n`;
  });
  fs.writeFileSync(path.join(voiceDir, 'voiceover.txt'), combined);
  // Per shot VO
  videoShots.forEach(shot => {
    const per = `${shot.voiceover}\n`;
    fs.writeFileSync(
      path.join(voiceDir, `voiceover-shot-${String(shot.id).padStart(2, '0')}.txt`),
      per
    );
  });
}

/** NEW: Audition markers CSV (hh:mm:ss.mmm) */
function generateAuditionCSV(outDir) {
  const header = ['Name', 'Start', 'Duration', 'Type', 'Description'].join(',');
  let t = 0;
  const lines = [header];
  videoShots.forEach(shot => {
    const name = `Shot ${shot.id}: ${shot.name}`;
    const start = ms(t);
    const dur = ms(shot.duration);
    const type = 'Cue';
    const desc = shot.voiceover.replace(/"/g, '""');
    lines.push(`"${name}","${start}","${dur}","${type}","${desc}"`);
    t += shot.duration;
  });
  fs.writeFileSync(path.join(outDir, 'exports', 'audition-markers.csv'), lines.join('\n') + '\n');
}

/** NEW: Premiere markers CSV (timecode hh:mm:ss:ff) */
function generatePremiereCSV(outDir) {
  // Commonly accepted columns by Premiere CSV import
  const header = [
    'Name',
    'Comment',
    'Marker Type',
    'Start',
    'Duration'
  ].join(',');
  let t = 0;
  const lines = [header];
  videoShots.forEach(shot => {
    const name = `Shot ${String(shot.id).padStart(2, '0')}`;
    const comment = shot.name + ' — ' + shot.voiceover.replace(/"/g, '""');
    const type = 'Comment';
    const start = tc(t, FPS);
    const duration = tc(shot.duration, FPS);
    lines.push(`"${name}","${comment}","${type}","${start}","${duration}"`);
    t += shot.duration;
  });
  fs.writeFileSync(path.join(outDir, 'exports', 'premiere-markers.csv'), lines.join('\n') + '\n');
}

/** --- Create structure & write files --- */
ensureDir(OUT);
['raw-footage', 'edited-clips', 'final-export', 'assets', 'subtitles', 'exports', 'voiceover'].forEach(d =>
  ensureDir(path.join(OUT, d))
);

fs.writeFileSync(path.join(OUT, 'production-checklist.md'), generateChecklist(OUT, AR, QUALITY, MOTION));
fs.writeFileSync(path.join(OUT, 'runway-prompts.txt'), generatePromptsFile());
fs.writeFileSync(path.join(OUT, 'project-overview.json'), generateProjectOverview(AR, QUALITY, MOTION));
fs.writeFileSync(path.join(OUT, 'runway-batch.jsonl'), generateJSONL(AR, QUALITY, MOTION));
fs.writeFileSync(path.join(OUT, 'shots.csv'), generateCSV());
generateSRTs(path.join(OUT, 'subtitles'));
generateVoiceoverBundle(OUT);
generateAuditionCSV(OUT);
generatePremiereCSV(OUT);

/** --- Console summary --- */
console.log('✅ Runway ML project setup complete!');
console.log(`📁 Location: ${OUT}`);
console.log(`🕒 Total duration: ${totalDuration}s @ ${FPS}fps`);
console.log('\n📋 Generated files:');
[
  'production-checklist.md',
  'runway-prompts.txt',
  'project-overview.json',
  'runway-batch.jsonl',
  'shots.csv',
  'subtitles/master.srt',
  ...videoShots.map(v => `subtitles/sub-shot-${String(v.id).padStart(2, '0')}.srt`),
  'voiceover/voiceover.txt',
  ...videoShots.map(v => `voiceover/voiceover-shot-${String(v.id).padStart(2, '0')}.txt`),
  'exports/audition-markers.csv',
  'exports/premiere-markers.csv'
].forEach(f => console.log('   - ' + f));
console.log('\n📁 Folders: raw-footage/, edited-clips/, final-export/, assets/, subtitles/, voiceover/, exports/');
console.log('\n🚀 Next steps:');
console.log('   1) Open runway-prompts.txt');
console.log('   2) Copy/paste prompts in Runway ML');
console.log('   3) Download renders naar raw-footage/');
console.log('   4) (Optioneel) Importeer markers in Audition/Premiere');
console.log('   5) Volg production-checklist.md');

