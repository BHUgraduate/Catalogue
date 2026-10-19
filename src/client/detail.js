import { $, url } from './dom.js';
import { toString } from '../shared/html.js';
import { services } from '../shared/data/services.js';
import { serviceDetail } from '../shared/render/serviceDetail.js';

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/**
 * Service detail drawer. Every detail also exists as a real page at /services/<slug>/, so the URL we push
 * is shareable and reloading it gives the full page.
 */
export function initDetail(onQuote) {
  const dlg = $('#detail-dialog');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  const body = $('#detail-body', dlg);
  let opener = null, pushed = false;

  const fill = (slug) => { body.innerHTML = toString(serviceDetail(bySlug[slug], '')); dlg.scrollTo?.(0, 0); $('.sheet-inner', dlg).scrollTop = 0; };

  function open(slug, { push = true } = {}) {
    if (!bySlug[slug]) return;
    fill(slug);
    if (!dlg.open) {
      opener = document.activeElement;
      dlg.showModal();
      document.documentElement.classList.add('dialog-open');
    }
    if (push) { history.pushState({ detail: slug }, '', url(`services/${slug}/`)); pushed = true; }
  }
  function close({ fromPop = false } = {}) {
    if (!dlg.open) return;
    dlg.close();
    if (pushed && !fromPop) { pushed = false; history.back(); }
    pushed = false;
  }
  dlg.addEventListener('close', () => {
    document.documentElement.classList.remove('dialog-open');
    if (pushed) { pushed = false; history.back(); }
    opener?.focus?.();
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-close]')) close(); });

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    const a = e.target.closest('[data-detail]');
    if (a) { e.preventDefault(); if (dlg.open) { fill(a.dataset.detail); history.replaceState({ detail: a.dataset.detail }, '', url(`services/${a.dataset.detail}/`)); } else open(a.dataset.detail); return; }
    const q = e.target.closest('[data-quote]');
    if (q && dlg.open) { e.preventDefault(); close(); onQuote?.(q.dataset.quote); }
  });

  addEventListener('popstate', (e) => {
    if (e.state?.detail) { open(e.state.detail, { push: false }); pushed = true; }
    else if (dlg.open) close({ fromPop: true });
  });
}
