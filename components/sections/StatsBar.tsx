'use client'
import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/content'

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(to)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setN(0)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1400)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{n}{suffix}</span>
}

export default function StatsBar() {
  return (
    <section aria-label="Key facts" className="relative border-b border-line">
      <div className="mx-auto grid max-w-site grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`px-5 py-10 sm:px-8 ${i % 2 ? '' : 'border-r border-line'} ${i < 2 ? 'border-b border-line lg:border-b-0' : ''} ${i === 1 ? 'lg:border-r' : ''} ${i === 2 ? 'lg:border-r' : ''}`}>
            <p className="font-syne text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-gradient"><Counter to={s.value} suffix={s.suffix} /></p>
            <p className="mt-3 font-dm text-sm font-semibold text-fg">{s.label}</p>
            <p className="mt-1 font-dm text-[13px] text-fg-3">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
