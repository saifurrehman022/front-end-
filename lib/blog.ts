// Blog / insights. Each post becomes /blog/<slug> with Article schema and is
// listed in the sitemap and RSS feed. Add new posts at the top of the array.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; lang: string; code: string }
  | { type: 'callout'; text: string }

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  category: 'AI' | 'Robotics' | 'IoT'
  tags: string[]
  cover: 'ai' | 'robot' | 'iot'
  relatedServices: string[]
  body: Block[]
}

export const posts: Post[] = [
  {
    slug: 'esp32-vs-arduino-vs-raspberry-pi',
    title: 'ESP32 vs Arduino vs Raspberry Pi: Which Board Should Your Project Use?',
    description:
      'A practical comparison of ESP32, Arduino and Raspberry Pi for IoT products and robots: connectivity, processing power, real-time control, power use and cost, with clear recommendations.',
    date: '2026-10-20',
    category: 'IoT',
    tags: ['ESP32', 'Arduino', 'Raspberry Pi', 'IoT', 'Embedded'],
    cover: 'iot',
    relatedServices: ['esp32-iot-development', 'raspberry-pi-development', 'arduino-embedded-prototyping'],
    body: [
      { type: 'p', text: 'Choosing the right board early saves weeks of rework. ESP32, Arduino and Raspberry Pi are all excellent, but they solve different problems. The short version: Arduino for simple real-time control, ESP32 for connected devices, and Raspberry Pi when you need a full computer for vision, AI or a user interface.' },
      { type: 'h2', text: 'The key difference: microcontroller vs computer' },
      { type: 'p', text: 'Arduino boards and the ESP32 are microcontrollers. They run one program directly on the hardware, start instantly, use very little power and respond to inputs with predictable timing. Raspberry Pi is a single-board computer running Linux. It can run Python, databases, web servers and AI models, but it takes time to boot, uses more power and is not designed for microsecond-precise timing.' },
      { type: 'h2', text: 'Arduino: simple, robust, real-time' },
      { type: 'p', text: 'Classic Arduino boards such as the Uno and Nano are ideal for reading sensors, driving motors and controlling relays where no network connection is needed. The ecosystem is huge, the hardware is forgiving and the code is easy to maintain.' },
      { type: 'ul', items: ['Best for: motor control, test rigs, simple automation, learning and fast proofs of concept', 'Strengths: predictable timing, low power, very simple to debug', 'Limits: little memory, no built-in Wi-Fi or Bluetooth on classic boards'] },
      { type: 'h2', text: 'ESP32: the default choice for connected devices' },
      { type: 'p', text: 'The ESP32 adds Wi-Fi and Bluetooth, a dual-core processor and far more memory than a classic Arduino, at a similar price. It can be programmed with the Arduino framework or with Espressif’s ESP-IDF for production firmware, and it supports deep sleep for battery-powered devices.' },
      { type: 'ul', items: ['Best for: IoT sensor nodes, smart home devices, remote switches, wearables', 'Strengths: built-in connectivity, low cost, OTA updates, deep sleep', 'Limits: not suited to heavy computer vision or large AI models'] },
      { type: 'h2', text: 'Raspberry Pi: when you need a real computer' },
      { type: 'p', text: 'Raspberry Pi runs a full operating system, so it can process camera feeds, run optimised AI models, host a web dashboard and act as a gateway between local devices and the cloud. The Raspberry Pi 5 is fast enough for many on-device vision tasks.' },
      { type: 'ul', items: ['Best for: computer vision, edge AI, gateways, kiosks, robot brains', 'Strengths: Linux, Python, networking, cameras, displays', 'Limits: higher power draw, boot time, SD cards need care in harsh environments'] },
      { type: 'h2', text: 'Quick comparison' },
      { type: 'ul', items: ['Connectivity: Arduino (add-on modules) · ESP32 (Wi-Fi + BLE built in) · Raspberry Pi (Wi-Fi, BLE, Ethernet)', 'Real-time control: Arduino excellent · ESP32 very good · Raspberry Pi limited', 'Computer vision and AI: Arduino no · ESP32 very limited · Raspberry Pi yes', 'Battery operation: Arduino good · ESP32 excellent with deep sleep · Raspberry Pi poor'] },
      { type: 'h2', text: 'The best answer is often “both”' },
      { type: 'p', text: 'Many of our robots and IoT systems combine boards. A Raspberry Pi handles vision, decisions and the dashboard, while an Arduino or ESP32 handles motors and sensors with precise timing. In IoT deployments, many low-power ESP32 nodes report to a Raspberry Pi gateway or straight to an MQTT broker in the cloud.' },
      { type: 'callout', text: 'Rule of thumb: if it needs Wi-Fi and runs on a battery, start with ESP32. If it needs a camera and AI, add a Raspberry Pi. If it just needs to move something reliably, an Arduino is hard to beat.' },
    ],
  },
  {
    slug: 'esp32-mqtt-iot-sensor-network',
    title: 'ESP32 + MQTT: How to Build a Reliable IoT Sensor Network',
    description:
      'How to design an ESP32 IoT sensor network that keeps working in the real world: MQTT topics, reconnect logic, buffering, security, over-the-air updates and dashboards.',
    date: '2026-10-08',
    category: 'IoT',
    tags: ['ESP32', 'MQTT', 'IoT', 'OTA', 'Firmware'],
    cover: 'iot',
    relatedServices: ['esp32-iot-development'],
    body: [
      { type: 'p', text: 'Getting an ESP32 to send a temperature reading takes an afternoon. Getting fifty of them to report reliably for a year is a different job. This guide covers the design decisions that separate a demo from a dependable IoT system.' },
      { type: 'h2', text: 'Why MQTT' },
      { type: 'p', text: 'MQTT is a lightweight publish/subscribe protocol built for unreliable networks and small devices. Devices publish messages to topics on a broker, and any number of subscribers, such as a database writer, a dashboard or an alerting service, receive them. Devices never need to know who is listening.' },
      { type: 'h2', text: 'Design a clear topic structure' },
      { type: 'p', text: 'A predictable topic hierarchy makes permissions, dashboards and debugging much simpler. For example:' },
      { type: 'code', lang: 'text', code: 'site/{siteId}/device/{deviceId}/telemetry   # sensor readings (JSON)\nsite/{siteId}/device/{deviceId}/status      # online / offline (retained, LWT)\nsite/{siteId}/device/{deviceId}/cmd         # commands to the device\nsite/{siteId}/device/{deviceId}/ota         # firmware update notices' },
      { type: 'p', text: 'Use the MQTT “last will and testament” on the status topic so the broker marks a device offline automatically if it disappears.' },
      { type: 'h2', text: 'Plan for failure' },
      { type: 'ul', items: ['Reconnect with back-off for both Wi-Fi and MQTT, never block the main loop forever', 'Buffer readings locally when offline and send them with their original timestamps later', 'Enable the hardware watchdog so a hung device reboots itself', 'Validate sensor values and report sensor faults instead of sending nonsense'] },
      { type: 'h2', text: 'Security is not optional' },
      { type: 'p', text: 'Use TLS to the broker, give every device its own credentials, and restrict each device to its own topics with access-control rules. Never hard-code a shared password into every unit: one leaked device should not expose the whole fleet.' },
      { type: 'h2', text: 'Over-the-air updates' },
      { type: 'p', text: 'Firmware will need fixes after installation. The ESP32 supports dual OTA partitions, so a new image is written alongside the running one and the device only switches after the download is verified. Add a version check and a health check after boot, and roll back automatically if the new firmware fails.' },
      { type: 'h2', text: 'Battery-powered nodes' },
      { type: 'p', text: 'For battery devices, wake from deep sleep, read sensors, connect, publish and sleep again as quickly as possible. Wi-Fi connection time dominates the energy budget, so static IP settings and batching several readings per connection can extend battery life significantly.' },
      { type: 'h2', text: 'Dashboards and alerts' },
      { type: 'p', text: 'A subscriber stores telemetry in a time-series database, and a dashboard shows live values, history and device health. Alerts on thresholds and on devices going offline turn the system from a nice graph into something that prevents problems.' },
      { type: 'callout', text: 'Checklist: clear topics · per-device credentials · TLS · reconnect and buffering · watchdog · OTA with rollback · offline alerts.' },
    ],
  },
  {
    slug: 'raspberry-pi-computer-vision-robot',
    title: 'Building a Raspberry Pi Computer-Vision Robot: An Architecture That Works',
    description:
      'A proven architecture for a Raspberry Pi robot with computer vision: splitting vision and motor control between a Pi and a microcontroller, choosing models, and making it run reliably.',
    date: '2026-09-24',
    category: 'Robotics',
    tags: ['Raspberry Pi', 'Robotics', 'OpenCV', 'Arduino', 'Edge AI'],
    cover: 'robot',
    relatedServices: ['robotics-development', 'raspberry-pi-development'],
    body: [
      { type: 'p', text: 'A robot that can see is far more useful than one that follows fixed paths. Raspberry Pi makes on-device vision affordable, but the architecture matters. Here is the structure we use for camera-guided robots.' },
      { type: 'h2', text: 'Split the brain from the reflexes' },
      { type: 'p', text: 'Vision processing is heavy and timing on Linux is not guaranteed. Motor control needs precise, steady timing. Trying to do both on one Raspberry Pi leads to jerky movement and missed steps. Instead:' },
      { type: 'ul', items: ['Raspberry Pi: camera capture, detection, decision-making, networking and the dashboard', 'Arduino or ESP32: motor drivers, encoders, limit switches and safety stops', 'Link: a simple serial protocol with short commands and acknowledgements'] },
      { type: 'h2', text: 'Choosing the vision approach' },
      { type: 'p', text: 'Start with the simplest method that works. Colour and shape detection with OpenCV is fast and robust in controlled lighting. When objects vary, a small object-detection model running with TensorFlow Lite or ONNX Runtime gives far better results. Reduce the input resolution and limit the frame rate to what the robot actually needs.' },
      { type: 'h2', text: 'Make the control loop safe' },
      { type: 'ul', items: ['The microcontroller stops the motors if commands stop arriving', 'Limit switches and current sensing are handled locally, never only on the Pi', 'Every command has bounds, so a bad value cannot drive a joint past its limit'] },
      { type: 'h2', text: 'Run it like a product' },
      { type: 'p', text: 'Run the vision and control software as system services that start on boot and restart on failure. Log to memory or rotate logs to protect the SD card. Add a small web dashboard with the camera feed, status and a manual override so anyone can operate and debug the robot.' },
      { type: 'h2', text: 'Test on the real robot early' },
      { type: 'p', text: 'Lighting, vibration and cable noise change everything. Move from laptop experiments to the robot as soon as possible, and keep a set of recorded test videos so you can check vision changes without the hardware.' },
      { type: 'callout', text: 'Architecture summary: Pi sees and decides, microcontroller moves and protects, dashboard explains what is happening.' },
    ],
  },
  {
    slug: 'rag-vs-fine-tuning',
    title: 'RAG vs Fine-Tuning: How to Make an LLM Know Your Business',
    description:
      'When to use retrieval-augmented generation, when to fine-tune, and when to combine them. A practical guide for teams building AI assistants on company data.',
    date: '2026-09-10',
    category: 'AI',
    tags: ['RAG', 'LLM', 'Fine-tuning', 'AI chatbot'],
    cover: 'ai',
    relatedServices: ['rag-development', 'ai-consulting'],
    body: [
      { type: 'p', text: 'Every team building an AI assistant hits the same question: how do we make the model know our products, policies and documents? The two main options are retrieval-augmented generation (RAG) and fine-tuning. They solve different problems.' },
      { type: 'h2', text: 'What RAG does' },
      { type: 'p', text: 'RAG leaves the model unchanged. At question time it searches your documents, selects the most relevant passages and gives them to the model with instructions to answer from that context. Update a document and the next answer reflects it immediately.' },
      { type: 'h2', text: 'What fine-tuning does' },
      { type: 'p', text: 'Fine-tuning trains the model further on your examples. It is good at teaching a style, a format or a narrow task, such as always replying in a specific structure or classifying tickets. It is a poor way to store facts that change, and it does not provide citations.' },
      { type: 'h2', text: 'When to choose RAG' },
      { type: 'ul', items: ['Answers must come from documents that change', 'Users need citations they can check', 'You need access control by user or team', 'You want to switch models without retraining'] },
      { type: 'h2', text: 'When to choose fine-tuning' },
      { type: 'ul', items: ['You need a consistent tone, format or behaviour', 'The task is narrow and repetitive, like classification or extraction', 'You want a smaller, cheaper model to match a larger one on that task'] },
      { type: 'h2', text: 'Why most teams should start with RAG' },
      { type: 'p', text: 'For knowledge assistants, RAG is faster to build, cheaper to maintain and easier to trust. Most quality problems blamed on the model are actually retrieval problems: poor chunking, missing metadata or the wrong passages being selected. Fix retrieval first and measure it with a test set of real questions.' },
      { type: 'h2', text: 'Combining both' },
      { type: 'p', text: 'Mature systems often use both: RAG supplies the facts, and a lightly fine-tuned model follows the house style and output format. Add fine-tuning only when evaluation shows a specific gap that prompting cannot close.' },
      { type: 'callout', text: 'Start with RAG and a good evaluation set. Fine-tune later, only for behaviour, never as a database.' },
    ],
  },
  {
    slug: 'deploy-ai-models-runpod-serverless',
    title: 'Deploying AI Models on RunPod Serverless: A Practical Guide',
    description:
      'How to turn an AI model into a production API on RunPod serverless GPUs: container design, cold starts, network volumes, async jobs and cost control.',
    date: '2026-08-27',
    category: 'AI',
    tags: ['RunPod', 'Serverless GPU', 'Docker', 'Model deployment'],
    cover: 'ai',
    relatedServices: ['runpod-gpu-deployment', 'comfyui-generative-media'],
    body: [
      { type: 'p', text: 'Serverless GPUs let you run image, video, speech and language models without paying for idle hardware. RunPod serverless workers start when a job arrives and scale back to zero. Getting good performance comes down to a few decisions.' },
      { type: 'h2', text: '1. Build a lean container' },
      { type: 'p', text: 'Start from a CUDA base image that matches your framework, pin every dependency and remove build tools from the final image. Smaller images pull faster, which directly shortens cold starts on new workers.' },
      { type: 'h2', text: '2. Keep model weights out of the image' },
      { type: 'p', text: 'Large weights make images slow to distribute. Store them on a network volume attached to the endpoint, or bake only small models into the image. Load the model once when the worker starts, not on every request.' },
      { type: 'h2', text: '3. Write a clean handler' },
      { type: 'code', lang: 'python', code: "import runpod\n\nmodel = load_model()  # runs once per worker\n\ndef handler(job):\n    inp = job['input']\n    validate(inp)\n    result = model.run(inp)\n    return {'output_url': upload(result)}\n\nrunpod.serverless.start({'handler': handler})" },
      { type: 'p', text: 'Validate inputs before doing GPU work, return files as URLs rather than huge base64 strings, and return clear error messages.' },
      { type: 'h2', text: '4. Use async jobs for long tasks' },
      { type: 'p', text: 'Video generation can take minutes. Submit jobs asynchronously, then poll the status endpoint or receive a webhook when the job completes. Your app stays responsive and you can show progress to the user.' },
      { type: 'h2', text: '5. Tune scaling and cost' },
      { type: 'ul', items: ['Set max workers to cap spend during spikes', 'Keep one active worker only if latency really matters', 'Choose the smallest GPU that fits the model in memory', 'Benchmark cold and warm latency before launch'] },
      { type: 'callout', text: 'The biggest wins usually come from smaller images, weights on volumes and loading the model once per worker.' },
    ],
  },
  {
    slug: 'ai-chatbot-development-cost',
    title: 'AI Chatbot Development Cost: What Actually Drives the Price',
    description:
      'What determines the cost of building a custom AI chatbot: data preparation, integrations, model choice, security, evaluation and hosting, plus how to keep the budget under control.',
    date: '2026-08-12',
    category: 'AI',
    tags: ['AI chatbot', 'Cost', 'RAG', 'Planning'],
    cover: 'ai',
    relatedServices: ['rag-development', 'ai-consulting', 'ai-saas-mvp-development'],
    body: [
      { type: 'p', text: '“How much does an AI chatbot cost?” has no single answer, but the cost is predictable once you know what drives it. These are the factors that move the price most.' },
      { type: 'h2', text: '1. Your data' },
      { type: 'p', text: 'Clean, text-based documents are quick to index. Scanned PDFs, complex tables, spreadsheets and content spread across several systems take more work to extract, clean and keep in sync. Data preparation is often the largest single part of a project.' },
      { type: 'h2', text: '2. Integrations' },
      { type: 'p', text: 'A standalone chat widget is simple. Connecting to a CRM, helpdesk, database or internal API, and letting the assistant take actions, adds design, security and testing work.' },
      { type: 'h2', text: '3. Accuracy requirements' },
      { type: 'p', text: 'An internal helper can tolerate the occasional imperfect answer. A customer-facing or regulated use case needs an evaluation set, citations, guardrails and review workflows. Higher stakes mean more testing.' },
      { type: 'h2', text: '4. Users and security' },
      { type: 'p', text: 'Login, roles, per-user document permissions, audit logs and data residency all add scope, and they are essential for most business deployments.' },
      { type: 'h2', text: '5. Running costs' },
      { type: 'p', text: 'Ongoing costs include model usage, hosting, the vector database and maintenance. Choosing the right model for each task and caching common answers keeps them under control.' },
      { type: 'h2', text: 'How to control the budget' },
      { type: 'ol', items: ['Start with one high-value use case', 'Build a prototype on your real documents first', 'Measure answer quality with real questions', 'Add integrations and users in later milestones'] },
      { type: 'callout', text: 'We start every chatbot project with a short discovery and prototype, then give a fixed quote for the full build, so you know the cost before committing.' },
    ],
  },
]

export const getPost = (slug: string) => posts.find(p => p.slug === slug)

export const readingTime = (p: Post) => {
  const words = p.body
    .map(b => ('text' in b ? b.text : 'items' in b ? b.items.join(' ') : 'code' in b ? b.code : ''))
    .join(' ')
    .split(/\s+/).length
  return Math.max(2, Math.round(words / 200))
}
