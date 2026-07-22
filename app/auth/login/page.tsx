'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import { authApi } from '@/lib/api'
import { setTokens } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const tokens = await authApi.login({ username: form.username.trim().toLowerCase(), password: form.password })
      setTokens(tokens.access_token, tokens.refresh_token)
      router.push('/dashboard')
    } catch (err: any) { setError(err?.detail || 'Invalid username or password.') }
    finally { setLoading(false) }
  }
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] bg-black p-14">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#E8C547] flex items-center justify-center">
            <Zap size={17} className="text-black" fill="black" />
          </div>
          <span className="font-syne font-bold text-xl text-white">EchoLoft<span className="text-[#888] text-xs font-dm ml-1">AI</span></span>
        </Link>
        <div>
          <h2 className="font-syne font-extrabold text-[48px] text-white leading-tight tracking-tight mb-4">
            Intelligence<br />from your<br /><span className="text-[#E8C547]">data.</span>
          </h2>
          <p className="text-[#888] font-dm text-[15px] leading-relaxed">RAG-powered chat grounded in your documents. Not guesswork.</p>
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
          <h1 className="font-syne font-extrabold text-[32px] text-black mb-1 tracking-tight">Welcome back</h1>
          <p className="text-[#999] font-dm text-sm mb-10">Sign in to your account to continue</p>
          <form onSubmit={submit} className="flex flex-col gap-5">
            <Input label="Username" name="username" value={form.username} onChange={handle} placeholder="your_username" required autoComplete="username" />
            <div className="relative">
              <Input label="Password" name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handle} placeholder="••••••••" required autoComplete="current-password" />
              <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 bottom-3.5 text-[#999] hover:text-black transition-colors">
                {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>
            {error && <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-dm">{error}</div>}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-[#999] hover:text-black font-dm transition-colors">Forgot password?</button>
            </div>
            <button type="submit" disabled={loading}
              className="group w-full h-[52px] bg-black text-white rounded-full text-sm font-dm font-semibold hover:bg-[#222] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2">
              {loading ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                : <>Sign In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/></>}
            </button>
          </form>
          <p className="text-center text-sm text-[#999] font-dm mt-8">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-black font-semibold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
