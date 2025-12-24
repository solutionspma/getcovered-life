'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectField } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useCMSStore } from '@/stores/cms-store'
import { 
  Palette, 
  Type, 
  Maximize2,
  Save,
  RotateCcw,
  Eye,
  Check,
} from 'lucide-react'

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Poppins', label: 'Poppins' },
]

export default function DesignPage() {
  const { designTokens, updateDesignTokens } = useCMSStore()
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing'>('colors')
  const [hasChanges, setHasChanges] = useState(false)

  const updateColor = (key: string, value: string) => {
    updateDesignTokens({
      colors: {
        ...designTokens.colors,
        [key]: value,
      },
    })
    setHasChanges(true)
  }

  const updateTypography = (key: string, value: string | number) => {
    updateDesignTokens({
      fonts: {
        ...designTokens.fonts,
        [key]: value,
      },
    })
    setHasChanges(true)
  }

  const updateSpacing = (key: string, value: string) => {
    updateDesignTokens({
      spacing: {
        ...designTokens.spacing,
        [key]: value,
      },
    })
    setHasChanges(true)
  }

  const handleSave = () => {
    // TODO: Save to database
    setHasChanges(false)
  }

  const handleReset = () => {
    // Reset to defaults
    updateDesignTokens({
      colors: {
        primary: '#173860',
        secondary: '#F8BF4F',
        background: '#ffffff',
        foreground: '#1a1a1a',
        muted: '#6b7280',
        accent: '#F8BF4F',
        border: '#E4E4E7',
      },
    })
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-navy">
            Design System
          </h1>
          <p className="text-muted-foreground">
            Customize your website's visual appearance.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="secondary" onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'colors' as const, label: 'Colors', icon: Palette },
          { id: 'typography' as const, label: 'Typography', icon: Type },
          { id: 'spacing' as const, label: 'Spacing', icon: Maximize2 },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-2">
          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card padding="lg">
                <h2 className="text-lg font-heading font-semibold text-brand-navy mb-6">
                  Brand Colors
                </h2>
                <div className="space-y-6">
                  {[
                    { key: 'primary', label: 'Primary Color', description: 'Main brand color (navy blue)' },
                    { key: 'secondary', label: 'Secondary Color', description: 'Accent color (gold)' },
                    { key: 'background', label: 'Background', description: 'Page background color' },
                    { key: 'text', label: 'Text Color', description: 'Primary text color' },
                    { key: 'muted', label: 'Muted Text', description: 'Secondary text color' },
                  ].map((color) => (
                    <div key={color.key} className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-gray-200 shrink-0 cursor-pointer"
                        style={{ backgroundColor: designTokens.colors[color.key as keyof typeof designTokens.colors] }}
                      >
                        <input
                          type="color"
                          value={designTokens.colors[color.key as keyof typeof designTokens.colors]}
                          onChange={(e) => updateColor(color.key, e.target.value)}
                          className="w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="font-medium text-brand-navy">{color.label}</label>
                        <p className="text-sm text-muted-foreground">{color.description}</p>
                      </div>
                      <Input
                        value={designTokens.colors[color.key as keyof typeof designTokens.colors]}
                        onChange={(e) => updateColor(color.key, e.target.value)}
                        className="w-32"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card padding="lg">
                <h2 className="text-lg font-heading font-semibold text-brand-navy mb-6">
                  Typography Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-2">
                      Heading Font
                    </label>
                    <SelectField
                      options={fontOptions}
                      value={designTokens.typography.headingFont}
                      onValueChange={(value) => updateTypography('headingFont', value)}
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      Used for all headings (H1-H6)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-2">
                      Body Font
                    </label>
                    <SelectField
                      options={fontOptions}
                      value={designTokens.typography.bodyFont}
                      onValueChange={(value) => updateTypography('bodyFont', value)}
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      Used for body text and paragraphs
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-2">
                      Base Font Size
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="12"
                        max="20"
                        value={designTokens.typography.baseSize}
                        onChange={(e) => updateTypography('baseSize', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="w-16 text-center font-mono text-sm">
                        {designTokens.typography.baseSize}px
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-2">
                      Line Height
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={designTokens.typography.lineHeight}
                        onChange={(e) => updateTypography('lineHeight', parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <span className="w-16 text-center font-mono text-sm">
                        {designTokens.typography.lineHeight}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Spacing Tab */}
          {activeTab === 'spacing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card padding="lg">
                <h2 className="text-lg font-heading font-semibold text-brand-navy mb-6">
                  Spacing & Layout
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-2">
                      Base Spacing Unit
                    </label>
                    <Input
                      value={designTokens.spacing.unit}
                      onChange={(e) => updateSpacing('unit', e.target.value)}
                      placeholder="4px"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      The base unit for all spacing calculations
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-2">
                      Container Width
                    </label>
                    <Input
                      value={designTokens.spacing.containerWidth}
                      onChange={(e) => updateSpacing('containerWidth', e.target.value)}
                      placeholder="1280px"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      Maximum width of the main content container
                    </p>
                  </div>

                  {/* Spacing Scale Preview */}
                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-4">
                      Spacing Scale Preview
                    </label>
                    <div className="space-y-2">
                      {[1, 2, 4, 6, 8, 12, 16].map((multiplier) => (
                        <div key={multiplier} className="flex items-center gap-4">
                          <span className="w-12 text-sm text-muted-foreground">{multiplier}x</span>
                          <div 
                            className="h-4 bg-brand-gold rounded"
                            style={{ width: `${multiplier * 16}px` }}
                          />
                          <span className="text-sm font-mono text-muted-foreground">
                            {multiplier * parseInt(designTokens.spacing.unit)}px
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Preview Panel */}
        <div>
          <Card padding="lg" className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-brand-navy flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </h3>
              {hasChanges && (
                <Badge variant="secondary">Unsaved changes</Badge>
              )}
            </div>
            
            {/* Mini Preview */}
            <div 
              className="rounded-lg border overflow-hidden"
              style={{ 
                backgroundColor: designTokens.colors.background,
                fontFamily: designTokens.typography.bodyFont,
                fontSize: `${designTokens.typography.baseSize}px`,
                lineHeight: designTokens.typography.lineHeight,
              }}
            >
              {/* Header */}
              <div 
                className="p-4"
                style={{ backgroundColor: designTokens.colors.primary }}
              >
                <div 
                  className="font-semibold"
                  style={{ 
                    color: designTokens.colors.secondary,
                    fontFamily: designTokens.typography.headingFont,
                  }}
                >
                  GetCovered.Life
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 
                  className="text-lg font-semibold mb-2"
                  style={{ 
                    color: designTokens.colors.primary,
                    fontFamily: designTokens.typography.headingFont,
                  }}
                >
                  Sample Heading
                </h4>
                <p 
                  className="mb-4"
                  style={{ color: designTokens.colors.foreground }}
                >
                  This is sample body text showing how your typography choices look.
                </p>
                <p 
                  className="text-sm"
                  style={{ color: designTokens.colors.muted }}
                >
                  This is muted text for secondary information.
                </p>
                <button
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: designTokens.colors.secondary,
                    color: designTokens.colors.primary,
                  }}
                >
                  Sample Button
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
