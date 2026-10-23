import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'gold' | 'green' | 'red'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const v = {
    default: 'border-line-2 bg-white/[0.04] text-fg-2',
    gold: 'border-gold/30 bg-gold/10 text-gold',
    green: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    red: 'border-red-400/30 bg-red-400/10 text-red-300',
  }
  return <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-dm text-xs font-semibold', v[variant], className)}>{children}</span>
}
