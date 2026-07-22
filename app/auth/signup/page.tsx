'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import { authApi } from '@/lib/api'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', email: '', company: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const strength = (pw: string) => { let s=0; if(pw.length>=8)s++; if(/[A-Z]/.test(pw))s++; if(/[0-9]/.test(pw))s++; if(/[^A-Za-z0-9]/.test(pw))s++; return s }
  const s = strength(form.password)
  const sColors = ['bg-red-400','bg-orange-400','bg-yellow-400','bg-emerald-400','bg-emerald-400']
  const sLabels = ['','Weak','Fair','Good','Strong']
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
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <CheckCircle2 size={36} className="text-emerald-500" />
        </div>
        <h2 className="font-syne font-bold text-2xl text-black">Account Created!</h2>
        <p className="text-[#999] font-dm">Redirecting you to sign in…</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] bg-black p-14">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#E8C547] flex items-center justify-center"><Zap size={17} className="text-black" fill="black" /></div>
          <span className="font-syne font-bold text-xl text-white">EchoLoft<span className="text-[#888] text-xs font-dm ml-1">AI</span></span>
        </Link>
        <div className="flex flex-col gap-5">
          {['No credit card required','Free tier includes 50 messages/month','Cancel anytime'].map(item => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#E8C547]/15 border border-[#E8C547]/30 flex items-center justify-center shrink-0">
                <CheckCircle2 size={12} className="text-[#E8C547]" />
              </div>
              <span className="text-[#888] font-dm text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-[#444] text-xs font-dm">© {new Date().getFullYear()} EchoLoft AI</p>
      </div>
      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10 flex justify-center">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center"><Zap size={17} className="text-[#E8C547]" fill="#E8C547" /></div>
              <span className="font-syne font-bold text-xl text-black">EchoLoft<span className="text-[#999] text-xs font-dm ml-1">AI</span></span>
            </Link>
          </div>
          <h1 className="font-syne font-extrabold text-[32px] text-black mb-1 tracking-tight">Create your account</h1>
          <p className="text-[#999] font-dm text-sm mb-10">Start your AI journey — free forever</p>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Username" name="username" value={form.username} onChange={handle} placeholder="johndoe" required minLength={3} />
              <Input label="Company" name="company" value={form.company} onChange={handle} placeholder="Acme Corp" />
            </div>
            <Input label="Email Address" name="email" type="email" value={form.email} onChange={handle} placeholder="you@company.com" required />
            <div className="relative">
              <Input label="Password" name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handle} placeholder="Min. 8 characters" required />
              <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 bottom-3.5 text-[#999] hover:text-black transition-colors">
                {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>
            {form.password.length > 0 && (
              <div className="flex flex-col gap-1.5 -mt-1">
                <div className="flex gap-1">
                  {[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i<=s ? sColors[s] : 'bg-[#e0e0e0]'}`} />)}
                </div>
                <p className="text-xs text-[#999] font-dm">{sLabels[s]} password</p>
              </div>
            )}
            <Input label="Confirm Password" name="confirm" type={showPw ? 'text' : 'password'} value={form.confirm} onChange={handle} placeholder="Re-enter password" required
              error={form.confirm && form.confirm !== form.password ? 'Passwords do not match' : undefined} />
            {error && <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-dm">{error}</div>}
            <button type="submit" disabled={loading}
              className="group w-full h-[52px] bg-black text-white rounded-full text-sm font-dm font-semibold hover:bg-[#222] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 mt-1">
              {loading ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                : <>Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/></>}
            </button>
            <p className="text-center text-xs text-[#999] font-dm mt-1">
              By signing up you agree to our{' '}
              <Link href="/legal/terms" className="text-black font-semibold hover:underline">Terms</Link> &amp;{' '}
              <Link href="/legal/privacy" className="text-black font-semibold hover:underline">Privacy Policy</Link>.
            </p>
          </form>
          <p className="text-center text-sm text-[#999] font-dm mt-8">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-black font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
