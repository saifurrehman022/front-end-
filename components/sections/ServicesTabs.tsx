'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Brain, BarChart3, Search, Wrench, Shield, ArrowRight,
  Bot, Server, Image as ImageIcon, Rocket, LifeBuoy
} from 'lucide-react'
import Container from '@/components/layout/Container'
import { useRouter } from 'next/navigation'

const tabs = [
  { id: 'rag',         label: 'RAG Chat',        icon: <Brain size={14} /> },
  { id: 'agents',      label: 'Agentic AI',       icon: <Bot size={14} /> },
  { id: 'runpod',      label: 'RunPod Deploy',    icon: <Server size={14} /> },
  { id: 'comfyui',     label: 'ComfyUI / Media',  icon: <ImageIcon size={14} /> },
  { id: 'mvp',         label: 'SaaS MVP Builds',  icon: <Rocket size={14} /> },
  { id: 'consulting',  label: 'Consulting',       icon: <BarChart3 size={14} /> },
  { id: 'audit',       label: 'AI Audit',         icon: <Search size={14} /> },
  { id: 'integration', label: 'Integration',      icon: <Wrench size={14} /> },
  { id: 'security',    label: 'Security & Auth',  icon: <Shield size={14} /> },
  { id: 'support',     label: 'Managed Support',  icon: <LifeBuoy size={14} /> },
]

interface TabContent {
  headline: string
  desc: string
  points: string[]
  stack: string[]
  deliverables: string[]
  badge: string
}

const content: Record<string, TabContent> = {
  rag: {
    headline: 'Retrieval-Augmented Generation',
    desc: 'Upload PDFs, Word docs, spreadsheets, or images and let EchoLoft answer questions grounded in your actual data — not hallucinations.',
    points: [
      'Multi-format ingestion (PDF, DOCX, XLSX, CSV, Images)',
      'FAISS vector search with sentence-transformer embeddings',
      'Streamed responses under 200ms average latency',
      'Session-based conversation memory with MongoDB persistence',
      'Source citations returned with every answer',
    ],
    stack: ['FastAPI', 'FAISS', 'Groq', 'MongoDB', 'sentence-transformers'],
    deliverables: ['Ingestion pipeline', 'Vector store', 'Chat API', 'Citation layer'],
    badge: 'Core Product',
  },
  agents: {
    headline: 'Agentic AI Systems',
    desc: 'Autonomous agents that plan, call tools, and complete multi-step tasks — built on Claude and Hugging Face smolagents, not a single-turn chatbot wrapper.',
    points: [
      'Multi-step task planning with iterative tool-calling loops',
      'Hugging Face smolagents & custom agent orchestration frameworks',
      'Claude-powered reasoning with structured function calling',
      'Human-in-the-loop approval gates for high-stakes actions',
      'Memory and state management across long-running agent sessions',
    ],
    stack: ['Claude', 'smolagents', 'LangGraph', 'Python', 'Redis'],
    deliverables: ['Agent architecture', 'Tool integrations', 'Approval workflow', 'Observability dashboard'],
    badge: 'Autonomous',
  },
  runpod: {
    headline: 'RunPod Serverless Deployment',
    desc: 'GPU inference deployed on RunPod serverless infrastructure — pay-per-second billing, autoscale from zero, no idle GPU cost eating your margins.',
    points: [
      'Serverless GPU endpoints with cold-start optimization',
      'Custom Docker images for any model — LLM, diffusion, TTS, embeddings',
      'Autoscaling from 0 to N workers based on live queue depth',
      'Usage-based billing dashboards for real-time cost tracking',
      'Multi-region deployment for latency-sensitive workloads',
    ],
    stack: ['RunPod', 'Docker', 'CUDA', 'vLLM', 'Triton'],
    deliverables: ['Container image', 'Endpoint config', 'Autoscaling rules', 'Cost dashboard'],
    badge: 'GPU Infrastructure',
  },
  comfyui: {
    headline: 'ComfyUI — Images, Video & LoRA',
    desc: 'Production ComfyUI backends for image generation, video synthesis, and custom LoRA training pipelines, wrapped in a real API your product can call.',
    points: [
      'Custom ComfyUI workflows exposed as versioned REST endpoints',
      'LoRA fine-tuning pipelines for brand-consistent visual output',
      'Image-to-video and text-to-video pipeline deployment',
      'Queue management and job orchestration for high-throughput generation',
      'Asset storage and CDN delivery for generated media',
    ],
    stack: ['ComfyUI', 'Stable Diffusion', 'RunPod', 'S3', 'FFmpeg'],
    deliverables: ['Workflow API', 'LoRA training pipeline', 'Job queue', 'Media CDN'],
    badge: 'Generative Media',
  },
  mvp: {
    headline: 'SaaS MVP Builds',
    desc: 'Full-stack MVPs — website, backend, auth, and database — shipped fast using Claude-assisted development and Cowork-driven workflows.',
    points: [
      'Next.js + FastAPI + Postgres/MongoDB starter stacks',
      'JWT auth with refresh-token rotation out of the box',
      'Claude Code and Cowork-accelerated build process',
      'Deployed to production with CI/CD in days, not months',
      'Stripe billing and subscription management pre-wired',
    ],
    stack: ['Next.js', 'FastAPI', 'Claude Code', 'Vercel', 'Stripe'],
    deliverables: ['Production repo', 'CI/CD pipeline', 'Auth system', 'Billing integration'],
    badge: 'Rapid Build',
  },
  consulting: {
    headline: 'Strategic AI Consulting',
    desc: 'Our AI architects work with your team to identify high-ROI automation opportunities and design model pipelines that integrate into your stack.',
    points: [
      'AI readiness assessment & gap analysis',
      'Custom model selection & fine-tuning roadmap',
      'Integration planning with existing enterprise workflows',
      'KPI definition and outcome measurement',
      'Build-vs-buy recommendations backed by cost modeling',
    ],
    stack: ['Notion', 'Miro', 'Custom eval harness'],
    deliverables: ['Readiness report', 'Architecture roadmap', 'KPI framework'],
    badge: 'Enterprise',
  },
  audit: {
    headline: 'AI System Auditing',
    desc: 'Comprehensive audits of your existing AI models and pipelines to identify bias, drift, security vulnerabilities, and cost inefficiencies.',
    points: [
      'Model bias & fairness evaluation',
      'Data pipeline integrity checks',
      'Latency and cost profiling across your inference stack',
      'Security & compliance audit reports',
      'Drift monitoring recommendations for production models',
    ],
    stack: ['Custom eval suite', 'Weights & Biases', 'OWASP LLM Top 10'],
    deliverables: ['Audit report', 'Risk matrix', 'Remediation plan'],
    badge: 'Risk & Compliance',
  },
  integration: {
    headline: 'Seamless System Integration',
    desc: "EchoLoft connects to your SaaS stack — from CRMs to internal wikis — turning siloed data into an AI-queryable knowledge base.",
    points: [
      'REST API & webhook support',
      'Pre-built connectors for Notion, Slack, Google Drive',
      'Custom ETL pipelines for private data lakes',
      'Real-time sync with live data sources',
      'Rate-limit-aware batching for third-party APIs',
    ],
    stack: ['FastAPI', 'RabbitMQ', 'CloudAMQP', 'REST/Webhooks'],
    deliverables: ['Connector suite', 'ETL pipeline', 'Sync monitoring'],
    badge: 'Developer Friendly',
  },
  security: {
    headline: 'Enterprise-Grade Security & Auth',
    desc: 'Built with security in mind — JWT with refresh token rotation, Argon2 hashing, FastAPI-based auth microservices, and audit logging on every interaction.',
    points: [
      'JWT access + refresh token rotation',
      'Argon2id password hashing',
      'FastAPI auth microservices with OAuth2 support',
      'Full request audit trail logging',
      'SOC2-aligned data handling practices',
    ],
    stack: ['FastAPI', 'Argon2', 'OAuth2', 'JWT'],
    deliverables: ['Auth microservice', 'Audit log system', 'Compliance checklist'],
    badge: 'Zero Trust',
  },
  support: {
    headline: 'Managed Support & SLAs',
    desc: 'Ongoing monitoring, on-call support, and SLA-backed uptime for everything we deploy — GPU endpoints, agents, and APIs alike.',
    points: [
      '24/7 uptime monitoring with alerting',
      'Dedicated Slack channel with guaranteed response times',
      'Monthly performance & cost optimization reviews',
      'Incident postmortems and rollback playbooks',
      'Quarterly roadmap planning sessions',
    ],
    stack: ['PagerDuty', 'Grafana', 'Slack'],
    deliverables: ['SLA agreement', 'Monitoring setup', 'Monthly reports'],
    badge: 'Ongoing',
  },
}

export default function ServicesTabs() {
  const [active, setActive] = useState('rag')
  const router = useRouter()
  const d = content[active]

  return (
    <section className="bg-[#f5f8f5] border-t border-[#cfdfcf] py-24">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow font-dm mb-4">What we offer</p>
            <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,60px)] text-black leading-tight">
              One platform.<br /><span className="text-[#7c8a7c]">Infinite use cases.</span>
            </h2>
          </div>
        </div>

        {/* Pill chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                'flex items-center gap-1.5 h-9 px-5 rounded-full text-sm font-dm font-semibold border-[1.5px] transition-all duration-200',
                active === t.id
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-[#4a564a] border-[#cfdfcf] hover:border-black hover:text-black'
              )}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div key={active} className="grid grid-cols-1 lg:grid-cols-2 border border-[#cfdfcf] rounded-2xl overflow-hidden animate-fade-in">
          {/* Left — black */}
          <div className="bg-black p-10 lg:p-14 flex flex-col gap-6">
            <span className="inline-flex px-3 py-1 rounded-full bg-[#1a1a1a] text-[11px] font-semibold text-[#888] font-dm w-fit tracking-widest uppercase">
              {d.badge}
            </span>
            <h3 className="font-syne font-extrabold text-[26px] lg:text-[30px] text-white leading-tight">{d.headline}</h3>
            <p className="text-[15px] text-[#888] font-dm leading-relaxed">{d.desc}</p>
            <ul className="flex flex-col gap-3">
              {d.points.map(pt => (
                <li key={pt} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C89A2E] mt-2 shrink-0" />
                  <span className="text-[14px] text-[#999] font-dm">{pt}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push('/contact')}
              className="group w-fit h-10 px-6 bg-[#C89A2E] text-black rounded-full text-sm font-dm font-semibold hover:brightness-110 transition-all flex items-center gap-2 mt-2"
            >
              Talk to us
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right — light, now shows stack + deliverables instead of generic tiles */}
          <div className="bg-[#edf3ed] p-10 lg:p-14 flex flex-col gap-8">
            <div>
              <span className="text-[11px] font-semibold text-[#7c8a7c] font-dm uppercase tracking-[0.2em] mb-3 block">
                Built with
              </span>
              <div className="flex flex-wrap gap-2">
                {d.stack.map(s => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full bg-[#f5f8f5] border border-[#cfdfcf] text-xs font-mono text-[#4a564a]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-[#7c8a7c] font-dm uppercase tracking-[0.2em] mb-3 block">
                You get
              </span>
              <div className="flex flex-col gap-2">
                {d.deliverables.map(item => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#f5f8f5] rounded-xl border border-[#cfdfcf]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C89A2E] shrink-0" />
                    <span className="text-sm font-dm text-[#4a564a]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
