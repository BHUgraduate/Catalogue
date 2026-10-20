// Engineering scope levels. Bigger scope = more engineering complexity.
// `summary` is the original catalogue wording; `architecture`, `limits` summarise the services in the range.
export const tiers = [
  {
    key: '5k-7k', stage: 'simple', name: 'Starter', range: '₹5K – ₹7K', min: 5000, max: 7000,
    title: 'Simple Online Presence',
    summary: '1–3 responsive informative pages, contact info, WhatsApp CTA, and social links. No user logins or database.',
    architecture: 'Static pages deployed to static hosting. No server code.',
    limits: 'No accounts, no database, no admin or CMS, no payments.',
  },
  {
    key: '8k-15k', stage: 'simple', name: 'Professional', range: '₹8K – ₹15K', min: 8000, max: 15000,
    title: 'Professional Small Website',
    summary: 'Up to ~5 pages, custom layout styling, contact form, basic SEO metadata setup, and deployment to high-speed hosting.',
    architecture: 'Static site with a working contact form, SEO metadata and speed optimisation.',
    limits: 'No user accounts, no stored user content, no transaction engine.',
  },
  {
    key: '15k-30k', stage: 'interactive', name: 'Interactive', range: '₹15K – ₹30K', min: 15000, max: 30000,
    title: 'Business Site or Mini Web Tool',
    summary: 'Full 5–10 page business websites with rich galleries, or single-purpose mini web applications and focused calculators.',
    architecture: 'Branded multi-page site, or a focused client-side tool with local persistence on serverless hosting.',
    limits: 'No multi-user accounts or complex database; backend only when quoted separately.',
  },
  {
    key: '30k-75k', stage: 'application', name: 'Application', range: '₹30K – ₹75K', min: 30000, max: 75000,
    title: 'Standard Web App / Basic Mobile',
    summary: 'Authentication, database, user dashboards, and role management; or a basic mobile application with functional backend.',
    architecture: 'Authenticated app on a managed database (Firestore, PostgreSQL or Supabase) with secure API endpoints.',
    limits: 'No complex organisational hierarchies or automated enterprise billing.',
  },
  {
    key: '75k-150k', stage: 'platform', name: 'Advanced', range: '₹75K – ₹1.5L', min: 75000, max: 150000,
    title: 'Advanced App / Backend-Powered Mobile',
    summary: 'Multiple user roles, external API integrations, notifications, file storage, AI RAG systems, and complex workflows.',
    architecture: 'Role-based permissions, third-party APIs, background tasks, cloud storage and notification pipelines.',
    limits: 'Cloud runtime, API and provider usage fees stay with the provider.',
  },
  {
    key: '150k-400k', stage: 'product', name: 'Platform', range: '₹1.5L – ₹4L+', min: 150000, max: 400000,
    title: 'SaaS / Substantial Product',
    summary: 'Complete multi-tenant architecture, administrative suites, analytics, payments, webhooks, and production cloud infrastructure.',
    architecture: 'Multi-tenant organisation model, RBAC, subscription billing webhooks, super-admin tools, monitoring and logging.',
    limits: 'Ongoing cloud bills and payment-gateway processing fees are separate.',
  },
  {
    key: '400k-plus', stage: 'product', name: 'Enterprise', range: '₹4L+', min: 400000, max: Infinity,
    title: 'Large Custom Software & Specialised Systems',
    summary: 'Bespoke enterprise internal tooling, complex algorithms, custom AI models, microservices, and dedicated architectural build-outs.',
    architecture: 'Custom architecture shaped to your infrastructure, scoped milestone by milestone after technical review.',
    limits: 'Quoted per project after scoping; third-party infrastructure remains billed separately.',
  },
];
