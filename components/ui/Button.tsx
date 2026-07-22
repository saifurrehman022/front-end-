'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'amber' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-dm font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none select-none'
    const variants = {
      primary:   'bg-black text-white hover:bg-[#222] active:scale-[0.98]',
      secondary: 'bg-transparent border-[1.5px] border-[#e0e0e0] text-black hover:border-black hover:bg-[#f7f7f7] active:scale-[0.98]',
      ghost:     'bg-transparent text-[#555] hover:text-black hover:bg-[#f7f7f7] active:scale-[0.98]',
      outline:   'bg-transparent border-[1.5px] border-black text-black hover:bg-black hover:text-white active:scale-[0.98]',
      amber:     'bg-[#E8C547] text-black hover:bg-[#F5D76E] hover:shadow-[0_0_24px_rgba(232,197,71,0.35)] active:scale-[0.98]',
      danger:    'bg-transparent border border-red-300 text-red-500 hover:bg-red-50 active:scale-[0.98]',
    }
    const sizes = {
      sm: 'h-9 px-5 text-xs',
      md: 'h-10 px-6 text-sm',
      lg: 'h-12 px-8 text-sm',
      xl: 'h-[52px] px-9 text-[15px]',
    }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading} {...props}>
        {loading && (
          <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
