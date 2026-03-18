import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export default function Container({ className, size = 'lg', children, ...props }: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn('mx-auto w-full px-6 lg:px-8', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  )
}
