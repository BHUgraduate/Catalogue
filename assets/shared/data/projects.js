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
    summary: 'Mock tests for competitive exams, generated around your exam and your topics: SSC, UPSC, JEE, NEET, banking and more, with an explanation for every answer and an AI tutor.',
    problem: 'Ready-made test series cover everything and nothing in particular. BrainSpark builds the paper from the exam you chose and the topics you need, in English or Hindi. Questions are AI-generated, so answers should be checked against study material.',
    tech: ['Flutter', 'Firebase Cloud Functions', 'Google Gemini', 'Secret Manager'],
    links: [{ label: 'Open BrainSpark', href: links.brainSpark }],
  },
  {
    slug: 'vaakboard',
    name: 'VaakBoard',
    labels: ['Coming soon', 'Product'],
    summary: 'A precision input system for Sanskrit. The transliteration engine is tested and running in a web demo today; the native iOS keyboard is coming soon.',
    problem: 'Typing Sanskrit on a phone is a linguistics problem before it is a layout problem: conjuncts, vowel signs and fast lookup all have to be right.',
    tech: ['JavaScript engine', 'Swift', 'Keyboard extension', 'Custom trie'],
    links: [
      { label: 'Read the case study', href: links.portfolio + 'case-studies/vaakboard/' },
      { label: 'Try the web demo', href: links.portfolio + 'sanskrit-keyboard.html' },
    ],
  },
  {
    slug: 'irons-irony',
    name: "iron's irony",
    labels: ['Client project', 'Web'],
    summary: 'A website for a fabricator of gates, railings, balconies and staircases, with its own identity and a project consultation that accepts a photo, a sketch or a rough measurement.',
    problem: 'Custom, site-specific work is hard to ask for. The site lets a visitor start without a finished brief. No results are claimed yet; real project photos and customer feedback are still to come.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    links: [
      { label: 'Read the case study', href: links.portfolio + 'case-studies/irons-irony/' },
      { label: "Visit iron's irony", href: links.ironsIrony },
    ],
  },
];
