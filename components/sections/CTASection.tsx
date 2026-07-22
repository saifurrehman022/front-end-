'use client'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'

export default function CTASection() {
  const router = useRouter()
  return (
    <section className="bg-black py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-7">
          <h2 className="font-syne font-extrabold text-[clamp(42px,6vw,80px)] text-white leading-tight tracking-tight">
            Ready to build with<br /><span className="text-[#E8C547]">AI you trust?</span>
          </h2>
          <p className="text-[17px] text-[#888] font-dm leading-relaxed max-w-md">
            Join 500+ companies using EchoLoft AI to power intelligent, document-aware chat. Get started free — no credit card needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => router.push('/auth/signup')}
              className="group h-[52px] px-9 bg-[#E8C547] text-black rounded-full text-[15px] font-dm font-bold hover:bg-[#F5D76E] hover:shadow-[0_0_32px_rgba(232,197,71,0.3)] transition-all flex items-center gap-2">
              Start for free
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => router.push('/contact')}
              className="h-[52px] px-9 bg-transparent border-[1.5px] border-[#333] text-white rounded-full text-[15px] font-dm font-semibold hover:border-[#666] transition-all">
              Talk to sales
            </button>
          </div>
          <p className="text-xs text-[#555] font-dm">Free tier · No credit card · Cancel anytime</p>
        </div>
      </Container>
    </section>
  )
}
