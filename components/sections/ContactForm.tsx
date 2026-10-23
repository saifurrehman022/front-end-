'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Input from '@/components/ui/Input'
import { services } from '@/lib/services'
import { siteConfig } from '@/lib/site'

const budgets = ['Under $2k', '$2k – $5k', '$5k – $15k', '$15k – $50k', '$50k+', 'Not sure yet']
const fieldCls =
  'w-full rounded-xl border border-line-2 bg-white/[0.03] px-4 font-dm text-sm text-fg transition-colors focus:border-gold/70 focus:bg-white/[0.05] focus:outline-none'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '', website: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return // honeypot: bots fill hidden fields
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT
    const { website, ...payload } = form

    if (!endpoint) {
      // No form service configured yet: open the visitor's email app with the details filled in.
      const body = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join('\n')
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project enquiry from ${form.name}`)}&body=${encodeURIComponent(body)}`
      setState('sent')
      return
    }

    setState('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: `Project enquiry from ${form.name}` }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="glass flex flex-col items-center gap-5 rounded-3xl px-8 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
          <CheckCircle2 size={28} />
        </span>
        <h2 className="font-syne text-2xl font-bold text-fg">Thanks, message received.</h2>
        <p className="max-w-sm font-dm text-[15px] text-fg-2">We&apos;ll reply within one business day to set up a call.</p>
        <button
          type="button"
          onClick={() => {
            setState('idle')
            setForm({ name: '', email: '', company: '', service: '', budget: '', message: '', website: '' })
          }}
          className="btn-ghost mt-2 h-11"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="glass flex flex-col gap-5 rounded-3xl p-7 sm:p-10">
      <h2 className="font-syne text-2xl font-bold text-fg">Tell us about your project</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Full name" name="name" value={form.name} onChange={set} placeholder="Jane Smith" required autoComplete="name" />
        <Input label="Work email" name="email" type="email" value={form.email} onChange={set} placeholder="jane@company.com" required autoComplete="email" />
      </div>
      <Input label="Company (optional)" name="company" value={form.company} onChange={set} placeholder="Acme Inc." autoComplete="organization" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Service</span>
          <select name="service" value={form.service} onChange={set} required className={`${fieldCls} h-12`}>
            <option value="" disabled>Select a service</option>
            {services.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
            <option value="Other">Something else</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Budget</span>
          <select name="budget" value={form.budget} onChange={set} className={`${fieldCls} h-12`}>
            <option value="">Select a range</option>
            {budgets.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Project details</span>
        <textarea
          name="message"
          value={form.message}
          onChange={set}
          rows={5}
          required
          placeholder="What are you building, who is it for, and when do you need it?"
          className={`${fieldCls} resize-none py-3 placeholder:text-fg-3`}
        />
      </label>
      <input type="text" name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state === 'error' && (
        <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-dm text-sm text-red-300">
          Something went wrong. Please email us directly at {siteConfig.email}.
        </p>
      )}
      <button type="submit" disabled={state === 'sending'} className="btn-primary group mt-1 w-full disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : (<>Send enquiry <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>)}
      </button>
      <p className="text-center font-dm text-xs text-fg-3">No spam. We only use your details to reply to this enquiry.</p>
    </form>
  )
}
