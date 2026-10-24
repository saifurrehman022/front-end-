'use client'
import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'

type Src = { mp4: string; webm?: string; poster: string }

/**
 * Muted looping background/preview video.
 * - Loads only when near the viewport (saves bandwidth, good for Core Web Vitals)
 * - Pauses when off-screen
 * - Shows the poster only when the visitor prefers reduced motion
 */
export function LoopVideo({ src, className = '', label, hoverPlay = false }: { src: Src; className?: string; label?: string; hoverPlay?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true)
          if (!hoverPlay) v.play().catch(() => {})
        } else v.pause()
      },
      { rootMargin: '200px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [hoverPlay])

  const hover = hoverPlay
    ? {
        onMouseEnter: () => { setLoad(true); requestAnimationFrame(() => ref.current?.play().catch(() => {})) },
        onMouseLeave: () => ref.current?.pause(),
      }
    : {}

  return (
    <video
      ref={ref}
      className={className}
      poster={src.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...hover}
    >
      {load && src.webm && <source src={src.webm} type="video/webm" />}
      {load && <source src={src.mp4} type="video/mp4" />}
    </video>
  )
}

/** Click-to-play showcase player with custom play button. */
export function ShowcasePlayer({ src, title, className = '' }: { src: Src; title: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      setStarted(true)
      v.play().catch(() => {})
    } else v.pause()
  }

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={src.poster}
        playsInline
        muted
        loop
        preload="none"
        controls={started}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={title}
      >
        {src.webm && <source src={src.webm} type="video/webm" />}
        <source src={src.mp4} type="video/mp4" />
      </video>
      {!started && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
        >
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gold text-ink shadow-[0_0_0_10px_rgba(232,180,74,0.18),0_20px_60px_-10px_rgba(232,180,74,0.7)] transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />
            {playing ? <Pause size={30} /> : <Play size={30} className="ml-1" fill="currentColor" />}
          </span>
        </button>
      )}
    </div>
  )
}

/** Lightweight YouTube embed: loads the iframe only after click. */
export function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false)
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-line bg-ink-3">
      {on ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} className="h-full w-full object-cover opacity-80" loading="lazy" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-ink transition-transform group-hover:scale-110">
            <Play size={30} className="ml-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}

