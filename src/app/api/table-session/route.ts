import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Generate random 8-character code
function generateDynamicCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// GET: Generate new dynamic code for a table
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tableId = searchParams.get('tableId');

    if (!tableId) {
      return NextResponse.json(
        { error: 'Table ID is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Check if table exists and is occupied
    const { data: table, error: tableError } = await supabase
      .from('tables')
      .select('id, number, status, restaurant_id')
      .eq('id', tableId)
      .single();

    if (tableError || !table) {
      return NextResponse.json(
        { error: 'Table not found' },
        { status: 404 }
      );
    }

    // Only allow code generation for occupied tables
    if (table.status !== 'occupied') {
      return NextResponse.json(
        { 
          error: 'Table not active',
          message: 'Meja belum diaktifkan. Silakan panggil staff.',
          tableStatus: table.status
        },
        { status: 403 }
      );
    }

    // Generate new dynamic code
    const dynamicCode = generateDynamicCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store in database
    const { error: insertError } = await supabase
      .from('table_sessions')
      .insert({
        table_id: tableId,
        dynamic_code: dynamicCode,
        expires_at: expiresAt.toISOString(),
        is_active: true,
      });

    if (insertError) {
      console.error('Error creating dynamic code:', insertError);
      return NextResponse.json(
        { error: 'Failed to generate code' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      dynamicCode,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Error in GET /api/table-session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Validate dynamic code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableId, dynamicCode } = body;

    if (!tableId || !dynamicCode) {
      return NextResponse.json(
        { error: 'Table ID and dynamic code are required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // First check table status
    const { data: table, error: tableError } = await supabase
      .from('tables')
      .select('id, status')
      .eq('id', tableId)
      .single();

    if (tableError || !table) {
      return NextResponse.json({
        success: false,
        isValid: false,
        reason: 'table_not_found',
        message: 'Meja tidak ditemukan',
      });
    }

    if (table.status !== 'occupied') {
      return NextResponse.json({
        success: false,
        isValid: false,
        reason: 'table_not_active',
        message: 'Meja sudah dibersihkan. Silakan scan ulang QR code di meja.',
      });
    }

    // Validate the dynamic code
    const { data: session, error: sessionError } = await supabase
      .from('table_sessions')
      .select('id, expires_at, is_active')
      .eq('table_id', tableId)
      .eq('dynamic_code', dynamicCode)
      .eq('is_active', true)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({
        success: false,
        isValid: false,
        reason: 'code_invalid',
        message: 'Kode tidak valid. Silakan scan ulang QR code di meja.',
      });
    }

    // Check if expired
    if (new Date(session.expires_at) < new Date()) {
      return NextResponse.json({
        success: false,
        isValid: false,
        reason: 'code_expired',
        message: 'Kode sudah kadaluarsa. Silakan scan ulang QR code di meja.',
      });
    }

    return NextResponse.json({
      success: true,
      isValid: true,
    });
  } catch (error) {
    console.error('Error in POST /api/table-session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: Invalidate all sessions for a table (called when Bersihkan Meja)
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tableId = searchParams.get('tableId');

    if (!tableId) {
      return NextResponse.json(
        { error: 'Table ID is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Invalidate all active sessions for this table
    const { error } = await supabase
      .from('table_sessions')
      .update({ is_active: false })
      .eq('table_id', tableId)
      .eq('is_active', true);

    if (error) {
      console.error('Error invalidating sessions:', error);
      return NextResponse.json(
        { error: 'Failed to invalidate sessions' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error in DELETE /api/table-session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
