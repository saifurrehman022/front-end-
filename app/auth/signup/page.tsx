'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import AuthShell from '@/components/layout/AuthShell'
import { authApi } from '@/lib/api'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', email: '', company: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const strength = (pw: string) => { let s = 0; if (pw.length >= 8) s++; if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++; return s }
  const s = strength(form.password)
  const sColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-400', 'bg-emerald-400']
  const sLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    try {
      await authApi.register({ username: form.username.trim().toLowerCase(), email: form.email.toLowerCase(), company: form.company, password: form.password })
      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 2000)
    } catch (err: any) { setError(err?.detail || 'Registration failed. Please try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div className="flex min-h-screen items-center justify-center bg-ink">
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold"><CheckCircle2 size={36} /></span>
        <h1 className="font-syne text-2xl font-bold text-fg">Account created!</h1>
        <p className="font-dm text-fg-2">Redirecting you to sign in…</p>
      </div>
    </div>
  )

  return (
    <AuthShell
      side={
        <ul className="flex flex-col gap-5">
          {['Track your project in one place', 'Access deliverables and documentation', 'Secure, private workspace'].map(item => (
            <li key={item} className="flex items-center gap-3 font-dm text-[15px] text-fg-2">
              <CheckCircle2 size={18} className="text-gold" /> {item}
            </li>
          ))}
        </ul>
      }
    >
      <h1 className="h-display text-[32px]">Create your account</h1>
      <p className="mb-10 mt-1 font-dm text-sm text-fg-3">Set up your client workspace</p>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Username" name="username" value={form.username} onChange={handle} placeholder="johndoe" required minLength={3} autoComplete="username" />
          <Input label="Company" name="company" value={form.company} onChange={handle} placeholder="Acme Inc." autoComplete="organization" />
        </div>
        <Input label="Email address" name="email" type="email" value={form.email} onChange={handle} placeholder="you@company.com" required autoComplete="email" />
        <div className="relative">
          <Input label="Password" name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handle} placeholder="Min. 8 characters" required autoComplete="new-password" />
          <button type="button" onClick={() => setShowPw(p => !p)} aria-label={showPw ? 'Hide password' : 'Show password'} className="absolute bottom-3.5 right-4 text-fg-3 transition-colors hover:text-fg">
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {form.password.length > 0 && (
          <div className="-mt-1 flex flex-col gap-1.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= s ? sColors[s] : 'bg-white/10'}`} />)}
            </div>
            <p className="font-dm text-xs text-fg-3">{sLabels[s]} password</p>
          </div>
        )}
        <Input label="Confirm password" name="confirm" type={showPw ? 'text' : 'password'} value={form.confirm} onChange={handle} placeholder="Re-enter password" required autoComplete="new-password"
          error={form.confirm && form.confirm !== form.password ? 'Passwords do not match' : undefined} />
        {error && <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-dm text-sm text-red-300">{error}</div>}
        <button type="submit" disabled={loading} className="btn-primary group mt-1 w-full disabled:opacity-60">
          {loading ? 'Creating account…' : (<>Create account <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></>)}
        </button>
        <p className="mt-1 text-center font-dm text-xs text-fg-3">
          By signing up you agree to our{' '}
          <Link href="/legal/terms" className="font-semibold text-fg hover:underline">Terms</Link> &amp;{' '}
          <Link href="/legal/privacy" className="font-semibold text-fg hover:underline">Privacy Policy</Link>.
        </p>
      </form>
      <p className="mt-8 text-center font-dm text-sm text-fg-3">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold text-gold hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  )
}
