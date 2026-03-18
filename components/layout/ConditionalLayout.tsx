'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

const HIDDEN_ROUTES = ['/dashboard', '/auth/login', '/auth/signup']

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideChrome = HIDDEN_ROUTES.some(route => pathname.startsWith(route))

  if (hideChrome) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}