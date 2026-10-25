import { html } from '../../shared/html.js';
import { site } from '../../shared/data/site.js';
import { services } from '../../shared/data/services.js';
import { categories } from '../../shared/data/categories.js';
import { serviceDetail } from '../../shared/render/serviceDetail.js';
import { serviceCard } from '../../shared/render/serviceCard.js';
import { page } from '../layout.js';
import { homeLd, servicePageLd, listPageLd } from '../seo.js';
import { hero } from '../components/hero.js';
import { starterSpotlight, goalSelector, explorer } from '../components/explore.js';
import { packages, compare, addonsSection, transparencySection } from '../components/plan.js';
import { projectsSection, hycyonConnection, processSection, faqSection } from '../components/proof.js';
import { quoteSection } from '../components/quote.js';

export const home = () =>
  page({
    title: site.title,
    description: site.description,
    path: '/',
    home: true,
    stickyCta: true,
    jsonLd: homeLd(),
    body: html`${hero()}${starterSpotlight()}${goalSelector()}${explorer()}${packages()}${compare()}${addonsSection()}${transparencySection()}${projectsSection()}${hycyonConnection()}${processSection()}${faqSection()}${quoteSection()}`,
  });

const crumbs = (items) => html`<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([label, href], i) => html`<li>${href ? html`<a href="${href}">${label}</a>` : html`<span aria-current="page">${label}</span>`}</li>`)}</ol></nav>`;

export const servicePage = (s) =>
  page({
    title: `${s.name} — ${s.priceDisplay} | Hycyon Catalogue`,
    description: `${s.shortDesc} Indicative ${s.priceDisplay}, typically ${s.timeline}.`.slice(0, 200),
    path: `/services/${s.slug}/`,
    depth: 2,
    jsonLd: servicePageLd(s),
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../../'], ['Services', '../'], [s.name]])}<div class="detail-page">${serviceDetail(s, '../../', { asPage: true })}</div></div>`,
  });

const grid = (list) => html`<div class="svc-grid">${list.map((s) => serviceCard(s, '../../', { level: 2 }))}</div>`;

export const categoryPage = (c) => {
  const list = services.filter((s) => s.category === c.id);
  return page({
    title: `${c.label} — Services & Pricing | Hycyon Catalogue`,
    description: `${list.length === 1 ? 'One service' : `${list.length} services`} in ${c.label} from Hycyon, with deliverables, exclusions, delivery times and indicative INR pricing.`,
    path: `/services/${c.id}/`,
    depth: 2,
    jsonLd: listPageLd(c.label, `/services/${c.id}/`),
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../../'], ['Services', '../'], [c.label]])}
      <h1 class="page-title">${c.label}</h1><p class="lede">${c.strip}.</p>${grid(list)}
      <p class="page-foot"><a class="link-arrow" href="../../#services">Explore all services</a></p></div>`,
  });
};

export const servicesIndex = () =>
  page({
    title: 'All Services — Hycyon Catalogue',
    description: 'Every Hycyon software service in one place: websites, web apps, mobile apps, AI, extensions, backend and custom software, with indicative INR pricing.',
    path: '/services/',
    depth: 1,
    jsonLd: listPageLd('Services', '/services/'),
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../'], ['Services']])}
      <h1 class="page-title">All services</h1>
      ${categories.map((c) => html`<section class="cat-block"><h2><a href="${c.id}/">${c.label}</a></h2><ul class="related">${services.filter((s) => s.category === c.id).map((s) => html`<li><a href="${s.slug}/"><span>${s.name}</span><span class="muted">${s.priceDisplay}</span></a></li>`)}</ul></section>`)}</div>`,
  });

export const privacy = () =>
  page({
    title: 'Privacy — Hycyon Catalogue',
    description: 'What the Hycyon Catalogue collects when you request a quote, where it goes, and what it is used for.',
    path: '/privacy/',
    depth: 1,
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../'], ['Privacy']])}
      <article class="prose">
      <h1 class="page-title">Privacy</h1>
      <p>Last updated ${site.updated}.</p>
      <h2>This website</h2>
      <p>The catalogue does not use analytics, advertising trackers or cookies. Fonts are served from this site, not a third party. Your browser may store one preference in local storage — whether you chose the light or dark theme. It never leaves your device.</p>
      <h2>The quote form</h2>
      <p>When you send a project request we receive what you type: your name, email address, any optional phone, business and reference details, the service and budget you chose, and your description of the project. It is sent over HTTPS to a small form service hosted on Netlify, which passes it to a private Hycyon channel on Discord.</p>
      <p>We use it only to reply to you with a scope and quotation. We do not sell or share it. If sending fails, your email app opens with the request written out instead, and it is then handled as ordinary email.</p>
      <h2>Quotes are not contracts</h2>
      <p>Prices on this site are indicative ranges. Nothing is binding until a firm quotation follows scope review.</p>
      <h2>Questions or deletion requests</h2>
      <p>Write to <a href="mailto:${site.email}">${site.email}</a> and we will delete your request on request.</p>
      </article></div>`,
  });

export const notFound = () =>
  page({
    title: 'Page not found — Hycyon Catalogue',
    description: 'This page does not exist in the Hycyon Catalogue. Head back to the catalogue home page.',
    path: '/404.html',
    noindex: true,
    depth: null,
    body: html`<div class="wrap page-pad"><h1 class="page-title">That page isn't here.</h1><p class="lede">It may have moved, or the link may be wrong.</p><p><a class="btn btn-primary" href="/">Back to the catalogue</a></p></div>`,
  });
