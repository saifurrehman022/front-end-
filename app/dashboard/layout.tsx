import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard', robots: { index: false, follow: false } }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="theme-dark min-h-screen">{children}</div>
}