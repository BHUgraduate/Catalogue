import { html } from '../html.js';
import { services } from '../data/services.js';
import { categoryById } from '../data/categories.js';

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/** Recommendation panel for a goal; matched services come from the data. */
export const goalResult = (g, root = '') => {
  const matches = g.serviceIds.map((id) => bySlug[id]).filter(Boolean);
  const primary = matches[0];
  return html`
<div class="gr">
  <p class="gr-badge">${g.badge}</p>
  <h3 class="gr-title">${g.title}</h3>
  <p class="gr-meta"><span class="price">${g.priceEstimate}</span><span>${g.timeline}</span></p>
  <p class="gr-summary">${g.summary}</p>
  <ul class="gr-matches">
    ${matches.map((m) => html`<li><a href="${root}services/${m.slug}/" data-detail="${m.slug}"><span>${m.name}</span><span class="muted">${m.priceDisplay}</span></a></li>`)}
  </ul>
  <div class="cta-row">
    <a class="btn btn-primary btn-sm" href="${root}?service=${primary.slug}#quote" data-quote="${primary.slug}">Request a quote for this</a>
    <a class="btn btn-ghost btn-sm" href="${root}services/${g.category}/" data-filter-cat="${g.category}">Browse all ${categoryById[g.category].label}</a>
  </div>
</div>`;
};
