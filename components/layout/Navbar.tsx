'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, Zap } from 'lucide-react'
import { getToken, clearTokens } from '@/lib/utils'

const links = [
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
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setLoggedIn(!!getToken()) }, [pathname])

  const handleLogout = () => { clearTokens(); setLoggedIn(false); router.push('/') }

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'nav-scrolled' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center group-hover:bg-[#222] transition-colors">
              <Zap size={15} className="text-[#E8C547]" fill="#E8C547" />
            </div>
            <span className="font-syne font-bold text-[17px] text-black tracking-tight">
              Echo<span className="text-black">Loft</span><span className="text-[#999] text-xs font-dm ml-0.5">AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={cn(
                'px-4 py-2 rounded-full text-sm font-dm font-medium transition-all duration-150',
                pathname === l.href ? 'text-black bg-[#f0f0f0]' : 'text-[#555] hover:text-black hover:bg-[#f7f7f7]'
              )}>{l.label}</Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {loggedIn ? (
              <>
                <button onClick={() => router.push('/dashboard')} className="text-sm font-dm font-medium text-[#555] hover:text-black transition-colors">Dashboard</button>
                <button onClick={handleLogout} className="h-9 px-5 bg-black text-white rounded-full text-sm font-dm font-semibold hover:bg-[#222] transition-colors">Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => router.push('/auth/login')} className="text-sm font-dm font-medium text-[#555] hover:text-black transition-colors">Sign In</button>
                <button onClick={() => router.push('/auth/signup')} className="h-9 px-5 bg-black text-white rounded-full text-sm font-dm font-semibold hover:bg-[#222] transition-colors">Get Started</button>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button className="lg:hidden p-2 rounded-full text-[#555] hover:text-black hover:bg-[#f0f0f0] transition-colors" onClick={() => setOpen(!open)}>
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn('lg:hidden overflow-hidden transition-all duration-300', open ? 'max-h-96' : 'max-h-0')}>
        <div className="bg-white border-t border-[#e0e0e0] px-6 py-4 flex flex-col gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={cn('px-4 py-3 rounded-xl text-sm font-dm font-medium transition-all',
                pathname === l.href ? 'text-black bg-[#f0f0f0]' : 'text-[#555] hover:text-black hover:bg-[#f7f7f7]'
              )}>{l.label}</Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#e0e0e0]">
            {loggedIn ? (
              <>
                <button onClick={() => { router.push('/dashboard'); setOpen(false) }} className="h-11 bg-black text-white rounded-full text-sm font-dm font-semibold">Dashboard</button>
                <button onClick={handleLogout} className="h-11 border border-[#e0e0e0] text-black rounded-full text-sm font-dm font-medium">Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => { router.push('/auth/signup'); setOpen(false) }} className="h-11 bg-black text-white rounded-full text-sm font-dm font-semibold">Get Started</button>
                <button onClick={() => { router.push('/auth/login'); setOpen(false) }} className="h-11 border border-[#e0e0e0] text-black rounded-full text-sm font-dm font-medium">Sign In</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
