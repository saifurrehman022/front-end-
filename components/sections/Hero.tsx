'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { SplitHeading } from '@/components/motion/Motion'

// WebGL scene loads after the text so it never delays first paint (good for Core Web Vitals).
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

const chips = ['RAG chatbots', 'AI agents', 'RunPod GPU APIs', 'ComfyUI video', 'AI SaaS MVPs']

export default function Hero() {
  const reduce = useReducedMotion()
  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const } }

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <div aria-hidden className="grid-bg absolute inset-0 -z-20" />
      <div aria-hidden className="absolute inset-0 -z-10">
        <HeroScene />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/50 lg:to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto w-full max-w-site px-5 sm:px-8">
        <div className="max-w-[680px]">
          <motion.div {...fade(0)} className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-dm text-[13px] text-fg-2">
            <span className="status-dot" />
            AI development agency · taking new projects
          </motion.div>

          <h1 className="h-display text-[clamp(42px,7vw,88px)] leading-[0.98]">
            <SplitHeading text="We build AI that ships to production." highlight={['AI', 'production']} />
          </h1>

          <motion.p {...fade(0.55)} className="mt-7 max-w-[540px] font-dm text-[17px] leading-relaxed text-fg-2 sm:text-lg">
            RAG chatbots on your data, autonomous AI agents, GPU model APIs on RunPod, ComfyUI image and video pipelines, and full-stack AI SaaS.
            Designed, built and deployed by engineers who run this stack every day.
          </motion.p>

          <motion.div {...fade(0.7)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary group">
              Get a free project quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/#work" className="btn-ghost">
              <ArrowDown size={16} /> See our work
            </Link>
          </motion.div>

          <motion.ul {...fade(0.85)} aria-label="What we build" className="mt-12 flex flex-wrap gap-2">
            {chips.map(c => (
              <li key={c} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[12px] text-fg-2">
                {c}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
