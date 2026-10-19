import { $, $$, rovingGroup } from './dom.js';

export function initTiers(explorer) {
  const box = $('[data-tiers]');
  if (!box) return;
  const panels = $$('[data-tier-panel]', box);
  rovingGroup($('.tier-tabs', box), '.tier', (el) => {
    $$('.tier', box).forEach((t) => t.setAttribute('aria-selected', String(t === el)));
    panels.forEach((p) => { p.hidden = p.dataset.tierPanel !== el.dataset.tier; });
  });
  panels.forEach((p, i) => { p.hidden = i !== 0; });
  box.addEventListener('click', (e) => {
    const a = e.target.closest('[data-filter-budget]');
    if (!a || !explorer) return;
    e.preventDefault(); explorer.setBudget(a.dataset.filterBudget); $('#services').scrollIntoView();
  });
}

export function initCompare() {
  const toggle = $('[data-diff-only]');
  const table = $('.compare');
  toggle?.addEventListener('change', () => table.classList.toggle('diff-only', toggle.checked));
}

/** Add-ons: toggled modules are remembered and mirrored into the quote form. */
export const addonStore = { selected: new Set(), listeners: [], set(name, on) { on ? this.selected.add(name) : this.selected.delete(name); this.listeners.forEach((l) => l([...this.selected])); }, on(fn) { this.listeners.push(fn); } };

export function initAddons() {
  const box = $('[data-addons]');
  if (!box) return;
  const note = $('[data-addon-note]', box);
  const sync = (list) => {
    $$('.module', box).forEach((m) => m.setAttribute('aria-pressed', String(list.includes(m.dataset.addon))));
    note.textContent = list.length ? `${list.length} selected: ${list.join(', ')}` : 'No add-ons selected';
  };
  addonStore.on(sync);
  box.addEventListener('click', (e) => { const m = e.target.closest('.module'); if (m) addonStore.set(m.dataset.addon, m.getAttribute('aria-pressed') !== 'true'); });
}
