'use client'

import React, { useCallback, useState } from 'react'
import { useCMSStore } from '@/stores/cms-store'
import { cn } from '@/lib/utils'
import { 
  GripVertical, 
  Copy, 
  Trash2, 
  Settings, 
  Eye, 
  EyeOff,
  ChevronUp,
  ChevronDown,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EditableWrapperProps {
  children: React.ReactNode
  sectionId: string
  className?: string
  editable?: boolean
}

export function EditableWrapper({ 
  children, 
  sectionId, 
  className,
  editable = true 
}: EditableWrapperProps) {
  const { 
    isEditMode, 
    selectedSectionId, 
    setSelectedSection,
    duplicateSection,
    removeSection,
    currentPage,
    reorderSections,
    updateSection,
  } = useCMSStore()
  
  const [showActions, setShowActions] = useState(false)
  
  const isSelected = selectedSectionId === sectionId
  const section = currentPage?.sections.find(s => s.id === sectionId)
  const sectionIndex = currentPage?.sections.findIndex(s => s.id === sectionId) ?? -1
  const totalSections = currentPage?.sections.length ?? 0
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isEditMode || !editable) return
    e.stopPropagation()
    setSelectedSection(sectionId)
  }, [isEditMode, editable, sectionId, setSelectedSection])
  
  const handleMoveUp = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (sectionIndex > 0) {
      reorderSections(sectionIndex, sectionIndex - 1)
    }
  }, [sectionIndex, reorderSections])
  
  const handleMoveDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (sectionIndex < totalSections - 1) {
      reorderSections(sectionIndex, sectionIndex + 1)
    }
  }, [sectionIndex, totalSections, reorderSections])
  
  const handleDuplicate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    duplicateSection(sectionId)
  }, [sectionId, duplicateSection])
  
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this section?')) {
      removeSection(sectionId)
    }
  }, [sectionId, removeSection])
  
  const handleToggleVisibility = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (section) {
      updateSection(sectionId, { isVisible: !section.isVisible })
    }
  }, [section, sectionId, updateSection])
  
  if (!isEditMode) {
    return <>{children}</>
  }
  
  return (
    <div
      className={cn(
        'relative group',
        editable && 'cursor-pointer',
        isSelected && 'ring-2 ring-brand-gold ring-offset-2',
        !section?.isVisible && 'opacity-50',
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Section Label */}
      {editable && (showActions || isSelected) && (
        <div className="absolute -top-8 left-0 z-50 flex items-center gap-2">
          <span className="bg-brand-navy text-white text-xs px-2 py-1 rounded-md font-medium">
            {section?.type || 'Section'}
          </span>
        </div>
      )}
      
      {/* Drag Handle & Actions */}
      {editable && (showActions || isSelected) && (
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1">
          {/* Drag Handle */}
          <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center cursor-grab text-white hover:bg-brand-navy-600 transition-colors">
            <GripVertical className="w-4 h-4" />
          </div>
          
          {/* Move Up */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleMoveUp}
            disabled={sectionIndex === 0}
            className="w-8 h-8 bg-white shadow-md"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          
          {/* Move Down */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleMoveDown}
            disabled={sectionIndex === totalSections - 1}
            className="w-8 h-8 bg-white shadow-md"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {/* Right Actions */}
      {editable && (showActions || isSelected) && (
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1">
          {/* Settings */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedSection(sectionId)
            }}
            className="w-8 h-8 bg-white shadow-md"
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          {/* Toggle Visibility */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleToggleVisibility}
            className="w-8 h-8 bg-white shadow-md"
          >
            {section?.isVisible ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </Button>
          
          {/* Duplicate */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDuplicate}
            className="w-8 h-8 bg-white shadow-md"
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          {/* Delete */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDelete}
            className="w-8 h-8 bg-white shadow-md text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {/* Add Section Button (Below) */}
      {editable && isSelected && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              // Open component panel to add new section
            }}
            className="shadow-lg"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Section
          </Button>
        </div>
      )}
      
      {/* Content */}
      {children}
    </div>
  )
}
