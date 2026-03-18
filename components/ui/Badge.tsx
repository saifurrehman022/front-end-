import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'green' | 'red' | 'subtle'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-surface-2 text-text-secondary border border-[var(--border)]',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    green: 'bg-accent-3/10 text-[#38d9a9] border border-[#38d9a9]/20',
    red: 'bg-red-500/10 text-red-400 border border-red-500/20',
    subtle: 'bg-surface text-text-muted border border-[var(--border-2)]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-dm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
