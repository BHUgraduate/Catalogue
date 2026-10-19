// QA for the generated site (run `npm run build` first). Exits non-zero on any failure.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { services } from '../src/shared/data/services.js';
import { categories } from '../src/shared/data/categories.js';
import { goals } from '../src/shared/data/goals.js';
import { tiers } from '../src/shared/data/tiers.js';
import { comparison } from '../src/shared/data/comparison.js';
import { projects } from '../src/shared/data/projects.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
const fail = (m) => errors.push(m);

// 1. Data integrity
const slugs = new Set(services.map((s) => s.slug));
if (slugs.size !== services.length) fail('duplicate service slugs');
const catIds = new Set(categories.map((c) => c.id));
for (const s of services) {
  if (!catIds.has(s.category)) fail(`${s.slug}: unknown category ${s.category}`);
  if (!(s.minPrice > 0 && s.maxPrice >= s.minPrice)) fail(`${s.slug}: invalid price range`);
  if (!s.priceDisplay.includes('₹')) fail(`${s.slug}: priceDisplay must be in INR`);
  if (!s.includes.length || !s.notIncluded.length) fail(`${s.slug}: needs deliverables and exclusions`);
}
for (const g of goals) for (const id of g.serviceIds) if (!slugs.has(id)) fail(`goal ${g.key}: unknown service ${id}`);
for (const c of comparison.columns) if (!slugs.has(c.slug)) fail(`comparison: unknown service ${c.slug}`);
for (const r of comparison.rows) if (r.values.length !== comparison.columns.length) fail(`comparison row "${r.label}" has wrong column count`);
for (const t of tiers) if (!services.some((s) => s.minPrice <= t.max && s.maxPrice >= t.min)) fail(`tier ${t.key} matches no services`);
for (const p of projects) for (const l of p.links) if (!l.href.startsWith('https://')) fail(`project ${p.slug}: link must be https`);

// 2. Pages
const pages = ['index.html', '404.html', 'services/index.html', ...categories.map((c) => `services/${c.id}/index.html`), ...services.map((s) => `services/${s.slug}/index.html`)];
const ids = (h) => new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const f of pages) {
  if (!existsSync(join(root, f))) { fail(`missing page ${f}`); continue; }
  const h = readFileSync(join(root, f), 'utf8');
  const need = (c, m) => c || fail(`${f}: ${m}`);
  const title = h.match(/<title>([^<]+)/)?.[1] ?? '';
  need(title.length > 10 && title.length <= 75, `title length ${title.length}`);
  const desc = h.match(/name="description" content="([^"]*)/)?.[1] ?? '';
  need(desc.length >= 30 && desc.length <= 205, `description length ${desc.length}`);
  need(/rel="canonical" href="https:\/\/catalogue\.hycyon\.com/.test(h), 'canonical must be catalogue.hycyon.com');
  need(!/portfolio\.hycyon\.com\/"? ?(rel|>)/.test(h.match(/rel="canonical"[^>]*/)?.[0] ?? ''), 'canonical points at portfolio');
  for (const t of ['og:title', 'og:description', 'og:image', 'og:url']) need(h.includes(`property="${t}"`), `${t} missing`);
  need(h.includes('twitter:card'), 'twitter card missing');
  need((h.match(/<h1[\s>]/g) ?? []).length === 1, 'must have exactly one h1');
  need(/<html lang="en"/.test(h), 'lang missing');
  if (/<img\b(?![^>]*\balt=)[^>]*>/.test(h)) fail(`${f}: img without alt`);
  let last = 0;
  for (const m of h.matchAll(/<h([1-6])[\s>]/g)) { const n = +m[1]; if (last && n > last + 1) fail(`${f}: heading jumps h${last}→h${n}`); last = n; }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { fail(`${f}: invalid JSON-LD`); } }
  const own = ids(h);
  const dup = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]).filter((x, i, a) => a.indexOf(x) !== i);
  if (dup.length) fail(`${f}: duplicate ids ${[...new Set(dup)].join(', ')}`);
  for (const m of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    const [path, rest] = href.split('#'); const hash = rest?.split('?')[0];
    const pathOnly = path.split('?')[0];
    if (!pathOnly && hash && !own.has(hash)) fail(`${f}: dead anchor #${hash}`);
    if (!pathOnly) continue;
    const abs = pathOnly.startsWith('/') ? join(root, pathOnly) : resolve(dirname(join(root, f)), pathOnly);
    const target = pathOnly.endsWith('/') ? join(abs, 'index.html') : abs;
    if (!existsSync(target)) fail(`${f}: dead link ${href}`);
    else if (hash && target.endsWith('.html') && !ids(readFileSync(target, 'utf8')).has(hash)) fail(`${f}: dead anchor ${href}`);
  }
  // Nothing may point the catalogue's identity at another site.
  if (/\/\/portfolio\.hycyon\.com\/#(person|service|website)/.test(h)) fail(`${f}: stale portfolio structured-data ids`);
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
for (const u of ['/', '/services/', ...services.map((s) => `/services/${s.slug}/`)]) if (!sitemap.includes(`<loc>https://catalogue.hycyon.com${u}</loc>`)) fail(`sitemap missing ${u}`);
if (sitemap.includes('portfolio.hycyon.com')) fail('sitemap still lists portfolio.hycyon.com');
for (const f of ['robots.txt', 'manifest.webmanifest', 'CNAME', 'favicon.ico', 'og-preview.png', 'assets/site.css', 'assets/js/main.js']) if (!existsSync(join(root, f))) fail(`missing ${f}`);
if (statSync(join(root, 'favicon.ico')).size > 20000) fail('favicon.ico is oversized');
if (statSync(join(root, 'og-preview.png')).size > 400000) fail('og-preview.png is oversized');
if (readFileSync(join(root, 'CNAME'), 'utf8').trim() !== 'catalogue.hycyon.com') fail('CNAME must be catalogue.hycyon.com');

// 3. Honesty + secrets scan
const banned = [/trusted by/i, /testimonial/i, /award[- ]winning/i, /industry[- ]leading/i, /\bbest\b.{0,20}\bin (the )?(world|india|class)/i, /#1\b/];
const secret = /(AIza[0-9A-Za-z_-]{20,}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY)/;
const walk = (d) => readdirSync(d).flatMap((n) => (['node_modules', '.git', 'assets', 'services'].includes(n) && d === root.replace(/\/$/, '') && n !== 'assets' ? [] : n === 'node_modules' || n === '.git' ? [] : statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
for (const f of walk(root.replace(/\/$/, ''))) {
  if (!/\.(js|mjs|css|md|json|yml|svg|html|xml|webmanifest)$/.test(f) || f.endsWith('check.mjs')) continue;
  const t = readFileSync(f, 'utf8');
  if (secret.test(t)) fail(`possible secret in ${f.replace(root, '')}`);
  if (f.includes('/src/') && !f.endsWith('.css')) for (const re of banned) if (re.test(t)) fail(`unverifiable claim /${re.source}/ in ${f.replace(root, '')}`);
}

if (errors.length) { console.error(errors.map((e) => '✗ ' + e).join('\n')); process.exit(1); }
console.log(`All checks passed (${pages.length} pages, ${services.length} services).`);
