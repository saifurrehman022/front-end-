import { Brain, Search, BarChart3, Wrench, Cloud, Shield, CheckCircle2, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import ServicesTabs from '@/components/sections/ServicesTabs'
import CTASection from '@/components/sections/CTASection'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    description: 'For small teams exploring AI-powered workflows.',
    features: ['5,000 messages/month', '3 conversations', 'PDF & DOCX ingestion', 'Web search enabled', 'Community support'],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$199',
    period: '/mo',
    description: 'For growing teams with real production workloads.',
    features: ['50,000 messages/month', 'Unlimited conversations', 'All file types (PDF, DOCX, XLSX, Images)', 'Web search + custom tools', 'Priority email support', 'API access'],
    cta: 'Get Started',
    href: '/auth/signup',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Dedicated infrastructure, SLAs, and white-glove support.',
    features: ['Unlimited messages', 'VPC-isolated deployment', 'SSO & RBAC', 'Custom model fine-tuning', 'Dedicated success manager', 'SOC2 compliance docs'],
    cta: 'Contact Sales',
    href: '/contact',
    highlight: false,
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/6 blur-[100px]" />
        <Container size="md" className="relative z-10 text-center">
          <Badge variant="accent" className="mb-6">Services & Pricing</Badge>
          <h1 className="font-syne font-extrabold text-5xl lg:text-6xl text-text-primary mb-6">
            Everything you need<br />
            <span className="gradient-text">to ship AI at scale</span>
          </h1>
          <p className="text-xl text-text-secondary font-dm leading-relaxed max-w-2xl mx-auto">
            From RAG chat to enterprise consulting — one platform with transparent pricing and no hidden fees.
          </p>
        </Container>
      </section>

      <ServicesTabs />

      {/* Pricing */}
      <section className="py-24 bg-bg-2 border-y border-[var(--border)]">
        <Container>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-dm mb-3">Pricing</p>
            <h2 className="font-syne font-extrabold text-4xl text-text-primary">Simple, transparent pricing</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div key={plan.name} className={`relative rounded-2xl p-8 flex flex-col gap-6 border transition-all duration-300 hover:-translate-y-1 ${plan.highlight ? 'bg-accent/10 border-accent/40 shadow-xl shadow-accent/10' : 'bg-surface border-[var(--border)] hover:border-accent/30'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">Most Popular</Badge>
                  </div>
                )}
                <div>
                  <h3 className="font-syne font-bold text-xl text-text-primary mb-1">{plan.name}</h3>
                  <p className="text-sm text-text-secondary font-dm">{plan.description}</p>
                </div>
                <div className="flex items-end gap-1">
                  <span className="font-syne font-extrabold text-5xl text-text-primary">{plan.price}</span>
                  <span className="text-text-muted font-dm pb-1">{plan.period}</span>
                </div>
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-accent-3 mt-0.5 shrink-0" />
                      <span className="text-sm text-text-secondary font-dm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button variant={plan.highlight ? 'primary' : 'secondary'} className="w-full group">
                    {plan.cta}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
