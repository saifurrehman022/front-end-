export default function TrustStrip() {
  const logos = ['Accenture','Deloitte','Microsoft','OpenAI','NVIDIA','Anthropic','MongoDB','Vercel','Stripe','Groq']
  return (
    <section className="py-7 bg-[#edf3ed] border-y border-[#cfdfcf] overflow-hidden relative">
      <style>{`@keyframes trust{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.trust-run{animation:trust 26s linear infinite}`}</style>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#edf3ed] to-transparent z-10 pointer-events-none"/>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#edf3ed] to-transparent z-10 pointer-events-none"/>
      <div className="flex gap-14 items-center w-max trust-run">
        {[...logos,...logos].map((n,i)=>(
          <span key={i} className="font-syne font-bold text-[13px] text-[#9aab9a] hover:text-[#7c8a7c] transition-colors whitespace-nowrap uppercase tracking-[0.12em]">{n}</span>
        ))}
      </div>
    </section>
  )
}
