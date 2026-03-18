import { CheckCircle2, Zap, Brain, Shield } from 'lucide-react'
import Container from '@/components/layout/Container'
import TeamSlider from '@/components/sections/TeamSlider'
import CTASection from '@/components/sections/CTASection'
import Badge from '@/components/ui/Badge'

const values = [
  { icon: <Brain size={20} className="text-accent" />, title: 'Research-First', desc: 'Every feature is grounded in peer-reviewed NLP research and real-world benchmarks, not marketing claims.' },
  { icon: <Shield size={20} className="text-accent-3" />, title: 'Privacy by Design', desc: 'Your data never trains our models. Full data sovereignty with VPC-isolated deployments available.' },
  { icon: <Zap size={20} className="text-accent-2" />, title: 'Relentless Speed', desc: 'We optimize every layer of the stack — from embedding caches to FAISS index tuning — for sub-50ms latency.' },
  { icon: <CheckCircle2 size={20} className="text-accent-3" />, title: 'Enterprise Reliability', desc: '99.9% uptime SLAs backed by multi-region infrastructure, automated failover, and dedicated incident teams.' },
]

const milestones = [
  { year: '2022', title: 'Founded', desc: 'EchoLoft AI was incorporated in San Francisco with seed funding from top-tier VCs.' },
  { year: '2023', title: 'Series A', desc: 'Closed $18M Series A. Launched the first RAG API with 50 design partners.' },
  { year: '2024', title: '100+ Clients', desc: 'Crossed 100 enterprise clients. Launched multi-model support including Llama 3 and Mixtral.' },
  { year: '2025', title: 'Global Expansion', desc: 'Opened EU & APAC data centers. Achieved SOC2 Type II certification.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/6 blur-[100px]" />
        <Container size="md" className="relative z-10 text-center">
          <Badge variant="accent" className="mb-6">Our Story</Badge>
          <h1 className="font-syne font-extrabold text-5xl lg:text-6xl text-text-primary mb-6">
            We believe AI should<br />
            <span className="gradient-text">work for everyone</span>
          </h1>
          <p className="text-xl text-text-secondary font-dm leading-relaxed max-w-2xl mx-auto">
            EchoLoft AI was founded by a team of ML engineers and enterprise architects who saw the gap between cutting-edge AI research and real business deployment. We bridge it.
          </p>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-3xl lg:text-4xl text-text-primary">What drives us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => (
              <div key={v.title} className="bg-surface border border-[var(--border)] rounded-2xl p-7 flex flex-col gap-4 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-surface-2 border border-[var(--border)] flex items-center justify-center">{v.icon}</div>
                <h3 className="font-syne font-bold text-lg text-text-primary">{v.title}</h3>
                <p className="text-sm text-text-secondary font-dm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-bg-2 border-y border-[var(--border)]">
        <Container size="md">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-3xl lg:text-4xl text-text-primary">Our journey</h2>
          </div>
          <div className="relative flex flex-col gap-0">
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-8 pb-12 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-surface border-2 border-accent/30 flex items-center justify-center shrink-0 z-10">
                    <span className="font-syne font-bold text-xs text-accent">{m.year}</span>
                  </div>
                </div>
                <div className="pt-3 flex flex-col gap-1.5">
                  <h3 className="font-syne font-bold text-xl text-text-primary">{m.title}</h3>
                  <p className="text-text-secondary font-dm">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TeamSlider />
      <CTASection />
    </>
  )
}
