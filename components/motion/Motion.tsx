'use client'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import type { ReactNode, PointerEvent } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Fades + lifts content into view once, with a slight 3D tilt. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      style={{ transformPerspective: 900, transformOrigin: '50% 0%' }}
    >
      {children}
    </Comp>
  )
}

/** Card that tilts toward the cursor in 3D and shows a moving spotlight. */
export function TiltCard({ children, className = '', intensity = 8 }: { children: ReactNode; className?: string; intensity?: number }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), { stiffness: 200, damping: 20 })
  const bg = useTransform(
    [mx, my] as never,
    ([x, y]: number[]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(232,180,74,0.14), transparent 60%)`,
  )

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      onPointerMove={reduce ? undefined : onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`group relative h-full ${className}`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: bg }} />
      {children}
    </motion.div>
  )
}

/** Staggered word-by-word headline reveal. */
export function SplitHeading({ text, className, highlight }: { text: string; className?: string; highlight?: string[] }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${highlight?.includes(w.replace(/[.,]/g, '')) ? 'text-gradient' : ''}`}
              initial={reduce ? false : { y: '110%', rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
