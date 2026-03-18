'use client'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export default function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 bg-surface border border-[var(--border)] rounded-2xl p-8 w-full max-w-lg',
          'shadow-2xl shadow-black/50',
          'animate-slide-up',
          className
        )}
      >
        <div className="flex items-center justify-between mb-6">
          {title && (
            <h3 className="font-syne font-bold text-xl text-text-primary">{title}</h3>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
