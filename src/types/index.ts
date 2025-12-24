// ============================================
// GetCovered.Life - Type Definitions
// ============================================

// User & Auth Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'agent' | 'user'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

// Lead Types
export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: Address
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  healthStatus?: 'excellent' | 'good' | 'fair' | 'poor'
  tobaccoUser?: boolean
  productInterest: ProductType[]
  coverageAmount?: number
  source: LeadSource
  status: LeadStatus
  score?: number
  notes?: string
  assignedTo?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
  lastContactedAt?: Date
  nextFollowUpAt?: Date
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country?: string
}

export type ProductType = 
  | 'final-expense'
  | 'indexed-universal-life'
  | 'term-life'
  | 'return-of-premium'
  | 'whole-life'
  | 'annuity'
  | 'medicare'

export type LeadSource = 
  | 'website-form'
  | 'voice-ai'
  | 'pdf-import'
  | 'direct-mail'
  | 'referral'
  | 'social-media'
  | 'paid-ads'
  | 'other'

export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal-sent'
  | 'negotiation'
  | 'won'
  | 'lost'
  | 'nurture'
  | 'do-not-contact'

// Quote Types
export interface QuoteRequest {
  id: string
  leadId?: string
  productType: ProductType
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female'
  state: string
  tobaccoUser: boolean
  healthRating: 1 | 2 | 3 | 4 | 5
  coverageAmount: number
  termLength?: number
  additionalInfo?: string
  createdAt: Date
}

export interface Quote {
  id: string
  quoteRequestId: string
  carrierId: string
  carrierName: string
  productName: string
  monthlyPremium: number
  annualPremium: number
  coverageAmount: number
  termLength?: number
  features: string[]
  rating: number
  createdAt: Date
}

// Carrier Types
export interface Carrier {
  id: string
  name: string
  logo: string
  description: string
  rating: number
  amBestRating: string
  products: ProductType[]
  features: string[]
  website: string
  isContracted: boolean
  commissionRate?: number
}

// CMS Types
export interface Page {
  id: string
  slug: string
  title: string
  description?: string
  sections: Section[]
  seo: SEOData
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface Section {
  id: string
  type: SectionType
  order: number
  data: Record<string, unknown>
  styles: SectionStyles
  isVisible: boolean
}

export type SectionType = 
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'cta'
  | 'pricing'
  | 'faq'
  | 'contact-form'
  | 'quote-form'
  | 'carriers'
  | 'products'
  | 'stats'
  | 'team'
  | 'content'
  | 'image-text'
  | 'gallery'
  | 'video'
  | 'custom'

export interface SectionStyles {
  backgroundColor?: string
  backgroundImage?: string
  backgroundOverlay?: string
  paddingTop?: string
  paddingBottom?: string
  textColor?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  alignment?: 'left' | 'center' | 'right'
}

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
}

// Design Token Types
export interface DesignTokens {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    border: string
  }
  fonts: {
    heading: string
    body: string
    display: string
  }
  typography: {
    headingFont: string
    bodyFont: string
    baseSize: number
    lineHeight: number
  }
  fontSizes: Record<string, string>
  spacing: {
    section: string
    component: string
    element: string
    unit: string
    containerWidth: string
  }
  borderRadius: Record<string, string>
  shadows: Record<string, string>
}

// Voice AI Types
export interface VoiceSession {
  id: string
  leadId?: string
  status: 'active' | 'ended' | 'failed'
  startedAt: Date
  endedAt?: Date
  duration?: number
  transcript?: TranscriptEntry[]
  summary?: string
  sentiment?: 'positive' | 'neutral' | 'negative'
  appointmentBooked?: boolean
}

export interface TranscriptEntry {
  speaker: 'agent' | 'user'
  text: string
  timestamp: Date
  confidence?: number
}

export interface VoiceAgentConfig {
  greeting: string
  persona: string
  objectives: string[]
  fallbackResponses: string[]
  appointmentCalendarUrl?: string
  transferNumber?: string
}

// Call Types (for CRM)
export interface Call {
  id: string
  leadId: string
  direction: 'inbound' | 'outbound'
  status: 'completed' | 'missed' | 'voicemail' | 'busy' | 'failed'
  duration: number
  recording?: string
  transcript?: string
  notes?: string
  outcome?: CallOutcome
  scheduledAt?: Date
  completedAt: Date
}

export type CallOutcome = 
  | 'interested'
  | 'not-interested'
  | 'callback-requested'
  | 'appointment-set'
  | 'wrong-number'
  | 'no-answer'
  | 'other'

// E-commerce Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image: string
  category: 'book' | 'course' | 'merch'
  stripeProductId: string
  stripePriceId: string
  downloadUrl?: string
  isDigital: boolean
  stock?: number
  isActive: boolean
}

export interface Order {
  id: string
  userId?: string
  email: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  status: 'pending' | 'paid' | 'fulfilled' | 'refunded'
  stripePaymentIntentId: string
  shippingAddress?: Address
  createdAt: Date
  fulfilledAt?: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

// Activity / Timeline Types
export interface Activity {
  id: string
  leadId: string
  type: ActivityType
  title: string
  description?: string
  metadata?: Record<string, unknown>
  userId?: string
  createdAt: Date
}

export type ActivityType = 
  | 'lead-created'
  | 'status-changed'
  | 'note-added'
  | 'call-made'
  | 'call-received'
  | 'email-sent'
  | 'sms-sent'
  | 'quote-requested'
  | 'quote-sent'
  | 'appointment-scheduled'
  | 'task-created'
  | 'task-completed'
  | 'document-uploaded'

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasMore: boolean
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'phone' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date' | 'number'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: Date
}
