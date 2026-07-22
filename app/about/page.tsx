import Container from '@/components/layout/Container'
import TeamSlider from '@/components/sections/TeamSlider'
import CTASection from '@/components/sections/CTASection'
import { Target, Lightbulb, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {icon:<Target size={20}/>,title:'Precision',desc:"Every response grounded in your actual data — not guesses. We're building a platform you can bet your business on."},
    {icon:<Lightbulb size={20}/>,title:'Transparency',desc:'Open model selection, structured logging, and full audit trails. You always know what the AI is doing and why.'},
    {icon:<Heart size={20}/>,title:'Empathy',desc:'We design for the people who use AI daily — not just the engineers who deploy it. Simplicity is a feature.'},
    {icon:<Globe size={20}/>,title:'Accessibility',desc:"Enterprise-grade AI shouldn't require enterprise-grade budgets. We're democratizing intelligent document chat."},
  ]
  return (
    <div className="bg-white pt-20">
      <div className="h-[3px] bg-[#E8C547]" />
      {/* Hero */}
      <section className="py-24 border-b border-[#e0e0e0]">
        <Container>
          <p className="eyebrow font-dm mb-5">Our story</p>
          <h1 className="font-syne font-extrabold text-[clamp(48px,7vw,88px)] text-black leading-tight tracking-tight mb-7">
            We believe AI should<br /><span className="text-[#999]">work for everyone.</span>
          </h1>
          <p className="text-[#555] font-dm text-xl max-w-2xl leading-relaxed">
            EchoLoft was born from a simple frustration: enterprise AI tools were either too expensive, too opaque, or too unreliable. We built what we wished existed.
          </p>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-24 border-b border-[#e0e0e0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="eyebrow font-dm mb-5">Mission</p>
              <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,56px)] text-black leading-tight tracking-tight mb-6">
                Make AI answers as trustworthy<br /><span className="text-[#999]">as your data.</span>
              </h2>
              <p className="text-[#555] font-dm leading-relaxed mb-4 text-[16px]">
                Most LLMs hallucinate. EchoLoft's RAG pipeline ensures every response is anchored to the documents you provide. If it's not in your data, the model says so.
              </p>
              <p className="text-[#555] font-dm leading-relaxed text-[16px]">
                We pair this with Groq's lightning-fast inference, a robust auth system built with JWT refresh rotation and Argon2 hashing, and a document-processing engine that handles messy real-world files.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{label:'Founded',value:'2024'},{label:'Team Size',value:'18'},{label:'Models Supported',value:'16'},{label:'Countries',value:'34'}].map(s=>(
                <div key={s.label} className="border border-[#e0e0e0] rounded-2xl p-8 text-center hover:border-black hover:-translate-y-1 transition-all duration-200">
                  <p className="font-syne font-extrabold text-[42px] text-black leading-none mb-2">{s.value}</p>
                  <p className="text-xs text-[#999] font-dm uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 border-b border-[#e0e0e0]">
        <Container>
          <p className="eyebrow font-dm mb-5">Our values</p>
          <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,56px)] text-black leading-tight tracking-tight mb-14">
            Principles that guide<br /><span className="text-[#999]">every decision.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e0e0e0] border border-[#e0e0e0]">
            {values.map(v=>(
              <div key={v.title} className="bg-white p-10 hover:bg-[#f7f7f7] transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] flex items-center justify-center text-black mb-6 group-hover:bg-black group-hover:text-white transition-all">{v.icon}</div>
                <h3 className="font-syne font-bold text-[15px] text-black mb-3 uppercase tracking-wide">{v.title}</h3>
                <p className="text-sm text-[#555] font-dm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TeamSlider />
      <CTASection />
    </div>
  )
}
