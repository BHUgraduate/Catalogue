import { html } from '../../shared/html.js';
import { services } from '../../shared/data/services.js';
import { categories } from '../../shared/data/categories.js';
import { goals } from '../../shared/data/goals.js';
import { tiers } from '../../shared/data/tiers.js';
import { serviceCard } from '../../shared/render/serviceCard.js';
import { goalResult } from '../../shared/render/goalResult.js';
import { icons } from '../../shared/render/icons.js';
import { head } from './ui.js';

const starter = services.find((s) => s.slug === 'starter-website');

export const starterSpotlight = () => html`
<section class="section starter" id="starter" aria-labelledby="starter-title">
  <div class="wrap starter-grid">
    <div class="reveal">
      <p class="eyebrow">Accessible entry point</p>
      <h2 id="starter-title">Starter Website</h2>
      <p class="price price-xl">${starter.priceDisplay}</p>
      <p class="lede">Intentionally scoped, not cheap. One to three clean, mobile-responsive pages, built properly and live in ${starter.timeline}.</p>
      <p class="for"><span class="k">For</span>Students · Freelancers · Local businesses · Simple personal or business presence</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="?service=${starter.slug}#quote" data-quote="${starter.slug}">Request a quote</a>
        <a class="btn btn-ghost" href="services/${starter.slug}/" data-detail="${starter.slug}">View full details</a>
      </div>
    </div>
    <div class="starter-lists reveal">
      <div><h3>Includes</h3><ul class="ticks">${starter.includes.map((i) => html`<li>${i}</li>`)}</ul></div>
      <div><h3>Does not include</h3><ul class="crosses">${starter.notIncluded.map((i) => html`<li>${i}</li>`)}</ul></div>
    </div>
  </div>
</section>`;

export const goalSelector = () => html`
<section class="section alt" id="guide" aria-labelledby="guide-title">
  <div class="wrap">
    ${head({ eyebrow: 'Project guide', title: 'What are you trying to build?', id: 'guide-title', intro: "Choose what sounds closest. We'll match services and a realistic range — no technical vocabulary needed." })}
    <div class="goals" data-goals>
      <div class="goal-list" role="radiogroup" aria-label="What are you trying to build?">
        ${goals.map((g, i) => html`<button class="goal" type="button" role="radio" aria-checked="${i === 0 ? 'true' : 'false'}" data-goal="${g.key}"><strong>${g.question}</strong><small>${g.hint}</small></button>`)}
      </div>
      <div class="goal-result" id="goal-result" aria-live="polite" tabindex="-1">${goalResult(goals[0])}</div>
    </div>
  </div>
</section>`;

export const explorer = () => html`
<section class="section" id="services" aria-labelledby="services-title">
  <div class="wrap">
    ${head({ eyebrow: 'Service explorer', title: 'Everything we build, with scope and price.', id: 'services-title', intro: 'Every service lists what you receive, what is not included, and a typical delivery window. Prices are indicative INR ranges.' })}
    <div class="explorer" data-explorer>
      <div class="ex-bar">
        <label class="search"><span class="sr-only">Search services</span>${icons.search}<input type="search" id="svc-search" name="q" placeholder="Search services…" autocomplete="off" spellcheck="false"></label>
        <button class="btn btn-ghost btn-sm ex-filter-btn" type="button" aria-expanded="false" aria-controls="filters">${icons.filter}<span>Filters</span><span class="badge" data-filter-badge hidden></span></button>
        <p class="count" aria-live="polite"><strong data-count>${services.length}</strong> <span data-count-label>of ${services.length} services</span></p>
      </div>
      <div class="filters" id="filters" role="group" aria-label="Filters">
        <div class="filters-head"><h3>Filters</h3><button class="icon-btn" type="button" data-close-filters aria-label="Close filters">${icons.close}</button></div>
        <fieldset class="f-group"><legend>Category</legend>
          <div class="chip-row">
            <button type="button" class="chip-btn" data-cat="all" aria-pressed="true">All <span class="n" data-n="all">${services.length}</span></button>
            ${categories.map((c) => html`<button type="button" class="chip-btn" data-cat="${c.id}" aria-pressed="false">${c.label} <span class="n" data-n="${c.id}">${services.filter((s) => s.category === c.id).length}</span></button>`)}
          </div>
        </fieldset>
        <div class="f-row">
          <div class="f-group"><label for="budget">Budget</label>
            <select id="budget" name="budget"><option value="all">All budgets</option>${tiers.map((t) => html`<option value="${t.key}">${t.name} · ${t.range}</option>`)}</select></div>
          <div class="f-group"><label for="sort">Sort by</label>
            <select id="sort" name="sort"><option value="recommended">Recommended</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name A–Z</option></select></div>
        </div>
        <div class="f-actions"><button type="button" class="link-arrow" data-reset>Reset filters</button><button type="button" class="btn btn-primary btn-sm" data-close-filters data-apply>Show services</button></div>
      </div>
      <div class="svc-grid" id="svc-grid">${services.map((s) => serviceCard(s, '', { compact: true }))}</div>
      <div class="empty" data-empty hidden>
        <h3>No services match this combination.</h3>
        <p>Try a wider budget or a different search.</p>
        <div class="cta-row"><button type="button" class="btn btn-primary btn-sm" data-reset>Reset filters</button><a class="btn btn-ghost btn-sm" href="#guide">Not sure what you need? Try the project guide</a></div>
      </div>
    </div>
  </div>
</section>`;
