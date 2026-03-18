'use client'
import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-text-secondary font-dm">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-12 bg-surface border border-[var(--border)] rounded-xl px-4 text-text-primary',
              'font-dm text-sm placeholder:text-text-muted',
              'transition-all duration-200',
              'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30',
              'hover:border-[rgba(108,106,255,0.35)]',
              icon && 'pl-11',
              error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400 font-dm">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
export default Input
