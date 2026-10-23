import Link from 'next/link'
import { siteConfig } from '@/lib/site'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${siteConfig.name} home`} className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-gold/50 bg-ink-3">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M5 5h14M5 12h10M5 19h14" stroke="#E8B44A" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="19" cy="12" r="2" fill="#6EE7F9" />
        </svg>
        <span className="absolute inset-0 rounded-xl bg-gold/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
      </span>
      <span className="font-syne text-[17px] font-bold tracking-tight text-fg">
        EchoLoft<span className="ml-1 font-mono text-[11px] font-medium text-gold">AI</span>
      </span>
    </Link>
  )
}
