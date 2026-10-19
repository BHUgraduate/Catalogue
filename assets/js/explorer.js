import { $, $$, reducedMotion, trapFocus } from './dom.js';
import { tiers } from '../shared/data/tiers.js';
import { categories } from '../shared/data/categories.js';
import { overlaps } from '../shared/format.js';

const tierByKey = Object.fromEntries(tiers.map((t) => [t.key, t]));
const catIds = new Set(categories.map((c) => c.id));
const SORTS = ['recommended', 'price-asc', 'price-desc', 'name'];

/** Service explorer: search + category + budget + sort over the pre-rendered cards. State lives in the URL. */
export function initExplorer() {
  const ex = $('[data-explorer]');
  if (!ex) return null;
  const grid = $('#svc-grid', ex);
  const cards = $$('.svc', grid).map((el, i) => ({ el, i, min: +el.dataset.min, max: +el.dataset.max, cat: el.dataset.cat, name: el.dataset.name, text: el.dataset.search }));
  const search = $('#svc-search', ex), budget = $('#budget', ex), sort = $('#sort', ex);
  const countEl = $('[data-count]', ex), countLabel = $('[data-count-label]', ex), empty = $('[data-empty]', ex);
  const filterBtn = $('.ex-filter-btn', ex), panel = $('#filters', ex), badge = $('[data-filter-badge]', ex);
  let state = { cat: 'all', budget: 'all', q: '', sort: 'recommended' };

  const fromUrl = () => {
    const p = new URLSearchParams(location.search);
    const cat = p.get('cat'), b = p.get('budget'), s = p.get('sort');
    return { cat: catIds.has(cat) ? cat : 'all', budget: tierByKey[b] ? b : 'all', q: (p.get('q') || '').slice(0, 80), sort: SORTS.includes(s) ? s : 'recommended' };
  };
  const toUrl = () => {
    const p = new URLSearchParams();
    if (state.cat !== 'all') p.set('cat', state.cat);
    if (state.budget !== 'all') p.set('budget', state.budget);
    if (state.q.trim()) p.set('q', state.q.trim());
    if (state.sort !== 'recommended') p.set('sort', state.sort);
    const s = p.toString();
    return location.pathname + (s ? `?${s}` : '') + (location.hash || '');
  };

  const matches = (c, ignoreCat) => {
    if (!ignoreCat && state.cat !== 'all' && c.cat !== state.cat) return false;
    if (state.budget !== 'all' && !overlaps({ minPrice: c.min, maxPrice: c.max }, tierByKey[state.budget])) return false;
    const q = state.q.trim().toLowerCase();
    return !q || q.split(/\s+/).every((w) => c.text.includes(w));
  };

  function render({ animate = true } = {}) {
    const visible = cards.filter((c) => matches(c));
    const order = [...visible].sort({
      recommended: (a, b) => a.i - b.i,
      'price-asc': (a, b) => a.min - b.min || a.max - b.max,
      'price-desc': (a, b) => b.max - a.max || b.min - a.min,
      name: (a, b) => a.name.localeCompare(b.name),
    }[state.sort]);
    const shown = new Set(order);
    cards.forEach((c) => { const was = !c.el.hidden; c.el.hidden = !shown.has(c); if (animate && !was && shown.has(c) && !reducedMotion.matches) { c.el.classList.remove('enter'); void c.el.offsetWidth; c.el.classList.add('enter'); } });
    // Only touch the DOM when the order really changed, so focus is never knocked off a card.
    const desired = [...order, ...cards.filter((c) => !shown.has(c))].map((c) => c.el);
    if (desired.some((el, i) => grid.children[i] !== el)) desired.forEach((el) => grid.append(el));

    countEl.textContent = order.length;
    countLabel.textContent = `of ${cards.length} service${cards.length === 1 ? '' : 's'}`;
    empty.hidden = order.length > 0;
    grid.hidden = order.length === 0;
    $$('.chip-btn', ex).forEach((b) => {
      const id = b.dataset.cat;
      b.setAttribute('aria-pressed', String(id === state.cat));
      $('.n', b).textContent = cards.filter((c) => (id === 'all' || c.cat === id) && matches(c, true)).length;
    });
    search.value = state.q; budget.value = state.budget; sort.value = state.sort;
    const active = (state.cat !== 'all') + (state.budget !== 'all') + (state.sort !== 'recommended');
    badge.hidden = !active; badge.textContent = active;
    $('[data-apply]', ex).textContent = `Show ${order.length} service${order.length === 1 ? '' : 's'}`;
  }

  function set(patch, { push = true } = {}) {
    state = { ...state, ...patch };
    render();
    history[push ? 'pushState' : 'replaceState'](history.state, '', toUrl());
  }

  ex.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip-btn');
    if (chip) set({ cat: chip.dataset.cat });
    if (e.target.closest('[data-reset]')) { set({ cat: 'all', budget: 'all', q: '', sort: 'recommended' }); search.focus(); }
  });
  search.addEventListener('input', () => set({ q: search.value }, { push: false }));
  budget.addEventListener('change', () => set({ budget: budget.value }));
  sort.addEventListener('change', () => set({ sort: sort.value }));

  // Mobile: filters become a bottom sheet.
  let backdrop = null, opener = null;
  const closeSheet = () => {
    if (!panel.classList.contains('open')) return;
    panel.classList.remove('open'); backdrop?.remove(); backdrop = null;
    filterBtn.setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('sheet-open');
    (opener || filterBtn).focus();
  };
  const openSheet = () => {
    opener = document.activeElement;
    panel.classList.add('open'); filterBtn.setAttribute('aria-expanded', 'true'); document.documentElement.classList.add('sheet-open');
    backdrop = Object.assign(document.createElement('div'), { className: 'sheet-backdrop' });
    backdrop.addEventListener('click', closeSheet); panel.before(backdrop);
    $('.chip-btn', panel).focus();
  };
  filterBtn.addEventListener('click', () => (panel.classList.contains('open') ? closeSheet() : openSheet()));
  $$('[data-close-filters]', panel).forEach((b) => b.addEventListener('click', closeSheet));
  panel.addEventListener('keydown', (e) => { if (!panel.classList.contains('open')) return; if (e.key === 'Escape') closeSheet(); else trapFocus(panel, e); });
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => { if (e.matches) closeSheet(); });

  state = fromUrl();
  render({ animate: false });
  addEventListener('popstate', () => { state = fromUrl(); render(); });

  return {
    setCategory(cat) { set({ cat }); },
    setBudget(b) { set({ budget: b }); },
  };
}
