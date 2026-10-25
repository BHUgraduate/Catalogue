// Static build: src/ → repository root (GitHub Pages serves the root of main). No dependencies.
// Generated paths are listed in OUTPUTS; everything else (src/, scripts/, CNAME, README) is left alone.
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { toString } from './src/shared/html.js';
import { site } from './src/shared/data/site.js';
import { services } from './src/shared/data/services.js';
import { categories } from './src/shared/data/categories.js';
import * as pages from './src/site/pages/pages.js';
import { lastmods } from './scripts/lastmod.mjs';

const ROOT = new URL('./', import.meta.url);
const SRC = new URL('./src/', import.meta.url);
const OUTPUTS = ['index.html', '404.html', 'services', 'privacy', 'terms', 'assets', 'sitemap.xml', 'robots.txt', 'manifest.webmanifest', 'favicon.ico', 'og-preview.png', '.nojekyll'];

const write = (path, data) => {
  const url = new URL(path, ROOT);
  mkdirSync(new URL('./', url), { recursive: true });
  writeFileSync(url, data);
};
const copy = (from, to) => cpSync(new URL(from, SRC), new URL(to, ROOT), { recursive: true });

for (const o of OUTPUTS) rmSync(new URL(o, ROOT), { recursive: true, force: true });

// Pages
// Indexable pages are recorded by canonical URL so the sitemap can date each one separately.
const rendered = {};
const writePage = (urlPath, file, html) => {
  rendered[`${site.url}${urlPath}`] = html;
  write(file, html);
};
writePage('/', 'index.html', toString(pages.home()));
writePage('/privacy/', 'privacy/index.html', toString(pages.privacy()));
writePage('/terms/', 'terms/index.html', toString(pages.terms()));
write('404.html', toString(pages.notFound()));
writePage('/services/', 'services/index.html', toString(pages.servicesIndex()));
for (const c of categories) writePage(`/services/${c.id}/`, `services/${c.id}/index.html`, toString(pages.categoryPage(c)));
for (const s of services) writePage(`/services/${s.slug}/`, `services/${s.slug}/index.html`, toString(pages.servicePage(s)));

// CSS bundle: tokens → base → components, comments stripped.
const css = ['tokens', 'base', 'components']
  .map((n) => readFileSync(new URL(`assets/css/${n}.css`, SRC), 'utf8'))
  .join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\n\s*\n/g, '\n');
write('assets/site.css', css);

// Browser modules import the same data and renderers the build uses.
copy('shared', 'assets/shared');
copy('client', 'assets/js');
copy('assets/fonts', 'assets/fonts');
copy('assets/img', 'assets/img');
copy('assets/img/favicon.ico', 'favicon.ico');
copy('assets/img/og-preview.png', 'og-preview.png');
rmSync(new URL('assets/img/og-preview.png', ROOT));

// Crawlers, manifest, hosting
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
const dates = lastmods(rendered, new URL('sitemap-lastmod.json', ROOT), site.updated);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.entries(dates).map(([loc, d]) => `  <url><loc>${loc}</loc><lastmod>${d}</lastmod></url>`).join('\n')}\n</urlset>\n`);
write('manifest.webmanifest', JSON.stringify({ name: 'Hycyon Catalogue', short_name: 'Catalogue', description: site.description, start_url: './', display: 'browser', background_color: '#f5f3ee', theme_color: '#f5f3ee', icons: [{ src: 'assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }] }));
write('.nojekyll', '');
if (!existsSync(new URL('CNAME', ROOT))) write('CNAME', 'catalogue.hycyon.com\n');
console.log(`Built ${5 + categories.length + services.length} pages.`);
