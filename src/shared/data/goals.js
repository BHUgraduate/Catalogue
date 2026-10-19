// Guided recommendations. `question` is the visitor's own words; copy below is the original catalogue guidance.
/** @type {import('./types.js').Goal[]} */
export const goals = [
  {
    "key": "info",
    "question": "I just need an online presence",
    "hint": "Show information about me or my business",
    "title": "Informational Online Presence",
    "badge": "Recommended: Starter or Basic Website",
    "priceEstimate": "₹5,000 – ₹15,000",
    "summary": "If your primary goal is to present information about yourself, your services, or your business with a polished professional layout, a simple static website is the ideal, cost-effective solution.",
    "timeline": "2 to 8 working days",
    "serviceIds": [
      "starter-website",
      "basic-website"
    ],
    "category": "websites"
  },
  {
    "key": "contact",
    "question": "I want customers to contact me",
    "hint": "Lead forms, WhatsApp, enquiries",
    "title": "Lead Generation & Contact Inquiries",
    "badge": "Recommended: Basic or Business Website",
    "priceEstimate": "₹8,000 – ₹30,000",
    "summary": "You need an online presence that actively encourages visitors to get in touch. This requires clean contact sections, reliable form validation, WhatsApp click-to-chat triggers, and structured SEO.",
    "timeline": "4 days to 2 weeks",
    "serviceIds": [
      "basic-website",
      "business-website"
    ],
    "category": "websites"
  },
  {
    "key": "accounts",
    "question": "I need users to log in",
    "hint": "Accounts, portals, memberships",
    "title": "User Accounts & Authenticated Portals",
    "badge": "Recommended: Standard Web Application",
    "priceEstimate": "₹30,000 – ₹75,000",
    "summary": "Because users will log in and access private information, this is an interactive Web Application (not a simple website). It requires database modeling, authentication security, and session handling.",
    "timeline": "3 to 6 weeks",
    "serviceIds": [
      "standard-web-app",
      "advanced-web-app"
    ],
    "category": "web-apps"
  },
  {
    "key": "data",
    "question": "I need users to save information",
    "hint": "Notes, uploads, settings, records",
    "title": "User Data Persistence & Workflows",
    "badge": "Recommended: Standard or Advanced Web App",
    "priceEstimate": "₹30,000 – ₹1.5L",
    "summary": "Allowing users to save notes, upload files, configure settings, or track personal records requires a database layer (e.g. Firebase, PostgreSQL, Supabase) and custom CRUD APIs.",
    "timeline": "3 to 8 weeks",
    "serviceIds": [
      "standard-web-app",
      "advanced-web-app"
    ],
    "category": "web-apps"
  },
  {
    "key": "dashboard",
    "question": "I need an admin dashboard",
    "hint": "Manage records, customers and reports",
    "title": "Internal Tools & Admin Dashboards",
    "badge": "Recommended: Admin Dashboard or Web App",
    "priceEstimate": "₹20,000 – ₹75,000+",
    "summary": "Manage business records, review customer activity, and export reports with an administrative control panel built with intuitive data tables and secure permission gates.",
    "timeline": "2 to 5 weeks",
    "serviceIds": [
      "backend-dashboard",
      "standard-web-app"
    ],
    "category": "backend"
  },
  {
    "key": "mobile",
    "question": "I need an Android or iPhone app",
    "hint": "Native or cross-platform",
    "title": "Native or Cross-Platform Mobile App",
    "badge": "Recommended: Mobile App Package",
    "priceEstimate": "₹20,000 – ₹1.5L+",
    "summary": "Build applications optimized specifically for Android, iOS, or both platforms, featuring touch-optimized interfaces, push notifications, and device hardware integration.",
    "timeline": "4 to 10 weeks",
    "serviceIds": [
      "mobile-basic",
      "mobile-mvp",
      "mobile-backend"
    ],
    "category": "mobile"
  },
  {
    "key": "automation",
    "question": "I want to automate something",
    "hint": "Browser extensions and utilities",
    "title": "Workflow Automation & Extensions",
    "badge": "Recommended: Browser Extension or Custom Utility",
    "priceEstimate": "₹10,000 – ₹60,000",
    "summary": "Save hundreds of hours by automating repetitive web tasks, extracting website data, or creating browser extensions that streamline team actions.",
    "timeline": "1 to 4 weeks",
    "serviceIds": [
      "extension-basic",
      "extension-automation",
      "custom-utility"
    ],
    "category": "extensions"
  },
  {
    "key": "ai",
    "question": "I want AI inside my product",
    "hint": "Chatbots, document Q&A, summaries",
    "title": "AI Intelligence & Chatbots",
    "badge": "Recommended: AI Solution or RAG System",
    "priceEstimate": "₹15,000 – ₹1.5L+",
    "summary": "Integrate conversational assistants, document Q&A pipelines (RAG), automated summarization, or classification into your software. We clearly separate engineering fees from usage billing.",
    "timeline": "2 to 6 weeks",
    "serviceIds": [
      "ai-chatbot",
      "ai-rag",
      "ai-feature"
    ],
    "category": "ai"
  },
  {
    "key": "custom",
    "question": "I need something completely custom",
    "hint": "Specialised or unusual requirements",
    "title": "Completely Bespoke Software Architecture",
    "badge": "Recommended: Custom Software Exploration",
    "priceEstimate": "₹25,000 – ₹4L+",
    "summary": "For proprietary tools, specialized algorithms, or custom enterprise workflows that do not fit standard cookie-cutter templates. We review your scope and provide a milestone-driven quote.",
    "timeline": "Quoted after technical scoping",
    "serviceIds": [
      "custom-utility",
      "custom-prototype",
      "custom-enterprise"
    ],
    "category": "custom"
  },
  {
    "key": "ecommerce",
    "question": "I want to sell online",
    "hint": "Payments, orders and receipts",
    "title": "Digital or Physical Sales System",
    "badge": "Recommended: Business Web App with Payments",
    "priceEstimate": "₹25,000 – ₹75,000+",
    "summary": "Sell digital downloads, services, or physical items with payment gateway integration (Razorpay/Stripe), webhook handling, automated receipts, and order tracking.",
    "timeline": "3 to 6 weeks",
    "serviceIds": [
      "standard-web-app",
      "advanced-web-app"
    ],
    "category": "web-apps"
  }
];
