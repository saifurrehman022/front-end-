'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import Container from '@/components/layout/Container'

interface Stat {
  value: number
  suffix: string
  prefix?: string
  label: string
  description: string
}

const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'Clients Served', description: 'From startups to Fortune 500 enterprises worldwide' },
  { value: 99, suffix: '%', label: 'Uptime Guaranteed', description: 'Enterprise SLA with 24/7 monitoring and incident response' },
  { value: 12, suffix: 'M+', label: 'Chats Processed', description: 'Conversations handled securely with full audit trails' },
  { value: 48, suffix: 'ms', label: 'P99 Latency', description: 'Sub-50ms median latency on streaming responses' },
]

function Counter({ value, suffix, prefix = '', duration = 2000 }: { value: number; suffix: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, value, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-24 relative overflow-hidden bg-bg-2">
      {/* Background accent */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-dm mb-3">By the Numbers</p>
          <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-text-primary">
            Built for scale.
            <span className="gradient-text"> Proven in production.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'bg-surface flex flex-col items-center text-center p-10 gap-3 group hover:bg-surface-2 transition-colors duration-300',
              )}
            >
              <div className="font-syne font-extrabold text-5xl lg:text-6xl gradient-text leading-none">
                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={1800 + i * 200} />
              </div>
              <div className="font-syne font-bold text-base text-text-primary mt-1">{stat.label}</div>
              <p className="text-sm text-text-muted font-dm leading-relaxed">{stat.description}</p>
              <div className="w-8 h-0.5 bg-accent/30 group-hover:w-16 group-hover:bg-accent/60 transition-all duration-500 mt-2" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
