'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, leftIcon, rightIcon, containerClassName, id, ...props }, ref) => {
    const inputId = id || React.useId()
    
    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              'flex h-12 w-full rounded-xl border bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:border-brand-gold',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error 
                ? 'border-red-500 focus-visible:ring-red-500' 
                : 'border-input hover:border-brand-navy/30',
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-2 text-sm text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  containerClassName?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, containerClassName, id, ...props }, ref) => {
    const textareaId = id || React.useId()
    
    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[120px] w-full rounded-xl border bg-background px-4 py-3 text-base ring-offset-background transition-all duration-200',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:border-brand-gold',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-y',
            error 
              ? 'border-red-500 focus-visible:ring-red-500' 
              : 'border-input hover:border-brand-navy/30',
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, Textarea }
