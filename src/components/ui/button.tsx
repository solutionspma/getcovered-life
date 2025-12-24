'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-brand-navy text-white hover:bg-brand-navy-600 shadow-lg hover:shadow-glow-navy',
        primary:
          'bg-brand-navy text-white hover:bg-brand-navy-600 shadow-lg hover:shadow-glow-navy',
        secondary:
          'bg-brand-gold text-brand-navy hover:bg-brand-gold-600 shadow-lg hover:shadow-glow',
        outline:
          'border-2 border-brand-navy text-brand-navy bg-transparent hover:bg-brand-navy hover:text-white',
        ghost: 'text-brand-navy hover:bg-brand-navy/10',
        link: 'text-brand-navy underline-offset-4 hover:underline',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 shadow-lg',
        success:
          'bg-green-600 text-white hover:bg-green-700 shadow-lg',
        white:
          'bg-white text-brand-navy hover:bg-gray-100 shadow-lg',
        glass:
          'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30',
      },
      size: {
        default: 'h-11 px-6 py-2 text-sm',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
