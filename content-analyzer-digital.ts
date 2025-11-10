#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
} as const;

type ColorKey = keyof typeof colors;
type PageType = 'landing' | 'service' | 'blog' | 'about';

interface ContentFile {
  path: string;
  content: string;
  type: PageType;
}

interface ContentIssue {
  file: string;
  severity: 'critical' | 'warning' | 'suggestion';
  category: string;
  message: string;
}

interface ContentMetrics {
  wordCount: number;
  headingCount: { h1: number; h2: number; h3: number };
  formCTACount: number;
  chatCTACount: number;
  appCTACount: number;
  trustSignalCount: number;
  benefitCount: number;
  urgencyWords: number;
  availabilityMentions: number;
  employabilityFocus: number;
}

class DigitalConversionAnalyzer {
  private projectRoot: string;
  private issues: ContentIssue[] = [];
  private targetKeywords = [
    'brandwacht',
    'brandwacht huren',
    'brandwacht inhuren',
  ];

  private wordCountThresholds = {
    landing: { min: 200, ideal: 400 },
    service: { min: 300, ideal: 600 },
    blog: { min: 800, ideal: 1500 },
    about: { min: 250, ideal: 500 },
  };

  constructor() {
    this.projectRoot = process.cwd();
  }

  log(message: string, color: ColorKey = 'reset'): void {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  addIssue(issue: ContentIssue): void {
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

    this.log(
      `${icon} [${issue.category}] ${issue.file}: ${issue.message}`,
      color
    );
  }

  determinePageType(filePath: string): PageType {
    if (filePath.includes('/blog/') || filePath.includes('/posts/')) {
      return 'blog';
    }
    if (
      filePath.includes('page.tsx') &&
      !filePath.includes('/blog/') &&
      !filePath.includes('about')
    ) {
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

  getAllContentFiles(): ContentFile[] {
    const files: ContentFile[] = [];
    const extensions = ['.tsx', '.jsx', '.mdx', '.md'];
    const searchDirs = ['app', 'content', 'posts', 'pages'];

    searchDirs.forEach((dir) => {
      if (fs.existsSync(path.join(this.projectRoot, dir))) {
        this.scanDirectory(dir, files, extensions);
      }
    });

    return files;
  }

  scanDirectory(dir: string, files: ContentFile[], extensions: string[]): void {
    try {
      const items = fs.readdirSync(path.join(this.projectRoot, dir));

      items.forEach((item) => {
        const fullPath = path.join(dir, item);
        const absolutePath = path.join(this.projectRoot, fullPath);
        const stat = fs.statSync(absolutePath);

        if (stat.isDirectory()) {
          if (
            item !== 'node_modules' &&
            item !== '.next' &&
            item !== 'components' &&
            !item.startsWith('.')
          ) {
            this.scanDirectory(fullPath, files, extensions);
          }
        } else {
          const skipStructuralFiles = /\/(layout|opengraph-image|error|not-found)\.(tsx|jsx)$/.test(fullPath)

          if (skipStructuralFiles) {
            return
          }

          if (extensions.some((ext) => item.endsWith(ext))) {
            const content = fs.readFileSync(absolutePath, 'utf8');
            if (content.includes('redirect(')) {
              return
            }
            if (this.hasSubstantialContent(content)) {
              files.push({
                path: fullPath,
                content,
                type: this.determinePageType(fullPath),
              });
            }
          }
        }
      });
    } catch (error) {
      // Directory not accessible
    }
  }

  hasSubstantialContent(content: string): boolean {
    const textContent = content.replace(/``````/g, '');
    const words = textContent.match(/\b\w+\b/g) || [];
    return words.length > 30;
  }

  analyzeFile(file: ContentFile): void {
    this.log(`\n📄 Analyzing: ${file.path} [${file.type}]`, 'blue');

    const metrics = this.calculateMetrics(file.content);

    // Digital-first conversion checks
    this.checkWordCount(file, metrics);
    this.checkDigitalCTAs(file, metrics);
    this.checkAvailability(file, metrics); // Updated - less aggressive
    this.checkEmployability(file, metrics);
    this.checkTrustSignals(file, metrics);
    this.checkBenefits(file, metrics);
    this.checkUrgency(file, metrics);
    this.checkKeywordUsage(file, metrics);
    this.checkHeadingStructure(file, metrics);
    this.checkScanability(file);
    this.checkCompetitiveAdvantage(file, metrics);
  }

  calculateMetrics(content: string): ContentMetrics {
    const textContent = content.replace(/``````/g, '');
    const words = textContent.match(/\b\w+\b/g) || [];
    const wordCount = words.length;

    const mdH1Count = (content.match(/^#\s/gm) || []).length;
    const mdH2Count = (content.match(/^##\s/gm) || []).length;
    const mdH3Count = (content.match(/^###\s/gm) || []).length;
    const htmlH1Count = (content.match(/<h1[\s>]/gi) || []).length;
    const htmlH2Count = (content.match(/<h2[\s>]/gi) || []).length;
    const htmlH3Count = (content.match(/<h3[\s>]/gi) || []).length;
    const h1Count = mdH1Count + htmlH1Count;
    const h2Count = mdH2Count + htmlH2Count;
    const h3Count = mdH3Count + htmlH3Count;

    const formPatterns = [
      /aanvragen/gi,
      /aanvraag/gi,
      /offerte/gi,
      /form/gi,
      /formulier/gi,
      /<Form/gi,
      /type="submit"/gi,
    ];
    const formCTACount = formPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    const chatPatterns = [
      /chat/gi,
      /livechat/gi,
      /bericht/gi,
      /messenger/gi,
    ];
    const chatCTACount = chatPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    const appPatterns = [
      /app\s/gi,
      /applicatie/gi,
      /download/gi,
      /platform/gi,
    ];
    const appCTACount = appPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    const availabilityPatterns = [
      /24\/7/gi,
      /24\s*uur/gi,
      /direct\s+beschikbaar/gi,
      /real-time/gi,
      /realtime/gi,
      /onmiddellijk/gi,
      /instant/gi,
    ];
    const availabilityMentions = availabilityPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    const employabilityPatterns = [
      /inzetbaar/gi,
      /beschikbaar/gi,
      /planning/gi,
      /werknemers/gi,
      /personeel/gi,
      /team/gi,
      /gediplomeerd/gi,
      /gecertificeerd/gi,
    ];
    const employabilityFocus = employabilityPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    const trustPatterns = [
      /certificer/gi,
      /gediplomeerd/gi,
      /ervaring/gi,
      /\d+\s*jaar/gi,
      /erkend/gi,
      /betrouwbaar/gi,
      /klanttevredenheid/gi,
      /review/gi,
      /gegarandeerd/gi,
    ];
    const trustSignalCount = trustPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    const benefitPatterns = [
      /snel/gi,
      /direct/gi,
      /professioneel/gi,
      /ervaren/gi,
      /kwaliteit/gi,
      /veilig/gi,
      /transparant/gi,
      /real-time/gi,
    ];
    const benefitCount = benefitPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    const urgencyPatterns = [
      /nu/gi,
      /vandaag/gi,
      /direct/gi,
      /onmiddellijk/gi,
      /spoedopdracht/gi,
    ];
    const urgencyWords = urgencyPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    return {
      wordCount,
      headingCount: { h1: h1Count, h2: h2Count, h3: h3Count },
      formCTACount,
      chatCTACount,
      appCTACount,
      trustSignalCount,
      benefitCount,
      urgencyWords,
      availabilityMentions,
      employabilityFocus,
    };
  }

  checkWordCount(file: ContentFile, metrics: ContentMetrics): void {
    const thresholds = this.wordCountThresholds[file.type];

    if (metrics.wordCount < thresholds.min) {
      this.addIssue({
        file: file.path,
        severity: 'warning',
        category: 'Content Length',
        message: `Only ${metrics.wordCount} words. For ${file.type} pages, aim for ${thresholds.min}+ (ideal: ${thresholds.ideal})`,
      });
    } else if (metrics.wordCount < thresholds.ideal) {
      this.log(
        `✅ Word count: ${metrics.wordCount} (conversion-optimized for ${file.type})`,
        'green'
      );
    } else {
      this.log(`✅ Word count: ${metrics.wordCount} (excellent depth)`, 'green');
    }
  }

  checkDigitalCTAs(file: ContentFile, metrics: ContentMetrics): void {
    const totalDigitalCTAs =
      metrics.formCTACount + metrics.chatCTACount + metrics.appCTACount;

    if (totalDigitalCTAs === 0) {
      this.addIssue({
        file: file.path,
        severity: 'critical',
        category: 'Digital Conversion',
        message:
          'No digital CTAs found! Add form buttons, chat prompts, or app mentions',
      });
    } else {
      this.log(
        `✅ Digital CTAs: Forms(${metrics.formCTACount}) Chat(${metrics.chatCTACount}) App(${metrics.appCTACount})`,
        'green'
      );
    }

    if (metrics.formCTACount === 0 && file.type === 'landing') {
      this.addIssue({
        file: file.path,
        severity: 'warning',
        category: 'Digital Conversion',
        message: 'Landing page should have form CTAs (aanvragen/offerte)',
      });
    }

    if (metrics.chatCTACount === 0 && file.type === 'service') {
      this.addIssue({
        file: file.path,
        severity: 'suggestion',
        category: 'Digital Conversion',
        message: 'Consider adding chat CTA to highlight instant availability',
      });
    }
  }

  // UPDATED: Less aggressive about 24/7 availability
  checkAvailability(file: ContentFile, metrics: ContentMetrics): void {
    // Only check landing pages and one key service page
    if (file.type === 'landing' && metrics.availabilityMentions === 0) {
      this.addIssue({
        file: file.path,
        severity: 'suggestion',
        category: 'Differentiation',
        message:
          'Consider mentioning availability (e.g., real-time, direct) as a differentiator',
      });
    } else if (metrics.availabilityMentions > 0) {
      this.log(
        `✅ Availability mentioned: ${metrics.availabilityMentions} time(s)`,
        'green'
      );
    }
    // No warnings for other page types - keep it natural
  }

  checkEmployability(file: ContentFile, metrics: ContentMetrics): void {
    if (metrics.employabilityFocus === 0 && file.type === 'service') {
      this.addIssue({
        file: file.path,
        severity: 'suggestion',
        category: 'Authority Positioning',
        message:
          'Consider mentioning certified personnel or workforce quality',
      });
    } else if (metrics.employabilityFocus > 0) {
      this.log(
        `✅ Employability focus: ${metrics.employabilityFocus} mentions`,
        'green'
      );
    }
  }

  checkTrustSignals(file: ContentFile, metrics: ContentMetrics): void {
    if (metrics.trustSignalCount === 0 && file.type === 'landing') {
      this.addIssue({
        file: file.path,
        severity: 'warning',
        category: 'Authority & Trust',
        message:
          'No trust signals on landing page. Add certifications or guarantees',
      });
    } else if (metrics.trustSignalCount > 0) {
      this.log(
        `✅ Trust signals: ${metrics.trustSignalCount} (builds authority)`,
        'green'
      );
    }
  }

  checkBenefits(file: ContentFile, metrics: ContentMetrics): void {
    if (metrics.benefitCount === 0) {
      this.addIssue({
        file: file.path,
        severity: 'suggestion',
        category: 'Value Proposition',
        message: 'Consider highlighting key benefits (speed, reliability, quality)',
      });
    } else {
      this.log(`✅ Benefits mentioned: ${metrics.benefitCount}`, 'green');
    }
  }

  checkUrgency(file: ContentFile, metrics: ContentMetrics): void {
    if (metrics.urgencyWords === 0 && file.type === 'landing') {
      this.addIssue({
        file: file.path,
        severity: 'suggestion',
        category: 'Urgency',
        message: 'Consider adding action words: "direct aanvragen", "nu beschikbaar"',
      });
    } else if (metrics.urgencyWords > 0) {
      this.log(`✅ Urgency indicators: ${metrics.urgencyWords}`, 'green');
    }
  }

  checkKeywordUsage(file: ContentFile, metrics: ContentMetrics): void {
    const content = file.content.toLowerCase();
    const primaryKeyword = 'brandwacht';

    if (!content.includes(primaryKeyword) && file.type !== 'about') {
      this.addIssue({
        file: file.path,
        severity: 'warning',
        category: 'SEO Keywords',
        message: `Primary keyword "${primaryKeyword}" not found`,
      });
    } else {
      this.log(`✅ Primary keyword present`, 'green');
    }
  }

  checkHeadingStructure(file: ContentFile, metrics: ContentMetrics): void {
    if (metrics.headingCount.h1 === 0) {
      this.addIssue({
        file: file.path,
        severity: 'critical',
        category: 'Structure',
        message: 'Missing H1 - add a clear headline',
      });
    }

    if (metrics.headingCount.h2 === 0 && file.type !== 'landing') {
      this.addIssue({
        file: file.path,
        severity: 'suggestion',
        category: 'Structure',
        message: 'Consider adding H2 headings for better scannability',
      });
    }
  }

  checkScanability(file: ContentFile): void {
    const paragraphs = file.content.split(/\n\n+/);
    const longParagraphs = paragraphs.filter((p) => {
      const words = p.split(/\s+/).length;
      return words > 60; // Slightly more lenient
    });

    if (longParagraphs.length > 2) {
      this.addIssue({
        file: file.path,
        severity: 'suggestion',
        category: 'Readability',
        message: `${longParagraphs.length} paragraph(s) could be shorter for easier scanning`,
      });
    }
  }

  checkCompetitiveAdvantage(file: ContentFile, metrics: ContentMetrics): void {
    const hasDigitalAdvantage =
      metrics.formCTACount > 0 ||
      metrics.chatCTACount > 0 ||
      metrics.appCTACount > 0;

    if (!hasDigitalAdvantage && file.type === 'landing') {
      this.addIssue({
        file: file.path,
        severity: 'warning',
        category: 'Differentiation',
        message:
          'Landing page should highlight digital-first approach (forms/chat/app)',
      });
    } else if (hasDigitalAdvantage) {
      this.log(`✅ Digital-first approach present`, 'green');
    }
  }

  generateReport(): void {
    this.log('\n' + '='.repeat(70), 'cyan');
    this.log('🚀 DIGITAL-FIRST CONVERSION ANALYSIS', 'cyan');
    this.log('='.repeat(70), 'cyan');

    const critical = this.issues.filter((i) => i.severity === 'critical');
    const warnings = this.issues.filter((i) => i.severity === 'warning');
    const suggestions = this.issues.filter((i) => i.severity === 'suggestion');

    this.log(`\n❌ Critical Issues: ${critical.length}`, 'red');
    this.log(`⚠️  Warnings: ${warnings.length}`, 'yellow');
    this.log(`💡 Suggestions: ${suggestions.length}`, 'cyan');

    const digitalIssues = this.issues.filter(
      (i) =>
        i.category === 'Digital Conversion' ||
        i.category === 'Differentiation'
    );

    if (digitalIssues.length > 0) {
      this.log('\n💻 DIGITAL CONVERSION FOCUS:', 'magenta');
      digitalIssues.slice(0, 5).forEach((issue, i) => {
        const icon =
          issue.severity === 'critical'
            ? '❌'
            : issue.severity === 'warning'
            ? '⚠️'
            : '💡';
        this.log(
          `${i + 1}. ${icon} ${path.basename(issue.file)}: ${issue.message}`,
          'yellow'
        );
      });
    } else {
      this.log('\n✅ Digital conversion elements look good!', 'green');
    }

    const conversionScore = Math.max(
      0,
      100 - critical.length * 20 - warnings.length * 10 - suggestions.length * 5
    );

    this.log(
      `\n🎯 DIGITAL CONVERSION SCORE: ${conversionScore}%`,
      conversionScore >= 80 ? 'green' : conversionScore >= 60 ? 'yellow' : 'red'
    );

    this.log('\n💡 YOUR COMPETITIVE ADVANTAGES:', 'cyan');
    this.log('  ✓ Digital-first: Forms, App & Chat', 'cyan');
    this.log('  ✓ Direct employability focus', 'cyan');
    this.log('  ✓ Real-time availability when mentioned', 'cyan');
    this.log('  ✓ Authority positioning in the market', 'cyan');

    this.log('\n🎯 SUBTLE OPTIMIZATION TIPS:', 'cyan');
    this.log('  • Highlight digital CTAs naturally in content', 'cyan');
    this.log('  • Mention real-time capabilities where relevant', 'cyan');
    this.log('  • Use forms as primary conversion path', 'cyan');
    this.log('  • Build authority through content quality', 'cyan');

    this.log('\n' + '='.repeat(70) + '\n', 'cyan');
  }

  async analyze(): Promise<void> {
    this.log('🚀 Starting Digital-First Content Analysis...', 'blue');
    this.log(`📁 Project Root: ${this.projectRoot}\n`);

    const files = this.getAllContentFiles();

    if (files.length === 0) {
      this.log('⚠️  No content files found!', 'yellow');
      return;
    }

    this.log(`📄 Found ${files.length} content file(s)\n`, 'green');

    files.forEach((file) => {
      this.analyzeFile(file);
    });

    this.generateReport();
  }
}

const analyzer = new DigitalConversionAnalyzer();
analyzer.analyze();
