'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, Mail, MapPin, Phone, Github, Linkedin, Youtube, LayoutDashboard, LogOut, ArrowRight } from 'lucide-react'
import { cn, getToken, clearTokens } from '@/lib/utils'
import { siteConfig } from '@/lib/site'
import { categories, servicesBy, type ServiceCategory } from '@/lib/services'
import ServiceIcon from '@/components/sections/ServiceIcon'
import Logo from './Logo'

function TopBar() {
  const s = siteConfig.socials
  return (
    <div className="hidden border-b border-line bg-ink-2/80 lg:block">
      <div className="mx-auto flex h-10 max-w-site items-center justify-between px-8 font-dm text-[13px] text-fg-3">
        <div className="flex items-center gap-6">
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-fg"><Mail size={13} /> {siteConfig.email}</a>
          {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-fg"><Phone size={13} /> {siteConfig.phone}</a>}
          <span className="flex items-center gap-2"><MapPin size={13} /> {siteConfig.location}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2"><span className="status-dot" /> Taking new projects</span>
          <span className="h-4 w-px bg-line-2" />
          {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-fg"><Github size={14} /></a>}
          {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-fg"><Linkedin size={14} /></a>}
          {s.youtube && <a href={s.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-fg"><Youtube size={14} /></a>}
        </div>
      </div>
    </div>
  )
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid w-[860px] grid-cols-[1fr_1fr_240px] gap-2 rounded-3xl border border-line-2 bg-[#0d0f14]/[0.98] p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      {(Object.keys(categories) as ServiceCategory[]).map(c => (
        <div key={c} className="p-2">
          <p className="px-3 pb-2 pt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{categories[c].label}</p>
          <ul>
            {servicesBy(c).map(s => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} onClick={onNavigate} className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-white/[0.05]">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold"><ServiceIcon name={s.icon} size={17} /></span>
                  <span className="min-w-0">
                    <span className="block font-dm text-sm font-semibold text-fg">{s.name}</span>
                    <span className="mt-0.5 line-clamp-1 font-dm text-[12.5px] text-fg-3">{s.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link href="/contact" onClick={onNavigate} className="relative flex flex-col justify-end overflow-hidden rounded-2xl border border-gold/30 p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/videos/robot-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <span className="relative font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Not sure?</span>
        <span className="relative mt-2 font-syne text-lg font-bold leading-tight text-fg">Get a free recommendation</span>
        <span className="relative mt-3 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-gold">Book a call <ArrowRight size={14} /></span>
      </Link>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMega(false)
    setLoggedIn(!!getToken())
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMega(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const logout = () => {
    clearTokens()
    setLoggedIn(false)
    router.push('/')
  }

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const openMega = () => { clearTimeout(closeTimer.current); setMega(true) }
  const closeMega = () => { closeTimer.current = setTimeout(() => setMega(false), 120) }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopBar />
      <div className={cn('transition-all duration-500', scrolled || open ? 'border-b border-line bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent')}>
        <div className="mx-auto flex h-[72px] max-w-site items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map(l =>
              l.mega ? (
                <div key={l.href} className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <Link
                    href={l.href}
                    aria-expanded={mega}
                    aria-haspopup="true"
                    onFocus={openMega}
                    className={cn('flex items-center gap-1 rounded-full px-4 py-2 font-dm text-sm font-medium transition-colors', isActive(l.href) ? 'bg-white/[0.08] text-fg' : 'text-fg-2 hover:text-fg')}
                  >
                    {l.label} <ChevronDown size={14} className={cn('transition-transform', mega && 'rotate-180')} />
                  </Link>
                  <div className={cn('absolute left-1/2 top-full -translate-x-[38%] pt-4 transition-all duration-200', mega ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0')}>
                    <MegaMenu onNavigate={() => setMega(false)} />
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn('rounded-full px-4 py-2 font-dm text-sm font-medium transition-colors', isActive(l.href) ? 'bg-white/[0.08] text-fg' : 'text-fg-2 hover:text-fg')}
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {loggedIn ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 rounded-full px-4 py-2 font-dm text-sm font-medium text-fg-2 hover:text-fg">
                  <LayoutDashboard size={15} /> Dashboard
                </Link>
                <button type="button" onClick={logout} className="btn-ghost h-10 px-5 text-sm">
                  <LogOut size={15} /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="rounded-full px-4 py-2 font-dm text-sm font-medium text-fg-2 transition-colors hover:text-fg">
                  Sign in
                </Link>
                <Link href="/auth/signup" className="btn-primary h-10 px-5 text-sm">
                  Get started <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-fg lg:hidden"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div id="mobile-menu" className={cn('overflow-y-auto transition-all duration-300 lg:hidden', open ? 'max-h-[calc(100svh-72px)] opacity-100' : 'pointer-events-none max-h-0 opacity-0')}>
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pb-6">
            {siteConfig.nav.map(l =>
              l.mega ? (
                <div key={l.href}>
                  <button
                    type="button"
                    onClick={() => setMobileServices(v => !v)}
                    aria-expanded={mobileServices}
                    className={cn('flex w-full items-center justify-between rounded-2xl px-4 py-3 font-dm text-base', isActive(l.href) ? 'bg-white/[0.08] text-fg' : 'text-fg-2')}
                  >
                    {l.label} <ChevronDown size={16} className={cn('transition-transform', mobileServices && 'rotate-180')} />
                  </button>
                  {mobileServices && (
                    <div className="mb-2 ml-2 border-l border-line pl-3">
                      <Link href="/services" className="block px-3 py-2 font-dm text-sm font-semibold text-gold">All services</Link>
                      {(Object.keys(categories) as ServiceCategory[]).map(c => (
                        <div key={c}>
                          <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-3">{categories[c].label}</p>
                          {servicesBy(c).map(s => (
                            <Link key={s.slug} href={`/services/${s.slug}`} className="block rounded-xl px-3 py-2 font-dm text-sm text-fg-2">{s.name}</Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={l.href} href={l.href} className={cn('rounded-2xl px-4 py-3 font-dm text-base', isActive(l.href) ? 'bg-white/[0.08] text-fg' : 'text-fg-2')}>
                  {l.label}
                </Link>
              ),
            )}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-4">
              {loggedIn ? (
                <>
                  <Link href="/dashboard" className="btn-ghost h-11 px-4 text-sm"><LayoutDashboard size={15} /> Dashboard</Link>
                  <button type="button" onClick={logout} className="btn-ghost h-11 px-4 text-sm"><LogOut size={15} /> Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="btn-ghost h-11 px-4 text-sm">Sign in</Link>
                  <Link href="/auth/signup" className="btn-primary h-11 px-4 text-sm">Get started</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
