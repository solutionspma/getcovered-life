'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium ring-1 ring-inset transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-brand-navy/10 text-brand-navy ring-brand-navy/20',
        secondary: 'bg-brand-gold/10 text-brand-gold-700 ring-brand-gold/30',
        gold: 'bg-brand-gold text-brand-navy ring-brand-gold/50',
        success: 'bg-green-50 text-green-700 ring-green-600/20',
        warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        destructive: 'bg-red-50 text-red-700 ring-red-600/20',
        outline: 'bg-transparent text-foreground ring-border',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  removable?: boolean
  onRemove?: () => void
}

function Badge({ 
  className, 
  variant, 
  size, 
  dot, 
  removable, 
  onRemove, 
  children, 
  ...props 
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span 
          className={cn(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            variant === 'success' && 'bg-green-500',
            variant === 'warning' && 'bg-yellow-500',
            variant === 'destructive' && 'bg-red-500',
            variant === 'default' && 'bg-brand-navy',
            variant === 'secondary' && 'bg-brand-gold',
          )} 
        />
      )}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1.5 -mr-1 h-4 w-4 rounded-full hover:bg-black/10 flex items-center justify-center"
        >
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
            <path d="M4.28 3.22a.75.75 0 00-1.06 1.06L4.94 6l-1.72 1.72a.75.75 0 101.06 1.06L6 7.06l1.72 1.72a.75.75 0 101.06-1.06L7.06 6l1.72-1.72a.75.75 0 00-1.06-1.06L6 4.94 4.28 3.22z" />
          </svg>
        </button>
      )}
    </div>
  )
}

// Status badge with predefined styles
interface StatusBadgeProps {
  status: 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'negotiation' | 'won' | 'lost' | 'nurture'
  className?: string
}

const statusConfig: Record<StatusBadgeProps['status'], { label: string; variant: BadgeProps['variant'] }> = {
  'new': { label: 'New', variant: 'default' },
  'contacted': { label: 'Contacted', variant: 'secondary' },
  'qualified': { label: 'Qualified', variant: 'success' },
  'proposal-sent': { label: 'Proposal Sent', variant: 'warning' },
  'negotiation': { label: 'Negotiation', variant: 'warning' },
  'won': { label: 'Won', variant: 'success' },
  'lost': { label: 'Lost', variant: 'destructive' },
  'nurture': { label: 'Nurture', variant: 'outline' },
}

function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge variant={config.variant} dot className={className}>
      {config.label}
    </Badge>
  )
}

export { Badge, badgeVariants, StatusBadge }
