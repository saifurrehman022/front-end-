'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-dm font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none select-none'

    const variants = {
      primary:
        'bg-accent text-white hover:bg-[#5856e8] active:scale-[0.98] shadow-lg shadow-accent/20 hover:shadow-accent/30',
      secondary:
        'bg-surface border border-[var(--border)] text-text-primary hover:bg-surface-2 hover:border-accent/40 active:scale-[0.98]',
      ghost:
        'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface active:scale-[0.98]',
      outline:
        'bg-transparent border border-accent text-accent hover:bg-accent hover:text-white active:scale-[0.98]',
      danger:
        'bg-red-600/10 border border-red-600/30 text-red-400 hover:bg-red-600/20 active:scale-[0.98]',
    }

    const sizes = {
      sm: 'h-8 px-4 text-sm',
      md: 'h-10 px-5 text-sm',
      lg: 'h-12 px-7 text-base',
      xl: 'h-14 px-10 text-base tracking-wide',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
