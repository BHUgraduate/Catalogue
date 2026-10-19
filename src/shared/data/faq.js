export const faqGroups = [
  {
    id: 'pricing', label: 'Pricing',
    items: [
      { q: 'Can I get a website for ₹5,000–₹7,000?', a: 'Yes, provided your requirements fit the Starter Website scope: 1 to 3 simple, mobile-friendly pages with your content, social links, and a direct WhatsApp/contact CTA. It does not include a custom backend, database, user authentication, or complex interactive state.' },
      { q: 'Is the listed price final?', a: 'No. Prices shown are indicative starting figures and expected ranges. A formal quotation is issued only after reviewing your exact scope, expected user load, design requirements, and external integrations.' },
    ],
  },
  {
    id: 'infrastructure', label: 'Infrastructure & ownership',
    items: [
      { q: 'Does the price include domain and hosting?', a: 'No. Third-party infrastructure costs (domain registration, cloud hosting, Firebase paid tiers, Apple Developer and Play Store fees) are billed directly by their providers, so you keep 100% legal ownership of your digital property. Deployment assistance and configuration are included as outlined in each package.' },
      { q: 'Can you connect Firebase and integrate custom REST APIs?', a: 'Yes. Firebase Auth, Firestore, Cloud Functions, and external REST/GraphQL APIs can be implemented cleanly with error boundaries and data caching.' },
    ],
  },
  {
    id: 'development', label: 'Development',
    items: [
      { q: 'Can I start small and add features later?', a: 'Yes. We build modular systems. Moving from a static informational website to a dynamic web application with accounts and databases does need architectural scaffolding, so we design systems cleanly so additions do not mean throwing away previous work.' },
      { q: 'Do you build Android and iOS apps?', a: 'Yes. Depending on your budget and requirements, apps can be developed natively or with cross-platform frameworks to deploy to both Android and iOS.' },
    ],
  },
  {
    id: 'ai', label: 'AI',
    items: [
      { q: 'How are AI costs structured? (Dev vs API fees)', a: 'We strictly separate development costs from third-party AI consumption charges. Our fee covers the software engineering, prompt pipeline, vector database integration, UI, and security. Model providers (OpenAI, Anthropic, Google) charge by token volume or API calls; those usage fees are paid by you directly to the provider.' },
    ],
  },
  {
    id: 'maintenance', label: 'Maintenance',
    items: [
      { q: 'Do you provide ongoing maintenance and redesigns?', a: 'Yes, as optional work separate from the initial build. Monthly maintenance starts from ₹5,000–₹20,000/month and covers dependency updates, monitoring, bug fixes, and minor adjustments. UI refreshes and redesigns are available as standalone projects.' },
    ],
  },
];
