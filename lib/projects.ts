// Case studies. Each becomes a page at /projects/<slug> with VideoObject schema.
// Each has a unique designed cover; set `showVideo` only where the footage matches the project.

import type { ServiceCategory } from './services'

export type ProjectGroup = 'ai' | 'data' | 'robotics'

export const projectGroups: Record<ProjectGroup, string> = {
  ai: 'AI & Automation',
  data: 'Data & ML',
  robotics: 'Robotics & IoT',
}

export type CoverIcon =
  | 'video' | 'face' | 'studio' | 'chat' | 'iot' | 'robot' | 'motion'
  | 'pipeline' | 'mail' | 'agents' | 'chart' | 'debug' | 'repair' | 'lecture'

export type CoverPattern = 'nodes' | 'bars' | 'waves' | 'rings' | 'dots'

export interface Project {
  slug: string
  /** Links the case study to service pages */
  category: ServiceCategory
  /** Filter group on /projects */
  group: ProjectGroup
  title: string
  tag: string
  /** Client or context, shown in the "at a glance" bar (optional) */
  client?: string
  year?: string
  summary: string
  challenge: string
  solution: string[]
  results: string[]
  /** Headline result shown on cards */
  metric: { value: string; label: string }
  stack: string[]
  /** Unique designed cover for cards and case-study pages */
  cover: { icon: CoverIcon; from: string; to: string; pattern: CoverPattern }
  /** Footage in /public/videos that matches this project */
  video: 'ai' | 'robot' | 'iot'
  /** Show the footage on the case-study page (only where it really matches the project) */
  showVideo?: boolean
  /** Optional YouTube video ID for a full demo (shown on the case-study page) */
  youtubeId?: string
  services: string[]
  date: string
}

export const projects: Project[] = [
  {
    slug: 'ai-video-avatar-pipeline',
    category: 'ai',
    group: 'ai',
    client: 'Creator platform',
    year: '2026',
    metric: { value: '~6 min', label: 'to render 1 minute of AI video' },
    cover: { icon: 'video', from: '#E8B44A', to: '#F97316', pattern: 'waves' },
    showVideo: true,
    title: 'Serverless AI video and talking-avatar pipeline',
    tag: 'Generative video · GPU',
    summary: 'Image-to-video and audio-driven talking-avatar models deployed as autoscaling GPU workers behind one job API.',
    challenge:
      'A content platform needed to generate short videos and lip-synced avatar clips on demand. Running GPUs around the clock was too expensive, and each model came from a different research repository with its own dependencies.',
    solution: [
      'Packaged each model into a lean Docker worker with pinned dependencies and cached weights on network volumes.',
      'Deployed the workers on RunPod serverless so they scale from zero with the job queue.',
      'Exposed ComfyUI workflows and avatar models through one async job API with progress updates.',
      'Stored outputs in object storage and delivered them through a CDN.',
    ],
    results: ['No idle GPU cost between jobs', 'One API for several video models', 'New models added without changing the app'],
    stack: ['ComfyUI', 'RunPod Serverless', 'Docker', 'PyTorch', 'Python'],
    video: 'ai',
    services: ['runpod-gpu-deployment', 'comfyui-generative-media'],
    date: '2026-08-01',
  },
  {
    slug: 'face-swap-enhancement-api',
    category: 'ai',
    group: 'ai',
    year: '2026',
    metric: { value: '$0', label: 'idle GPU cost with per-second billing' },
    cover: { icon: 'face', from: '#A78BFA', to: '#6366F1', pattern: 'rings' },
    title: 'Face swap and enhancement API on serverless GPUs',
    tag: 'Computer vision · API',
    summary: 'An open-source face model turned into a fast, validated production endpoint with predictable cost.',
    challenge:
      'The model worked in a notebook but was slow to start, fragile to install and returned errors on unexpected inputs, which made it unusable inside a product.',
    solution: [
      'Rebuilt the environment with pinned CUDA and Python dependencies in a slim image.',
      'Cached model weights to cut cold-start time.',
      'Added input validation, face detection checks and clear error messages.',
      'Returned results as files or URLs through a documented REST interface.',
    ],
    results: ['Reliable endpoint callable from any app', 'Pay-per-second GPU billing', 'Clear failures instead of silent errors'],
    stack: ['Python', 'ONNX Runtime', 'InsightFace', 'RunPod Serverless'],
    video: 'ai',
    services: ['runpod-gpu-deployment'],
    date: '2026-07-01',
  },
  {
    slug: 'ai-creator-studio-publishing',
    category: 'ai',
    group: 'ai',
    client: 'Creator platform',
    year: '2026',
    metric: { value: '1 studio', label: 'generate, schedule and publish' },
    cover: { icon: 'studio', from: '#F472B6', to: '#E8B44A', pattern: 'dots' },
    title: 'AI creator studio with automated publishing',
    tag: 'Creator platform · SaaS',
    summary: 'A React and Supabase platform where creators generate media with AI and schedule posts to a third-party platform.',
    challenge:
      'Creators were generating content in one tool, editing in another and uploading by hand. The goal was one studio that handled generation, scheduling and publishing.',
    solution: [
      'Built the studio front end in React and TypeScript with a Supabase backend and auth.',
      'Connected GPU generation workers for images and video.',
      'Implemented an OAuth integration and a scheduler that publishes posts automatically.',
      'Added job status, retries and notifications for failed uploads.',
    ],
    results: ['Generation to publishing in one place', 'Scheduled posts without manual uploads', 'Production codebase owned by the client'],
    stack: ['React', 'TypeScript', 'Supabase', 'Edge Functions', 'OAuth 2.0'],
    video: 'ai',
    services: ['ai-saas-mvp-development', 'ai-integration'],
    date: '2026-06-01',
  },
  {
    slug: 'rag-document-chat',
    category: 'ai',
    group: 'ai',
    client: 'EchoLoft AI platform',
    year: '2026',
    metric: { value: '16', label: 'LLMs selectable per conversation' },
    cover: { icon: 'chat', from: '#38BDF8', to: '#6EE7F9', pattern: 'nodes' },
    title: 'Document chat with cited answers',
    tag: 'Enterprise RAG · Chat',
    summary: 'Retrieval-augmented chat over PDFs, Word and Excel files, with streaming answers, memory and secure auth.',
    challenge: 'Teams were losing time searching long documents and getting unreliable answers from generic chatbots.',
    solution: [
      'Built ingestion for PDF, DOCX, XLSX and CSV with OCR for scans.',
      'Indexed content in a vector store with tuned chunking and retrieval.',
      'Streamed model answers with source citations and multi-turn memory.',
      'Secured the API with JWT access and refresh-token rotation.',
    ],
    results: ['Answers grounded in company documents', 'Citations on every response', 'Multiple LLMs selectable per conversation'],
    stack: ['FastAPI', 'FAISS', 'Groq', 'MongoDB', 'Next.js'],
    video: 'ai',
    services: ['rag-development'],
    date: '2026-05-01',
  },
  {
    slug: 'retail-data-unification-pipeline',
    category: 'ai',
    group: 'data',
    title: 'Multi-store retail data pipeline and sales forecasting',
    tag: 'Data engineering · ETL',
    client: 'Todin',
    year: '2024 – 2025',
    summary: 'Excel, CSV and transactional data from several retail stores cleaned, merged and deduplicated into one pipeline that feeds recommendations and forecasts.',
    challenge:
      'Each store kept its own spreadsheets and sales exports with different formats, product names and codes. The same product appeared many times across stores, so no one could trust cross-store numbers or forecast demand.',
    solution: [
      'Built Python pipelines that ingest Excel, CSV and transactional exports from every store.',
      'Cleaned and normalised columns, units and product names into one shared schema.',
      'Detected and merged duplicate products across stores into a single catalogue.',
      'Delivered a real-time product recommendation pipeline and automated sales predictions on the unified data.',
    ],
    results: ['One source of truth across stores', 'Duplicate products removed', 'Better cross-shop sales forecasting'],
    metric: { value: '1 pipeline', label: 'replacing per-store spreadsheets' },
    stack: ['Python', 'Pandas', 'NumPy', 'ETL', 'Recommendation systems'],
    cover: { icon: 'pipeline', from: '#E8B44A', to: '#84CC16', pattern: 'bars' },
    video: 'ai',
    services: ['ai-integration', 'ai-consulting'],
    date: '2025-09-01',
  },
  {
    slug: 'llm-email-reply-automation',
    category: 'ai',
    group: 'ai',
    title: 'LLM email reply automation for 1,000 users',
    tag: 'LLM automation · Groq',
    summary: 'Automated, context-aware email replies with LLaMA on Groq, engineered with batching, caching and rate limiting to stay inside strict API limits.',
    challenge:
      'Replying to a growing inbox by hand did not scale, and a naive LLM integration would exceed the provider rate limit within minutes once many users were active.',
    solution: [
      'Generated replies with LLaMA models served on Groq for low latency.',
      'Batched incoming requests and cached repeated context to cut model calls.',
      'Added a rate limiter that holds throughput at the provider limit without dropping requests.',
      'Shipped a Streamlit interface for reviewing and sending drafted replies.',
    ],
    results: ['Scaled to 1,000 users', 'Held at 30 requests per minute', 'Fewer model calls through caching'],
    metric: { value: '1,000', label: 'users served at 30 requests / minute' },
    stack: ['Python', 'Groq', 'LLaMA', 'Streamlit', 'Caching'],
    cover: { icon: 'mail', from: '#F97316', to: '#E8B44A', pattern: 'waves' },
    video: 'ai',
    services: ['ai-agent-development', 'ai-integration'],
    date: '2025-01-01',
  },
  {
    slug: 'multi-agent-data-retrieval-reports',
    category: 'ai',
    group: 'ai',
    title: 'Multi-agent data retrieval and report automation',
    tag: 'AI agents · Web search',
    summary: 'A team of LLM agents that finds gaps in incomplete datasets, searches the web for the missing facts and compiles structured, location-specific reports.',
    challenge:
      'The client\'s datasets had many missing fields. Filling them meant hours of manual searching per location, and reports went out incomplete.',
    solution: [
      'Built an agent that scans each record and flags missing or weak fields.',
      'Generated targeted search queries for every gap and retrieved candidate data from the web.',
      'Validated and merged the retrieved values back into the dataset.',
      'Compiled structured, location-specific reports that go beyond the original data.',
    ],
    results: ['Gaps found automatically', 'Missing data retrieved from the web', 'Reports compiled without manual research'],
    metric: { value: 'Automated', label: 'from data gaps to finished reports' },
    stack: ['Python', 'LLM agents', 'Web search', 'Prompt engineering'],
    cover: { icon: 'agents', from: '#818CF8', to: '#22D3EE', pattern: 'nodes' },
    video: 'ai',
    services: ['ai-agent-development'],
    date: '2025-06-01',
  },
  {
    slug: 'production-ai-pipeline-root-cause',
    category: 'ai',
    group: 'ai',
    title: 'Root-cause analysis on a production AI pipeline',
    tag: 'MLOps · Debugging',
    client: 'Helix Capital Corp',
    year: '2025',
    summary: 'Traced a silent output-quality failure in a production automation pipeline to a clash between TensorRT optimisation and model masking, and restored accurate results.',
    challenge:
      'A production pipeline started returning degraded outputs with no errors in the logs. The team could not tell whether the model, the data or the infrastructure was at fault.',
    solution: [
      'Added structured logging and traced outputs step by step through the pipeline.',
      'Isolated the regression to the TensorRT-optimised model build.',
      'Identified an incompatibility between the TensorRT optimisation and the model masking logic.',
      'Restored the original model path, preserving output accuracy and consistency.',
    ],
    results: ['Root cause found and documented', 'Output accuracy restored', 'Consistent results in production'],
    metric: { value: 'Restored', label: 'production output accuracy' },
    stack: ['PyTorch', 'TensorRT', 'Python', 'Logging'],
    cover: { icon: 'debug', from: '#F43F5E', to: '#E8B44A', pattern: 'rings' },
    video: 'ai',
    services: ['runpod-gpu-deployment', 'ai-consulting'],
    date: '2025-12-01',
  },
  {
    slug: 'time-series-forecasting-lstm',
    category: 'ai',
    group: 'data',
    title: 'Spreadsheet data to time-series forecasting',
    tag: 'Forecasting · LSTM',
    client: 'New Zealand Experimental Ltd',
    year: '2025',
    summary: 'Messy spreadsheets turned into model-ready sequences, then an LSTM benchmarked against a formula-driven model so the client could choose with clear trade-offs.',
    challenge:
      'The data lived in inconsistent spreadsheets that no model could use directly, and the client needed to know whether deep learning was worth it over a simpler formula.',
    solution: [
      'Cleaned and restructured the spreadsheets into consistent time series.',
      'Engineered features and built custom preprocessing into training sequences.',
      'Trained an LSTM forecasting model and a formula-driven baseline.',
      'Compared both and documented accuracy, complexity and maintenance trade-offs.',
    ],
    results: ['Model-ready data pipeline', 'Two approaches benchmarked', 'Documented recommendation for the client'],
    metric: { value: '2 models', label: 'benchmarked with documented trade-offs' },
    stack: ['Python', 'Pandas', 'LSTM', 'Feature engineering'],
    cover: { icon: 'chart', from: '#22D3EE', to: '#34D399', pattern: 'waves' },
    video: 'ai',
    services: ['ai-consulting'],
    date: '2025-08-01',
  },
  {
    slug: 'dataset-repair-bilstm-training',
    category: 'ai',
    group: 'data',
    title: 'Dataset repair and BiLSTM model training',
    tag: 'Data quality · Deep learning',
    summary: 'A flawed training dataset repaired with null handling, feature refinement and augmentation, giving a BiLSTM that trains with far more stable convergence.',
    challenge:
      'The model would not train reliably. Missing values, noisy features and class imbalance in the dataset made the loss swing and results unrepeatable.',
    solution: [
      'Audited the dataset and handled nulls and inconsistent values.',
      'Refined and rescaled features to remove noise.',
      'Augmented under-represented samples to balance the data.',
      'Retrained a BiLSTM and tracked convergence across runs.',
    ],
    results: ['Clean, documented dataset', 'Stable training convergence', 'Repeatable results'],
    metric: { value: 'Stable', label: 'convergence after data repair' },
    stack: ['Python', 'Pandas', 'BiLSTM', 'Data augmentation'],
    cover: { icon: 'repair', from: '#A3E635', to: '#E8B44A', pattern: 'dots' },
    video: 'ai',
    services: ['ai-consulting'],
    date: '2025-04-01',
  },
  {
    slug: 'teachify-automated-lecture-generation',
    category: 'ai',
    group: 'ai',
    title: 'Teachify: automated lecture generation with RAG',
    tag: 'EdTech · RAG · TTS',
    client: 'COMSATS University (final-year project)',
    year: '2026',
    summary: 'Upload course documents and get a complete narrated lecture: RAG for content, LLMs for scripts, text-to-speech for narration and AI-generated visuals.',
    challenge:
      'Preparing a lecture from source material takes teachers hours of reading, scripting, slide design and recording for every topic.',
    solution: [
      'Built document ingestion with FAISS embeddings for retrieval-augmented generation.',
      'Generated structured lecture scripts with LLMs grounded in the uploaded material.',
      'Produced narration with text-to-speech and matching AI visuals.',
      'Delivered it as a React app with a FastAPI and MongoDB backend.',
    ],
    results: ['Document to lecture end to end', 'Content grounded in the source', 'Narration and visuals generated automatically'],
    metric: { value: 'End to end', label: 'document to narrated lecture' },
    stack: ['React', 'FastAPI', 'MongoDB', 'FAISS', 'TTS'],
    cover: { icon: 'lecture', from: '#60A5FA', to: '#A78BFA', pattern: 'dots' },
    video: 'ai',
    services: ['rag-development', 'ai-saas-mvp-development'],
    date: '2026-06-01',
  },
  {
    slug: 'esp32-iot-monitoring-network',
    category: 'robotics',
    group: 'robotics',
    year: '2026',
    metric: { value: 'OTA', label: 'firmware updates for field devices' },
    cover: { icon: 'iot', from: '#34D399', to: '#22D3EE', pattern: 'rings' },
    showVideo: true,
    title: 'ESP32 sensor network with a live dashboard',
    tag: 'IoT · ESP32 · MQTT',
    summary: 'Wi-Fi sensor nodes that report temperature, humidity and power over MQTT to a real-time dashboard with alerts.',
    challenge:
      'Readings were collected by hand and problems were only noticed after the fact. The site needed continuous monitoring and alerts without running new cables.',
    solution: [
      'Designed ESP32 sensor nodes with calibrated sensors and reconnect logic.',
      'Published readings over MQTT with per-device credentials.',
      'Built a dashboard with live charts, history and threshold alerts.',
      'Added over-the-air firmware updates for devices in the field.',
    ],
    results: ['Live visibility across all sensors', 'Alerts instead of manual checks', 'Remote firmware updates'],
    stack: ['ESP32', 'C++', 'MQTT', 'Node-RED', 'Dashboard'],
    video: 'iot',
    services: ['esp32-iot-development'],
    date: '2026-04-01',
  },
  {
    slug: 'raspberry-pi-vision-robot',
    category: 'robotics',
    group: 'robotics',
    year: '2026',
    metric: { value: 'Real-time', label: 'object detection on the device' },
    cover: { icon: 'robot', from: '#E8B44A', to: '#22D3EE', pattern: 'nodes' },
    showVideo: true,
    title: 'Raspberry Pi computer-vision robot',
    tag: 'Robotics · Raspberry Pi · OpenCV',
    summary: 'A camera-guided robot that detects objects on the Pi and drives motors through an Arduino controller.',
    challenge:
      'The robot needed to see and react in real time, but heavy vision code and precise motor timing could not share the same processor.',
    solution: [
      'Ran the camera and OpenCV detection pipeline on a Raspberry Pi.',
      'Delegated motor and sensor timing to an Arduino over serial.',
      'Added a web dashboard with the live camera feed and manual override.',
      'Packaged everything as services that start on boot.',
    ],
    results: ['Real-time detection on the device', 'Smooth, reliable motor control', 'Remote monitoring from a browser'],
    stack: ['Raspberry Pi', 'Python', 'OpenCV', 'Arduino', 'Serial'],
    video: 'robot',
    services: ['robotics-development', 'raspberry-pi-development'],
    date: '2026-03-01',
  },
  {
    slug: 'arduino-motion-control-rig',
    category: 'robotics',
    group: 'robotics',
    year: '2026',
    metric: { value: 'Repeatable', label: 'automated motion with homing' },
    cover: { icon: 'motion', from: '#FB923C', to: '#F43F5E', pattern: 'bars' },
    showVideo: true,
    title: 'Arduino motion-control and automation rig',
    tag: 'Embedded · Arduino · Motors',
    summary: 'Stepper and servo control with limit switches and a simple operator panel for repeatable automated movements.',
    challenge: 'A repetitive manual task needed consistent, repeatable movement and an interface that non-engineers could operate.',
    solution: [
      'Built stepper and servo control with homing via limit switches.',
      'Added sensor feedback and safety stops.',
      'Created an operator panel with a display and buttons.',
      'Documented wiring, firmware and calibration steps.',
    ],
    results: ['Repeatable automated motion', 'Simple operation for non-engineers', 'Documented, maintainable build'],
    stack: ['Arduino', 'C++', 'Stepper drivers', 'Servos', 'OLED display'],
    video: 'robot',
    services: ['arduino-embedded-prototyping', 'robotics-development'],
    date: '2026-02-01',
  },
]

export const getProject = (slug: string) => projects.find(p => p.slug === slug)
export const videoSrc = (v: Project['video']) => ({
  mp4: `/videos/${v}-loop.mp4`,
  webm: `/videos/${v}-loop.webm`,
  poster: `/videos/${v}-poster.jpg`,
})
