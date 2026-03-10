export type FeaturedProject = {
  slug: string
  title: string
  kind: "Professional work" | "Side project"
  status: string
  liveUrl?: string
  summary: string
  problem: string
  approach: string
  detail: string
  stack: string[]
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "nda-protected-media-and-analytics-platform",
    title: "NDA-protected media and analytics platform",
    kind: "Professional work",
    status: "Redacted due to NDA",
    summary:
      "A deliberately redacted case study covering custom DRM, real-time video, analytics infrastructure, and compliance automation.",
    problem:
      "The platform had to protect content, support low-latency media workflows, process analytics data reliably, and automate parts of compliance without turning the system into a black box.",
    approach:
      "Treat rights enforcement, streaming, analytics, and compliance as one interconnected product system, while keeping the public description focused on engineering shape rather than confidential implementation detail.",
    detail:
      "This public version stays intentionally high-level. The relevant point is the range of system problems solved, not the specific internal product details.",
    stack: ["Custom DRM", "Real-time video", "Apache Kafka", "Apache Druid", "Applied ML"],
  },
  {
    slug: "ai-creator-chatbot-service",
    title: "@Boostx AI-driven creator chatbot service",
    kind: "Professional work",
    status: "Production",
    summary:
      "Product engineering for a chatbot service designed to strengthen how online content creators interact with their fans.",
    problem:
      "Creator communities need responsive fan interaction, payment flows, and conversational experiences that feel useful in production rather than impressive only in a demo.",
    approach:
      "Combine messaging integrations, monetization flows, and custom LLM deployment into a product that is operationally reliable and clear for both creators and fans.",
    detail:
      "The work covered the boundary between backend engineering and applied AI: deploying model-backed behavior, wiring product flows, and making the service practical to use.",
    stack: ["Telegram API", "Payments", "Custom LLM deployment", "AI chatbot service"],
  },
  {
    slug: "vennie-sales-automation-platform",
    title: "@Vennie sales automation platform",
    kind: "Professional work",
    status: "Production",
    summary:
      "Product work for an advanced AI-driven sales automation platform aimed at small and medium-sized enterprises.",
    problem:
      "A sales automation product needs model-backed workflows, secure account connectivity, outreach tooling, and internal prioritization systems that work beyond a demo environment.",
    approach:
      "Combine LLM-backed workflows, Gmail connectivity, payment flows, and lead-enrichment systems into a product that supports both user-facing automation and internal sales operations.",
    detail:
      "The work included lead and people enrichment, support-channel detection, deal pipeline tracking, task management, outreach workflows, and the integrations needed to make the platform practical in production.",
    stack: ["LLM integration", "Payments", "Gmail OAuth", "Lead enrichment", "RevOps automation"],
  },
  {
    slug: "aluung",
    title: "Aluung",
    kind: "Side project",
    status: "Live",
    liveUrl: "https://aluung.com/",
    summary:
      "A financial inclusion tool for informal savings groups, built to make contributions, records, and group visibility easier to manage.",
    problem:
      "Many community savings groups still rely on chat threads and handwritten records, which makes transparency and continuity difficult.",
    approach:
      "Start with the smallest workflow that helps a group stay organized, then expand only where the product reduces real friction.",
    detail:
      "Aluung is where product thinking matters most for me: practical software for people who need clarity more than complexity.",
    stack: ["Product design", "Full-stack development", "Payments exploration", "Community-centered UX"],
  },
]

export type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
  stack: string[]
  featured: boolean
}

export const experienceItems: ExperienceItem[] = [
  {
    company: "Bilin GmbH",
    role: "Software Developer",
    period: "Aug 2023 - Present",
    location: "Remote - Germany",
    summary:
      "Engineering work across custom DRM, real-time video, analytics infrastructure, and applied machine learning for media and compliance workflows.",
    highlights: [
      "Helped build a custom digital rights management system from scratch rather than relying on standard packaged DRM solutions.",
      "Implemented latency-critical real-time video services where system responsiveness was a product requirement, not an optimization afterthought.",
      "Built major parts of a Kafka- and Apache Druid-based analytics microservice and applied machine learning methods to automate content compliance screening.",
    ],
    stack: ["Apache Kafka", "Apache Druid", "Custom DRM", "Real-time video", "Applied ML", "Laravel", "Svelte", "Neo4j", "Meilisearch", "Redis", "Soketi", "Docker", "Coolify", "Cloudflare Realtimekit"],
    featured: true,
  },
  {
    company: "SIA Stayflo",
    role: "Software Developer",
    period: "Dec 2023 - Present",
    location: "Remote - Latvia",
    summary:
      "Client-facing product and internal operations work spanning product customization, AI sales automation, billing visibility, and RevOps automation.",
    highlights: [
      "Developed customizable profiles for hotels and restaurants for the stayflo app, improving how businesses presented themselves and engaged users.",
      "Built a billing system with real-time usage tracking, automated invoicing, and a financial dashboard for Punku.ai so clients could understand payments and product usage more independently.",
      "Built RevOps flows for Vennie to detect company ticket systems and support channels, enrich leads with company and people data, and connect deals to task management and outreach workflows.",
    ],
    stack: ["LLM integration", "Billing systems", "Gmail OAuth", "Payments", "RevOps automation", "Node.js", "Express.js", "MongoDB", "Docker", "Google Cloud Platform"],
    featured: true,
  },
  {
    company: "Oryx Capital Ltd",
    role: "Software Developer",
    period: "Jul 2024 - Mar 2025",
    location: "Remote - Bulgaria",
    summary:
      "Built product features for an AI-driven chatbot service that helped online content creators interact more effectively with their fans.",
    highlights: [
      "Worked on a chatbot product that combined conversational AI with real creator-to-fan engagement flows.",
      "Integrated Telegram API and payment-related workflows so messaging and monetization could live inside the same product experience.",
      "Worked on custom LLM deployment for production use, balancing applied AI behavior with practical engineering delivery.",
    ],
    stack: ["Telegram API", "Payments - Stripe & Viva payments", "Custom LLM deployment", "AI chatbot service", "Node.js", "Express.js", "MongoDB", "Docker", "Google Cloud Platform", "Redis", "Pusher", "SQLite", "Nextjs"],
    featured: true,
  },
  {
    company: "Nasia Tech",
    role: "Software Engineer Intern",
    period: "Mar 2022 - Aug 2022",
    location: "Remote - Cameroon",
    summary: "Earlier experience building software foundations in a team setting.",
    highlights: [],
    stack: ["Web development", "Backend fundamentals"],
    featured: false,
  },
  {
    company: "Ciniter",
    role: "Software Engineer Intern",
    period: "Jul 2021 - Dec 2021",
    location: "Remote - Cameroon",
    summary: "Early hands-on exposure to professional software delivery.",
    highlights: [],
    stack: ["Web development", "Team collaboration"],
    featured: false,
  },
]

export const focusAreas = [
  {
    title: "Backend and platform systems",
    description: "Reliable services, data flows, and product infrastructure that remain understandable once the first version is no longer enough.",
  },
  {
    title: "Media, analytics, and operations",
    description: "Streaming, compliance, analytics, and internal workflows where edge cases matter as much as happy paths.",
  },
  {
    title: "Practical product thinking",
    description: "Software that is intuitive for the people using it, not just interesting to build.",
  },
]

export const coreStack = [
  "Custom DRM",
  "Apache Druid",
  "Kafka",
  "Machine Learning",
  "Telegram API",
  "Payment integration",
  "Laravel",
  "Svelte",
  "PostgreSQL",
  "Node.js",
  "Neo4j",
  "Meilisearch",
  "Redis",
  "Soketi",
  "Docker",
]

export const nowItems = [
  {
    title: "Turning private work into public case studies",
    description:
      "I am documenting professional work in a way that explains the engineering decisions without exposing client-sensitive detail.",
  },
  {
    title: "Going deeper on data-intensive backend systems",
    description:
      "A lot of my attention is on streaming infrastructure, analytics pipelines, and service boundaries that stay maintainable under real product pressure.",
  },
  {
    title: "Refining Aluung",
    description:
      "I keep returning to financial inclusion workflows and trying to make the product smaller, clearer, and more useful.",
  },
  {
    title: "Writing shorter, more useful notes",
    description:
      "Instead of waiting for perfect long-form essays, I want to publish compact notes that are genuinely useful to other engineers.",
  },
]

export const upcomingNotes = [
  "What changes when you build DRM and streaming infrastructure instead of outsourcing it.",
  "Designing analytics services that stay understandable under Kafka- and Druid-heavy workloads.",
  "Building lead-enrichment and outreach workflows without turning operations into a black box.",
  "Designing operator-friendly workflows for billing and support tools.",
  "Building integration-heavy features without making debugging miserable.",
]

export const researchInterests = [
  "Distributed media systems and rights enforcement.",
  "Event-driven systems and integration reliability.",
  "Applied machine learning for compliance and workflow automation.",
  "Product design for financial inclusion and operational simplicity.",
  "Developer experience inside small, fast-moving teams.",
]
