import { $, $$, rovingGroup } from './dom.js';
import { toString } from '../shared/html.js';
import { goals } from '../shared/data/goals.js';
import { goalResult } from '../shared/render/goalResult.js';

export function initGoals() {
  const box = $('[data-goals]');
  if (!box) return;
  const out = $('#goal-result');
  rovingGroup($('.goal-list', box), '.goal', (el) => {
    $$('.goal', box).forEach((g) => g.setAttribute('aria-checked', String(g === el)));
    const g = goals.find((x) => x.key === el.dataset.goal);
    out.classList.remove('swap'); void out.offsetWidth;
    out.innerHTML = toString(goalResult(g, ''));
    out.classList.add('swap');
  });
}
