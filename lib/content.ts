// Home / About page content. Replace the "work" entries with real client
// projects (and add testimonials) as soon as you have permission to publish them.

export const work = [
  {
    tag: 'Generative video · GPU',
    title: 'Serverless AI video and avatar pipeline',
    desc: 'Image-to-video and audio-driven talking-avatar models deployed as autoscaling GPU workers, with a job API, progress tracking and media delivery.',
    stack: ['ComfyUI', 'RunPod', 'Docker', 'PyTorch'],
    metric: 'Scale from zero',
  },
  {
    tag: 'Computer vision · API',
    title: 'Face swap and enhancement API',
    desc: 'An open-source face model turned into a production endpoint: pinned dependencies, cached weights, input validation and fast cold starts.',
    stack: ['Python', 'ONNX', 'RunPod Serverless'],
    metric: 'Pay per second',
  },
  {
    tag: 'Creator platform · SaaS',
    title: 'AI content studio with automated publishing',
    desc: 'React and Supabase platform where creators generate media and schedule posts to a third-party platform through an OAuth integration.',
    stack: ['React', 'TypeScript', 'Supabase', 'OAuth 2.0'],
    metric: 'End-to-end product',
  },
  {
    tag: 'Enterprise RAG · Chat',
    title: 'Document chat with cited answers',
    desc: 'Retrieval-augmented chat over PDFs, Word and Excel files with streaming answers, conversation memory and JWT auth with refresh rotation.',
    stack: ['FastAPI', 'FAISS', 'Groq', 'Next.js'],
    metric: 'Source-cited answers',
  },
]

export const process = [
  { step: '01', title: 'Discovery call', desc: 'A free 30-minute call to understand the goal, the data and the constraints. You get an honest take on what will work.' },
  { step: '02', title: 'Scope & fixed quote', desc: 'A written plan with milestones, stack and a fixed price or capped estimate. No surprises.' },
  { step: '03', title: 'Build in weekly sprints', desc: 'Working software every week on a staging link, so you can test and redirect early.' },
  { step: '04', title: 'Launch & handover', desc: 'Production deployment, documentation and a walkthrough. You own the code and the accounts.' },
]

export const promises = [
  { value: '24h', label: 'Reply time', desc: 'Every enquiry gets a real answer within one business day.' },
  { value: 'Weekly', label: 'Demos', desc: 'Progress you can click, not status reports.' },
  { value: '100%', label: 'Code ownership', desc: 'Your repo, your cloud, your accounts. No lock-in.' },
  { value: 'Fixed', label: 'Scope & price', desc: 'Agreed up front, with milestones you approve.' },
]

export const homeFaqs = [
  {
    q: 'What kind of AI projects do you build?',
    a: 'RAG chatbots on company data, AI agents that automate multi-step work, GPU model deployment on RunPod serverless, ComfyUI image and video pipelines, and full-stack AI SaaS products with Next.js, FastAPI and Supabase.',
  },
  {
    q: 'How much does an AI development project cost?',
    a: 'It depends on scope. After a free discovery call we send a fixed quote or a capped estimate with clear milestones, so you know the cost before any work starts.',
  },
  {
    q: 'How long does it take to build an AI product?',
    a: 'Prototypes on your real data usually take one to two weeks. Production builds typically take three to eight weeks. You see working progress every week.',
  },
  {
    q: 'Can you work with our existing codebase and team?',
    a: 'Yes. We regularly add AI features to existing products, work in your repository and follow your conventions and review process.',
  },
  {
    q: 'Do we own the code and models you build?',
    a: 'Yes. All code, infrastructure and accounts belong to you, and we hand over documentation at launch.',
  },
]

export const team = [
  {
    name: 'Saif-Ur-Rehman',
    role: 'Founder & Lead AI Engineer',
    initials: 'SR',
    bio: 'Builds AI products end to end: RunPod GPU deployments, ComfyUI video pipelines, RAG systems and React / Supabase platforms.',
    tags: ['AI pipelines', 'GPU infra', 'Full-stack'],
  },
  {
    name: 'Ezio',
    role: 'Co-Founder & CTO',
    initials: 'EZ',
    bio: 'Owns backend architecture, APIs and security: FastAPI services, auth, data pipelines and the infrastructure that keeps them running.',
    tags: ['FastAPI', 'RAG', 'Architecture'],
  },
]

export const techStack = [
  'Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'MongoDB',
  'RunPod', 'Docker', 'PyTorch', 'ComfyUI', 'Hugging Face', 'LangChain', 'Claude', 'OpenAI',
  'Groq', 'FAISS', 'Three.js', 'Stripe',
]
