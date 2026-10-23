import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export default function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div className={cn('glass rounded-3xl', hover && 'transition-colors duration-300 hover:border-gold/40', className)} {...props}>
      {children}
    </div>
  )
}
