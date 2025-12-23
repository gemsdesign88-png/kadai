import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, whatsapp } = await request.json();

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required (minimum 2 characters)' },
        { status: 400 }
      );
    }

    // Validate WhatsApp number
    if (!whatsapp || typeof whatsapp !== 'string') {
      return NextResponse.json(
        { error: 'WhatsApp number is required' },
        { status: 400 }
      );
    }

    // Basic validation for phone number format
    const cleanedNumber = whatsapp.replace(/\D/g, '');
    if (cleanedNumber.length < 10 || cleanedNumber.length > 15) {
      return NextResponse.json(
        { error: 'Invalid WhatsApp number format' },
        { status: 400 }
      );
    }

    // Create Supabase client (use service role to bypass RLS for public inserts)
    const supabase = await createClient();

    // Insert into demo_requests table
    const { data, error } = await supabase
      .from('demo_requests')
      .insert({
        name: name.trim(),
        whatsapp: cleanedNumber,
        notified: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Demo request insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save demo request', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Demo request submitted successfully',
        data 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Demo request API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve demo requests (for admin use)
export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all demo requests
    const { data, error } = await supabase
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Demo requests fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch demo requests' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Demo requests GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
