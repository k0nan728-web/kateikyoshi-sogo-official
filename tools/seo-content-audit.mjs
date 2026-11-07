import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const base = process.env.APP_URL || 'http://127.0.0.1:4173';
const slugs = [
  'kateikyoshi-or-cram-school',
  'individual-tutoring-school-vs-home-tutor',
  'what-is-online-tutor',
  'tutor-costs-compare',
];
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const failures = [];
for (const slug of slugs) {
  const canonical = `https://kateikyoshi-sogo.com/blog/${slug}/`;
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`${slug}: missing from sitemap`);
}
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const slug of slugs) {
    const url = `${base}/blog/${slug}/`;
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    if (!response || response.status() !== 200) {
      failures.push(`${slug}: HTTP ${response?.status() ?? 'no response'}`);
      continue;
    }
    const result = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      heading: document.querySelector('h1')?.innerText || '',
      schema: [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map(node => { try { return JSON.parse(node.textContent); } catch { return null; } })
        .filter(Boolean),
      bodyText: document.querySelector('.hub-article-body')?.innerText || '',
    }));
    if (!result.title) failures.push(`${slug}: missing title`);
    if (result.description.length < 40) failures.push(`${slug}: missing or short description`);
    if (result.canonical !== `https://kateikyoshi-sogo.com/blog/${slug}/`) failures.push(`${slug}: incorrect canonical`);
    if (!result.heading) failures.push(`${slug}: missing H1`);
    if (result.bodyText.length < 500) failures.push(`${slug}: article body appears incomplete`);
    if (!result.schema.some(item => item['@type'] === 'Article')) failures.push(`${slug}: missing Article structured data`);
    await page.screenshot({ path: `audit-results/seo-${slug}-390.png`, fullPage: true });
  }
  const blogResponse = await page.goto(`${base}/blog/`, { waitUntil: 'networkidle' });
  if (!blogResponse || blogResponse.status() !== 200) failures.push('blog index: not reachable');
  for (const slug of slugs) {
    const count = await page.locator(`a[href="/blog/${slug}/"]`).count();
    if (!count) failures.push(`blog index: missing article link ${slug}`);
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify({ articlePages: slugs.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
