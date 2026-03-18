'use client'
import { useRouter } from 'next/navigation'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'

export default function Hero() {
  const router = useRouter()
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Radial glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent/6 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-2/5 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-accent-3/5 blur-[80px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-accent/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-accent/8 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6 pt-24 pb-16">
        {/* Announcement badge */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <Badge variant="accent" className="text-xs px-4 py-1.5">
            <Sparkles size={12} />
            Now with Llama 4 & Kimi K2 support
            <ArrowRight size={11} />
          </Badge>
        </div>

        {/* Headline */}
        <h1
          className="font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-text-primary mb-6 animate-slide-up"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          Intelligent AI
          <br />
          <span className="gradient-text">for Every Team</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl text-text-secondary font-dm max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: '0.35s', opacity: 0 }}
        >
          EchoLoft AI brings RAG-powered chat, document intelligence, and real-time web search
          into one unified platform — built for enterprise workflows.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <Button
            variant="primary"
            size="xl"
            onClick={() => router.push('/contact')}
            className="group"
          >
            Request Demo
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="secondary"
            size="xl"
            onClick={() => setVideoOpen(true)}
            className="group"
          >
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <Play size={11} className="text-accent ml-0.5" />
            </div>
            Watch Video
          </Button>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 flex flex-wrap justify-center gap-8 animate-slide-up"
          style={{ animationDelay: '0.65s', opacity: 0 }}
        >
          {[
            { val: '500+', label: 'Companies' },
            { val: '99.9%', label: 'Uptime SLA' },
            { val: '12M+', label: 'Chats Processed' },
            { val: '<200ms', label: 'Avg Latency' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-syne font-bold text-2xl text-text-primary">{stat.val}</span>
              <span className="text-xs text-text-muted font-dm uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video modal placeholder */}
      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} title="Product Overview">
        <div className="aspect-video bg-surface-2 rounded-xl flex items-center justify-center border border-[var(--border)]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-3">
              <Play size={24} className="text-accent ml-1" />
            </div>
            <p className="text-text-secondary text-sm font-dm">Video coming soon</p>
          </div>
        </div>
      </Modal>
    </section>
  )
}
