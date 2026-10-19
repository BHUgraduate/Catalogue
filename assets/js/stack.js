import { $, $$, reducedMotion, rovingGroup, url } from './dom.js';
import { html, toString } from '../shared/html.js';
import { services } from '../shared/data/services.js';
import { scopeStack } from '../shared/data/scope-stack.js';
import { icons } from '../shared/render/icons.js';

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/** Hero visual. Selecting a layer "builds" the stack up to it and shows the matching real service. */
export function initStack() {
  const box = $('[data-stack]');
  if (!box) return;
  const layers = $$('.layer', box);
  const readout = $('[data-readout]', box);
  let auto = true, timer = 0;

  const show = (i) => {
    box.dataset.level = String(i);
    layers.forEach((l) => {
      const n = +l.dataset.level;
      l.classList.toggle('built', n <= i);
      l.setAttribute('aria-checked', String(n === i));
    });
    const s = bySlug[scopeStack[i].service];
    readout.innerHTML = toString(html`<span class="k">Typically</span><a class="stack-name" href="${url('services/' + s.slug + '/')}" data-detail="${s.slug}">${s.name}</a><span class="price">${s.priceDisplay}</span><span class="stack-time">${icons.clock}${s.timeline}</span>`);
  };
  const stop = () => { auto = false; clearInterval(timer); };

  rovingGroup($('.stack-layers', box), '.layer', (el) => { stop(); show(+el.dataset.level); });
  $('.stack-layers', box).addEventListener('pointerover', (e) => {
    const l = e.target.closest('.layer');
    if (l && e.pointerType === 'mouse') { stop(); show(+l.dataset.level); }
  });
  show(0);

  // A short guided demo once, so the idea is clear without interaction.
  if (!reducedMotion.matches) {
    let n = 0;
    const seq = [1, 2, 3, 2];
    setTimeout(() => {
      if (!auto) return;
      timer = setInterval(() => { if (!auto || n >= seq.length) return stop(); show(seq[n++]); }, 1300);
    }, 900);
  }
}
