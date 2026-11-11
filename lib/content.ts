// Home / About page content. Replace with your own wording any time.

export const stats = [
  { value: 30, suffix: '+', label: 'Projects delivered', desc: 'For clients across Europe, the US, NZ and Asia' },
  { value: 100, suffix: '%', label: 'Job Success Score', desc: 'Upwork Rising Talent, every contract closed well' },
  { value: 5, suffix: '.0', label: 'Client rating', desc: 'Average across Upwork and Fiverr reviews' },
  { value: 3, suffix: '+ yrs', label: 'Shipping production AI', desc: 'Pipelines, agents and GPU systems since 2023' },
]

/** Platform credentials shown in the proof strip. */
export const credentials = [
  { title: 'Upwork Rising Talent', detail: '100% Job Success · 5.0 rating' },
  { title: 'Fiverr Level 1 Seller', detail: '30+ orders delivered · 5.0 rating' },
  { title: 'BS Artificial Intelligence', detail: 'COMSATS University Islamabad' },
  { title: 'Anthropic certified', detail: 'Claude Agent Development · Advanced MCP' },
  { title: 'Coursera certified', detail: 'FastAPI with Security Protocols' },
]

/** Real client engagements with measurable outcomes. */
export const engagements = [
  {
    client: 'Todin',
    sector: 'Multi-store retail',
    period: '2024 – 2025',
    title: 'Unified data pipeline and sales forecasting across retail stores',
    outcome: 'Merged Excel, CSV and transactional data from several stores into one clean pipeline, removed duplicate products, and shipped real-time recommendations that improved cross-shop forecasting.',
    metric: 'Several stores → one source of truth',
    stack: ['Python', 'Pandas', 'ETL', 'Recommendation systems'],
  },
  {
    client: 'Helix Capital Corp',
    sector: 'Finance · AI automation',
    period: '2025',
    title: 'Root-cause analysis on a production AI pipeline',
    outcome: 'Traced a silent accuracy failure through logs and outputs to a clash between TensorRT optimisation and model masking logic, then restored consistent, accurate output.',
    metric: 'Production accuracy restored',
    stack: ['TensorRT', 'PyTorch', 'Logging', 'RCA'],
  },
  {
    client: 'New Zealand Experimental Ltd',
    sector: 'Forecasting',
    period: '2025',
    title: 'Spreadsheet data to time-series forecasting models',
    outcome: 'Turned messy spreadsheets into model-ready sequences, then built and benchmarked an LSTM against a formula-driven model with documented trade-offs for the client.',
    metric: 'Two models benchmarked side by side',
    stack: ['LSTM', 'Feature engineering', 'Python'],
  },
  {
    client: 'Email automation client',
    sector: 'SaaS · Support',
    period: '',
    title: 'LLM-powered email reply automation at scale',
    outcome: 'Automated replies with LLaMA on Groq, adding batching, caching and rate limiting so the system served 1,000 users within strict API limits.',
    metric: '1,000 users at 30 req/min',
    stack: ['Groq', 'LLaMA', 'Caching', 'Rate limiting'],
  },
  {
    client: 'Creator platform',
    sector: 'Generative media',
    period: '',
    title: 'Batch AI video pipeline with per-client isolation',
    outcome: 'Parallel ComfyUI job execution on serverless GPUs with isolated queues per account, so concurrent customers never block each other.',
    metric: '1 min of video in ~6 min',
    stack: ['ComfyUI', 'FastAPI', 'RunPod', 'TypeScript'],
  },
  {
    client: 'Research data client',
    sector: 'Data intelligence',
    period: '',
    title: 'Multi-agent data retrieval and report automation',
    outcome: 'Agents detect gaps in incomplete datasets, generate search queries, retrieve the missing data from the web and compile structured, location-specific reports.',
    metric: 'Manual research → automated reports',
    stack: ['LLM agents', 'Web search', 'Python'],
  },
]

export const whyUs = [
  { title: 'Software and hardware under one roof', desc: 'AI, cloud, firmware and electronics designed together, so the pieces actually fit.' },
  { title: 'Production, not just prototypes', desc: 'Monitoring, OTA updates, auth and documentation are part of the build, not extras.' },
  { title: 'Fixed scope and price', desc: 'A written plan with milestones and a fixed quote before any work starts.' },
  { title: 'Weekly demos', desc: 'Working software or hardware every week, so you can test and redirect early.' },
  { title: 'Proven track record', desc: '30+ projects delivered with a 100% Job Success Score and a 5.0 rating from international clients.' },
  { title: 'You own everything', desc: 'Source code, schematics, models and accounts are handed over at launch.' },
]

export const process = [
  { step: '01', title: 'Discovery call', desc: 'A free 30-minute call about your goal, data, hardware and constraints, with honest advice on what will work.' },
  { step: '02', title: 'Scope & fixed quote', desc: 'A written plan with milestones, stack, parts list where needed, and a fixed price.' },
  { step: '03', title: 'Build in weekly sprints', desc: 'Working software or hardware every week on a staging link or video demo.' },
  { step: '04', title: 'Launch & handover', desc: 'Deployment, documentation and a walkthrough. You own the code, designs and accounts.' },
]

export const industries = [
  'Startups & SaaS', 'Retail & e-commerce', 'Finance', 'Creators & media', 'Manufacturing', 'Agriculture', 'Smart buildings', 'Education & research', 'Healthcare tech',
]

export const homeFaqs = [
  {
    q: 'What does EchoLoft AI build?',
    a: 'AI automation and data systems, including ETL pipelines, RAG chatbots, AI agents, GPU model deployment and AI SaaS products, plus smart hardware: robots and IoT systems built on Raspberry Pi, Arduino and ESP32.',
  },
  {
    q: 'Do you build robotics and IoT projects as well as software?',
    a: 'Yes. We design and build robots, sensor networks and embedded devices, write the firmware, and connect them to cloud dashboards and AI. Combining hardware and software in one team is our main strength.',
  },
  {
    q: 'How much does a project cost?',
    a: 'It depends on scope. After a free discovery call we send a fixed quote with clear milestones, so you know the cost before any work starts.',
  },
  {
    q: 'How long does it take?',
    a: 'Prototypes usually take one to three weeks. Production software builds take three to eight weeks, and hardware projects depend on parts and testing. You see progress every week.',
  },
  {
    q: 'Do you work with clients outside your country?',
    a: 'Yes. We work remotely with clients worldwide. For hardware projects we ship prototypes or work with your local team using detailed documentation and video calls.',
  },
  {
    q: 'Who owns the code and designs?',
    a: 'You do. All source code, firmware, schematics, models and accounts belong to you, and we hand over documentation at launch.',
  },
]

export const team = [
  {
    name: 'Saif-Ur-Rehman',
    role: 'Founder & Lead Engineer',
    initials: 'SR',
    bio: 'BS in Artificial Intelligence (COMSATS). Full-time software engineer for a Belgium-based company and Upwork Rising Talent with 30+ projects delivered at a 100% Job Success Score. Builds data pipelines, LLM automation, GPU video systems, RAG platforms and ESP32 / Raspberry Pi hardware end to end.',
    tags: ['Data pipelines', 'LLM automation', 'GPU systems', 'Robotics & IoT'],
    links: { linkedin: 'https://www.linkedin.com/in/saif-ur-rehman-342a57235', github: 'https://github.com/saif816' },
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
  'Next.js', 'React', 'TypeScript', 'Python', 'Pandas', 'FastAPI', 'MongoDB', 'FAISS', 'Groq', 'CrewAI', 'MCP', 'Supabase', 'PostgreSQL', 'RunPod', 'Docker', 'PyTorch',
  'ComfyUI', 'LangChain', 'Claude', 'OpenAI', 'Raspberry Pi', 'Arduino', 'ESP32', 'C++', 'MQTT', 'OpenCV', 'ROS 2', 'Three.js',
]

export const hardware = [
  { name: 'Raspberry Pi', desc: 'Vision, edge AI, gateways' },
  { name: 'ESP32', desc: 'Wi-Fi & BLE IoT nodes' },
  { name: 'Arduino', desc: 'Motors, sensors, control' },
  { name: 'Sensors', desc: 'IMU, temp, distance, load' },
  { name: 'Motors', desc: 'Servo, stepper, DC + PID' },
  { name: 'MQTT & Cloud', desc: 'Telemetry, OTA, dashboards' },
]
