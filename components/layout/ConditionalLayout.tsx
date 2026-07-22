'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

const HIDDEN = ['/dashboard', '/auth/login', '/auth/signup']

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hide = HIDDEN.some(r => pathname.startsWith(r))
  if (hide) return <>{children}</>
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
