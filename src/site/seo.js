import { site, links } from '../shared/data/site.js';
import { services } from '../shared/data/services.js';
import { categoryById } from '../shared/data/categories.js';
import { faqGroups } from '../shared/data/faq.js';

const orgId = 'https://hycyon.com/#organization';
const org = { '@type': 'Organization', '@id': orgId, name: 'Hycyon', url: links.hycyon, email: site.email };
const websiteId = `${site.url}/#website`;
const website = { '@type': 'WebSite', '@id': websiteId, url: `${site.url}/`, name: 'Hycyon Catalogue', description: site.description, publisher: { '@id': orgId }, inLanguage: 'en' };

const serviceLd = (s) => ({
  '@type': 'Service',
  '@id': `${site.url}/services/${s.slug}/#service`,
  name: s.name,
  description: s.shortDesc,
  serviceType: categoryById[s.category].label,
  url: `${site.url}/services/${s.slug}/`,
  provider: { '@id': orgId },
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: s.minPrice, highPrice: s.maxPrice, description: 'Indicative range; final price confirmed after scope review.' },
});

const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${site.url}${path}` })),
});

export const homeLd = () => [
  org,
  website,
  {
    '@type': 'OfferCatalog',
    name: 'Hycyon software services',
    url: `${site.url}/`,
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${site.url}/services/${s.slug}/` } })),
  },
  {
    '@type': 'FAQPage',
    mainEntity: faqGroups.flatMap((g) => g.items).map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  },
];

export const servicePageLd = (s) => [org, website, serviceLd(s), breadcrumbs([['Catalogue', '/'], ['Services', '/services/'], [s.name, `/services/${s.slug}/`]])];
export const listPageLd = (name, path) => [org, website, breadcrumbs([['Catalogue', '/'], ['Services', '/services/'], ...(path === '/services/' ? [] : [[name, path]])])];
