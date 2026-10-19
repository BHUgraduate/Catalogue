export const $ = (s, c = document) => c.querySelector(s);
export const $$ = (s, c = document) => [...c.querySelectorAll(s)];
export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
export const root = new URL(document.documentElement.dataset.root || './', location.href);
export const url = (p) => new URL(p, root).pathname;

/** Arrow-key navigation for a group of radios or tabs (roving tabindex). */
export function rovingGroup(container, itemSel, onSelect, { horizontal = false } = {}) {
  const items = () => $$(itemSel, container);
  const select = (el, focus) => {
    items().forEach((i) => { i.tabIndex = i === el ? 0 : -1; });
    if (focus) el.focus();
    onSelect(el);
  };
  container.addEventListener('click', (e) => { const el = e.target.closest(itemSel); if (el && container.contains(el)) select(el, false); });
  container.addEventListener('keydown', (e) => {
    const list = items(); const i = list.indexOf(document.activeElement);
    if (i < 0) return;
    const next = ['ArrowDown', 'ArrowRight'], prev = ['ArrowUp', 'ArrowLeft'];
    let t = null;
    if (next.includes(e.key)) t = list[(i + 1) % list.length];
    else if (prev.includes(e.key)) t = list[(i - 1 + list.length) % list.length];
    else if (e.key === 'Home') t = list[0];
    else if (e.key === 'End') t = list[list.length - 1];
    if (t) { e.preventDefault(); select(t, true); }
  });
  const cur = items().find((i) => i.getAttribute('aria-checked') === 'true' || i.getAttribute('aria-selected') === 'true') || items()[0];
  items().forEach((i) => { i.tabIndex = i === cur ? 0 : -1; });
}

/** Focus trap for non-<dialog> overlays. */
export function trapFocus(container, e) {
  if (e.key !== 'Tab') return;
  const f = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', container).filter((x) => x.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
