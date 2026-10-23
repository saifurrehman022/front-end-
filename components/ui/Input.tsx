'use client'
import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef, useId } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, icon, id, ...props }, ref) => {
  const autoId = useId()
  const inputId = id || autoId
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-3">{icon}</div>}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error || undefined}
          className={cn(
            'h-12 w-full rounded-xl border border-line-2 bg-white/[0.03] px-4 font-dm text-sm text-fg placeholder:text-fg-3',
            'transition-colors duration-200 hover:border-white/20 focus:border-gold/70 focus:bg-white/[0.05] focus:outline-none',
            icon && 'pl-11',
            error && 'border-red-400/60 focus:border-red-400',
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="font-dm text-xs text-red-300">{error}</p>}
    </div>
  )
})
Input.displayName = 'Input'
export default Input
