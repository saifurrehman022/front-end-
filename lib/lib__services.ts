// Service catalogue. Each entry becomes a card on the site AND its own
// SEO landing page at /services/<slug>, included in the sitemap.

export type ServiceIcon = 'brain' | 'bot' | 'server' | 'image' | 'rocket' | 'plug' | 'compass'

export interface ServiceFaq {
  q: string
  a: string
}

export interface Service {
  slug: string
  icon: ServiceIcon
  name: string
  /** H1 on the landing page — written around the main search phrase */
  headline: string
  metaTitle: string
  metaDescription: string
  summary: string
  intro: string
  outcomes: string[]
  useCases: string[]
  deliverables: string[]
  stack: string[]
  faqs: ServiceFaq[]
}

export const services: Service[] = [
  {
    slug: 'rag-development',
    icon: 'brain',
    name: 'RAG & AI Chatbots',
    headline: 'RAG development: AI chatbots that answer from your own data',
    metaTitle: 'RAG Development Services — Custom AI Chatbots on Your Data',
    metaDescription:
      'Custom retrieval-augmented generation (RAG) development. Chat with PDFs, docs, spreadsheets and knowledge bases, with cited answers, streaming responses and secure auth.',
    summary: 'Chat with your PDFs, docs and knowledge base. Every answer cites its source.',
    intro:
      'We build retrieval-augmented generation systems that ground every answer in your documents instead of the model’s guesses. Ingestion, chunking, embeddings, vector search, prompt design and a streaming chat UI, delivered as one working product.',
    outcomes: [
      'Ingestion for PDF, DOCX, XLSX, CSV and scanned images (OCR)',
      'Vector search tuned for your content, with source citations on every answer',
      'Streaming responses with multi-turn conversation memory',
      'Model choice per use case: open-source or hosted LLMs',
      'Evaluation set so answer quality is measured, not assumed',
    ],
    useCases: ['Internal knowledge assistants', 'Customer support bots', 'Document Q&A for legal, finance and ops', 'Product documentation search'],
    deliverables: ['Ingestion pipeline', 'Vector store', 'Chat API', 'Chat UI', 'Evaluation report'],
    stack: ['Python', 'FastAPI', 'FAISS / pgvector', 'LangChain', 'Groq', 'Next.js'],
    faqs: [
      {
        q: 'What is RAG and why does my chatbot need it?',
        a: 'Retrieval-augmented generation searches your own documents first and gives the model only the relevant passages. The result is answers based on your data, with citations, instead of generic or invented replies.',
      },
      {
        q: 'Can the chatbot run on our own servers?',
        a: 'Yes. We can deploy on your cloud or on-prem with an open-source model, so documents never leave your infrastructure.',
      },
      {
        q: 'How long does a RAG project take?',
        a: 'A working prototype on your real documents usually takes one to two weeks. A production build with auth, monitoring and a polished UI typically takes three to six weeks, depending on scope.',
      },
    ],
  },
  {
    slug: 'ai-agent-development',
    icon: 'bot',
    name: 'AI Agents & Automation',
    headline: 'AI agent development that completes real multi-step work',
    metaTitle: 'AI Agent Development Services — Autonomous Agents & Workflow Automation',
    metaDescription:
      'Custom AI agent development: agents that plan, call tools and APIs, and complete multi-step tasks, with human approval gates, memory and full observability.',
    summary: 'Agents that plan, call your tools and finish multi-step tasks, with a human in the loop.',
    intro:
      'We design agents that do more than chat. They break a goal into steps, call your APIs and tools, check their own results and hand off to a person when an action is high-stakes. Every run is logged so you can see exactly what happened.',
    outcomes: [
      'Tool-calling agents connected to your APIs, databases and SaaS apps',
      'Approval gates before emails, payments or other irreversible actions',
      'Memory and state for long-running, multi-session tasks',
      'Run logs and traces for debugging and audit',
      'Guardrails, retries and cost limits per run',
    ],
    useCases: ['Lead research and enrichment', 'Content and publishing pipelines', 'Back-office data entry', 'Report generation'],
    deliverables: ['Agent architecture', 'Tool integrations', 'Approval workflow', 'Observability dashboard'],
    stack: ['Claude', 'OpenAI', 'LangGraph', 'smolagents', 'Python', 'Redis'],
    faqs: [
      {
        q: 'What is the difference between a chatbot and an AI agent?',
        a: 'A chatbot answers a message. An agent takes actions: it plans steps, calls tools and APIs, checks the results and keeps going until the task is done or it needs a person to approve the next step.',
      },
      {
        q: 'Are AI agents safe to run on business systems?',
        a: 'We scope permissions tightly, add approval gates for sensitive actions, cap spend per run and log every step, so the agent can only do what you have allowed.',
      },
    ],
  },
  {
    slug: 'runpod-gpu-deployment',
    icon: 'server',
    name: 'GPU & RunPod Deployment',
    headline: 'RunPod serverless deployment for AI models, with no idle GPU bill',
    metaTitle: 'RunPod Serverless Deployment — GPU Inference APIs for Any AI Model',
    metaDescription:
      'Deploy LLMs, diffusion, video, TTS and face models on RunPod serverless GPUs. Custom Docker workers, cold-start optimisation, autoscaling from zero and pay-per-second cost.',
    summary: 'Any model behind a fast serverless GPU API. Scale from zero, pay per second.',
    intro:
      'We package your model into a lean container, deploy it as a serverless GPU endpoint and tune it for fast cold starts. You get a clean API, autoscaling from zero and costs that follow real usage.',
    outcomes: [
      'Custom Docker workers for LLM, diffusion, video, TTS and vision models',
      'Cold-start optimisation with network volumes and model caching',
      'Autoscaling from zero based on queue depth',
      'Async job API with webhooks or polling',
      'Cost and latency benchmarks before go-live',
    ],
    useCases: ['Video and avatar generation APIs', 'Face swap and enhancement', 'Self-hosted LLM inference', 'Batch media processing'],
    deliverables: ['Container image', 'Serverless endpoint', 'API client', 'Deployment docs', 'Benchmark report'],
    stack: ['RunPod', 'Docker', 'CUDA', 'PyTorch', 'vLLM', 'Hugging Face'],
    faqs: [
      {
        q: 'Why use RunPod serverless instead of a dedicated GPU?',
        a: 'Serverless workers scale to zero when idle, so you pay only for seconds of real processing. For spiky or early-stage traffic that is usually far cheaper than renting a GPU around the clock.',
      },
      {
        q: 'Can you deploy an open-source GitHub model as an API?',
        a: 'Yes. We regularly turn research repositories into production endpoints: dependencies pinned, weights cached, inputs validated and outputs returned as files or URLs.',
      },
    ],
  },
  {
    slug: 'comfyui-generative-media',
    icon: 'image',
    name: 'ComfyUI Image & Video',
    headline: 'ComfyUI API development for image and video generation at scale',
    metaTitle: 'ComfyUI API Development — AI Image & Video Generation Pipelines',
    metaDescription:
      'Production ComfyUI backends: image generation, image-to-video, talking avatars and LoRA training, exposed as a versioned API with job queues and media storage.',
    summary: 'Image, video and avatar pipelines turned into an API your product can call.',
    intro:
      'We take ComfyUI workflows from the canvas to production. Workflows become versioned API endpoints with queueing, storage and delivery, so your app can generate images and video reliably at volume.',
    outcomes: [
      'ComfyUI workflows exposed as versioned REST endpoints',
      'Image-to-video, text-to-video and audio-driven avatar pipelines',
      'LoRA training for consistent characters and brand style',
      'Queueing, retries and progress updates for long jobs',
      'Storage and CDN delivery for generated media',
    ],
    useCases: ['Creator and content platforms', 'Marketing asset generation', 'AI influencer and avatar content', 'Product photography'],
    deliverables: ['Workflow API', 'GPU worker', 'Job queue', 'Media storage', 'Admin docs'],
    stack: ['ComfyUI', 'Stable Diffusion / Flux', 'Wan video', 'RunPod', 'S3', 'FFmpeg'],
    faqs: [
      {
        q: 'Can my existing ComfyUI workflow be turned into an API?',
        a: 'Yes. Send us the workflow JSON. We pin the custom nodes and models, deploy it on GPU workers and expose clean inputs and outputs for your app.',
      },
      {
        q: 'Do you build talking-avatar or lip-sync video?',
        a: 'Yes. We deploy audio-driven portrait and lip-sync models and combine them with image and video workflows into one pipeline.',
      },
    ],
  },
  {
    slug: 'ai-saas-mvp-development',
    icon: 'rocket',
    name: 'AI SaaS MVPs',
    headline: 'AI SaaS MVP development: from idea to paying users, fast',
    metaTitle: 'AI SaaS MVP Development — Full-Stack Next.js, FastAPI & Supabase',
    metaDescription:
      'Launch your AI SaaS MVP in weeks. Full-stack builds with Next.js, React, FastAPI and Supabase: auth, billing, dashboards, AI features and production deployment.',
    summary: 'Full-stack product with auth, billing and AI features, live in weeks.',
    intro:
      'We ship complete AI products: marketing site, app, backend, database, auth, payments and the AI features that make it valuable. You get a production codebase you fully own, not a throwaway prototype.',
    outcomes: [
      'Next.js / React front end with a polished, responsive UI',
      'FastAPI or Supabase backend with secure auth and roles',
      'Stripe subscriptions and usage-based billing',
      'AI features wired in: chat, generation, automation',
      'CI/CD and production deployment',
    ],
    useCases: ['Startup MVPs', 'Internal AI tools', 'Creator platforms', 'B2B dashboards'],
    deliverables: ['Production repo', 'Deployed app', 'Auth & billing', 'Admin panel', 'Handover docs'],
    stack: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Supabase', 'Stripe'],
    faqs: [
      {
        q: 'How fast can you build an MVP?',
        a: 'Most focused MVPs launch in four to eight weeks. We agree the scope up front and ship working builds weekly so you can test with users early.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do. The full repository, infrastructure and accounts are yours from day one.',
      },
    ],
  },
  {
    slug: 'ai-integration',
    icon: 'plug',
    name: 'AI Integration & APIs',
    headline: 'AI integration services: add AI to the tools you already use',
    metaTitle: 'AI Integration Services — Connect LLMs to Your Apps, APIs & Data',
    metaDescription:
      'Integrate AI into your existing product and workflows. OAuth integrations, webhooks, scheduled publishing, data pipelines and LLM features added to your current stack.',
    summary: 'LLM features, OAuth apps, webhooks and data pipelines added to your stack.',
    intro:
      'Most of the value of AI comes from connecting it to the systems you already run. We add AI features to your product and link it to third-party platforms through official APIs, OAuth and webhooks.',
    outcomes: [
      'OAuth integrations with third-party platforms',
      'Scheduling and automated publishing workflows',
      'Webhooks, queues and background jobs',
      'Data sync and ETL into AI-ready formats',
      'Rate-limit-aware, retry-safe API clients',
    ],
    useCases: ['Automated social and creator publishing', 'CRM and helpdesk AI', 'Document pipelines', 'Notification and reporting bots'],
    deliverables: ['Integration service', 'API clients', 'Job scheduler', 'Monitoring'],
    stack: ['TypeScript', 'Python', 'Supabase Edge Functions', 'OAuth 2.0', 'Webhooks', 'Queues'],
    faqs: [
      {
        q: 'Can you integrate AI into our existing app without a rebuild?',
        a: 'Yes. We work inside your current codebase and add AI features as services or endpoints alongside what already works.',
      },
    ],
  },
  {
    slug: 'ai-consulting',
    icon: 'compass',
    name: 'AI Consulting & Audits',
    headline: 'AI consulting: the right architecture before you spend on the build',
    metaTitle: 'AI Consulting & AI System Audits — Architecture, Cost & Quality Review',
    metaDescription:
      'Practical AI consulting: find high-ROI use cases, choose models and infrastructure, and audit existing AI systems for quality, latency, cost and security.',
    summary: 'Pick the right use case, models and infra, or fix an AI system that underperforms.',
    intro:
      'Before you commit budget, we help you choose what to build and how. For existing systems, we audit answer quality, latency, GPU cost and security, and hand you a prioritised fix list.',
    outcomes: [
      'Use-case discovery and ROI estimate',
      'Model, hosting and build-vs-buy recommendation',
      'Quality evaluation with a test set from your data',
      'Latency and GPU cost profiling',
      'Security review against the OWASP Top 10 for LLM apps',
    ],
    useCases: ['Pre-build planning', 'Rescuing stalled AI projects', 'Reducing inference cost', 'Pre-launch security review'],
    deliverables: ['Architecture plan', 'Cost model', 'Audit report', 'Prioritised roadmap'],
    stack: ['Evaluation harness', 'Profiling', 'OWASP LLM Top 10'],
    faqs: [
      {
        q: 'Do you offer a fixed-price discovery phase?',
        a: 'Yes. A short, fixed-scope discovery sprint produces an architecture plan and estimate you can use with us or any team.',
      },
    ],
  },
]

export const getService = (slug: string) => services.find(s => s.slug === slug)
