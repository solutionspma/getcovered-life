import { NextRequest, NextResponse } from 'next/server'
import { supabase, LeadInsert } from '@/lib/supabase'

// Force dynamic - don't try to build this route statically
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.email || !data.firstName || !data.lastName || !data.phone || !data.productType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Parse coverage amount to number
    const coverageAmount = data.coverageAmount ? parseInt(data.coverageAmount, 10) : null
    const termLength = data.termLength ? parseInt(data.termLength, 10) : null

    // Create lead object
    const lead: LeadInsert = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.dateOfBirth || null,
      gender: data.gender || null,
      state: data.state || null,
      tobacco_user: data.tobaccoUser === 'yes',
      health_rating: data.healthRating ? parseInt(data.healthRating, 10) : null,
      product_type: data.productType,
      coverage_amount: coverageAmount,
      term_length: termLength,
      status: 'new',
      source: data.source || 'website',
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      assigned_agent: null,
      notes: null,
    }

    // Insert into database
    const { data: insertedLead, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single()

    if (error) {
      console.error('Error inserting lead:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    // TODO: Send notification email to agent
    // TODO: Trigger CRM sync
    // TODO: Send confirmation email to lead

    return NextResponse.json(
      { 
        success: true, 
        leadId: insertedLead.id,
        message: 'Quote request submitted successfully'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Protected endpoint - would need auth in production
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const limit = parseInt(searchParams.get('limit') || '50', 10)
  const offset = parseInt(searchParams.get('offset') || '0', 10)

  try {
    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    const { data: leads, error, count } = await query

    if (error) {
      console.error('Error fetching leads:', error)
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      leads,
      total: count,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Leads fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
