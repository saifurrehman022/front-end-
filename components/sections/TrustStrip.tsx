export default function TrustStrip() {
  const logos = [
    'Accenture', 'Deloitte', 'Microsoft', 'OpenAI', 'NVIDIA',
    'Anthropic', 'MongoDB', 'Vercel', 'Stripe', 'Groq',
  ]

  return (
    <section className="py-14 border-y border-[var(--border-2)]">
      <style>{`
        @keyframes trust-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .trust-marquee {
          animation: trust-scroll 30s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-xs font-dm uppercase tracking-[0.2em] text-text-muted mb-10">
          Trusted by teams at
        </p>

        <div className="relative overflow-hidden">
          {/* gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#05050a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#05050a] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 items-center w-max trust-marquee">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="px-5 py-2 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <span className="font-syne font-semibold text-sm text-black whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}