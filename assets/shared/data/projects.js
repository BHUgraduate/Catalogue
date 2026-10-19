import { links } from './site.js';

// Only real, verifiable work. Tags are the actual tech from each project's repository.
// `image` is a real screenshot (eBook Pro, Android app). Never add mock-ups.
export const projects = [
  {
    slug: 'ebook-pro',
    name: 'eBook Pro',
    labels: ['Live', 'Product'],
    summary: 'A reader for people who study what they read: PDF, EPUB and text files with highlights, notes, flashcards, on-device OCR and translation.',
    problem: 'eBook Pro keeps what you learn from a book connected to the book.',
    tech: ['Flutter', 'Firebase', 'Google ML Kit', 'Cloud Functions'],
    links: [
      { label: 'Explore eBook Pro', href: links.ebookProSite },
      { label: 'Open the app', href: links.ebookProApp },
    ],
    image: { file: 'library-home.webp', alt: 'eBook Pro home screen with a Continue card and a library shelf of three books', width: 540, height: 1200 },
  },
  {
    slug: 'brainspark',
    name: 'BrainSpark',
    labels: ['Live', 'Product'],
    summary: 'AI-assisted exam preparation: build multi-topic mock tests, review answers and ask an AI tutor to explain mistakes.',
    problem: 'Practice tests are generic. BrainSpark builds them around your topics, difficulty and time, in English or Hindi.',
    tech: ['Flutter', 'Firebase Cloud Functions', 'Google Gemini', 'Secret Manager'],
    links: [{ label: 'Open BrainSpark', href: links.brainSpark }],
  },
  {
    slug: 'vaakboard',
    name: 'VaakBoard',
    labels: ['Live', 'Product'],
    summary: 'A native iOS keyboard for Sanskrit with IAST transliteration, phonetic input mapped to Devanāgarī and an offline lexicon.',
    problem: 'Typing Sanskrit on a phone is awkward. VaakBoard makes it a keyboard you can actually use.',
    tech: ['Swift', 'CoreData', 'Keyboard extension', 'Custom trie engine'],
    links: [{ label: 'See it in the portfolio', href: links.portfolio }],
  },
  {
    slug: 'portfolio',
    name: 'Hycyon Portfolio',
    labels: ['Engineering'],
    summary: 'The engineering and founder portfolio: projects, architecture and the thinking behind Hycyon.',
    problem: 'Where a technical buyer can verify the engineering behind the products.',
    tech: ['Static web', 'Tailwind CSS'],
    links: [{ label: 'View the portfolio', href: links.portfolio }],
  },
];
