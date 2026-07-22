'use client'
import { useRouter } from 'next/navigation'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'

export default function Hero() {
  const router = useRouter()
  const [videoOpen, setVideoOpen] = useState(false)
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center bg-white px-6 pt-24 pb-16">
      {/* Subtle amber top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#E8C547]" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Badge */}
        <div className="mb-10 animate-slide-up" style={{animationDelay:'0.1s',opacity:0}}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0f0f0] text-[#555] text-xs font-dm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8C547] inline-block" />
            Now with Llama 4 &amp; Kimi K2 support
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-syne font-extrabold text-[clamp(52px,9vw,104px)] text-black leading-[1.0] tracking-[-0.04em] mb-7 animate-slide-up"
            style={{animationDelay:'0.18s',opacity:0}}>
          Intelligence<br />
          <span className="text-[#999]">from your data.</span>
        </h1>

        {/* Sub */}
        <p className="text-[18px] text-[#555] font-dm max-w-xl leading-relaxed mb-12 animate-slide-up"
           style={{animationDelay:'0.3s',opacity:0}}>
          EchoLoft AI turns your documents, PDFs, and internal knowledge base into real-time intelligent chat — grounded in facts, not guesswork.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-slide-up" style={{animationDelay:'0.42s',opacity:0}}>
          <button onClick={() => router.push('/contact')}
            className="group h-[52px] px-8 bg-black text-white rounded-full text-[15px] font-dm font-semibold hover:bg-[#222] transition-all flex items-center gap-2.5">
            Request demo
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => setVideoOpen(true)}
            className="group h-[52px] px-8 bg-transparent border-[1.5px] border-[#e0e0e0] text-black rounded-full text-[15px] font-dm font-semibold hover:border-black hover:bg-[#f7f7f7] transition-all flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#f0f0f0] border border-[#e0e0e0] flex items-center justify-center group-hover:bg-[#E8C547] group-hover:border-[#E8C547] transition-all">
              <Play size={10} fill="black" className="text-black ml-0.5" />
            </div>
            Watch video
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-10 border-t border-[#e0e0e0] flex flex-wrap gap-x-16 gap-y-6 animate-slide-up"
             style={{animationDelay:'0.55s',opacity:0}}>
          {[{v:'500+',l:'Companies'},{v:'99.9%',l:'Uptime SLA'},{v:'<200ms',l:'Response time'},{v:'16',l:'AI models'}].map(s=>(
            <div key={s.l}>
              <div className="font-syne font-extrabold text-[30px] text-black leading-none tracking-tight">{s.v}</div>
              <div className="text-xs text-[#999] font-dm mt-1 uppercase tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} title="Product Overview">
        <div className="aspect-video bg-[#f7f7f7] rounded-xl flex items-center justify-center border border-[#e0e0e0]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#e0e0e0] bg-white flex items-center justify-center mx-auto mb-3">
              <Play size={22} fill="black" className="text-black ml-1" />
            </div>
            <p className="text-[#999] text-sm font-dm">Video coming soon</p>
          </div>
        </div>
      </Modal>
    </section>
  )
}
