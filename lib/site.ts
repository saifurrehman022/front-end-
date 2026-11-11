// Single source of truth for brand, contact and SEO defaults.
// Edit this file to change site-wide details.

export const siteConfig = {
  name: 'EchoLoft AI',
  shortName: 'EchoLoft',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://echoloftai.com').replace(/\/$/, ''),
  title: 'EchoLoft AI — AI Automation, Data Pipelines, Robotics & IoT Development',
  description:
    'EchoLoft AI builds AI automation and smart machines: data pipelines, RAG chatbots, AI agents, GPU model deployment, AI SaaS, robotics and ESP32 / Raspberry Pi IoT. 30+ projects delivered, 100% Job Success, 5.0 client rating.',
  tagline: 'Intelligent software. Smart machines.',
  email: 'echoloft.ai@gmail.com',
  /** Optional: shown in the top bar and footer, and used in structured data. Leave '' to hide. */
  phone: '',
  /** Optional: fill in for local SEO (e.g. city: 'Karachi', country: 'PK'). */
  address: { city: '', region: '', country: '' },
  location: 'Remote · Serving clients worldwide',
  responseTime: 'Reply within 24 hours',
  keywords: [
    'AI development company',
    'AI development agency',
    'robotics development services',
    'IoT development company',
    'Raspberry Pi development services',
    'ESP32 firmware development',
    'Arduino prototyping services',
    'embedded systems development',
    'RAG development services',
    'custom AI chatbot development',
    'AI agent development',
    'RunPod serverless deployment',
    'ComfyUI API development',
    'AI SaaS MVP development',
    'computer vision development',
    'hire AI engineer',
    'data automation services',
    'ETL pipeline development',
    'AI workflow automation',
  ],
  socials: {
    github: 'https://github.com/saif816',
    linkedin: 'https://www.linkedin.com/in/saif-ur-rehman-342a57235',
    x: '',
    youtube: '',
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services', mega: true },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
}

export const absoluteUrl = (path = '/') => `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
