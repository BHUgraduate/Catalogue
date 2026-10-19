import { html } from '../html.js';
import { categoryById } from '../data/categories.js';
import { icons } from './icons.js';

/** Lower-cased text the explorer searches. Kept in a data attribute so filtering needs no re-render. */
export const searchText = (s) =>
  [s.name, s.shortDesc, s.bestFor, categoryById[s.category].label, ...s.includes].join(' ').toLowerCase();

/** `root` is the relative path back to the site root ('' on the home page). */
export const serviceCard = (s, root = '', { level = 3 } = {}) => {
  const name = html`<a href="${root}services/${s.slug}/" data-detail="${s.slug}">${s.name}</a>`;
  const title = level === 2 ? html`<h2 class="svc-name">${name}</h2>` : html`<h3 class="svc-name">${name}</h3>`;
  return html`
<article class="svc" data-slug="${s.slug}" data-cat="${s.category}" data-min="${s.minPrice}" data-max="${s.maxPrice}" data-name="${s.name.toLowerCase()}" data-search="${searchText(s)}">
  <div class="svc-top">
    <span class="tag">${categoryById[s.category].label}</span>
    <span class="svc-time">${icons.clock}${s.timeline}</span>
  </div>
  ${title}
  <p class="price" aria-label="Indicative price">${s.priceDisplay}</p>
  <p class="svc-desc">${s.shortDesc}</p>
  <p class="svc-best"><span class="k">Best for</span>${s.bestFor}</p>
  <div class="svc-block">
    <span class="k">You get</span>
    <ul class="ticks">${s.includes.slice(0, 3).map((i) => html`<li>${i}</li>`)}</ul>
  </div>
  <p class="svc-excl"><span class="k">Not included</span>${s.notIncluded[0]}</p>
  <div class="svc-actions">
    <a class="btn btn-ghost btn-sm" href="${root}services/${s.slug}/" data-detail="${s.slug}">View details</a>
    <a class="link-arrow" href="${root}?service=${s.slug}#quote" data-quote="${s.slug}">Request quote</a>
  </div>
</article>`
};
