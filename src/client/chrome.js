import { $, $$, reducedMotion } from './dom.js';

export function initTheme() {
  const root = document.documentElement;
  const btn = $('.theme-btn');
  const set = (t, save) => {
    root.dataset.theme = t;
    if (save) try { localStorage.setItem('hycyon-theme', t); } catch {}
    btn?.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };
  set(root.dataset.theme || 'light', false);
  btn?.addEventListener('click', () => set(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    try { if (localStorage.getItem('hycyon-theme')) return; } catch {}
    set(e.matches ? 'dark' : 'light', false);
  });
}

export function initNav() {
  const nav = $('#site-nav'), btn = $('.menu-btn'), header = $('[data-header]');
  const label = $('.menu-label', btn);
  const toggle = (open) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close' : 'Menu';
    document.documentElement.classList.toggle('menu-open', open);
  };
  btn.addEventListener('click', () => toggle(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) toggle(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { toggle(false); btn.focus(); } });
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => { if (e.matches) toggle(false); });
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });

  // Highlight the section in view.
  const links = new Map($$('[data-nav]').map((a) => [a.dataset.nav, a]));
  const sections = [...links.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { links.forEach((a) => a.removeAttribute('aria-current')); links.get(en.target.id)?.setAttribute('aria-current', 'true'); } });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));
}

export function initReveal() {
  const items = $$('.reveal');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -6% 0px' });
  items.forEach((el) => io.observe(el));
}

export function initStickyCta() {
  const bar = $('[data-sticky-cta]');
  if (!bar || !('IntersectionObserver' in window)) return;
  const watch = ['.hero', '#quote'].map((s) => $(s)).filter(Boolean);
  const hidden = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? hidden.add(en.target) : hidden.delete(en.target)));
    bar.hidden = hidden.size > 0;
  });
  watch.forEach((el) => io.observe(el));
}

export function initTimeline() {
  const tl = $('[data-timeline]');
  if (!tl) return;
  if (reducedMotion.matches) { tl.style.setProperty('--p', '1'); return; }
  let raf = 0;
  const update = () => {
    raf = 0;
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.55 - r.top) / r.height));
    tl.style.setProperty('--p', p.toFixed(3));
    $$('.step', tl).forEach((s) => s.classList.toggle('on', s.getBoundingClientRect().top < innerHeight * 0.6));
  };
  addEventListener('scroll', () => { raf ||= requestAnimationFrame(update); }, { passive: true });
  update();
}
