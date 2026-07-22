'use client'
import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold text-[#999] font-dm uppercase tracking-widest">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]">{icon}</div>}
        <input ref={ref} className={cn(
          'w-full h-12 bg-[#f7f7f7] border border-[#e0e0e0] rounded-xl px-4 text-black',
          'font-dm text-sm placeholder:text-[#bbb]',
          'transition-all duration-200',
          'focus:outline-none focus:border-black focus:bg-white focus:ring-0',
          'hover:border-[#ccc]',
          icon && 'pl-11',
          error && 'border-red-300 focus:border-red-500 bg-red-50',
          className
        )} {...props} />
      </div>
      {error && <p className="text-xs text-red-500 font-dm">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'
export default Input
