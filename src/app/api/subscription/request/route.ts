import { createClient } from '@supabase/supabase-js';
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
    // Use service role key to bypass RLS for public contact submissions
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
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
        
        console.log('📧 Sending customer email to:', email);
        const customerEmailResult = await resend.emails.send({
          from: 'Kadai <no-reply@kadaipos.id>',
          to: email,
          subject: 'Konfirmasi Permintaan Aktivasi - Kadai POS',
          text: `Halo ${name || 'Pelanggan'},

Terima kasih telah mengajukan permintaan aktivasi paket di Kadai.

PERMINTAAN SEDANG DIPROSES
Tim kami telah menerima detail permintaan Anda dan akan segera melakukan aktivasi dalam waktu maksimal 1x24 jam.

RINGKASAN PERMINTAAN:
- Layanan: ${subject}
- Email: ${email}
- WhatsApp: ${whatsapp || '-'}

Anda akan menerima email konfirmasi kedua setelah akun Anda diaktifkan oleh admin kami.

---
Ini adalah email otomatis dari sistem Kadai POS.
Jika ada pertanyaan, hubungi kami di support@kadaipos.id

Salam,
Tim Kadai`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0; padding: 0;">
              <div style="background-color: #f8f9fa; padding: 24px; text-align: center;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #111827;">Kadai POS</h1>
              </div>
              
              <div style="background-color: #ffffff; padding: 32px 24px;">
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #111827;">Halo ${name || 'Pelanggan'},</p>
                
                <p style="margin: 0 0 24px 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
                  Terima kasih telah mengajukan permintaan aktivasi paket di Kadai.
                </p>
                
                <div style="margin: 24px 0; padding: 16px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                  <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #92400e;">Permintaan Sedang Diproses</p>
                  <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                    Tim kami telah menerima detail permintaan Anda dan akan segera melakukan aktivasi dalam waktu maksimal 1x24 jam.
                  </p>
                </div>

                <div style="margin: 24px 0; padding: 16px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #111827;">Ringkasan Permintaan:</p>
                  <table style="width: 100%; font-size: 13px; color: #4b5563;">
                    <tr>
                      <td style="padding: 4px 0; width: 100px;">Layanan:</td>
                      <td style="padding: 4px 0; font-weight: 500;">${subject}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0;">Email:</td>
                      <td style="padding: 4px 0; font-weight: 500;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0;">WhatsApp:</td>
                      <td style="padding: 4px 0; font-weight: 500;">${whatsapp || '-'}</td>
                    </tr>
                  </table>
                </div>

                <p style="margin: 24px 0 0 0; font-size: 13px; color: #4b5563; line-height: 1.6;">
                  Anda akan menerima email konfirmasi kedua setelah akun Anda diaktifkan oleh admin kami.
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px 24px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">
                  Ini adalah email otomatis dari sistem Kadai POS
                </p>
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                  Jika ada pertanyaan, hubungi kami di <a href="mailto:support@kadaipos.id" style="color: #2563eb; text-decoration: none;">support@kadaipos.id</a>
                </p>
              </div>
            </div>
          `
        });
        
        console.log('✅ Customer email result:', customerEmailResult);
        
        // Also notify admin
        console.log('📧 Sending admin notification...');
        const adminEmailResult = await resend.emails.send({
          from: 'Kadai System <no-reply@kadaipos.id>',
          to: 'gemmyadyendra@gmail.com',
          subject: `NEW UPGRADE REQUEST: ${name}`,
          html: `<p>User <b>${name}</b> (${email}) requested: ${subject}</p><p>Message: ${message}</p>`
        });
        
        console.log('✅ Admin email result:', adminEmailResult);
      }
    } catch (emailError) {
      console.error('❌ Error sending request confirmation email:', emailError);
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
