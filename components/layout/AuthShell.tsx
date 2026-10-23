import Logo from './Logo'
import { siteConfig } from '@/lib/site'

export default function AuthShell({ side, children }: { side: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink">
      <aside className="relative hidden w-[44%] flex-col justify-between overflow-hidden border-r border-line bg-ink-2 p-14 lg:flex">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="hero-fallback absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl" />
        <div className="relative"><Logo /></div>
        <div className="relative">{side}</div>
        <p className="relative font-dm text-xs text-fg-3">© {new Date().getFullYear()} {siteConfig.name}</p>
      </aside>
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex justify-center lg:hidden"><Logo /></div>
          {children}
        </div>
      </main>
    </div>
  )
}
