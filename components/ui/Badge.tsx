import { cn } from '@/lib/utils'
interface BadgeProps { children: React.ReactNode; variant?: 'default'|'amber'|'green'|'red'|'dark'; className?: string }
export default function Badge({ children, variant='default', className }: BadgeProps) {
  const v = {
    default: 'bg-[#f0f0f0] text-[#555] border border-[#e0e0e0]',
    amber:   'bg-[#E8C547]/15 text-[#8a6d00] border border-[#E8C547]/30',
    green:   'bg-emerald-50 text-emerald-700 border border-emerald-200',
    red:     'bg-red-50 text-red-600 border border-red-200',
    dark:    'bg-black text-white border border-black',
  }
  return <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-dm', v[variant], className)}>{children}</span>
}
