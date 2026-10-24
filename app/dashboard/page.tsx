'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, FolderKanban, MessageSquare, BookOpen, Settings, LogOut, Menu,
  Plus, CalendarCheck, ArrowUpRight, CheckCircle2, Circle, Mail, Building2, User,
} from 'lucide-react'
import Logo from '@/components/layout/Logo'
import ServiceIcon from '@/components/sections/ServiceIcon'
import { authApi, type UserPublic } from '@/lib/api'
import { getToken, clearTokens } from '@/lib/utils'
import { services, categories } from '@/lib/services'
import { posts } from '@/lib/blog'
import { siteConfig } from '@/lib/site'

type Tab = 'overview' | 'projects' | 'resources' | 'account'

const nav: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'account', label: 'Account', icon: Settings },
]

const steps = [
  { title: 'Create your account', desc: 'You are signed in to your client workspace.', done: true },
  { title: 'Tell us about your project', desc: 'Share your goal, timeline and budget range.', href: '/contact' },
  { title: 'Book a discovery call', desc: 'A free 30-minute call with an engineer.', href: '/contact' },
  { title: 'Receive your plan & fixed quote', desc: 'Milestones, stack and price, in writing.' },
]

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass rounded-3xl p-6 sm:p-7 ${className}`}>{children}</div>
}

export default function DashboardPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<UserPublic | null>(null)
  const [tab, setTab] = useState<Tab>('overview')
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    if (!getToken()) {
      router.replace('/auth/login')
      return
    }
    setReady(true)
    authApi.profile().then(setUser).catch(() => setUser(null))
  }, [router])

  const logout = async () => {
    const rt = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null
    if (rt) authApi.logout(rt).catch(() => {})
    clearTokens()
    router.push('/')
  }

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" aria-label="Loading" />
      </div>
    )
  }

  const name = user?.username || 'there'

  const Sidebar = (
    <aside className="flex h-full flex-col border-r border-line bg-ink-2 p-5">
      <div className="px-2 pb-8 pt-1"><Logo /></div>
      <nav aria-label="Dashboard" className="flex flex-col gap-1">
        {nav.map(n => (
          <button
            key={n.id}
            type="button"
            onClick={() => { setTab(n.id); setMenu(false) }}
            aria-current={tab === n.id ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-dm text-sm font-medium transition-colors ${tab === n.id ? 'bg-gold/10 text-gold' : 'text-fg-2 hover:bg-white/[0.04] hover:text-fg'}`}
          >
            <n.icon size={18} /> {n.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-3">
        <Link href="/contact" className="btn-primary h-11 text-sm"><Plus size={16} /> New project</Link>
        <button type="button" onClick={logout} className="flex items-center gap-3 rounded-2xl px-4 py-3 font-dm text-sm text-fg-3 hover:text-fg">
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-ink lg:grid lg:grid-cols-[260px_1fr]">
      <div className="sticky top-0 hidden h-screen lg:block">{Sidebar}</div>

      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/60" onClick={() => setMenu(false)} />
          <div className="relative h-full w-[280px]">{Sidebar}</div>
        </div>
      )}

      <main className="min-w-0">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-ink/85 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMenu(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full border border-line-2 lg:hidden">
              <Menu size={18} />
            </button>
            <h1 className="font-syne text-lg font-bold capitalize text-fg">{tab}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden font-dm text-sm text-fg-3 hover:text-fg sm:block">Back to website</Link>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-3 font-syne text-sm font-bold uppercase text-ink">
              {name.slice(0, 1)}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl p-5 sm:p-8">
          {tab === 'overview' && (
            <div className="flex flex-col gap-6">
              <Card className="relative overflow-hidden">
                <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
                <p className="eyebrow mb-3">Client workspace</p>
                <h2 className="h-display text-[clamp(26px,3.5vw,38px)]">Welcome, <span className="text-gradient">{name}</span></h2>
                <p className="mt-3 max-w-xl font-dm text-[15px] leading-relaxed text-fg-2">
                  This is where you will track your projects, milestones and deliverables with {siteConfig.name}.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="btn-primary h-11 text-sm"><Plus size={16} /> Start a project</Link>
                  <Link href="/contact" className="btn-ghost h-11 text-sm"><CalendarCheck size={16} /> Book a call</Link>
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { k: 'Active projects', v: '0', d: 'Nothing in progress yet' },
                  { k: 'Open requests', v: '0', d: 'Send a brief to get started' },
                  { k: 'Reply time', v: '24h', d: 'For every message' },
                ].map(s => (
                  <Card key={s.k}>
                    <p className="font-dm text-sm text-fg-3">{s.k}</p>
                    <p className="mt-2 font-syne text-4xl font-extrabold text-fg">{s.v}</p>
                    <p className="mt-1 font-dm text-[13px] text-fg-3">{s.d}</p>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
                <Card>
                  <h2 className="font-syne text-lg font-bold text-fg">Getting started</h2>
                  <ol className="mt-5 flex flex-col gap-4">
                    {steps.map(s => (
                      <li key={s.title} className="flex gap-4">
                        {s.done ? <CheckCircle2 size={22} className="shrink-0 text-gold" /> : <Circle size={22} className="shrink-0 text-fg-3" />}
                        <div className="min-w-0 flex-1">
                          <p className={`font-dm text-[15px] font-semibold ${s.done ? 'text-fg-3 line-through' : 'text-fg'}`}>{s.title}</p>
                          <p className="font-dm text-[13.5px] text-fg-3">{s.desc}</p>
                        </div>
                        {s.href && !s.done && (
                          <Link href={s.href} className="self-center font-dm text-sm font-semibold text-gold hover:text-gold-2">Go</Link>
                        )}
                      </li>
                    ))}
                  </ol>
                </Card>
                <Card>
                  <h2 className="font-syne text-lg font-bold text-fg">Need help?</h2>
                  <p className="mt-2 font-dm text-[14px] text-fg-2">Talk directly to the engineers building your project.</p>
                  <div className="mt-5 flex flex-col gap-3">
                    <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-2xl border border-line-2 p-4 font-dm text-sm text-fg hover:border-gold/50">
                      <Mail size={18} className="text-gold" /> {siteConfig.email}
                    </a>
                    <Link href="/contact" className="flex items-center gap-3 rounded-2xl border border-line-2 p-4 font-dm text-sm text-fg hover:border-gold/50">
                      <MessageSquare size={18} className="text-gold" /> Send a message
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {tab === 'projects' && (
            <div className="flex flex-col gap-6">
              <Card className="py-14 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold"><FolderKanban size={24} /></span>
                <h2 className="mt-5 font-syne text-xl font-bold text-fg">No projects yet</h2>
                <p className="mx-auto mt-2 max-w-md font-dm text-[15px] text-fg-2">
                  When we start working together, your project milestones, demos and deliverables will appear here.
                </p>
                <Link href="/contact" className="btn-primary mx-auto mt-6 h-11 w-fit text-sm"><Plus size={16} /> Request a project</Link>
              </Card>
              <h2 className="font-syne text-lg font-bold text-fg">What can we build for you?</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {services.map(s => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="glass flex h-full gap-4 rounded-2xl p-5 transition-colors hover:border-gold/40">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold"><ServiceIcon name={s.icon} size={18} /></span>
                      <span className="min-w-0">
                        <span className="block font-dm text-sm font-semibold text-fg">{s.name}</span>
                        <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-3">{categories[s.category].short}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'resources' && (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {posts.map(p => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="glass flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-gold/40">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{p.category}</span>
                    <span className="mt-2 flex-1 font-syne text-base font-bold leading-snug text-fg">{p.title}</span>
                    <span className="mt-4 inline-flex items-center gap-1 font-dm text-sm font-semibold text-gold">Read <ArrowUpRight size={14} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {tab === 'account' && (
            <Card className="max-w-xl">
              <h2 className="font-syne text-lg font-bold text-fg">Your account</h2>
              <dl className="mt-6 flex flex-col gap-4">
                {[
                  { icon: User, k: 'Username', v: user?.username },
                  { icon: Mail, k: 'Email', v: user?.email },
                  { icon: Building2, k: 'Company', v: user?.company },
                ].map(r => (
                  <div key={r.k} className="flex items-center gap-4 rounded-2xl border border-line p-4">
                    <r.icon size={18} className="text-gold" />
                    <dt className="w-24 font-dm text-sm text-fg-3">{r.k}</dt>
                    <dd className="min-w-0 truncate font-dm text-sm text-fg">{r.v || '—'}</dd>
                  </div>
                ))}
              </dl>
              {!user && <p className="mt-4 font-dm text-[13px] text-fg-3">Profile details could not be loaded right now.</p>}
              <button type="button" onClick={logout} className="btn-ghost mt-6 h-11 text-sm"><LogOut size={16} /> Sign out</button>
            </Card>
          )}
        </div>
      </main>

    </div>
  )
}