'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'btn-primary',
      ghost: 'btn-ghost',
      outline: 'inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 font-semibold text-gold hover:bg-gold hover:text-ink transition-colors',
      danger: 'inline-flex items-center justify-center gap-2 rounded-full border border-red-400/40 text-red-300 hover:bg-red-500/10 transition-colors',
    }
    const sizes = { sm: 'h-9 px-5 text-xs', md: 'h-11 px-6 text-sm', lg: 'h-12 px-8 text-[15px]' }
    return (
      <button
        ref={ref}
        className={cn(variants[variant], sizes[size], 'font-dm disabled:pointer-events-none disabled:opacity-50', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
export default Button
