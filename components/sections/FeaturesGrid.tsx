import { Brain, Zap, Shield, Globe, FileText, BarChart3, Cpu, Lock } from 'lucide-react'
import Container from '@/components/layout/Container'

const features = [
  {
    icon: <Brain size={22} />,
    title: 'RAG-Powered Intelligence',
    desc: 'Upload any document — PDFs, DOCX, XLSX, images — and get answers grounded in your actual data using FAISS vector search.',
    accent: 'accent',
  },
  {
    icon: <Zap size={22} />,
    title: 'Streamed Responses',
    desc: 'Real-time token streaming via Groq\'s ultra-fast inference. First token in under 50ms. No waiting, no spinners.',
    accent: 'accent-3',
  },
  {
    icon: <Globe size={22} />,
    title: 'Live Web Search',
    desc: 'Integrated DuckDuckGo tool-calling. The model decides when to search — you always get the freshest answer.',
    accent: 'accent-2',
  },
  {
    icon: <Shield size={22} />,
    title: 'JWT Auth + Refresh Rotation',
    desc: 'Argon2id-hashed passwords, short-lived access tokens, and automatic refresh rotation with full session revocation.',
    accent: 'accent',
  },
  {
    icon: <FileText size={22} />,
    title: 'Multi-Format Ingestion',
    desc: 'Extract text from PDF, Word, Excel, CSV, and even scanned images via OCR — all in a single upload.',
    accent: 'accent-3',
  },
  {
    icon: <Cpu size={22} />,
    title: '16 Model Selection',
    desc: 'Choose from Llama 4, Kimi K2, Qwen 3, and GPT-OSS models. Swap models per conversation with no friction.',
    accent: 'accent-2',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Conversation Memory',
    desc: 'Full multi-turn conversation history persisted in MongoDB. Resume any session with complete context intact.',
    accent: 'accent',
  },
  {
    icon: <Lock size={22} />,
    title: 'Enterprise Ready',
    desc: 'Audit-log ready architecture, structured JSON logging, and environment-based config for SOC2-aligned deployments.',
    accent: 'accent-3',
  },
]

const accentMap: Record<string, string> = {
  accent: 'text-accent bg-accent/10 border-accent/20',
  'accent-2': 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20',
  'accent-3': 'text-[#38d9a9] bg-[#38d9a9]/10 border-[#38d9a9]/20',
}

export default function FeaturesGrid() {
  return (
    <section className="py-24 relative">
      <Container>
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-dm mb-3">Platform Capabilities</p>
          <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-text-primary">
            Everything you need.
            <br />
            <span className="gradient-text">Nothing you don't.</span>
          </h2>
          <p className="text-text-secondary font-dm text-lg mt-4 max-w-xl mx-auto">
            A complete AI infrastructure stack — from auth to inference — production-ready out of the box.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-surface border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-4 hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/8 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${accentMap[f.accent]}`}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-syne font-bold text-base text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary font-dm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
