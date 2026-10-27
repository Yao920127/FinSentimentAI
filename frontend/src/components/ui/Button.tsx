import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent'
type Size = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const SIZE: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-on hover:bg-primary-hover shadow-raised',
  secondary:
    'bg-surface text-text border border-border hover:border-border-strong shadow-raised',
  ghost:
    'text-text-muted hover:text-text hover:bg-surface-2 hover:shadow-raised',
  danger:
    'bg-sentiment-negative text-white hover:opacity-90 shadow-raised',
  accent:
    'bg-accent text-ink hover:bg-accent-hover shadow-raised',
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium whitespace-nowrap',
        'transition-[transform,box-shadow,background-color,color] duration-key ease-settle',
        'hover:-translate-y-px active:translate-y-px active:shadow-pressed',
        'motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
        SIZE[size],
        VARIANT[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={size === 'lg' ? 18 : 16} />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
})

export default Button
