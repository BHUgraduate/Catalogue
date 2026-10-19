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
    description: `${list.length} ${c.label.toLowerCase()} services from Hycyon with deliverables, exclusions, delivery windows and indicative INR pricing.`,
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

export const notFound = () =>
  page({
    title: 'Page not found — Hycyon Catalogue',
    description: 'This page does not exist in the Hycyon Catalogue. Head back to the catalogue home page.',
    path: '/404.html',
    noindex: true,
    depth: null,
    body: html`<div class="wrap page-pad"><h1 class="page-title">That page isn't here.</h1><p class="lede">It may have moved, or the link may be wrong.</p><p><a class="btn btn-primary" href="/">Back to the catalogue</a></p></div>`,
  });
