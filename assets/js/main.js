import { $ } from './dom.js';
import { initTheme, initNav, initReveal, initStickyCta, initTimeline } from './chrome.js';
import { initStack } from './stack.js';
import { initGoals } from './goals.js';
import { initExplorer } from './explorer.js';
import { initDetail } from './detail.js';
import { initTiers, initCompare, initAddons } from './plan.js';
import { initQuote } from './quote.js';

initTheme();
initNav();
initReveal();

const explorer = initExplorer();
const quote = initQuote();

// Everything below exists only on the home page.
if (explorer) {
  initStack();
  initGoals();
  initTiers(explorer);
  initCompare();
  initAddons();
  initTimeline();
  initStickyCta();
  initDetail((slug) => quote?.prefill(slug));

  // "Browse category" links filter in place instead of navigating.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-filter-cat]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    explorer.setCategory(a.dataset.filterCat);
    $('#services').scrollIntoView();
  });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-quote]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    quote?.prefill(a.dataset.quote);
    history.replaceState(history.state, '', location.pathname + location.search + '#quote');
  });

  // /?service=<slug> deep links prefill the quote form.
  const svc = new URLSearchParams(location.search).get('service');
  if (svc) { quote?.prefill(svc, { scroll: location.hash === '#quote' }); }
}
