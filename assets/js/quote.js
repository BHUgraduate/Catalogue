import { $, $$ } from './dom.js';
import { html, toString } from '../shared/html.js';
import { services } from '../shared/data/services.js';
import { tiers } from '../shared/data/tiers.js';
import { site } from '../shared/data/site.js';
import { addonStore } from './plan.js';
import { sendLead } from './relay.js';

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
const STEP_TITLES = ['About you', 'What are you building?', 'Budget & timeline', 'References & add-ons', 'Review & send'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Guided quote request. It is sent to Hycyon's form relay. If that is unreachable for any reason, the visitor gets the
 * pre-written email draft (mailto) instead, so a request is never lost.
 */
export function initQuote() {
  const form = $('[data-quote-form]');
  if (!form) return null;
  const steps = $$('.qstep', form);
  const done = $('[data-done]');
  const [back, next, submit] = [$('[data-back]', form), $('[data-next]', form), $('[data-submit]', form)];
  const bar = $('[data-progress]', form);
  const f = (id) => $(`#${id}`, form);
  let cur = 0, lastText = '';

  const serviceLabel = () => { const v = f('quote-service').value; return v === 'unsure' ? 'Custom / I need advice' : bySlug[v] ? `${bySlug[v].name} (${bySlug[v].priceDisplay})` : ''; };

  function setError(id, msg) {
    const el = f(id), err = f(`${id}-err`);
    if (!err) return;
    err.hidden = !msg; err.textContent = msg || '';
    el.toggleAttribute('aria-invalid', !!msg);
    const ids = (el.getAttribute('aria-describedby') || '').split(' ').filter((x) => x && x !== err.id);
    if (msg) ids.push(err.id);
    ids.length ? el.setAttribute('aria-describedby', ids.join(' ')) : el.removeAttribute('aria-describedby');
  }
  const rules = {
    0: () => [
      ['client-name', !f('client-name').value.trim() && 'Please enter your name.'],
      ['client-email', !EMAIL.test(f('client-email').value.trim()) && 'Please enter a valid email address so we can reply.'],
    ],
    1: () => [
      ['quote-service', !f('quote-service').value && 'Choose the closest service, or "Custom / I need advice".'],
      ['quote-description', f('quote-description').value.trim().length < 10 && 'Add a few words about what the software should do.'],
    ],
    2: () => [['quote-budget', !f('quote-budget').value && 'Pick the range you have in mind, or "Not sure yet".']],
    3: () => [['quote-ref', f('quote-ref').value.trim() && !/^https?:\/\/\S+\.\S+/.test(f('quote-ref').value.trim()) && 'Enter a full link starting with https://, or leave it empty.']],
    4: () => [['quote-ack', !f('quote-ack').checked && 'Please confirm you understand the pricing is indicative.']],
  };
  const validate = (i) => {
    let first = null;
    for (const [id, msg] of rules[i]()) { setError(id, msg || ''); if (msg && !first) first = id; }
    if (first) f(first).focus();
    return !first;
  };

  function summary() {
    const rows = [
      ['Name', f('client-name').value.trim()], ['Email', f('client-email').value.trim()],
      ['Mobile / WhatsApp', f('client-phone').value.trim() || 'Not provided'], ['Organisation', f('client-company').value.trim() || 'Independent'],
      ['Service', serviceLabel()], ['Platform', f('quote-platform').value.trim() || 'Not specified'],
      ['Budget', f('quote-budget').value], ['Timeline', f('quote-timeline').value],
      ['Add-ons', [...addonStore.selected].join(', ') || 'None'], ['Reference', f('quote-ref').value.trim() || 'None'],
      ['Description', f('quote-description').value.trim()],
    ];
    $('[data-summary]', form).innerHTML = toString(html`${rows.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}`);
    return rows;
  }

  function show(i, focus = true) {
    cur = i;
    steps.forEach((s, n) => { s.hidden = n !== i; });
    back.hidden = i === 0; next.hidden = i === steps.length - 1; submit.hidden = i !== steps.length - 1;
    $('[data-step-label]', form).textContent = `Step ${i + 1} of ${steps.length}`;
    $('[data-step-title]', form).textContent = STEP_TITLES[i];
    bar.style.width = `${((i + 1) / steps.length) * 100}%`;
    if (i === steps.length - 1) summary();
    if (focus) $('input,select,textarea', steps[i])?.focus({ preventScroll: true });
  }
  next.addEventListener('click', () => { if (validate(cur)) { show(cur + 1); form.scrollIntoView({ block: 'nearest' }); } });
  back.addEventListener('click', () => show(cur - 1));
  form.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && cur < steps.length - 1) { e.preventDefault(); next.click(); } });
  form.addEventListener('input', (e) => { if (e.target.id) setError(e.target.id, ''); });

  const doneTitle = $('[data-done-title]', done), doneText = $('[data-done-text]', done), doneMail = $('[data-mailto]', done);
  const DEFAULT_TITLE = doneTitle.textContent, DEFAULT_TEXT = doneText.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (let i = 0; i < steps.length; i++) if (!validate(i)) { show(i, false); validate(i); return; }
    const rows = Object.fromEntries(summary());
    const subject = `Project Quotation Inquiry: ${rows.Service} - ${rows.Name}`;
    const body = `Hi Hycyon team,

I would like to request a project quotation based on your service catalogue.

--- Project Details ---
Client Name: ${rows.Name}
Email: ${rows.Email}
Phone / WhatsApp: ${rows['Mobile / WhatsApp']}
Organization: ${rows.Organisation}
Service Interested: ${rows.Service}
Budget Bracket: ${rows.Budget}
Desired Timeline: ${rows.Timeline}
Preferred Platform: ${rows.Platform}
Add-ons: ${rows['Add-ons']}
Reference URL: ${rows.Reference}

--- Project Description ---
${rows.Description}

I confirm that I understand catalogue prices are indicative starting ranges and the final scope will be formally confirmed.

Best regards,
${rows.Name}`;
    lastText = `To: ${site.email}\nSubject: ${subject}\n\n${body}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    doneMail.href = href;

    const label = submit.textContent;
    submit.disabled = true; submit.textContent = 'Sending…';
    const clean = (v, none) => (v && v !== none ? v : '');
    const result = await sendLead({
      source: 'catalogue',
      name: rows.Name, email: rows.Email,
      phone: clean(rows['Mobile / WhatsApp'], 'Not provided'), company: clean(rows.Organisation, 'Independent'),
      service: rows.Service, platform: clean(rows.Platform, 'Not specified'),
      budget: rows.Budget, timeline: rows.Timeline,
      addons: clean(rows['Add-ons'], 'None'), reference: clean(rows.Reference, 'None'),
      description: rows.Description, acknowledged: true,
      website: $('[data-hp]', form).value,
    });
    submit.disabled = false; submit.textContent = label;

    form.hidden = true; done.hidden = false;
    if (result.ok) {
      doneTitle.textContent = 'Request sent';
      doneText.textContent = `Thank you, ${rows.Name.split(' ')[0]}. We have your request and will reply to ${rows.Email}. A copy is below if you'd like to keep it.`;
      doneMail.hidden = true;
      done.focus();
    } else {
      // The relay was unreachable or refused it: give them the email draft so the request is not lost.
      doneTitle.textContent = DEFAULT_TITLE;
      doneText.textContent = `We couldn't send it online just now (reason: ${result.reason}). ${DEFAULT_TEXT}`;
      doneMail.hidden = false;
      done.focus();
      location.href = href;
    }
  });

  $('[data-copy]', done).addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    try { await navigator.clipboard.writeText(lastText); btn.textContent = 'Copied'; } catch { btn.textContent = 'Copy failed — select the text manually'; }
    setTimeout(() => { btn.textContent = 'Copy request text'; }, 2500);
  });
  $('[data-edit]', done).addEventListener('click', () => { done.hidden = true; form.hidden = false; doneMail.hidden = false; doneTitle.textContent = DEFAULT_TITLE; doneText.textContent = DEFAULT_TEXT; show(0); });

  // Add-ons mirror the add-on modules.
  const boxes = $$('input[name="addon"]', form);
  boxes.forEach((b) => b.addEventListener('change', () => addonStore.set(b.value, b.checked)));
  addonStore.on((list) => boxes.forEach((b) => { b.checked = list.includes(b.value); }));

  show(0, false);

  return {
    prefill(slug, { scroll = true } = {}) {
      const s = bySlug[slug];
      if (s) {
        f('quote-service').value = slug;
        const i = tiers.findIndex((t) => s.minPrice >= t.min && s.minPrice <= t.max);
        const opt = f('quote-budget').options[i + 1];
        if (opt && !f('quote-budget').value) f('quote-budget').value = opt.value;
        if (!f('quote-description').value.trim()) f('quote-description').value = `I'm interested in the "${s.name}" service (indicative ${s.priceDisplay}). Here's what we want to build: `;
      }
      if (!done.hidden) { done.hidden = true; form.hidden = false; }
      show(0, false);
      if (scroll) { $('#quote').scrollIntoView(); f('client-name').focus({ preventScroll: true }); }
    },
  };
}
