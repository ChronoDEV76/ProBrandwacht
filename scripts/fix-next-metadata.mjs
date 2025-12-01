#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const root = process.cwd();

function log(msg) {
  console.log(msg);
}

function fixFile(relativePath, transformFn) {
  const fullPath = path.join(root, relativePath);

  if (!fs.existsSync(fullPath)) {
    log(`⚠️  File not found, skipping: ${relativePath}`);
    return;
  }

  const original = fs.readFileSync(fullPath, 'utf8');
  const updated = transformFn(original);

  if (updated !== original) {
    fs.writeFileSync(fullPath, updated, 'utf8');
    log(`✅ Fixed: ${relativePath}`);
  } else {
    log(`ℹ️  No changes needed: ${relativePath}`);
  }
}

/**
 * Helper: vervangt het blok tussen "const description" en "export default"
 * door een nieuwe metadata-header.
 */
function replaceMetadataBlock(content, newHeader) {
  const startIdx = content.indexOf('const description');
  const exportIdx = content.indexOf('export default');

  if (startIdx === -1 || exportIdx === -1 || exportIdx <= startIdx) {
    return content; // geen match, laat file ongemoeid
  }

  const before = content.slice(0, startIdx);
  const after = content.slice(exportIdx);

  return before + newHeader + '\n\n' + after;
}

/**
 * 1) app/(dashboard)/zzp/import/page.tsx
 *    Volledig metadata-blok netjes opbouwen.
 */
fixFile('app/(dashboard)/zzp/import/page.tsx', (content) => {
  const newHeader = `
const description =
  'Upload het JSON-profiel uit het aanmeldformulier en importeer gegevens veilig in het dashboard.';

export const metadata = {
  title: 'Importeer ZZP-profielen | ProBrandwacht',
  description,
  openGraph: {
    title: 'Importeer ZZP-profielen | ProBrandwacht',
    description,
  },
};
`.trim();

  return replaceMetadataBlock(content, newHeader);
});

/**
 * 2) app/zzp/aanmelden/page.tsx
 *    Ook hier een netjes metadata-blok, mét bestaande canonicalUrl.
 */
fixFile('app/zzp/aanmelden/page.tsx', (content) => {
  const newHeader = `
const description =
  'Meld je gratis aan als zzp-brandwacht. Direct contact met opdrachtgevers, eerlijke tarieven en facturatie zonder verborgen kosten.';

export const metadata = {
  title: 'ZZP brandwacht aanmelden | ProBrandwacht',
  description,
  keywords: [
    'brandwacht',
    'brandwacht inhuren',
    'brandwacht huren',
    'DBA-proof brandwacht',
    'brandwacht tarieven',
  ],
  alternates: {
    canonical: canonicalUrl,
    languages: { 'nl-NL': canonicalUrl },
  },
  openGraph: {
    title: 'ZZP brandwacht aanmelden | ProBrandwacht',
    description,
    url: canonicalUrl,
  },
};
`.trim();

  return replaceMetadataBlock(content, newHeader);
});

/**
 * 3) Verwijder dubbele metadata-export in
 *    app/admin/direct-requests/[id]/page.tsx
 */
fixFile('app/admin/direct-requests/[id]/page.tsx', (content) => {
  return content.replace(
    /^export const metadata[^\n]*\n/m,
    ''
  );
});

/**
 * 4) Verwijder dubbele metadata-export in
 *    app/blog/page.tsx
 */
fixFile('app/blog/page.tsx', (content) => {
  return content.replace(
    /^export const metadata[^\n]*\n/m,
    ''
  );
});

log('\n🎉 Metadata fix complete. Now try: npm run build\n');

