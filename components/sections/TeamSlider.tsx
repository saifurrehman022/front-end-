'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Linkedin, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/layout/Container'

const team = [
  {name:'Saif-Ur-Rehman ',role:'CEO & Co-Founder',bio:'Former ML lead at Google DeepMind. 10+ years building production AI systems for enterprise clients.',avatar:'AM',tags:['LLMs','Strategy','Enterprise AI'],li:'#',tw:'#'},
  {name:'Ezio ',role:'CTO & Co-Founder',bio:'Systems architect who scaled Groq integrations at 3 unicorn startups. Obsessed with sub-100ms inference.',avatar:'SQ',tags:['FastAPI','RAG','Vector DBs'],li:'#',tw:'#'},
  {name:'Daniel Osei',role:'Head of AI Research',bio:'PhD from Stanford NLP. Published researcher in retrieval-augmented generation and embedding optimization.',avatar:'DO',tags:['NLP','FAISS','Embeddings'],li:'#',tw:'#'},
  {name:'Geoff Macbe',role:'Head of Product',bio:"Previously PM at Notion and Linear. Drives EchoLoft's roadmap from user insights to production features.",avatar:'PN',tags:['UX Strategy','Roadmap','B2B SaaS'],li:'#',tw:'#'},
]

export default function TeamSlider() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + team.length) % team.length)
  const next = () => setIdx(i => (i + 1) % team.length)
  const visible = [team[idx % 4], team[(idx + 1) % 4], team[(idx + 2) % 4]]

  return (
    <section className="bg-[#f7f7f7] border-t border-[#e0e0e0] py-24">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow font-dm mb-4">The people</p>
            <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,60px)] text-black leading-tight">
              Meet the team<br /><span className="text-[#999]">behind EchoLoft.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-11 h-11 rounded-full border-[1.5px] border-[#e0e0e0] bg-white flex items-center justify-center text-[#555] hover:border-black hover:text-black hover:bg-black hover:text-white transition-all duration-200 [&:hover>svg]:stroke-white">
              <ChevronLeft size={17} />
            </button>
            <button onClick={next} className="w-11 h-11 rounded-full border-[1.5px] border-[#e0e0e0] bg-white flex items-center justify-center text-[#555] hover:border-black hover:bg-black hover:text-white transition-all duration-200">
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((m, i) => (
            <div key={`${m.name}-${i}`}
              className={cn('bg-white border border-[#e0e0e0] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-200', i === 2 && 'hidden lg:block')}>
              {/* Card top */}
              <div className="h-[160px] bg-[#f0f0f0] flex items-center justify-center relative">
                <div className="w-[72px] h-[72px] rounded-full bg-black flex items-center justify-center font-syne font-extrabold text-xl text-white">
                  {m.avatar}
                </div>
                {/* Social icons top right */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <a href={m.tw} className="w-8 h-8 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center text-[#999] hover:text-black hover:border-black transition-all">
                    <Twitter size={12} />
                  </a>
                  <a href={m.li} className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:bg-[#084f9a] transition-colors">
                    <Linkedin size={12} />
                  </a>
                </div>
              </div>
              {/* Card body */}
              <div className="p-6">
                <h3 className="font-syne font-extrabold text-[16px] text-black">{m.name}</h3>
                <p className="text-[13px] text-[#999] font-dm font-medium mt-0.5 mb-3">{m.role}</p>
                <p className="text-[13.5px] text-[#555] font-dm leading-relaxed mb-4">{m.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-[#f0f0f0] text-[11px] font-semibold text-[#555] font-dm">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {team.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={cn('transition-all duration-300 rounded-full h-2', idx===i ? 'w-6 bg-black' : 'w-2 bg-[#e0e0e0] hover:bg-[#999]')} />
          ))}
        </div>
      </Container>
    </section>
  )
}
