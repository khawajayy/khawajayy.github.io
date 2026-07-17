// ---------------------------------------------------------------
// Single source of truth for every section of the site.
// ---------------------------------------------------------------

export const identity = {
  name: "Hamza Sadiq",
  headline: ["Engineering Quality.", "Building Systems.", "Always Improving."],
  roles: [
    "Software Quality Engineer",
    "Automation Engineer",
    "AI Explorer",
    "Systems Thinker",
    "Long-term Investor",
    "Builder",
    "Fitness Optimizer",
  ],
  email: "khawajahamzasadiq@gmail.com",
  linkedin: "https://www.linkedin.com/in/khawajayy",
  github: "https://github.com/khawajayy",
  tagline: "This person doesn't just build software — he builds systems.",
};

export const philosophies = [
  { title: "Systems outperform motivation.", sub: "Motivation is weather. Systems are climate." },
  { title: "Automate repetitive work.", sub: "If it happens twice, it becomes a script." },
  { title: "Measure what matters.", sub: "Signal over noise. Metrics over opinions." },
  { title: "Quality is engineered.", sub: "It is designed in — never inspected in." },
  { title: "Curiosity compounds.", sub: "Small daily questions become deep expertise." },
  { title: "Learning never stops.", sub: "Every day ships a slightly better version." },
];

export const osModules = [
  {
    id: "career",
    icon: "◈",
    name: "career.sys",
    title: "Career",
    status: "RUNNING",
    detail:
      "ISTQB-certified QA Engineer, 5+ years across healthcare, FinTech, and SaaS. Currently SQA Analyst at Harris CareTracker. Builds the safety nets that let teams ship fast without breaking things.",
  },
  {
    id: "learning",
    icon: "◎",
    name: "learning.daemon",
    title: "Learning",
    status: "ALWAYS ON",
    detail:
      "A background process that never terminates. Currently consuming: AI engineering, system design, cloud architecture. One new thing per day, minimum.",
  },
  {
    id: "fitness",
    icon: "▲",
    name: "fitness.engine",
    title: "Fitness",
    status: "SCHEDULED",
    detail:
      "Training treated like CI — consistent, automated, non-negotiable. Progressive overload as a deployment strategy for the body.",
  },
  {
    id: "ai",
    icon: "✦",
    name: "ai.lab",
    title: "AI",
    status: "EXPERIMENTAL",
    detail:
      "Exploring how LLMs reshape testing and building. Prototyping agents, evaluating models, and learning the engineering behind the magic.",
  },
  {
    id: "investing",
    icon: "◇",
    name: "invest.compound",
    title: "Investing",
    status: "LONG-TERM",
    detail:
      "Patient capital, boring strategy, decades-long horizon. The same compounding principle that powers learning, applied to money.",
  },
  {
    id: "travel",
    icon: "◍",
    name: "travel.map",
    title: "Travel",
    status: "EXPLORING",
    detail:
      "Different countries are different test environments for life. Collecting perspectives, not just stamps.",
  },
  {
    id: "productivity",
    icon: "⌘",
    name: "focus.scheduler",
    title: "Productivity",
    status: "OPTIMIZED",
    detail:
      "Deep work blocks, ruthless prioritization, and automation of everything repetitive. Time is the only non-renewable resource.",
  },
  {
    id: "books",
    icon: "❐",
    name: "library.index",
    title: "Books",
    status: "READING",
    detail:
      "A book a week when possible. Psychology, systems, engineering, finance. Reading is downloading someone else's decade of experience.",
  },
  {
    id: "mindset",
    icon: "◉",
    name: "mindset.kernel",
    title: "Mindset",
    status: "KERNEL",
    detail:
      "The root process everything else runs on: long-term thinking, first principles, and quiet consistent execution over loud sporadic effort.",
  },
];

export const missions = [
  { label: "Becoming an AI Engineer", progress: 62, status: "ACTIVE" },
  { label: "Mastering Automation", progress: 84, status: "ACTIVE" },
  { label: "Learning System Design", progress: 55, status: "ACTIVE" },
  { label: "Building useful AI tools", progress: 48, status: "BUILDING" },
  { label: "Growing long-term investments", progress: 71, status: "COMPOUNDING" },
  { label: "Building an exceptional physique", progress: 68, status: "TRAINING" },
  { label: "Reading every week", progress: 90, status: "STREAK" },
  { label: "Improving every day", progress: 100, status: "ALWAYS" },
];

export const timeline = [
  {
    era: "FinTech",
    role: "Software Engineer QA — i2c Inc.",
    period: "Aug 2021 — Sep 2022",
    detail:
      "Started where a cent of imprecision is a compliance incident. Tested enterprise payment platforms for global banks — card issuing, authorization, and settlement. Validated 3D Secure, fraud prevention, and compliance features supporting Visa/Mastercard certification, and resolved 40+ client-reported issues through structured root-cause analysis.",
    stack: ["Visa", "Mastercard", "3DS", "API Testing", "Settlement"],
  },
  {
    era: "Healthcare",
    role: "Software QA Engineer — CureMD",
    period: "Sep 2022 — May 2024",
    detail:
      "Learned that quality is life-critical. Validated HIPAA-compliant EMR and practice-management workflows — billing, scheduling, claims, clinical — for a global healthcare platform. Built Selenium + Java regression automation for charge-creation and claim-filing, led defect triage across an 11-engineer team, and earned the Excellent Performance Award in year one.",
    stack: ["HIPAA", "EMR", "Selenium + Java", "Claims", "Triage Lead"],
  },
  {
    era: "Startup Leadership",
    role: "Lead QA Engineer — We Over I",
    period: "May 2024 — Jun 2025",
    detail:
      "Owned quality across four products spanning healthcare, travel, and consumer tech. Automated end-to-end regression with Playwright + TypeScript, grew test coverage from 30% to 90%, authored 700+ test cases, safeguarded 20+ production releases, and mentored engineers on test design and defect prevention.",
    stack: ["Playwright", "TypeScript", "Python", "30%→90% Coverage", "Mentorship"],
  },
  {
    era: "Now",
    role: "SQA Analyst — Harris CareTracker (Contour Software)",
    period: "Jul 2025 — Present",
    detail:
      "Own EDI compliance testing for ANSI X12 837P claims and 835 remittance files on a HIPAA-regulated EMR platform. SQL-based backend validation across billing, scheduling, and claims — and applying LLM-assisted analysis to speed up defect investigation and test documentation. The AI era begins.",
    stack: ["ANSI X12 837/835", "EDI", "SQL", "HIPAA", "AI-assisted QA"],
  },
];

export const roadmap = [
  { step: "Software QA Engineer", state: "done" },
  { step: "Automation Engineer", state: "current" },
  { step: "Senior Automation Engineer", state: "next" },
  { step: "AI Engineer", state: "next" },
  { step: "Technical Leader", state: "future" },
  { step: "Entrepreneur", state: "future" },
];

export type Skill = {
  id: string;
  name: string;
  x: number; // 0..100 position in galaxy
  y: number;
  size: number; // planet radius px
  hue: "blue" | "cyan" | "violet" | "amber";
  exp: string;
  projects: string;
  desc: string;
  links: string[]; // ids of connected skills
};

export const skills: Skill[] = [
  { id: "playwright", name: "Playwright", x: 30, y: 26, size: 34, hue: "cyan", exp: "Primary automation weapon", projects: "E2E suites across web platforms", desc: "Fast, reliable browser automation. The backbone of the regression safety net.", links: ["typescript", "cicd", "automation"] },
  { id: "typescript", name: "TypeScript", x: 50, y: 14, size: 38, hue: "blue", exp: "Daily driver language", projects: "Frameworks, tooling, test infra", desc: "Types are tests that run at compile time. Everything is written in it.", links: ["playwright", "api", "cicd"] },
  { id: "selenium", name: "Selenium", x: 12, y: 44, size: 26, hue: "violet", exp: "Selenium + Java at CureMD", projects: "Charge-creation & claim-filing suites", desc: "Where the automation journey began — Java regression suites for healthcare workflows.", links: ["automation"] },
  { id: "api", name: "API Testing", x: 68, y: 30, size: 32, hue: "blue", exp: "REST + GraphQL, request-level", projects: "Payments, healthcare integrations", desc: "The UI lies, the API doesn't. REST, GraphQL, contract, and negative testing.", links: ["postman", "sql", "typescript"] },
  { id: "sql", name: "SQL", x: 84, y: 48, size: 30, hue: "cyan", exp: "MySQL & SQL Server forensics", projects: "Claims data, billing validation", desc: "When the bug hides in the data, SQL is the flashlight. Backend validation before every release.", links: ["api"] },
  { id: "python", name: "Python", x: 34, y: 90, size: 26, hue: "violet", exp: "Automation scripting", projects: "Tooling behind the test suites", desc: "The glue language — scripting that supports broader automation efforts.", links: ["automation"] },
  { id: "gha", name: "GitHub Actions", x: 26, y: 66, size: 28, hue: "blue", exp: "Pipeline engineering", projects: "Scheduled suites, PR gates", desc: "Quality gates that never sleep. If it merges, it was tested.", links: ["cicd", "playwright"] },
  { id: "jmeter", name: "JMeter", x: 58, y: 78, size: 24, hue: "amber", exp: "Load testing", projects: "Throughput validation", desc: "Finding the point where systems bend before production finds it first.", links: ["perf", "k6"] },
  { id: "k6", name: "k6", x: 72, y: 66, size: 24, hue: "amber", exp: "Modern performance", projects: "Scripted load scenarios", desc: "Performance tests as code, versioned like everything else.", links: ["perf", "jmeter"] },
  { id: "postman", name: "Postman", x: 88, y: 22, size: 24, hue: "violet", exp: "API exploration", projects: "Collections, monitors", desc: "The lab bench for every new API before automation locks it down.", links: ["api"] },
  { id: "cicd", name: "CI / CD", x: 42, y: 50, size: 34, hue: "cyan", exp: "Automation-first delivery", projects: "Full pipeline quality gates", desc: "The system that makes quality continuous instead of a phase.", links: ["gha", "playwright", "typescript", "azure"] },
  { id: "perf", name: "Performance", x: 66, y: 90, size: 26, hue: "amber", exp: "Latency & load analysis", projects: "Release performance sign-off", desc: "Speed is a feature. Slowness is a defect.", links: ["jmeter", "k6"] },
  { id: "azure", name: "Azure DevOps", x: 14, y: 84, size: 26, hue: "blue", exp: "Enterprise pipelines", projects: "Boards, repos, releases", desc: "Where enterprise delivery lives — pipelines, traceability, test plans.", links: ["cicd"] },
  { id: "automation", name: "Automation", x: 44, y: 34, size: 40, hue: "cyan", exp: "The core philosophy", projects: "Everything repetitive", desc: "The sun of this galaxy. Every other planet orbits it.", links: ["playwright", "selenium", "cicd"] },
];

export const stats = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Test Cases Authored", value: 700, suffix: "+" },
  { label: "Test Coverage Reached", value: 90, suffix: "%" },
  { label: "Releases Validated", value: 20, suffix: "+" },
  { label: "Client Issues Resolved", value: 40, suffix: "+" },
  { label: "Coverage Growth", value: 3, suffix: "×" },
  { label: "Production Products", value: 4, suffix: "" },
  { label: "Engineers Led in Triage", value: 11, suffix: "" },
];

export type Project = {
  id: string;
  name: string;
  domain: string;
  tag: string;
  summary: string;
  story: string;
  stack: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    id: "healthcare-automation",
    name: "Healthcare QA & EDI Compliance",
    domain: "Healthcare",
    tag: "Mission Critical",
    summary: "HIPAA EMR validation, claims automation, and ANSI X12 837/835 compliance.",
    story:
      "Healthcare software fails quietly and hurts loudly. At CureMD: validated HIPAA-compliant EMR and practice-management workflows and built Selenium + Java regression automation for charge-creation and claim-filing. Now at Harris CareTracker: owning EDI compliance for ANSI X12 837P claims and 835 remittance files, with SQL-based backend validation catching claims-processing errors before release.",
    stack: ["HIPAA", "ANSI X12 837/835", "EDI", "Selenium + Java", "SQL", "EMR"],
    accent: "#4da3ff",
  },
  {
    id: "payment-processing",
    name: "Payment Processing QA",
    domain: "FinTech — i2c Inc.",
    tag: "Zero Tolerance",
    summary: "Card issuing, authorization, settlement, and 3DS for global banks.",
    story:
      "Money doesn't forgive rounding errors. Tested enterprise payment processing platforms for global banks — card issuing, authorization, and settlement workflows. Validated 3D Secure, fraud prevention, and compliance features supporting Visa and Mastercard certification, and resolved 40+ client-reported issues through structured root-cause analysis.",
    stack: ["Visa", "Mastercard", "3DS", "Fraud Prevention", "API Testing", "Settlement"],
    accent: "#22d3ee",
  },
  {
    id: "startup-qa",
    name: "Startup QA Leadership",
    domain: "We Over I",
    tag: "30% → 90%",
    summary: "Led quality across four products — coverage tripled, 700+ test cases, 20+ releases.",
    story:
      "Four products across healthcare, travel, and consumer tech — including a Chrome extension and the Visit Kurdistan tourism platform. Automated end-to-end regression with Playwright + TypeScript, grew coverage from 30% to 90%, authored 700+ test cases spanning UI, API, business logic, and integrations, and mentored engineers so quality started earlier in the dev cycle.",
    stack: ["Playwright", "TypeScript", "Python", "Test Strategy", "Mentorship"],
    accent: "#a78bfa",
  },
  {
    id: "ai-pulse",
    name: "AI Pulse",
    domain: "Side Project",
    tag: "AI",
    summary: "A personal radar for the AI ecosystem — models, tools, and research, distilled.",
    story:
      "The AI space moves faster than any human can read. AI Pulse aggregates, filters, and summarizes what actually matters — a signal engine for staying current without drowning.",
    stack: ["AI", "LLMs", "TypeScript", "Automation"],
    accent: "#4da3ff",
  },
  {
    id: "plan-my-day",
    name: "Plan My Day",
    domain: "Side Project",
    tag: "Productivity",
    summary: "An intelligent daily planner that turns priorities into a realistic schedule.",
    story:
      "Motivation-based planning fails by 10am. Plan My Day applies systems thinking to the calendar — energy-aware scheduling, automatic timeboxing, and honest capacity math.",
    stack: ["TypeScript", "AI", "Product Design"],
    accent: "#f5c153",
  },
  {
    id: "circuit-breaker",
    name: "Circuit Breaker",
    domain: "Side Project",
    tag: "Engineering",
    summary: "Resilience-pattern experiments — failing gracefully by design.",
    story:
      "A playground for resilience engineering: circuit breakers, retries, backoff, and chaos experiments. Because systems that can't fail safely eventually fail loudly.",
    stack: ["System Design", "Resilience", "APIs"],
    accent: "#f97066",
  },
  {
    id: "solarly",
    name: "Solarly",
    domain: "Side Project",
    tag: "Clean Tech",
    summary: "Exploring solar economics — payback modeling made simple and honest.",
    story:
      "Solar quotes are confusing on purpose. Solarly models real payback timelines, compounding energy savings, and honest break-even math — investing principles applied to sunlight.",
    stack: ["Modeling", "Data Viz", "TypeScript"],
    accent: "#22d3ee",
  },
];

export const aiLab = {
  experiments: [
    { title: "LLM-assisted test generation", note: "Can a model draft the boring 80% of test cases?" },
    { title: "Self-healing locators", note: "Selectors that repair themselves when the DOM shifts." },
    { title: "AI code review for test suites", note: "An agent that reviews flakiness patterns." },
  ],
  ideas: [
    { title: "Autonomous regression agent", note: "Point it at a build, get a risk report." },
    { title: "Quality copilot", note: "Chat with your test results instead of reading dashboards." },
    { title: "Synthetic user swarms", note: "Agent crowds that explore like real users do." },
  ],
  learning: [
    { title: "Prompt & context engineering", note: "The new API design." },
    { title: "Evals & model benchmarking", note: "QA instincts applied to AI outputs." },
    { title: "Agent architectures", note: "Tools, memory, planning loops." },
  ],
  problems: [
    { title: "Testing non-deterministic systems", note: "How do you assert on a model?" },
    { title: "Flakiness as a data problem", note: "Mining CI history for root causes." },
  ],
};

export const fitness = {
  rings: [
    { label: "Strength", value: 78 },
    { label: "Consistency", value: 92 },
    { label: "Nutrition", value: 74 },
    { label: "Recovery", value: 70 },
    { label: "Mobility", value: 58 },
    { label: "Discipline", value: 95 },
  ],
  streak: 47,
  mission: "Build an athletic physique.",
};

export const investingPrinciples = [
  { title: "Think long term.", note: "Decades, not quarters." },
  { title: "Compound patiently.", note: "The eighth wonder works slowly, then suddenly." },
  { title: "Ignore noise.", note: "Headlines are entertainment, not information." },
  { title: "Invest consistently.", note: "Automation applies to capital too." },
  { title: "Stay rational.", note: "Temperament beats intellect." },
];

export const books = [
  { title: "Atomic Habits", author: "James Clear", spine: "#4da3ff", summary: "Systems beat goals. Identity drives behavior. 1% better compounds into transformation — the operating manual for continuous improvement." },
  { title: "The Psychology of Money", author: "Morgan Housel", spine: "#22d3ee", summary: "Wealth is behavior, not spreadsheets. Patience, humility, and room for error matter more than any stock pick." },
  { title: "Deep Work", author: "Cal Newport", spine: "#a78bfa", summary: "Focus is the superpower of the century. Schedule depth, embrace boredom, quit the shallows." },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", spine: "#f5c153", summary: "Seek wealth not status. Build specific knowledge, use leverage, and play long-term games with long-term people." },
  { title: "Clean Code", author: "Robert C. Martin", spine: "#f97066", summary: "Code is read far more than it's written. Clarity is a professional obligation, not a preference." },
  { title: "The Pragmatic Programmer", author: "Hunt & Thomas", spine: "#34d17b", summary: "Care about your craft. Automate everything. DRY. Fix broken windows before they define the neighborhood." },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", spine: "#4da3ff", summary: "Your brain runs two systems, and the fast one is confidently wrong. Debugging human cognition." },
  { title: "The Intelligent Investor", author: "Benjamin Graham", spine: "#22d3ee", summary: "Margin of safety. Mr. Market is manic — serve him, never obey him." },
];

export const credentials = [
  { title: "ISTQB Certified Tester — Foundation Level (CTFL)", kind: "Certification" },
  { title: "BSc Computer Science — COMSATS University Islamabad", kind: "Education" },
];

export const learningTopics = [
  "Artificial Intelligence",
  "Automation",
  "Cloud",
  "System Design",
  "Backend Engineering",
  "Architecture",
];

export const travel = {
  visited: [
    { name: "Pakistan", lat: 30.4, lon: 69.3 },
    { name: "United States", lat: 39.8, lon: -98.6 },
    { name: "Canada", lat: 56.1, lon: -106.3 },
    { name: "United Arab Emirates", lat: 24.0, lon: 54.0 },
    { name: "Saudi Arabia", lat: 23.9, lon: 45.1 },
    { name: "Turkey", lat: 39.0, lon: 35.2 },
    { name: "United Kingdom", lat: 54.0, lon: -2.5 },
  ],
  dreams: [
    { name: "Japan", lat: 36.2, lon: 138.3 },
    { name: "Switzerland", lat: 46.8, lon: 8.2 },
    { name: "New Zealand", lat: -40.9, lon: 174.9 },
    { name: "Iceland", lat: 64.9, lon: -19.0 },
    { name: "Singapore", lat: 1.35, lon: 103.8 },
  ],
};

export const achievements = [
  { title: "Coverage: 30% → 90%", note: "Tripled test coverage across four production products at We Over I." },
  { title: "700+ test cases authored", note: "UI, API, business logic, and integration workflows." },
  { title: "ISTQB Certified Tester", note: "Foundation Level (CTFL) — the craft, formalized." },
  { title: "Excellent Performance Award", note: "Earned in year one at CureMD for high-impact quality work." },
  { title: "Healthcare & FinTech depth", note: "HIPAA, HL7, ANSI X12, EDI 837/835 — and Visa/Mastercard 3DS certification support." },
  { title: "Led defect triage at scale", note: "Coordinated testing across an 11-engineer team through release sign-off." },
  { title: "AI-assisted QA in production", note: "LLM-based analysis speeding up defect investigation and test documentation." },
];

// ------------------------- Terminal ---------------------------

export const terminalResponses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about       who is hamza",
    "  skills      technical arsenal",
    "  projects    things built",
    "  career      the journey so far",
    "  future      the roadmap",
    "  fitness     the training system",
    "  investing   the compounding machine",
    "  travel      places & plans",
    "  books       the library",
    "  ai          current obsession",
    "  resume      download resume",
    "  contact     reach out",
    "  clear       clear terminal",
    "",
    "Hidden commands exist. Explore.",
  ],
  about: [
    "> hamza.about()",
    "ISTQB-certified QA Engineer — 5+ years across",
    "healthcare, FinTech, and SaaS.",
    "Builds systems instead of relying on motivation.",
    "Believes quality is engineered, not inspected.",
    "Runs on curiosity, coffee, and compounding.",
  ],
  skills: [
    "> skills.list()",
    "Playwright (TS/JS) · Selenium (Java) · Python",
    "REST & GraphQL APIs · Postman · Insomnia · SQL",
    "JMeter · k6 · Jira · Azure DevOps · CI/CD",
    "HIPAA · HL7 · ANSI X12 · EDI 837/835",
    "Core: Automation-first thinking + AI-assisted QA.",
  ],
  projects: [
    "> projects.load()",
    "[healthcare]  Claims, Scheduling, HL7, ANSI X12 automation",
    "[fintech]     Visa / Mastercard / 3DS payment testing",
    "[startup]     QA leadership & playbook from zero",
    "[side]        AI Pulse · Plan My Day · Circuit Breaker · Solarly",
  ],
  career: [
    "> career.timeline()",
    "i2c Inc. (FinTech) → CureMD (Healthcare) →",
    "We Over I (Lead QA) → Harris CareTracker (Now)",
    "Pattern: each era added a new form of leverage.",
  ],
  future: [
    "> roadmap.render()",
    "QA Engineer → Automation Engineer → Senior Automation",
    "→ AI Engineer → Technical Leader → Entrepreneur",
    "Status: compounding...",
  ],
  fitness: [
    "> fitness.status()",
    "streak: 47 days",
    "mission: build an athletic physique",
    "philosophy: training is CI/CD for the body",
  ],
  investing: [
    "> portfolio.philosophy()",
    "Think long term. Compound patiently. Ignore noise.",
    "Invest consistently. Stay rational.",
    "Time in market > timing the market.",
  ],
  travel: [
    "> travel.map()",
    "visited: 7 countries",
    "queued: Japan, Switzerland, New Zealand, Iceland, Singapore",
  ],
  books: [
    "> library.recent()",
    "Atomic Habits · Psychology of Money · Deep Work",
    "Naval's Almanack · Clean Code · Pragmatic Programmer",
    "cadence: ~1 book / week",
  ],
  ai: [
    "> ai.current_focus()",
    "LLM-assisted testing · agent architectures · evals",
    "Thesis: AI doesn't replace QA — it multiplies it.",
  ],
  resume: [
    "> resume.download()",
    "Fetching /Hamza-Sadiq-Resume.pdf ...",
    "Done. Check your downloads.",
  ],
  contact: [
    "> contact.channels()",
    "email:    khawajahamzasadiq@gmail.com",
    "linkedin: /in/khawajayy",
    "github:   /khawajayy",
  ],
  whoami: ["guest — but you're welcome here."],
  "42": [
    "The answer to life, the universe, and everything.",
    "Unfortunately the question was never covered by a test case.",
    "// TODO: write regression test for existence",
  ],
};

// ------------------------- Ask Hamza AI ------------------------

export const aiKnowledge: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["who", "hamza", "about", "yourself", "intro"],
    answer:
      "Hamza Sadiq is an ISTQB-certified QA Engineer with 5+ years across healthcare, FinTech, and SaaS. He's built regression automation with Playwright and Selenium, taken test coverage from 30% to 90%, and authored 700+ test cases across four production products. His core belief: don't rely on motivation, build systems. He's also an AI enthusiast, long-term investor, and fitness optimizer.",
  },
  {
    keywords: ["project", "built", "work", "portfolio"],
    answer:
      "Hamza's work spans healthcare QA and EDI compliance (HIPAA EMR validation, ANSI X12 837/835 claims, Selenium automation at CureMD and Harris CareTracker), FinTech payment testing at i2c (card issuing, settlement, 3DS, Visa/Mastercard certification), and QA leadership at We Over I where he took coverage from 30% to 90% across four products. Side projects include AI Pulse, Plan My Day, Circuit Breaker, and Solarly. Scroll to the Projects section for the full stories.",
  },
  {
    keywords: ["skill", "technolog", "stack", "tool", "know", "playwright", "typescript"],
    answer:
      "His arsenal: Playwright (TypeScript/JavaScript), Selenium (Java), Python, REST & GraphQL API testing, Postman, Insomnia, SQL (MySQL, SQL Server), JMeter, k6, Jira, Azure DevOps, and CI/CD — plus deep compliance expertise in HIPAA, HL7, ANSI X12, and EDI 837/835. The unifying theme is automation — if a task repeats, it gets scripted. Check out the Skills Galaxy to explore them as planets.",
  },
  {
    keywords: ["why ai", "ai", "artificial intelligence", "llm", "machine learning"],
    answer:
      "Hamza sees AI as the biggest multiplier of his career. His thesis: AI won't replace quality engineers — it will multiply the good ones. He's currently experimenting with LLM-assisted test generation, self-healing locators, and agent architectures, on the path to becoming an AI Engineer.",
  },
  {
    keywords: ["test", "philosophy", "quality", "qa", "approach"],
    answer:
      "His testing philosophy: quality is engineered, not inspected. Automate everything repetitive, measure what matters, and build the safety nets that let teams ship fast. A test suite should be a system that works while you sleep.",
  },
  {
    keywords: ["learn", "studying", "course", "book", "reading"],
    answer:
      "Right now he's learning AI engineering, system design, cloud architecture, and backend engineering. He reads roughly a book a week — recent favorites include Atomic Habits, The Psychology of Money, and Deep Work. Learning is treated as a daemon process: always running.",
  },
  {
    keywords: ["contact", "reach", "email", "hire", "linkedin", "github", "touch"],
    answer:
      "You can reach Hamza at khawajahamzasadiq@gmail.com, or connect on LinkedIn (/in/khawajayy) and GitHub (@khawajayy) — links are in the Contact section. If you're hiring: try typing 'sudo hire hamza' in the terminal. 😉",
  },
  {
    keywords: ["invest", "money", "stock", "finance", "compound"],
    answer:
      "Hamza is a long-term investor. Philosophy over portfolio: think in decades, compound patiently, ignore noise, invest consistently, stay rational. He treats investing like automation — set the system up correctly and let time do the work.",
  },
  {
    keywords: ["fitness", "gym", "workout", "train", "health"],
    answer:
      "Fitness is treated like CI/CD for the body — consistent, scheduled, non-negotiable. Current mission: build an athletic physique. Current streak: 47 days. The same systems thinking that powers his engineering powers his training.",
  },
  {
    keywords: ["career", "journey", "experience", "history", "background"],
    answer:
      "The journey: i2c Inc. (FinTech payments — where precision is everything) → CureMD (healthcare QA — where quality is life-critical, plus an Excellent Performance Award in year one) → We Over I (Lead QA — coverage from 30% to 90% across four products) → today: SQA Analyst at Harris CareTracker owning EDI compliance and applying AI-assisted QA. Next stops on the roadmap: Senior Automation Engineer → AI Engineer → Technical Leader → Entrepreneur.",
  },
  {
    keywords: ["travel", "country", "visited", "globe"],
    answer:
      "Hamza has visited 7 countries so far, with Japan, Switzerland, New Zealand, Iceland, and Singapore on the dream list. Spin the globe in the Travel section to explore.",
  },
];

export const aiFallback =
  "Good question — that's outside my current training data. Try asking about Hamza's projects, skills, testing philosophy, AI work, career, books, fitness, or how to contact him. Or explore the terminal below: type 'help'.";
