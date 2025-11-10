
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Kleuren voor console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
} as const;

type ColorKey = keyof typeof colors;

interface CheckResult {
  issues: string[];
  warnings: string[];
  successes: string[];
  suggestions: string[];
}

class SEOChecker implements CheckResult {
  issues: string[] = [];
  warnings: string[] = [];
  successes: string[] = [];
  suggestions: string[] = [];
  projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  log(message: string, color: ColorKey = 'reset'): void {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  addIssue(message: string): void {
    this.issues.push(message);
    this.log(`❌ ${message}`, 'red');
  }

  addWarning(message: string): void {
    this.warnings.push(message);
    this.log(`⚠️  ${message}`, 'yellow');
  }

  addSuccess(message: string): void {
    this.successes.push(message);
    this.log(`✅ ${message}`, 'green');
  }

  addSuggestion(message: string): void {
    this.suggestions.push(message);
    this.log(`💡 ${message}`, 'cyan');
  }

  fileExists(filePath: string): boolean {
    return fs.existsSync(path.join(this.projectRoot, filePath));
  }

  readFile(filePath: string): string | null {
    try {
      return fs.readFileSync(path.join(this.projectRoot, filePath), 'utf8');
    } catch (error) {
      return null;
    }
  }

  checkFileContains(
    filePath: string,
    searchString: string,
    caseSensitive: boolean = false
  ): boolean {
    const content = this.readFile(filePath);
    if (!content) return false;

    if (caseSensitive) {
      return content.includes(searchString);
    }
    return content.toLowerCase().includes(searchString.toLowerCase());
  }

  // Check 1: Project Structure
  checkProjectStructure(): void {
    this.log('\n📁 Checking Project Structure...', 'blue');

    const requiredDirs = ['app', 'public', 'components'];

    const optionalDirs = ['lib', 'content', 'content/blog', 'public/images'];

    requiredDirs.forEach((dir) => {
      if (this.fileExists(dir)) {
        this.addSuccess(`Directory '${dir}' exists`);
      } else {
        this.addIssue(`Missing required directory: '${dir}'`);
      }
    });

    optionalDirs.forEach((dir) => {
      if (this.fileExists(dir)) {
        this.addSuccess(`Optional directory '${dir}' exists`);
      } else {
        this.addWarning(`Recommended directory missing: '${dir}'`);
        this.addSuggestion(`Create '${dir}' directory for better organization`);
      }
    });

    // Check for TypeScript
    if (this.fileExists('tsconfig.json')) {
      this.addSuccess('TypeScript configuration found');
    } else {
      this.addWarning('No tsconfig.json found');
    }
  }

  // Check 2: Root Layout Metadata
  checkRootLayout(): void {
    this.log('\n🎨 Checking Root Layout (app/layout.tsx)...', 'blue');

    const layoutPath = 'app/layout.tsx';
    const layoutPathJs = 'app/layout.js';

    let layoutFile: string | null = null;
    if (this.fileExists(layoutPath)) {
      layoutFile = layoutPath;
    } else if (this.fileExists(layoutPathJs)) {
      layoutFile = layoutPathJs;
    }

    if (!layoutFile) {
      this.addIssue('app/layout.tsx or app/layout.js not found');
      return;
    }

    this.addSuccess(`Found ${layoutFile}`);

    const content = this.readFile(layoutFile);
    if (!content) return;

    // Check for essential metadata
    const checks: Array<{ key: string; name: string }> = [
      { key: 'Metadata', name: 'Metadata type import from next' },
      { key: 'export const metadata', name: 'Metadata export' },
      { key: 'title', name: 'Title metadata' },
      { key: 'description', name: 'Description metadata' },
      { key: 'openGraph', name: 'OpenGraph metadata' },
      { key: 'robots', name: 'Robots metadata' },
      { key: 'lang="nl"', name: 'Dutch language attribute' },
    ];

    checks.forEach((check) => {
      if (this.checkFileContains(layoutFile!, check.key)) {
        this.addSuccess(`${check.name} found`);
      } else {
        this.addWarning(`${check.name} not found`);
        this.addSuggestion(`Add ${check.name} to ${layoutFile}`);
      }
    });

    // Check for keywords
    if (this.checkFileContains(layoutFile, 'brandwacht')) {
      this.addSuccess('Target keywords found in metadata');
    } else {
      this.addWarning('Target keywords (brandwacht) not found');
      this.addSuggestion(
        'Add "brandwacht huren" and "brandwacht inhuren" to keywords'
      );
    }
  }

  // Check 3: Robots.txt
  checkRobots(): void {
    this.log('\n🤖 Checking robots.txt / robots.ts...', 'blue');

    if (this.fileExists('app/robots.ts') || this.fileExists('app/robots.js')) {
      this.addSuccess('Dynamic robots file found (App Router)');

      const robotsFile = this.fileExists('app/robots.ts')
        ? 'app/robots.ts'
        : 'app/robots.js';
      const content = this.readFile(robotsFile);

      if (content && content.includes('sitemap')) {
        this.addSuccess('Sitemap reference found in robots');
      } else {
        this.addWarning('No sitemap reference in robots file');
        this.addSuggestion('Add sitemap URL to robots.ts');
      }
    } else if (this.fileExists('public/robots.txt')) {
      this.addWarning(
        'Static robots.txt found - consider using App Router dynamic robots.ts'
      );
      this.addSuggestion('Create app/robots.ts for dynamic robots generation');
    } else {
      this.addIssue('No robots.txt or robots.ts found');
      this.addSuggestion('Create app/robots.ts');
    }
  }

  // Check 4: Sitemap
  checkSitemap(): void {
    this.log('\n🗺️  Checking sitemap...', 'blue');

    if (this.fileExists('app/sitemap.ts') || this.fileExists('app/sitemap.js')) {
      this.addSuccess('Dynamic sitemap file found (App Router)');
    } else if (this.fileExists('public/sitemap.xml')) {
      this.addWarning(
        'Static sitemap.xml found - consider using App Router dynamic sitemap.ts'
      );
      this.addSuggestion('Create app/sitemap.ts for dynamic sitemap generation');
    } else {
      this.addIssue('No sitemap found');
      this.addSuggestion('Create app/sitemap.ts');
    }
  }

  // Check 5: Next.js Config
  checkNextConfig(): void {
    this.log('\n⚙️  Checking next.config.js/mjs/ts...', 'blue');

    const configFiles = ['next.config.ts', 'next.config.mjs', 'next.config.js'];
    const configFile = configFiles.find((file) => this.fileExists(file));

    if (!configFile) {
      this.addWarning('next.config file not found');
      return;
    }

    this.addSuccess(`Found ${configFile}`);

    const checks: Array<{ key: string; name: string }> = [
      { key: 'images', name: 'Image optimization config' },
      { key: 'compress', name: 'Compression enabled' },
      { key: 'poweredByHeader: false', name: 'X-Powered-By header disabled' },
    ];

    checks.forEach((check) => {
      if (this.checkFileContains(configFile, check.key)) {
        this.addSuccess(`${check.name} configured`);
      } else {
        this.addWarning(`${check.name} not configured`);
        this.addSuggestion(`Add ${check.key} to ${configFile}`);
      }
    });
  }

  // Check 6: Package Dependencies
  checkDependencies(): void {
    this.log('\n📦 Checking package.json dependencies...', 'blue');

    if (!this.fileExists('package.json')) {
      this.addIssue('package.json not found');
      return;
    }

    const packageContent = this.readFile('package.json');
    if (!packageContent) return;

    const packageJson = JSON.parse(packageContent);
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    interface Dependency {
      name: string;
      required: boolean;
      reason?: string;
    }

    const recommended: Dependency[] = [
      { name: 'next', required: true },
      { name: 'react', required: true },
      { name: 'typescript', required: false },
      { name: '@types/node', required: false },
      { name: '@types/react', required: false },
      { name: 'tailwindcss', required: false },
      {
        name: 'gray-matter',
        required: false,
        reason: 'for MDX frontmatter parsing',
      },
      { name: '@next/mdx', required: false, reason: 'for MDX support' },
      {
        name: 'next-sitemap',
        required: false,
        reason: 'for advanced sitemap generation',
      },
    ];

    recommended.forEach((dep) => {
      if (allDeps[dep.name]) {
        this.addSuccess(`${dep.name} installed`);
      } else if (dep.required) {
        this.addIssue(`Required dependency missing: ${dep.name}`);
      } else {
        this.addWarning(`Recommended dependency missing: ${dep.name}`);
        if (dep.reason) {
          this.addSuggestion(`Install ${dep.name} ${dep.reason}`);
        }
      }
    });
  }

  // Check 7: MDX Blog Setup
  checkMDXBlog(): void {
    this.log('\n📝 Checking MDX Blog Setup...', 'blue');

    if (!this.fileExists('content/blog') && !this.fileExists('posts')) {
      this.addWarning('No blog content directory found');
      this.addSuggestion('Create content/blog directory for blog posts');
      return;
    }

    const blogDir = this.fileExists('content/blog') ? 'content/blog' : 'posts';
    this.addSuccess(`Blog directory found: ${blogDir}`);

    // Check for blog page
    const blogPages = [
      'app/blog/page.tsx',
      'app/blog/page.js',
      'app/blog/[slug]/page.tsx',
      'app/blog/[slug]/page.js',
    ];

    let hasBlogPage = false;
    blogPages.forEach((page) => {
      if (this.fileExists(page)) {
        this.addSuccess(`Blog page found: ${page}`);
        hasBlogPage = true;

        // Check for generateMetadata
        if (this.checkFileContains(page, 'generateMetadata')) {
          this.addSuccess('Dynamic metadata generation found');
        } else {
          this.addWarning('No generateMetadata function found');
          this.addSuggestion(`Add generateMetadata to ${page} for dynamic SEO`);
        }
      }
    });

    if (!hasBlogPage) {
      this.addWarning('No blog page found');
      this.addSuggestion('Create app/blog/[slug]/page.tsx for blog posts');
    }

    // Check for example MDX file
    try {
      const blogPath = path.join(this.projectRoot, blogDir);
      const files = fs.readdirSync(blogPath);
      const mdxFiles = files.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

      if (mdxFiles.length > 0) {
        this.addSuccess(`Found ${mdxFiles.length} blog post(s)`);

        // Check first MDX file for frontmatter
        const firstPost = this.readFile(path.join(blogDir, mdxFiles[0]));
        if (firstPost && firstPost.includes('---')) {
          this.addSuccess('MDX frontmatter detected');

          const frontmatterChecks = ['title', 'description', 'date', 'tags'];
          frontmatterChecks.forEach((field) => {
            if (firstPost.includes(`${field}:`)) {
              this.addSuccess(`Frontmatter field '${field}' found`);
            } else {
              this.addWarning(`Frontmatter field '${field}' missing`);
            }
          });
        }
      } else {
        this.addWarning('No blog posts found');
        this.addSuggestion('Create MDX blog posts in content/blog/');
      }
    } catch (error) {
      // Directory might not be readable
    }
  }

  // Check 8: Image Optimization
  checkImages(): void {
    this.log('\n🖼️  Checking Image Optimization...', 'blue');

    if (!this.fileExists('public/images')) {
      this.addWarning('public/images directory not found');
      this.addSuggestion('Create public/images directory for optimized images');
    } else {
      this.addSuccess('Images directory exists');
    }

    // Check for next/image usage
    const componentFiles = this.getAllFiles('app', ['.tsx', '.jsx', '.ts', '.js']);
    let usesNextImage = false;

    componentFiles.forEach((file) => {
      if (
        this.checkFileContains(file, "from 'next/image'") ||
        this.checkFileContains(file, 'from "next/image"')
      ) {
        usesNextImage = true;
      }
    });

    if (usesNextImage) {
      this.addSuccess('next/image component is being used');
    } else {
      this.addWarning('No usage of next/image found');
      this.addSuggestion(
        'Use next/image instead of <img> tags for better performance'
      );
    }
  }

  // Check 9: Structured Data
  checkStructuredData(): void {
    this.log('\n📊 Checking Structured Data (Schema.org)...', 'blue');

    const files = this.getAllFiles('app', ['.tsx', '.jsx', '.ts', '.js']);
    let hasSchema = false;

    files.forEach((file) => {
      if (
        this.checkFileContains(file, 'application/ld+json') ||
        this.checkFileContains(file, '@type') ||
        this.checkFileContains(file, 'schema.org')
      ) {
        hasSchema = true;
      }
    });

    if (hasSchema) {
      this.addSuccess('Structured data (JSON-LD) found');
    } else {
      this.addWarning('No structured data found');
      this.addSuggestion(
        'Add Schema.org structured data for LocalBusiness and Service'
      );
    }
  }

  // Check 10: Analytics
  checkAnalytics(): void {
    this.log('\n📈 Checking Analytics Setup...', 'blue');

    const layoutFiles = ['app/layout.tsx', 'app/layout.js'];
    const layoutFile = layoutFiles.find((f) => this.fileExists(f));

    if (!layoutFile) return;

    interface AnalyticsCheck {
      key: string;
      name: string;
    }

    const analyticsChecks: AnalyticsCheck[] = [
      { key: 'gtag', name: 'Google Analytics' },
      { key: 'googletagmanager', name: 'Google Tag Manager' },
      { key: 'plausible', name: 'Plausible Analytics' },
    ];

    let hasAnalytics = false;
    analyticsChecks.forEach((check) => {
      if (this.checkFileContains(layoutFile, check.key)) {
        this.addSuccess(`${check.name} detected`);
        hasAnalytics = true;
      }
    });

    if (!hasAnalytics) {
      this.addWarning('No analytics found');
      this.addSuggestion('Add Google Analytics or alternative analytics solution');
    }
  }

  // Check 11: Performance & Core Web Vitals
  checkPerformance(): void {
    this.log('\n⚡ Checking Performance Configuration...', 'blue');

    // Check for font optimization
    const layoutFiles = ['app/layout.tsx', 'app/layout.js'];
    const layoutFile = layoutFiles.find((f) => this.fileExists(f));

    if (layoutFile) {
      if (this.checkFileContains(layoutFile, 'next/font')) {
        this.addSuccess('next/font optimization found');
      } else {
        this.addWarning('next/font not detected');
        this.addSuggestion('Use next/font for optimized font loading');
      }
    }

    // Check for lazy loading
    const files = this.getAllFiles('app', ['.tsx', '.jsx']);
    let hasLazyLoading = false;
    files.forEach((file) => {
      if (
        this.checkFileContains(file, 'dynamic') ||
        this.checkFileContains(file, 'lazy')
      ) {
        hasLazyLoading = true;
      }
    });

    if (hasLazyLoading) {
      this.addSuccess('Dynamic imports/lazy loading detected');
    } else {
      this.addWarning('No lazy loading detected');
      this.addSuggestion('Use dynamic imports for heavy components');
    }
  }

  // Check 12: SEO-Friendly URLs & Content
  checkSEOContent(): void {
    this.log('\n🔍 Checking SEO Content & Keywords...', 'blue');

    const keywords = ['brandwacht', 'huren', 'inhuren', 'diensten'];
    const files = this.getAllFiles('app', ['.tsx', '.jsx', '.mdx', '.md']);

    const keywordUsage: Record<string, number> = {};
    keywords.forEach((kw) => (keywordUsage[kw] = 0));

    files.forEach((file) => {
      const content = this.readFile(file);
      if (content) {
        keywords.forEach((kw) => {
          const regex = new RegExp(kw, 'gi');
          const matches = content.match(regex);
          if (matches) {
            keywordUsage[kw] += matches.length;
          }
        });
      }
    });

    Object.entries(keywordUsage).forEach(([keyword, count]) => {
      if (count > 0) {
        this.addSuccess(`Keyword "${keyword}" found ${count} times`);
      } else {
        this.addWarning(`Keyword "${keyword}" not found`);
        this.addSuggestion(`Add "${keyword}" to your content naturally`);
      }
    });

    // Check for location pages
    const cities = ['amsterdam', 'rotterdam', 'utrecht', 'den-haag'];
    let hasLocationPages = false;

    cities.forEach((city) => {
      if (this.fileExists(`app/brandwacht-huren/${city}`)) {
        hasLocationPages = true;
      }
    });

    if (hasLocationPages) {
      this.addSuccess('Location-specific pages detected (good for local SEO)');
    } else {
      this.addWarning('No location-specific pages found');
      this.addSuggestion(
        'Create city-specific pages (e.g., /brandwacht-huren/amsterdam)'
      );
    }
  }

  // Helper: Get all files recursively
  getAllFiles(dir: string, extensions: string[] = []): string[] {
    let results: string[] = [];
    try {
      const list = fs.readdirSync(path.join(this.projectRoot, dir));
      list.forEach((file) => {
        const filePath = path.join(dir, file);
        const fullPath = path.join(this.projectRoot, filePath);
        const stat = fs.statSync(fullPath);

        if (stat && stat.isDirectory()) {
          // Skip node_modules and .next
          if (
            file !== 'node_modules' &&
            file !== '.next' &&
            !file.startsWith('.')
          ) {
            results = results.concat(this.getAllFiles(filePath, extensions));
          }
        } else {
          if (
            extensions.length === 0 ||
            extensions.some((ext) => file.endsWith(ext))
          ) {
            results.push(filePath);
          }
        }
      });
    } catch (error) {
      // Directory not accessible
    }
    return results;
  }

  // Generate Report
  generateReport(): void {
    this.log('\n' + '='.repeat(60), 'cyan');
    this.log('📊 SEO CHECK REPORT', 'cyan');
    this.log('='.repeat(60), 'cyan');

    this.log(`\n✅ Successes: ${this.successes.length}`, 'green');
    this.log(`⚠️  Warnings: ${this.warnings.length}`, 'yellow');
    this.log(`❌ Issues: ${this.issues.length}`, 'red');
    this.log(`💡 Suggestions: ${this.suggestions.length}`, 'cyan');

    if (this.suggestions.length > 0) {
      this.log('\n📋 TOP PRIORITY SUGGESTIONS:', 'cyan');
      this.suggestions.slice(0, 10).forEach((suggestion, i) => {
        this.log(`   ${i + 1}. ${suggestion}`, 'cyan');
      });
    }

    // Generate score
    const totalChecks =
      this.successes.length + this.warnings.length + this.issues.length;
    const score =
      totalChecks > 0 ? Math.round((this.successes.length / totalChecks) * 100) : 0;

    this.log(
      `\n🎯 SEO SCORE: ${score}%`,
      score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red'
    );

    if (score < 80) {
      this.log(
        '\n💪 Keep improving! Address the suggestions above to boost your SEO.',
        'yellow'
      );
    } else {
      this.log('\n🎉 Great job! Your project is well-optimized for SEO.', 'green');
    }

    this.log('\n' + '='.repeat(60) + '\n', 'cyan');
  }

  // Run all checks
  async runAllChecks(): Promise<void> {
    this.log('🚀 Starting SEO Check for Next.js TypeScript Project...', 'blue');
    this.log(`📁 Project Root: ${this.projectRoot}\n`);

    this.checkProjectStructure();
    this.checkRootLayout();
    this.checkRobots();
    this.checkSitemap();
    this.checkNextConfig();
    this.checkDependencies();
    this.checkMDXBlog();
    this.checkImages();
    this.checkStructuredData();
    this.checkAnalytics();
    this.checkPerformance();
    this.checkSEOContent();

    this.generateReport();
  }
}

// Run the checker
const checker = new SEOChecker();
checker.runAllChecks();

