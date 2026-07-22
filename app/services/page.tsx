import ServicesTabs from '@/components/sections/ServicesTabs'
import CTASection from '@/components/sections/CTASection'
import Container from '@/components/layout/Container'
import { CheckCircle2 } from 'lucide-react'

const pricing = [
  {name:'Starter',price:'$0',period:'/mo',desc:'For individuals exploring AI-powered chat.',features:['50 messages/month','1 conversation','PDF & DOCX uploads','Llama 3.1 8B model','Community support'],cta:'Start Free',href:'/auth/signup',highlight:false},
  {name:'Pro',price:'$49',period:'/mo',desc:'For teams building real workflows.',features:['Unlimited messages','50 conversations','All file formats + OCR','All 16 models','Web search enabled','Priority support'],cta:'Start Pro',href:'/auth/signup',highlight:true},
  {name:'Enterprise',price:'Custom',period:'',desc:'For organizations with advanced requirements.',features:['Unlimited everything','On-prem deployment','SSO & SAML','Custom fine-tuning','Dedicated SLA','White-label option'],cta:'Contact Sales',href:'/contact',highlight:false},
]

export default function ServicesPage() {
  return (
    <div className="bg-white pt-20">
      <div className="h-[3px] bg-[#E8C547]" />
      <section className="py-24 border-b border-[#e0e0e0]">
        <Container>
          <p className="eyebrow font-dm mb-5">Services & Pricing</p>
          <h1 className="font-syne font-extrabold text-[clamp(48px,7vw,88px)] text-black leading-tight tracking-tight mb-6">
            The full platform.<br /><span className="text-[#999]">Pick your plan.</span>
          </h1>
          <p className="text-[#555] font-dm text-xl max-w-lg leading-relaxed">From solo developers to Fortune 500 teams — EchoLoft scales with you.</p>
        </Container>
      </section>

      <ServicesTabs />

      {/* Pricing */}
      <section className="py-24 border-t border-[#e0e0e0]">
        <Container>
          <div className="text-center mb-16">
            <p className="eyebrow font-dm mb-5">Pricing</p>
            <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,60px)] text-black leading-tight tracking-tight">
              Simple, transparent<br /><span className="text-[#999]">pricing.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricing.map(plan=>(
              <div key={plan.name} className={`rounded-2xl p-8 flex flex-col gap-6 border relative overflow-hidden transition-all duration-200 hover:-translate-y-1 ${plan.highlight ? 'bg-black border-black text-white' : 'bg-white border-[#e0e0e0] hover:border-black hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]'}`}>
                {plan.highlight && <div className="absolute top-4 right-4 px-3 py-1 bg-[#E8C547] text-black text-xs font-dm font-bold rounded-full">Most Popular</div>}
                <div>
                  <h3 className={`font-syne font-bold text-lg mb-1 ${plan.highlight?'text-white':'text-black'}`}>{plan.name}</h3>
                  <p className={`text-sm font-dm ${plan.highlight?'text-[#888]':'text-[#999]'}`}>{plan.desc}</p>
                </div>
                <div className="flex items-end gap-1">
                  <span className={`font-syne font-extrabold text-[52px] leading-none ${plan.highlight?'text-white':'text-black'}`}>{plan.price}</span>
                  <span className={`font-dm mb-1 ${plan.highlight?'text-[#888]':'text-[#999]'}`}>{plan.period}</span>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map(f=>(
                    <li key={f} className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className={plan.highlight?'text-[#E8C547]':'text-black'} />
                      <span className={`text-sm font-dm ${plan.highlight?'text-[#ccc]':'text-[#555]'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={plan.href} className={`h-12 rounded-full flex items-center justify-center text-sm font-dm font-semibold transition-all ${plan.highlight?'bg-[#E8C547] text-black hover:bg-[#F5D76E]':'bg-black text-white hover:bg-[#222]'}`}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </div>
  )
}
