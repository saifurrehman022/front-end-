'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : !href.includes('#') && pathname.startsWith(href))

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={cn(
          'mx-auto flex h-16 max-w-site items-center justify-between rounded-full px-4 pl-5 transition-all duration-500',
          scrolled || open ? 'glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]' : 'border border-transparent',
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-full px-4 py-2 font-dm text-sm font-medium transition-colors',
                isActive(l.href) ? 'bg-white/[0.08] text-fg' : 'text-fg-2 hover:text-fg',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/contact" className="btn-primary h-10 px-5 text-sm">
            Book a free call <ArrowUpRight size={15} />
          </Link>
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

      <div
        id="mobile-menu"
        className={cn(
          'mx-auto mt-2 max-w-site overflow-hidden rounded-3xl transition-all duration-300 lg:hidden',
          open ? 'glass max-h-[480px] opacity-100' : 'pointer-events-none max-h-0 opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
          {siteConfig.nav.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn('rounded-2xl px-4 py-3 font-dm text-base', isActive(l.href) ? 'bg-white/[0.08] text-fg' : 'text-fg-2')}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-2">
            Book a free call <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  )
}
