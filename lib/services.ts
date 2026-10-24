// Service catalogue. Each entry becomes a card on the site AND its own
// SEO landing page at /services/<slug>, included in the sitemap.

export type ServiceIcon =
  | 'brain' | 'bot' | 'server' | 'image' | 'rocket' | 'plug' | 'compass'
  | 'robot' | 'cpu' | 'wifi' | 'circuit'

export type ServiceCategory = 'ai' | 'robotics'

export const categories: Record<ServiceCategory, { label: string; short: string; desc: string }> = {
  ai: { label: 'AI & Software', short: 'AI & Software', desc: 'LLM apps, agents, GPU deployment and full-stack AI products.' },
  robotics: { label: 'Robotics & IoT', short: 'Robotics & IoT', desc: 'Raspberry Pi, Arduino and ESP32 hardware, firmware and robots.' },
}

export interface ServiceFaq {
  q: string
  a: string
}

export interface Service {
  slug: string
  icon: ServiceIcon
  category: ServiceCategory
  /** looping background video in /public/videos (ai | robot | iot) */
  video: 'ai' | 'robot' | 'iot'
  name: string
  /** H1 on the landing page — written around the main search phrase */
  headline: string
  metaTitle: string
  metaDescription: string
  summary: string
  intro: string
  /** Long-form paragraphs for the landing page (SEO depth) */
  overview: string[]
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
    category: 'ai',
    video: 'ai',
    name: 'RAG & AI Chatbots',
    headline: 'RAG development: AI chatbots that answer from your own data',
    metaTitle: 'RAG Development Services — Custom AI Chatbots on Your Data',
    metaDescription:
      'Custom retrieval-augmented generation (RAG) development. Chat with PDFs, docs, spreadsheets and knowledge bases, with cited answers, streaming responses and secure auth.',
    summary: 'Chat with your PDFs, docs and knowledge base. Every answer cites its source.',
    intro:
      'We build retrieval-augmented generation systems that ground every answer in your documents instead of the model’s guesses. Ingestion, chunking, embeddings, vector search, prompt design and a streaming chat UI, delivered as one working product.',
    overview: [
      'Large language models are fluent but they do not know your business. Retrieval-augmented generation fixes that: when a user asks a question, the system first searches your own documents, then gives the model only the passages that matter and asks it to answer from them, with citations.',
      'We handle the parts that decide whether RAG works in practice: cleaning and chunking messy files, choosing an embedding model, tuning retrieval and re-ranking, writing prompts that refuse to guess, and measuring answer quality on a test set built from your real questions.',
    ],
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
    category: 'ai',
    video: 'ai',
    name: 'AI Agents & Automation',
    headline: 'AI agent development that completes real multi-step work',
    metaTitle: 'AI Agent Development Services — Autonomous Agents & Workflow Automation',
    metaDescription:
      'Custom AI agent development: agents that plan, call tools and APIs, and complete multi-step tasks, with human approval gates, memory and full observability.',
    summary: 'Agents that plan, call your tools and finish multi-step tasks, with a human in the loop.',
    intro:
      'We design agents that do more than chat. They break a goal into steps, call your APIs and tools, check their own results and hand off to a person when an action is high-stakes. Every run is logged so you can see exactly what happened.',
    overview: [
      'An AI agent is a model that can act. Given a goal, it plans steps, calls tools such as your CRM, database, email or internal APIs, checks the results and continues until the job is done or it needs a person to approve the next move.',
      'We build agents for repeatable, multi-step work where a simple automation script breaks down because inputs vary. Every agent ships with scoped permissions, approval gates, spending limits and a full trace of each run.',
    ],
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
    category: 'ai',
    video: 'ai',
    name: 'GPU & RunPod Deployment',
    headline: 'RunPod serverless deployment for AI models, with no idle GPU bill',
    metaTitle: 'RunPod Serverless Deployment — GPU Inference APIs for Any AI Model',
    metaDescription:
      'Deploy LLMs, diffusion, video, TTS and face models on RunPod serverless GPUs. Custom Docker workers, cold-start optimisation, autoscaling from zero and pay-per-second cost.',
    summary: 'Any model behind a fast serverless GPU API. Scale from zero, pay per second.',
    intro:
      'We package your model into a lean container, deploy it as a serverless GPU endpoint and tune it for fast cold starts. You get a clean API, autoscaling from zero and costs that follow real usage.',
    overview: [
      'Running AI models in production usually means paying for GPUs that sit idle most of the day. RunPod serverless workers start on demand, process the job and scale back to zero, so you pay for seconds of real compute instead of hours of rental.',
      'We turn models, including research repositories from GitHub, into reliable endpoints: lean Docker images, cached weights on network volumes, fast cold starts, input validation, async job handling and clear API documentation.',
    ],
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
    category: 'ai',
    video: 'ai',
    name: 'ComfyUI Image & Video',
    headline: 'ComfyUI API development for image and video generation at scale',
    metaTitle: 'ComfyUI API Development — AI Image & Video Generation Pipelines',
    metaDescription:
      'Production ComfyUI backends: image generation, image-to-video, talking avatars and LoRA training, exposed as a versioned API with job queues and media storage.',
    summary: 'Image, video and avatar pipelines turned into an API your product can call.',
    intro:
      'We take ComfyUI workflows from the canvas to production. Workflows become versioned API endpoints with queueing, storage and delivery, so your app can generate images and video reliably at volume.',
    overview: [
      'ComfyUI is the most flexible way to design image and video generation workflows, but a node graph on a desktop is not a product. We take your workflows to production as versioned APIs that your app can call at volume.',
      'That includes pinning custom nodes and model versions, running workers on serverless GPUs, queueing long video jobs, reporting progress, storing outputs and delivering them through a CDN.',
    ],
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
    category: 'ai',
    video: 'ai',
    name: 'AI SaaS MVPs',
    headline: 'AI SaaS MVP development: from idea to paying users, fast',
    metaTitle: 'AI SaaS MVP Development — Full-Stack Next.js, FastAPI & Supabase',
    metaDescription:
      'Launch your AI SaaS MVP in weeks. Full-stack builds with Next.js, React, FastAPI and Supabase: auth, billing, dashboards, AI features and production deployment.',
    summary: 'Full-stack product with auth, billing and AI features, live in weeks.',
    intro:
      'We ship complete AI products: marketing site, app, backend, database, auth, payments and the AI features that make it valuable. You get a production codebase you fully own, not a throwaway prototype.',
    overview: [
      'A good MVP is small, real and in front of users quickly. We build complete AI products: the marketing site, the app, authentication, billing, the database and the AI features that make the product valuable.',
      'You get a production-grade codebase you own, deployed with CI/CD, with weekly demos throughout the build so you can test with users and change direction early.',
    ],
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
    category: 'ai',
    video: 'ai',
    name: 'AI Integration & APIs',
    headline: 'AI integration services: add AI to the tools you already use',
    metaTitle: 'AI Integration Services — Connect LLMs to Your Apps, APIs & Data',
    metaDescription:
      'Integrate AI into your existing product and workflows. OAuth integrations, webhooks, scheduled publishing, data pipelines and LLM features added to your current stack.',
    summary: 'LLM features, OAuth apps, webhooks and data pipelines added to your stack.',
    intro:
      'Most of the value of AI comes from connecting it to the systems you already run. We add AI features to your product and link it to third-party platforms through official APIs, OAuth and webhooks.',
    overview: [
      'Most AI value comes from connecting models to the systems you already use. We add AI features to your existing product and link it to third-party platforms through official APIs, OAuth and webhooks.',
      'Typical work includes automated publishing and scheduling, syncing data into AI-ready formats, background jobs with retries, and rate-limit-aware API clients that keep working when a provider slows down.',
    ],
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
    category: 'ai',
    video: 'ai',
    name: 'AI Consulting & Audits',
    headline: 'AI consulting: the right architecture before you spend on the build',
    metaTitle: 'AI Consulting & AI System Audits — Architecture, Cost & Quality Review',
    metaDescription:
      'Practical AI consulting: find high-ROI use cases, choose models and infrastructure, and audit existing AI systems for quality, latency, cost and security.',
    summary: 'Pick the right use case, models and infra, or fix an AI system that underperforms.',
    intro:
      'Before you commit budget, we help you choose what to build and how. For existing systems, we audit answer quality, latency, GPU cost and security, and hand you a prioritised fix list.',
    overview: [
      'Before you commit budget to an AI build, it pays to know which use case will return the most, which models and infrastructure fit, and what it will cost to run. That is what our consulting work answers.',
      'For systems already in production, we audit answer quality, latency, GPU spend and security, then hand over a prioritised list of fixes with expected impact.',
    ],
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
  {
    slug: 'robotics-development',
    icon: 'robot',
    category: 'robotics',
    video: 'robot',
    name: 'Robotics Development',
    headline: 'Robotics development: custom robots, from prototype to working machine',
    metaTitle: 'Robotics Development Services — Custom Robots, Motion Control & Vision',
    metaDescription:
      'Custom robotics development: robotic arms, mobile robots and automation rigs with motor control, sensors, computer vision and remote dashboards, built on Raspberry Pi, Arduino and ESP32.',
    summary: 'Robot arms, mobile robots and automation rigs with motion control and vision.',
    intro:
      'We design and build robots that do a specific job well: picking, sorting, inspecting, moving or monitoring. Mechanics, electronics, firmware, control software and the dashboard you use to run it, delivered as one working system.',
    overview: [
      'Most robotics projects fail in the gaps between disciplines: the motor works but the firmware drops commands, the vision model works on a laptop but not on the robot, or nobody can operate it without the engineer in the room. We build across all of those layers so the parts work together.',
      'A typical build pairs a Raspberry Pi for vision, planning and networking with Arduino or ESP32 microcontrollers for real-time motor and sensor control, linked over serial, I2C or MQTT, with a web dashboard for monitoring and remote control.',
    ],
    outcomes: [
      'Mechanical concept, part selection and prototype assembly',
      'Servo, stepper and DC motor control with encoders and PID tuning',
      'Sensor integration: ultrasonic, IR, IMU, limit switches, load cells',
      'Computer vision for detection, tracking and inspection',
      'Web dashboard for live status, logs and remote control',
    ],
    useCases: ['Pick-and-place and sorting arms', 'Line-following and autonomous rovers', 'Inspection and monitoring robots', 'Educational and demo robots'],
    deliverables: ['Working prototype', 'Firmware & control code', 'Wiring diagrams', 'Dashboard', 'Build documentation'],
    stack: ['Raspberry Pi', 'Arduino', 'ESP32', 'Python', 'C++', 'OpenCV', 'ROS 2'],
    faqs: [
      {
        q: 'Can you build a robot from just an idea or sketch?',
        a: 'Yes. We start with a short discovery to define what the robot must do, then propose a parts list, architecture and milestones. The first milestone is usually a bench prototype that proves the hardest part works.',
      },
      {
        q: 'Do you use ROS?',
        a: 'When it helps. ROS 2 is a good fit for robots with many sensors, mapping or navigation. For simpler machines, a lean Python and microcontroller design is cheaper to build and easier to maintain.',
      },
      {
        q: 'Can the robot be controlled remotely?',
        a: 'Yes. We add a secure web dashboard or app for live status, camera feeds and commands over Wi-Fi or the internet.',
      },
    ],
  },
  {
    slug: 'raspberry-pi-development',
    icon: 'cpu',
    category: 'robotics',
    video: 'robot',
    name: 'Raspberry Pi Development',
    headline: 'Raspberry Pi development for edge AI, vision and smart devices',
    metaTitle: 'Raspberry Pi Development Services — Edge AI, Computer Vision & IoT Gateways',
    metaDescription:
      'Raspberry Pi development services: edge AI and computer vision, IoT gateways, kiosks and control systems. Python, Linux, camera and GPIO integration with remote updates and dashboards.',
    summary: 'Edge AI, computer vision, gateways and control systems on Raspberry Pi.',
    intro:
      'Raspberry Pi gives you a full Linux computer in a small, affordable board. We use it for products that need more than a microcontroller: cameras and computer vision, local AI inference, networking, a screen or a web interface.',
    overview: [
      'We build Raspberry Pi systems that run unattended in the real world: read-only file systems or careful logging to protect SD cards, services that restart themselves, watchdogs, secure remote access and over-the-air updates.',
      'For vision and AI, we optimise models to run on the Pi itself, with optional accelerators, so decisions happen on the device even when the connection drops. The Pi then reports results to your cloud dashboard over MQTT or HTTPS.',
    ],
    outcomes: [
      'Camera and computer-vision pipelines with OpenCV',
      'On-device AI inference with optimised models',
      'GPIO, I2C, SPI and UART integration with sensors and controllers',
      'IoT gateway bridging local devices to the cloud',
      'Hardened OS image, auto-start services and remote updates',
    ],
    useCases: ['Smart cameras and visual inspection', 'IoT gateways for ESP32 and Arduino nodes', 'Kiosks and control panels', 'Robot brains and data loggers'],
    deliverables: ['Configured OS image', 'Application code', 'Hardware integration', 'Remote update setup', 'Documentation'],
    stack: ['Raspberry Pi 5 / 4', 'Python', 'Linux', 'OpenCV', 'TensorFlow Lite / ONNX', 'MQTT'],
    faqs: [
      {
        q: 'Can a Raspberry Pi run AI models?',
        a: 'Yes. Small, optimised models for object detection, classification and pose estimation run well on a Raspberry Pi 5, and an AI accelerator can be added for higher frame rates.',
      },
      {
        q: 'Is Raspberry Pi suitable for a commercial product?',
        a: 'For many products, yes, especially low to medium volumes. The Compute Module version is designed for embedding into custom hardware when you scale.',
      },
    ],
  },
  {
    slug: 'esp32-iot-development',
    icon: 'wifi',
    category: 'robotics',
    video: 'iot',
    name: 'ESP32 & IoT Development',
    headline: 'ESP32 and IoT development: connected devices with live dashboards',
    metaTitle: 'ESP32 Firmware & IoT Development Services — MQTT, OTA & Dashboards',
    metaDescription:
      'ESP32 firmware and IoT development: Wi-Fi and Bluetooth sensor nodes, MQTT messaging, over-the-air updates, low-power design and real-time cloud dashboards for monitoring and control.',
    summary: 'Wi-Fi and Bluetooth sensor nodes, MQTT, OTA updates and live dashboards.',
    intro:
      'The ESP32 packs Wi-Fi, Bluetooth and a capable dual-core processor into a low-cost chip, which makes it the go-to choice for connected devices. We write the firmware, connect it to the cloud and build the dashboard you use to see and control everything.',
    overview: [
      'Reliable IoT is mostly about what happens when things go wrong: Wi-Fi drops, power fails, a sensor returns garbage or a firmware update needs to reach a hundred devices in the field. We design for those cases from day one, with reconnect logic, local buffering, watchdogs and safe over-the-air updates.',
      'Devices publish data over MQTT to a broker, where it is stored and shown on a real-time dashboard with alerts. Commands flow back the same way, so you can switch relays, change settings or trigger actions remotely.',
    ],
    outcomes: [
      'ESP32 firmware in Arduino framework or ESP-IDF',
      'Wi-Fi, BLE and ESP-NOW communication',
      'MQTT messaging with TLS and per-device credentials',
      'Over-the-air (OTA) firmware updates',
      'Deep-sleep power design for battery devices',
      'Real-time dashboard, history and alerts',
    ],
    useCases: ['Environmental and energy monitoring', 'Smart home and building automation', 'Asset tracking and remote switches', 'Agriculture and greenhouse sensors'],
    deliverables: ['Device firmware', 'Cloud/MQTT setup', 'Dashboard', 'OTA pipeline', 'Provisioning guide'],
    stack: ['ESP32', 'C / C++', 'ESP-IDF', 'Arduino', 'MQTT', 'Node-RED / custom dashboard'],
    faqs: [
      {
        q: 'ESP32 or Arduino: which should I use?',
        a: 'If the device needs Wi-Fi or Bluetooth, ESP32 is usually the better and cheaper choice. Classic Arduino boards suit simple, offline control tasks. We explain the trade-offs in our guide on the blog.',
      },
      {
        q: 'Can ESP32 devices run on batteries?',
        a: 'Yes. With deep sleep and careful wake-up scheduling, a sensor node that reports every few minutes can run for months on a battery, depending on the sensors and radio use.',
      },
      {
        q: 'Can you update the firmware after devices are installed?',
        a: 'Yes. We set up over-the-air updates with version checks and rollback, so devices in the field can be updated safely.',
      },
    ],
  },
  {
    slug: 'arduino-embedded-prototyping',
    icon: 'circuit',
    category: 'robotics',
    video: 'iot',
    name: 'Arduino & Embedded Prototyping',
    headline: 'Arduino and embedded prototyping that turns ideas into working hardware',
    metaTitle: 'Arduino Prototyping & Embedded Systems Development Services',
    metaDescription:
      'Arduino prototyping and embedded systems development: sensors, motor drivers, displays and automation controllers, from breadboard proof of concept to tidy, documented prototypes.',
    summary: 'Sensors, motors, displays and controllers, from breadboard to reliable prototype.',
    intro:
      'Arduino is the fastest way to prove a hardware idea. We build proofs of concept and functional prototypes that read sensors, drive motors and displays, and control machines, then make them robust enough to demo, test and hand to a manufacturer.',
    overview: [
      'Our prototypes are built to be understood: clean wiring, labelled connectors, well-structured firmware and documentation, so the next engineer, or a manufacturer, can pick up where we stopped.',
      'When a project grows beyond a microcontroller, we combine Arduino with a Raspberry Pi or move to an ESP32 for connectivity, keeping the firmware portable across boards.',
    ],
    outcomes: [
      'Proof-of-concept and functional prototypes',
      'Sensor reading, filtering and calibration',
      'Stepper, servo and DC motor drivers',
      'LCD, OLED and LED matrix displays',
      'Serial, I2C and SPI communication with other systems',
    ],
    useCases: ['Product proofs of concept', 'Automation and test rigs', 'Interactive installations', 'University and research prototypes'],
    deliverables: ['Prototype hardware', 'Firmware source', 'Schematic & wiring diagram', 'Bill of materials', 'Test report'],
    stack: ['Arduino Uno / Nano / Mega', 'C++', 'PlatformIO', 'KiCad', 'Sensors & drivers'],
    faqs: [
      {
        q: 'Can you design a custom PCB after the prototype?',
        a: 'Yes. Once the breadboard design is proven, we can produce a schematic and PCB layout so the prototype becomes a compact, repeatable board.',
      },
      {
        q: 'Do you help with student or research projects?',
        a: 'Yes, as long as the work is a paid engagement with clear scope. We build and document prototypes for research labs, universities and makers.',
      },
    ],
  },
]

export const getService = (slug: string) => services.find(s => s.slug === slug)

export const servicesBy = (c: ServiceCategory) => services.filter(s => s.category === c)
