import { html } from '../../shared/html.js';
import { services } from '../../shared/data/services.js';
import { scopeStack } from '../../shared/data/scope-stack.js';
import { categories, stripIds } from '../../shared/data/categories.js';
import { icons } from '../../shared/render/icons.js';

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/** Hero visual: a stack of engineering layers. Choosing a level "builds" up to it and shows the matching service. */
const scopeVisual = () => html`
<div class="stack" data-stack aria-labelledby="stack-title">
  <p class="stack-title" id="stack-title">How scope grows</p>
  <div class="stack-layers" role="radiogroup" aria-label="Scope level">
    ${[...scopeStack].reverse().map((l, ri) => {
      const i = scopeStack.length - 1 - ri;
      return html`<button class="layer" type="button" role="radio" aria-checked="${i === 0 ? 'true' : 'false'}" data-level="${i}" style="--i:${i}">
        <span class="layer-n">0${i + 1}</span>
        <span class="layer-main"><strong>${l.adds}</strong><small>${l.note}</small></span>
      </button>`;
    })}
  </div>
  <div class="stack-readout" aria-live="polite" data-readout>
    ${(() => {
      const s = bySlug[scopeStack[0].service];
      return html`<span class="k">Typically</span><a class="stack-name" href="services/${s.slug}/" data-detail="${s.slug}">${s.name}</a><span class="price">${s.priceDisplay}</span><span class="stack-time">${icons.clock}${s.timeline}</span>`;
    })()}
  </div>
</div>`;

export const hero = () => html`
<section class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div class="hero-copy reveal">
      <p class="hero-kicker">Hycyon Catalogue · Let's build yours.</p>
      <h1 id="hero-title">Software built around what you <em>actually</em> need.</h1>
      <p class="hero-lede">Websites, applications, mobile apps, AI systems and custom software — designed, engineered and shipped around your actual requirements.</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#services">Explore Services</a>
        <a class="btn btn-ghost" href="#quote" data-cta>Start a Project</a>
      </div>
      <p class="hero-proof"><span>Transparent scope.</span> <span>Practical pricing.</span> <span>Real software.</span></p>
    </div>
    <div class="reveal">${scopeVisual()}</div>
  </div>
</section>
<section class="strip" aria-labelledby="strip-title">
  <div class="wrap">
    <h2 class="sr-only" id="strip-title">What Hycyon builds</h2>
    <ul class="strip-grid">
      ${stripIds.map((id) => {
        const c = categories.find((x) => x.id === id);
        return html`<li><a href="services/${c.id}/" data-filter-cat="${c.id}"><span class="strip-ico">${icons[c.icon]}</span><span class="strip-text"><strong>${c.label}</strong><small>${c.strip}</small></span></a></li>`;
      })}
    </ul>
  </div>
</section>`;
