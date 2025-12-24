'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-2xl border bg-card text-card-foreground transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border-border shadow-card',
        elevated: 'border-border shadow-card-hover',
        outline: 'border-2 border-brand-navy/20 shadow-none',
        ghost: 'border-transparent shadow-none bg-transparent',
        glass: 'bg-white/80 backdrop-blur-lg border-white/20 shadow-lg',
        gradient: 'border-none bg-gradient-brand text-white shadow-lg',
      },
      hover: {
        none: '',
        lift: 'hover:shadow-card-hover hover:-translate-y-1',
        glow: 'hover:shadow-glow hover:border-brand-gold/50',
        scale: 'hover:scale-[1.02]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-5',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: 'none',
      padding: 'default',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof cardVariants>, 'hover'> {
  as?: 'div' | 'article' | 'section'
  hover?: boolean | 'none' | 'lift' | 'glow' | 'scale'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, padding, as = 'div', ...props }, ref) => {
    const Component = as
    const hoverValue = hover === true ? 'lift' : hover === false ? 'none' : hover
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, hover: hoverValue, padding }), className)}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }
>(({ className, as = 'h3', ...props }, ref) => {
  const Component = as
  return (
    <Component
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-tight tracking-tight',
        className
      )}
      {...props}
    />
  )
})
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

// Pre-styled card variants for common use cases
const FeatureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode
    title: string
    description: string
  }
>(({ className, icon, title, description, ...props }, ref) => (
  <Card
    ref={ref}
    variant="default"
    hover="lift"
    className={cn('text-center', className)}
    {...props}
  >
    {icon && (
      <div className="w-14 h-14 rounded-xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-4 text-brand-gold">
        {icon}
      </div>
    )}
    <CardTitle className="mb-2">{title}</CardTitle>
    <CardDescription className="text-base">{description}</CardDescription>
  </Card>
))
FeatureCard.displayName = 'FeatureCard'

const TestimonialCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    quote: string
    author: string
    role?: string
    avatar?: string
    rating?: number
  }
>(({ className, quote, author, role, avatar, rating, ...props }, ref) => (
  <Card
    ref={ref}
    variant="default"
    hover="lift"
    className={cn('', className)}
    {...props}
  >
    {rating && (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              'w-5 h-5',
              i < rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-200'
            )}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )}
    <blockquote className="text-lg text-foreground mb-6 italic">
      "{quote}"
    </blockquote>
    <div className="flex items-center gap-3">
      {avatar && (
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div>
        <div className="font-semibold text-foreground">{author}</div>
        {role && <div className="text-sm text-muted-foreground">{role}</div>}
      </div>
    </div>
  </Card>
))
TestimonialCard.displayName = 'TestimonialCard'

const StatsCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
    label: string
    trend?: { value: number; isPositive: boolean }
  }
>(({ className, value, label, trend, ...props }, ref) => (
  <Card
    ref={ref}
    variant="default"
    padding="lg"
    className={cn('text-center', className)}
    {...props}
  >
    <div className="text-4xl md:text-5xl font-bold text-brand-navy mb-2">
      {value}
    </div>
    <div className="text-muted-foreground">{label}</div>
    {trend && (
      <div
        className={cn(
          'flex items-center justify-center gap-1 mt-2 text-sm font-medium',
          trend.isPositive ? 'text-green-600' : 'text-red-600'
        )}
      >
        <span>{trend.isPositive ? '↑' : '↓'}</span>
        <span>{Math.abs(trend.value)}%</span>
      </div>
    )}
  </Card>
))
StatsCard.displayName = 'StatsCard'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
  FeatureCard,
  TestimonialCard,
  StatsCard,
}
