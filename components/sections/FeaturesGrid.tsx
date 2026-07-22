import { Brain, Zap, Shield, Globe, FileText, BarChart3, Cpu, Lock } from 'lucide-react'
import Container from '@/components/layout/Container'

const features = [
  {icon:<Brain size={20}/>,title:'RAG intelligence',desc:'Upload any document — PDFs, DOCX, XLSX, images — and get answers grounded in your actual data using FAISS vector search.',tag:'Vector search'},
  {icon:<Zap size={20}/>,title:'Streamed responses',desc:"Real-time token streaming via Groq's ultra-fast inference. First token under 50ms. No waiting, no spinners.",tag:'Groq powered'},
  {icon:<Globe size={20}/>,title:'Live web search',desc:'Integrated DuckDuckGo tool-calling. The model decides when to search — you always get the freshest answer.',tag:'Real-time'},
  {icon:<Shield size={20}/>,title:'JWT auth + rotation',desc:'Argon2id-hashed passwords, short-lived access tokens, and automatic refresh rotation with full session revocation.',tag:'Enterprise-grade'},
  {icon:<FileText size={20}/>,title:'Multi-format ingestion',desc:'Extract text from PDF, Word, Excel, CSV, and even scanned images via OCR — all in a single upload.',tag:'OCR included'},
  {icon:<Cpu size={20}/>,title:'16 model selection',desc:'Choose from Llama 4, Kimi K2, Qwen 3, and GPT-OSS models. Swap models per conversation with no friction.',tag:'Multi-model'},
  {icon:<BarChart3 size={20}/>,title:'Conversation memory',desc:'Full multi-turn conversation history persisted in MongoDB. Resume any session with complete context intact.',tag:'Persistent'},
  {icon:<Lock size={20}/>,title:'RabbitMQ events',desc:'Async event streaming for auth, chat, and audit logs via CloudAMQP — graceful degradation built-in.',tag:'Event-driven'},
]

export default function FeaturesGrid() {
  return (
    <section className="bg-white">
      <Container className="pt-20 pb-10">
        <p className="eyebrow font-dm mb-5">Platform capabilities</p>
        <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,60px)] text-black mb-0 leading-tight">
          Everything you need.<br /><span className="text-[#999]">Nothing you don't.</span>
        </h2>
      </Container>
      {/* Full bleed grid */}
      <div className="border-t border-[#e0e0e0]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={f.title}
              className="group p-10 border-r border-b border-[#e0e0e0] hover:bg-[#f7f7f7] transition-colors duration-200 last:border-r-0 [&:nth-child(4n)]:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0">
              <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] flex items-center justify-center text-black mb-5 group-hover:bg-black group-hover:text-white transition-all duration-200">
                {f.icon}
              </div>
              <h3 className="font-syne font-bold text-[14px] text-black mb-2.5 uppercase tracking-wide">{f.title}</h3>
              <p className="text-[13.5px] text-[#555] font-dm leading-relaxed mb-5">{f.desc}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-[#f0f0f0] text-[11px] font-semibold text-[#555] font-dm group-hover:bg-black group-hover:text-white transition-all duration-200">
                {f.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
