'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, Zap, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import { clearTokens, getToken } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setLoggedIn(!!getToken())
  }, [pathname])

  const handleLogout = () => {
    clearTokens()
    setLoggedIn(false)
    router.push('/')
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'nav-glass' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/30 group-hover:shadow-accent/50 transition-shadow">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-syne font-bold text-xl text-text-primary tracking-tight">
              Echo<span className="text-accent">Loft</span>
              <span className="text-accent-3 text-sm ml-0.5">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-dm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-text-primary bg-surface'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {loggedIn ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
                  Dashboard
                </Button>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => router.push('/auth/login')}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" onClick={() => router.push('/auth/signup')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-bg-2 border-t border-[var(--border)] px-6 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'px-4 py-3 rounded-xl text-sm font-dm font-medium transition-all',
                pathname === link.href
                  ? 'text-accent bg-accent/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--border)]">
            {loggedIn ? (
              <>
                <Button variant="secondary" onClick={() => { router.push('/dashboard'); setOpen(false) }}>Dashboard</Button>
                <Button variant="ghost" onClick={handleLogout}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={() => { router.push('/auth/login'); setOpen(false) }}>Sign In</Button>
                <Button variant="primary" onClick={() => { router.push('/auth/signup'); setOpen(false) }}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
