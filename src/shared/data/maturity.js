// Service maturity: how much engineering a project needs, independent of price.
// Each budget level in tiers.js belongs to exactly one stage. Stages describe complexity, not an upsell path.
// `group` separates accessible projects from product engineering.
export const maturityGroups = [
  { id: 'accessible', label: 'Accessible projects', note: 'Well-defined, fixed-scope work with a clear price.' },
  { id: 'engineering', label: 'Product engineering', note: 'Systems with users, data and rules, scoped together after a conversation.' },
];

export const maturity = [
  { id: 'simple', name: 'Simple', group: 'accessible', line: 'Informational websites.', adds: 'Pages, layout, contact details.' },
  { id: 'interactive', name: 'Interactive', group: 'accessible', line: 'Forms, galleries and focused tools.', adds: 'Behaviour on the page, no user accounts.' },
  { id: 'application', name: 'Application', group: 'engineering', line: 'Authentication, databases, user dashboards.', adds: 'Stored data and people who sign in.' },
  { id: 'platform', name: 'Platform', group: 'engineering', line: 'Roles, integrations, payments and workflows.', adds: 'Several kinds of users and outside systems.' },
  { id: 'product', name: 'Product', group: 'engineering', line: 'SaaS, mobile apps, AI systems and complex infrastructure.', adds: 'Multi-tenant architecture, billing, monitoring, scale.' },
];
