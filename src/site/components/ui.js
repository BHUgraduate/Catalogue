import { html } from '../../shared/html.js';

/** Standard section heading block. */
export const head = ({ eyebrow, title, intro, id }) => html`
<div class="section-head reveal">
  <p class="eyebrow">${eyebrow}</p>
  <h2 ${id ? html`id="${id}"` : ''}>${title}</h2>
  ${intro ? html`<p class="lede">${intro}</p>` : ''}
</div>`;
