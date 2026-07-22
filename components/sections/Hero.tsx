'use client'
import { useRouter } from 'next/navigation'
import { ArrowRight, Play } from 'lucide-react'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'

export default function Hero() {
  const router = useRouter()
  const [videoOpen, setVideoOpen] = useState(false)
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center bg-white px-6 pt-24 pb-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* Left — copy */}
        <div>
          <h1 className="font-syne font-extrabold text-[clamp(44px,6.5vw,84px)] text-black leading-[1.02] tracking-[-0.03em] mb-7 animate-slide-up" style={{animationDelay:'0.1s',opacity:0}}>
            Answers grounded<br /><span className="text-[#999]">in your data.</span>
          </h1>
          <p className="text-[17px] text-[#4d4c46] font-dm max-w-md leading-relaxed mb-10 animate-slide-up" style={{animationDelay:'0.22s',opacity:0}}>
            EchoLoft turns your documents into cited, verifiable chat — every answer traces back to a source. No guessing what the model made up.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-16 animate-slide-up" style={{animationDelay:'0.34s',opacity:0}}>
            <button onClick={() => router.push('/contact')}
              className="group h-[52px] px-8 bg-black text-white rounded-full text-[15px] font-dm font-semibold hover:bg-[#1e1e1e] transition-colors flex items-center gap-2.5">
              Request demo
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setVideoOpen(true)}
              className="group h-[52px] px-8 bg-transparent border border-[var(--border)] text-black rounded-full text-[15px] font-dm font-semibold hover:border-black transition-colors flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--bg-3)] flex items-center justify-center">
                <Play size={10} fill="black" className="ml-0.5" />
              </div>
              Watch video
            </button>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-6 pt-8 border-t border-[var(--border)] animate-slide-up" style={{animationDelay:'0.46s',opacity:0}}>
            {[{v:'500+',l:'Companies'},{v:'99.9%',l:'Uptime SLA'},{v:'<200ms',l:'Response time'}].map(s=>(
              <div key={s.l}>
                <div className="font-syne font-bold text-[28px] text-black leading-none">{s.v}</div>
                <div className="text-xs text-[#8f8e87] font-dm mt-1 uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — grounded-answer mock, the signature element */}
        <div className="animate-slide-up" style={{animationDelay:'0.3s',opacity:0}}>
          <div className="border border-[var(--border)] rounded-2xl bg-[var(--bg-2)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e3e3df]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e3e3df]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e3e3df]" />
              </div>
              <span className="text-xs text-[#8f8e87] font-mono-data ml-2">Q3_Revenue_Report.pdf</span>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <p className="text-sm text-[#4d4c46] font-dm">"What drove the margin increase last quarter?"</p>
              <div className="bg-white border border-[var(--border)] rounded-xl p-5">
                <p className="text-[14px] text-black font-dm leading-relaxed">
                  Margin improved primarily from vendor renegotiation <span className="cite-mark">1</span> and a 12% drop in fulfillment cost <span className="cite-mark">2</span>.
                </p>
                <span className="inline-block w-1.5 h-4 bg-black cursor-blink ml-0.5 align-middle" />
              </div>
              <div className="flex flex-col gap-1.5 text-xs font-mono-data text-[#8f8e87]">
                <span><span className="cite-mark">1</span> page 4, "Cost Structure"</span>
                <span><span className="cite-mark">2</span> page 6, "Logistics Summary"</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} title="Product Overview">
        <div className="aspect-video bg-[var(--bg-2)] rounded-xl flex items-center justify-center border border-[var(--border)]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[var(--border)] bg-white flex items-center justify-center mx-auto mb-3">
              <Play size={22} fill="black" className="ml-1" />
            </div>
            <p className="text-[#8f8e87] text-sm font-dm">Video coming soon</p>
          </div>
        </div>
      </Modal>
    </section>
  )
}
