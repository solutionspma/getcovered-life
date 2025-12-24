import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy initialization to allow build without valid credentials
let _supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url') {
    throw new Error('Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }
  
  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

// Client-side Supabase client (browser) - lazily initialized
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabaseClient()
    const value = (client as unknown as Record<string, unknown>)[prop as string]
    return typeof value === 'function' ? value.bind(client) : value
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string | null
          gender: string | null
          state: string | null
          tobacco_user: boolean | null
          health_rating: number | null
          product_type: string
          coverage_amount: number | null
          term_length: number | null
          status: 'new' | 'contacted' | 'qualified' | 'quoted' | 'sold' | 'lost'
          source: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          assigned_agent: string | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      pdf_leads: {
        Row: {
          id: string
          created_at: string
          file_name: string
          file_url: string
          processed: boolean
          leads_count: number
          processed_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['pdf_leads']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['pdf_leads']['Insert']>
      }
      pages: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          meta_description: string | null
          content: Record<string, unknown>
          published: boolean
        }
        Insert: Omit<Database['public']['Tables']['pages']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pages']['Insert']>
      }
      contact_submissions: {
        Row: {
          id: string
          created_at: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          subject: string
          message: string
          read: boolean
        }
        Insert: Omit<Database['public']['Tables']['contact_submissions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>
      }
      book_orders: {
        Row: {
          id: string
          created_at: string
          email: string
          stripe_session_id: string
          stripe_payment_intent: string | null
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          download_count: number
          download_expires_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['book_orders']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['book_orders']['Insert']>
      }
    }
  }
}

export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update']

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type ContactInsert = Database['public']['Tables']['contact_submissions']['Insert']

export type BookOrder = Database['public']['Tables']['book_orders']['Row']
export type BookOrderInsert = Database['public']['Tables']['book_orders']['Insert']
