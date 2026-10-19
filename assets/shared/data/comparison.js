// Website package comparison. `group` orders rows; `values` align with `columns`.
export const comparison = {
  columns: [
    { slug: 'starter-website', label: 'Starter' },
    { slug: 'basic-website', label: 'Basic' },
    { slug: 'business-website', label: 'Business' },
    { slug: 'premium-website', label: 'Premium' },
  ],
  rows: [
    { group: 'Scope', label: 'Pages', values: ['1–3 simple pages', 'Up to ~5 pages', '5–10 pages', 'Highly customized count'] },
    { group: 'Scope', label: 'Typical delivery', values: ['2–5 working days', '4–8 working days', '1–2 weeks', '2–5 weeks'] },
    { group: 'Design', label: 'Visual & UI styling', values: ['Simple clean layout', 'Polished standard', 'Custom branded UI', 'Bespoke design system'] },
    { group: 'Design', label: 'Animations & rich media', values: ['None', 'Subtle transitions', 'Galleries & interactions', 'Advanced micro-interactions'] },
    { group: 'Design', label: 'Mobile responsive layout', values: ['Included', 'Included', 'Included', 'Included (tailored)'] },
    { group: 'Capabilities', label: 'Contact form / CTA', values: ['Basic CTA / WhatsApp', 'Contact form', 'Custom forms', 'Advanced lead capture'] },
    { group: 'Capabilities', label: 'Backend & user login', values: ['Not included', 'Not included', 'Optional add-on', 'CMS or backend'] },
    { group: 'Capabilities', label: 'SEO setup', values: ['Basic tags', 'Basic metadata', 'Structured metadata', 'Full technical SEO'] },
  ],
  note: 'For web applications, mobile apps or enterprise software, open the individual service for its scope, or request a quote for a milestone schedule.',
};
