import { readFileSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { html, raw } from '../shared/html.js';
import { site, links, nav } from '../shared/data/site.js';
import { categories } from '../shared/data/categories.js';
import { icons } from '../shared/render/icons.js';

export const mark = readFileSync(new URL('../assets/brand/hycyon-mark.svg', import.meta.url), 'utf8')
  .replace(/<svg[^>]*>/, '').replace('</svg>', '').trim();
const markSvg = html`<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true" fill="none">${raw(mark)}</svg>`;

// Runs before paint so the stored or system theme never flashes.
const themeInit = `try{var t=localStorage.getItem('hycyon-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add('js')`;

/** Every browser module reachable from main.js, as paths under assets/ — preloaded so the import chain loads in parallel. */
const srcDir = fileURLToPath(new URL('../', import.meta.url));
const moduleGraph = (() => {
  const seen = new Set();
  const visit = (file) => {
    if (seen.has(file)) return;
    seen.add(file);
    for (const m of readFileSync(file, 'utf8').matchAll(/from '(\.[^']+)'/g)) visit(resolve(dirname(file), m[1]));
  };
  visit(resolve(srcDir, 'client/main.js'));
  return [...seen].map((f) => relative(srcDir, f).replace(/^client\//, 'js/').replace(/^shared\//, 'shared/'));
})();

/** `u` turns a site-root path into a URL relative to the current page. */
const header = (u, home) => html`
<header class="site-header" data-header>
  <div class="wrap bar">
    <a class="brand" href="${u('./')}" aria-label="Hycyon Catalogue — home">${markSvg}<span class="brand-name">Hycyon</span><span class="brand-sub">Services</span></a>
    <nav class="nav" id="site-nav" aria-label="Primary">
      <ul class="nav-links">
        ${nav.map((n) => html`<li><a href="${home ? n.href : u('./') + n.href}" data-nav="${n.href.slice(1)}">${n.label}</a></li>`)}
      </ul>
      <div class="nav-actions">
        <a class="nav-parent" href="${links.hycyon}">Hycyon ${icons.ext_link}</a>
        <a class="btn btn-primary btn-sm" href="${u('./')}#quote" data-cta>Start a Project</a>
      </div>
    </nav>
    <div class="header-tools">
      <button class="icon-btn theme-btn" type="button" aria-label="Switch colour theme"><span class="sun">${icons.sun}</span><span class="moon">${icons.moon}</span></button>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav"><span class="menu-label">Menu</span><span class="menu-lines" aria-hidden="true"><i></i><i></i></span></button>
    </div>
  </div>
</header>`;

const footer = (u) => html`
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${links.hycyon}">${markSvg}<span class="brand-name">Hycyon</span></a>
        <p>Technology · Products · Software</p>
        <a class="btn btn-primary btn-sm" href="${u('./')}#quote">Start a Project</a>
      </div>
      <div><h2>Services</h2><ul>
        ${['websites', 'web-apps', 'mobile', 'ai', 'extensions', 'custom'].map((id) => {
          const c = categories.find((x) => x.id === id);
          return html`<li><a href="${u('services/' + id + '/')}">${c.label}</a></li>`;
        })}
      </ul></div>
      <div><h2>Explore</h2><ul>
        <li><a href="${links.hycyon}">Hycyon</a></li>
        <li><a href="${links.hycyon}#products">Products</a></li>
        <li><a href="${links.hycyon}#lab">Lab</a></li>
        <li><a href="${links.portfolio}">Portfolio</a></li>
        <li><a href="${links.ebookProSite}">eBook Pro</a></li>
        <li><a href="${links.brainSpark}">BrainSpark</a></li>
      </ul></div>
      <div><h2>Contact</h2><ul>
        <li><a href="mailto:${site.email}">${site.email}</a></li>
        <li><a href="${u('./')}#faq">FAQ</a></li>
      </ul></div>
    </div>
    <div class="legal">
      <span>© ${new Date().getFullYear()} Hycyon · All prices in Indian Rupees (INR) and indicative</span>
      <a href="${links.hycyon}">hycyon.com</a>
    </div>
  </div>
</footer>`;

/**
 * Full HTML document. `depth` = folders below the site root, so asset and page URLs are relative and the
 * site works at catalogue.hycyon.com and at any sub-path. `depth: null` (404) uses root-absolute URLs.
 */
export const page = ({ title, description, path, body, jsonLd = [], noindex = false, depth = 0, home = false, stickyCta = false }) => {
  const base = depth === null ? '/' : '../'.repeat(depth) || './';
  const u = (p) => base + p.replace(/^\.?\//, '');
  const root = depth === null ? '/' : base;
  const ld = jsonLd.length ? { '@context': 'https://schema.org', '@graph': jsonLd } : null;
  return html`<!doctype html>
<html lang="en" data-root="${root}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${site.url}${path}">
${noindex ? html`<meta name="robots" content="noindex">` : ''}
<meta name="theme-color" content="#f5f3ee" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b0e12" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hycyon Catalogue">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${site.url}${path}">
<meta property="og:image" content="${site.url}/og-preview.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Hycyon — Software Services Catalogue">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${site.url}/og-preview.png">
<!-- Icons are root-absolute: the browser re-resolves them when the drawer pushes /services/<slug>/ -->
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="${u('assets/fonts/Fraunces.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${u('assets/fonts/Inter.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${u('assets/site.css')}">
<script>${raw(themeInit)}</script>
${ld ? html`<script type="application/ld+json">${raw(JSON.stringify(ld))}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(u, home)}
<main id="main">${body}</main>
${footer(u)}
${stickyCta ? html`<div class="sticky-cta" data-sticky-cta hidden><a class="btn btn-primary" href="#quote">Start a Project</a></div>` : ''}
<dialog class="sheet" id="detail-dialog" aria-labelledby="detail-title"><div class="sheet-inner"><button class="sheet-close icon-btn" type="button" aria-label="Close" data-close>${icons.close}</button><div id="detail-body"></div></div></dialog>
${moduleGraph.map((m) => html`<link rel="modulepreload" href="${u('assets/' + m)}">`)}
<script type="module" src="${u('assets/js/main.js')}"></script>
</body>
</html>`;
};
