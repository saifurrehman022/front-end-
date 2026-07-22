'use client'
import { useState } from 'react'
import Container from '@/components/layout/Container'
import Input from '@/components/ui/Input'
import { Mail, MapPin, Phone, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true); setLoading(false)
  }
  return (
    <div className="bg-[#f5f8f5] pt-20">
      <div className="h-[3px] bg-[#C89A2E]" />
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left */}
            <div>
              <p className="eyebrow font-dm mb-5">Get in touch</p>
              <h1 className="font-syne font-extrabold text-[clamp(40px,6vw,72px)] text-black leading-tight tracking-tight mb-6">
                Let's build something<br /><span className="text-[#7c8a7c]">remarkable.</span>
              </h1>
              <p className="text-[#4a564a] font-dm text-lg leading-relaxed mb-12 max-w-md">
                Whether you need a demo, have a technical question, or want to explore enterprise pricing — we're here.
              </p>
              <div className="flex flex-col gap-6 mb-12">
                {[
                  {icon:<Mail size={18}/>,label:'Email',value:'hello@echoloftai.com'},
                  {icon:<Phone size={18}/>,label:'Phone',value:'+1 (415) 000-0000'},
                  {icon:<MapPin size={18}/>,label:'Location',value:'San Francisco, CA'},
                  {icon:<MessageSquare size={18}/>,label:'Response Time',value:'Within 24 hours'},
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#e2ebe2] flex items-center justify-center text-black">{item.icon}</div>
                    <div>
                      <p className="text-[10px] text-[#7c8a7c] font-dm uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm text-black font-dm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right form */}
            <div className="border border-[#cfdfcf] rounded-2xl p-8 lg:p-10">
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-emerald-500" />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-black">Message Sent!</h3>
                  <p className="text-[#7c8a7c] font-dm text-sm">We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({name:'',email:'',company:'',message:''}) }}
                    className="h-10 px-6 border border-[#cfdfcf] text-black rounded-full text-sm font-dm font-medium hover:border-black transition-colors">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <h2 className="font-syne font-bold text-xl text-black mb-2">Send us a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name" name="name" value={form.name} onChange={handle} placeholder="John Doe" required />
                    <Input label="Email" name="email" type="email" value={form.email} onChange={handle} placeholder="john@company.com" required />
                  </div>
                  <Input label="Company (optional)" name="company" value={form.company} onChange={handle} placeholder="Acme Corp" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#7c8a7c] font-dm uppercase tracking-widest">Message</label>
                    <textarea name="message" value={form.message} onChange={handle} rows={5} required
                      placeholder="Tell us what you're building..."
                      className="w-full bg-[#edf3ed] border border-[#cfdfcf] rounded-xl px-4 py-3 text-black font-dm text-sm placeholder:text-[#9aab9a] focus:outline-none focus:border-black focus:bg-[#f5f8f5] hover:border-[#b8ccb8] transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="group w-full h-[52px] bg-black text-white rounded-full text-sm font-dm font-semibold hover:bg-[#1e1e1e] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2">
                    {loading ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      : <>Send Message <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
