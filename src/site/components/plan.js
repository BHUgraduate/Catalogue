import { html } from '../../shared/html.js';
import { services } from '../../shared/data/services.js';
import { tiers } from '../../shared/data/tiers.js';
import { comparison } from '../../shared/data/comparison.js';
import { addons } from '../../shared/data/addons.js';
import { transparency, pricingFactors } from '../../shared/data/transparency.js';
import { overlaps } from '../../shared/format.js';
import { head } from './ui.js';

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
const inTier = (t) => services.filter((s) => overlaps(s, t));

const tierPanel = (t, i) => {
  const matches = inTier(t);
  return html`
<div class="tier-panel" role="tabpanel" id="tier-panel-${t.key}" aria-labelledby="tier-tab-${t.key}" data-tier-panel="${t.key}">
  <div class="tier-main">
    <p class="k">Scope level ${i + 1} of ${tiers.length}</p>
    <h3 class="tier-title">${t.title}</h3>
    <p class="price price-xl">${t.range}</p>
    <p class="lede">${t.summary}</p>
    <div class="cta-row">
      <a class="btn btn-primary btn-sm" href="#services" data-filter-budget="${t.key}">See ${matches.length} services in this range</a>
      <a class="btn btn-ghost btn-sm" href="#quote" data-cta>Start a Project</a>
    </div>
  </div>
  <div class="tier-side">
    <div><h4>What is realistically possible</h4>
      <ul class="related">${matches.slice(0, 6).map((m) => html`<li><a href="services/${m.slug}/" data-detail="${m.slug}"><span>${m.name}</span><span class="muted">${m.priceDisplay}</span></a></li>`)}</ul>
      ${matches.length > 6 ? html`<p class="muted small">+ ${matches.length - 6} more in the explorer</p>` : ''}
    </div>
    <div><h4>Likely architecture</h4><p>${t.architecture}</p></div>
    <div><h4>Limitations</h4><p>${t.limits}</p></div>
  </div>
</div>`;
};

export const packages = () => html`
<section class="section alt" id="packages" aria-labelledby="packages-title">
  <div class="wrap">
    ${head({ eyebrow: 'Packages by budget', title: 'What can I build with my budget?', id: 'packages-title', intro: "Pricing here is a ladder of engineering scope. Pick a level to see what's realistic, what isn't, and how it's likely to be built." })}
    <div class="tiers" data-tiers>
      <div class="tier-tabs" role="tablist" aria-label="Scope levels by budget">
        ${tiers.map((t, i) => html`<button class="tier" type="button" role="tab" id="tier-tab-${t.key}" aria-controls="tier-panel-${t.key}" aria-selected="${i === 0 ? 'true' : 'false'}" data-tier="${t.key}" style="--lvl:${i + 1}"><span class="tier-bar" aria-hidden="true"></span><span class="tier-name">${t.name}</span><span class="tier-range">${t.range}</span></button>`)}
      </div>
      <div class="tier-panels">${tiers.map(tierPanel)}</div>
    </div>
    <div class="pricing-note reveal">
      <div>
        <h3>Prices are indicative</h3>
        <p>Final pricing depends on what we confirm together. We never imply a fixed price where it isn't fixed.</p>
        <ul class="chips">${pricingFactors.map((f) => html`<li>${f}</li>`)}</ul>
      </div>
      <div class="guide-pair">
        <div><h4>Website or web app?</h4><p>A website mainly presents information. A web application lets people do active work: create accounts, save information, use dashboards and process transactions.</p></div>
        <div><h4>Why isn't every app ₹20,000?</h4><p>An application with just five screens can still need complex authentication, secure database design, third-party APIs and push notifications. The number of screens alone doesn't decide the engineering effort.</p></div>
      </div>
    </div>
  </div>
</section>`;

const cell = (v) => {
  const dim = /^(None|Not included)$/i.test(v);
  return html`<td class="${dim ? 'dim' : ''}">${v}</td>`;
};

export const compare = () => html`
<section class="section" id="compare" aria-labelledby="compare-title">
  <div class="wrap">
    ${head({ eyebrow: 'Compare', title: 'Website packages, side by side.', id: 'compare-title', intro: 'Page allowances, backend capability and styling level — so you can choose the milestone that fits.' })}
    <div class="compare-tools reveal">
      <label class="switch"><input type="checkbox" data-diff-only><span class="switch-ui" aria-hidden="true"></span><span>Show only differences</span></label>
    </div>
    <div class="table-wrap reveal" tabindex="0" role="region" aria-label="Package comparison table, scrolls sideways on small screens">
      <table class="compare">
        <caption class="sr-only">Starter, Basic, Business and Premium website packages compared</caption>
        <thead><tr><th scope="col"><span class="sr-only">Feature</span></th>
          ${comparison.columns.map((c) => html`<th scope="col"><span class="col-name">${c.label}</span><a class="col-link" href="services/${c.slug}/" data-detail="${c.slug}">Details</a></th>`)}</tr></thead>
        <tbody>
          <tr class="price-row"><th scope="row">Indicative price</th>${comparison.columns.map((c) => html`<td class="price">${bySlug[c.slug].priceDisplay}</td>`)}</tr>
          ${comparison.rows.map((r) => html`<tr data-same="${new Set(r.values).size === 1 ? 'true' : 'false'}"><th scope="row">${r.label}</th>${r.values.map(cell)}</tr>`)}
        </tbody>
      </table>
    </div>
    <p class="note reveal">${comparison.note}</p>
  </div>
</section>`;

export const addonsSection = () => html`
<section class="section alt" id="addons" aria-labelledby="addons-title">
  <div class="wrap">
    ${head({ eyebrow: 'Add-ons', title: 'Start with a foundation. Add what your product needs.', id: 'addons-title', intro: 'Any service can be extended with modular capabilities. Add-on prices vary with architecture and are quoted transparently. Select the ones you want and they go into your quote request.' })}
    <div class="modules" data-addons>
      <ul class="module-grid">
        ${addons.map((a, i) => html`<li><button class="module" type="button" aria-pressed="false" data-addon="${a.name}"><span class="module-tag">${a.tag}</span><strong>${a.name}</strong><small>${a.text}</small><span class="module-state" aria-hidden="true"></span></button></li>`)}
      </ul>
      <div class="foundation"><span class="k">Foundation</span><strong>Any Hycyon service</strong><span class="found-note" data-addon-note aria-live="polite">No add-ons selected</span><a class="link-arrow" href="#quote" data-cta>Continue to quote</a></div>
    </div>
  </div>
</section>`;

export const transparencySection = () => html`
<section class="section" id="transparency" aria-labelledby="transparency-title">
  <div class="wrap">
    ${head({ eyebrow: 'Transparency', title: 'You know what you are buying before we write a line of code.', id: 'transparency-title' })}
    <div class="pillars">${transparency.map((t) => html`<div class="pillar reveal"><h3>${t.title}</h3><p>${t.text}</p></div>`)}</div>
  </div>
</section>`;
