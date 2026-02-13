import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Add CORS headers for mobile app access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const { 
      name, 
      email, 
      whatsapp, 
      subject, 
      message, 
      metadata 
    } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' }, 
        { status: 400, headers: corsHeaders }
      );
    }

    // 1. Insert into contact_submissions
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        whatsapp: whatsapp || '',
        subject: subject || 'KADAI - Subscription Request',
        message,
        metadata: metadata || {},
        status: 'new'
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // 2. Send confirmation email to customer
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        
        await resend.emails.send({
          from: 'Kadai <no-reply@kadaipos.id>',
          to: email,
          subject: 'Permintaan Aktivasi Kadai Diterima',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #FF5A5F;">Halo ${name || 'Pelanggan'},</h2>
              <p>Terima kasih telah mengajukan permintaan aktivasi paket di Kadai.</p>
              
              <div style="margin: 20px 0; padding: 15px; background-color: #FFF8F1; border-left: 4px solid #F6AD55; border-radius: 4px;">
                <p style="margin: 0; font-weight: bold; color: #DD6B20;">Permintaan Sedang Diproses</p>
                <p style="margin: 5px 0 0 0; color: #C05621;">Tim kami telah menerima detail permintaan Anda dan akan segera melakukan aktivasi dalam waktu maksimal 1x24 jam.</p>
              </div>

              <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
                <p style="margin: 0; font-weight: bold;">Ringkasan Permintaan:</p>
                <ul style="margin: 10px 0 0 0; color: #555;">
                  <li><strong>Layanan:</strong> ${subject}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>WhatsApp:</strong> ${whatsapp || '-'}</li>
                </ul>
              </div>

              <p>Anda akan menerima email konfirmasi kedua setelah akun Anda diaktifkan oleh admin kami.</p>
              
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #888;">Ini adalah email otomatis. Untuk bantuan lebih lanjut, hubungi kami di support@kadaipos.id atau WhatsApp.</p>
            </div>
          `
        });
        
        // Also notify admin
        await resend.emails.send({
          from: 'Kadai System <no-reply@kadaipos.id>',
          to: 'gemmyadyendra@gmail.com',
          subject: `NEW UPGRADE REQUEST: ${name}`,
          html: `<p>User <b>${name}</b> (${email}) requested: ${subject}</p><p>Message: ${message}</p>`
        });
      }
    } catch (emailError) {
      console.error('Error sending request confirmation email:', emailError);
    }

    return NextResponse.json(
      { success: true, submissionId: submission.id }, 
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('Error in subscription-request API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' }, 
      { status: 500, headers: corsHeaders }
    );
  }
}
