'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import AuthShell from '@/components/layout/AuthShell'
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
    <AuthShell
      side={
        <>
          <h2 className="h-display text-[48px] leading-[1.02]">Your AI projects,<br /><span className="text-gradient">in one place.</span></h2>
          <p className="mt-4 max-w-sm font-dm text-[15px] leading-relaxed text-fg-2">Sign in to your client workspace.</p>
        </>
      }
    >
      <h1 className="h-display text-[32px]">Welcome back</h1>
      <p className="mb-10 mt-1 font-dm text-sm text-fg-3">Sign in to your account to continue</p>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <Input label="Username" name="username" value={form.username} onChange={handle} placeholder="your_username" required autoComplete="username" />
        <div className="relative">
          <Input label="Password" name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handle} placeholder="••••••••" required autoComplete="current-password" />
          <button type="button" onClick={() => setShowPw(p => !p)} aria-label={showPw ? 'Hide password' : 'Show password'} className="absolute bottom-3.5 right-4 text-fg-3 transition-colors hover:text-fg">
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {error && <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-dm text-sm text-red-300">{error}</div>}
        <button type="submit" disabled={loading} className="btn-primary group w-full disabled:opacity-60">
          {loading ? 'Signing in…' : (<>Sign in <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></>)}
        </button>
      </form>
      <p className="mt-8 text-center font-dm text-sm text-fg-3">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="font-semibold text-gold hover:underline">Create one</Link>
      </p>
    </AuthShell>
  )
}
