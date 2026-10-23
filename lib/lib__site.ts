// Single source of truth for brand, contact and SEO defaults.
// Edit this file to change site-wide details.

export const siteConfig = {
  name: 'EchoLoft AI',
  shortName: 'EchoLoft',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://echoloftai.com').replace(/\/$/, ''),
  title: 'EchoLoft AI — AI Development Agency for RAG, AI Agents & GPU Deployment',
  description:
    'EchoLoft AI designs, builds and deploys production AI: RAG chatbots on your data, autonomous AI agents, RunPod serverless GPU inference, ComfyUI image & video pipelines, and full-stack AI SaaS MVPs.',
  tagline: 'Production AI, engineered end to end.',
  email: 'hello@echoloftai.com',
  location: 'Remote · Working with clients worldwide',
  responseTime: 'Reply within 24 hours',
  keywords: [
    'AI development agency',
    'AI development company',
    'RAG development services',
    'custom AI chatbot development',
    'AI agent development',
    'LLM application development',
    'RunPod serverless deployment',
    'GPU inference deployment',
    'ComfyUI API development',
    'AI video generation pipeline',
    'AI SaaS MVP development',
    'Next.js FastAPI developer',
    'AI automation services',
    'hire AI engineer',
  ],
  socials: {
    github: 'https://github.com/saifurrehman022',
    linkedin: '',
    x: '',
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/#work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
}

export const absoluteUrl = (path = '/') => `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
