import { html } from '../../shared/html.js';
import { services } from '../../shared/data/services.js';
import { categories } from '../../shared/data/categories.js';
import { addons } from '../../shared/data/addons.js';
import { site } from '../../shared/data/site.js';

// Budget option values match the original catalogue so quote emails read the same as before.
const budgetOptions = [
  ['₹5,000 - ₹7,000', '₹5,000 – ₹7,000'],
  ['₹8,000 - ₹15,000', '₹8,000 – ₹15,000'],
  ['₹15,000 - ₹30,000', '₹15,000 – ₹30,000'],
  ['₹30,000 - ₹75,000', '₹30,000 – ₹75,000'],
  ['₹75,000 - ₹1,50,000', '₹75,000 – ₹1.5 Lakh'],
  ['₹1,50,000 - ₹4,00,000+', '₹1.5 Lakh – ₹4 Lakh+'],
  ['₹4,00,000+', '₹4 Lakh+ (Enterprise)'],
  ['Not sure yet', 'Not sure yet — advise me'],
];
const timelineOptions = ['Flexible', 'Under 1 week', '2-4 weeks', '1-2 months', '3+ months'];

const steps = [
  { id: 'you', title: 'About you' },
  { id: 'build', title: 'What are you building?' },
  { id: 'plan', title: 'Budget & timeline' },
  { id: 'extras', title: 'References & add-ons' },
  { id: 'review', title: 'Review & send' },
];

const field = (id, label, input, { hint, required } = {}) => html`
<div class="field">
  <label for="${id}">${label}${required ? html` <span class="req" aria-hidden="true">*</span>` : html` <span class="opt">(optional)</span>`}</label>
  ${input}
  ${hint ? html`<p class="hint" id="${id}-hint">${hint}</p>` : ''}
  <p class="err" id="${id}-err" hidden></p>
</div>`;

export const quoteSection = () => html`
<section class="section alt" id="quote" aria-labelledby="quote-title">
  <div class="wrap quote-grid">
    <div class="quote-intro reveal">
      <p class="eyebrow">Start a project</p>
      <h2 id="quote-title">Have something worth building?</h2>
      <p class="lede">Tell us what you're trying to build. We'll turn it into a practical scope and a realistic quotation.</p>
      <ul class="next-list">
        <li><strong>You write.</strong> Five short steps, about two minutes.</li>
        <li><strong>We reply.</strong> A direct answer from ${site.email} with a scope breakdown and price estimate.</li>
        <li><strong>You decide.</strong> A firm quotation follows scope review. Nothing is binding before that.</li>
      </ul>
      <p class="muted small">Submitting sends your request to Hycyon over HTTPS, and we use it only to reply. If it can't be sent, your email app opens with the request written out instead. Prefer to write it yourself? <a href="mailto:${site.email}">${site.email}</a></p>
    </div>
    <div class="quote-card reveal">
      <form id="quote-form" class="qform" novalidate data-quote-form>
        <div class="progress" aria-hidden="true"><span data-progress></span></div>
        <p class="step-label" aria-live="polite"><span data-step-label>Step 1 of ${steps.length}</span> · <strong data-step-title>${steps[0].title}</strong></p>

        <fieldset class="qstep" data-step="you">
          <legend class="sr-only">About you</legend>
          ${field('client-name', 'Your name', html`<input id="client-name" name="name" type="text" autocomplete="name" required>`, { required: true })}
          ${field('client-email', 'Email address', html`<input id="client-email" name="email" type="email" autocomplete="email" inputmode="email" required>`, { required: true })}
          <div class="f-row">
            ${field('client-phone', 'Mobile / WhatsApp', html`<input id="client-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel">`)}
            ${field('client-company', 'Business / organisation', html`<input id="client-company" name="company" type="text" autocomplete="organization">`)}
          </div>
        </fieldset>

        <fieldset class="qstep" data-step="build">
          <legend class="sr-only">What are you building?</legend>
          ${field('quote-service', 'Service you are interested in', html`<select id="quote-service" name="service" required>
            <option value="">Select a service</option>
            ${categories.map((c) => html`<optgroup label="${c.label}">${services.filter((s) => s.category === c.id).map((s) => html`<option value="${s.slug}">${s.name} · ${s.priceDisplay}</option>`)}</optgroup>`)}
            <option value="unsure">Custom / I need advice</option>
          </select>`, { required: true })}
          ${field('quote-description', 'What should the software do?', html`<textarea id="quote-description" name="description" rows="5" required aria-describedby="quote-description-hint"></textarea>`, { required: true, hint: 'Who will use it, and what should they be able to do? Rough ideas are fine.' })}
          ${field('quote-platform', 'Preferred platform', html`<input id="quote-platform" name="platform" type="text" list="platforms" placeholder="Web, Android, iOS, browser…"><datalist id="platforms"><option value="Web"><option value="Android"><option value="iOS"><option value="Android + iOS"><option value="Browser extension"><option value="Not sure"></datalist>`)}
        </fieldset>

        <fieldset class="qstep" data-step="plan">
          <legend class="sr-only">Budget and timeline</legend>
          ${field('quote-budget', 'Planned budget', html`<select id="quote-budget" name="budget" required><option value="">Select a budget</option>${budgetOptions.map(([v, l]) => html`<option value="${v}">${l}</option>`)}</select>`, { required: true, hint: 'Catalogue prices are indicative. Pick the range you have in mind.' })}
          ${field('quote-timeline', 'Desired timeline', html`<select id="quote-timeline" name="timeline">${timelineOptions.map((t) => html`<option value="${t}">${t === 'Flexible' ? 'Flexible timeline' : t}</option>`)}</select>`)}
        </fieldset>

        <fieldset class="qstep" data-step="extras">
          <legend class="sr-only">References and add-ons</legend>
          ${field('quote-ref', 'Reference website or app', html`<input id="quote-ref" name="ref" type="url" inputmode="url" placeholder="https://">`, { hint: 'Something similar, or a site you like.' })}
          <div class="field"><span class="label" id="addons-label">Add-ons you want <span class="opt">(optional)</span></span>
            <div class="check-grid" role="group" aria-labelledby="addons-label">${addons.map((a) => html`<label class="check"><input type="checkbox" name="addon" value="${a.name}"><span>${a.name}</span></label>`)}</div></div>
        </fieldset>

        <fieldset class="qstep" data-step="review">
          <legend class="sr-only">Review and send</legend>
          <dl class="summary" data-summary></dl>
          <div class="field ack">
            <label class="check"><input id="quote-ack" name="ack" type="checkbox" required><span>I understand that displayed prices are indicative ranges and that the final binding quotation depends on confirmed scope, integrations and deliverables. <span class="req" aria-hidden="true">*</span></span></label>
            <p class="err" id="quote-ack-err" hidden></p>
          </div>
        </fieldset>

        <div class="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off" data-hp></label></div>

        <div class="qnav">
          <button type="button" class="btn btn-ghost btn-sm" data-back hidden>Back</button>
          <button type="button" class="btn btn-primary" data-next>Continue</button>
          <button type="submit" class="btn btn-primary" data-submit hidden>Request a Quote</button>
        </div>
        <noscript><p class="muted">This form needs JavaScript. Please email <a href="mailto:${site.email}">${site.email}</a> instead.</p></noscript>
      </form>
      <div class="done" data-done hidden tabindex="-1" role="status">
        <h3 data-done-title>Your request is ready to send</h3>
        <p data-done-text>Your email app should open with the request written out. Nothing is sent until you press send. If it didn't open, use the buttons below.</p>
        <div class="cta-row"><a class="btn btn-primary" data-mailto href="mailto:${site.email}">Open email draft</a><button type="button" class="btn btn-ghost" data-copy>Copy request text</button><button type="button" class="link-arrow" data-edit>Edit request</button></div>
      </div>
    </div>
  </div>
</section>`;
