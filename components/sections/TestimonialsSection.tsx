import { Star } from 'lucide-react'
import Container from '@/components/layout/Container'

const testimonials = [
  {
    quote: 'EchoLoft replaced our entire internal knowledge-base search workflow. Our support team resolves tickets 40% faster.',
    author: 'Marcus Chen',
    title: 'Head of Operations, Scalr',
    avatar: 'MC',
    gradient: 'from-accent to-accent-2',
    stars: 5,
  },
  {
    quote: 'The streaming speed is genuinely impressive. Groq + EchoLoft feels like the future of enterprise AI tooling.',
    author: 'Amara Diallo',
    title: 'CTO, Fincite Labs',
    avatar: 'AD',
    gradient: 'from-accent-3 to-cyan-400',
    stars: 5,
  },
  {
    quote: 'We audited the auth system before deploying — argon2 hashing, refresh rotation, session revocation. Exactly what we needed.',
    author: 'Tom Whitfield',
    title: 'CISO, Prentice Corp',
    avatar: 'TW',
    gradient: 'from-accent-2 to-pink-500',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative bg-bg-2">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <Container className="relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-dm mb-3">Testimonials</p>
          <h2 className="font-syne font-extrabold text-4xl lg:text-5xl text-text-primary">
            Loved by builders.
            <span className="gradient-text"> Trusted by ops.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-surface border border-[var(--border)] rounded-2xl p-7 flex flex-col gap-5 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-text-secondary font-dm text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-2)]">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-syne font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-syne font-bold text-text-primary">{t.author}</p>
                  <p className="text-xs text-text-muted font-dm">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
