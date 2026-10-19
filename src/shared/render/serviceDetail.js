import { html } from '../html.js';
import { categoryById } from '../data/categories.js';
import { services } from '../data/services.js';

/** Nearest services in the same category (by price), then the same price band elsewhere. */
export const relatedServices = (s, count = 3) => {
  const mid = (x) => (x.minPrice + x.maxPrice) / 2;
  const others = services.filter((x) => x.slug !== s.slug);
  const same = others.filter((x) => x.category === s.category).sort((a, b) => Math.abs(mid(a) - mid(s)) - Math.abs(mid(b) - mid(s)));
  const rest = others.filter((x) => x.category !== s.category).sort((a, b) => Math.abs(mid(a) - mid(s)) - Math.abs(mid(b) - mid(s)));
  return [...same, ...rest].slice(0, count);
};

/** The full service detail body — used by the dialog (h2) and by the /services/<slug>/ pages (h1). */
export const serviceDetail = (s, root = '', { asPage = false } = {}) => {
  const hd = (t) => (asPage ? html`<h2>${t}</h2>` : html`<h3>${t}</h3>`);
  return html`
<div class="detail">
  <header class="detail-head">
    <span class="tag">${categoryById[s.category].label}</span>
    ${asPage ? html`<h1 class="detail-title" id="detail-title">${s.name}</h1>` : html`<h2 class="detail-title" id="detail-title">${s.name}</h2>`}
    <p class="detail-lede">${s.shortDesc}</p>
    <dl class="facts">
      <div><dt>Indicative price</dt><dd class="price">${s.priceDisplay}</dd></div>
      <div><dt>Typical delivery</dt><dd>${s.timeline}</dd></div>
      <div><dt>Platform</dt><dd>${s.platform}</dd></div>
    </dl>
  </header>
  <section class="detail-sec">${hd('Best for')}<p>${s.bestFor}</p></section>
  <div class="detail-cols">
    <section class="detail-sec">${hd('What you receive')}<ul class="ticks">${s.includes.map((i) => html`<li>${i}</li>`)}</ul></section>
    <section class="detail-sec">${hd('Not included')}<ul class="crosses">${s.notIncluded.map((i) => html`<li>${i}</li>`)}</ul></section>
  </div>
  <section class="detail-sec">${hd('Optional add-ons')}<ul class="chips">${s.addons.map((a) => html`<li>${a}</li>`)}</ul></section>
  <section class="detail-sec">
    ${hd('Related services')}
    <ul class="related">${relatedServices(s).map((r) => html`<li><a href="${root}services/${r.slug}/" data-detail="${r.slug}"><span>${r.name}</span><span class="muted">${r.priceDisplay}</span></a></li>`)}</ul>
  </section>
  <footer class="detail-foot">
    <p class="muted">Indicative range. Final scope and price are confirmed after we review your requirements.</p>
    <a class="btn btn-primary" href="${root}?service=${s.slug}#quote" data-quote="${s.slug}">Request this service</a>
  </footer>
</div>`
};
