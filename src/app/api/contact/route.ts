import { NextRequest, NextResponse } from 'next/server'
import { supabase, ContactInsert } from '@/lib/supabase'

// Force dynamic - don't try to build this route statically
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.email || !data.firstName || !data.lastName || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create contact submission object
    const submission: ContactInsert = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      read: false,
    }

    // Insert into database
    const { data: insertedSubmission, error } = await supabase
      .from('contact_submissions')
      .insert(submission)
      .select()
      .single()

    if (error) {
      console.error('Error inserting contact submission:', error)
      return NextResponse.json(
        { error: 'Failed to save contact submission' },
        { status: 500 }
      )
    }

    // TODO: Send notification email to team
    // TODO: Send auto-reply to user

    return NextResponse.json(
      { 
        success: true, 
        submissionId: insertedSubmission.id,
        message: 'Message sent successfully'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
