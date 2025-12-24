import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DesignTokens, Page, Section } from '@/types'

// Default design tokens
const defaultTokens: DesignTokens = {
  colors: {
    primary: '#173860',
    secondary: '#F8BF4F',
    accent: '#F8BF4F',
    background: '#FFFFFF',
    foreground: '#173860',
    muted: '#F4F4F5',
    border: '#E4E4E7',
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Inter',
    display: 'Playfair Display',
  },
  typography: {
    headingFont: 'Montserrat',
    bodyFont: 'Inter',
    baseSize: 16,
    lineHeight: 1.6,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  spacing: {
    section: '80px',
    component: '24px',
    element: '16px',
    unit: '4px',
    containerWidth: '1280px',
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    default: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
}

interface CMSState {
  // Edit Mode
  isEditMode: boolean
  setEditMode: (enabled: boolean) => void
  
  // Selected Element
  selectedElementId: string | null
  setSelectedElement: (id: string | null) => void
  
  // Selected Section
  selectedSectionId: string | null
  setSelectedSection: (id: string | null) => void
  
  // Design Tokens
  designTokens: DesignTokens
  updateDesignTokens: (tokens: Partial<DesignTokens>) => void
  updateColor: (key: keyof DesignTokens['colors'], value: string) => void
  updateFont: (key: keyof DesignTokens['fonts'], value: string) => void
  
  // Current Page
  currentPage: Page | null
  setCurrentPage: (page: Page) => void
  
  // Sections
  updateSection: (sectionId: string, data: Partial<Section>) => void
  addSection: (section: Section, afterId?: string) => void
  removeSection: (sectionId: string) => void
  reorderSections: (fromIndex: number, toIndex: number) => void
  duplicateSection: (sectionId: string) => void
  
  // History (Undo/Redo)
  history: Page[]
  historyIndex: number
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  pushToHistory: () => void
  
  // Panels
  activePanel: 'styles' | 'components' | 'settings' | 'media' | null
  setActivePanel: (panel: CMSState['activePanel']) => void
  
  // Unsaved Changes
  hasUnsavedChanges: boolean
  setHasUnsavedChanges: (value: boolean) => void
  
  // Preview Mode
  previewMode: 'desktop' | 'tablet' | 'mobile'
  setPreviewMode: (mode: CMSState['previewMode']) => void
}

export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      // Edit Mode
      isEditMode: false,
      setEditMode: (enabled) => set({ isEditMode: enabled }),
      
      // Selected Element
      selectedElementId: null,
      setSelectedElement: (id) => set({ selectedElementId: id }),
      
      // Selected Section
      selectedSectionId: null,
      setSelectedSection: (id) => set({ selectedSectionId: id }),
      
      // Design Tokens
      designTokens: defaultTokens,
      updateDesignTokens: (tokens) => set((state) => ({
        designTokens: { ...state.designTokens, ...tokens },
        hasUnsavedChanges: true,
      })),
      updateColor: (key, value) => set((state) => ({
        designTokens: {
          ...state.designTokens,
          colors: { ...state.designTokens.colors, [key]: value },
        },
        hasUnsavedChanges: true,
      })),
      updateFont: (key, value) => set((state) => ({
        designTokens: {
          ...state.designTokens,
          fonts: { ...state.designTokens.fonts, [key]: value },
        },
        hasUnsavedChanges: true,
      })),
      
      // Current Page
      currentPage: null,
      setCurrentPage: (page) => set({ currentPage: page }),
      
      // Sections
      updateSection: (sectionId, data) => set((state) => {
        if (!state.currentPage) return state
        const sections = state.currentPage.sections.map((s) =>
          s.id === sectionId ? { ...s, ...data } : s
        )
        get().pushToHistory()
        return {
          currentPage: { ...state.currentPage, sections },
          hasUnsavedChanges: true,
        }
      }),
      
      addSection: (section, afterId) => set((state) => {
        if (!state.currentPage) return state
        let sections = [...state.currentPage.sections]
        if (afterId) {
          const index = sections.findIndex((s) => s.id === afterId)
          sections.splice(index + 1, 0, section)
        } else {
          sections.push(section)
        }
        // Update order
        sections = sections.map((s, i) => ({ ...s, order: i }))
        get().pushToHistory()
        return {
          currentPage: { ...state.currentPage, sections },
          hasUnsavedChanges: true,
        }
      }),
      
      removeSection: (sectionId) => set((state) => {
        if (!state.currentPage) return state
        get().pushToHistory()
        const sections = state.currentPage.sections
          .filter((s) => s.id !== sectionId)
          .map((s, i) => ({ ...s, order: i }))
        return {
          currentPage: { ...state.currentPage, sections },
          hasUnsavedChanges: true,
          selectedSectionId: null,
        }
      }),
      
      reorderSections: (fromIndex, toIndex) => set((state) => {
        if (!state.currentPage) return state
        const sections = [...state.currentPage.sections]
        const [removed] = sections.splice(fromIndex, 1)
        sections.splice(toIndex, 0, removed)
        const reorderedSections = sections.map((s, i) => ({ ...s, order: i }))
        get().pushToHistory()
        return {
          currentPage: { ...state.currentPage, sections: reorderedSections },
          hasUnsavedChanges: true,
        }
      }),
      
      duplicateSection: (sectionId) => set((state) => {
        if (!state.currentPage) return state
        const section = state.currentPage.sections.find((s) => s.id === sectionId)
        if (!section) return state
        const newSection: Section = {
          ...section,
          id: `${section.id}-copy-${Date.now()}`,
        }
        const index = state.currentPage.sections.findIndex((s) => s.id === sectionId)
        const sections = [...state.currentPage.sections]
        sections.splice(index + 1, 0, newSection)
        const reorderedSections = sections.map((s, i) => ({ ...s, order: i }))
        get().pushToHistory()
        return {
          currentPage: { ...state.currentPage, sections: reorderedSections },
          hasUnsavedChanges: true,
        }
      }),
      
      // History
      history: [],
      historyIndex: -1,
      canUndo: false,
      canRedo: false,
      
      pushToHistory: () => set((state) => {
        if (!state.currentPage) return state
        const newHistory = state.history.slice(0, state.historyIndex + 1)
        newHistory.push(JSON.parse(JSON.stringify(state.currentPage)))
        return {
          history: newHistory.slice(-50), // Keep last 50 states
          historyIndex: newHistory.length - 1,
          canUndo: newHistory.length > 1,
          canRedo: false,
        }
      }),
      
      undo: () => set((state) => {
        if (state.historyIndex <= 0) return state
        const newIndex = state.historyIndex - 1
        return {
          currentPage: JSON.parse(JSON.stringify(state.history[newIndex])),
          historyIndex: newIndex,
          canUndo: newIndex > 0,
          canRedo: true,
          hasUnsavedChanges: true,
        }
      }),
      
      redo: () => set((state) => {
        if (state.historyIndex >= state.history.length - 1) return state
        const newIndex = state.historyIndex + 1
        return {
          currentPage: JSON.parse(JSON.stringify(state.history[newIndex])),
          historyIndex: newIndex,
          canUndo: true,
          canRedo: newIndex < state.history.length - 1,
          hasUnsavedChanges: true,
        }
      }),
      
      // Panels
      activePanel: null,
      setActivePanel: (panel) => set({ activePanel: panel }),
      
      // Unsaved Changes
      hasUnsavedChanges: false,
      setHasUnsavedChanges: (value) => set({ hasUnsavedChanges: value }),
      
      // Preview Mode
      previewMode: 'desktop',
      setPreviewMode: (mode) => set({ previewMode: mode }),
    }),
    {
      name: 'getcovered-cms-storage',
      partialize: (state) => ({
        designTokens: state.designTokens,
      }),
    }
  )
)
