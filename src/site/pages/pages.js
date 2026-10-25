import { html } from '../../shared/html.js';
import { site } from '../../shared/data/site.js';
import { services } from '../../shared/data/services.js';
import { categories } from '../../shared/data/categories.js';
import { serviceDetail } from '../../shared/render/serviceDetail.js';
import { serviceCard } from '../../shared/render/serviceCard.js';
import { page } from '../layout.js';
import { homeLd, servicePageLd, listPageLd } from '../seo.js';
import { hero } from '../components/hero.js';
import { starterSpotlight, goalSelector, explorer } from '../components/explore.js';
import { packages, compare, addonsSection, transparencySection } from '../components/plan.js';
import { projectsSection, hycyonConnection, processSection, faqSection } from '../components/proof.js';
import { quoteSection } from '../components/quote.js';

export const home = () =>
  page({
    title: site.title,
    description: site.description,
    path: '/',
    home: true,
    stickyCta: true,
    jsonLd: homeLd(),
    body: html`${hero()}${starterSpotlight()}${goalSelector()}${explorer()}${packages()}${compare()}${addonsSection()}${transparencySection()}${projectsSection()}${hycyonConnection()}${processSection()}${faqSection()}${quoteSection()}`,
  });

const crumbs = (items) => html`<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([label, href], i) => html`<li>${href ? html`<a href="${href}">${label}</a>` : html`<span aria-current="page">${label}</span>`}</li>`)}</ol></nav>`;

export const servicePage = (s) =>
  page({
    title: `${s.name} — ${s.priceDisplay} | Hycyon Catalogue`,
    description: `${s.shortDesc} Indicative ${s.priceDisplay}, typically ${s.timeline}.`.slice(0, 200),
    path: `/services/${s.slug}/`,
    depth: 2,
    jsonLd: servicePageLd(s),
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../../'], ['Services', '../'], [s.name]])}<div class="detail-page">${serviceDetail(s, '../../', { asPage: true })}</div></div>`,
  });

const grid = (list) => html`<div class="svc-grid">${list.map((s) => serviceCard(s, '../../', { level: 2 }))}</div>`;

export const categoryPage = (c) => {
  const list = services.filter((s) => s.category === c.id);
  return page({
    title: `${c.label} — Services & Pricing | Hycyon Catalogue`,
    description: `${list.length === 1 ? 'One service' : `${list.length} services`} in ${c.label} from Hycyon, with deliverables, exclusions, delivery times and indicative INR pricing.`,
    path: `/services/${c.id}/`,
    depth: 2,
    jsonLd: listPageLd(c.label, `/services/${c.id}/`),
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../../'], ['Services', '../'], [c.label]])}
      <h1 class="page-title">${c.label}</h1><p class="lede">${c.strip}.</p>
      <div class="prose cat-intro">${c.intro.map((t) => html`<p>${t}</p>`)}</div>
      ${grid(list)}
      <section class="cat-choose" aria-labelledby="choose-title"><h2 id="choose-title">Which ${c.label.toLowerCase()} service fits?</h2>
        <ul class="related">${list.map((s) => html`<li><a href="../${s.slug}/"><span><strong>${s.name}</strong> — ${s.bestFor}</span><span class="muted">${s.priceDisplay}</span></a></li>`)}</ul></section>
      <p class="page-foot"><a class="link-arrow" href="../../#services">Explore all services</a></p></div>`,
  });
};

export const servicesIndex = () =>
  page({
    title: 'All Services — Hycyon Catalogue',
    description: 'Every Hycyon software service in one place: websites, web apps, mobile apps, AI, extensions, backend and custom software, with indicative INR pricing.',
    path: '/services/',
    depth: 1,
    jsonLd: listPageLd('Services', '/services/'),
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../'], ['Services']])}
      <h1 class="page-title">All services</h1>
      ${categories.map((c) => html`<section class="cat-block"><h2><a href="${c.id}/">${c.label}</a></h2><ul class="related">${services.filter((s) => s.category === c.id).map((s) => html`<li><a href="${s.slug}/"><span>${s.name}</span><span class="muted">${s.priceDisplay}</span></a></li>`)}</ul></section>`)}</div>`,
  });

export const privacy = () =>
  page({
    title: 'Privacy — Hycyon Catalogue',
    description: 'What the Hycyon Catalogue collects when you request a quote, where it goes, and what it is used for.',
    path: '/privacy/',
    depth: 1,
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../'], ['Privacy']])}
      <article class="prose">
      <h1 class="page-title">Privacy</h1>
      <p>Last updated ${site.updated}.</p>
      <h2>This website</h2>
      <p>The catalogue does not use analytics, advertising trackers or cookies. Fonts are served from this site, not a third party. Your browser may store one preference in local storage — whether you chose the light or dark theme. It never leaves your device.</p>
      <h2>The quote form</h2>
      <p>When you send a project request we receive what you type: your name, email address, any optional phone, business and reference details, the service and budget you chose, and your description of the project. It is sent over HTTPS to a small form service hosted on Netlify, which passes it to a private Hycyon channel on Discord.</p>
      <p>We use it only to reply to you with a scope and quotation. We do not sell or share it. If sending fails, your email app opens with the request written out instead, and it is then handled as ordinary email.</p>
      <h2>Quotes are not contracts</h2>
      <p>Prices on this site are indicative ranges. Nothing is binding until a firm quotation follows scope review. See the <a href="../terms/">terms</a>.</p>
      <h2>Questions or deletion requests</h2>
      <p>Write to <a href="mailto:${site.email}">${site.email}</a> and we will delete your request on request.</p>
      </article></div>`,
  });

export const terms = () =>
  page({
    title: 'Terms of Service — Hycyon Catalogue',
    description: 'Standard terms for Hycyon projects: quotations, payment, revisions, ownership, refunds, liability and governing law.',
    path: '/terms/',
    depth: 1,
    body: html`<div class="wrap page-pad">${crumbs([['Catalogue', '../'], ['Terms']])}
      <article class="prose">
      <h1 class="page-title">Terms of Service</h1>
      <p>Last updated ${site.updated}. These terms apply to services Hycyon provides to you through this catalogue. A written quotation or agreement for your project may add to them; if the two conflict, the written quotation or agreement applies to that project.</p>
      <h2>1. Prices and quotations</h2>
      <p>Prices shown on this site are indicative ranges in Indian Rupees (INR), not offers. A firm quotation is issued after we review your confirmed scope. Nothing is binding until you accept a written quotation and any required advance payment is received. Taxes, where applicable, are shown or added separately on the quotation or invoice.</p>
      <h2>2. Scope and changes</h2>
      <p>The scope is the deliverables listed in the accepted quotation. Items listed as "not included" on a service page, and anything not listed in the quotation, are outside the scope. Requests that go beyond the agreed scope are quoted separately and may change the price and timeline.</p>
      <h2>3. Timelines</h2>
      <p>Delivery windows on this site are typical estimates, not guarantees. Timelines depend on you supplying content, feedback, access and approvals promptly. Delays on your side move the schedule accordingly.</p>
      <h2>4. Payment</h2>
      <p>Payment terms, including any advance and milestone or final payments, are set out in the accepted quotation. Invoices are due by the date stated on them. We may pause work while a payment is overdue. Final files, source code and access are released after full payment.</p>
      <h2>5. Revisions and feedback</h2>
      <p>The number of revision rounds included is stated in the quotation. A revision refines delivered work within the agreed scope; it is not a change of direction or new functionality. Further revisions are quoted separately.</p>
      <h2>6. Your responsibilities</h2>
      <p>You agree to provide accurate information, content and materials you have the right to use, and timely feedback. You are responsible for the content you supply and for confirming that your use of the delivered work complies with the laws that apply to you.</p>
      <h2>7. Ownership and licences</h2>
      <p>On full payment, you own the custom work we create specifically for you, excluding third-party and open-source components, which remain under their own licences. Hycyon retains ownership of its pre-existing tools, libraries and know-how, and grants you a non-exclusive licence to use them as part of the delivered work. Unless you ask us not to, we may describe the project in our portfolio in general terms.</p>
      <h2>8. Third-party services and costs</h2>
      <p>Hosting, domains, app-store accounts, payment gateways, AI model usage and other third-party services are not included in our prices unless the quotation says so. They are billed by the provider under the provider's terms, and you are responsible for those costs and terms.</p>
      <h2>9. AI-powered features</h2>
      <p>Features that use AI models can produce incorrect, incomplete or unexpected output. You are responsible for reviewing output before relying on it, especially for legal, medical, financial or other consequential decisions.</p>
      <h2>10. Confidentiality</h2>
      <p>Each party will keep the other's non-public business information confidential and use it only for the project, except where disclosure is required by law.</p>
      <h2>11. Cancellation and refunds</h2>
      <p>You may cancel a project in writing at any time. Payment for work completed up to the date of cancellation, and for non-recoverable third-party costs already incurred, remains payable. Advance payments are refundable only for work not yet started, as set out in the accepted quotation. Once a deliverable has been handed over, fees for it are not refundable.</p>
      <h2>12. Warranty and support</h2>
      <p>We will correct defects in delivered work that fail to match the agreed scope if you report them in writing within 30 days of delivery, at no extra charge. Ongoing maintenance, hosting and new features are separate services. Except as stated here, work is provided "as is", without warranties of any kind, to the extent the law allows.</p>
      <h2>13. Limitation of liability</h2>
      <p>To the extent the law allows, Hycyon is not liable for indirect, incidental or consequential losses, including lost profits, revenue, data or business opportunity. Our total liability for any claim relating to a project is limited to the fees you paid us for that project.</p>
      <h2>14. Privacy</h2>
      <p>How we handle the details you send us is described in the <a href="../privacy/">privacy page</a>.</p>
      <h2>15. Governing law and disputes</h2>
      <p>These terms are governed by the laws of India. We will first try to resolve any dispute through good-faith discussion. If that fails, the courts of India have jurisdiction.</p>
      <h2>16. Changes to these terms</h2>
      <p>We may update these terms from time to time. The version published here on the date you accept a quotation applies to that project.</p>
      <h2>17. Contact</h2>
      <p>Questions about these terms: <a href="mailto:${site.email}">${site.email}</a>.</p>
      </article></div>`,
  });

export const notFound = () =>
  page({
    title: 'Page not found — Hycyon Catalogue',
    description: 'This page does not exist in the Hycyon Catalogue. Head back to the catalogue home page.',
    path: '/404.html',
    noindex: true,
    depth: null,
    body: html`<div class="wrap page-pad"><h1 class="page-title">That page isn't here.</h1><p class="lede">It may have moved, or the link may be wrong.</p><p><a class="btn btn-primary" href="/">Back to the catalogue</a></p></div>`,
  });
