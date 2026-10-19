// Service catalogue data — single source of truth for cards, filters, detail pages, quote prefill.
// Prices are indicative INR ranges. minPrice/maxPrice drive budget filtering; priceDisplay is what visitors read.
/** @type {import('./types.js').Service[]} */
export const services = [
  {
    "slug": "starter-website",
    "category": "websites",
    "name": "Starter Website",
    "priceDisplay": "₹5,000 – ₹7,000",
    "minPrice": 5000,
    "maxPrice": 7000,
    "shortDesc": "A clean, high-performance personal or local service web presence with zero unnecessary fluff.",
    "bestFor": "Students, individuals, local services, very small businesses, and simple personal portfolios.",
    "includes": [
      "1 to 3 simple, mobile-friendly pages",
      "Responsive layout adapted for phones, tablets & desktop",
      "Customer-provided text & images formatting",
      "Contact information section & direct WhatsApp/call CTA",
      "Basic social links & brand navigation",
      "Fast static deployment assistance (e.g. Firebase/Vercel/Netlify)"
    ],
    "notIncluded": [
      "User accounts or login systems",
      "Database storage or dynamic customer data",
      "Admin dashboard or CMS management",
      "Payment gateway or shopping cart",
      "Complex physics animations or custom backend"
    ],
    "timeline": "2–5 working days",
    "addons": [
      "Additional static page",
      "custom domain setup"
    ],
    "platform": "Web"
  },
  {
    "slug": "basic-website",
    "category": "websites",
    "name": "Basic Website",
    "priceDisplay": "₹8,000 – ₹15,000",
    "minPrice": 8000,
    "maxPrice": 15000,
    "shortDesc": "Up to 5 pages of professional presentation with polished styling and SEO fundamentals.",
    "bestFor": "Independent professionals, consultants, executive portfolios, and established small businesses.",
    "includes": [
      "Up to approximately 5 distinct pages",
      "Fully responsive design with custom visual styling",
      "Integrated contact section with functional form",
      "Basic SEO metadata tags & Open Graph configuration",
      "Speed optimization & deployment assistance"
    ],
    "notIncluded": [
      "User authentication or user accounts",
      "Database records or user-generated content",
      "E-commerce transaction engine"
    ],
    "timeline": "4–8 working days",
    "addons": [
      "Headless CMS blog",
      "extra pages",
      "analytics setup"
    ],
    "platform": "Web"
  },
  {
    "slug": "business-website",
    "category": "websites",
    "name": "Business Website",
    "priceDisplay": "₹15,000 – ₹30,000",
    "minPrice": 15000,
    "maxPrice": 30000,
    "shortDesc": "Comprehensive commercial web presence with interactive components, galleries, and maps.",
    "bestFor": "Growing companies, agencies, clinics, firms, and service providers needing richer presentation.",
    "includes": [
      "Approximately 5 to 10 pages",
      "Tailored custom design & branded typography hierarchy",
      "Interactive media galleries, contact forms, and map embeds",
      "Social media integrations & lead generation flows",
      "Rich micro-interactions and performance optimization",
      "Full deployment & custom domain connection"
    ],
    "notIncluded": [
      "Full SaaS user management",
      "Complex custom backend architecture (unless quoted separately)"
    ],
    "timeline": "1–2 weeks",
    "addons": [
      "CMS integration",
      "multilingual toggle",
      "newsletter capture"
    ],
    "platform": "Web"
  },
  {
    "slug": "premium-website",
    "category": "websites",
    "name": "Premium Website",
    "priceDisplay": "₹30,000 – ₹60,000+",
    "minPrice": 30000,
    "maxPrice": 60000,
    "shortDesc": "Bespoke UI, advanced animations, CMS/backend integrations, and exceptional speed.",
    "bestFor": "Funded startups, high-end brands, and businesses requiring exceptional design standards.",
    "includes": [
      "Highly customized UI and tailored brand design system",
      "Advanced interactive sections & purposeful micro-motion",
      "CMS or custom backend integration where required",
      "Top-tier Lighthouse performance and Core Web Vitals optimization",
      "Responsive optimization across all viewport form-factors",
      "Assisted launch with production caching setup"
    ],
    "notIncluded": [
      "Third-party software subscription licenses or paid plugins"
    ],
    "timeline": "2–5 weeks",
    "addons": [
      "E-commerce cart",
      "custom API connections",
      "priority SLA"
    ],
    "platform": "Web"
  },
  {
    "slug": "mini-web-app",
    "category": "web-apps",
    "name": "Mini Web App",
    "priceDisplay": "₹15,000 – ₹30,000",
    "minPrice": 15000,
    "maxPrice": 30000,
    "shortDesc": "A focused, interactive single-purpose tool, calculation engine, or utility.",
    "bestFor": "Specific business calculators, onboarding quote generators, converters, or focused tools.",
    "includes": [
      "Targeted application logic and interactive state machine",
      "Responsive utility interface with instant calculation / output",
      "Client-side state or local persistence",
      "Clean validation & error handling",
      "Deployment to scalable serverless web infrastructure"
    ],
    "notIncluded": [
      "Multi-tenant user authentication",
      "Complex database schema or role management"
    ],
    "timeline": "1–3 weeks",
    "addons": [
      "Export to PDF",
      "backend database sync",
      "third-party webhook"
    ],
    "platform": "Web"
  },
  {
    "slug": "standard-web-app",
    "category": "web-apps",
    "name": "Standard Web App",
    "priceDisplay": "₹30,000 – ₹75,000",
    "minPrice": 30000,
    "maxPrice": 75000,
    "shortDesc": "Dynamic web software with user accounts, database persistence, and secure dashboard.",
    "bestFor": "Internal operations tools, customer portals, membership applications, and booking systems.",
    "includes": [
      "User authentication (Email/Password or OAuth)",
      "Structured database schema (Firestore / PostgreSQL / Supabase)",
      "Authenticated user workflows & personalized views",
      "Responsive admin dashboard for record inspection",
      "Secure API endpoints and data validation"
    ],
    "notIncluded": [
      "Complex multi-tier organizational hierarchies",
      "Enterprise automated billing/invoicing integrations"
    ],
    "timeline": "3–6 weeks",
    "addons": [
      "Razorpay/Stripe billing",
      "email automation",
      "automated exports"
    ],
    "platform": "Web"
  },
  {
    "slug": "advanced-web-app",
    "category": "web-apps",
    "name": "Advanced Web App",
    "priceDisplay": "₹75,000 – ₹1.5L+",
    "minPrice": 75000,
    "maxPrice": 150000,
    "shortDesc": "Feature-rich web software with granular user roles, external APIs, and complex workflows.",
    "bestFor": "Startups with operational complexity, B2B dashboards, and multi-user productivity software.",
    "includes": [
      "Multiple user roles & granular permission controls",
      "Third-party API integrations & scheduled background tasks",
      "Cloud storage pipelines (image uploads, document parsing)",
      "In-app notification system & activity audits",
      "Advanced multi-metric reporting dashboards",
      "Hardened security rules and indexing"
    ],
    "notIncluded": [
      "Third-party cloud runtime or compute monthly usage fees"
    ],
    "timeline": "5–10 weeks",
    "addons": [
      "AI integration",
      "mobile app companion",
      "automated backup system"
    ],
    "platform": "Web"
  },
  {
    "slug": "saas-platform",
    "category": "web-apps",
    "name": "SaaS / Platform",
    "priceDisplay": "₹1.5L – ₹4L+",
    "minPrice": 150000,
    "maxPrice": 400000,
    "shortDesc": "Production-ready software-as-a-service with multi-tenancy, subscription billing, and admin suites.",
    "bestFor": "Commercial software founders and businesses launching scalable SaaS products.",
    "includes": [
      "Multi-user / multi-tenant organizational architecture",
      "Accounts, teams, role-based access control (RBAC)",
      "Automated subscription/billing webhook flows",
      "Comprehensive super-admin moderation suite",
      "Production-grade cloud architecture & load optimization",
      "Comprehensive API error monitoring & logging hooks"
    ],
    "notIncluded": [
      "Ongoing cloud infrastructure bills and payment gateway processing fees"
    ],
    "timeline": "2–5 months",
    "addons": [
      "Custom AI copilot",
      "dedicated mobile companion",
      "custom domain for tenants"
    ],
    "platform": "Web"
  },
  {
    "slug": "mobile-mvp",
    "category": "mobile",
    "name": "Mobile MVP / Prototype",
    "priceDisplay": "₹20,000 – ₹50,000",
    "minPrice": 20000,
    "maxPrice": 50000,
    "shortDesc": "Rapid mobile prototype to validate concepts, demo to stakeholders, or run early user testing.",
    "bestFor": "Founders pitching to investors or testing core workflow feasibility on mobile devices.",
    "includes": [
      "Core visual screens and primary user flow",
      "Smooth touch-first responsive design for Android or iOS",
      "Mock or local state handling",
      "Interactive prototype build ready for device testing"
    ],
    "notIncluded": [
      "Full production backend integration",
      "App Store / Play Store review management"
    ],
    "timeline": "2–4 weeks",
    "addons": [
      "Firebase connection",
      "push notifications"
    ],
    "platform": "Mobile"
  },
  {
    "slug": "mobile-basic",
    "category": "mobile",
    "name": "Basic Mobile App",
    "priceDisplay": "₹40,000 – ₹80,000",
    "minPrice": 40000,
    "maxPrice": 80000,
    "shortDesc": "Complete functional standalone mobile application with clean UI and device capabilities.",
    "bestFor": "Internal field tools, content apps, or simple customer-facing utilities.",
    "includes": [
      "Native or cross-platform application (Android / iOS)",
      "Intuitive touch UI components and responsive navigation",
      "Local persistence or simple cloud data fetching",
      "App icon and launch screen configuration",
      "Build generation for testing or store submission"
    ],
    "notIncluded": [
      "Apple Developer ($99/yr) or Google Play ($25) account registration fees"
    ],
    "timeline": "4–7 weeks",
    "addons": [
      "Cross-platform twin build",
      "custom backend sync"
    ],
    "platform": "Mobile"
  },
  {
    "slug": "mobile-backend",
    "category": "mobile",
    "name": "Backend-Powered Mobile App",
    "priceDisplay": "₹75,000 – ₹1.5L",
    "minPrice": 75000,
    "maxPrice": 150000,
    "shortDesc": "Mobile app fully synced with live cloud database, user accounts, and push notifications.",
    "bestFor": "On-demand services, booking apps, social community tools, and e-commerce apps.",
    "includes": [
      "User accounts & authentication on mobile",
      "Real-time database integration (Firebase / Supabase / REST)",
      "Push notification pipeline setup",
      "Offline caching & optimistic UI updates",
      "Submission assistance to Google Play or Apple App Store"
    ],
    "notIncluded": [
      "Store listing guarantee (final approval rests with Apple/Google guidelines)"
    ],
    "timeline": "6–10 weeks",
    "addons": [
      "In-app purchases",
      "advanced location tracking",
      "payment gateway"
    ],
    "platform": "Mobile"
  },
  {
    "slug": "mobile-product",
    "category": "mobile",
    "name": "Advanced Product Mobile App",
    "priceDisplay": "₹1.5L – ₹3L+",
    "minPrice": 150000,
    "maxPrice": 300000,
    "shortDesc": "Enterprise-grade mobile application with deep device integrations and real-time syncing.",
    "bestFor": "Serious consumer products, fintech interfaces, and high-volume mobile platforms.",
    "includes": [
      "Simultaneous Android and iOS deployment",
      "Deep device integration (Camera, Biometrics, Secure Enclave, Location)",
      "Real-time bi-directional sockets or stream subscriptions",
      "Robust crash analytics & performance monitoring integration",
      "Complete store asset generation & deployment guidance"
    ],
    "notIncluded": [
      "Ongoing cloud runtime and third-party API subscriptions"
    ],
    "timeline": "2–4 months",
    "addons": [
      "AI model inference on-device",
      "multi-language localization"
    ],
    "platform": "Mobile"
  },
  {
    "slug": "extension-basic",
    "category": "extensions",
    "name": "Basic Browser Extension",
    "priceDisplay": "₹10,000 – ₹20,000",
    "minPrice": 10000,
    "maxPrice": 20000,
    "shortDesc": "A Chrome extension that extracts information from web pages or modifies local browser behavior.",
    "bestFor": "Researchers, marketers, or personal productivity shortcuts.",
    "includes": [
      "Manifest V3 compliant Chrome / Edge extension",
      "Page content reader / web scraper for current tab",
      "Clean popup UI for controls and output",
      "Local browser storage for preferences and saved items",
      "Developer package (.zip) ready for sideloading or Web Store"
    ],
    "notIncluded": [
      "Chrome Web Store developer account fee ($5 one-time)"
    ],
    "timeline": "1–2 weeks",
    "addons": [
      "Export to CSV/JSON",
      "Firefox port"
    ],
    "platform": "Browser"
  },
  {
    "slug": "extension-api",
    "category": "extensions",
    "name": "API-Connected Extension",
    "priceDisplay": "₹20,000 – ₹40,000",
    "minPrice": 20000,
    "maxPrice": 40000,
    "shortDesc": "Extension that communicates with your server, authenticated API, or CRM system.",
    "bestFor": "Teams integrating web tools directly with Notion, Airtable, HubSpot, or internal backends.",
    "includes": [
      "Secure token storage & authenticated API communication",
      "Context menu integrations & background service worker syncing",
      "Interactive sidebar or modal overlay on target websites",
      "Resilient network error handling and retry logic"
    ],
    "notIncluded": [
      "External SaaS subscription costs"
    ],
    "timeline": "2–4 weeks",
    "addons": [
      "User license key validation",
      "multi-browser support"
    ],
    "platform": "Browser"
  },
  {
    "slug": "extension-ai",
    "category": "extensions",
    "name": "Advanced / AI Extension",
    "priceDisplay": "₹40,000 – ₹1.25L+",
    "minPrice": 40000,
    "maxPrice": 125000,
    "shortDesc": "AI-assisted browser tool for on-page summarization, automated writing, and smart analysis.",
    "bestFor": "AI writing assistants, web research tools, and intelligence copilots.",
    "includes": [
      "LLM API integration (OpenAI, Claude, Gemini)",
      "On-page content extraction & streaming response UI",
      "Prompt template management & user history",
      "Side-panel integration in Manifest V3"
    ],
    "notIncluded": [
      "AI model token consumption fees (billed directly to your API key)"
    ],
    "timeline": "3–6 weeks",
    "addons": [
      "Vector search across visited tabs",
      "user login / subscription gating"
    ],
    "platform": "Browser"
  },
  {
    "slug": "extension-automation",
    "category": "extensions",
    "name": "Business Automation Extension",
    "priceDisplay": "₹20,000 – ₹60,000+",
    "minPrice": 20000,
    "maxPrice": 60000,
    "shortDesc": "Automates repetitive browser workflows, form filling, and multi-portal data transfer.",
    "bestFor": "Operations teams, data entry reduction, and cross-portal synchronization.",
    "includes": [
      "Multi-step automated DOM interaction scripts",
      "Bulk data injection & export workflows",
      "Custom delay & anti-throttling timing controls",
      "Error log visualizer and task resumption"
    ],
    "notIncluded": [
      "Bypassing unauthorized site security or illegal scraping"
    ],
    "timeline": "2–5 weeks",
    "addons": [
      "Cloud sync of automation jobs",
      "scheduled triggers"
    ],
    "platform": "Browser"
  },
  {
    "slug": "ai-feature",
    "category": "ai",
    "name": "AI Feature Integration",
    "priceDisplay": "₹15,000 – ₹40,000",
    "minPrice": 15000,
    "maxPrice": 40000,
    "shortDesc": "Add specific intelligence into an existing product: summarization, classification, or generation.",
    "bestFor": "Products needing smart summaries, automated tags, translations, or content drafting.",
    "includes": [
      "Engineered prompt pipelines with system boundaries",
      "Structured JSON output validation from LLMs",
      "Clean frontend UI components with loading and retry states",
      "API key security isolation (preventing client leakage)"
    ],
    "notIncluded": [
      "Third-party AI token usage fees (billed directly by LLM vendor)"
    ],
    "timeline": "1–3 weeks",
    "addons": [
      "Multi-model fallback logic",
      "caching layer to reduce token bills"
    ],
    "platform": "AI"
  },
  {
    "slug": "ai-chatbot",
    "category": "ai",
    "name": "AI Chatbot Assistant",
    "priceDisplay": "₹30,000 – ₹80,000",
    "minPrice": 30000,
    "maxPrice": 80000,
    "shortDesc": "Custom AI conversational agent trained on your business knowledge and website guidelines.",
    "bestFor": "Customer support deflection, 24/7 lead capture, and conversational guidance.",
    "includes": [
      "Brand-aligned conversational prompt instructions",
      "Responsive chat widget embeddable on any website",
      "Session memory and chat history handling",
      "Fallback to human contact / email capture form"
    ],
    "notIncluded": [
      "Model provider API token costs"
    ],
    "timeline": "2–4 weeks",
    "addons": [
      "Admin chat log viewer",
      "WhatsApp bot integration"
    ],
    "platform": "AI"
  },
  {
    "slug": "ai-rag",
    "category": "ai",
    "name": "Document Q&A / RAG System",
    "priceDisplay": "₹50,000 – ₹1.5L+",
    "minPrice": 50000,
    "maxPrice": 150000,
    "shortDesc": "Retrieval-Augmented Generation that searches your private PDFs, manuals, and documents.",
    "bestFor": "Legal firms, medical reference, technical documentation, and enterprise knowledge bases.",
    "includes": [
      "Document parsing pipeline (PDF, Markdown, DOCX)",
      "Vector database integration (Pinecone, Chroma, pgvector)",
      "Semantic search with source citation and page references",
      "Hallucination-reduction prompt architecture"
    ],
    "notIncluded": [
      "Cloud vector hosting costs"
    ],
    "timeline": "4–8 weeks",
    "addons": [
      "Role-based document access",
      "multi-file bulk ingest"
    ],
    "platform": "AI"
  },
  {
    "slug": "ai-app",
    "category": "ai",
    "name": "AI-Centric Application",
    "priceDisplay": "₹1L – ₹3L+",
    "minPrice": 100000,
    "maxPrice": 300000,
    "shortDesc": "Full software product designed natively around AI models, agentic steps, and intelligence.",
    "bestFor": "AI-first startups, automated content engines, and intelligent research workspaces.",
    "includes": [
      "Complete frontend, backend, and AI pipeline orchestration",
      "User accounts, usage quotas, and rate limiting",
      "Streaming text, audio, or vision model integration",
      "Payment gateway integration for AI credit packs"
    ],
    "notIncluded": [
      "Third-party cloud and inference costs"
    ],
    "timeline": "6–12 weeks",
    "addons": [
      "Fine-tuning pipeline",
      "custom model evaluation benchmark"
    ],
    "platform": "AI"
  },
  {
    "slug": "backend-auth",
    "category": "backend",
    "name": "Authentication Architecture",
    "priceDisplay": "₹8,000 – ₹25,000",
    "minPrice": 8000,
    "maxPrice": 25000,
    "shortDesc": "Secure, modern user sign-in and authorization implementation.",
    "bestFor": "Applications needing rock-solid security without building it from scratch.",
    "includes": [
      "Email/Password, Google OAuth, Magic Links, or OTP",
      "Secure session management, JWT or HTTP-only cookies",
      "Password reset flows and email verification",
      "Protected route middleware"
    ],
    "notIncluded": [
      "SMS gateway balance (e.g. Twilio charges)"
    ],
    "timeline": "3–7 working days",
    "addons": [
      "Multi-factor authentication (MFA)",
      "role-based permissions"
    ],
    "platform": "Backend"
  },
  {
    "slug": "backend-db",
    "category": "backend",
    "name": "Database Architecture & Setup",
    "priceDisplay": "₹10,000 – ₹30,000",
    "minPrice": 10000,
    "maxPrice": 30000,
    "shortDesc": "Professional relational (PostgreSQL) or document (Firestore/MongoDB) schema design.",
    "bestFor": "Ensuring your app’s data layer is fast, scalable, and correctly modeled from day one.",
    "includes": [
      "Normalized relational or NoSQL schema architecture",
      "Database indexes for high-frequency queries",
      "Security rules and access control validation",
      "Initial migration scripts and sample seeding"
    ],
    "notIncluded": [
      "Cloud database hosting subscription"
    ],
    "timeline": "1–2 weeks",
    "addons": [
      "Automated backup scripts",
      "point-in-time recovery setup"
    ],
    "platform": "Backend"
  },
  {
    "slug": "backend-api",
    "category": "backend",
    "name": "REST / GraphQL API Development",
    "priceDisplay": "₹15,000 – ₹50,000+",
    "minPrice": 15000,
    "maxPrice": 50000,
    "shortDesc": "High-speed, documented server endpoints to power web and mobile clients.",
    "bestFor": "Connecting web apps, mobile clients, and partner services to your database.",
    "includes": [
      "Clean RESTful or GraphQL endpoint architecture",
      "Input validation, sanitization, and structured HTTP error responses",
      "Interactive API documentation (Swagger / Postman collection)",
      "Rate limiting and CORS security policies"
    ],
    "notIncluded": [
      "Virtual private server hosting charges"
    ],
    "timeline": "2–4 weeks",
    "addons": [
      "Webhook distribution system",
      "caching layer (Redis)"
    ],
    "platform": "Backend"
  },
  {
    "slug": "backend-dashboard",
    "category": "backend",
    "name": "Custom Admin Dashboard",
    "priceDisplay": "₹20,000 – ₹75,000+",
    "minPrice": 20000,
    "maxPrice": 75000,
    "shortDesc": "Internal portal to manage customers, inspect database records, and monitor activity.",
    "bestFor": "Business operators who need visual control over backend records without opening code.",
    "includes": [
      "Authentication-gated administrative layout",
      "CRUD (Create, Read, Update, Delete) tables with filtering",
      "Data export to CSV / Excel",
      "Key metric overview cards and activity logs"
    ],
    "notIncluded": [
      "Customer-facing application UI"
    ],
    "timeline": "2–5 weeks",
    "addons": [
      "Audit logs",
      "bulk operations",
      "role delegation"
    ],
    "platform": "Backend"
  },
  {
    "slug": "custom-utility",
    "category": "custom",
    "name": "Custom Utility / Automation",
    "priceDisplay": "₹10,000 – ₹30,000",
    "minPrice": 10000,
    "maxPrice": 30000,
    "shortDesc": "Targeted script, CLI tool, or desktop utility to automate a specific business workflow.",
    "bestFor": "Data formatting, bulk file converters, system reconcilers, and repetitive operations.",
    "includes": [
      "Engineered script or executable for Windows / macOS / Linux",
      "Clear configuration file & logging output",
      "Error recovery and handling edge cases",
      "Documentation & setup walkthrough"
    ],
    "notIncluded": [
      "Complex visual GUI (unless requested in scope)"
    ],
    "timeline": "1–2 weeks",
    "addons": [
      "Simple graphical interface",
      "scheduled cron configuration"
    ],
    "platform": "Custom"
  },
  {
    "slug": "custom-prototype",
    "category": "custom",
    "name": "Research / Concept Prototype",
    "priceDisplay": "₹25,000 – ₹75,000",
    "minPrice": 25000,
    "maxPrice": 75000,
    "shortDesc": "Proof-of-concept software to test technical feasibility of a novel idea.",
    "bestFor": "Founders, researchers, and inventors validating untried technical workflows.",
    "includes": [
      "Architecture exploration and technical feasibility report",
      "Functional prototype demonstrating the core algorithmic mechanic",
      "Source code with annotated technical documentation",
      "Next-steps roadmap for production scaling"
    ],
    "notIncluded": [
      "Full production security hardening or SLA"
    ],
    "timeline": "2–4 weeks",
    "addons": [
      "Benchmark report",
      "presentation demo deck"
    ],
    "platform": "Custom"
  },
  {
    "slug": "custom-enterprise",
    "category": "custom",
    "name": "Complex / Enterprise Custom Software",
    "priceDisplay": "₹1L – ₹4L+",
    "minPrice": 100000,
    "maxPrice": 400000,
    "shortDesc": "End-to-end bespoke software built precisely around unique organizational workflows.",
    "bestFor": "Companies with non-standard requirements that off-the-shelf software cannot solve.",
    "includes": [
      "Custom architecture tailored to your infrastructure",
      "Comprehensive data modeling, security rules, and user roles",
      "Automated tests for critical workflows",
      "Staging environment setup and production deployment",
      "Post-launch warranty and bug-fix support period"
    ],
    "notIncluded": [
      "Third-party cloud infrastructure hosting bills"
    ],
    "timeline": "2–5 months",
    "addons": [
      "Dedicated SLA",
      "custom training workshop"
    ],
    "platform": "Custom"
  },
  {
    "slug": "design-refresh",
    "category": "design",
    "name": "UI / UX Refresh",
    "priceDisplay": "₹10,000 – ₹30,000",
    "minPrice": 10000,
    "maxPrice": 30000,
    "shortDesc": "Modernize an outdated website or application interface without breaking your backend.",
    "bestFor": "Existing products that look outdated, have clumsy mobile navigation, or low conversions.",
    "includes": [
      "Design tokens upgrade (typography, color palettes, spacing)",
      "Mobile responsiveness fixes and tap target adjustments",
      "Cleaner buttons, forms, and modern cards",
      "Removal of visual clutter and contrast optimization"
    ],
    "notIncluded": [
      "Complete rewrite of underlying server code"
    ],
    "timeline": "1–3 weeks",
    "addons": [
      "Accessibility audit",
      "dark mode theme addition"
    ],
    "platform": "Web"
  },
  {
    "slug": "maintenance-monthly",
    "category": "design",
    "name": "Monthly Maintenance & Care",
    "priceDisplay": "₹5,000 – ₹20,000 / mo",
    "minPrice": 5000,
    "maxPrice": 20000,
    "shortDesc": "Ongoing developer retainer for updates, security patches, minor tweaks, and monitoring.",
    "bestFor": "Businesses that want peace of mind without hiring a full-time in-house developer.",
    "includes": [
      "Regular software dependency & framework security updates",
      "Uptime & error monitoring checks",
      "Allocated developer hours each month for minor enhancements",
      "Priority direct email response"
    ],
    "notIncluded": [
      "Building entirely new major features (quoted separately)"
    ],
    "timeline": "Monthly ongoing agreement",
    "addons": [
      "Overnight SLA",
      "off-hours emergency support"
    ],
    "platform": "Web"
  },
  {
    "slug": "perf-optimization",
    "category": "design",
    "name": "Performance & Speed Optimization",
    "priceDisplay": "₹5,000 – ₹40,000+",
    "minPrice": 5000,
    "maxPrice": 40000,
    "shortDesc": "Eliminate sluggish load times, reduce bundle weight, and fix Google Core Web Vitals.",
    "bestFor": "Websites losing customers or SEO rankings due to slow loading speeds.",
    "includes": [
      "Bundle size analysis and elimination of dead code",
      "Image compression and modern WebP / AVIF conversions",
      "Critical CSS inlining & render-blocking script deferral",
      "Before-and-after Lighthouse performance audit"
    ],
    "notIncluded": [
      "Upgrading substandard shared web hosting servers"
    ],
    "timeline": "3–8 working days",
    "addons": [
      "CDN edge caching configuration"
    ],
    "platform": "Web"
  }
];
