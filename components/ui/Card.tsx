import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
  hover?: boolean
}

export default function Card({ className, glow, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-[var(--border)] rounded-2xl',
        hover && 'transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/8 hover:-translate-y-0.5',
        glow && 'shadow-lg shadow-accent/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
