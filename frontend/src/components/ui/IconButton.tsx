import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'ghost' | 'secondary' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  /** Required for a11y on icon-only controls */
  'aria-label': string
  children: ReactNode
}

const SIZE: Record<Size, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

const VARIANT: Record<Variant, string> = {
  ghost:
    'text-text-muted hover:text-text hover:bg-surface-2 hover:shadow-raised',
  secondary:
    'bg-surface text-text border border-border hover:border-border-strong shadow-raised',
  danger:
    'text-text-muted hover:text-sentiment-negative hover:bg-sentiment-negative-soft',
}

const IconButton = forwardRef<HTMLButtonElement, Props>(function IconButton(
  { variant = 'ghost', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-lg',
        'transition-[transform,box-shadow,background-color,color] duration-key ease-settle',
        'active:translate-y-px active:shadow-pressed motion-reduce:active:translate-y-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        SIZE[size],
        VARIANT[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
})

export default IconButton
