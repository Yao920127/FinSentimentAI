import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode
  rightSlot?: ReactNode
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { leftIcon, rightSlot, error = false, className, ...rest },
  ref,
) {
  const base = cn(
    'h-10 w-full rounded-lg border bg-well text-text shadow-well',
    'placeholder:text-text-muted',
    'transition-colors duration-key',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    error
      ? 'border-sentiment-negative focus:ring-sentiment-negative/30'
      : 'border-border hover:border-border-strong focus:border-accent focus:ring-accent/40',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    leftIcon ? 'pl-10' : 'pl-4',
    rightSlot ? 'pr-10' : 'pr-4',
    'text-sm md:text-base',
    className,
  )

  if (!leftIcon && !rightSlot) {
    return <input ref={ref} className={base} {...rest} />
  }

  return (
    <div className="relative w-full">
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none flex items-center">
          {leftIcon}
        </span>
      )}
      <input ref={ref} className={base} {...rest} />
      {rightSlot && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
          {rightSlot}
        </span>
      )}
    </div>
  )
})

export default Input
