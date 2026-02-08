
import fetch from "node-fetch";
import chalk from "chalk";
import fs from "node:fs";
import path from "node:path";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.probrandwacht.nl";
const FORCE_LOCAL = String(process.argv.find((a) => a.startsWith("--local="))?.split("=")[1] ?? "0") === "1";

const urls = [`${SITE_URL}/robots.txt`, `${SITE_URL}/sitemap.xml`];

function checkLocalRobots() {
  const robotsPath = path.join(process.cwd(), "public", "robots.txt");
  if (!fs.existsSync(robotsPath)) {
    console.log(chalk.red("✘ public/robots.txt ontbreekt."));
    return false;
  }
  const text = fs.readFileSync(robotsPath, "utf8");
  if (!text.toLowerCase().includes("user-agent")) {
    console.log(chalk.yellow("⚠️  public/robots.txt bevat geen \"User-agent\" regel."));
  } else {
    console.log(chalk.green("✔ public/robots.txt OK"));
  }
  return true;
}

function checkLocalSitemap() {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    console.log(chalk.red("✘ public/sitemap.xml ontbreekt."));
    return false;
  }
  const text = fs.readFileSync(sitemapPath, "utf8");
  if (!text.includes("<urlset")) {
    console.log(chalk.yellow("⚠️  public/sitemap.xml lijkt geen geldige XML-sitemap."));
  } else {
    console.log(chalk.green("✔ public/sitemap.xml OK"));
  }
  return true;
}

async function checkUrl(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const ok = res.ok && text.length > 0;

    if (!ok) throw new Error(`Status ${res.status}`);

    if (url.endsWith(".xml") && !text.includes("<urlset")) {
      console.log(chalk.yellow(`⚠️  ${url} lijkt geen geldige XML-sitemap.`));
    } else if (url.endsWith(".txt") && !text.toLowerCase().includes("user-agent")) {
      console.log(chalk.yellow(`⚠️  ${url} bevat geen "User-agent" regel.`));
    } else {
      console.log(chalk.green(`✔ ${url} OK`));
    }
    return true;
  } catch (err) {
    console.log(chalk.red(`✘ ${url} onbereikbaar: ${err.message}`));
    return false;
  }
}

console.log(chalk.cyan(`🔍 SEO-check voor ${SITE_URL}\n`));

if (!FORCE_LOCAL) {
  const results = [];
  for (const url of urls) results.push(await checkUrl(url));
  if (results.some((ok) => !ok)) {
    console.log(chalk.yellow("⚠️  Live SEO-check onvolledig. Val terug op lokale check.\n"));
    checkLocalRobots();
    checkLocalSitemap();
  }
} else {
  console.log(chalk.yellow("⚠️  Live SEO-check overgeslagen (force local).\n"));
  checkLocalRobots();
  checkLocalSitemap();
}

console.log(chalk.gray(`\nSEO-check afgerond.`));
