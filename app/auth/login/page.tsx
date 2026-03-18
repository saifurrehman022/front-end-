'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Lock, Zap, ArrowRight, Eye, EyeOff } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { authApi } from '@/lib/api'
import { setTokens } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const tokens = await authApi.login({ username: form.username, password: form.password })
      setTokens(tokens.access_token, tokens.refresh_token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.detail || 'Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/7 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-syne font-bold text-2xl text-text-primary">Echo<span className="text-accent">Loft</span><span className="text-accent-3 text-sm">AI</span></span>
        </div>

        <div className="bg-surface border border-[var(--border)] rounded-2xl p-8 shadow-xl shadow-black/30">
          <div className="mb-7">
            <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Welcome back</h1>
            <p className="text-sm text-text-secondary font-dm">Sign in to your EchoLoft dashboard</p>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-5">
            <Input
              label="Username"
              name="username"
              value={form.username}
              onChange={handle}
              placeholder="yourname"
              required
              autoComplete="username"
              icon={<User size={16} />}
            />
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={handle}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                icon={<Lock size={16} />}
              />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                className="absolute right-3.5 bottom-3 text-text-muted hover:text-text-primary transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 font-dm">{error}</div>
            )}

            <Button type="submit" variant="primary" size="lg" loading={loading} className="group w-full mt-1">
              Sign In
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--border-2)] text-center">
            <p className="text-sm text-text-muted font-dm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-accent hover:text-accent-2 transition-colors font-medium">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
