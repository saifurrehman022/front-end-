'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Brain, Search, BarChart3, Wrench, Cloud, Shield,
  ChevronRight, CheckCircle2, ArrowRight
} from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

const tabs = [
  { id: 'rag', label: 'RAG Chat', icon: <Brain size={16} /> },
  { id: 'consulting', label: 'Consulting', icon: <BarChart3 size={16} /> },
  { id: 'audit', label: 'AI Audit', icon: <Search size={16} /> },
  { id: 'integration', label: 'Integration', icon: <Wrench size={16} /> },
  { id: 'cloud', label: 'Cloud Deploy', icon: <Cloud size={16} /> },
  { id: 'security', label: 'Security', icon: <Shield size={16} /> },
]

const content: Record<string, {
  headline: string
  description: string
  points: string[]
  badge: string
  color: string
}> = {
  rag: {
    headline: 'Retrieval-Augmented Generation',
    description: 'Upload PDFs, Word docs, spreadsheets, or images and let EchoLoft AI answer questions grounded in your actual data — not hallucinations.',
    points: ['Multi-format document ingestion (PDF, DOCX, XLSX, CSV, Images)', 'FAISS vector search with sentence-transformer embeddings', 'Streamed responses under 200ms average latency', 'Session-based conversation memory with MongoDB persistence'],
    badge: 'Core Product',
    color: 'accent',
  },
  consulting: {
    headline: 'Strategic AI Consulting',
    description: 'Our AI architects work directly with your team to identify high-ROI automation opportunities and design custom model pipelines that integrate into your stack.',
    points: ['AI readiness assessment & gap analysis', 'Custom model selection & fine-tuning roadmap', 'Integration with existing enterprise workflows', 'KPI definition and outcome measurement'],
    badge: 'Enterprise',
    color: 'accent-2',
  },
  audit: {
    headline: 'AI System Auditing',
    description: 'Comprehensive end-to-end audits of your existing AI models and pipelines to identify bias, drift, security vulnerabilities, and cost inefficiencies.',
    points: ['Model bias & fairness evaluation', 'Data pipeline integrity checks', 'Latency and cost profiling', 'Security & compliance audit reports'],
    badge: 'Risk & Compliance',
    color: 'accent-3',
  },
  integration: {
    headline: 'Seamless System Integration',
    description: 'EchoLoft connects to your existing SaaS stack — from CRMs and ERPs to internal wikis — turning siloed data into an AI-queryable knowledge base.',
    points: ['REST API & webhook support', 'Pre-built connectors for Notion, Slack, Google Drive', 'Custom ETL pipelines for private data lakes', 'Real-time sync with live data sources'],
    badge: 'Developer Friendly',
    color: 'accent',
  },
  cloud: {
    headline: 'Cloud-Native Deployment',
    description: 'Deploy EchoLoft on your own infrastructure — AWS, GCP, Azure, or on-prem — with full data sovereignty and enterprise-grade SLAs.',
    points: ['Docker & Kubernetes ready deployment', 'Multi-region availability and auto-scaling', 'VPC-isolated deployments for sensitive data', '99.9% uptime SLA with dedicated support'],
    badge: 'Infrastructure',
    color: 'accent-2',
  },
  security: {
    headline: 'Enterprise-Grade Security',
    description: 'Built from the ground up with security in mind — JWT with refresh token rotation, Argon2 hashing, and audit logging on every interaction.',
    points: ['JWT access + refresh token rotation', 'Argon2id password hashing', 'Full request audit trail logging', 'SOC2-aligned data handling practices'],
    badge: 'Zero Trust',
    color: 'accent-3',
  },
}

export default function ServicesTabs() {
  const [active, setActive] = useState('rag')
  const router = useRouter()
  const data = content[active]

  const accentColors: Record<string, string> = {
    accent: 'text-accent border-accent/20 bg-accent/10',
    'accent-2': 'text-[#a78bfa] border-[#a78bfa]/20 bg-[#a78bfa]/10',
    'accent-3': 'text-[#38d9a9] border-[#38d9a9]/20 bg-[#38d9a9]/10',
  }

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <Container className="relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-dm mb-3">What We Offer</p>
          <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-text-primary">
            One platform. <span className="gradient-text">Infinite use cases.</span>
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-surface/60 backdrop-blur border border-[var(--border)] rounded-2xl mb-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-dm font-medium transition-all duration-200 flex-1 justify-center sm:flex-none',
                active === tab.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          key={active}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-surface border border-[var(--border)] rounded-2xl p-8 lg:p-12 animate-slide-up"
        >
          <div className="flex flex-col justify-center gap-6">
            <span className={cn('inline-flex w-fit text-xs font-dm font-medium px-3 py-1.5 rounded-full border', accentColors[data.color])}>
              {data.badge}
            </span>
            <h3 className="font-syne font-bold text-3xl text-text-primary">{data.headline}</h3>
            <p className="text-text-secondary font-dm leading-relaxed">{data.description}</p>
            <ul className="flex flex-col gap-3">
              {data.points.map(pt => (
                <li key={pt} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-accent-3 mt-0.5 shrink-0" />
                  <span className="text-sm text-text-secondary font-dm">{pt}</span>
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-fit group" onClick={() => router.push('/services')}>
              Explore Service
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Visual panel */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square rounded-2xl bg-bg-2 border border-[var(--border)] flex flex-col items-center justify-center gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-accent/8 to-transparent" />
              <div className="w-20 h-20 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center relative z-10">
                <div className="text-accent scale-150">
                  {tabs.find(t => t.id === active)?.icon}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 relative z-10">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-2 rounded-full bg-surface-2"
                    style={{ opacity: 0.3 + (i % 3) * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
