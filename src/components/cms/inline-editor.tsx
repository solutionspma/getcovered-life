'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useCMSStore } from '@/stores/cms-store'
import { cn } from '@/lib/utils'

interface InlineEditorProps {
  value: string
  onChange: (value: string) => void
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  className?: string
  placeholder?: string
  multiline?: boolean
}

export function InlineEditor({
  value,
  onChange,
  as: Component = 'p',
  className,
  placeholder = 'Click to edit...',
  multiline = false,
}: InlineEditorProps) {
  const { isEditMode } = useCMSStore()
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const editorRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setLocalValue(value)
  }, [value])
  
  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus()
      // Place cursor at end
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(editorRef.current)
      range.collapse(false)
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }, [isEditing])
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isEditMode) {
      e.stopPropagation()
      setIsEditing(true)
    }
  }, [isEditMode])
  
  const handleBlur = useCallback(() => {
    setIsEditing(false)
    if (localValue !== value) {
      onChange(localValue)
    }
  }, [localValue, value, onChange])
  
  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    setLocalValue(e.currentTarget.textContent || '')
  }, [])
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      editorRef.current?.blur()
    }
    if (e.key === 'Escape') {
      setLocalValue(value)
      setIsEditing(false)
    }
  }, [multiline, value])
  
  if (!isEditMode) {
    return <Component className={className}>{value}</Component>
  }
  
  return (
    <div
      ref={editorRef}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onClick={handleClick}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        'outline-none transition-all duration-200 min-h-[1em]',
        isEditMode && !isEditing && 'hover:ring-2 hover:ring-brand-gold/30 hover:ring-offset-2 rounded cursor-text',
        isEditing && 'ring-2 ring-brand-gold ring-offset-2 rounded bg-white/50',
        !localValue && 'text-muted-foreground/50'
      )}
    >
      {localValue || placeholder}
    </div>
  )
}

interface InlineImageEditorProps {
  src: string
  alt: string
  onChangeSrc: (src: string) => void
  onChangeAlt: (alt: string) => void
  className?: string
}

export function InlineImageEditor({
  src,
  alt,
  onChangeSrc,
  onChangeAlt,
  className,
}: InlineImageEditorProps) {
  const { isEditMode } = useCMSStore()
  const [showOverlay, setShowOverlay] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleClick = useCallback(() => {
    if (isEditMode) {
      fileInputRef.current?.click()
    }
  }, [isEditMode])
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In production, this would upload to Supabase Storage
      // For now, create a local URL
      const url = URL.createObjectURL(file)
      onChangeSrc(url)
    }
  }, [onChangeSrc])
  
  if (!isEditMode) {
    return (
      <img src={src} alt={alt} className={className} />
    )
  }
  
  return (
    <div 
      className={cn('relative group', className)}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      {showOverlay && (
        <div 
          className="absolute inset-0 bg-brand-navy/60 flex items-center justify-center cursor-pointer transition-opacity"
          onClick={handleClick}
        >
          <div className="text-white text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Click to change image</span>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

interface InlineLinkEditorProps {
  href: string
  children: React.ReactNode
  onChange: (href: string) => void
  className?: string
}

export function InlineLinkEditor({
  href,
  children,
  onChange,
  className,
}: InlineLinkEditorProps) {
  const { isEditMode } = useCMSStore()
  const [isEditing, setIsEditing] = useState(false)
  const [localHref, setLocalHref] = useState(href)
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isEditMode) {
      e.preventDefault()
      e.stopPropagation()
      setIsEditing(true)
    }
  }, [isEditMode])
  
  const handleSave = useCallback(() => {
    onChange(localHref)
    setIsEditing(false)
  }, [localHref, onChange])
  
  if (!isEditMode) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  
  return (
    <div className="relative inline-block">
      <a 
        href={href} 
        className={cn(className, 'hover:ring-2 hover:ring-brand-gold/30 rounded')}
        onClick={handleClick}
      >
        {children}
      </a>
      
      {isEditing && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-xl border p-3 min-w-[300px]">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Link URL
          </label>
          <input
            type="text"
            value={localHref}
            onChange={(e) => setLocalHref(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
            placeholder="https://..."
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-brand-navy text-white text-sm py-1.5 rounded-lg hover:bg-brand-navy-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-100 text-gray-700 text-sm py-1.5 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
