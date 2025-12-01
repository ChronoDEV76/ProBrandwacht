#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

class DigitalConversionAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.issues = [];

    this.targetKeywords = [
      'brandwacht',
      'brandwacht huren',
      'brandwacht inhuren',
    ];

    this.wordCountThresholds = {
      landing: { min: 200, ideal: 400 },
      service: { min: 300, ideal: 600 },
      blog: { min: 800, ideal: 1500 },
      about: { min: 250, ideal: 500 },
    };
  }

  addIssue(issue) {
    this.issues.push(issue);
    const icon =
      issue.severity === 'critical'
        ? '❌'
        : issue.severity === 'warning'
        ? '⚠️'
        : '💡';

    const color =
      issue.severity === 'critical'
        ? 'red'
        : issue.severity === 'warning'
        ? 'yellow'
        : 'cyan';

    log(`${icon} [${issue.category}] ${issue.file}: ${issue.message}`, color);
  }

  determinePageType(filePath) {
    if (filePath.includes('/blog/') || filePath.includes('/posts/')) return 'blog';
    if (filePath.includes('page.tsx') && !filePath.includes('/blog/') && !filePath.includes('about')) {
      return 'landing';
    }
    if (
      filePath.includes('/diensten/') ||
      filePath.includes('/services/') ||
      filePath.includes('brandwacht-')
    ) {
      return 'service';
    }
    return 'about';
  }

  getAllContentFiles() {
    const files = [];
    const extensions = ['.tsx', '.jsx', '.mdx', '.md'];
    const searchDirs = ['app', 'content', 'posts', 'pages'];

    for (const dir of searchDirs) {
      const full = path.join(this.projectRoot, dir);
      if (fs.existsSync(full)) {
        this.scanDirectory(dir, files, extensions);
      }
    }
    return files;
  }

  scanDirectory(dir, files, extensions) {
    try {
      const items = fs.readdirSync(path.join(this.projectRoot, dir));

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const abs = path.join(this.projectRoot, fullPath);
        const stat = fs.statSync(abs);

        if (stat.isDirectory()) {
          if (
            !['node_modules', '.next', 'components'].includes(item) &&
            !item.startsWith('.')
          ) {
            this.scanDirectory(fullPath, files, extensions);
          }
        } else {
          if (/(layout|opengraph-image|error|not-found)\.(tsx|jsx)$/.test(fullPath)) {
            continue;
          }

          if (extensions.some((ext) => item.endsWith(ext))) {
            const content = fs.readFileSync(abs, 'utf8');
            if (content.includes('redirect(')) continue;

            if (this.hasContent(content)) {
              files.push({
                path: fullPath,
                content,
                type: this.determinePageType(fullPath),
              });
            }
          }
        }
      }
    } catch {}
  }

  hasContent(content) {
    const words = (content.replace(/``````/g, '').match(/\b\w+\b/g) || []).length;
    return words > 30;
  }

  analyzeFile(file) {
    log(`\n📄 Analyzing: ${file.path} [${file.type}]`, 'blue');

    const metrics = this.calculateMetrics(file.content);

    this.checkWordCount(file, metrics);
    this.checkDigitalCTAs(file, metrics);
    this.checkAvailability(file, metrics);
    this.checkEmployability(file, metrics);
    this.checkTrustSignals(file, metrics);
    this.checkBenefits(file, metrics);
    this.checkUrgency(file, metrics);
    this.checkKeywordUsage(file);
    this.checkHeadingStructure(file, metrics);
    this.checkScanability(file);
    this.checkCompetitiveAdvantage(file, metrics);
  }

  calculateMetrics(content) {
    const clean = content.replace(/``````/g, '');
    const words = clean.match(/\b\w+\b/g) || [];
    const wc = words.length;

    const h1 = (content.match(/<h1|^#\s/gm) || []).length;
    const h2 = (content.match(/<h2|^##\s/gm) || []).length;
    const h3 = (content.match(/<h3|^###\s/gm) || []).length;

    const formCount = (content.match(/aanvraag|offerte|form|submit/gi) || []).length;
    const chatCount = (content.match(/chat|bericht|messenger/gi) || []).length;
    const appCount = (content.match(/app |download|platform/gi) || []).length;

    const trustCount = (content.match(/jaar|ervaring|review|erkend|betrouwbaar/gi) || []).length;

    return {
      wordCount: wc,
      headingCount: { h1, h2, h3 },
      formCTACount: formCount,
      chatCTACount: chatCount,
      appCTACount: appCount,
      trustSignalCount: trustCount,
    };
  }

  checkWordCount(file, m) {
    const t = this.wordCountThresholds[file.type];
    if (!t) return;

    if (m.wordCount < t.min) {
      this.addIssue({
        file: file.path,
        severity: 'warning',
        category: 'Content Length',
        message: `Only ${m.wordCount} words. Need ${t.min}+`,
      });
    }
  }

  checkDigitalCTAs(file, m) {
    if (m.formCTACount + m.chatCTACount + m.appCTACount === 0) {
      this.addIssue({
        file: file.path,
        severity: 'critical',
        category: 'Digital Conversion',
        message: 'No digital CTAs found',
      });
    }
  }

  checkAvailability() {}
  checkEmployability() {}
  checkTrustSignals() {}
  checkBenefits() {}
  checkUrgency() {}
  checkHeadingStructure() {}
  checkScanability() {}
  checkCompetitiveAdvantage() {}

  checkKeywordUsage(file) {
    const content = file.content.toLowerCase();
    if (!content.includes('brandwacht')) {
      this.addIssue({
        file: file.path,
        severity: 'warning',
        category: 'SEO Keywords',
        message: 'Keyword "brandwacht" missing',
      });
    }
  }

  generateReport() {
    log('\n==============================', 'cyan');
    log('📊 DIGITAL + SEO REPORT', 'cyan');
    log('==============================', 'cyan');

    const critical = this.issues.filter((i) => i.severity === 'critical');
    const warnings = this.issues.filter((i) => i.severity === 'warning');
    const suggestions = this.issues.filter((i) => i.severity === 'suggestion');

    log(`❌ Critical: ${critical.length}`, 'red');
    log(`⚠️  Warnings: ${warnings.length}`, 'yellow');
    log(`💡 Suggestions: ${suggestions.length}`, 'cyan');
  }

  async analyze(baseUrl) {
    await this.analyzeProject();

    if (baseUrl) {
      const live = new LiveSEOAnalyzer(baseUrl, this);
      await live.run();
    }

    this.generateReport();
  }

  async analyzeProject() {
    log('📁 Scanning repo content...\n', 'blue');
    const files = this.getAllContentFiles();

    for (const f of files) this.analyzeFile(f);
  }
}

class LiveSEOAnalyzer {
  constructor(baseUrl, main) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.main = main;
  }

  async fetchSitemapUrls() {
    const sitemap = `${this.baseUrl}/sitemap.xml`;
    log(`🌐 Fetching sitemap: ${sitemap}`, 'blue');

    try {
      const r = await fetch(sitemap);
      const xml = await r.text();

      const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) =>
        m[1].trim()
      );

      log(`📄 Found ${urls.length} URLs`, 'green');
      return urls;
    } catch {
      log(`⚠️  Failed sitemap. Using base URL only`, 'yellow');
      return [this.baseUrl];
    }
  }

  async analyzeUrl(url) {
    log(`\n🔍 Live SEO check: ${url}`, 'magenta');

    try {
      const r = await fetch(url);
      const html = await r.text();

      const $ = cheerio.load(html);
      const title = $('title').text().trim();
      const desc = $('meta[name="description"]').attr('content') || '';
      const h1Count = $('h1').length;

      if (!title) {
        this.main.addIssue({
          file: url,
          severity: 'critical',
          category: 'Live SEO',
          message: 'Missing <title>',
        });
      }

      if (!desc) {
        this.main.addIssue({
          file: url,
          severity: 'warning',
          category: 'Live SEO',
          message: 'Missing meta description',
        });
      }

      if (h1Count !== 1) {
        this.main.addIssue({
          file: url,
          severity: 'warning',
          category: 'Live SEO',
          message: `H1 count = ${h1Count}`,
        });
      }
    } catch (e) {
      log(`⚠️ Error: ${e.message}`, 'red');
    }
  }

  async run() {
    log('\n🌍 Live site SEO analysis...\n', 'blue');

    const urls = await this.fetchSitemapUrls();

    for (const url of urls.slice(0, 50)) {
      await this.analyzeUrl(url);
    }

    log('\n✅ Live SEO done.\n', 'green');
  }
}

// CLI
const args = process.argv.slice(2);
const siteArg = args.find((a) => a.startsWith('--site='));
const siteUrl = siteArg ? siteArg.split('=')[1] : null;

const analyzer = new DigitalConversionAnalyzer();
analyzer.analyze(siteUrl);

