// Category order is display order. `strip` is the one-line scan text on the capability strip.
export const categories = [
  { id: 'websites', label: 'Websites', strip: 'Landing pages · Business sites · Portfolios', icon: 'web' },
  { id: 'web-apps', label: 'Web Apps', strip: 'Dashboards · SaaS · Portals · Workflows', icon: 'app' },
  { id: 'mobile', label: 'Mobile Apps', strip: 'Android · iOS · Cross-platform', icon: 'mobile' },
  { id: 'ai', label: 'AI Solutions', strip: 'Assistants · RAG · Intelligent workflows', icon: 'ai' },
  { id: 'extensions', label: 'Browser Extensions', strip: 'Chrome extensions · Automation', icon: 'ext' },
  { id: 'backend', label: 'Backend & Cloud', strip: 'Auth · Databases · APIs · Dashboards', icon: 'cloud' },
  { id: 'custom', label: 'Custom Software', strip: 'Bespoke systems · Internal tools', icon: 'custom' },
  { id: 'design', label: 'Design & Care', strip: 'UI refresh · Performance · Maintenance', icon: 'care' },
];
export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));
// The six headline capabilities shown right after the hero.
export const stripIds = ['websites', 'web-apps', 'mobile', 'ai', 'extensions', 'custom'];
