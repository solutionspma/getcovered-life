'use client'

import React from 'react'
import { useCMSStore } from '@/stores/cms-store'
import { cn } from '@/lib/utils'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { 
  X, 
  Palette, 
  Type, 
  Layout, 
  Image, 
  Settings2,
  Undo2,
  Redo2,
  Save,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
} from 'lucide-react'

export function StylePanel() {
  const { 
    activePanel, 
    setActivePanel, 
    designTokens, 
    updateColor,
    updateFont,
    canUndo,
    canRedo,
    undo,
    redo,
    hasUnsavedChanges,
    previewMode,
    setPreviewMode,
  } = useCMSStore()
  
  if (activePanel !== 'styles') return null
  
  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Playfair Display', label: 'Playfair Display' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Raleway', label: 'Raleway' },
  ]
  
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Palette className="w-5 h-5 text-brand-gold" />
          Design System
        </h2>
        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={() => setActivePanel(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Colors Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Brand Colors
          </h3>
          <div className="space-y-4">
            {Object.entries(designTokens.colors).map(([key, value]) => (
              <ColorPicker
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={(newValue) => updateColor(key as keyof typeof designTokens.colors, newValue)}
              />
            ))}
          </div>
        </div>
        
        {/* Typography Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Typography
          </h3>
          <div className="space-y-4">
            {Object.entries(designTokens.fonts).map(([key, value]) => (
              <div key={key}>
                <label className="text-sm font-medium text-foreground mb-1.5 block capitalize">
                  {key} Font
                </label>
                <select
                  value={value}
                  onChange={(e) => updateFont(key as keyof typeof designTokens.fonts, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                >
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        
        {/* Spacing Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Spacing
          </h3>
          <div className="space-y-3">
            {Object.entries(designTokens.spacing).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <label className="text-sm text-foreground w-24 capitalize">{key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    // Handle spacing update
                  }}
                  className="flex-1 px-3 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Border Radius Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Border Radius
          </h3>
          <div className="space-y-3">
            {Object.entries(designTokens.borderRadius).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <label className="text-sm text-foreground w-24 capitalize">{key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    // Handle border radius update
                  }}
                  className="flex-1 px-3 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                />
                <div 
                  className="w-8 h-8 bg-brand-navy"
                  style={{ borderRadius: value }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <Button 
          variant="secondary" 
          fullWidth
          disabled={!hasUnsavedChanges}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

function ColorPicker({ 
  label, 
  value, 
  onChange 
}: { 
  label: string
  value: string
  onChange: (value: string) => void 
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <div className="relative">
      <label className="text-sm font-medium text-foreground mb-1.5 block">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-sm"
          style={{ backgroundColor: value }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-xl border p-3">
          <HexColorPicker color={value} onChange={onChange} />
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-brand-navy text-white text-sm py-1.5 rounded-lg hover:bg-brand-navy-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function CMSToolbar() {
  const { 
    isEditMode, 
    setEditMode,
    activePanel,
    setActivePanel,
    canUndo,
    canRedo,
    undo,
    redo,
    hasUnsavedChanges,
    previewMode,
    setPreviewMode,
  } = useCMSStore()
  
  if (!isEditMode) return null
  
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-2xl border px-2 py-1.5 flex items-center gap-1">
      {/* Undo/Redo */}
      <div className="flex items-center gap-1 pr-2 border-r">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={undo}
          disabled={!canUndo}
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={redo}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Preview Size */}
      <div className="flex items-center gap-1 px-2 border-r">
        <Button
          variant={previewMode === 'desktop' ? 'default' : 'ghost'}
          size="icon-sm"
          onClick={() => setPreviewMode('desktop')}
          title="Desktop"
        >
          <Monitor className="w-4 h-4" />
        </Button>
        <Button
          variant={previewMode === 'tablet' ? 'default' : 'ghost'}
          size="icon-sm"
          onClick={() => setPreviewMode('tablet')}
          title="Tablet"
        >
          <Tablet className="w-4 h-4" />
        </Button>
        <Button
          variant={previewMode === 'mobile' ? 'default' : 'ghost'}
          size="icon-sm"
          onClick={() => setPreviewMode('mobile')}
          title="Mobile"
        >
          <Smartphone className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Panels */}
      <div className="flex items-center gap-1 px-2 border-r">
        <Button
          variant={activePanel === 'styles' ? 'secondary' : 'ghost'}
          size="icon-sm"
          onClick={() => setActivePanel(activePanel === 'styles' ? null : 'styles')}
          title="Design System"
        >
          <Palette className="w-4 h-4" />
        </Button>
        <Button
          variant={activePanel === 'components' ? 'secondary' : 'ghost'}
          size="icon-sm"
          onClick={() => setActivePanel(activePanel === 'components' ? null : 'components')}
          title="Components"
        >
          <Layout className="w-4 h-4" />
        </Button>
        <Button
          variant={activePanel === 'media' ? 'secondary' : 'ghost'}
          size="icon-sm"
          onClick={() => setActivePanel(activePanel === 'media' ? null : 'media')}
          title="Media"
        >
          <Image className="w-4 h-4" />
        </Button>
        <Button
          variant={activePanel === 'settings' ? 'secondary' : 'ghost'}
          size="icon-sm"
          onClick={() => setActivePanel(activePanel === 'settings' ? null : 'settings')}
          title="Settings"
        >
          <Settings2 className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Save & Preview */}
      <div className="flex items-center gap-2 pl-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditMode(false)}
        >
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={!hasUnsavedChanges}
        >
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>
    </div>
  )
}

export function ComponentsPanel() {
  const { activePanel, setActivePanel } = useCMSStore()
  
  if (activePanel !== 'components') return null
  
  const components = [
    { type: 'hero', name: 'Hero Section', icon: '🎯' },
    { type: 'features', name: 'Features Grid', icon: '✨' },
    { type: 'testimonials', name: 'Testimonials', icon: '💬' },
    { type: 'cta', name: 'Call to Action', icon: '📢' },
    { type: 'quote-form', name: 'Quote Form', icon: '📝' },
    { type: 'stats', name: 'Statistics', icon: '📊' },
    { type: 'carriers', name: 'Carrier Logos', icon: '🏢' },
    { type: 'faq', name: 'FAQ Section', icon: '❓' },
    { type: 'contact-form', name: 'Contact Form', icon: '📧' },
    { type: 'image-text', name: 'Image + Text', icon: '🖼️' },
    { type: 'video', name: 'Video Section', icon: '🎬' },
    { type: 'pricing', name: 'Pricing Table', icon: '💰' },
  ]
  
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Layout className="w-5 h-5 text-brand-gold" />
          Components
        </h2>
        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={() => setActivePanel(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop components onto your page
        </p>
        <div className="grid grid-cols-2 gap-3">
          {components.map((component) => (
            <div
              key={component.type}
              draggable
              className="p-4 border rounded-xl cursor-grab hover:border-brand-gold hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl mb-2">{component.icon}</div>
              <div className="text-sm font-medium">{component.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
