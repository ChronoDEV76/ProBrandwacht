
import fetch from "node-fetch";
import chalk from "chalk";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.probrandwacht.nl";

const urls = [
  `${SITE_URL}/robots.txt`,
  `${SITE_URL}/sitemap.xml`,
];

async function checkUrl(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const ok = res.ok && text.length > 0;

    if (!ok) throw new Error(`Status ${res.status}`);

    // Basis validatie
    if (url.endsWith(".xml") && !text.includes("<urlset")) {
      console.log(chalk.yellow(`⚠️  ${url} lijkt geen geldige XML-sitemap.`));
    } else if (url.endsWith(".txt") && !text.toLowerCase().includes("user-agent")) {
      console.log(chalk.yellow(`⚠️  ${url} bevat geen "User-agent" regel.`));
    } else {
      console.log(chalk.green(`✔ ${url} OK`));
    }
  } catch (err) {
    console.log(chalk.red(`✘ ${url} onbereikbaar: ${err.message}`));
  }
}

console.log(chalk.cyan(`🔍 SEO-check voor ${SITE_URL}\n`));
for (const url of urls) {
  await checkUrl(url);
}

console.log(chalk.gray(`\nSEO-check afgerond.`));

