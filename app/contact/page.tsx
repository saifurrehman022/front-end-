'use client'
import { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import Container from '@/components/layout/Container'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-accent/6 blur-[100px]" />
        <Container size="md" className="relative z-10 text-center">
          <Badge variant="accent" className="mb-6">Get in Touch</Badge>
          <h1 className="font-syne font-extrabold text-5xl lg:text-6xl text-text-primary mb-5">
            Let's <span className="gradient-text">build together</span>
          </h1>
          <p className="text-xl text-text-secondary font-dm max-w-xl mx-auto">
            Whether you're exploring a pilot, need a demo, or want to talk enterprise — we respond within 24 hours.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                {[
                  { icon: <Mail size={18} className="text-accent" />, title: 'Email Us', val: 'hello@echoloft.ai' },
                  { icon: <MapPin size={18} className="text-accent-3" />, title: 'Headquarters', val: 'San Francisco, CA 94105' },
                  { icon: <Clock size={18} className="text-accent-2" />, title: 'Response Time', val: 'Within 24 hours (business days)' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4 p-5 bg-surface border border-[var(--border)] rounded-2xl hover:border-accent/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-surface-2 border border-[var(--border)] flex items-center justify-center shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted font-dm mb-0.5">{item.title}</p>
                      <p className="text-sm text-text-primary font-dm">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-surface border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-syne font-bold text-lg text-text-primary mb-3">Office Hours</h3>
                <div className="flex flex-col gap-2 text-sm font-dm text-text-secondary">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="text-text-primary">9 AM – 6 PM PST</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="text-text-muted">Closed</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-text-muted">Closed</span></div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-surface border border-[var(--border)] rounded-2xl p-8">
              {sent ? (
                <div className="flex flex-col items-center text-center gap-5 py-12">
                  <div className="w-16 h-16 rounded-full bg-accent-3/15 border border-accent-3/30 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-accent-3" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-2xl text-text-primary mb-2">Message Sent!</h3>
                    <p className="text-text-secondary font-dm">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                  <Button variant="secondary" onClick={() => setSent(false)}>Send Another</Button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-6">
                  <h2 className="font-syne font-bold text-2xl text-text-primary">Send a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name" name="name" value={form.name} onChange={handle} placeholder="Jane Smith" required />
                    <Input label="Work Email" name="email" type="email" value={form.email} onChange={handle} placeholder="jane@company.com" required />
                  </div>
                  <Input label="Company" name="company" value={form.company} onChange={handle} placeholder="Acme Corp" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-secondary font-dm">Subject</label>
                    <select name="subject" value={form.subject} onChange={handle} required className="w-full h-12 bg-surface border border-[var(--border)] rounded-xl px-4 text-text-primary font-dm text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 hover:border-accent/35 transition-all">
                      <option value="" disabled>Select a topic</option>
                      <option value="demo">Request a Demo</option>
                      <option value="pricing">Pricing Inquiry</option>
                      <option value="enterprise">Enterprise Sales</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-secondary font-dm">Message</label>
                    <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="Tell us about your use case..." className="w-full bg-surface border border-[var(--border)] rounded-xl px-4 py-3 text-text-primary font-dm text-sm placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 hover:border-accent/35 transition-all resize-none" />
                  </div>
                  <Button type="submit" variant="primary" size="lg" loading={loading} className="group w-full">
                    <Send size={16} />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
