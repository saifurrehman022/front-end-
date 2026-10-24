// Case studies. Each becomes a page at /projects/<slug> with VideoObject schema.
// EDIT THESE with your real project details, and drop your own footage into
// /public/videos (then set `videoSrc` / `poster`) or add a YouTube ID.

import type { ServiceCategory } from './services'

export interface Project {
  slug: string
  category: ServiceCategory
  title: string
  tag: string
  summary: string
  challenge: string
  solution: string[]
  results: string[]
  stack: string[]
  /** Looping preview clip in /public/videos: <video>-loop.mp4 / -poster.jpg */
  video: 'ai' | 'robot' | 'iot'
  /** Optional YouTube video ID for a full demo (shown on the case-study page) */
  youtubeId?: string
  services: string[]
  date: string
}

export const projects: Project[] = [
  {
    slug: 'ai-video-avatar-pipeline',
    category: 'ai',
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
    slug: 'esp32-iot-monitoring-network',
    category: 'robotics',
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
