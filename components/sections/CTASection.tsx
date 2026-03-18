'use client'
import { useRouter } from 'next/navigation'
import { ArrowRight, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/layout/Container'

export default function CTASection() {
  const router = useRouter()
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/4 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/8 blur-[100px] pointer-events-none" />
      <Container size="md" className="relative z-10 text-center">
        <div className="bg-surface border border-[var(--border)] rounded-3xl p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-accent/60 to-transparent" />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center">
              <Zap size={24} className="text-accent" />
            </div>
            <div>
              <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-text-primary mb-4">
                Ready to transform<br />
                <span className="gradient-text">your workflows?</span>
              </h2>
              <p className="text-text-secondary font-dm text-lg max-w-xl mx-auto">
                Join 500+ companies using EchoLoft AI to unlock the full potential of their data and teams.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="xl" onClick={() => router.push('/auth/signup')} className="group">
                Start Free Trial
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="xl" onClick={() => router.push('/contact')}>
                Talk to Sales
              </Button>
            </div>
            <p className="text-xs text-text-muted font-dm">No credit card required · 14-day free trial · Cancel anytime</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
