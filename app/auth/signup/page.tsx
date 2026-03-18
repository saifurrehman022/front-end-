'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Lock, Mail, Building2, Zap, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { authApi } from '@/lib/api'
import { setTokens } from '@/lib/utils'

const perks = ['14-day free trial', 'No credit card required', '99.9% uptime SLA']

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', email: '', company: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    setError('')
    try {
      await authApi.register({ username: form.username, email: form.email, company: form.company, password: form.password })
      const tokens = await authApi.login({ username: form.username, password: form.password })
      setTokens(tokens.access_token, tokens.refresh_token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.detail || 'Registration failed. Username or email may already exist.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-accent/7 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-syne font-bold text-2xl text-text-primary">Echo<span className="text-accent">Loft</span><span className="text-accent-3 text-sm">AI</span></span>
        </div>

        <div className="bg-surface border border-[var(--border)] rounded-2xl p-8 shadow-xl shadow-black/30">
          <div className="mb-7">
            <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Create your account</h1>
            <p className="text-sm text-text-secondary font-dm">Start your 14-day free trial today</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {perks.map(p => (
              <div key={p} className="flex items-center gap-1.5 text-xs text-text-secondary font-dm">
                <CheckCircle2 size={12} className="text-accent-3" />{p}
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Username" name="username" value={form.username} onChange={handle} placeholder="yourname" required minLength={3} icon={<User size={15} />} />
              <Input label="Company" name="company" value={form.company} onChange={handle} placeholder="Acme Corp" icon={<Building2 size={15} />} />
            </div>
            <Input label="Work Email" name="email" type="email" value={form.email} onChange={handle} placeholder="you@company.com" required icon={<Mail size={15} />} />
            <div className="relative">
              <Input label="Password" name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handle} placeholder="Min. 8 characters" required icon={<Lock size={15} />} />
              <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3.5 bottom-3 text-text-muted hover:text-text-primary transition-colors">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <Input label="Confirm Password" name="confirm" type={showPw ? 'text' : 'password'} value={form.confirm} onChange={handle} placeholder="Repeat password" required icon={<Lock size={15} />} />

            {error && <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 font-dm">{error}</div>}

            <Button type="submit" variant="primary" size="lg" loading={loading} className="group w-full mt-1">
              Create Account
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-xs text-text-muted font-dm text-center mt-4">
            By signing up, you agree to our{' '}
            <Link href="/legal/terms" className="text-accent hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/legal/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          </p>

          <div className="mt-5 pt-5 border-t border-[var(--border-2)] text-center">
            <p className="text-sm text-text-muted font-dm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-accent hover:text-accent-2 transition-colors font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
