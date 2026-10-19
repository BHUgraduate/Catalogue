import { html } from '../../shared/html.js';
import { projects } from '../../shared/data/projects.js';
import { links } from '../../shared/data/site.js';
import { process } from '../../shared/data/process.js';
import { faqGroups } from '../../shared/data/faq.js';
import { icons } from '../../shared/render/icons.js';
import { head } from './ui.js';

const labelClass = (l) => l.toLowerCase();

const projectCard = (p, i) => html`
<article class="project${p.image ? ' has-shot' : ''} reveal">
  <div class="project-body">
    <ul class="labels">${p.labels.map((l) => html`<li class="label ${labelClass(l)}">${l}</li>`)}</ul>
    <h3>${p.name}</h3>
    <p class="project-sum">${p.summary}</p>
    <p class="project-prob">${p.problem}</p>
    <ul class="tech" aria-label="Technology">${p.tech.map((t) => html`<li>${t}</li>`)}</ul>
    <div class="project-links">${p.links.map((l, j) => html`<a class="${j === 0 ? 'btn btn-ghost btn-sm' : 'link-arrow'}" href="${l.href}">${l.label}</a>`)}</div>
  </div>
  ${p.image ? html`<figure class="shot"><img src="assets/img/projects/${p.image.file}" alt="${p.image.alt}" width="${p.image.width}" height="${p.image.height}" loading="lazy" decoding="async"><figcaption class="sr-only">Real screenshot of the Android app</figcaption></figure>` : ''}
</article>`;

export const projectsSection = () => html`
<section class="section" id="projects" aria-labelledby="projects-title">
  <div class="wrap">
    ${head({ eyebrow: 'Proof', title: 'Real software we built and run.', id: 'projects-title', intro: 'These are working systems with links you can open — not mock-ups. Where a screenshot is shown, it is from the real app.' })}
    <div class="projects">${projects.map(projectCard)}</div>
  </div>
</section>`;

export const hycyonConnection = () => html`
<section class="section band" id="hycyon" aria-labelledby="hycyon-title">
  <div class="wrap band-grid">
    <div class="reveal">
      <p class="eyebrow">The team behind it</p>
      <h2 id="hycyon-title">Built by the same team behind Hycyon products.</h2>
      <p class="lede">We don't only sell software development. Hycyon designs, ships and maintains its own products, then builds client systems to the same standard.</p>
      <div class="cta-row">
        <a class="btn btn-ghost btn-sm" href="${links.hycyon}">Explore Hycyon ${icons.ext_link}</a>
        <a class="btn btn-ghost btn-sm" href="${links.portfolio}">View Portfolio ${icons.ext_link}</a>
      </div>
    </div>
    <ul class="facts-list reveal">
      <li><strong>Own products, live.</strong> eBook Pro and BrainSpark are built, run and supported in-house.</li>
      <li><strong>Production stack.</strong> Flutter, Firebase, Node.js and Swift across web, mobile and backend.</li>
      <li><strong>Keys stay server-side.</strong> AI calls run behind Cloud Functions with credentials in Secret Manager — never in the app.</li>
      <li><strong>Open about it.</strong> <a href="${links.ebookProSite}">eBook Pro</a>, <a href="${links.brainSpark}">BrainSpark</a> and the <a href="${links.portfolio}">portfolio</a> are public.</li>
    </ul>
  </div>
</section>`;

export const processSection = () => html`
<section class="section alt" id="process" aria-labelledby="process-title">
  <div class="wrap">
    ${head({ eyebrow: 'Delivery process', title: 'From first message to launch, in six steps.', id: 'process-title', intro: 'Every project follows the same engineering path, so nothing about it is a surprise.' })}
    <ol class="timeline" data-timeline>
      ${process.map((s, i) => html`<li class="step reveal" style="--s:${i}"><span class="step-dot" aria-hidden="true"></span><div><p class="k">Step ${i + 1}</p><h3>${s.name}</h3><p>${s.text}</p><p class="step-out"><span class="k">You get</span>${s.output}</p></div></li>`)}
    </ol>
  </div>
</section>`;

export const faqSection = () => html`
<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq-wrap">
    <div class="reveal">${head({ eyebrow: 'FAQ', title: 'Clear answers before we begin.', id: 'faq-title', intro: 'Policies on pricing, infrastructure and ownership.' })}</div>
    <div class="faq">
      ${faqGroups.map((g) => html`<div class="faq-group reveal"><h3>${g.label}</h3>${g.items.map((it) => html`<details class="qa"><summary>${it.q}${icons.chevron}</summary><p>${it.a}</p></details>`)}</div>`)}
    </div>
  </div>
</section>`;
