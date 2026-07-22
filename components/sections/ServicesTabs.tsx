'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Brain, BarChart3, Search, Wrench, Shield, CheckCircle2, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import { useRouter } from 'next/navigation'

const tabs = [
  {id:'rag',label:'RAG Chat',icon:<Brain size={14}/>},
  {id:'consulting',label:'Consulting',icon:<BarChart3 size={14}/>},
  {id:'audit',label:'AI Audit',icon:<Search size={14}/>},
  {id:'integration',label:'Integration',icon:<Wrench size={14}/>},
  {id:'security',label:'Security',icon:<Shield size={14}/>},
]'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Brain, BarChart3, Search, Wrench, Shield, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import { useRouter } from 'next/navigation'

const tabs = [
  {id:'rag',label:'RAG Chat',icon:<Brain size={14}/>},
  {id:'consulting',label:'Consulting',icon:<BarChart3 size={14}/>},
  {id:'audit',label:'AI Audit',icon:<Search size={14}/>},
  {id:'integration',label:'Integration',icon:<Wrench size={14}/>},
  {id:'security',label:'Security',icon:<Shield size={14}/>},
]

const content: Record<string, {headline:string;desc:string;points:string[];badge:string}> = {
  rag:          {headline:'Retrieval-Augmented Generation',desc:'Upload PDFs, Word docs, spreadsheets, or images and let EchoLoft answer questions grounded in your actual data — not hallucinations.',points:['Multi-format ingestion (PDF, DOCX, XLSX, CSV, Images)','FAISS vector search with sentence-transformer embeddings','Streamed responses under 200ms average latency','Session-based conversation memory with MongoDB persistence'],badge:'Core Product'},
  consulting:   {headline:'Strategic AI Consulting',desc:'Our AI architects work with your team to identify high-ROI automation opportunities and design model pipelines that integrate into your stack.',points:['AI readiness assessment & gap analysis','Custom model selection & fine-tuning roadmap','Integration with existing enterprise workflows','KPI definition and outcome measurement'],badge:'Enterprise'},
  audit:        {headline:'AI System Auditing',desc:'Comprehensive audits of your existing AI models and pipelines to identify bias, drift, security vulnerabilities, and cost inefficiencies.',points:['Model bias & fairness evaluation','Data pipeline integrity checks','Latency and cost profiling','Security & compliance audit reports'],badge:'Risk & Compliance'},
  integration:  {headline:'Seamless System Integration',desc:'EchoLoft connects to your SaaS stack — from CRMs to internal wikis — turning siloed data into an AI-queryable knowledge base.',points:['REST API & webhook support','Pre-built connectors for Notion, Slack, Google Drive','Custom ETL pipelines for private data lakes','Real-time sync with live data sources'],badge:'Developer Friendly'},
  security:     {headline:'Enterprise-Grade Security',desc:'Built with security in mind — JWT with refresh token rotation, Argon2 hashing, and audit logging on every interaction.',points:['JWT access + refresh token rotation','Argon2id password hashing','Full request audit trail logging','SOC2-aligned data handling practices'],badge:'Zero Trust'},
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
            <button key={t.id} onClick={() => setActive(t.id)}
              className={cn(
                'flex items-center gap-1.5 h-9 px-5 rounded-full text-sm font-dm font-semibold border-[1.5px] transition-all duration-200',
                active === t.id
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-[#4a564a] border-[#cfdfcf] hover:border-black hover:text-black'
              )}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div key={active} className="grid grid-cols-1 lg:grid-cols-2 border border-[#cfdfcf] rounded-2xl overflow-hidden animate-fade-in">
          {/* Left — black, untouched */}
          <div className="bg-black p-10 lg:p-14 flex flex-col gap-6">
            <span className="inline-flex px-3 py-1 rounded-full bg-[#1a1a1a] text-[11px] font-semibold text-[#888] font-dm w-fit tracking-widest uppercase">{d.badge}</span>
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
            <button onClick={() => router.push('/services')}
              className="group w-fit h-10 px-6 bg-[#C89A2E] text-black rounded-full text-sm font-dm font-semibold hover:brightness-110 transition-all flex items-center gap-2 mt-2">
              Explore service
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          {/* Right — light, updated to green shell */}
          <div className="bg-[#edf3ed] p-10 lg:p-14 flex flex-col items-center justify-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#f5f8f5] border border-[#cfdfcf] flex items-center justify-center shadow-sm">
              <div className="scale-[2] text-black">{tabs.find(t=>t.id===active)?.icon}</div>
            </div>
            <span className="text-[11px] font-semibold text-[#7c8a7c] font-dm uppercase tracking-[0.2em]">
              {active === 'rag' ? 'RAG · Vector Search' : active === 'consulting' ? 'Strategy · Architecture' : active === 'audit' ? 'Audit · Compliance' : active === 'integration' ? 'API · Connectors' : 'Security · Compliance'}
            </span>
            {/* Mini feature dots */}
            <div className="grid grid-cols-2 gap-3 mt-4 w-full max-w-xs">
              {['Fast','Secure','Scalable','Reliable'].map(tag=>(
                <div key={tag} className="flex items-center gap-2 px-3 py-2 bg-[#f5f8f5] rounded-xl border border-[#cfdfcf]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C89A2E]" />
                  <span className="text-xs font-semibold font-dm text-[#4a564a]">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

const content: Record<string, {headline:string;desc:string;points:string[];badge:string}> = {
  rag:          {headline:'Retrieval-Augmented Generation',desc:'Upload PDFs, Word docs, spreadsheets, or images and let EchoLoft answer questions grounded in your actual data — not hallucinations.',points:['Multi-format ingestion (PDF, DOCX, XLSX, CSV, Images)','FAISS vector search with sentence-transformer embeddings','Streamed responses under 200ms average latency','Session-based conversation memory with MongoDB persistence'],badge:'Core Product'},
  consulting:   {headline:'Strategic AI Consulting',desc:'Our AI architects work with your team to identify high-ROI automation opportunities and design model pipelines that integrate into your stack.',points:['AI readiness assessment & gap analysis','Custom model selection & fine-tuning roadmap','Integration with existing enterprise workflows','KPI definition and outcome measurement'],badge:'Enterprise'},
  audit:        {headline:'AI System Auditing',desc:'Comprehensive audits of your existing AI models and pipelines to identify bias, drift, security vulnerabilities, and cost inefficiencies.',points:['Model bias & fairness evaluation','Data pipeline integrity checks','Latency and cost profiling','Security & compliance audit reports'],badge:'Risk & Compliance'},
  integration:  {headline:'Seamless System Integration',desc:'EchoLoft connects to your SaaS stack — from CRMs to internal wikis — turning siloed data into an AI-queryable knowledge base.',points:['REST API & webhook support','Pre-built connectors for Notion, Slack, Google Drive','Custom ETL pipelines for private data lakes','Real-time sync with live data sources'],badge:'Developer Friendly'},
  security:     {headline:'Enterprise-Grade Security',desc:'Built with security in mind — JWT with refresh token rotation, Argon2 hashing, and audit logging on every interaction.',points:['JWT access + refresh token rotation','Argon2id password hashing','Full request audit trail logging','SOC2-aligned data handling practices'],badge:'Zero Trust'},
}

export default function ServicesTabs() {
  const [active, setActive] = useState('rag')
  const router = useRouter()
  const d = content[active]

  return (
    <section className="bg-white border-t border-[#e0e0e0] py-24">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow font-dm mb-4">What we offer</p>
            <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,60px)] text-black leading-tight">
              One platform.<br /><span className="text-[#999]">Infinite use cases.</span>
            </h2>
          </div>
        </div>

        {/* Pill chips — Uber-style */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={cn(
                'flex items-center gap-1.5 h-9 px-5 rounded-full text-sm font-dm font-semibold border-[1.5px] transition-all duration-200',
                active === t.id
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-[#555] border-[#e0e0e0] hover:border-black hover:text-black'
              )}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div key={active} className="grid grid-cols-1 lg:grid-cols-2 border border-[#e0e0e0] rounded-2xl overflow-hidden animate-fade-in">
          {/* Left — black */}
          <div className="bg-black p-10 lg:p-14 flex flex-col gap-6">
            <span className="inline-flex px-3 py-1 rounded-full bg-[#1a1a1a] text-[11px] font-semibold text-[#888] font-dm w-fit tracking-widest uppercase">{d.badge}</span>
            <h3 className="font-syne font-extrabold text-[26px] lg:text-[30px] text-white leading-tight">{d.headline}</h3>
            <p className="text-[15px] text-[#888] font-dm leading-relaxed">{d.desc}</p>
            <ul className="flex flex-col gap-3">
              {d.points.map(pt => (
                <li key={pt} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8C547] mt-2 shrink-0" />
                  <span className="text-[14px] text-[#999] font-dm">{pt}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => router.push('/services')}
              className="group w-fit h-10 px-6 bg-[#E8C547] text-black rounded-full text-sm font-dm font-semibold hover:bg-[#F5D76E] transition-all flex items-center gap-2 mt-2">
              Explore service
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          {/* Right — light */}
          <div className="bg-[#f7f7f7] p-10 lg:p-14 flex flex-col items-center justify-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white border border-[#e0e0e0] flex items-center justify-center shadow-sm">
              <div className="scale-[2] text-black">{tabs.find(t=>t.id===active)?.icon}</div>
            </div>
            <span className="text-[11px] font-semibold text-[#999] font-dm uppercase tracking-[0.2em]">
              {active === 'rag' ? 'RAG · Vector Search' : active === 'consulting' ? 'Strategy · Architecture' : active === 'audit' ? 'Audit · Compliance' : active === 'integration' ? 'API · Connectors' : 'Security · Compliance'}
            </span>
            {/* Mini feature dots */}
            <div className="grid grid-cols-2 gap-3 mt-4 w-full max-w-xs">
              {['Fast','Secure','Scalable','Reliable'].map(tag=>(
                <div key={tag} className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-[#e0e0e0]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8C547]" />
                  <span className="text-xs font-semibold font-dm text-[#555]">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
