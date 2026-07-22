import Container from '@/components/layout/Container'

const testimonials = [
  {quote:'EchoLoft replaced our entire internal knowledge-base search workflow. Our support team resolves tickets 40% faster.',author:'Marcus Chen',title:'Head of Operations, Scalr',avatar:'MC'},
  {quote:"The streaming speed is genuinely impressive. Groq + EchoLoft feels like the future of enterprise AI tooling.",author:'Amara Diallo',title:'CTO, Fincite Labs',avatar:'AD'},
  {quote:'We audited the auth system before deploying — argon2 hashing, refresh rotation, session revocation. Exactly what we needed.',author:'Tom Whitfield',title:'CISO, Prentice Corp',avatar:'TW'},
]

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f5f8f5] border-t border-[#cfdfcf] py-24">
      <Container>
        <div className="text-center mb-16">
          <p className="eyebrow font-dm mb-4">Testimonials</p>
          <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,60px)] text-black leading-tight">
            Loved by builders.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.author} className="border border-[#cfdfcf] rounded-2xl p-8 flex flex-col gap-5 hover:border-black hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-200">
              <span className="cite-mark">"</span>
              <p className="text-[#4a564a] font-dm text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#dbe8db]">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-syne font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-syne font-bold text-black">{t.author}</p>
                  <p className="text-xs text-[#7c8a7c] font-dm">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
